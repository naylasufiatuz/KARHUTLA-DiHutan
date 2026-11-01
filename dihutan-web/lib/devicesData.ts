import { DeviceItem } from "@/components/DeviceGalleryWithModal";

export const iotMonitoringDevices: DeviceItem[] = [
  {
    id: "soil-moisture-sensor",
    name: "Sensor Kelembapan Tanah (Soil Moisture Probe)",
    category: "Sensor Lapangan",
    tag: "Telemetri Air",
    shortDesc: "Mendeteksi tingkat kejenuhan air tanah gambut secara berkala dengan pembacaan akurat.",
    image: "/assets/technology/Soil Moisture Sensor Module and Probe.png",
    fullDesc:
      "Modul sensor kelembapan tanah yang dilengkapi probe elektroda garpu anti-korosi. Alat ini ditancapkan langsung ke lapisan tanah gambut untuk membaca resistansi tanah secara real-time. Ketika gambut basah, konduktivitas tinggi terbaca sebagai kondisi lembap aman; ketika air gambut surut dan tanah mengering, nilai resistansi naik memicu peringatan ke mikrokontroler.",
    specs: [
      { label: "Tegangan Kerja", value: "3.3V – 5.0V DC" },
      { label: "Antarmuka Output", value: "Analog (AO) & Digital (DO)" },
      { label: "Konsumsi Arus", value: "< 20 mA (Hemat Energi)" },
      { label: "Kedalaman Ukur", value: "38 mm – 50 mm di bawah tanah" },
      { label: "Rentang Deteksi", value: "0% – 100% Relative Moisture" },
      { label: "Kalibrasi", value: "Potensiometer sensitivitas bawaan" },
    ],
    fieldRole:
      "Ditempatkan di titik pantau gambut kritis untuk mendeteksi penurunan muka air tanah sebelum lapisan atas mengering dan rentan terbakar.",
    benefits: [
      "Respons pembacaan instan terhadap fluktuasi kadar air",
      "Konsumsi daya sangat hemat, cocok untuk instalasi bertenaga surya",
      "Probe elektroda berlapis nikel untuk ketahanan tanah asam gambut",
    ],
  },
  {
    id: "esp32-dev-board",
    name: "Papan Mikrokontroler ESP32 Dual-Core",
    category: "Pusat Pemrosesan",
    tag: "Otak & WiFi",
    shortDesc: "Komputer mini berkekuatan dual-core yang mengolah data sensor dan mentransmisikan ke cloud.",
    image: "/assets/technology/ESP32 Development Board Product Cutout.png",
    fullDesc:
      "ESP32 adalah mikrokontroler canggih yang bertindak sebagai otak utama dari Pos Jaga DiHutan. Papan ini membaca sinyal dari sensor kelembapan, menjalankan algoritma ambang batas (threshold filtering), dan mengirimkan paket telemetri ke server cloud platform DiHutan melalui konektivitas nirkabel Wi-Fi atau Bluetooth.",
    specs: [
      { label: "Prosesor", value: "Xtensa Dual-Core 32-bit LX6 (240 MHz)" },
      { label: "Memori", value: "520 KB SRAM, 4 MB SPI Flash" },
      { label: "Konektivitas", value: "Wi-Fi 802.11 b/g/n & Bluetooth v4.2 BR/EDR/BLE" },
      { label: "Pin I/O", value: "36 GPIO dengan ADC 12-bit & DAC" },
      { label: "Mode Daya", value: "Active, Modem-sleep, Light-sleep, Deep-sleep (10µA)" },
      { label: "Protokol", value: "MQTT, HTTP/HTTPS, WebSockets" },
    ],
    fieldRole:
      "Menerima sinyal sensor, memvalidasi data lapangan, mengeksekusi logika aktuasi, dan mengirimkan status ke dasbor pemantauan.",
    benefits: [
      "Kapasitas komputasi tinggi untuk pemrosesan sinyal lokal secara cepat",
      "Modul nirkabel bawaan tanpa perlu komponen tambahan yang memakan daya",
      "Mendukung mode Deep-Sleep cerdas untuk ketahanan baterai berbulan-bulan",
    ],
  },
  {
    id: "esp32-expansion-board",
    name: "Papan Ekspansi I/O Terminal ESP32",
    category: "Distribusi Sinyal & Daya",
    tag: "Manajemen Kabel",
    shortDesc: "Memudahkan interkoneksi sensor, modul daya, dan kabel lapangan dengan aman dan kokoh.",
    image: "/assets/technology/ESP32 Expansion Board Close-Up.png",
    fullDesc:
      "Papan ekspansi khusus yang dirancang untuk memasang ESP32 di dalam wadah tahan cuaca (enclosure IP65). Menyediakan deretan terminal baut (screw terminals) dan header 3-pin (VCC, GND, Signal) untuk setiap jalur GPIO, menjamin sambungan kabel sensor tidak mudah longgar akibat getaran atau kelembapan hutan.",
    specs: [
      { label: "Kompatibilitas", value: "ESP32 NodeMCU 30-pin & 38-pin" },
      { label: "Terminal Output", value: "Screw Terminal Block & 3-Pin Sensor Headers" },
      { label: "Input Catu Daya", value: "Jack DC 6.5V – 16V / Port Type-C" },
      { label: "Regulator Internal", value: "Step-Down 5V & 3.3V Teregulasi" },
      { label: "Proteksi", value: "Dioda Polaritas Terbalik & Filter Kapasitor" },
      { label: "Dimensi", value: "Kompak untuk box instalasi lapangan" },
    ],
    fieldRole:
      "Menghubungkan mikrokontroler ke sensor tanah dan modul kendali secara rapi dan terlindung dari korsleting.",
    benefits: [
      "Pemasangan kabel cepat dan kokoh dengan baut terminal industri",
      "Menyediakan rel daya 5V dan 3.3V stabil untuk berbagai modul",
      "Mencegah kekusutan kabel yang mempersulit perawatan berkala",
    ],
  },
  {
    id: "power-adapter",
    name: "Adaptor Daya Switching DC Teregulasi",
    category: "Catu Daya",
    tag: "Suplai Energi",
    shortDesc: "Menyuplai tegangan stabil untuk seluruh modul elektronik dan mikrokontroler di pos jaga.",
    image: "/assets/technology/adaptor.png",
    fullDesc:
      "Unit konversi daya teregulasi yang mengubah tegangan sumber menjadi tegangan stabil 5V/12V DC dengan riak (ripple) sangat rendah. Unit ini dapat dihubungkan ke sumber listrik pos jaga atau solar charge controller panel surya untuk menjamin sistem pengamatan terus aktif 24 jam nonstop.",
    specs: [
      { label: "Rentang Input", value: "100V – 240V AC 50/60Hz / Solar Inverter" },
      { label: "Tegangan Output", value: "5V / 12V DC Stabil" },
      { label: "Arus Maksimal", value: "2.0 Ampere (Daya 24W)" },
      { label: "Konektor", value: "Jack DC 5.5mm x 2.1mm Standar" },
      { label: "Efisiensi Daya", value: "> 85% dengan sertifikasi proteksi" },
      { label: "Sistem Pengaman", value: "Over-voltage, Over-current & Short-circuit" },
    ],
    fieldRole:
      "Memberikan pasokan listrik bersih dan stabil ke seluruh sistem telemetri tanah tanpa lonjakan tegangan.",
    benefits: [
      "Melindungi sirkuit mikrokontroler dari lonjakan tegangan listrik",
      "Kompak, efisien, dan tidak menghasilkan panas berlebih",
      "Bekerja stabil dalam rentang suhu tropis Kalimantan Barat",
    ],
  },
];

