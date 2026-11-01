"use client";

import React, { useEffect } from "react";
import Image from "next/image";

export interface PosInfo {
  id: string;
  posNumber: string;
  tagline: string;
  title: string;
  subtitle: string;
  iconSvg?: string;
  image: string;
  summary: string;
  fullDescription: string;
  hardwareList: { name: string; role: string }[];
  workflow: { step: string; title: string; desc: string }[];
  highlights: string[];
  statusNote: string;
}

export const POS_DATA: Record<string, PosInfo> = {
  "iot-monitoring": {
    id: "iot-monitoring",
    posNumber: "POS 01",
    tagline: "Telemetri Lapangan · Mengamati",
    title: "IoT Monitoring",
    subtitle: "Deteksi Detak Kelembapan Tanah Gambut Real-Time",
    image: "/assets/technology/Soil Moisture Sensor Module and Probe.png",
    summary:
      "Sensor kelembapan tanah dan mikrokontroler ESP32 memeriksa kondisi hidrologi tanah secara berkala dan mengirim data ke platform pemantauan.",
    fullDescription:
      "Pos Jaga 01 berfokus pada pengumpulan data lapangan secara berkelanjutan. Probe sensor kelembapan tanah ditancapkan langsung ke lapisan tanah gambut untuk membaca tingkat kejenuhan air (soil moisture content). Data analog diubah menjadi format digital oleh mikrokontroler ESP32, lalu ditransmisikan melalui jaringan nirkabel ke sistem pusat DiHutan. Ini menghilangkan kebutuhan petugas untuk memeriksa angka secara manual di lokasi pedalaman setiap saat.",
    hardwareList: [
      {
        name: "Sensor Kelembapan Tanah & Probe",
        role: "Membaca resistansi dan kadar air tanah gambut.",
      },
      {
        name: "Mikrokontroler ESP32 Dual-Core",
        role: "Otak pengolah sinyal & transmiter data Wi-Fi/Bluetooth.",
      },
      {
        name: "Papan Ekspansi I/O Terminal",
        role: "Menghubungkan kabel sensor dengan baut terminal industri.",
      },
      {
        name: "Adaptor Daya Teregulasi",
        role: "Menyuplai daya DC stabil 24 jam nonstop dari sistem surya.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Probe Mengukur",
        desc: "Elektroda garpu membaca konduktivitas tanah gambut setiap beberapa detik.",
      },
      {
        step: "02",
        title: "ESP32 Mengolah",
        desc: "Mikrokontroler memfilter noise sinyal dan mencocokkan kalibrasi kelembapan.",
      },
      {
        step: "03",
        title: "Transmisi Telemetri",
        desc: "Data dikirim ke server pusat untuk divisualisasikan pada dasbor petugas.",
      },
    ],
    highlights: [
      "Deteksi dini kekeringan lapisan gambut berminggu-minggu sebelum muncul bara api",
      "Konsumsi daya ultra-rendah (< 20mA), dirancang untuk instalasi solar cell",
      "Data tercatat terus-menerus membentuk pola tren hidrologi historis",
    ],
    statusNote:
      "Perangkat fisik (probe, ESP32, expansion board, adaptor) telah tersedia di berkas proyek dan siap dirangkai di wadah tahan cuaca IP65.",
  },
  "ai-forest-guardian": {
    id: "ai-forest-guardian",
    posNumber: "POS 02",
    tagline: "Kecerdasan Buatan · Memahami",
    title: "AI Forest Guardian",
    subtitle: "Analitik Cerdas untuk Mengenali Anomali & Tren Bahaya",
    image: "/app-screenshot.png",
    summary:
      "Algoritma prediktif merangkum ribuan titik data sensor menjadi pemetaan risiko kebakaran yang jelas dan mudah ditindaklanjuti tim patroli.",
    fullDescription:
      "Pos Jaga 02 bertindak sebagai asisten analitis petugas rimba. Ketika sensor di ratusan hektar lahan mengirimkan angka secara konstan, manusia akan kesulitan membaca anomali dalam tabel angka mentah. AI Forest Guardian membandingkan tren penurunan kadar air tanah dengan data historis cuaca DAS Kapuas, lalu mengklasifikasikan wilayah ke dalam tiga tingkat risiko (Normal, Waspada, Bahaya) untuk mengarahkan prioritas patroli lapangan.",
    hardwareList: [
      {
        name: "Mesin Analisis Pola (AI Engine)",
        role: "Mencari anomali defisit air tanah yang tidak wajar.",
      },
      {
        name: "Indikator Status Bertingkat",
        role: "Klasifikasi visual hijau (aman), kuning (waspada), merah (kritis).",
      },
      {
        name: "Dasbor Peringatan Dini",
        role: "Mengirimkan notifikasi instan ke aplikasi petugas lapangan.",
      },
      {
        name: "Integrasi Pemicu AutoSpray",
        role: "Meneruskan status kritis ke Pos 03 untuk respons pembasahan.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Agregasi Data",
        desc: "Mengumpulkan data kelembapan, suhu udara, dan curah hujan dari seluruh pos.",
      },
      {
        step: "02",
        title: "Deteksi Pola Anomali",
        desc: "Mengidentifikasi penurunan air tanah cepat yang menandakan risiko karhutla.",
      },
      {
        step: "03",
        title: "Rekomendasi Tindakan",
        desc: "Menghasilkan peta prioritas patroli dan rute inspeksi terdekat bagi tim.",
      },
    ],
    highlights: [
      "Meringkas ribuan titik telemetri menjadi rekomendasi aksi yang lugas",
      "Keputusan akhir tetap berada di tangan petugas manusia yang berwenang",
      "Mencegah alarm palsu dengan memverifikasi data silang antar-sensor",
    ],
    statusNote:
      "Konsep antarmuka dasbor dan integrasi logika data telah dirancang untuk mendukung sistem peringatan dini terintegrasi.",
  },
  autospray: {
    id: "autospray",
    posNumber: "POS 03",
    tagline: "Mekanisme Otomasi · Menjaga",
    title: "AutoSpray",
    subtitle: "Sistem Pembasahan Cerdas Menjaga Muka Air Gambut",
    image: "/assets/technology/Mini Water Pump with Coiled Clear Tubing.png",
    summary:
      "Rancangan aktuator pompa air mini dan katup solenoid yang secara terarah membasahi kembali gambut saat terdeteksi kekeringan kritis.",
    fullDescription:
      "Pos Jaga 03 adalah wujud aksi fisik dari ekosistem DiHutan. Mengalirkan air ke lahan gambut yang terlanjur terbakar sangatlah sulit dan memakan jutaan liter air. AutoSpray bekerja secara preventif: begitu Pos 01 dan Pos 02 mendeteksi bahwa kelembapan tanah turun di bawah ambang batas aman (< 30%), relay mengaktifkan pompa air dan membuka katup solenoid untuk menyiramkan air sekat kanal secara terukur hingga tanah kembali basah.",
    hardwareList: [
      {
        name: "Pompa Air Mini Submersible",
        role: "Mendorong air dari parit sekat kanal ke area sasaran.",
      },
      {
        name: "Katup Solenoid Elektrik 12V",
        role: "Membuka dan menutup jalur aliran pipa air secara instan.",
      },
      {
        name: "Modul Relay Optocoupler",
        role: "Isolasi aman antara sinyal mikrokontroler 3.3V dan motor pompa.",
      },
      {
        name: "Selang Bening & Konektor Pipa",
        role: "Penyaluran air terarah langsung ke pori-pori tanah gambut.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Ambang Batas Kritis",
        desc: "Kelembapan tanah terbaca di bawah 30% memicu sinyal aktivasi sistem.",
      },
      {
        step: "02",
        title: "Aktivasi Relay & Katup",
        desc: "Koil solenoid membuka jalur air dan relay menyalakan motor pompa.",
      },
      {
        step: "03",
        title: "Pembasahan & Berhenti Otomatis",
        desc: "Air dialirkan hingga sensor membaca kelembapan kembali ke zona aman.",
      },
    ],
    highlights: [
      "Pembasahan preventif mencegah terbentuknya bara api di bawah permukaan gambut",
      "Bekerja otomatis namun tetap memiliki tombol override manual petugas",
      "Memanfaatkan cadangan air parit sekat kanal tanpa pemborosan",
    ],
    statusNote:
      "Komponen fisik pompa mini, katup solenoid, modul relay, dan selang telah tersedia dalam inventaris proyek.",
  },
};

