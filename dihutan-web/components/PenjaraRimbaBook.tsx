"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ============================================================
   TYPE DEFINITIONS
   ============================================================ */
type FlipDir = "next" | "prev";

/* ============================================================
   KALIMANTAN INLINE SVG MAP (REFINED COMPACT PROPORTIONS)
   ============================================================ */
function KalimantanMap() {
  return (
    <svg
      className="kalimantan-svg-map"
      viewBox="0 0 320 180"
      role="img"
      aria-label="Peta Kalimantan dengan marker lokasi pemantauan"
    >
      {/* Ocean base */}
      <rect width="320" height="180" fill="#d4e8f0" rx="4" />

      {/* Kalimantan island shape – simplified polygon */}
      <path
        d="M38 118 C42 98 50 82 62 70 C70 60 82 54 96 50 C108 46 118 49 130 44
           C144 38 158 32 172 28 C186 24 198 26 208 34 C218 42 224 54 228 64
           C232 76 232 86 236 96 C240 106 248 116 250 128
           C252 140 248 152 238 158 C228 164 216 160 204 162
           C192 164 180 168 168 167 C156 166 144 162 132 164
           C120 166 108 170 94 168 C80 166 66 160 56 152
           C46 144 34 136 38 118 Z"
        fill="#7a9c62"
        fillOpacity="0.55"
        stroke="#3d5c2a"
        strokeWidth="2"
      />

      {/* Forest interior patches */}
      <ellipse cx="130" cy="100" rx="36" ry="24" fill="#5a8040" fillOpacity="0.35" />
      <ellipse cx="190" cy="80" rx="26" ry="16" fill="#4e7035" fillOpacity="0.3" />
      <ellipse cx="90" cy="126" rx="20" ry="12" fill="#5a8040" fillOpacity="0.3" />

      {/* Sungai Kapuas river */}
      <path
        d="M54 134 C68 128 84 124 102 122 C118 120 132 124 148 122
           C162 120 172 114 188 112 C200 110 210 114 220 120"
        fill="none"
        stroke="#5ba4c8"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* River label */}
      <text x="140" y="134" fontSize="7" fill="#20566e" fontStyle="italic" textAnchor="middle">
        Sungai Kapuas
      </text>

      {/* Location markers */}
      {/* Pontianak */}
      <circle cx="64" cy="136" r="5" fill="#c0392b" stroke="#fff" strokeWidth="1.5" />
      <text x="74" y="134" fontSize="7.5" fill="#112211" fontWeight="bold">Pontianak</text>

      {/* Sintang */}
      <circle cx="152" cy="118" r="4.5" fill="#2980b9" stroke="#fff" strokeWidth="1.5" />
      <text x="162" y="116" fontSize="7.5" fill="#112211" fontWeight="bold">Sintang</text>

      {/* Ketapang */}
      <circle cx="100" cy="150" r="4.5" fill="#27ae60" stroke="#fff" strokeWidth="1.5" />
      <text x="110" y="148" fontSize="7.5" fill="#112211" fontWeight="bold">Ketapang</text>

      {/* Sambas */}
      <circle cx="88" cy="62" r="4.5" fill="#8e44ad" stroke="#fff" strokeWidth="1.5" />
      <text x="98" y="60" fontSize="7.5" fill="#112211" fontWeight="bold">Sambas</text>

      {/* Legend */}
      <rect x="8" y="148" width="98" height="26" rx="3" fill="#f0edd6" opacity="0.9" stroke="#9b8754" strokeWidth="0.8" />
      <circle cx="16" cy="155" r="3" fill="#c0392b" />
      <text x="23" y="158" fontSize="6.5" fill="#223320">Ibukota Provinsi</text>
      <circle cx="16" cy="166" r="3" fill="#2980b9" />
      <text x="23" y="169" fontSize="6.5" fill="#223320">Titik Pantau</text>

      {/* North arrow */}
      <g transform="translate(294,20)">
        <circle r="11" fill="#f0edd6" opacity="0.9" stroke="#9b8754" strokeWidth="1" />
        <path d="M0-7 2.5 0 0 7-2.5 0z" fill="#223320" />
        <text y="3" fontSize="6" textAnchor="middle" fill="#f0edd6" fontWeight="bold">N</text>
      </g>
    </svg>
  );
}

/* ============================================================
   BOOK CONTENT — SPREAD DEFINITIONS
   ============================================================ */