export const autoSprayDevices: DeviceItem[] = [
  {
    id: "mini-water-pump",
    name: "Pompa Air Mini & Selang Fleksibel Bening",
    category: "Aktuator Respons",
    tag: "Pompa Pembasahan",
    shortDesc: "Unit pendorong air kompak untuk mengalirkan air pembasah ke titik gambut kritis.",
    image: "/assets/technology/Mini Water Pump with Coiled Clear Tubing.png",
    fullDesc:
      "Pompa air DC mini tipe submersible/inline yang dirancang untuk mengalirkan air dari sekat kanal, parit, atau reservoir penampung ke area lahan gambut yang terdeteksi mengalami kekeringan ekstrem. Dilengkapi selang fleksibel bening untuk penyaluran terarah ke sprinkler atau pipa porous pembasahan tanah.",
    specs: [
      { label: "Tegangan Operasi", value: "3V – 6V DC (atau opsi 12V DC)" },
      { label: "Debit Aliran Air", value: "80 – 120 Liter/jam" },
      { label: "Daya Angkat (Head)", value: "0.4 – 1.1 meter vertikal" },
      { label: "Diameter Selang", value: "Selang bening fleksibel 7mm/8mm" },
      { label: "Tipe Motor", value: "Brushless DC Motor (rendah friksi)" },
      { label: "Penggunaan Daya", value: "Dapat beroperasi dari baterai 5V / Solar" },
    ],
    fieldRole:
      "Mengalirkan air pembasahan secara otomatis ketika data kelembapan tanah melewati batas bahaya kekeringan.",
    benefits: [
      "Ukuran ringkas mudah ditempatkan langsung di parit gambut atau sekat kanal",
      "Konsumsi daya ramah baterai dan panel surya lapangan",
      "Selang transparan memudahkan pemeriksaan visual adanya lumut atau sumbatan",
    ],
  },
  {
    id: "solenoid-valve",
    name: "Katup Solenoid Elektrik (Normally Closed)",
    category: "Pengendali Aliran",
    tag: "Presisi Jalur Air",
    shortDesc: "Membuka dan menutup aliran air pipa secara otomatis melalui sinyal perintah elektronik.",
    image: "/assets/technology/Solenoid Valve Assembly Product Shot.png",
    fullDesc:
      "Katup gerbang elektromagnetik presisi tinggi tipe Normally Closed (tertutup saat tidak ada arus). Begitu mikrokontroler mendeteksi kebutuhan pembasahan dan relay aktif, kumparan solenoid membangkitkan medan magnet untuk membuka diafragma katup, mengalirkan air ke nosel semprot spesifik tanpa pemborosan air.",
    specs: [
      { label: "Tegangan Kerja", value: "12V DC (respons cepat < 100ms)" },
      { label: "Status Standby", value: "Normally Closed (NC) - Mencegah kebocoran" },
      { label: "Tekanan Operasi", value: "0.02 – 0.8 MPa" },
      { label: "Ukuran Drat/Pipa", value: "1/2 inci ulir standar perpipaan" },
      { label: "Ketahanan Material", value: "Bodi polimer teknik & kuningan anti-karat" },
      { label: "Media Cairan", value: "Air tawar parit gambut yang telah disaring" },
    ],
    fieldRole:
      "Membagi dan mengatur jalur air ke zona-zona lahan tertentu sesuai perintah otomatis sistem.",
    benefits: [
      "Mencegah kebocoran air saat sistem pompa dalam status siaga",
      "Kecepatan buka-tutup dalam hitungan milidetik",
      "Memungkinkan zonasi pembasahan terarah hanya ke area yang membutuhkan",
    ],
  },
  {
    id: "relay-module",
    name: "Modul Relay Biru 1-Channel dengan Optocoupler",
    category: "Sakelar Elektromekanik",
    tag: "Isolasi Beban",
    shortDesc: "Menghubungkan sinyal kontrol logika 3.3V dengan beban daya pompa air secara aman.",
    image: "/assets/technology/Blue Relay Module PCB Product Shot.png",
    fullDesc:
      "Modul sakelar elektromekanik yang dilengkapi komponen isolasi optocoupler (isolasi galvanis). Alat ini memungkinkan mikrokontroler ESP32 yang beroperasi pada sinyal 3.3V yang sensitif untuk mengaktifkan pompa air dan katup solenoid berdaya tinggi tanpa risiko lonjakan arus balik (*inductive back-EMF*).",
    specs: [
      { label: "Sinyal Pemicu", value: "3.3V – 5V DC (Active LOW / HIGH)" },
      { label: "Beban Kontak AC", value: "250V AC / 10A (hingga 2500W)" },
      { label: "Beban Kontak DC", value: "30V DC / 10A" },
      { label: "Proteksi Isolasi", value: "Optocoupler bawaan untuk proteksi CPU" },
      { label: "Indikator Status", value: "LED Daya (Merah) & LED Aktif (Hijau)" },
      { label: "Konfigurasi Kontak", value: "COM, NO (Normally Open), NC (Normally Closed)" },
    ],
    fieldRole:
      "Menjadi jembatan kendali aman antara keputusan otomatis di software dengan aksi fisik pompa di alam.",
    benefits: [
      "Mengamankan mikrokontroler dari lonjakan tegangan motor pompa",
      "Lampu indikator mempermudah inspeksi visual langsung di lapangan",
      "Kapasitas beban besar, mampu menggerakkan pompa submersible lebih besar",
    ],
  },
  {
    id: "power-adapter-spray",
    name: "Adaptor Daya & Sistem Suplai Aktuator",
    category: "Catu Daya",
    tag: "Energi Aktuator",
    shortDesc: "Menghasilkan arus listrik yang cukup untuk menggerakkan motor pompa dan koil katup solenoid.",
    image: "/assets/technology/adaptor.png",
    fullDesc:
      "Unit suplai daya berkapasitas arus tinggi untuk menggerakkan beban mekanis pompa dan elektromagnetik solenoid. Menggunakan sirkuit switching terlindung untuk memastikan kestabilan tegangan saat pompa mengalami lonjakan arus awal (inrush current) saat pertama kali menyala.",
    specs: [
      { label: "Input Sumber", value: "100V – 240V AC / Sistem Aki Surya 12V" },
      { label: "Output Tegangan", value: "12V / 5V DC Teregulasi" },
      { label: "Kapasitas Arus", value: "2.0A – 3.0A Puncak" },
      { label: "Efisiensi Konversi", value: "> 85% dengan pendinginan pasif" },
      { label: "Fitur Keamanan", value: "Thermal Cut-off & Overcurrent Protection" },
      { label: "Proteksi Kabel", value: "Insulasi tahan lembap standar industri" },
    ],
    fieldRole:
      "Memberikan dorongan arus yang memadai saat pompa dan katup solenoid diaktifkan secara bersamaan.",
    benefits: [
      "Tahan terhadap lonjakan arus awal (*inrush current*) pompa",
      "Menjaga tegangan tetap stabil sehingga pompa berputar optimal",
      "Didesain untuk keandalan tinggi dan penggunaan jangka panjang",
    ],
  },
];