interface PosDetailModalProps {
  posId: string | null;
  onClose: () => void;
  onSelectPos: (posId: string) => void;
}

const POS_ORDER = ["iot-monitoring", "ai-forest-guardian", "autospray"];

export default function PosDetailModal({
  posId,
  onClose,
  onSelectPos,
}: PosDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (posId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [posId, onClose]);

  if (!posId || !POS_DATA[posId]) return null;

  const currentPos = POS_DATA[posId];
  const currentIndex = POS_ORDER.indexOf(posId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectPos(POS_ORDER[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < POS_ORDER.length - 1) {
      onSelectPos(POS_ORDER[currentIndex + 1]);
    }
  };

  return (
    <div
      className="pos-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pos-modal-title"
    >
      <div className="pos-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pos-modal-header">
          <div>
            <span className="pos-modal-badge">
              {currentPos.posNumber} · {currentPos.tagline}
            </span>
            <h2 id="pos-modal-title">{currentPos.title}</h2>
            <p className="pos-modal-subtitle">{currentPos.subtitle}</p>
          </div>
          <button
            type="button"
            className="pos-modal-close-btn"
            onClick={onClose}
            aria-label="Tutup penjelasan pos"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="pos-modal-body">
          {/* Top Row: Visual + Core Explanation */}
          <div className="pos-modal-overview-grid">
            <div className="pos-modal-img-box">
              <Image
                src={currentPos.image}
                alt={currentPos.title}
                width={380}
                height={220}
                className="pos-modal-img"
                priority
              />
              <span className="pos-modal-img-caption">
                Visualisasi komponen &amp; peran di {currentPos.posNumber}
              </span>
            </div>

            <div className="pos-modal-summary-box">
              <h3>Peran Pos dalam Perlindungan Rimba</h3>
              <p className="pos-modal-desc-text">{currentPos.fullDescription}</p>

              <div className="pos-modal-note-box">
                <strong>Status Komponen:</strong> {currentPos.statusNote}
              </div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="pos-modal-section">
            <h3>Alur Operasional {currentPos.title}</h3>
            <div className="pos-modal-workflow-grid">
              {currentPos.workflow.map((w) => (
                <div key={w.step} className="pos-workflow-card">
                  <span className="pos-workflow-num">{w.step}</span>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware List / Components */}
          <div className="pos-modal-section">
            <h3>Komponen &amp; Perangkat yang Terlibat</h3>
            <div className="pos-modal-hardware-grid">
              {currentPos.hardwareList.map((hw) => (
                <div key={hw.name} className="pos-hw-item">
                  <strong>{hw.name}</strong>
                  <p>{hw.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="pos-modal-section">
            <h3>Keunggulan &amp; Nilai Nyata di Lahan Gambut</h3>
            <ul className="pos-modal-highlights">
              {currentPos.highlights.map((h, i) => (
                <li key={i}>
                  <span className="pos-check-icon">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pos-modal-footer">
          <div className="pos-modal-nav">
            <button
              type="button"
              className="pos-nav-btn"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              ← Pos Sebelumnya
            </button>
            <span className="pos-nav-indicator">
              Pos {currentIndex + 1} dari {POS_ORDER.length}
            </span>
            <button
              type="button"
              className="pos-nav-btn"
              onClick={handleNext}
              disabled={currentIndex >= POS_ORDER.length - 1}
            >
              Pos Selanjutnya →
            </button>
          </div>

          <button
            type="button"
            className="pos-close-cta"
            onClick={onClose}
          >
            Tutup Penjelasan
          </button>
        </div>
      </div>
    </div>
  );
}

