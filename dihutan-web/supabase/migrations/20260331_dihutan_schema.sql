-- ==============================================================================
-- DIHUTAN PLATFORM — PRODUCTION DATABASE SCHEMA & MIGRATIONS
-- Project ID: erayvecbxrnqeayfxjfa
-- Deskripsi: Skema lengkap untuk sistem pemantauan karhutla, telemetri IoT,
--            ensiklopedia digital hutan Kalimantan, pelaporan masyarakat,
--            dan otorisasi berbasis 3 Role (USER, ADMIN, PIHAK_BERTANGGUNG_JAWAB).
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('USER', 'ADMIN', 'PIHAK_BERTANGGUNG_JAWAB');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE location_status AS ENUM ('normal', 'perhatian', 'peringatan', 'tidak_ada_data');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE connection_status AS ENUM ('ONLINE', 'OFFLINE', 'UNKNOWN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE operation_status AS ENUM ('ACTIVE', 'INACTIVE', 'UNKNOWN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE report_status AS ENUM ('TERKIRIM', 'DIVERIFIKASI', 'INVESTIGASI', 'SELESAI');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE alert_severity AS ENUM ('info', 'warning', 'critical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Terkoneksi ke auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'USER',
  region TEXT DEFAULT 'Kalimantan Barat',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. IOT DEVICES TABLE
CREATE TABLE IF NOT EXISTS public.iot_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  connection_status connection_status NOT NULL DEFAULT 'ONLINE',
  operation_status operation_status NOT NULL DEFAULT 'ACTIVE',
  is_passive BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  power_source TEXT,
  working_voltage TEXT,
  field_role TEXT NOT NULL,
  hardware_specs JSONB DEFAULT '{}'::jsonb,
  last_ping TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. MONITORING LOCATIONS TABLE (Kawasan Sungai Kapuas & Gambut Kalbar)
CREATE TABLE IF NOT EXISTS public.monitoring_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sub_district TEXT NOT NULL,
  regency TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  device_id UUID REFERENCES public.iot_devices(id) ON DELETE SET NULL,
  status location_status NOT NULL DEFAULT 'normal',
  environmental_condition TEXT NOT NULL,
  peat_depth_cm INTEGER DEFAULT 180,
  is_demo BOOLEAN NOT NULL DEFAULT true,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. SENSOR READINGS TABLE (Telemetri Historis)
CREATE TABLE IF NOT EXISTS public.sensor_readings (
  id BIGSERIAL PRIMARY KEY,
  location_id UUID REFERENCES public.monitoring_locations(id) ON DELETE CASCADE,
  device_id UUID REFERENCES public.iot_devices(id) ON DELETE SET NULL,
  temperature DOUBLE PRECISION NOT NULL,
  humidity DOUBLE PRECISION NOT NULL,
  gas_ppm DOUBLE PRECISION NOT NULL,
  soil_moisture DOUBLE PRECISION NOT NULL,
  water_level_cm DOUBLE PRECISION,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. DEVICE STATUS HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.device_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES public.iot_devices(id) ON DELETE CASCADE,
  previous_connection connection_status,
  new_connection connection_status,
  previous_operation operation_status,
  new_operation operation_status,
  trigger_reason TEXT NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. ALERTS TABLE (Peringatan Dini)
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES public.monitoring_locations(id) ON DELETE SET NULL,
  device_id UUID REFERENCES public.iot_devices(id) ON DELETE SET NULL,
  severity alert_severity NOT NULL DEFAULT 'warning',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  threshold_value TEXT,
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. EDUCATION CATEGORIES TABLE (8 Kategori Ensiklopedia Rimba)
CREATE TABLE IF NOT EXISTS public.education_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- '01', '02', ... '08'
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 1,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. EDUCATION ARTICLES TABLE (Materi Ensiklopedia Digital)
CREATE TABLE IF NOT EXISTS public.education_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.education_categories(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  scientific_name TEXT,
  subtitle TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Tim Sains Rimba DiHutan',
  reviewer TEXT DEFAULT 'Balai KSDA Kalimantan Barat / BRGM',
  status TEXT NOT NULL DEFAULT 'published', -- 'draft', 'published'
  sort_order INTEGER NOT NULL DEFAULT 1,
  reading_time_minutes INTEGER NOT NULL DEFAULT 6,
  fakta_menarik TEXT,
  status_konservasi TEXT,
  referensi_sumber JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. EDUCATION ARTICLE SECTIONS TABLE (Subbab Buku Digital)
CREATE TABLE IF NOT EXISTS public.education_article_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.education_articles(id) ON DELETE CASCADE,
  section_title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  image_caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 1
);

-- 12. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.education_articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, article_id)
);

-- 13. COMMUNITY REPORTS TABLE (Pelaporan Masyarakat)
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_name TEXT NOT NULL,
  reporter_phone TEXT,
  title TEXT NOT NULL,
  incident_type TEXT NOT NULL, -- 'Indikasi Asap', 'Kebakaran Gambut', 'Kekeringan Parit', 'Aktivitas Ilegal'
  location_name TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  description TEXT NOT NULL,
  photo_url TEXT,
  status report_status NOT NULL DEFAULT 'TERKIRIM',
  officer_notes TEXT,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_monitoring_locations_status ON public.monitoring_locations(status);
CREATE INDEX IF NOT EXISTS idx_monitoring_locations_coords ON public.monitoring_locations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_loc_rec ON public.sensor_readings(location_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_severity_created ON public.alerts(severity, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_education_articles_cat_slug ON public.education_articles(category_id, slug);
CREATE INDEX IF NOT EXISTS idx_education_articles_status ON public.education_articles(status);
CREATE INDEX IF NOT EXISTS idx_education_sections_art_sort ON public.education_article_sections(article_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_reports_status_created ON public.reports(status, created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iot_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_article_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 2. Monitoring & Devices (Semua pengunjung dapat melihat peta & perangkat)
CREATE POLICY "Devices viewable by everyone" ON public.iot_devices
  FOR SELECT USING (true);

CREATE POLICY "Monitoring locations viewable by everyone" ON public.monitoring_locations
  FOR SELECT USING (true);

CREATE POLICY "Sensor readings viewable by everyone" ON public.sensor_readings
  FOR SELECT USING (true);

CREATE POLICY "Alerts viewable by everyone" ON public.alerts
  FOR SELECT USING (true);

CREATE POLICY "Device history viewable by everyone" ON public.device_status_history
  FOR SELECT USING (true);

-- Admin and Pihak Bertanggung Jawab can insert/update devices & locations
CREATE POLICY "Admin/Petugas can update locations" ON public.monitoring_locations
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('ADMIN', 'PIHAK_BERTANGGUNG_JAWAB')
    )
  );

-- 3. Education Tables (Masyarakat umum membaca konten published)
CREATE POLICY "Categories viewable by everyone" ON public.education_categories
  FOR SELECT USING (true);

CREATE POLICY "Published articles viewable by everyone" ON public.education_articles
  FOR SELECT USING (
    status = 'published' OR
    (auth.uid() IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
    ))
  );

CREATE POLICY "Article sections viewable by everyone" ON public.education_article_sections
  FOR SELECT USING (true);

CREATE POLICY "Admin can insert articles" ON public.education_articles
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );

CREATE POLICY "Admin can update articles" ON public.education_articles
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );

