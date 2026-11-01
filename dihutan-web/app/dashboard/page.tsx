"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Thermometer,
  Droplets,
  Wind,
  Sprout,
  Activity,
  Cpu,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Radio,
  FileCheck2,
} from "lucide-react";
import { monitoringLocationsData, recentAlertsData, educationArticlesData } from "@/lib/dashboard-data";

export default function DashboardOverviewPage() {
  const activeAlerts = recentAlertsData;
  const featuredArticles = Object.values(educationArticlesData).slice(0, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. HERO BANNER ("Selamat Datang di DiHutan") */}
      <div className="dashboard-hero-banner">
        {/* Right Aerial Forest Photo with Fade */}
        <div className="hero-banner-image-wrap">
          <Image
            src="/download-forest.jpg"
            alt="Kanopi Hutan Kalimantan"
            fill
            priority
            sizes="50vw"
          />
          <div className="hero-banner-gradient-fade" />
        </div>

        {/* Content on the Left */}
        <div className="hero-banner-content">
          <div className="hero-badge-pill">
            PUSAT PEMANTAUAN · DATA SIMULASI
          </div>

          <h1 className="hero-banner-title">
            Selamat Datang di DiHutan
          </h1>

          <p className="hero-banner-desc">
            Platform edukasi, pemantauan telemetri gambut, dan sistem peringatan dini kebakaran hutan berfokus di kawasan Sungai Kapuas, Kalimantan Barat.
          </p>

          <div className="hero-banner-footer">
            <span>
              <CheckCircle2 size={14} color="#4ade80" /> Seluruh sistem normal
            </span>
            <span>
              <Clock size={13} /> Diperbarui 2 menit lalu
            </span>
            <span>Kapuas Hulu, Kalimantan Barat</span>
          </div>
        </div>

        {/* Floating Active Point Card on the Right */}
        <Link href="/dashboard/monitoring" className="hero-floating-card">
          <div className="floating-card-icon">
            <Activity size={18} />
          </div>
          <div className="floating-card-meta">
            <span>Titik aktif</span>
            <strong>Kapuas-01</strong>
          </div>
        </Link>
      </div>

      {/* 2. DIAGRAM ALUR SISTEM KERJA DIHUTAN */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e1e7e1",
          borderRadius: "20px",
          padding: "24px 28px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            ALUR KERJA END-TO-END SISTEM DIHUTAN
          </span>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f2417", margin: "4px 0 2px" }}>
            Dari Pembacaan Sensor Lapangan Hingga Tindak Lanjut Petugas
          </h2>
          <p style={{ fontSize: "12px", color: "#6f8774", margin: 0 }}>
            Membedakan secara tegas proses otomatis pembacaan sensor dan tahapan verifikasi lapangan oleh manusia.
          </p>
        </div>

        {/* 5-Step Flow Ribbon */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginTop: "16px",
          }}
        >
          {/* Step 1 */}
          <div style={{ background: "#f8faf8", border: "1px solid #e5ebe5", borderRadius: "14px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#0a7544" }}>
              <Radio size={18} />
              <strong style={{ fontSize: "12px" }}>1. Sensor Lapangan</strong>
            </div>
            <p style={{ fontSize: "11px", color: "#526857", margin: 0, lineHeight: 1.45 }}>
              DHT11, MQ gas, dan probe gambut membaca kondisi fisik lingkungan secara periodik.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ background: "#f8faf8", border: "1px solid #e5ebe5", borderRadius: "14px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#0a7544" }}>
              <Cpu size={18} />
              <strong style={{ fontSize: "12px" }}>2. Pemrosesan ESP32</strong>
            </div>
            <p style={{ fontSize: "11px", color: "#526857", margin: 0, lineHeight: 1.45 }}>
              Mikrokontroler memvalidasi sinyal ADC dan mengirim paket telemetri ke server via jaringan.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ background: "#f8faf8", border: "1px solid #e5ebe5", borderRadius: "14px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#0a7544" }}>
              <Layers size={18} />
              <strong style={{ fontSize: "12px" }}>3. Backend Supabase</strong>
            </div>
            <p style={{ fontSize: "11px", color: "#526857", margin: 0, lineHeight: 1.45 }}>
              PostgreSQL menyimpan data telemetri ber-timestamp dan mengevaluasi aturan ambang batas.
            </p>
          </div>

          {/* Step 4 */}
          <div style={{ background: "#f8faf8", border: "1px solid #e5ebe5", borderRadius: "14px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#0a7544" }}>
              <Activity size={18} />
              <strong style={{ fontSize: "12px" }}>4. Peta &amp; Peringatan</strong>
            </div>
            <p style={{ fontSize: "11px", color: "#526857", margin: 0, lineHeight: 1.45 }}>
              Nilai anomali memunculkan status indikasi pada peta pemantauan kawasan Sungai Kapuas.
            </p>
          </div>

          {/* Step 5 */}
          <div style={{ background: "#f8faf8", border: "1px solid #e5ebe5", borderRadius: "14px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#0a7544" }}>
              <FileCheck2 size={18} />
              <strong style={{ fontSize: "12px" }}>5. Verifikasi Petugas</strong>
            </div>
            <p style={{ fontSize: "11px", color: "#526857", margin: 0, lineHeight: 1.45 }}>
              Petugas BKSDA memeriksa lokasi fisik dan mencatat hasil verifikasi nyata di sistem.
            </p>
          </div>
        </div>
      </div>

      {/* 3. KONDISI LINGKUNGAN CARD (KAPUAS-01) */}
      <div className="env-status-card">
        {/* Card Header */}
        <div className="env-card-header">
          <div className="env-card-header-left">
            <span className="env-card-label">Kondisi lingkungan terkini</span>
            <h2 className="env-card-title">Kapuas-01 (Kawasan Gambut Terbuka)</h2>
          </div>
          <Link href="/dashboard/monitoring" className="env-card-link">
            <span>Buka halaman monitoring lengkap</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Metric Columns Grid */}
        <div className="env-metrics-row">
          {/* 1. Suhu Udara */}
          <div className="env-metric-item">
            <div className="env-metric-icon-box icon-temp">
              <Thermometer size={22} />
            </div>
            <div className="env-metric-details">
              <span className="env-metric-title">Suhu udara</span>
              <div className="env-metric-value">
                28,6 <small>°C</small>
              </div>
              <span className="env-metric-note">DHT11 · Normal</span>
            </div>
          </div>

          {/* 2. Kelembapan Udara */}
          <div className="env-metric-item">
            <div className="env-metric-icon-box icon-humidity">
              <Droplets size={22} />
            </div>
            <div className="env-metric-details">
              <span className="env-metric-title">Kelembapan udara</span>
              <div className="env-metric-value">
                72 <small>%RH</small>
              </div>
              <span className="env-metric-note">DHT11 · Optimal</span>
            </div>
          </div>

          {/* 3. Pembacaan Gas */}
          <div className="env-metric-item">
            <div className="env-metric-icon-box icon-gas">
              <Wind size={22} />
            </div>
            <div className="env-metric-details">
              <span className="env-metric-title">Pembacaan gas</span>
              <div className="env-metric-value">
                186 <small>ADC</small>
              </div>
              <span className="env-metric-note">MQ-series · Normal</span>
            </div>
          </div>

          {/* 4. Kelembapan Tanah */}
          <div className="env-metric-item">
            <div className="env-metric-icon-box icon-soil">
              <Sprout size={22} />
            </div>
            <div className="env-metric-details">
              <span className="env-metric-title">Kelembapan tanah</span>
              <div className="env-metric-value">
                64 <small>%</small>
              </div>
              <span className="env-metric-note">Probe tanah · Cukup lembap</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="env-card-footer">
          <div className="env-footer-left">
            <span style={{ color: "#22c55e", fontSize: "12px" }}>●</span>
            <span>Pembaruan terakhir 20 Mei 2025, 09:41 WIB · Sensor DHT11 &amp; Probe Gambut</span>
          </div>
          <div className="env-footer-tag">DATA SIMULASI</div>
        </div>
      </div>

      {/* 4. DUA KOLOM: RINGKASAN MONITORING & RINGKASAN PERANGKAT */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        {/* Kolom Kiri: Ringkasan Lokasi Pemantauan */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e7e1",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
            <div>
              <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                PEMANTAUAN KAWASAN
              </span>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: "4px 0 0" }}>
                Kawasan Sungai Kapuas ({monitoringLocationsData.length} Titik Terdata)
              </h3>
            </div>
            <Link
              href="/dashboard/monitoring"
              style={{ fontSize: "12px", fontWeight: 700, color: "#0a7544", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              Peta Lengkap <ArrowRight size={13} />
            </Link>
          </div>

          <p style={{ fontSize: "12px", color: "#526857", margin: "0 0 16px", lineHeight: 1.5 }}>
            Titik stasiun telemetri disebar di sepanjang koridor Sungai Kapuas untuk mendeteksi dehidrasi lapisan gambut dangkal.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
            {monitoringLocationsData.map((loc) => (
              <Link
                key={loc.id}
                href="/dashboard/monitoring"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "#f8faf8",
                  border: "1px solid #e5ebe5",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div>
                  <strong style={{ fontSize: "13px", color: "#0f2417", display: "block" }}>{loc.name}</strong>
                  <span style={{ fontSize: "11px", color: "#6f8774" }}>
                    {loc.subDistrict}, {loc.regency}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "99px",
                    background: loc.status === "normal" ? "#dcfce7" : loc.status === "perhatian" ? "#fef3c7" : "#fee2e2",
                    color: loc.status === "normal" ? "#166534" : loc.status === "perhatian" ? "#92400e" : "#991b1b",
                  }}
                >
                  {loc.status.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Peringatan Terbaru & Status Verifikasi */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e7e1",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
            <div>
              <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                LOG INDIKASI &amp; VERIFIKASI
              </span>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: "4px 0 0" }}>
                Peringatan Kondisi Lingkungan
              </h3>
            </div>
            <Link
              href="/dashboard/monitoring"
              style={{ fontSize: "12px", fontWeight: 700, color: "#0a7544", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              Semua Riwayat <ArrowRight size={13} />
            </Link>
          </div>

          <p style={{ fontSize: "12px", color: "#526857", margin: "0 0 16px", lineHeight: 1.5 }}>
            Sistem mencatat pembacaan sensor yang melampaui batas aman. Seluruh indikasi wajib diverifikasi langsung oleh petugas sebelum ditetapkan sebagai kebakaran.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alt) => (
                <div
                  key={alt.id}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: alt.severity === "critical" ? "#fff1f2" : "#fefce8",
                    border: `1px solid ${alt.severity === "critical" ? "#fecdd3" : "#fef08a"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: alt.severity === "critical" ? "#9f1239" : "#854d0e" }}>
                      <AlertTriangle size={14} />
                      {alt.locationName} ({alt.parameter})
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: alt.severity === "critical" ? "#e11d48" : "#ca8a04" }}>
                      {alt.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#4c0519", margin: "0 0 4px" }}>
                    <strong>{alt.title}</strong> — {alt.message} (Nilai: {alt.value})
                  </p>
                  <span style={{ fontSize: "10px", color: "#881337" }}>Waktu terpicu: {alt.timestamp}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: "24px", textAlign: "center", color: "#526857", background: "#f8faf8", borderRadius: "10px" }}>
                <ShieldCheck size={28} color="#16a34a" style={{ margin: "0 auto 8px" }} />
                <strong style={{ display: "block", fontSize: "13px" }}>Tidak Ada Peringatan Aktif</strong>
                <span style={{ fontSize: "11px" }}>Semua sensor berada dalam rentang ambang batas normal.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. ARTIKEL EDUKASI PILIHAN TERBARU */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e1e7e1",
          borderRadius: "20px",
          padding: "24px 28px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px" }}>
          <div>
            <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              ENSIKLOPEDIA RIMBA KALIMANTAN
            </span>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f2417", margin: "4px 0 2px" }}>
              Pengetahuan Ekosistem, Gambut &amp; Flora-Fauna Hutan
            </h2>
            <p style={{ fontSize: "12px", color: "#6f8774", margin: 0 }}>
              Bacaan berbasis riset dan referensi botani tanpa gamifikasi kuis atau elemen permainan.
            </p>
          </div>
          <Link
            href="/dashboard/edukasi"
            style={{ fontSize: "12.5px", fontWeight: 700, color: "#0a7544", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            Buka Perpustakaan Digital <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Featured Articles Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
          {featuredArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/dashboard/edukasi/${art.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                background: "#fbfcfb",
                border: "1px solid #e5ebe5",
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.18s ease, border-color 0.18s ease",
              }}
            >
              <div style={{ height: "140px", position: "relative", background: "#0a2618" }}>
                <Image
                  src={art.heroImage || "/hutan.jpg"}
                  alt={art.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#0a7544", fontWeight: 700 }}>
                  <span>{art.categoryTitle.toUpperCase()}</span>
                  <span style={{ color: "#7a947c" }}>{art.readingTimeMinutes} Menit Baca</span>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0f2417", margin: 0, lineHeight: 1.3 }}>
                  {art.title}
                </h4>
                <p style={{ fontSize: "11.5px", color: "#526857", lineHeight: 1.5, margin: 0, flexGrow: 1 }}>
                  {art.subtitle}
                </p>
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#0a7544", marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Baca artikel selengkapnya <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
