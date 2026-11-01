/**
 * DIHUTAN PLATFORM — DASHBOARD CENTRAL DATA & MODELS
 *
 * Berisi model data, tipe data, serta dataset autentik untuk:
 * 1. Titik Pemantauan Sungai Kapuas & Gambut (MapLibre & Telemetri)
 * 2. 8 Komponen Perangkat IoT Fisik (Visual, Relasi Sistem, & Log Riwayat)
 * 3. Digital Forest Encyclopedia (8 Kategori & Artikel Buku Ilmiah)
 * 4. Sistem Pelaporan Masyarakat (Tracking Status 4 Tahap)
 */

export type UserRole = "USER" | "ADMIN" | "PIHAK_BERTANGGUNG_JAWAB";

// ==============================================================================
// 1. MONITORING SUNGAI KAPUAS & SENSOR MODELS
// ==============================================================================

export type LocationStatus = "normal" | "perhatian" | "peringatan" | "tidak_ada_data";

export interface MonitoringLocation {
  id: string;
  name: string;
  subDistrict: string;
  regency: string;
  coordinates: [number, number]; // [longitude, latitude] untuk GeoJSON/MapLibre
  deviceCode: string;
  status: LocationStatus;
  environmentalCondition: string;
  peatDepthCm: number;
  temperature: number; // °C
  humidity: number; // %
  soilMoisture: number; // %
  gasPpm: number; // ppm
  waterLevelCm: number; // cm dari muka kanal
  lastUpdated: string;
  isDemo: boolean;
  notes: string;
}

export interface SensorAlert {
  id: string;
  locationId: string;
  locationName: string;
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  parameter: string;
  value: string;
}

export const monitoringLocationsData: MonitoringLocation[] = [
  {
    id: "loc-01",
    name: "DAS Kapuas Hilir — Kubu Raya",
    subDistrict: "Sungai Raya",
    regency: "Kubu Raya",
    coordinates: [109.3425, -0.0389],
    deviceCode: "ESP32-KBR-01",
    status: "normal",
    environmentalCondition: "Kanopi lembap, muka air gambut stabil di sekat kanal.",
    peatDepthCm: 240,
    temperature: 28.4,
    humidity: 76,
    soilMoisture: 68,
    gasPpm: 12,
    waterLevelCm: -18,
    lastUpdated: "5 menit yang lalu",
    isDemo: true,
    notes: "[DEMO] Titik pantau kawasan muara Sungai Kapuas dan hutan gambut penyangga Kubu Raya.",
  },
  {
    id: "loc-02",
    name: "Sekat Kanal Rasau Jaya — Gambut Dalam",
    subDistrict: "Rasau Jaya",
    regency: "Kubu Raya",
    coordinates: [109.3982, -0.2315],
    deviceCode: "ESP32-RSJ-02",
    status: "perhatian",
    environmentalCondition: "Kelembapan lapisan gambut atas mulai menurun tipis.",
    peatDepthCm: 320,
    temperature: 31.8,
    humidity: 58,
    soilMoisture: 42,
    gasPpm: 24,
    waterLevelCm: -34,
    lastUpdated: "12 menit yang lalu",
    isDemo: true,
    notes: "[DEMO] Area kanal drainase dengan riwayat kerentanan api di musim kemarau.",
  },
  {
    id: "loc-03",
    name: "Kawasan Muara Kapuas — Siantan",
    subDistrict: "Pontianak Utara",
    regency: "Kota Pontianak",
    coordinates: [109.2842, -0.0055],
    deviceCode: "ESP32-PTK-03",
    status: "normal",
    environmentalCondition: "Debit air pasang tinggi, vegetasi bakau & nipah subur.",
    peatDepthCm: 90,
    temperature: 29.1,
    humidity: 80,
    soilMoisture: 74,
    gasPpm: 15,
    waterLevelCm: +8,
    lastUpdated: "20 menit yang lalu",
    isDemo: true,
    notes: "[DEMO] Stasiun acuan delta aliran Kapuas menuju Selat Karimata.",
  },
  {
    id: "loc-04",
    name: "DAS Kapuas Tengah — Tayan Hilir",
    subDistrict: "Tayan Hilir",
    regency: "Kabupaten Sanggau",
    coordinates: [110.1124, -0.1583],
    deviceCode: "ESP32-TYN-04",
    status: "normal",
    environmentalCondition: "Kondisi vegetasi sekunder stabil, aliran sungai deras.",
    peatDepthCm: 160,
    temperature: 29.6,
    humidity: 71,
    soilMoisture: 65,
    gasPpm: 18,
    waterLevelCm: -12,
    lastUpdated: "35 menit yang lalu",
    isDemo: true,
    notes: "[DEMO] Pos pemantau koridor tengah perlintasan satwa dan rawa lebak.",
  },
  {
    id: "loc-05",
    name: "Pertemuan Kapuas & Melawi — Sintang",
    subDistrict: "Sintang Kota",
    regency: "Kabupaten Sintang",
    coordinates: [111.4981, 0.0769],
    deviceCode: "ESP32-STG-05",
    status: "peringatan",
    environmentalCondition: "Kelembapan tanah kritis (<30%), deteksi lonjakan gas organik ringan.",
    peatDepthCm: 210,
    temperature: 34.2,
    humidity: 43,
    soilMoisture: 27,
    gasPpm: 52,
    waterLevelCm: -48,
    lastUpdated: "2 menit yang lalu",
    isDemo: true,
    notes: "[DEMO] Indikasi kekeringan gambut akibat ketiadaan presipitasi 10 hari berturut-turut.",
  },
  {
    id: "loc-06",
    name: "Rawa Danau Sentarum — Kapuas Hulu",
    subDistrict: "Batang Lupar",
    regency: "Kapuas Hulu",
    coordinates: [112.1645, 0.8542],
    deviceCode: "ESP32-STR-06",
    status: "normal",
    environmentalCondition: "Danau lebak penuh, keanekaragaman flora air optimal.",
    peatDepthCm: 280,
    temperature: 27.5,
    humidity: 84,
    soilMoisture: 82,
    gasPpm: 9,
    waterLevelCm: +22,
    lastUpdated: "1 jam yang lalu",
    isDemo: true,
    notes: "[DEMO] Kawasan hulu dan penyimpan cadangan air alami DAS Kapuas.",
  },
];

export const recentAlertsData: SensorAlert[] = [
  {
    id: "alt-01",
    locationId: "loc-05",
    locationName: "Pertemuan Kapuas & Melawi — Sintang",
    severity: "critical",
    title: "Gambut Kering Ekstrem (<30%)",
    message: "Sensor kelembapan tanah mencatat 27%. Ambang batas aman terlewati. Siaga pemicuan AutoSpray.",
    timestamp: "2 menit yang lalu",
    parameter: "Kelembapan Tanah",
    value: "27%",
  },
  {
    id: "alt-02",
    locationId: "loc-02",
    locationName: "Sekat Kanal Rasau Jaya — Gambut Dalam",
    severity: "warning",
    title: "Penurunan Muka Air Gambut",
    message: "Tinggi air kanal surut ke -34 cm. Suhu siang hari mencapai 31.8°C.",
    timestamp: "12 menit yang lalu",
    parameter: "Muka Air Kanal",
    value: "-34 cm",
  },
  {
    id: "alt-03",
    locationId: "loc-01",
    locationName: "DAS Kapuas Hilir — Kubu Raya",
    severity: "info",
    title: "Sinkronisasi Telemetri Rutin",
    message: "Paket data ESP32 berhasil diverifikasi tanpa packet-loss.",
    timestamp: "25 menit yang lalu",
    parameter: "Ping Koneksi",
    value: "142 ms (WiFi/Cellular)",
  },
];