CREATE POLICY "Admin can delete articles" ON public.education_articles
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );

-- 4. Bookmarks (User hanya mengakses bookmark miliknya)
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON public.bookmarks
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON public.bookmarks
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- 5. Reports (User dapat mengirim laporan, petugas/admin mengelola status)
CREATE POLICY "Reports viewable by authenticated users" ON public.reports
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('ADMIN', 'PIHAK_BERTANGGUNG_JAWAB')
    )
  );

CREATE POLICY "Anyone or authenticated can submit report" ON public.reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Petugas and Admin can update report status" ON public.reports
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('ADMIN', 'PIHAK_BERTANGGUNG_JAWAB')
    )
  );

-- ==============================================================================
-- INITIAL SEED DATA: 8 KATEGORI ENSIKLOPEDIA, 8 PERANGKAT IOT, LOKASI KAPUAS
-- ==============================================================================

-- 8 Kategori Ensiklopedia Rimba Kalimantan
INSERT INTO public.education_categories (code, title, subtitle, description, sort_order, icon)
VALUES
  ('01', 'Mengenal Hutan Kalimantan', 'Karakteristik & Ekosistem Hujan Tropis', 'Memahami formasi vegetasi kanopi lebat, siklus hidrologi alam, serta nilai ekologis rimba Borneo bagi iklim global.', 1, '🌲'),
  ('02', 'Pohon dan Flora', 'Spesies Kayu Langka & Tumbuhan Khas', 'Eksplorasi pohon raksasa Ulin, Tengkawang penghasil mentega nabati, Meranti, hingga Kantong Semar endemik.', 2, '🌿'),
  ('03', 'Fauna Kalimantan', 'Satwa Kunci & Keanekaragaman Hayati', 'Mengenal satwa kharismatik: Orangutan Kalimantan, Bekantan hidung panjang, Burung Enggang Gading, dan Beruang Madu.', 3, '🦧'),
  ('04', 'Tanah Gambut', 'Struktur Kubah, Karbon & Kerentanan', 'Pembedahan ilmiah formasi lapisan gambut dalam, cadangan karbon raksasa, dinamika air, dan mitigasi pembakaran bawah tanah.', 4, '🟤'),
  ('05', 'Sungai Kapuas', 'Urat Nadi Hidrologi & Kehidupan', 'Mempelajari sungai terpanjang di Indonesia, rawa lebak Danau Sentarum, jalur transportasi tradisional, dan keanekaragaman ikhtiologi.', 5, '🌊'),
  ('06', 'Kebakaran Hutan dan Lahan', 'Penyebab, Dinamika Api & Kabut Asap', 'Analisis komprehensif fenomena smoldering fire di lahan gambut kering, bahaya partikulat PM2.5, serta strategi deteksi dini.', 6, '🔥'),
  ('07', 'Konservasi dan Pelestarian', 'Restorasi Gambut 3R & Aksi Komunitas', 'Program Rewetting (pembasahan sekat kanal), Revegetasi, Revitalisasi ekonomi, serta dedikasi Masyarakat Peduli Api (MPA).', 7, '🤝'),
  ('08', 'Teknologi Perlindungan Hutan', 'IoT, Telemetri Cerdas & Respons Cepat', 'Implementasi mikrokontroler ESP32, sensor kelembapan tanah, analisis ambang batas, dan sistem pembasahan otomatis AutoSpray.', 8, '⚡')
ON CONFLICT (code) DO NOTHING;

