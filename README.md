<div align="center">

  <img src="dihutan-web/public/dihutan-logo.png" alt="DiHutan Logo" width="160" />

  # 🌿 DiHutan — Modern Forest Technology
  ### **Platform Cerdas Monitoring & Pencegahan Kebakaran Hutan dan Lahan (KARHUTLA) Berbasis IoT & AI**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![IoT Hardware](https://img.shields.io/badge/Hardware-ESP32%20%7C%20IoT%20Sensors-E7352C?style=for-the-badge&logo=espressif&logoColor=white)](https://espressif.com/)
  [![Platform](https://img.shields.io/badge/Platform-Web%20%26%20Android%20APK-173F2B?style=for-the-badge)](https://drive.google.com/file/d/1OvJh5XtWD4I64kgkJLK69zpy28fiMaIP/view)

  <p align="center">
    <strong>Menjaga ekosistem hutan Kalimantan Barat bebas dari karhutla melalui pemantauan telemetri real-time, kecerdasan buatan, dan otomasi pembasahan gambut.</strong>
  </p>

  <p align="center">
    <a href="#-fitur-utama">Fitur Utama</a> •
    <a href="#-arsitektur--spesifikasi-iot">Arsitektur IoT</a> •
    <a href="#-desain-antarmuka--modern-forest-technology">Desain UI/UX</a> •
    <a href="#-panduan-instalasi">Instalasi</a> •
    <a href="#-unduh-aplikasi-android">Download APK</a> •
    <a href="#-struktur-direktori">Struktur Proyek</a>
  </p>

</div>

---

## 📖 Tentang DiHutan

**DiHutan** adalah platform teknologi pemantauan lingkungan terpadu yang dirancang khusus untuk melindungi hutan tropis dan kawasan lahan gambut rawan karhutla, khususnya di wilayah **Daerah Aliran Sungai (DAS) Kapuas dan Kubu Raya, Kalimantan Barat**. 

Platform ini menggabungkan:
1. **IoT Telemetry**: Pemantauan parameter fisik (suhu, kelembapan udara, kelembapan tanah, dan gas/asap) menggunakan mikroprosesor ESP32 dan modul sensor lapangan.
2. **Peatland Water Table (TMA) Simulator**: Estimasi tingkat risiko kebakaran berdasarkan tinggi muka air gambut secara interaktif.
3. **AI Forest Guardian**: Ringkasan cerdas analisis data lingkungan untuk mendeteksi anomali lebih awal.
4. **AutoSpray Automation**: Konsep kendali otomasi pompa pembasahan gambut dan katup solenoid untuk intervensi titik rawan kekeringan.
5. **Perpustakaan Rimba (Ensiklopedia Konservasi)**: Media edukasi publik mengenai flora, fauna endemik (seperti Orangutan Kalimantan), ekosistem gambut, dan hidrologi sungai Kapuas.

---

## 🌟 Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| **🌲 Edisi Renaisans Hutan (Landing Page)** | Halaman depan interaktif dengan visual kanopi hutan Kalimantan, efek paralaks, *3D Interactive Botanical Book*, dan simulasi visual tinggi muka air gambut. |
| **📡 Dashboard Kendali & Telemetri** | Pusat pemantauan komprehensif metrik lingkungan (Suhu, Kelembapan, Gas Karhutla, Kelembapan Tanah Gambut) dengan kartu status *Normal*, *Waspada*, dan *Bahaya*. |
| **🗺️ Monitoring Spasial (Peta Lapangan)** | Integrasi peta GIS interaktif yang memetakan **3 Pos Pantau Utama** di Kalimantan Barat beserta pembacaan telemetri aktif di tiap titik pos. |
| **🤖 AI Forest Guardian** | Asisten kecerdasan buatan untuk mengolah sinyal telemetri menjadi ringkasan status risiko dan saran mitigasi operasional bagi petugas jaga. |
| **💦 AutoSpray & Otomasi Pompa** | Pemantauan kendali solenoid valve dan pompa mini 5V/12V untuk pembasahan otomatis ketika level air gambut memasuki zona kritis. |
| **📦 Katalog Perangkat IoT** | Direktori perangkat keras pemantauan yang mencakup foto asli produk, spesifikasi teknis, fungsi lapangan, serta status konektivitas perangkat (*Online*, *Standby*, *Offline*). |
| **📚 Ensiklopedia Penjaga Rimba** | Perpustakaan botani digital bergaya *Editorial Natural* dengan fitur *Open Book*, pencarian kategori flora/fauna, sistem bookmark, dan informasi konservasi. |
| **🔐 Role-Based Access Control (RBAC)** | Sistem keamanan terintegrasi Supabase Auth dengan pemisahan hak akses: **Public/User** (eksplorasi & edukasi) dan **Petugas / Reaksi Cepat** (monitoring & kendali). |

---

## 🛠️ Arsitektur & Spesifikasi IoT

DiHutan memanfaatkan arsitektur perangkat keras lapangan yang andal dan hemat daya:

<div align="center">
  <img src="dihutan-web/public/assets/technology/ESP32%20Development%20Board%20Product%20Cutout.png" alt="ESP32 Board" width="220" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="dihutan-web/public/assets/technology/Soil%20Moisture%20Sensor%20Module%20and%20Probe.png" alt="Soil Moisture" width="190" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="dihutan-web/public/assets/technology/Solenoid%20Valve%20Assembly%20Product%20Shot.png" alt="Solenoid Valve" width="200" />
</div>

- **Mikrokontroler Utama**: ESP32 Development Board (Wi-Fi + BLE dual-core).
- **Expansion Board**: ESP32 Expansion Shield untuk distribusi daya dan perlindungan tegangan.
- **Sensor Suhu & Kelembapan Udara**: DHT11 / DHT22 Digital Sensor.
- **Sensor Gas & Deteksi Asap**: MQ Series Gas Sensor (mendeteksi gas CO/karbon monoksida dan asap pekat awal karhutla).
- **Sensor Kelembapan Tanah Gambut**: Capacitive / Resistive Soil Moisture Probe.
- **Aktuator & Otomasi**:
  - 1-Channel / 4-Channel 5V Relay Module dengan optocoupler isolation.
  - 12V DC Solenoid Valve untuk buka-tutup aliran pipa air gambut.
  - Mini Submersible Water Pump untuk distribusi semprotan air pembasahan.

---

## 🎨 Desain Antarmuka — Modern Forest Technology

Aplikasi menggunakan identitas desain **Modern Forest Technology** yang menggabungkan estetika alam hutan hujan Kalimantan dengan nuansa teknologi mutakhir:

### 🎨 Sistem Warna (Global Color Tokens)

| Peran Token | Nilai Hex | Tampilan | Penggunaan Utama |
| :--- | :--- | :---: | :--- |
| **Primary** | `#173F2B` | ![#173F2B](https://via.placeholder.com/15/173F2B/000000?text=+) | Deep Forest Green — Tombol utama, header kontras tinggi |
| **Secondary** | `#285C40` | ![#285C40](https://via.placeholder.com/15/285C40/000000?text=+) | Forest Green — Sub-header, elemen interaktif |
| **Accent** | `#8BAF70` | ![#8BAF70](https://via.placeholder.com/15/8BAF70/000000?text=+) | Moss Green — Highlight, badge aktif, aksen navigasi |
| **Background** | `#F5F7F2` | ![#F5F7F2](https://via.placeholder.com/15/F5F7F2/000000?text=+) | Soft Natural White — Latar belakang dashboard & halaman utama |
| **Surface/Card** | `#FFFFFF` | ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) | Pure White — Card metrik, kontainer form, modal |
| **Primary Text** | `#17251D` | ![#17251D](https://via.placeholder.com/15/17251D/000000?text=+) | Dark Forest Text — Keterbacaan tinggi untuk judul & teks penting |
| **Secondary Text** | `#647268` | ![#647268](https://via.placeholder.com/15/647268/000000?text=+) | Muted Green Gray — Subteks, satuan sensor, metadata |
| **Border** | `#DFE6DC` | ![#DFE6DC](https://via.placeholder.com/15/DFE6DC/000000?text=+) | Subtle Border — Garis pemisah halus antar komponen |
| **Success** | `#27834A` | ![#27834A](https://via.placeholder.com/15/27834A/000000?text=+) | Kondisi lingkungan aman / normal |
| **Warning** | `#D99A2B` | ![#D99A2B](https://via.placeholder.com/15/D99A2B/000000?text=+) | Kondisi waspada / muka air mulai surut |
| **Danger** | `#C7473D` | ![#C7473D](https://via.placeholder.com/15/C7473D/000000?text=+) | Bahaya karhutla tinggi / asap terdeteksi |

---

## 💻 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Library UI**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla Modern CSS + CSS Modules + [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL dengan Row Level Security)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Pemetaan**: [MapLibre GL](https://maplibre.org/) & OpenStreetMap
- **Deploy**: Vercel Ready

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat
- [Node.js](https://nodejs.org/) versi 20.x atau lebih baru
- `npm` atau `pnpm`
- Akun [Supabase](https://supabase.com/) aktif

### 2. Kloning Repositori
```bash
git clone https://github.com/naylasufiatuz/KARHUTLA-DiHutan.git
cd KARHUTLA-DiHutan/dihutan-web
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Lingkungan (`.env.local`)
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi kredensial proyek Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📱 Unduh Aplikasi Android

Bagi tim patroli lapangan dan pengguna perangkat bergerak, aplikasi Android **DiHutan Mobile** dapat diunduh langsung:

<div align="center">
  <a href="https://drive.google.com/file/d/1OvJh5XtWD4I64kgkJLK69zpy28fiMaIP/view" target="_blank">
    <img src="https://img.shields.io/badge/Download%20APK-Google%20Drive-27834A?style=for-the-badge&logo=google-drive&logoColor=white" alt="Download DiHutan APK" />
  </a>
  <p><em>Klik tombol di atas untuk mengunduh berkas APK versi terbaru langsung dari Google Drive.</em></p>
</div>

---

## 📁 Struktur Direktori

```plaintext
KARHUTLA-DiHutan/
├── README.md                      # Dokumentasi utama repositori
├── assets/                        # Dokumentasi visual & media pendukung
└── dihutan-web/                   # Aplikasi Web Next.js 15
    ├── app/                       # App Router Pages & Styles
    │   ├── globals.css            # Token desain global Modern Forest Technology
    │   ├── landing.css            # Stylesheet Landing Page Edisi Renaisans
    │   ├── dashboard.css          # Stylesheet Dashboard & Overview Kendali
    │   ├── technology.css         # Stylesheet Halaman Perangkat IoT
    │   ├── book.css               # Stylesheet 3D Interactive Book
    │   ├── encyclopedia.css       # Stylesheet Ensiklopedia Hutan
    │   ├── register.css           # Stylesheet Autentikasi
    │   ├── layout.tsx             # Root Layout
    │   ├── page.tsx               # Entrypoint Beranda (LandingView)
    │   ├── login/                 # Halaman Login
    │   ├── register/              # Halaman Registrasi
    │   ├── overview/              # Ringkasan Eksekutif
    │   ├── monitoring/            # Peta GIS & Telemetri Real-time
    │   ├── perangkat/             # Katalog Perangkat & Modal Spesifikasi
    │   ├── edukasi/               # Ensiklopedia Penjaga Rimba
    │   └── pengaturan/            # Profil, Keamanan & Diagnostik Sistem
    ├── components/                # Komponen UI Reusable
    │   ├── LandingView.tsx        # View Landing Page Interaktif
    │   ├── DashboardShell.tsx     # Shell Navigasi & Sidebar Dashboard
    │   └── ...                    # Modul pendukung lainnya
    ├── lib/                       # Supabase Client & Helper Utilities
    ├── public/                    # Aset statis, foto perangkat keras, & gambar hero
    ├── alur-web.md                # Dokumentasi arsitektur fungsional
    ├── design.md                  # Panduan Design System
    ├── user-flow.md               # Alur interaksi pengguna & RBAC
    ├── package.json               # Konfigurasi dependensi
    └── next.config.ts             # Konfigurasi Next.js
```

---

## 👥 Kontribusi & Lisensi

Proyek ini dikembangkan sebagai inisiatif pelestarian lingkungan dan mitigasi bencana kebakaran hutan di Kalimantan.

- **Organisasi**: Tim Pengembang DiHutan — KARHUTLA Kalimantan Barat
- **Repositori**: [GitHub naylasufiatuz/KARHUTLA-DiHutan](https://github.com/naylasufiatuz/KARHUTLA-DiHutan)
- **Lisensi**: Hak Cipta & Hak Guna dilindungi untuk inisiatif konservasi lingkungan.

<div align="center">
  <p>🌱 <em>"Hutan yang lestari dan gambut yang basah adalah nafas bagi kehidupan kita bersama."</em></p>
</div>

