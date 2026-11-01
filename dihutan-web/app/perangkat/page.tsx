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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F5F7F2", color: "#17251D" }}>
      <PublicNav />

      {/* Hero Section */}
      <section style={{ background: "#173F2B", color: "#FFFFFF", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#8BAF70", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            DOKUMENTASI PERANGKAT KERAS
          </span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "10px 0 16px" }}>
            Perangkat Fisik IoT DiHutan
          </h1>
          <p style={{ fontSize: "16px", color: "#E0ECE4", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Dokumentasi foto produk nyata, spesifikasi teknis lapangan, dan peran setiap komponen elektronik dalam memantau kelembapan gambut dan kanopi hutan Kalimantan.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        {/* Notice on Real Engineering Status */}
        <div
          style={{
            background: "#EAF5EE",
            border: "1px solid #BFE2CB",
            borderRadius: "16px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 1px 3px rgba(23, 37, 29, 0.04)",
          }}
        >
          <Zap size={28} color="#173F2B" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: "12.5px", color: "#173F2B", lineHeight: 1.6 }}>
            <strong>Integritas Status &amp; Pengukuran Lapangan:</strong> Foto di bawah merupakan dokumentasi komponen fisik asli dari laboratorium kerja DiHutan. Status konektivitas (ONLINE/OFFLINE) menunjukkan komunikasi mikrokontroler dengan server. Pompa air dan relay memiliki status operasional (ACTIVE/INACTIVE) terpisah yang hanya terpicu saat kondisi darurat kekeringan gambut terbukti di lapangan. Komponen pasif seperti adaptor tidak diberi status palsu.
          </div>
        </div>

        {/* System Wiring Flow Diagram */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #DFE6DC",
            borderRadius: "18px",
            padding: "28px",
            boxShadow: "0 1px 3px rgba(23, 37, 29, 0.04)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#173F2B", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              DIAGRAM HUBUNGAN ELEKTRONIK &amp; MEKANIK
            </span>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#17251D", margin: "4px 0 2px" }}>
              Rantai Daya, Pengolahan Sinyal, dan Aksi Lapangan
            </h3>
            <p style={{ fontSize: "12px", color: "#647268", margin: 0 }}>
              Alur fisik dari catu daya listrik, papan terminal ekspansi, mikrokontroler, 3 sensor masukan, hingga aktuator pembasahan
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", overflowX: "auto", padding: "12px 4px" }}>
            <div style={{ background: "#F8FAF7", border: "1px solid #DFE6DC", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px" }}>
              <strong style={{ color: "#17251D" }}>Adaptor DC</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#647268" }}>Sumber Daya Listrik</span>
            </div>
            <span style={{ color: "#B5C5B6", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#F8FAF7", border: "1px solid #DFE6DC", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px" }}>
              <strong style={{ color: "#17251D" }}>Expansion Board</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#647268" }}>Distribusi Rel Pin</span>
            </div>
            <span style={{ color: "#B5C5B6", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#EAF5EE", border: "1px solid #BFE2CB", borderRadius: "12px", padding: "12px 14px", minWidth: "130px", textAlign: "center", fontSize: "11px", color: "#166534" }}>
              <strong>ESP32 Core</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#27834A" }}>Logika Edge &amp; Wi-Fi</span>
            </div>
            <span style={{ color: "#B5C5B6", fontWeight: "bold" }}>&harr;</span>

            <div style={{ background: "#EAF5EE", border: "1px solid #BFE2CB", borderRadius: "12px", padding: "12px 14px", minWidth: "140px", textAlign: "center", fontSize: "11px", color: "#166534" }}>
              <strong>3 Sensor Masukan</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#27834A" }}>DHT11 + Gas + Gambut</span>
            </div>
            <span style={{ color: "#B5C5B6", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#F8FAF7", border: "1px solid #DFE6DC", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px" }}>
              <strong style={{ color: "#17251D" }}>Modul Relay 5V</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#647268" }}>Sakelar Optocoupler</span>
            </div>
            <span style={{ color: "#B5C5B6", fontWeight: "bold" }}>&rarr;</span>

            <div style={{ background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: "12px", padding: "12px 14px", minWidth: "120px", textAlign: "center", fontSize: "11px", color: "#0369A1" }}>
              <strong>Mini Water Pump</strong>
              <span style={{ display: "block", fontSize: "9.5px", color: "#0284C7" }}>Aktuator AutoSpray</span>
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
                background: filterCat === c.key ? "#173F2B" : "#FFFFFF",
                color: filterCat === c.key ? "#FFFFFF" : "#647268",
                border: `1px solid ${filterCat === c.key ? "#173F2B" : "#DFE6DC"}`,
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
                background: "#FFFFFF",
                border: "1px solid #DFE6DC",
                borderRadius: "18px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 1px 3px rgba(23, 37, 29, 0.04)",
              }}
            >
              {/* Photo Box */}
              <div
                style={{
                  height: "170px",
                  background: "#F8FAF7",
                  borderBottom: "1px solid #DFE6DC",
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
                <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#173F2B", letterSpacing: "0.1em", textTransform: "uppercase", background: "#EAF5EE", border: "1px solid #BFE2CB", padding: "3px 8px", borderRadius: "6px", width: "fit-content" }}>
                  {dev.category}
                </span>

                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#17251D", margin: 0 }}>
                  {dev.name}
                </h3>

                <p style={{ fontSize: "12px", color: "#647268", lineHeight: 1.5, margin: "0 0 8px", flexGrow: 1 }}>
                  {dev.fieldRole}
                </p>

                {/* Specs sample */}
                <div style={{ fontSize: "11px", borderTop: "1px solid #DFE6DC", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#647268" }}>
                    <span>Model:</span>
                    <strong style={{ color: "#17251D" }}>{dev.specs[0]?.value || "-"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#647268" }}>
                    <span>Tegangan:</span>
                    <strong style={{ color: "#17251D" }}>{dev.specs[1]?.value || "-"}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDevice(dev)}
                  style={{
                    marginTop: "12px",
                    padding: "9px 14px",
                    borderRadius: "10px",
                    background: "#F8FAF7",
                    border: "1px solid #DFE6DC",
                    color: "#173F2B",
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
            background: "rgba(23, 37, 29, 0.45)",
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
              background: "#FFFFFF",
              border: "1px solid #DFE6DC",
              borderRadius: "20px",
              maxWidth: "560px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 24px 60px rgba(23, 37, 29, 0.15)",
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
                color: "#647268",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#173F2B", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {selectedDevice.category} · {selectedDevice.code}
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#17251D", margin: "4px 0 14px" }}>
              {selectedDevice.name}
            </h3>

            <div style={{ height: "180px", background: "#F8FAF7", border: "1px solid #DFE6DC", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <Image
                src={selectedDevice.image}
                alt={selectedDevice.name}
                width={220}
                height={150}
                style={{ objectFit: "contain", maxHeight: "150px" }}
              />
            </div>

            <p style={{ fontSize: "13px", color: "#36453B", lineHeight: 1.6, margin: "0 0 16px" }}>
              {selectedDevice.fullDesc}
            </p>

            <h4 style={{ fontSize: "12px", color: "#173F2B", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Spesifikasi Lengkap Lapangan
            </h4>
            <div style={{ background: "#F8FAF7", border: "1px solid #DFE6DC", borderRadius: "10px", padding: "12px 14px", display: "grid", gap: "6px", fontSize: "11.5px", marginBottom: "20px" }}>
              {selectedDevice.specs.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#647268" }}>{s.label}:</span>
                  <strong style={{ color: "#17251D", textAlign: "right" }}>{s.value}</strong>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedDevice(null)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "99px",
                background: "#173F2B",
                border: "none",
                color: "#FFFFFF",
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
