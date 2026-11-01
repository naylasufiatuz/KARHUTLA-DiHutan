"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TechNav from "@/components/TechNav";
import TechFooter from "@/components/TechFooter";
import PosDetailModal from "@/components/PosDetailModal";

export default function TechnologyView() {
  const [selectedPos, setSelectedPos] = useState<string | null>(null);

  const hardwareOverview = [
    {
      name: "Sensor Kelembapan Tanah",
      pos: "Pos 01 · IoT",
      img: "/assets/technology/Soil Moisture Sensor Module and Probe.png",
      desc: "Probe tanah anti-korosi untuk memantau kadar air gambut.",
      posId: "iot-monitoring",
    },
    {
      name: "ESP32 Dev Board",
      pos: "Pos 01 · IoT",
      img: "/assets/technology/ESP32 Development Board Product Cutout.png",
      desc: "Prosesor dual-core 240MHz dengan konektivitas Wi-Fi terintegrasi.",
      posId: "iot-monitoring",
    },
    {
      name: "Papan Ekspansi I/O",
      pos: "Pos 01 · IoT",
      img: "/assets/technology/ESP32 Expansion Board Close-Up.png",
      desc: "Terminal baut kokoh dan stabilisator daya untuk instalasi hutan.",
      posId: "iot-monitoring",
    },
    {
      name: "Pompa Air Mini",
      pos: "Pos 03 · AutoSpray",
      img: "/assets/technology/Mini Water Pump with Coiled Clear Tubing.png",
      desc: "Pompa pendorong air submersible dengan selang bening presisi.",
      posId: "autospray",
    },
    {
      name: "Katup Solenoid Elektrik",
      pos: "Pos 03 · AutoSpray",
      img: "/assets/technology/Solenoid Valve Assembly Product Shot.png",
      desc: "Pengatur buka-tutup jalur air hidrolik secara instan.",
      posId: "autospray",
    },
    {
      name: "Modul Relay Optocoupler",
      pos: "Pos 03 · AutoSpray",
      img: "/assets/technology/Blue Relay Module PCB Product Shot.png",
      desc: "Sakelar pemisah beban daya tinggi untuk menggerakkan pompa aman.",
      posId: "autospray",
    },
  ];

  return (
    <div className="tech-page">
      <TechNav activePage="technology" />

      <main>
        {/* HERO SECTION */}
        <section className="hero hub-hero">
          <div className="wrap">
            <p className="eyebrow">Teknologi DiHutan · Tiga Pos Penjagaan Terpadu</p>
            <h1>
              Teknologi Cerdas untuk
              <br />
              <i>Rimba yang Terjaga.</i>
            </h1>
            <p className="hero-copy">
              DiHutan menghubungkan sensor telemetri tanah gambut, analisis kecerdasan buatan,
              dan mekanisme respons pembasahan otomatis dalam satu kesatuan sistem pencegahan karhutla.
              Klik <strong>Pelajari Lebih Lanjut</strong> pada setiap pos untuk melihat pop-up penjelasannya langsung.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#pilih-pos">
                Jelajahi 3 Pos Penjagaan <span aria-hidden="true">↓</span>
              </a>
              <a className="button" href="#katalog-alat">
                Katalog Alat Fisik
              </a>
              <Link className="button" href="/#teknologi">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section>

        {/* PIPELINE / ALUR TERPADU */}
        <section className="section" id="pipeline" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
          <div className="wrap">
            <div className="tech-pipeline-bar">
              <div
                className="pipeline-step"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPos("iot-monitoring")}
              >
                <span className="pipeline-num">POS 01</span>
                <strong>Mengamati (IoT)</strong>
                <p>Sensor mengukur kondisi air tanah gambut &amp; mengirim data.</p>
              </div>
              <div className="pipeline-arrow" aria-hidden="true">→</div>
              <div
                className="pipeline-step"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPos("ai-forest-guardian")}
              >
                <span className="pipeline-num">POS 02</span>
                <strong>Memahami (AI)</strong>
                <p>Menganalisis pola anomali &amp; memetakan risiko kebakaran.</p>
              </div>
              <div className="pipeline-arrow" aria-hidden="true">→</div>
              <div
                className="pipeline-step"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPos("autospray")}
              >
                <span className="pipeline-num">POS 03</span>
                <strong>Menjaga (AutoSpray)</strong>
                <p>Aktuator pompa mengalirkan air pembasah saat terdeteksi kering.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 POS CARDS — POPUP MODAL TRIGGER */}
        <section className="section" id="pilih-pos">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Pilih Pos Penjagaan</p>
              <h2>Tiga Pos, Tiga Tugas Berbeda</h2>
              <p>
                Setiap bagian dirancang dengan fokus spesifik. Klik <strong>Pelajari Lebih Lanjut</strong> pada pos yang diinginkan untuk membuka jendela penjelasan lengkap tanpa berpindah halaman.
              </p>
            </div>

            <div className="feature-grid hub-grid">
              {/* POS 01 */}
              <article
                className="feature-card feature-card-pos-interactive"
                onClick={() => setSelectedPos("iot-monitoring")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPos("iot-monitoring");
                  }
                }}
                aria-label="Buka penjelasan lengkap Pos 01 IoT Monitoring"
              >
                <div className="feature-card-img-wrap">
                  <Image
                    src="/assets/technology/Soil%20Moisture%20Sensor%20Module%20and%20Probe.png"
                    alt="Sensor kelembapan tanah"
                    width={340}
                    height={180}
                  />
                  <span className="hub-card-tag">POS 01</span>
                </div>
                <div className="feature-card-copy">
                  <small>Pos 01 · Mengamati</small>
                  <h3>IoT Monitoring</h3>
                  <p>
                    Bagaimana probe sensor kelembapan tanah dan ESP32 mengukur detak hidrologi gambut secara berkelanjutan.
                  </p>
                  <ul className="hub-feature-points">
                    <li>✓ Probe resistif tanah anti-korosi</li>
                    <li>✓ Mikrokontroler ESP32 hemat energi</li>
                    <li>✓ Pop-up spesifikasi lengkap alat</li>
                  </ul>
                  <button
                    type="button"
                    className="pos-popup-trigger-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPos("iot-monitoring");
                    }}
                  >
                    Pelajari lebih lanjut <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>

              {/* POS 02 */}
              <article
                className="feature-card feature-card-pos-interactive"
                onClick={() => setSelectedPos("ai-forest-guardian")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPos("ai-forest-guardian");
                  }
                }}
                aria-label="Buka penjelasan lengkap Pos 02 AI Forest Guardian"
              >
                <div className="feature-card-img-wrap">
                  <Image
                    src="/app-screenshot.png"
                    alt="Contoh tampilan aplikasi DiHutan"
                    width={340}
                    height={180}
                  />
                  <span className="hub-card-tag">POS 02</span>
                </div>
                <div className="feature-card-copy">
                  <small>Pos 02 · Memahami</small>
                  <h3>AI Forest Guardian</h3>
                  <p>
                    Bagaimana algoritma cerdas memproses riwayat data untuk mengenali tren penurunan muka air dan anomali lingkungan.
                  </p>
                  <ul className="hub-feature-points">
                    <li>✓ Deteksi tren kekeringan dini</li>
                    <li>✓ Peringatan bertingkat (Normal/Waspada/Bahaya)</li>
                    <li>✓ Asisten cerdas pembuat keputusan patroli</li>
                  </ul>
                  <button
                    type="button"
                    className="pos-popup-trigger-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPos("ai-forest-guardian");
                    }}
                  >
                    Pelajari lebih lanjut <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>

              {/* POS 03 */}
              <article
                className="feature-card feature-card-pos-interactive"
                onClick={() => setSelectedPos("autospray")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPos("autospray");
                  }
                }}
                aria-label="Buka penjelasan lengkap Pos 03 AutoSpray"
              >
                <div className="feature-card-img-wrap">
                  <Image
                    src="/assets/technology/Mini%20Water%20Pump%20with%20Coiled%20Clear%20Tubing.png"
                    alt="Pompa air mini untuk rancangan AutoSpray"
                    width={340}
                    height={180}
                  />
                  <span className="hub-card-tag">POS 03</span>
                </div>
                <div className="feature-card-copy">
                  <small>Pos 03 · Menjaga</small>
                  <h3>AutoSpray</h3>
                  <p>
                    Mekanisme aktuator pompa air mini dan katup solenoid terarah yang menjaga kelembapan lahan gambut secara otomatis.
                  </p>
                  <ul className="hub-feature-points">
                    <li>✓ Pompa air submersible &amp; selang bening</li>
                    <li>✓ Katup solenoid presisi 12V</li>
                    <li>✓ Modul relay berpelindung optocoupler</li>
                  </ul>
                  <button
                    type="button"
                    className="pos-popup-trigger-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPos("autospray");
                    }}
                  >
                    Pelajari lebih lanjut <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* KATALOG PERANGKAT FISIK */}
        <section className="section alt" id="katalog-alat">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Dokumentasi Komponen Proyek</p>
              <h2>Koleksi Perangkat Keras Fisik</h2>
              <p>
                DiHutan didukung oleh komponen elektronik dan mekanikal nyata.
                Klik pada alat di bawah untuk membuka pop-up penjelasan pos dan perangkat terkait.
              </p>
            </div>

            <div className="hardware-quick-grid">
              {hardwareOverview.map((item) => (
                <div
                  key={item.name}
                  className="hardware-quick-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedPos(item.posId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPos(item.posId);
                    }
                  }}
                >
                  <div className="quick-img-wrap">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={160}
                      height={90}
                      className="quick-thumb"
                    />
                  </div>
                  <div className="quick-info">
                    <span className="quick-pos-badge">{item.pos}</span>
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                    <span className="quick-link-label">Buka pop-up penjelasan ↗</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="note">
              Semua modul diuji dan disiapkan untuk bekerja terpadu dalam satu wadah box pelindung cuaca (weatherproof enclosure)
              dengan sumber energi ramah lingkungan.
            </p>
          </div>
        </section>

        {/* PRINSIP DESAIN TEKNOLOGI */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Prinsip Rekayasa DiHutan</p>
              <h2>Dirancang Sesuai Karakteristik Alam Rimba</h2>
            </div>
            <div className="feature-list">
              <div className="feature-row">
                <strong>01 · Efisiensi Energi Maksimal</strong>
                <p>
                  Menggunakan prosesor dengan mode deep-sleep cerdas dan sensor konsumsi daya rendah (&lt; 20mA),
                  memungkinkan perangkat bertahan berbulan-bulan hanya dengan panel surya mini dan baterai lithium.
                </p>
              </div>
              <div className="feature-row">
                <strong>02 · Ketahanan Lingkungan Tropis</strong>
                <p>
                  Komponen fisik dipilih tahan kelembapan tinggi, asam gambut, dan perubahan suhu tropis khas Kalimantan Barat
                  dengan proteksi kotak IP65 dan terminal kabel berulir.
                </p>
              </div>
              <div className="feature-row">
                <strong>03 · Manusia Tetap sebagai Pengambil Keputusan</strong>
                <p>
                  Teknologi otomatisasi dan AI hadir untuk memperkuat naluri petugas lapangan,
                  bukan menggantikan kebijaksanaan dan konfirmasi langsung dari tim penjaga rimba.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* POS DETAIL POPUP MODAL */}
        <PosDetailModal
          posId={selectedPos}
          onClose={() => setSelectedPos(null)}
          onSelectPos={(id) => setSelectedPos(id)}
        />
      </main>

      <TechFooter backLink={{ href: "/", label: "Kembali ke beranda ↗" }} />
    </div>
  );
}