/* ---- SPREAD 1: PETA & ANALISIS ---- */
function SpreadPeta() {
  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Bab I · Peta &amp; Analisis</span>
          <span className="page-folio">hal. 1</span>
        </div>
        <h2 className="chapter-title">Memahami Wilayah Rimba</h2>
        <p className="chapter-desc">
          Kenali kawasan hutan melalui visualisasi peta pemantauan dan informasi
          lokasi yang membantu memahami wilayah yang perlu diperhatikan.
        </p>

        <div className="kalimantan-map-box">
          <KalimantanMap />
        </div>

        <div className="field-note-quote">
          &ldquo;Hutan Kalimantan Barat mencakup jutaan hektar ekosistem tropis yang
          menjadi rumah bagi ribuan spesies flora dan fauna endemik.&rdquo;
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Zona Pemantauan</span>
          <span className="page-folio">hal. 2</span>
        </div>

        <h3
          style={{
            font: '700 12.5px/1.2 "Fraunces", Georgia, serif',
            color: "#18281a",
            marginBottom: "8px",
          }}
        >
          Titik Pemantauan Aktif
        </h3>

        <div className="map-poi-list">
          {[
            {
              name: "Pontianak Selatan",
              status: "Normal",
              statusClass: "badge-green",
            },
            {
              name: "Sintang Tengah",
              status: "Pantau",
              statusClass: "badge-amber",
            },
            {
              name: "Ketapang Utara",
              status: "Normal",
              statusClass: "badge-green",
            },
            {
              name: "Kapuas Hulu",
              status: "Normal",
              statusClass: "badge-green",
            },
          ].map((poi) => (
            <div key={poi.name} className="map-poi-item">
              <strong>{poi.name}</strong>
              <span className={`field-badge ${poi.statusClass}`}>
                {poi.status}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              fontSize: "8.5px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#55482e",
              marginBottom: "6px",
            }}
          >
            Informasi Wilayah
          </div>
          {[
            ["Luas Kawasan Hutan", "~9,2 juta ha"],
            ["Wilayah Dipantau", "4 zona aktif"],
            ["Jenis Ekosistem", "Hujan tropis, Gambut"],
            ["Sungai Utama", "Sungai Kapuas"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="ticket-row"
              style={{ alignItems: "flex-start" }}
            >
              <span style={{ color: "#3a473a", fontSize: "10px" }}>
                {label}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#152417",
                  textAlign: "right",
                }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "8px",
            borderTop: "1px solid rgba(139,121,82,0.2)",
            display: "flex",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          <span className="field-badge badge-green">🌿 Hutan Primer</span>
          <span className="field-badge badge-amber">🌾 Gambut</span>
          <span className="field-badge badge-green">💧 DAS Kapuas</span>
        </div>
        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ---- SPREAD 2: MONITORING IoT ---- */
function SpreadIoT() {
  const hardwareItems = [
    {
      src: "/assets/technology/ESP32 Development Board Product Cutout.png",
      name: "ESP32",
      desc: "Modul WiFi utama sebagai otak sistem",
      metric: "240 MHz · Dual Core",
    },
    {
      src: "/assets/technology/ESP32 Expansion Board Close-Up.png",
      name: "Expansion Board",
      desc: "Koneksi multi-sensor terpusat",
      metric: "Multi-port I/O",
    },
    {
      src: "/assets/technology/Soil Moisture Sensor Module and Probe.png",
      name: "Sensor Kelembapan",
      desc: "Mengukur kadar air tanah real-time",
      metric: "0–100% RH",
    },
    {
      src: "/assets/technology/adaptor.png",
      name: "Adaptor Daya",
      desc: "Sumber daya stabil perangkat IoT",
      metric: "5V · 2A",
    },
  ];

  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Bab II · Monitoring IoT</span>
          <span className="page-folio">hal. 3</span>
        </div>
        <h2 className="chapter-title">Detak Lingkungan dalam Data</h2>
        <p className="chapter-desc">
          DiHutan memanfaatkan perangkat IoT untuk membantu mengamati kondisi
          lingkungan melalui sensor yang terhubung.
        </p>

        <div className="hardware-card-grid">
          {hardwareItems.map((item) => (
            <div key={item.name} className="hardware-card">
              <Image
                src={item.src}
                alt={item.name}
                width={80}
                height={48}
                style={{ height: "46px", width: "100%", objectFit: "contain" }}
              />
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
              <span className="hardware-metric-tag">{item.metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Perangkat Sensor</span>
          <span className="page-folio">hal. 4</span>
        </div>

        <div className="hardware-card-grid">
          {[
            {
              src: "/assets/technology/Blue Relay Module PCB Product Shot.png",
              name: "Relay Module",
              desc: "Pengendali output pompa otomatis",
              metric: "10A · 250VAC",
            },
            {
              src: "/assets/technology/Mini Water Pump with Coiled Clear Tubing.png",
              name: "Mini Water Pump",
              desc: "Pompa respons air otomatis",
              metric: "3–6V DC",
            },
            {
              src: "/assets/technology/Solenoid Valve Assembly Product Shot.png",
              name: "Solenoid Valve",
              desc: "Katup pengatur aliran air",
              metric: "12V · NC",
            },
            {
              src: "/assets/technology/ESP32 Development Board Product Cutout.png",
              name: "Kontroler Pusat",
              desc: "Transmisi telemetry ke cloud",
              metric: "WiFi 2.4GHz",
            },
          ].map((item) => (
            <div key={item.name} className="hardware-card">
              <Image
                src={item.src}
                alt={item.name}
                width={80}
                height={48}
                style={{ height: "46px", width: "100%", objectFit: "contain" }}
              />
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
              <span className="hardware-metric-tag">{item.metric}</span>
            </div>
          ))}
        </div>

        <div className="field-note-quote" style={{ marginTop: "auto" }}>
          &ldquo;Setiap sensor adalah mata dan telinga yang tak pernah tidur di
          tengah rimba.&rdquo;
        </div>
        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ---- SPREAD 3: SISTEM RESPONS OTOMATIS ---- */
function SpreadRespons() {
  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Bab III · Respons Otomatis</span>
          <span className="page-folio">hal. 5</span>
        </div>
        <h2 className="chapter-title">Teknologi yang Bergerak untuk Alam</h2>
        <p className="chapter-desc">
          Perangkat yang saling terhubung membantu menjalankan mekanisme respons
          otomatis berdasarkan kondisi lingkungan yang telah dikonfigurasi.
        </p>

        <div className="logic-pipeline">
          {[
            {
              num: "01",
              title: "Deteksi Sensor",
              detail:
                "Sensor membaca kelembapan & suhu, mengirim sinyal berkala ke ESP32.",
              img: "/assets/technology/Soil Moisture Sensor Module and Probe.png",
            },
            {
              num: "02",
              title: "Pemrosesan ESP32",
              detail:
                "Mikrokontroler menganalisis data dan mencocokkan threshold ambang batas.",
              img: "/assets/technology/ESP32 Development Board Product Cutout.png",
            },
            {
              num: "03",
              title: "Aktivasi Relay",
              detail:
                "Relay module mengalirkan daya ke pompa air saat bahaya terdeteksi.",
              img: "/assets/technology/Blue Relay Module PCB Product Shot.png",
            },
          ].map((step) => (
            <div key={step.num} className="logic-step">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="logic-step-number">{step.num}</span>
                <Image
                  src={step.img}
                  alt={step.title}
                  width={34}
                  height={26}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <div className="logic-step-title">{step.title}</div>
                <div className="logic-step-detail">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Logika Sistem</span>
          <span className="page-folio">hal. 6</span>
        </div>

        <h3
          style={{
            font: '700 12.5px/1.2 "Fraunces", Georgia, serif',
            color: "#18281a",
            marginBottom: "8px",
          }}
        >
          Alur Keputusan Otomatis
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" }}>
          <div
            style={{
              padding: "7px 9px",
              borderRadius: "5px",
              background: "rgba(164,57,42,0.08)",
              border: "1px solid rgba(164,57,42,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                color: "#851e12",
                letterSpacing: "0.04em",
                marginBottom: "2px",
              }}
            >
              KONDISI: SUHU TINGGI + GAS TINGGI
            </div>
            <div style={{ fontSize: "9.5px", color: "#3a2626" }}>
              → Notifikasi peringatan dikirim ke platform
              <br />→ Pompa air diaktifkan sesuai konfigurasi
            </div>
          </div>

          <div
            style={{
              padding: "7px 9px",
              borderRadius: "5px",
              background: "rgba(185,122,41,0.08)",
              border: "1px solid rgba(185,122,41,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                color: "#7e4509",
                letterSpacing: "0.04em",
                marginBottom: "2px",
              }}
            >
              KONDISI: TANAH KERING
            </div>
            <div style={{ fontSize: "9.5px", color: "#3b2b1a" }}>
              → Relay mengaktifkan mini water pump
              <br />→ Irigasi otomatis berjalan sesuai durasi
            </div>
          </div>

          <div
            style={{
              padding: "7px 9px",
              borderRadius: "5px",
              background: "rgba(70,110,72,0.08)",
              border: "1px solid rgba(70,110,72,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                color: "#1e4420",
                letterSpacing: "0.04em",
                marginBottom: "2px",
              }}
            >
              KONDISI: NORMAL
            </div>
            <div style={{ fontSize: "9.5px", color: "#253826" }}>
              → Sistem standby, monitoring berjalan
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 9px",
            background: "rgba(255,255,255,0.65)",
            borderRadius: "5px",
            border: "1px solid rgba(110,95,65,0.2)",
            marginTop: "auto",
          }}
        >
          <Image
            src="/assets/technology/Mini Water Pump with Coiled Clear Tubing.png"
            alt="Mini Water Pump"
            width={44}
            height={34}
            style={{ objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#162518",
                marginBottom: "1px",
              }}
            >
              Mini Water Pump
            </div>
            <div style={{ fontSize: "9px", color: "#455445" }}>
              Perangkat output respons cepat mengalirkan air ke titik bahaya.
            </div>
          </div>
        </div>

        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ---- SPREAD 4: PERINGATAN LINGKUNGAN ---- */
function SpreadPeringatan() {
  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Bab IV · Peringatan</span>
          <span className="page-folio">hal. 7</span>
        </div>
        <h2 className="chapter-title">Mengenali Tanda Sebelum Terlambat</h2>
        <p className="chapter-desc">
          Informasi dari sensor membantu pengguna memahami perubahan kondisi
          lingkungan dan mengenali kondisi yang memerlukan perhatian.
        </p>

        <div className="threat-level-row">
          <div className="threat-card threat-normal">
            <div>
              <div className="threat-title">🟢 Normal</div>
              <div style={{ fontSize: "8.5px", color: "#2b4e2d", marginTop: "1px" }}>
                Semua parameter dalam batas aman
              </div>
            </div>
            <div className="threat-param">
              <div>Suhu: &lt; 35°C</div>
              <div>Kelembapan: &gt; 60%</div>
            </div>
          </div>

          <div className="threat-card threat-warning">
            <div>
              <div className="threat-title">🟡 Waspada</div>
              <div style={{ fontSize: "8.5px", color: "#693f0b", marginTop: "1px" }}>
                Perlu perhatian dan pantauan
              </div>
            </div>
            <div className="threat-param">
              <div>Suhu: 35–40°C</div>
              <div>Kelembapan: 40–60%</div>
            </div>
          </div>

          <div className="threat-card threat-danger">
            <div>
              <div className="threat-title">🔴 Bahaya</div>
              <div style={{ fontSize: "8.5px", color: "#741d13", marginTop: "1px" }}>
                Tindakan segera diperlukan
              </div>
            </div>
            <div className="threat-param">
              <div>Suhu: &gt; 40°C</div>
              <div>Kelembapan: &lt; 40%</div>
            </div>
          </div>
        </div>

        <div className="field-note-quote">
          &ldquo;Setiap angka dari sensor adalah pesan dari hutan — tugas kita untuk
          mendengarkan dan bertindak.&rdquo;
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Data Terkini</span>
          <span className="page-folio">hal. 8</span>
        </div>

        <h3
          style={{
            font: '700 12.5px/1.2 "Fraunces", Georgia, serif',
            color: "#18281a",
            marginBottom: "8px",
          }}
        >
          Contoh Pembacaan Sensor
        </h3>

        {/* Mock sensor reading */}
        <div
          style={{
            padding: "8px 10px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: "5px",
            border: "1px solid rgba(110,95,65,0.22)",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              fontSize: "8.5px",
              color: "#4e5e4d",
              marginBottom: "6px",
              letterSpacing: "0.06em",
            }}
          >
            ZONA: SINTANG TENGAH · Diperbarui 14:32
          </div>
          {[
            { label: "Suhu Udara", val: "38.2°C", status: "amber" },
            { label: "Kelembapan Udara", val: "47%", status: "amber" },
            { label: "Kelembapan Tanah", val: "28%", status: "red" },
            { label: "Kualitas Udara", val: "Normal", status: "green" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "3px 0",
                borderBottom: "1px dotted rgba(110,95,65,0.2)",
              }}
            >
              <span style={{ fontSize: "10px", color: "#374537" }}>
                {row.label}
              </span>
              <span
                className={`field-badge badge-${row.status === "amber" ? "amber" : row.status === "red" ? "red" : "green"}`}
              >
                {row.val}
              </span>
            </div>
          ))}
        </div>

        {/* Notification mock */}
        <div
          style={{
            padding: "7px 10px",
            background: "rgba(185,122,41,0.1)",
            borderRadius: "5px",
            border: "1px solid rgba(185,122,41,0.35)",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              fontWeight: 800,
              color: "#7e4509",
              marginBottom: "2px",
            }}
          >
            ⚠ NOTIFIKASI WASPADA
          </div>
          <div style={{ fontSize: "9px", color: "#48351a" }}>
            Kelembapan tanah di bawah threshold 30%. Sistem pompa siap diaktifkan.
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              fontSize: "8.5px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#55482e",
              marginBottom: "4px",
            }}
          >
            Riwayat Status Kelembapan
          </div>
          <div style={{ display: "flex", gap: "3px", alignItems: "flex-end" }}>
            {[62, 58, 55, 52, 47, 45, 48].map((val, i) => (
              <div
                key={i}
                title={`Hari ke-${i + 1}: ${val}%`}
                style={{
                  flex: 1,
                  height: `${(val / 70) * 26 + 6}px`,
                  borderRadius: "2px 2px 0 0",
                  background:
                    val > 60
                      ? "rgba(45,78,47,0.6)"
                      : val > 45
                        ? "rgba(185,122,41,0.6)"
                        : "rgba(164,57,42,0.6)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ---- SPREAD 5: JELAJAH EDUKASI ---- */
function SpreadEdukasi() {
  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Bab V · Jelajah Edukasi</span>
          <span className="page-folio">hal. 9</span>
        </div>
        <h2 className="chapter-title">Mengenal Kehidupan di Balik Rimbunnya Hutan</h2>

        <div className="edu-photo-frame">
          <Image
            src="/hutan.jpg"
            alt="Ekosistem Hutan Tropis Kalimantan"
            width={500}
            height={160}
            style={{ width: "100%", height: "110px", objectFit: "cover" }}
          />
          <div className="edu-photo-caption">
            Hutan hujan tropis Kalimantan Barat — ekosistem kaya penopang iklim bumi
          </div>
        </div>

        <p className="chapter-desc">
          Jelajahi ekosistem hutan, kenali flora dan fauna, serta pahami
          pentingnya menjaga keseimbangan alam tanpa sistem gamifikasi buatan.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          {[
            { icon: "🌿", label: "Flora Endemik", count: "40+ spesies" },
            { icon: "🦧", label: "Fauna Langka", count: "Orangutan, Bekantan" },
            { icon: "🌊", label: "Ekosistem Air", count: "DAS Kapuas" },
            { icon: "🔥", label: "Karhutla", count: "Deteksi Dini" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "5px 7px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: "4px",
                border: "1px solid rgba(110,95,65,0.2)",
                fontSize: "9px",
              }}
            >
              <div style={{ fontSize: "13px", marginBottom: "1px" }}>
                {item.icon}
              </div>
              <div style={{ fontWeight: 700, color: "#162518" }}>
                {item.label}
              </div>
              <div style={{ color: "#485647" }}>{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Konservasi Hutan</span>
          <span className="page-folio">hal. 10</span>
        </div>

        <h3
          style={{
            font: '700 12.5px/1.2 "Fraunces", Georgia, serif',
            color: "#18281a",
            marginBottom: "8px",
          }}
        >
          Mengapa Hutan Kalimantan Penting?
        </h3>

        {[
          {
            title: "Paru-Paru Dunia",
            body: "Menyerap CO₂ dalam jumlah masif untuk menstabilkan iklim global.",
            icon: "🌬️",
          },
          {
            title: "Keanekaragaman Hayati",
            body: "Rumah orangutan (Pongo pygmaeus) & flora endemik Kalimantan.",
            icon: "🦧",
          },
          {
            title: "Sumber Air Bersih",
            body: "Menjaga siklus air DAS Kapuas dari kekeringan dan erosi lahan.",
            icon: "💧",
          },
          {
            title: "Pencegahan Karhutla",
            body: "Pemahaman ekosistem membantu deteksi dini dan mencegah kebakaran.",
            icon: "🔥",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              gap: "7px",
              padding: "5px 0",
              borderBottom: "1px dotted rgba(110,95,65,0.18)",
            }}
          >
            <span style={{ fontSize: "14px", flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 750,
                  color: "#162518",
                  marginBottom: "1px",
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: "9px", color: "#3d4b3c", lineHeight: 1.35 }}>
                {item.body}
              </div>
            </div>
          </div>
        ))}

        <div className="field-note-quote" style={{ marginTop: "auto" }}>
          &ldquo;Memahami hutan adalah langkah pertama untuk mencintai dan
          melindunginya.&rdquo;
        </div>
        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ---- SPREAD 6: PELAPORAN & KOLABORASI ---- */
function SpreadPelaporan() {
  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Bab VI · Pelaporan</span>
          <span className="page-folio">hal. 11</span>
        </div>
        <h2 className="chapter-title">Menjadi Bagian dari Perlindungan Hutan</h2>
        <p className="chapter-desc">
          Perlindungan hutan membutuhkan kepedulian bersama. DiHutan menyediakan
          sarana pelaporan agar informasi kondisi lapangan dapat ditindaklanjuti.
        </p>

        {/* Report ticket mock */}
        <div className="report-ticket-mock">
          <div className="ticket-header">
            <span
              style={{
                fontWeight: 800,
                fontSize: "8.5px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Formulir Laporan
            </span>
            <span className="field-badge badge-amber">Dalam Proses</span>
          </div>

          {[
            ["ID Laporan", "#RPT-2026-0847"],
            ["Jenis Kejadian", "Asap mencurigakan"],
            ["Lokasi", "Sintang, Kab. Sintang"],
            ["Koordinat", "-0.0789, 111.4754"],
            ["Pelapor", "Warga Terverifikasi"],
          ].map(([label, val]) => (
            <div key={label} className="ticket-row">
              <span style={{ color: "#3d4b3c", fontSize: "9.5px" }}>{label}</span>
              <span style={{ fontWeight: 700, fontSize: "9.5px", color: "#162518" }}>
                {val}
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: "6px",
              padding: "5px 7px",
              background: "rgba(185,122,41,0.08)",
              borderRadius: "4px",
              border: "1px solid rgba(185,122,41,0.3)",
              fontSize: "8.5px",
              color: "#5a3a0e",
            }}
          >
            📷 Foto terlampir · Lokasi terverifikasi GPS otomatis
          </div>
        </div>

        <div className="field-note-quote">
          &ldquo;Satu laporan dari masyarakat bisa menjadi perbedaan antara hutan
          yang selamat dan hutan yang terbakar.&rdquo;
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Kolaborasi Komunitas</span>
          <span className="page-folio">hal. 12</span>
        </div>

        <h3
          style={{
            font: '700 12.5px/1.2 "Fraunces", Georgia, serif',
            color: "#18281a",
            marginBottom: "8px",
          }}
        >
          Alur Pelaporan Cepat
        </h3>

        <div className="logic-pipeline">
          {[
            {
              num: "01",
              title: "Amati & Dokumentasi",
              detail:
                "Foto titik asap, api, atau anomali kondisi lahan yang ditemukan.",
            },
            {
              num: "02",
              title: "Kirim Melalui DiHutan",
              detail:
                "Buka pelaporan, sistem akan otomatis mencocokkan koordinat lokasi.",
            },
            {
              num: "03",
              title: "Verifikasi & Tindak Lanjut",
              detail:
                "Laporan diteruskan ke petugas patroli terdekat untuk ditindaklanjuti.",
            },
          ].map((step) => (
            <div key={step.num} className="logic-step">
              <div className="logic-step-number">{step.num}</div>
              <div>
                <div className="logic-step-title">{step.title}</div>
                <div className="logic-step-detail">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            padding: "8px 10px",
            background: "rgba(55,83,56,0.1)",
            borderRadius: "5px",
            border: "1px solid rgba(55,83,56,0.3)",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              fontWeight: 800,
              color: "#1e3c20",
              marginBottom: "4px",
              letterSpacing: "0.05em",
            }}
          >
            KATEGORI LAPORAN AKTIF
          </div>
          {["🔥 Titik api / asap", "💧 Perubahan kualitas DAS", "🌳 Penebangan liar", "⚠️ Kerusakan lahan"].map(
            (item) => (
              <div
                key={item}
                style={{
                  fontSize: "9px",
                  color: "#223523",
                  padding: "2px 0",
                  borderBottom: "1px dotted rgba(55,83,56,0.2)",
                }}
              >
                {item}
              </div>
            )
          )}
        </div>

        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ---- SPREAD 7 (FINAL): WHAT MAKES DIHUTAN DIFFERENT ---- */
function SpreadFinal() {
  return (
    <>
      {/* LEFT PAGE */}
      <div className="journal-page left-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Penutup · Nilai Inti</span>
          <span className="page-folio">hal. 13</span>
        </div>

        <div
          style={{
            borderLeft: "3px solid #6b8c55",
            paddingLeft: "12px",
            marginBottom: "10px",
          }}
        >
          <h2
            style={{
              font: '700 clamp(16px,1.9vw,22px)/1.15 "Fraunces", Georgia, serif',
              color: "#111e13",
              letterSpacing: "-0.03em",
              marginBottom: "6px",
            }}
          >
            Bukan Sekadar Mengenal Hutan.
            <br />
            <span style={{ color: "#284429" }}>Saatnya Memahami dan Menjaganya.</span>
          </h2>
          <p style={{ fontSize: "10.5px", lineHeight: 1.5, color: "#324233" }}>
            DiHutan menghubungkan edukasi lingkungan, teknologi pemantauan
            berbasis IoT, dan mekanisme respons otomatis dalam satu ekosistem
            digital.
          </p>
        </div>

        <div className="values-triad">
          <div className="value-box">
            <div className="value-box-head">
              <span className="value-number">01</span>
              <span className="value-title">Edukasi</span>
            </div>
            <p className="value-desc">
              Meningkatkan pemahaman mengenai ekosistem hutan dan pencegahan
              kebakaran melalui konten terverifikasi.
            </p>
          </div>

          <div className="value-box">
            <div className="value-box-head">
              <span className="value-number">02</span>
              <span className="value-title">Monitoring</span>
            </div>
            <p className="value-desc">
              Menghubungkan sensor IoT terdistribusi untuk membantu mengamati
              kondisi gambut dan hutan secara berkelanjutan.
            </p>
          </div>

          <div className="value-box">
            <div className="value-box-head">
              <span className="value-number">03</span>
              <span className="value-title">Respons</span>
            </div>
            <p className="value-desc">
              Mengintegrasikan perangkat lapangan dengan mekanisme respons otomatis
              sesuai threshold sistem yang aman.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="journal-page right-page">
        <div className="page-header-row">
          <span className="chapter-kicker">Komitmen Rimba</span>
          <span className="page-folio">hal. 14</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            gap: "10px",
          }}
        >
          {/* Botanical SVG ornament */}
          <svg
            width="64"
            height="44"
            viewBox="0 0 80 60"
            fill="none"
            aria-hidden
          >
            <path
              d="M40 55 C40 45 30 35 20 25 C10 15 8 8 12 4"
              stroke="#6b8c55"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M40 55 C40 45 50 35 60 25 C70 15 72 8 68 4"
              stroke="#6b8c55"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M40 45 C35 38 25 36 18 32"
              stroke="#90aa6b"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M40 45 C45 38 55 36 62 32"
              stroke="#90aa6b"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="4" r="2.5" fill="#6b8c55" opacity="0.8" />
            <circle cx="68" cy="4" r="2.5" fill="#6b8c55" opacity="0.8" />
          </svg>

          <div>
            <div
              style={{
                fontSize: "8.5px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5b7746",
                marginBottom: "6px",
              }}
            >
              · DiHutan ·
            </div>
            <p
              style={{
                fontSize: "clamp(12px,1.2vw,14.5px)",
                lineHeight: 1.5,
                color: "#162518",
                maxWidth: "240px",
                margin: "0 auto",
                fontFamily: '"Fraunces", Georgia, serif',
                fontStyle: "italic",
              }}
            >
              &ldquo;Setiap langkah kecil adalah bagian dari upaya menjaga rimba.&rdquo;
            </p>
          </div>

          <a
            href="#teknologi"
            className="book-final-cta-btn"
            style={{ textDecoration: "none" }}
          >
            <span>🌿</span>
            Jelajahi DiHutan
          </a>

          <div
            style={{
              fontSize: "8px",
              color: "#6b7d68",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            Penjaga Rimba · Edisi &apos;26 · Kalimantan Barat
          </div>
        </div>

        <div className="corner-dogear right-dogear" />
      </div>
    </>
  );
}

/* ============================================================
   TOC ITEMS
   ============================================================ */
const TOC_ITEMS = [
  { roman: "I", title: "Peta & Analisis", desc: "Memahami Wilayah Rimba", spread: 1 },
  { roman: "II", title: "Monitoring IoT", desc: "Detak Lingkungan dalam Data", spread: 2 },
  { roman: "III", title: "Respons Otomatis", desc: "Teknologi yang Bergerak untuk Alam", spread: 3 },
  { roman: "IV", title: "Peringatan Lingkungan", desc: "Mengenali Tanda Sebelum Terlambat", spread: 4 },
  { roman: "V", title: "Jelajah Edukasi", desc: "Mengenal Kehidupan di Balik Hutan", spread: 5 },
  { roman: "VI", title: "Pelaporan & Kolaborasi", desc: "Menjadi Bagian dari Perlindungan Hutan", spread: 6 },
  { roman: "···", title: "Penutup", desc: "Apa yang Membedakan DiHutan", spread: 7 },
];

/* ============================================================
   BOOK SPREAD RENDERER
   ============================================================ */
function BookSpreadContent({ spread }: { spread: number }) {
  switch (spread) {
    case 1: return <SpreadPeta />;
    case 2: return <SpreadIoT />;
    case 3: return <SpreadRespons />;
    case 4: return <SpreadPeringatan />;
    case 5: return <SpreadEdukasi />;
    case 6: return <SpreadPelaporan />;
    case 7: return <SpreadFinal />;
    default: return <SpreadPeta />;
  }
}

/* ============================================================
   CLOSED BOOK COVER SVG
   ============================================================ */
function BookCoverMapSvg() {
  return (
    <svg
      className="cover-map"
      viewBox="0 0 240 180"
      role="img"
      aria-label="Ilustrasi peta Kalimantan"
    >
      <path
        d="M22 94c10-21 25-18 33-37s24-19 39-12 20-8 38-1 22 17 42 13 40 14 38 34 9 23-5 36-25 5-37 18-27 4-42 14-30-4-46 2-23-8-35-9-24-11-25-24-12-19 0-34z"
        fill="#75804d"
        fillOpacity=".29"
        stroke="#51472b"
        strokeWidth="2.5"
      />
      <path
        d="M35 105c27-4 28-29 55-22s30 25 53 12 39-3 55 15M62 128c19-20 33-5 46-22s23-5 34 3 21 3 39-10M70 68l12 12m34-27 9 13m41 2 9 13m-91 45 11 8m64 7 11-9"
        fill="none"
        stroke="#51472b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 5"
      />
      <g transform="translate(193 32)" fill="none" stroke="#51472b" strokeWidth="2">
        <circle r="19" />
        <path d="M0-14 5 0 0 14-5 0zM0-8 2 0 0 8-2 0z" fill="#51472b" />
        <path d="M0-25v-5m0 60v-5m25-25h5m-60 0h5" />
      </g>
      <g fill="#34482a">
        <path d="m52 49 5-11 5 11h-4v8h-3v-8zM155 103l5-11 5 11h-4v8h-3v-8zM96 143l5-11 5 11h-4v8h-3v-8z" />
      </g>
    </svg>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function PenjaraRimbaBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(1); // 1–7
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<FlipDir>("next");
  const [pendingSpread, setPendingSpread] = useState(1);
  const [showToc, setShowToc] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  const TOTAL_SPREADS = 7;

  /* ---- Flip logic ---- */
  const doFlip = useCallback(
    (dir: FlipDir, target: number) => {
      if (isFlipping) return;
      if (target < 1 || target > TOTAL_SPREADS) return;
      setFlipDir(dir);
      setPendingSpread(target);
      setIsFlipping(true);
    },
    [isFlipping, TOTAL_SPREADS]
  );

  // After flip animation completes, update currentSpread
  useEffect(() => {
    if (!isFlipping) return;
    const t = setTimeout(() => {
      setCurrentSpread(pendingSpread);
      setIsFlipping(false);
    }, 720);
    return () => clearTimeout(t);
  }, [isFlipping, pendingSpread]);

  const goNext = useCallback(() => doFlip("next", currentSpread + 1), [doFlip, currentSpread]);
  const goPrev = useCallback(() => doFlip("prev", currentSpread - 1), [doFlip, currentSpread]);
  const jumpTo = (spread: number) => {
    if (spread === currentSpread) { setShowToc(false); return; }
    doFlip(spread > currentSpread ? "next" : "prev", spread);
    setShowToc(false);
  };

  /* ---- Touch swipe ---- */
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  /* ---- Keyboard escape & arrow keys for page turning ---- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showToc) { setShowToc(false); return; }
        if (isOpen) setIsOpen(false);
      }
      if (isOpen && !isFlipping) {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showToc, isOpen, isFlipping, goNext, goPrev]);

  /* ---- Close TOC when clicking outside ---- */
  useEffect(() => {
    if (!showToc) return;
    const handleClick = (e: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(e.target as Node)) {
        setShowToc(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showToc]);

  /* ---- Page label helper ---- */
  const spreadLabel = () => {
    const item = TOC_ITEMS.find((t) => t.spread === currentSpread);
    return item ? `${item.roman} — ${item.title}` : "Panduan Lapangan";
  };

  /* ============================================================
     RENDER: CLOSED COVER
     ============================================================ */
  if (!isOpen) {
    return (
      <section className="book-section" id="panduan" aria-label="Buku panduan lapangan DiHutan">
        <div className="book-cover-container">
          <button
            className="vintage-book-cover"
            type="button"
            aria-label="Buka buku panduan lapangan DiHutan"
            onClick={() => {
              setIsOpen(true);
              setCurrentSpread(1);
            }}
          >
            <div className="cover-face">
              <span className="cover-stamp">Panduan Lapangan · DiHutan</span>
              <h2 className="cover-title">
                Penjaga<span>RIMBA</span>
              </h2>
              <BookCoverMapSvg />
              <span className="cover-edition">Edisi &apos;26 · Kalimantan Barat</span>
              <span className="cover-open-pill">Buka Buku</span>
            </div>
          </button>

          <p
            style={{
              marginTop: "16px",
              fontSize: "11px",
              color: "rgba(220,235,215,0.7)",
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            Panduan Lapangan · Klik buku untuk membuka
          </p>
        </div>
      </section>
    );
  }

  /* ============================================================
     RENDER: OPEN BOOK
     ============================================================ */
  return (
    <section
      className="book-section"
      id="panduan"
      aria-label="Buku panduan lapangan DiHutan — terbuka"
    >
      <div className="open-book-wrapper">
        {/* ---- TOP BAR ---- */}
        <div className="book-top-bar">
          <span className="book-tag">Penjaga Rimba · Panduan Lapangan</span>
          <div className="book-top-actions">
            <button
              className="book-control-btn"
              type="button"
              aria-label="Daftar isi"
              onClick={() => setShowToc((v) => !v)}
            >
              ☰ Daftar Isi
            </button>
            <button
              className="book-control-btn"
              type="button"
              aria-label="Tutup buku"
              onClick={() => setIsOpen(false)}
            >
              ✕ Tutup
            </button>
          </div>
        </div>

        {/* ---- TOC POPOVER ---- */}
        {showToc && (
          <div className="toc-popover" ref={tocRef} role="dialog" aria-label="Daftar isi">
            <div className="toc-header">
              <h3>Daftar Isi</h3>
              <button
                className="toc-close"
                type="button"
                aria-label="Tutup daftar isi"
                onClick={() => setShowToc(false)}
              >
                ×
              </button>
            </div>
            <div className="toc-list">
              {TOC_ITEMS.map((item) => (
                <button
                  key={item.spread}
                  className={`toc-item-btn ${currentSpread === item.spread ? "is-current" : ""}`}
                  type="button"
                  onClick={() => jumpTo(item.spread)}
                  disabled={isFlipping}
                >
                  <span>
                    <strong
                      style={{
                        fontFamily: '"Fraunces", Georgia, serif',
                        fontStyle: "italic",
                        marginRight: "8px",
                        color: "#557046",
                      }}
                    >
                      {item.roman}
                    </strong>
                    {item.title}
                    <span
                      style={{
                        display: "block",
                        fontSize: "8.5px",
                        color: "#6b7c69",
                        marginTop: "1px",
                      }}
                    >
                      {item.desc}
                    </span>
                  </span>
                  <span className="toc-page-num">hal. {(item.spread - 1) * 2 + 1}–{(item.spread - 1) * 2 + 2}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---- STAGE ROW WITH TRANSPARENT FLANK BUTTONS ---- */}
        <div className="book-stage-row">
          {/* Flank Button: Left (Previous) */}
          <button
            className="book-flank-btn flank-left"
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={currentSpread <= 1 || isFlipping}
            onClick={goPrev}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* THE FIELD BOOK */}
          <div
            className="field-book"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-live="polite"
            aria-label={`Bab ${currentSpread} dari ${TOTAL_SPREADS}`}
          >
            {/* Current spread static content */}
            <div className="book-spread-surface">
              <BookSpreadContent spread={currentSpread} />
            </div>

            {/* 3D flipping sheet overlay */}
            {isFlipping && (
              <div
                className={`flipping-sheet ${flipDir === "next" ? "flip-to-next" : "flip-to-prev"}`}
                aria-hidden="true"
              >
                {/* Front face shows the outgoing page content */}
                <div className="sheet-face">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      height: "100%",
                      overflow: "hidden",
                      background:
                        "linear-gradient(90deg,#f5eedc 0%,#f9f4ea 48%,#d4c498 50%,#f9f4ea 52%,#f5eedc 100%)",
                    }}
                  >
                    <BookSpreadContent spread={currentSpread} />
                  </div>
                </div>
                {/* Back face shows the incoming page content */}
                <div className="sheet-face sheet-back">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      height: "100%",
                      overflow: "hidden",
                      background:
                        "linear-gradient(90deg,#f5eedc 0%,#f9f4ea 48%,#d4c498 50%,#f9f4ea 52%,#f5eedc 100%)",
                    }}
                  >
                    <BookSpreadContent spread={pendingSpread} />
                  </div>
                </div>
                <div className="flip-shadow-overlay" />
              </div>
            )}

            {/* Spine crease */}
            <div className="book-spine-crease" aria-hidden="true" />
          </div>

          {/* Flank Button: Right (Next) */}
          <button
            className="book-flank-btn flank-right"
            type="button"
            aria-label="Halaman selanjutnya"
            disabled={currentSpread >= TOTAL_SPREADS || isFlipping}
            onClick={goNext}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ---- BOTTOM NAVIGATION ---- */}
        <div className="book-bottom-nav">
          <button
            className="nav-arrow-btn"
            type="button"
            disabled={currentSpread <= 1 || isFlipping}
            onClick={goPrev}
            aria-label="Halaman sebelumnya"
          >
            ← Sebelumnya
          </button>

          <div className="page-indicator" aria-live="polite">
            {spreadLabel()} &nbsp;·&nbsp; {currentSpread}/{TOTAL_SPREADS}
          </div>

          <button
            className="nav-arrow-btn"
            type="button"
            disabled={currentSpread >= TOTAL_SPREADS || isFlipping}
            onClick={goNext}
            aria-label="Halaman selanjutnya"
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </section>
  );
}
