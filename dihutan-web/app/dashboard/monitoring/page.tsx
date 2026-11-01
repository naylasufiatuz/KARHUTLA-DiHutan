"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Thermometer,
  Droplets,
  Sprout,
  Wind,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Radio,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import {
  monitoringLocationsData,
  MonitoringLocation,
} from "@/lib/dashboard-data";
import { useDashboard } from "@/lib/dashboard-context";

// Dynamic import with SSR disabled for MapLibre
const KapuasMonitoringMap = dynamic(
  () => import("@/components/KapuasMonitoringMap"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "520px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F0F4EE",
          color: "#173F2B",
          fontFamily: "Inter, sans-serif",
          borderRadius: "20px",
          border: "1px solid #DFE6DC",
          gap: "12px",
        }}
      >
        <Radio size={28} className="spin-animation" color="#173F2B" />
        <strong>Menghubungkan Mesin Peta MapLibre &amp; OpenStreetMap...</strong>
        <span style={{ fontSize: "11.5px", color: "#647268" }}>
          Memuat tile kawasan Sungai Kapuas, Kalimantan Barat
        </span>
      </div>
    ),
  }
);

export default function DashboardMonitoringPage() {
  const { canTriggerAlertResponse, role } = useDashboard();
  const [locations, setLocations] = useState<MonitoringLocation[]>(
    monitoringLocationsData
  );
  const [selectedLoc, setSelectedLoc] = useState<MonitoringLocation>(
    monitoringLocationsData[0]
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  // Load locations from API
  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch("/api/monitoring");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setLocations(json.data);
          // Preserve currently selected if exists
          setSelectedLoc((prev) => {
            const found = json.data.find(
              (l: MonitoringLocation) => l.id === prev.id
            );
            return found || json.data[0];
          });
        }
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/monitoring")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setLocations(json.data);
          setSelectedLoc((prev) => {
            const found = json.data.find((l: MonitoringLocation) => l.id === prev.id);
            return found || json.data[0];
          });
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  // Average sensor computations from data
  const avgTemp = (
    locations.reduce((acc, cur) => acc + cur.temperature, 0) / locations.length
  ).toFixed(1);

  const avgHumidity = Math.round(
    locations.reduce((acc, cur) => acc + cur.humidity, 0) / locations.length
  );

  const avgSoil = Math.round(
    locations.reduce((acc, cur) => acc + cur.soilMoisture, 0) / locations.length
  );

  const avgGas = Math.round(
    locations.reduce((acc, cur) => acc + cur.gasPpm, 0) / locations.length
  );

  // Send simulated telemetry packet
  const handleSimulateTelemetry = async (scenario: "normal" | "warning" | "critical") => {
    setIsSimulating(true);

    let temp = 28.5;
    let hum = 75;
    let gas = 24;
    let soil = 65;

    if (scenario === "warning") {
      temp = 33.2;
      hum = 52;
      gas = 280;
      soil = 38;
    } else if (scenario === "critical") {
      temp = 36.8;
      hum = 42;
      gas = 420;
      soil = 24; // Critical peat moisture!
    }

    try {
      const res = await fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceCode: selectedLoc.deviceCode,
          temperature: temp,
          humidity: hum,
          gasPpm: gas,
          soilMoisture: soil,
          waterLevelCm: -25,
        }),
      });

      if (res.ok) {
        // Update local state instantly
        setSelectedLoc((prev) => ({
          ...prev,
          temperature: temp,
          humidity: hum,
          gasPpm: gas,
          soilMoisture: soil,
          status:
            scenario === "critical"
              ? "peringatan"
              : scenario === "warning"
              ? "perhatian"
              : "normal",
          lastUpdated: "Baru saja",
        }));

        setLocations((prev) =>
          prev.map((l) =>
            l.id === selectedLoc.id
              ? {
                  ...l,
                  temperature: temp,
                  humidity: hum,
                  gasPpm: gas,
                  soilMoisture: soil,
                  status:
                    scenario === "critical"
                      ? "peringatan"
                      : scenario === "warning"
                      ? "perhatian"
                      : "normal",
                  lastUpdated: "Baru saja",
                }
              : l
          )
        );

        const msg =
          scenario === "critical"
            ? `⚠️ Paket Telemetri Terkirim: Kondisi Gambut Kritis (<30%) & Gas ${gas} ADC memicu PERINGATAN!`
            : scenario === "warning"
            ? `⚡ Paket Telemetri Terkirim: Suhu ${temp}°C & Kelembapan Gambut ${soil}% masuk status PERHATIAN.`
            : `✅ Paket Telemetri Terkirim: Kondisi ekologis normal tercatat di ${selectedLoc.name}.`;

        setSimulationToast(msg);
        setTimeout(() => setSimulationToast(null), 6000);
      }
    } catch {
      setSimulationToast("Gagal mengirim simulasi telemetri.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div>
      {/* 1. Sensor Overview Metrics Ribbon */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Rata-rata Suhu Kanopi</span>
            <span className="metric-icon">
              <Thermometer size={16} color="#d97706" />
            </span>
          </div>
          <div className="metric-value">{avgTemp}°C</div>
          <div className="metric-meta">Sensitif terhadap radiasi matahari siang</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Kelembapan Udara (RH)</span>
            <span className="metric-icon">
              <Droplets size={16} color="#0284c7" />
            </span>
          </div>
          <div className="metric-value">{avgHumidity}%</div>
          <div className="metric-meta">RH &gt; 60% meminimalkan risiko api tajuk</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Kelembapan Gambut</span>
            <span className="metric-icon">
              <Sprout size={16} color="#10b981" />
            </span>
          </div>
          <div
            className="metric-value"
            style={{ color: avgSoil < 30 ? "#C7473D" : avgSoil < 45 ? "#D99A2B" : "#17251D" }}
          >
            {avgSoil}%
          </div>
          <div className="metric-meta">
            Ambang batas kritis: <strong>&lt; 30%</strong>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Konsentrasi Gas Karhutla</span>
            <span className="metric-icon">
              <Wind size={16} color="#8b5cf6" />
            </span>
          </div>
          <div className="metric-value">{avgGas} ADC</div>
          <div className="metric-meta">MQ Sensor: Partikel asap &amp; gas organik</div>
        </div>
      </div>

      {/* Simulator / Telemetry Ingestion Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #DFE6DC",
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "12.5px",
          boxShadow: "0 1px 3px rgba(23, 37, 29, 0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sliders size={16} color="#173F2B" />
          <span style={{ color: "#17251D" }}>
            <strong>Uji Telemetri IoT ({selectedLoc.deviceCode}):</strong> Kirim
            data pembacaan sensor ke endpoint backend Supabase:
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleSimulateTelemetry("normal")}
            disabled={isSimulating}
            style={{
              padding: "5px 12px",
              borderRadius: "99px",
              backgroundColor: "#EAF5EE",
              border: "1px solid #BCE3CB",
              color: "#27834A",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Kondisi Normal
          </button>
          <button
            onClick={() => handleSimulateTelemetry("warning")}
            disabled={isSimulating}
            style={{
              padding: "5px 12px",
              borderRadius: "99px",
              backgroundColor: "#FEF8EC",
              border: "1px solid #F6DEAF",
              color: "#D99A2B",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Indikasi Asap
          </button>
          <button
            onClick={() => handleSimulateTelemetry("critical")}
            disabled={isSimulating}
            style={{
              padding: "5px 12px",
              borderRadius: "99px",
              backgroundColor: "#FDF2F1",
              border: "1px solid #F8C8C4",
              color: "#C7473D",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Gambut Kritis (&lt;30%)
          </button>
          <button
            onClick={fetchLocations}
            style={{
              background: "none",
              border: "none",
              color: "#647268",
              cursor: "pointer",
              padding: "4px",
            }}
            title="Refresh Data Titik Pantau"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {simulationToast && (
        <div
          style={{
            backgroundColor: "#EAF5EE",
            border: "1px solid #BCE3CB",
            borderRadius: "10px",
            padding: "10px 16px",
            marginBottom: "16px",
            fontSize: "12.5px",
            color: "#27834A",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={16} />
          <span>{simulationToast}</span>
        </div>
      )}

      {/* 2. Map Section (Sungai Kapuas & MapLibre) */}
      <KapuasMonitoringMap
        locations={locations}
        selectedLocationId={selectedLoc.id}
        onSelectLocation={(loc) => setSelectedLoc(loc)}
      />

      {/* 3. Detailed Location & Sensor Telemetry Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginTop: "16px",
        }}
      >
        {/* Selected Location Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #DFE6DC",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#173F2B",
                  letterSpacing: "0.12em",
                }}
              >
                TITIK TERPILIH DI PETA
              </span>
              <h3
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: "20px",
                  color: "#17251D",
                  margin: "4px 0 2px",
                }}
              >
                {selectedLoc.name}
              </h3>
              <span
                style={{
                  fontSize: "11.5px",
                  color: "#647268",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <MapPin size={12} />
                {selectedLoc.subDistrict}, {selectedLoc.regency} · [
                {selectedLoc.coordinates[1].toFixed(4)},{" "}
                {selectedLoc.coordinates[0].toFixed(4)}]
              </span>
            </div>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "99px",
                fontSize: "10px",
                fontWeight: 800,
                background:
                  selectedLoc.status === "normal"
                    ? "#eaf5ee"
                    : selectedLoc.status === "perhatian"
                    ? "#fef3c7"
                    : "#fee2e2",
                color:
                  selectedLoc.status === "normal"
                    ? "#27834A"
                    : selectedLoc.status === "perhatian"
                    ? "#b45309"
                    : "#b91c1c",
                border: `1px solid ${
                  selectedLoc.status === "normal"
                    ? "#bbf7d0"
                    : selectedLoc.status === "perhatian"
                    ? "#fde68a"
                    : "#fca5a5"
                }`,
              }}
            >
              {selectedLoc.status.toUpperCase()}
            </span>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "#4a6350",
              lineHeight: 1.55,
              margin: "0 0 16px",
            }}
          >
            {selectedLoc.environmentalCondition}
          </p>

          {/* Telemetry Numbers Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              background: "#f7f9f7",
              border: "1px solid #dce3dc",
              borderRadius: "12px",
              padding: "14px",
              marginBottom: "16px",
            }}
          >
            <div>
              <span
                style={{ fontSize: "10px", color: "#647268", display: "block" }}
              >
                SUHU KANOPI
              </span>
              <strong style={{ fontSize: "16px", color: "#17251D" }}>
                {selectedLoc.temperature}°C
              </strong>
            </div>
            <div>
              <span
                style={{ fontSize: "10px", color: "#647268", display: "block" }}
              >
                KELEMBAPAN UDARA
              </span>
              <strong style={{ fontSize: "16px", color: "#17251D" }}>
                {selectedLoc.humidity}% RH
              </strong>
            </div>
            <div>
              <span
                style={{ fontSize: "10px", color: "#647268", display: "block" }}
              >
                KADAR AIR GAMBUT
              </span>
              <strong
                style={{
                  fontSize: "16px",
                  color: selectedLoc.soilMoisture < 30 ? "#C7473D" : "#27834A",
                }}
              >
                {selectedLoc.soilMoisture}%
              </strong>
            </div>
            <div>
              <span
                style={{ fontSize: "10px", color: "#647268", display: "block" }}
              >
                KONSENTRASI GAS
              </span>
              <strong style={{ fontSize: "16px", color: "#17251D" }}>
                {selectedLoc.gasPpm} ADC
              </strong>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "10.5px",
              color: "#647268",
            }}
          >
            <span>
              Kode Alat: <strong>{selectedLoc.deviceCode}</strong>
            </span>
            <span>{selectedLoc.notes}</span>
          </div>

          {canTriggerAlertResponse && (
            <div
              style={{
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid #DFE6DC",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  alert(
                    `[VERIFIKASI PETUGAS - ${role}] Titik ${selectedLoc.name} diverifikasi normal dan status telah dicatat ke audit log.`
                  )
                }
                style={{
                  flex: 1,
                  padding: "9px 14px",
                  borderRadius: "8px",
                  background: "#eaf5ee",
                  color: "#173F2B",
                  border: "1px solid #bbf7d0",
                  fontWeight: 700,
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={14} />
                <span>Verifikasi Lapangan</span>
              </button>

              {selectedLoc.status === "peringatan" && (
                <button
                  onClick={() =>
                    alert(
                      `[AKSI PETUGAS] Perintah semprot darurat AutoSpray dikirim ke ${selectedLoc.name} (${selectedLoc.deviceCode}) via LoRa/WiFi.`
                    )
                  }
                  style={{
                    flex: 1,
                    padding: "9px 14px",
                    borderRadius: "8px",
                    background: "#b91c1c",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <AlertTriangle size={14} />
                  <span>AutoSpray Darurat</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 24-Hour Telemetry Trend Chart (SVG Line Chart) */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #DFE6DC",
            borderRadius: "18px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div style={{ marginBottom: "14px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: "#173F2B",
                letterSpacing: "0.12em",
              }}
            >
              TREN 24 JAM
            </span>
            <h3
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "18px",
                color: "#17251D",
                margin: "4px 0",
              }}
            >
              Riwayat Sensor Kelembapan &amp; Suhu
            </h3>
            <p style={{ fontSize: "11.5px", color: "#647268", margin: 0 }}>
              Fluktuasi harian tanah gambut vs suhu kanopi di titik pemantauan
            </p>
          </div>

          {/* SVG Trend Graph */}
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 400 160" style={{ width: "100%", height: "160px" }}>
              <defs>
                <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="30"
                y1="30"
                x2="380"
                y2="30"
                stroke="#eef2ee"
                strokeDasharray="3,3"
              />
              <line
                x1="30"
                y1="70"
                x2="380"
                y2="70"
                stroke="#eef2ee"
                strokeDasharray="3,3"
              />
              <line
                x1="30"
                y1="110"
                x2="380"
                y2="110"
                stroke="#eef2ee"
                strokeDasharray="3,3"
              />
              <line x1="30" y1="140" x2="380" y2="140" stroke="#dce3dc" />

              {/* Soil Moisture Curve (Green) */}
              <path
                d="M 30 50 Q 80 45, 130 55 T 230 75 T 310 95 T 380 90 L 380 140 L 30 140 Z"
                fill="url(#soilGrad)"
              />
              <path
                d="M 30 50 Q 80 45, 130 55 T 230 75 T 310 95 T 380 90"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Temperature Curve (Orange) */}
              <path
                d="M 30 115 Q 80 120, 130 110 T 230 80 T 310 65 T 380 85"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="4,2"
              />

              {/* Threshold Alarm Line (Red 30%) */}
              <line
                x1="30"
                y1="95"
                x2="380"
                y2="95"
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x="32"
                y="92"
                fill="#ef4444"
                fontSize="8"
                fontWeight="bold"
              >
                Ambang Kritis 30%
              </text>

              {/* Axis Labels */}
              <text x="30" y="153" fill="#647268" fontSize="9">
                00:00
              </text>
              <text x="110" y="153" fill="#647268" fontSize="9">
                06:00
              </text>
              <text x="210" y="153" fill="#647268" fontSize="9">
                12:00 (Terik)
              </text>
              <text x="300" y="153" fill="#647268" fontSize="9">
                18:00
              </text>
              <text x="365" y="153" fill="#647268" fontSize="9">
                Kini
              </text>
            </svg>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "12px",
                fontSize: "11px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#10b981",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "3px",
                    background: "#10b981",
                    borderRadius: "2px",
                  }}
                ></span>
                Kelembapan Gambut (%)
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#d97706",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "2px",
                    background: "#d97706",
                    borderRadius: "2px",
                    borderStyle: "dashed",
                  }}
                ></span>
                Suhu Kanopi (°C)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