// ==============================================================================
// 2. PERANGKAT IOT — 8 HARDWARE MODELS, RELASI SISTEM & STATUS LOG
// ==============================================================================

export type ConnectionStatus = "ONLINE" | "OFFLINE" | "UNKNOWN";
export type OperationStatus = "ACTIVE" | "INACTIVE" | "UNKNOWN";

export interface IoTDeviceItem {
  id: string;
  code: string;
  name: string;
  category: "Mikrokontroler" | "Distribusi" | "Sensor Lingkungan" | "Aktuator Mekanik" | "Catu Daya";
  connectionStatus: ConnectionStatus;
  operationStatus: OperationStatus;
  isPassive: boolean;
  image: string;
  powerSource: string;
  workingVoltage: string;
  fieldRole: string;
  shortDesc: string;
  fullDesc: string;
  specs: { label: string; value: string }[];
  currentReading?: string;
  lastPing: string;
  statusNotes: string;
}

export interface DeviceStatusLog {
  id: string;
  timestamp: string;
  deviceCode: string;
  deviceName: string;
  changeType: "KONEKSI" | "OPERASIONAL" | "TELEMETRI";
  details: string;
}

export const iotDevicesDataset: IoTDeviceItem[] = [
  {
    id: "dev-01",
    code: "ESP32-CORE",
    name: "ESP32 Dual-Core Dev Board",
    category: "Mikrokontroler",
    connectionStatus: "ONLINE",
    operationStatus: "ACTIVE",
    isPassive: false,
    image: "/assets/technology/ESP32 Development Board Product Cutout.png",
    powerSource: "Adaptor DC / Baterai Solar Inverter",
    workingVoltage: "3.3V – 5.0V DC",
    fieldRole: "Otak utama pos pemantau yang membaca sinyal sensor, mengolah algoritma filter, dan mengirimkan telemetri.",
    shortDesc: "Mikrokontroler 240 MHz dengan Wi-Fi & Bluetooth bawaan untuk pemrosesan telemetri rimba.",
    fullDesc:
      "ESP32 bertindak sebagai pusat komputasi edge di pos rimba. Mengonversi sinyal analog probe tanah, menghitung moving-average suhu DHT11, menguji ambang gas MQ, dan mengeksekusi logika aktuasi relay saat tanah terdeteksi kering.",
    specs: [
      { label: "Prosesor", value: "Xtensa Dual-Core 32-bit LX6 (240 MHz)" },
      { label: "Memori", value: "520 KB SRAM + 4 MB SPI Flash" },
      { label: "Konektivitas", value: "Wi-Fi 802.11 b/g/n & BLE 4.2" },
      { label: "Pin GPIO", value: "36 Pin dengan ADC 12-bit & DAC" },
      { label: "Konsumsi Siaga", value: "Deep-Sleep 10 µA (Hemat Energi)" },
    ],
    currentReading: "CPU: 240 MHz | Temp Int: 36.2°C | Wi-Fi RSSI: -64 dBm",
    lastPing: "10 detik yang lalu",
    statusNotes: "Terhubung stabil ke gateway server. Siklus pengiriman data setiap 30 detik.",
  },
  {
    id: "dev-02",
    code: "EXP-BOARD",
    name: "Papan Ekspansi I/O Terminal ESP32",
    category: "Distribusi",
    connectionStatus: "ONLINE",
    operationStatus: "ACTIVE",
    isPassive: true,
    image: "/assets/technology/ESP32 Expansion Board Close-Up.png",
    powerSource: "Terhubung paralel ke adaptor 12V/5V",
    workingVoltage: "Input DC 6.5V – 16V (Output 5V & 3.3V)",
    fieldRole: "Menjaga kestabilan sambungan kabel sensor dengan terminal baut tahan getaran di pos lapangan.",
    shortDesc: "Papan distribusi daya dan sinyal dengan terminal baut industri anti-kendor.",
    fullDesc:
      "Merupakan komponen pasif distribusi daya. Mengamankan kabel tanah gambut yang rawan tertarik kelembapan tinggi dengan terminal sekrup baja, serta memiliki regulator onboard step-down untuk menyuplai pin 5V dan 3.3V secara terpisah.",
    specs: [
      { label: "Tipe Soket", value: "ESP32 NodeMCU 30/38-pin kompatibel" },
      { label: "Terminal", value: "Screw Terminal Block + 3-Pin Sensor Header" },
      { label: "Proteksi", value: "Dioda Anti-Reverse Polarity + Filter Kapasitor" },
      { label: "Bahan", value: "PCB FR4 Industri Tahan Lembap" },
    ],
    currentReading: "Jalur Rel Daya: 5.04V & 3.31V Stabil (Pasif)",
    lastPing: "Tersambung via ESP32",
    statusNotes: "Komponen pasif tanpa firmware; status mengikuti kehadiran mikrokontroler.",
  },
  {
    id: "dev-03",
    code: "DHT11-SEN",
    name: "Sensor DHT11 (Suhu & Kelembapan Udara)",
    category: "Sensor Lingkungan",
    connectionStatus: "ONLINE",
    operationStatus: "ACTIVE",
    isPassive: false,
    image: "/assets/technology/dht11-sensor.svg",
    powerSource: "Rel 3.3V/5V dari ESP32",
    workingVoltage: "3.3V – 5.5V DC",
    fieldRole: "Mengukur suhu udara kanopi dan kelembapan relatif untuk memantau tren kekeringan mikro.",
    shortDesc: "Sensor suhu dan kelembapan udara digital terkalibrasi.",
    fullDesc:
      "Sensor DHT11 memantau iklim mikro kanopi bawah hutan. Ketika suhu kanopi melompat di atas 34°C dan kelembapan udara anjlok di bawah 45%, sistem mengidentifikasi peningkatan indeks bahaya api (Fire Danger Index).",
    specs: [
      { label: "Rentang Suhu", value: "0°C – 50°C (Akurasi ±2°C)" },
      { label: "Rentang Kelembapan", value: "20% – 90% RH (Akurasi ±5%)" },
      { label: "Sinyal Output", value: "Single-Bus Digital Serial" },
      { label: "Periode Sampling", value: "1 Hz (1 kali per detik)" },
    ],
    currentReading: "Suhu: 29.4°C | Kelembapan Udara: 72% RH",
    lastPing: "30 detik yang lalu",
    statusNotes: "Data pembacaan valid tanpa anomali sinyal.",
  },
  {
    id: "dev-04",
    code: "MQ-GAS-SEN",
    name: "Sensor Gas MQ Series (Deteksi Asap & Gas Karhutla)",
    category: "Sensor Lingkungan",
    connectionStatus: "ONLINE",
    operationStatus: "ACTIVE",
    isPassive: false,
    image: "/assets/technology/gas-sensor-mq.svg",
    powerSource: "Rel 5V DC Teregulasi",
    workingVoltage: "5.0V DC (Heater 800mW)",
    fieldRole: "Mendeteksi konsentrasi partikel asap dan gas hasil pembakaran organik biomassa gambut.",
    shortDesc: "Sensor elektrokimia sensitif terhadap karbon monoksida, metana, dan asap pembakaran.",
    fullDesc:
      "Modul gas MQ menggunakan elemen pemanas SnO2 untuk mendeteksi gas pembakaran yang keluar dari gambut yang mulai membara di bawah tanah (*smoldering*) bahkan sebelum lidah api terlihat di permukaan.",
    specs: [
      { label: "Gas Target", value: "Asap, CO, Hidrokarbon Pembakaran" },
      { label: "Rentang Deteksi", value: "10 ppm – 1000 ppm" },
      { label: "Waktu Respons", value: "< 10 detik" },
      { label: "Keluaran", value: "Analog Voltage (AO) & TTL Digital (DO)" },
    ],
    currentReading: "Konsentrasi: 16 ppm (Kategori Normal/Udara Bersih)",
    lastPing: "30 detik yang lalu",
    statusNotes: "Suhu koil pemanas stabil, tidak terdeteksi asap pembakaran aktif.",
  },
  {
    id: "dev-05",
    code: "SOIL-MOIST",
    name: "Sensor Kelembapan Tanah Gambut (Probe Garpu)",
    category: "Sensor Lingkungan",
    connectionStatus: "ONLINE",
    operationStatus: "ACTIVE",
    isPassive: false,
    image: "/assets/technology/Soil Moisture Sensor Module and Probe.png",
    powerSource: "Rel 3.3V DC (ADC ESP32)",
    workingVoltage: "3.3V – 5.0V DC",
    fieldRole: "Sensor kunci yang mengukur kadar air lapisan gambut atas (0–10 cm) penentu risiko kebakaran.",
    shortDesc: "Probe elektroda tahan korosi yang ditanam langsung di lapisan tanah gambut.",
    fullDesc:
      "Membaca konduktivitas listrik antara dua elektroda probe yang ditanam di tanah gambut. Ketika gambut jenuh air, tegangan analog rendah (<1.5V); saat gambut mengering dan rentan terbakar, resistansi naik memicu sinyal bahaya.",
    specs: [
      { label: "Metode Baca", value: "Resistif / Konduktivitas Tanah Terkalibrasi" },
      { label: "Kedalaman Ukur", value: "38 mm – 50 mm (Lapisan Organik Gambut)" },
      { label: "Proteksi", value: "Lapisan Nikel Anti-Korosi Air Gambut Asam" },
      { label: "Konsumsi", value: "< 20 mA" },
    ],
    currentReading: "Kadar Air Gambut: 64% (Lembap Terjaga)",
    lastPing: "30 detik yang lalu",
    statusNotes: "Parameter utama sistem: ambang kritis disetel pada 30%.",
  },
  {
    id: "dev-06",
    code: "RELAY-5V",
    name: "Modul Relay 1-Channel 5V Optocoupler",
    category: "Aktuator Mekanik",
    connectionStatus: "ONLINE",
    operationStatus: "INACTIVE",
    isPassive: false,
    image: "/assets/technology/Blue Relay Module PCB Product Shot.png",
    powerSource: "5V VCC dari Rel Catu Daya",
    workingVoltage: "Koil 5V DC | Kontak hingga 250V AC / 30V DC 10A",
    fieldRole: "Sakelar elektromekanik terisolasi yang menghubungkan perintah logika ESP32 ke motor pompa pembasah.",
    shortDesc: "Sakelar relay berisolasi galvanis optocoupler pencegah lonjakan arus motor ke mikrokontroler.",
    fullDesc:
      "Relay berada dalam kondisi SIAGA (INACTIVE / Standby). Relay baru akan mengaktifkan koil ketika ESP32 mengirim logika pemicuan akibat kelembapan gambut melewati batas darurat (<30%) atau melalui perintah manual petugas.",
    specs: [
      { label: "Tipe Kontak", value: "SPDT (Common, NO, NC)" },
      { label: "Isolasi", value: "Optocoupler PC817 (Isolasi 5000V)" },
      { label: "Sinyal Logika", value: "Active LOW (0V memicu ON)" },
      { label: "Indikator", value: "LED Hijau (Status Aktif) & LED Merah (Daya)" },
    ],
    currentReading: "Status Kontak: Normally Open (NO) — Rangkaian Terbuka",
    lastPing: "1 menit yang lalu",
    statusNotes: "SIAGA (Standby). Belum ada pemicuan pembasahan otomatis dari sensor.",
  },
  {
    id: "dev-07",
    code: "ADAPTOR-DC",
    name: "Adaptor Switching DC 12V/5V Teregulasi",
    category: "Catu Daya",
    connectionStatus: "ONLINE",
    operationStatus: "ACTIVE",
    isPassive: true,
    image: "/assets/technology/adaptor.png",
    powerSource: "Jala Listrik Pos / Inverter Panel Surya",
    workingVoltage: "Input 100–240V AC | Output 12V / 5V DC 2A",
    fieldRole: "Menyuplai pasokan listrik bersih tanpa lonjakan bagi mikrokontroler, sensor, dan motor pompa.",
    shortDesc: "Unit konversi daya switching efisiensi tinggi dengan filter pengaman ripple.",
    fullDesc:
      "Merupakan komponen pasif catu daya. Mengubah energi dari baterai surya atau sumber listrik pos menjadi tegangan teregulasi yang tahan terhadap fluktuasi iklim hutan tropis Kalimantan.",
    specs: [
      { label: "Efisiensi", value: "> 85% dengan pendinginan pasif" },
      { label: "Fitur Proteksi", value: "Short-Circuit, Over-Voltage, Thermal Cutoff" },
      { label: "Kabel Output", value: "Jack DC 5.5mm x 2.1mm Standar Industri" },
      { label: "Daya Maksimum", value: "24 Watt Puncak" },
    ],
    currentReading: "Tegangan Suplai: 12.08V DC | Beban Arus: 380 mA",
    lastPing: "Pasif (Tersambung ke Rangkaian)",
    statusNotes: "Komponen pasif catu daya. Beroperasi normal menopang seluruh perangkat.",
  },
  {
    id: "dev-08",
    code: "PUMP-MINI",
    name: "Pompa Air Mini Submersible DC AutoSpray",
    category: "Aktuator Mekanik",
    connectionStatus: "ONLINE",
    operationStatus: "INACTIVE",
    isPassive: false,
    image: "/assets/technology/Mini Water Pump with Coiled Clear Tubing.png",
    powerSource: "Daya 12V/5V via Jalur Kontak Relay",
    workingVoltage: "3V – 12V DC (Brushless Motor)",
    fieldRole: "Mendorong air dari parit sekat kanal ke selang sprinkler pembasahan gambut saat bahaya api terdeteksi.",
    shortDesc: "Unit pompa air kompak hemat energi untuk aksi pembasahan lahan gambut kritis.",
    fullDesc:
      "Pompa AutoSpray berstatus SIAGA (INACTIVE). Pompa TIDAK terus-menerus menyala agar tidak menguras cadangan air sekat kanal dan tidak memboroskan daya baterai surya. Begitu sensor tanah mencatat <30%, pompa aktif selama durasi terkonfigurasi (misal 5 menit pembasahan).",
    specs: [
      { label: "Debit Aliran", value: "80 – 120 Liter / Jam" },
      { label: "Daya Angkat (Head)", value: "0.5 – 1.2 Meter Vertikal" },
      { label: "Tipe Motor", value: "Brushless DC Tanpa Sikat (Tahan Jamur)" },
      { label: "Selang", value: "Selang Bening Fleksibel 8mm Anti-Kinking" },
    ],
    currentReading: "Daya: 0W (Standby Siaga) | Terakhir Menyala: Uji Coba 08:00 WIB",
    lastPing: "Terhubung lewat Modul Relay",
    statusNotes: "PENTING: Status ESP32 Online TIDAK berarti pompa aktif. Pompa hanya aktif saat relay dipicu.",
  },
];

