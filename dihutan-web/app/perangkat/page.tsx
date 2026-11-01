"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Zap, Info, X } from "lucide-react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { iotDevicesDataset, IoTDeviceItem } from "@/lib/dashboard-data";

export default function PerangkatIoTPublikPage() {
  const [selectedDevice, setSelectedDevice] = useState<IoTDeviceItem | null>(null);
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const devices = iotDevicesDataset;

  const categories = [
    { key: "ALL", label: "Semua 8 Perangkat" },
    { key: "Mikrokontroler", label: "Mikrokontroler" },
    { key: "Distribusi", label: "Distribusi Sinyal" },
    { key: "Sensor Lingkungan", label: "Sensor" },
    { key: "Aktuator Mekanik", label: "Aktuator / Pompa" },
    { key: "Catu Daya", label: "Catu Daya" },
  ];

  const filteredDevices = devices.filter(
    (d) => filterCat === "ALL" || d.category === filterCat
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8f5", color: "#17251e" }}>
      <PublicNav />

      {/* Hero Section */}
      <section style={{ background: "#0b3b2b", color: "#ffffff", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#68d391", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            DOKUMENTASI PERANGKAT KERAS
          </span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "10px 0 16px" }}>
            Perangkat Fisik IoT DiHutan
          </h1>
          <p style={{ fontSize: "16px", color: "#d1ead7", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Dokumentasi foto produk nyata, spesifikasi teknis lapangan, dan peran setiap komponen elektronik dalam memantau kelembapan gambut dan kanopi hutan Kalimantan.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        {/* Notice on Real Engineering Status */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #bbf7d0",
            borderRadius: "16px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          <Zap size={28} color="#0a7544" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: "12.5px", color: "#234e32", lineHeight: 1.6 }}>
            <strong>Integritas Status &amp; Pengukuran Lapangan:</strong> Foto di bawah merupakan dokumentasi komponen fisik asli dari laboratorium kerja DiHutan. Status konektivitas (ONLINE/OFFLINE) menunjukkan komunikasi mikrokontroler dengan server. Pompa air dan relay memiliki status operasional (ACTIVE/INACTIVE) terpisah yang hanya terpicu saat kondisi darurat kekeringan gambut terbukti di lapangan. Komponen pasif seperti adaptor tidak diberi status palsu.
          </div>
        </div>

        {/* System Wiring Flow Diagram */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e8e2",
            borderRadius: "18px",
            padding: "28px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              DIAGRAM HUBUNGAN ELEKTRONIK &amp; MEKANIK
            </span>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f2417", margin: "4px 0 2px" }}>
              Rantai Daya, Pengolahan Sinyal, dan Aksi Lapangan
            </h3>
            <p style={{ fontSize: "12px", color: "#6f8774", margin: 0 }}>
              Alur fisik dari catu daya listrik, papan terminal ekspansi, mikrokontroler, 3 sensor masukan, hingga aktuator pembasahan
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", overflowX: "auto", padding: "12px 4px" }}>
            <div style={{ background: "#f8faf8", border: "1px solid #dce3dc", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px" }}>
              <strong>Adaptor DC</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#6f8774" }}>Sumber Daya Listrik</span>
            </div>
            <span style={{ color: "#8da18e", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#f8faf8", border: "1px solid #dce3dc", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px" }}>
              <strong>Expansion Board</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#6f8774" }}>Distribusi Rel Pin</span>
            </div>
            <span style={{ color: "#8da18e", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#eaf5ee", border: "1px solid #86efac", borderRadius: "12px", padding: "12px 14px", minWidth: "130px", textAlign: "center", fontSize: "11px", color: "#0a7544" }}>
              <strong>ESP32 Core</strong>
              <span style={{ display: "block", fontSize: "9.5px" }}>Logika Edge &amp; Wi-Fi</span>
            </div>
            <span style={{ color: "#8da18e", fontWeight: "bold" }}>&harr;</span>

            <div style={{ background: "#eaf5ee", border: "1px solid #86efac", borderRadius: "12px", padding: "12px 14px", minWidth: "140px", textAlign: "center", fontSize: "11px", color: "#0a7544" }}>
              <strong>3 Sensor Masukan</strong>
              <span style={{ display: "block", fontSize: "9.5px" }}>DHT11 + Gas + Gambut</span>
            </div>
            <span style={{ color: "#8da18e", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#f8faf8", border: "1px solid #dce3dc", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px" }}>
              <strong>Modul Relay 5V</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#6f8774" }}>Sakelar Optocoupler</span>
            </div>
            <span style={{ color: "#8da18e", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#f0f9ff", border: "1px solid #7dd3fc", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px", color: "#0369a1" }}>
              <strong>Mini Water Pump</strong>
              <span style={{ display: "block", fontSize: "9.5px" }}>Aktuator AutoSpray</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilterCat(c.key)}
              style={{
                padding: "8px 16px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                background: filterCat === c.key ? "#0b3b2b" : "#ffffff",
                color: filterCat === c.key ? "#ffffff" : "#43564b",
                border: `1px solid ${filterCat === c.key ? "#0b3b2b" : "#dce3dc"}`,
                transition: "all 0.18s ease",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Hardware Cards Grid (8 Real Hardware Items) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "22px" }}>
          {filteredDevices.map((dev) => (
            <div
              key={dev.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e1e8e2",
                borderRadius: "18px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
              }}
            >
              {/* Photo Box */}
              <div
                style={{
                  height: "170px",
                  background: "#f8faf8",
                  borderBottom: "1px solid #edf1ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  position: "relative",
                }}
              >
                <Image
                  src={dev.image}
                  alt={dev.name}
                  width={200}
                  height={140}
                  style={{ objectFit: "contain", maxHeight: "140px" }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
                <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.1em", textTransform: "uppercase", background: "#eaf5ee", padding: "3px 8px", borderRadius: "6px", width: "fit-content" }}>
                  {dev.category}
                </span>

                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f2417", margin: 0 }}>
                  {dev.name}
                </h3>

                <p style={{ fontSize: "12px", color: "#526857", lineHeight: 1.5, margin: "0 0 8px", flexGrow: 1 }}>
                  {dev.fieldRole}
                </p>

                {/* Specs sample */}
                <div style={{ fontSize: "11px", borderTop: "1px solid #f0f3f0", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#6f8774" }}>
                    <span>Model:</span>
                    <strong style={{ color: "#0f2417" }}>{dev.specs[0]?.value || "-"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#6f8774" }}>
                    <span>Tegangan:</span>
                    <strong style={{ color: "#0f2417" }}>{dev.specs[1]?.value || "-"}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDevice(dev)}
                  style={{
                    marginTop: "12px",
                    padding: "9px 14px",
                    borderRadius: "10px",
                    background: "#f7f9f7",
                    border: "1px solid #dce3dc",
                    color: "#0a7544",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Info size={14} />
                  <span>Pelajari Selengkapnya</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Popup Rincian Alat */}
      {selectedDevice && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(9, 46, 29, 0.45)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedDevice(null)}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e1e7e1",
              borderRadius: "20px",
              maxWidth: "560px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDevice(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: "#6f8774",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "10px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {selectedDevice.category} · {selectedDevice.code}
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f2417", margin: "4px 0 14px" }}>
              {selectedDevice.name}
            </h3>

            <div style={{ height: "180px", background: "#f8faf8", border: "1px solid #edf1ed", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <Image
                src={selectedDevice.image}
                alt={selectedDevice.name}
                width={220}
                height={150}
                style={{ objectFit: "contain", maxHeight: "150px" }}
              />
            </div>

            <p style={{ fontSize: "13px", color: "#43564b", lineHeight: 1.6, margin: "0 0 16px" }}>
              {selectedDevice.fullDesc}
            </p>

            <h4 style={{ fontSize: "12px", color: "#0a7544", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Spesifikasi Lengkap Lapangan
            </h4>
            <div style={{ background: "#f7f9f7", border: "1px solid #dce3dc", borderRadius: "10px", padding: "12px 14px", display: "grid", gap: "6px", fontSize: "11.5px", marginBottom: "20px" }}>
              {selectedDevice.specs.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#6f8774" }}>{s.label}:</span>
                  <strong style={{ color: "#0f2417", textAlign: "right" }}>{s.value}</strong>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedDevice(null)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "99px",
                background: "#0b3b2b",
                border: "none",
                color: "#ffffff",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Tutup Rincian Alat
            </button>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