export const initialDeviceLogs: DeviceStatusLog[] = [
  {
    id: "log-01",
    timestamp: "10 detik yang lalu",
    deviceCode: "ESP32-CORE",
    deviceName: "ESP32 Dual-Core",
    changeType: "TELEMETRI",
    details: "Telemetri 6 kanal (Suhu, RH, Gas, Gambut, Tegangan, RSSI) terkirim sukses.",
  },
  {
    id: "log-02",
    timestamp: "4 menit yang lalu",
    deviceCode: "SOIL-MOIST",
    deviceName: "Sensor Kelembapan Tanah",
    changeType: "TELEMETRI",
    details: "Pembacaan kelembapan stabil di 64%. Fluktuasi ±1% dalam batas wajar.",
  },
  {
    id: "log-03",
    timestamp: "18 menit yang lalu",
    deviceCode: "RELAY-5V",
    deviceName: "Modul Relay 5V",
    changeType: "OPERASIONAL",
    details: "Pemeriksaan sinyal interlock: Kontak NO dalam kondisi terbuka aman (INACTIVE).",
  },
  {
    id: "log-04",
    timestamp: "1 jam yang lalu",
    deviceCode: "PUMP-MINI",
    deviceName: "Pompa Air Mini",
    changeType: "OPERASIONAL",
    details: "Pemeriksaan kesiapan hidrolik: Saluran hisap sekat kanal tidak tersumbat lumut.",
  },
];

// ==============================================================================
// 3. DIGITAL FOREST ENCYCLOPEDIA — 8 KATEGORI & ARTIKEL BUKU EDITORIAL
// ==============================================================================

export interface EducationSection {
  title: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface EducationArticle {
  slug: string;
  categoryCode: string;
  categoryTitle: string;
  title: string;
  subtitle: string;
  scientificName?: string;
  heroImage: string;
  author: string;
  reviewer: string;
  readingTimeMinutes: number;
  faktaMenarik: string;
  statusKonservasi?: string;
  sections: EducationSection[];
  referensiSumber: string[];
}

export interface EducationCategory {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  articleCount: number;
  icon: string;
  featuredSlug: string;
}

export const educationCategoriesData: EducationCategory[] = [
  {
    code: "01",
    title: "Mengenal Hutan Kalimantan",
    subtitle: "Karakteristik & Ekosistem Hujan Tropis",
    description: "Memahami formasi vegetasi kanopi lebat, siklus hidrologi alam, serta nilai ekologis rimba Borneo bagi iklim global.",
    articleCount: 1,
    icon: "🌲",
    featuredSlug: "ekosistem-hutan-hujan-tropis-kalimantan",
  },
  {
    code: "02",
    title: "Pohon dan Flora",
    subtitle: "Spesies Kayu Langka & Tumbuhan Khas",
    description: "Eksplorasi pohon raksasa Ulin, Tengkawang penghasil mentega nabati, Meranti, hingga Kantong Semar endemik.",
    articleCount: 2,
    icon: "🌿",
    featuredSlug: "pohon-ulin-besi-rimba-kalimantan",
  },
  {
    code: "03",
    title: "Fauna Kalimantan",
    subtitle: "Satwa Kunci & Keanekaragaman Hayati",
    description: "Mengenal satwa kharismatik: Orangutan Kalimantan, Bekantan hidung panjang, Burung Enggang Gading, dan Beruang Madu.",
    articleCount: 2,
    icon: "🦧",
    featuredSlug: "orangutan-kalimantan-penjaga-kanopi",
  },
  {
    code: "04",
    title: "Tanah Gambut",
    subtitle: "Struktur Kubah, Karbon & Kerentanan",
    description: "Pembedahan ilmiah formasi lapisan gambut dalam, cadangan karbon raksasa, dinamika air, dan mitigasi pembakaran bawah tanah.",
    articleCount: 1,
    icon: "🟤",
    featuredSlug: "anatomi-lahan-gambut-penyimpan-karbon-raksasa",
  },
  {
    code: "05",
    title: "Sungai Kapuas",
    subtitle: "Urat Nadi Hidrologi & Kehidupan",
    description: "Mempelajari sungai terpanjang di Indonesia, rawa lebak Danau Sentarum, jalur transportasi tradisional, dan keanekaragaman hayati.",
    articleCount: 1,
    icon: "🌊",
    featuredSlug: "sungai-kapuas-urat-nadi-rimba-kalimantan-barat",
  },
  {
    code: "06",
    title: "Kebakaran Hutan dan Lahan",
    subtitle: "Penyebab, Dinamika Api & Kabut Asap",
    description: "Analisis komprehensif fenomena smoldering fire di lahan gambut kering, bahaya partikulat PM2.5, serta strategi deteksi dini.",
    articleCount: 1,
    icon: "🔥",
    featuredSlug: "dinamika-karhutla-dan-bahaya-api-bawah-tanah",
  },
  {
    code: "07",
    title: "Konservasi dan Pelestarian",
    subtitle: "Restorasi Gambut 3R & Aksi Komunitas",
    description: "Program Rewetting (pembasahan sekat kanal), Revegetasi, Revitalisasi ekonomi, serta dedikasi Masyarakat Peduli Api (MPA).",
    articleCount: 1,
    icon: "🤝",
    featuredSlug: "restorasi-gambut-dan-peran-masyarakat-peduli-api",
  },
  {
    code: "08",
    title: "Teknologi Perlindungan Hutan",
    subtitle: "IoT, Telemetri Cerdas & Respons Cepat",
    description: "Implementasi mikrokontroler ESP32, sensor kelembapan tanah, analisis ambang batas, dan sistem pembasahan otomatis AutoSpray.",
    articleCount: 1,
    icon: "⚡",
    featuredSlug: "teknologi-iot-dan-respons-cerdas-dihutan",
  },
];

export const educationArticlesData: Record<string, EducationArticle> = {
  "ekosistem-hutan-hujan-tropis-kalimantan": {
    slug: "ekosistem-hutan-hujan-tropis-kalimantan",
    categoryCode: "01",
    categoryTitle: "Mengenal Hutan Kalimantan",
    title: "Ekosistem Hutan Hujan Tropis Kalimantan: Paru-Paru Tua Nusantara",
    subtitle: "Menelusuri struktur kanopi bertingkat, keanekaragaman hayati purba, dan bagaimana rimba Borneo memengaruhi sirkulasi monsun Asia.",
    heroImage: "/hutan.jpg",
    author: "Tim Kurasi Sains DiHutan",
    reviewer: "Balai Konservasi Sumber Daya Alam (BKSDA) Kalimantan Barat",
    readingTimeMinutes: 7,
    faktaMenarik: "Hutan hujan tropis Kalimantan diperkirakan telah berusia lebih dari 130 juta tahun, menjadikannya salah satu hutan hujan tertua di dunia — bahkan lebih tua dari hutan Amazon.",
    statusKonservasi: "Kawasan Lindung & Ekosistem Genting Terfragmentasi",
    referensiSumber: [
      "MacKinnon, K., et al. (1996). The Ecology of Kalimantan. Periplus Editions.",
      "WWF Indonesia — Laporan Status Konservasi Ekoregion Hutan Hujan Dataran Rendah Borneo.",
      "Kementerian Lingkungan Hidup dan Kehutanan (KLHK) — Statistik Kehutanan Indonesia.",
    ],
    sections: [
      {
        title: "01. Stratifikasi Kanopi Hutan Hujan Tropis",
        content:
          "Hutan hujan Kalimantan memiliki arsitektur vertikal yang sangat khas dan kompleks. Formasi vegetasi terbagi dalam empat strata utama:\n\n1. **Lapisan Emergen (Pohon Menjulang):** Pohon-pohon raksasa setinggi 50 hingga 70 meter yang menembus atap kanopi, sebagian besar didominasi oleh keluarga Dipterocarpaceae.\n2. **Lapisan Kanopi Utama:** Kanopi rapat di ketinggian 30–45 meter yang menyerap hampir 85% sinar matahari tropis, menjadi koridor perpindahan utama bagi primata dan burung rimba.\n3. **Lapisan Bawah (Understory):** Pohon-pohon muda, perdu, palem hutan, dan semak belukar yang beradaptasi dengan pencahayaan temaram.\n4. **Lantai Hutan:** Lapisan seresah daun dan mikroorganisme tanah yang mengurai biomassa organik dengan kecepatan tinggi berkat kelembapan konstan di atas 80%.",
      },
      {
        title: "02. Hubungan Hutan dengan Siklus Hidrologi DAS Kapuas",
        content:
          "Hutan Kalimantan berfungsi layaknya spons raksasa (*sponge effect*). Kanopi lebat memecah energi kinetik tetesan air hujan monsun, mengurangi erosi lereng, dan memungkinkan air terserap perlahan ke dalam akuifer tanah.\n\nAir tanah ini kemudian dilepaskan secara bertahap menuju anak-anak sungai yang bermuara ke Sungai Kapuas, memastikan ketersediaan pasokan air tawar sepanjang tahun sekaligus meminimalkan ancaman banjir bandang di kawasan hilir pesisir Pontianak dan Kubu Raya.",
      },
      {
        title: "03. Ancaman Deforestasi dan Fragmentasi Habitat",
        content:
          "Pembukaan lahan skala besar dan kebakaran berulang telah memecah hamparan rimba menjadi pulau-pulau hutan terisolasi. Fragmentasi ini menyulitkan pertukaran genetik populasi satwa endemik serta memperluas tepi hutan (*edge effect*) yang lebih rentan terhadap kekeringan mikro dan angin kencang.",
      },
    ],
  },

  "pohon-ulin-besi-rimba-kalimantan": {
    slug: "pohon-ulin-besi-rimba-kalimantan",
    categoryCode: "02",
    categoryTitle: "Pohon dan Flora",
    title: "Pohon Ulin: Ketangguhan Kayu Besi dan Simbol Ketahanan Hutan",
    subtitle: "Karakteristik anatomi, fungsi ekologis kanopi, dan sejarah kultural kayu Ulin di sepanjang jalur peradaban sungai Kalimantan.",
    scientificName: "Eusideroxylon zwageri Teijsm. & Binn.",
    heroImage: "/download-forest.jpg",
    author: "Tim Botani DiHutan",
    reviewer: "Pusat Penelitian Biomaterial BRIN & Peneliti Kehutanan UNTAN",
    readingTimeMinutes: 6,
    faktaMenarik: "Kayu Ulin memiliki massa jenis yang lebih besar dari air sehingga tenggelam jika diletakkan di sungai. Menariknya, kayu ini justru semakin keras dan tahan lapuk bila terendam air rawa gambut selama puluhan tahun.",
    statusKonservasi: "Vulnerable (Rentan) — IUCN Red List / Appendix II CITES",
    referensiSumber: [
      "Lemmens, R.H.M.J., et al. (1995). Plant Resources of South-East Asia (PROSEA) No 5(2): Timber trees.",
      "Kajian Etnobotani Masyarakat Dayak Kalimantan Barat terhadap Pemanfaatan Pohon Ulin.",
      "IUCN Red List of Threatened Species — Eusideroxylon zwageri assessment.",
    ],
    sections: [
      {
        title: "01. Morfologi dan Keunikan Anatomi",
        content:
          "Pohon Ulin dapat tumbuh mencapai diameter batang lebih dari 150 cm dengan tinggi melebihi 35 meter. Tajuknya rindang dengan daun tunggal berbentuk elips meruncing.\n\nKekuatan legendaris kayu Ulin berasal dari kandungan zat ekstraktif alami berupa senyawa silika dan fenolik tinggi yang menjadikannya sangat resisten terhadap rayap, serangga penggerek, jamur pelapuk, maupun air asam gambut.",
      },
      {
        title: "02. Pertumbuhan yang Sangat Lambat",
        content:
          "Ulin adalah spesies klimaks yang membutuhkan waktu berabad-abad untuk mencapai kematangan penuh. Pertumbuhan diameternya rata-rata hanya berkisar antara 0.5 hingga 1 cm per tahun.\n\nHal ini membuat Ulin sulit dibudidayakan secara komersial dan rentan mengalami kelangkaan parah apabila pohon-pohon tua di alam terus ditebang tanpa jeda regenerasi alami.",
      },
      {
        title: "03. Peran Kultural dan Perlindungan Alami",
        content:
          "Bagi masyarakat adat Kalimantan, Ulin adalah tiang penyangga rumah panggung panjang (*betang/radakng*), jembatan sungai, dan bahan atap sirap tradisional yang bertahan hingga ratusan tahun.\n\nSaat ini, perlindungan Ulin menjadi prioritas konservasi tinggi di taman-taman nasional dan kawasan hutan lindung Kalimantan Barat.",
      },
    ],
  },

  "orangutan-kalimantan-penjaga-kanopi": {
    slug: "orangutan-kalimantan-penjaga-kanopi",
    categoryCode: "03",
    categoryTitle: "Fauna Kalimantan",
    title: "Orangutan Kalimantan: Arsitek dan Penyemai Benih Kanopi Rimba",
    subtitle: "Mengenal biologi, pola perilaku membuat sarang, dan peran krusial kera besar satu-satunya di Asia bagi kelangsungan generasi pohon hutan.",
    scientificName: "Pongo pygmaeus (Linnaeus, 1760)",
    heroImage: "/orangutan-clean.webp",
    author: "Tim Primatologi DiHutan",
    reviewer: "Yayasan Penyelamatan Orangutan Borneo (BOSF) & BKSDA",
    readingTimeMinutes: 8,
    faktaMenarik: "Orangutan betina melahirkan anak hanya sekali setiap 7–8 tahun — interval kelahiran terpanjang di antara semua mamalia darat di bumi. Hal ini membuat pemulihan populasinya memerlukan waktu puluhan tahun.",
    statusKonservasi: "Critically Endangered (Kritis / Terancam Punah) — IUCN Red List",
    referensiSumber: [
      "Wich, S.A., et al. (2008). Orangutans: Geographic variation in behavioral ecology and conservation. Oxford University Press.",
      "PHVA Orangutan Indonesia — Population and Habitat Viability Assessment Report.",
      "BKSDA Kalimantan Barat — Sebaran Populasi Sub-spesies Pongo pygmaeus pygmaeus.",
    ],
    sections: [
      {
        title: "01. Sub-spesies di Kalimantan Barat",
        content:
          "Di Kalimantan Barat, sub-spesies yang mendiami hutan rawa gambut dan perbukitan adalah *Pongo pygmaeus pygmaeus*. Mereka memiliki bulu kemerahan lebat dan rambut pelindung panjang untuk menghadapi curah hujan tinggi.\n\nOrangutan adalah satwa arboreal terbesar di dunia yang menghabiskan lebih dari 90% waktu hidupnya di atas tajuk pohon kanopi hutan tropis.",
      },
      {
        title: "02. Peran Ekologis sebagai 'Petani Hutan'",
        content:
          "Orangutan memakan lebih dari 400 jenis tumbuhan hutan, terutama buah-buahan hutan berukuran besar seperti buah pohon genus *Ficus*, durian liar, dan pala hutan.\n\nKetika bergerak menjelajahi hutan hingga radius berkilo-kilometer, biji-biji buah yang mereka cerna dikeluarkan melalui kotoran dalam kondisi utuh bersama pupuk alami, memungkinkan hutan melakukan peremajaan secara berkelanjutan.",
      },
      {
        title: "03. Ancaman Karhutla dan Kabut Asap",
        content:
          "Kebakaran hutan gambut adalah salah satu musuh paling mematikan bagi orangutan. Selain kehilangan tajuk pohon tempat bersarang dan sumber pangan buah, partikulat asap tebal (PM2.5) menyebabkan infeksi saluran pernapasan akut (ISPA) parah pada bayi dan induk orangutan.",
      },
    ],
  },

  "anatomi-lahan-gambut-penyimpan-karbon-raksasa": {
    slug: "anatomi-lahan-gambut-penyimpan-karbon-raksasa",
    categoryCode: "04",
    categoryTitle: "Tanah Gambut",
    title: "Anatomi Lahan Gambut: Kubah Air, Karbon, dan Bahaya Api Bawah Tanah",
    subtitle: "Memahami struktur perlapisan gambut tropis Kalimantan Barat, kapasitas simpan air, serta fenomena kebakaran tanpa lidah api (smoldering fire).",
    heroImage: "/hutan.jpg",
    author: "Tim Hidrologi Lahan Basah DiHutan",
    reviewer: "Badan Restorasi Gambut dan Mangrove (BRGM) Republik Indonesia",
    readingTimeMinutes: 9,
    faktaMenarik: "Meskipun hanya menutupi sekitar 3% luas daratan bumi, lahan gambut menyimpan karbon dua kali lipat lebih banyak daripada seluruh hutan biomassa pohon yang ada di muka bumi digabungkan.",
    statusKonservasi: "Ekosistem Fungsi Lindung Kubah Gambut Wajib Terjaga",
    referensiSumber: [
      "Page, S.E., et al. (2011). Global storage of carbon in peatlands. Global Change Biology.",
      "Peraturan Pemerintah No. 71/2014 jo PP No. 57/2016 tentang Perlindungan dan Pengelolaan Ekosistem Gambut.",
      "Badan Restorasi Gambut dan Mangrove (BRGM) — Panduan Pembangunan Sekat Kanal Lahan Gambut.",
    ],
    sections: [
      {
        title: "01. Proses Pembentukan Kubah Gambut Purba",
        content:
          "Lahan gambut tropis Kalimantan terbentuk dari timbunan sisa-sisa vegetasi pohon, cabang, dan dedaunan yang tumbang ke dalam lingkungan rawa tergenang air asam selama ribuan tahun.\n\nKetiadaan oksigen (*kondisi anaerobik*) memperlambat pembusukan biologis, menghasilkan endapan bahan organik tebal yang membentuk morfologi cembung menyerupai kubah (*peat dome*) dengan ketebalan mencapai 3 hingga lebih dari 10 meter.",
      },
      {
        title: "02. Penampang Lapisan Tanah Gambut",
        content:
          "Secara vertikal, penampang kubah gambut terbagi menjadi tiga tingkatan kematangan bahan organik:\n\n1. **Lapisan Fibrik (Atas / Gambut Kasar):** Masih terlihat jelas serat-serat kayu dan daun, sangat porous, cepat mengering di musim kemarau dan menjadi pemicu utama kebakaran permukaan.\n2. **Lapisan Hemik (Tengah / Gambut Sedang):** Sebagian serat telah terurai, mengikat air dalam volume besar layaknya busa hidrolik alami.\n3. **Lapisan Saprik (Dasar / Gambut Matang):** Bahan organik telah terurai sempurna menjadi bubur hitam pekat yang bertengger di atas lapisan tanah mineral liat impermeabel.",
      },
      {
        title: "03. Bahaya Smoldering Fire (Api Tanpa Asap Tinggi)",
        content:
          "Ketika parit drainase dibuat untuk membuka lahan, air gambut terkuras dan kubah mengering (*subsidence*). Begitu terjadi pemicuan panas di permukaan, api merambat turun ke dalam tanah hingga kedalaman beberapa meter.\n\nApi bawah tanah ini tidak memunculkan lidah api berkobar tinggi, melainkan membara secara lambat (*smoldering*) selama berminggu-minggu, menghasilkan asap beracun tebal dan sulit dipadamkan kecuali dengan pembasahan ulang mendalam (*rewetting*).",
      },
    ],
  },

  "sungai-kapuas-urat-nadi-rimba-kalimantan-barat": {
    slug: "sungai-kapuas-urat-nadi-rimba-kalimantan-barat",
    categoryCode: "05",
    categoryTitle: "Sungai Kapuas",
    title: "Sungai Kapuas: Urat Nadi Ekologi dan Peradaban Kalimantan Barat",
    subtitle: "Mengenal sungai terpanjang di Indonesia sepanjang 1.143 km yang menyatukan kawasan pegunungan Muller, rawa Sentarum, hingga delta pesisir.",
    heroImage: "/download-forest.jpg",
    author: "Tim Ekologi Perairan DiHutan",
    reviewer: "Balai Wilayah Sungai Kalimantan I (BWSK I)",
    readingTimeMinutes: 7,
    faktaMenarik: "Sungai Kapuas menjadi habitat bagi lebih dari 300 spesies ikan air tawar, termasuk ikan Arwana Super Red (Scleropages formosus) yang merupakan ikan hias endemik bernilai konservasi sangat tinggi di dunia.",
    statusKonservasi: "Kawasan Koridor Ekologis & Sumber Air Baku Utama Kalbar",
    referensiSumber: [
      "Roberts, T.R. (1989). The freshwater fishes of western Borneo (Kalimantan Barat, Indonesia). California Academy of Sciences.",
      "BWSK I Pontianak — Rencana Pengelolaan Wilayah Sungai Kapuas.",
      "Kottelat, M., & Whitten, A.J. (1996). Freshwater Biodiversity in Asia with Special Reference to Fish.",
    ],
    sections: [
      {
        title: "01. Profil Geografis Sepanjang 1.143 Kilometer",
        content:
          "Sungai Kapuas berhulu di lereng Pegunungan Muller di jantung Kalimantan dan mengalir meliuk ke arah barat melintasi lima kabupaten/kota sebelum bermuara di Selat Karimata dekat Kota Pontianak.\n\nAliran ini membentuk jaringan anak sungai raksasa seperti Sungai Melawi, Sungai Sekayam, dan Sungai Landak yang mengalirkan miliaran meter kubik air hujan setiap musim monsun.",
      },
      {
        title: "02. Ekosistem Rawa Lebak Danau Sentarum",
        content:
          "Di bagian hulu Kapuas Hulu, terdapat kompleks Danau Sentarum seluas 132.000 hektar. Kawasan lahan basah internasional (Situs Ramsar) ini berfungsi sebagai pengatur debit alami Sungai Kapuas.\n\nSaat musim penghujan, danau menampung kelebihan luapan air sungai Kapuas; saat kemarau tiba, air danau perlahan mengalir kembali ke Kapuas, menjaga sungai tetap dapat dilayari.",
      },
      {
        title: "03. Tantangan Sedimentasi dan Pencemaran",
        content:
          "Aktivitas pertambangan emas tanpa izin (PETI) di sepanjang sempadan sungai serta erosi dari pembukaan lahan gambut telah menyebabkan pendangkalan dan peningkatan kekeruhan air yang mengancam biota perairan endemik.",
      },
    ],
  },

  "dinamika-karhutla-dan-bahaya-api-bawah-tanah": {
    slug: "dinamika-karhutla-dan-bahaya-api-bawah-tanah",
    categoryCode: "06",
    categoryTitle: "Kebakaran Hutan dan Lahan",
    title: "Dinamika Karhutla: Mengapa Api Gambut Sangat Sulit Dipadamkan?",
    subtitle: "Fisika pembakaran biomassa gambut, indeks kekeringan tanah, bahaya polusi kabut asap PM2.5, dan pentingnya pencegahan dini.",
    heroImage: "/hutan.jpg",
    author: "Tim Mitigasi Karhutla DiHutan",
    reviewer: "Manggala Agni Daops Kalimantan Barat",
    readingTimeMinutes: 7,
    faktaMenarik: "Api di lahan gambut dapat terus membara di kedalaman 1–2 meter di bawah tanah selama berbulan-bulan meskipun di permukaan tanah turun hujan ringan. Api ini baru padam jika air tanah kembali naik merendam kubah gambut.",
    statusKonservasi: "Kedaruratan Bencana Lingkungan & Kesehatan Publik",
    referensiSumber: [
      "Rein, G. (2013). Smouldering fires and natural fuels. Fire Phenomena and the Earth System.",
      "Kementerian Lingkungan Hidup dan Kehutanan — Standar Operasional Pemadaman Darat Manggala Agni.",
      "BMKG — Buletin Pemantauan Titik Panas (Hotspot) dan Indeks Kebakaran Hutan.",
    ],
    sections: [
      {
        title: "01. Segitiga Api di Hutan Tropis",
        content:
          "Kebakaran hutan membutuhkan tiga elemen: bahan bakar (biomassa kering), oksigen, dan sumber panas. Di hutan gambut Kalimantan, bahan bakar melimpah bukan hanya daun kering di kanopi, melainkan lapisan tanah itu sendiri yang 100% merupakan bahan organik mudah terbakar saat kadar airnya merosot di bawah 30%.",
      },
      {
        title: "02. Perbedaan Flaming Fire dan Smoldering Fire",
        content:
          "Kebakaran di hutan tanah mineral umumnya berupa *flaming fire* (kobaran api di permukaan dengan suhu tinggi 800°C–1200°C) yang bergerak cepat tetapi relatif mudah dideteksi.\n\nSebaliknya, kebakaran gambut adalah *smoldering fire* (pembakaran tanpa api berkobar pada suhu 450°C–600°C). Proses ini berlangsung lambat tanpa nyala terang, menjalar di bawah tanah mengikuti urat-urat akar kayu purba yang kering.",
      },
      {
        title: "03. Ancaman Partikulat Halus PM2.5",
        content:
          "Pembakaran gambut tidak sempurna melepaskan partikulat ultra-halus (PM2.5) bersama gas karbon monoksida, metana, dan senyawa organik volatil (VOC). Partikulat ini sangat kecil sehingga dapat menembus alveolus paru-paru manusia, memicu krisis kesehatan massal berupa asma akut, bronkitis, dan penurunan fungsi pernapasan pada anak-anak.",
      },
    ],
  },

  "restorasi-gambut-dan-peran-masyarakat-peduli-api": {
    slug: "restorasi-gambut-dan-peran-masyarakat-peduli-api",
    categoryCode: "07",
    categoryTitle: "Konservasi dan Pelestarian",
    title: "Restorasi Gambut 3R dan Garda Terdepan Masyarakat Peduli Api",
    subtitle: "Strategi Rewetting, Revegetation, Revitalization, serta dedikasi para sukarelawan lokal menjaga benteng terakhir kelestarian rimba.",
    heroImage: "/download-forest.jpg",
    author: "Tim Komunitas & Restorasi DiHutan",
    reviewer: "Kelompok Masyarakat Peduli Api (MPA) Kubu Raya",
    readingTimeMinutes: 6,
    faktaMenarik: "Sekat kanal sederhana berbahan kayu lokal yang dibuat oleh warga terbukti mampu menaikkan muka air gambut hingga radius 500 meter di sekitarnya, mengembalikan kelembapan alami lahan yang sebelumnya kritis.",
    statusKonservasi: "Gerakan Partisipasi Komunitas Berkelanjutan",
    referensiSumber: [
      "Badan Restorasi Gambut dan Mangrove (BRGM) — Rencana Kerja Restorasi Gambut Tahunan.",
      "CIFOR — Community-based peatland restoration and fire prevention in Indonesia.",
      "Panduan Teknis Pembentukan dan Pembinaan Regu Masyarakat Peduli Api (MPA).",
    ],
    sections: [
      {
        title: "01. Prinsip 3R Restorasi Gambut",
        content:
          "Program restorasi gambut di Indonesia berlandaskan pendekatan ilmiah terpadu 3R:\n\n1. **Rewetting (Pembasahan Kembali):** Membangun sekat kanal (*canal blocking*) dan sumur bor untuk menahan laju drainase air keluar dari kubah gambut.\n2. **Revegetation (Penanaman Kembali):** Menanam spesies pohon lokal ramah gambut yang tahan genangan air, seperti Jelutung Rawa (*Dyera polyphylla*), Belangeran (*Shorea balangeran*), dan Tengkawang.\n3. **Revitalization (Revitalisasi Mata Pencaharian):** Mengembangkan budidaya lebah madu kelulut, perikanan rawa air hitam, dan agroforestri ramah gambut agar masyarakat tidak perlu mengeringkan atau membakar lahan.",
      },
      {
        title: "02. Masyarakat Peduli Api (MPA)",
        content:
          "MPA adalah regu sukarelawan warga desa sekitar hutan yang dilatih oleh pemerintah dan lembaga konservasi untuk melakukan patroli teratur, verifikasi hotspot, serta pemadaman awal sebelum api membesar.\n\nMereka adalah garda terdepan yang paling mengenal seluk-beluk medan hutan dan lokasi parit air di wilayahnya.",
      },
      {
        title: "03. Integrasi Teknologi dengan Aksi Komunitas",
        content:
          "Platform DiHutan dirancang untuk memperkuat MPA dengan memberi data kelembapan tanah dini dan alat pelaporan cepat via smartphone, sehingga patroli dapat diarahkan secara presisi ke titik-titik yang paling berisiko.",
      },
    ],
  },

  "teknologi-iot-dan-respons-cerdas-dihutan": {
    slug: "teknologi-iot-dan-respons-cerdas-dihutan",
    categoryCode: "08",
    categoryTitle: "Teknologi Perlindungan Hutan",
    title: "Teknologi IoT dan Respons Cerdas: Sinergi Digital Menjaga Rimba",
    subtitle: "Bagaimana mikrokontroler ESP32, sensor kelembapan tanah, dan aktuator AutoSpray membentuk ekosistem pencegahan kebakaran otomatis.",
    heroImage: "/app-screenshot.png",
    author: "Tim Rekayasa IoT DiHutan",
    reviewer: "Laboratorium Komputasi & Jaringan Teknik Elektro UNTAN",
    readingTimeMinutes: 7,
    faktaMenarik: "Sensor kelembapan tanah di pos DiHutan bekerja dengan konsumsi arus kurang dari 20 mA, memungkinkan satu panel surya mini 10W mengisi baterai lithium yang mampu menghidupkan stasiun pemantau hingga 3 minggu berturut-turut tanpa terik matahari penuh.",
    statusKonservasi: "Solusi Terapan Mitigasi Presisi Berbasis Sains Terbuka",
    referensiSumber: [
      "Espressif Systems — ESP32 Technical Reference Manual and Low Power Modes.",
      "IEEE Internet of Things Journal — Forest Fire Early Detection through Wireless Sensor Networks.",
      "DiHutan Platform Whitepaper — Architecture of Peatland Hydrology Monitoring.",
    ],
    sections: [
      {
        title: "01. Rantai Sinyal: Dari Tanah ke Layar",
        content:
          "Sistem DiHutan memadukan perangkat keras tangguh di lapangan dengan perangkat lunak visual di cloud:\n\n1. **Probe Tanah:** Mengukur konduktivitas kadar air gambut setiap 30 detik.\n2. **Sensor DHT11 & MQ:** Membaca iklim mikro udara dan memastikan ketiadaan partikel asap pembakaran.\n3. **Mikrokontroler ESP32:** Menjalankan kalibrasi sinyal, memfilter derau (*noise filtering*), dan mengirim paket telemetri terenkripsi via Wi-Fi/GSM.\n4. **Database & Peta Web:** Menampilkan status terkini secara real-time pada peta geografis Sungai Kapuas.",
      },
      {
        title: "02. Mekanisme Respons Pompa AutoSpray",
        content:
          "AutoSpray adalah sistem aktuasi otomatis berbasis ambang batas (*threshold-based automation*).\n\nKetika sensor kelembapan tanah mencatat nilai kritis (<30%) selama 3 siklus pembacaan berturut-turut, mikrokontroler mengirim pulsa logika ke modul relay untuk mengaktifkan pompa air mini. Air dari sekat kanal disemprotkan secara merata untuk membasahi kembali lapisan atas gambut tanpa perlu menunggu tim pemadam tiba.",
      },
      {
        title: "03. Filosofi Desain: Kendali Tetap di Tangan Manusia",
        content:
          "Sistem otomatisasi DiHutan tidak menggantikan peran manusia. Setiap aksi pompa terekam dalam riwayat log operasional, dan petugas rimba selalu memiliki opsi *override manual* untuk mematikan atau menyalakan aktuasi sesuai pertimbangan visual lapangan.",
      },
    ],
  },
};

// ==============================================================================
// 4. COMMUNITY REPORTS — PELAPORAN MASYARAKAT
// ==============================================================================

export type ReportStatus = "TERKIRIM" | "DIVERIFIKASI" | "INVESTIGASI" | "SELESAI";

export interface CommunityReport {
  id: string;
  reporterName: string;
  reporterPhone?: string;
  title: string;
  incidentType: "Indikasi Asap" | "Kebakaran Gambut" | "Kekeringan Parit" | "Aktivitas Ilegal" | "Lainnya";
  locationName: string;
  coordinates?: [number, number];
  description: string;
  photoUrl?: string;
  status: ReportStatus;
  officerNotes?: string;
  verifiedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export const initialReportsData: CommunityReport[] = [
  {
    id: "rep-001",
    reporterName: "Supardi (Warga MPA)",
    reporterPhone: "0813-4567-8901",
    title: "Asap Tipis Keluar dari Parit Gambut Kering",
    incidentType: "Indikasi Asap",
    locationName: "Dusun Rasau Karya, KM 14, Kubu Raya",
    coordinates: [109.3982, -0.2315],
    description: "Melihat kepulan asap tipis berbau gambut terbakar di dekat sempadan parit sekunder yang airnya surut. Belum ada kobaran api besar di permukaan.",
    photoUrl: "/hutan.jpg",
    status: "INVESTIGASI",
    officerNotes: "Tim patroli Manggala Agni Posko Rasau Jaya telah menuju lokasi dengan pompa jinjing.",
    verifiedBy: "Petugas Lapangan BKSDA",
    createdAt: "Hari ini, 09:15 WIB",
    updatedAt: "Hari ini, 10:30 WIB",
  },
  {
    id: "rep-002",
    reporterName: "Hendra Wijaya",
    reporterPhone: "0852-9876-5432",
    title: "Pintu Sekat Kanal Rusak Tertimpa Batang Kayu",
    incidentType: "Kekeringan Parit",
    locationName: "Sekat Kanal No. 04, Sungai Kakap",
    coordinates: [109.2145, -0.0512],
    description: "Papan sekat kanal retak sehingga air gambut terbuang deras ke arah muara laut. Perlu perbaikan penahan air.",
    status: "DIVERIFIKASI",
    officerNotes: "Laporan diteruskan ke Dinas LHK Kalbar untuk alokasi logistik perbaikan sekat.",
    verifiedBy: "Admin Posko DiHutan",
    createdAt: "Kemarin, 14:20 WIB",
    updatedAt: "Kemarin, 16:00 WIB",
  },
  {
    id: "rep-003",
    reporterName: "Dedi Kurniawan (Relawan)",
    reporterPhone: "0821-1122-3344",
    title: "Pemadaman Selesai di Kebun Gambut Terbengkalai",
    incidentType: "Kebakaran Gambut",
    locationName: "Desa Limbung, Kubu Raya",
    coordinates: [109.3789, -0.1245],
    description: "Area gambut 50x50 meter telah dibasahi hingga kedalaman 60 cm menggunakan air parit primer. Suhu tanah kembali di bawah 28°C.",
    status: "SELESAI",
    officerNotes: "Kondisi dinyatakan dingin aman. Lokasi tetap dalam pengawasan sensor berkala.",
    verifiedBy: "Danru Manggala Agni",
    createdAt: "2 hari yang lalu",
    updatedAt: "Kemarin, 11:00 WIB",
  },
];

