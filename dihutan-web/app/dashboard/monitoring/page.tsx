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
  Clock,
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
          height: "540px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F0F4EE",
          color: "#173F2B",
          fontFamily: "Inter, sans-serif",
          borderRadius: "18px",
          border: "1px solid #DFE6DC",
          gap: "12px",
        }}
      >
        <Radio size={32} className="spin-animation" color="#173F2B" />
        <strong style={{ fontSize: "15px" }}>
          Menghubungkan Mesin Peta MapLibre &amp; OpenStreetMap...
        </strong>
        <span style={{ fontSize: "12px", color: "#647268" }}>
          Memuat tile kawasan Sungai Kapuas &amp; sekat kanal Kubu Raya
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
  const [activeChartMetric, setActiveChartMetric] = useState<
    "all" | "soil" | "temp"
  >("all");
  const [lastRefreshed, setLastRefreshed] = useState<string>("Baru saja");

  // Load locations from API
  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch("/api/monitoring");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setLocations(json.data);
          setSelectedLoc((prev) => {
            const found = json.data.find(
              (l: MonitoringLocation) => l.id === prev.id
            );
            return found || json.data[0];
          });
          setLastRefreshed("Baru saja");
        }
      }
    } catch {
      // Fallback to initial static dataset
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/monitoring")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (
          active &&
          json?.success &&
          Array.isArray(json.data) &&
          json.data.length > 0
        ) {
          setLocations(json.data);
          setSelectedLoc((prev) => {
            const found = json.data.find(
              (l: MonitoringLocation) => l.id === prev.id
            );
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
  const handleSimulateTelemetry = async (
    scenario: "normal" | "warning" | "critical"
  ) => {
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

  // Helper for status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "peringatan":
        return (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "99px",
              fontSize: "10.5px",
              fontWeight: 800,
              background: "#FDF2F1",
              color: "#C7473D",
              border: "1px solid #F8C8C4",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C7473D",
              }}
            ></span>
            PERINGATAN
          </span>
        );
      case "perhatian":
        return (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "99px",
              fontSize: "10.5px",
              fontWeight: 800,
              background: "#FEF8EC",
              color: "#D99A2B",
              border: "1px solid #F6DEAF",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#D99A2B",
              }}
            ></span>
            PERHATIAN
          </span>
        );
      case "normal":
      default:
        return (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "99px",
              fontSize: "10.5px",
              fontWeight: 800,
              background: "#EAF5EE",
              color: "#27834A",
              border: "1px solid #BCE3CB",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#27834A",
              }}
            ></span>
            NORMAL
          </span>
        );
    }
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", paddingBottom: "32px" }}>
      {/* 1. Monitoring Modern Header Card */}
      <div className="monitoring-header-card">
        <div>
          <span className="monitoring-header-badge">
            <Radio size={12} />
            SISTEM TELEMETRI SPASIAL &amp; IOT KALIMANTAN BARAT
          </span>
          <h1 className="monitoring-header-title">
            Pusat Kendali Monitoring Lingkungan &amp; Karhutla
          </h1>
          <p className="monitoring-header-desc">
            Pemantauan langsung mikrokontroler ESP32, tinggi muka air gambut (TMA),
            dan indikasi titik panas di sepanjang koridor Daerah Aliran Sungai (DAS) Kapuas.
          </p>
        </div>

        <div className="monitoring-header-actions">
          <div className="live-indicator-pill">
            <span className="live-pulse-dot"></span>
            <span>{locations.length} Pos Terpantau</span>
          </div>
          <button
            onClick={() => {
              fetchLocations();
              setSimulationToast("Memperbarui data titik pemantauan...");
              setTimeout(() => setSimulationToast(null), 2500);
            }}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backdropFilter: "blur(6px)",
              transition: "all 0.2s ease",
            }}
            title="Muat ulang data telemetri"
          >
            <RotateCcw size={13} />
            <span>Sinkronisasi</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Pos Quick Selector Bar */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#173F2B",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <MapPin size={13} color="#285C40" />
            Pilih Stasiun Pos Pantau:
          </span>
          <span style={{ fontSize: "11px", color: "#647268" }}>
            Klik kartu untuk memusatkan peta ke lokasi
          </span>
        </div>

        <div className="pos-selector-strip">
          {locations.slice(0, 5).map((loc) => {
            const isActive = loc.id === selectedLoc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLoc(loc)}
                className={`pos-card-btn ${isActive ? "is-active" : ""}`}
              >
                <div className="pos-card-head">
                  <span className="pos-card-code">{loc.deviceCode}</span>
                  {renderStatusBadge(loc.status)}
                </div>
                <div className="pos-card-title">{loc.name}</div>
                <div className="pos-card-region">
                  <MapPin size={11} />
                  <span>
                    {loc.subDistrict}, {loc.regency}
                  </span>
                </div>
                <div className="pos-card-metrics">
                  <span className="pos-card-metric-pill">
                    🌱 Gambut:{" "}
                    <strong
                      style={{
                        color:
                          loc.soilMoisture < 30
                            ? "#C7473D"
                            : loc.soilMoisture < 45
                            ? "#D99A2B"
                            : "#27834A",
                      }}
                    >
                      {loc.soilMoisture}%
                    </strong>
                  </span>
                  <span className="pos-card-metric-pill">
                    🌡️ Suhu: <strong>{loc.temperature}°C</strong>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sensor Overview Metrics Ribbon */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Rata-rata Suhu Kanopi</span>
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#FEF8EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Thermometer size={16} color="#D99A2B" />
            </span>
          </div>
          <div className="metric-value">{avgTemp}°C</div>
          <div className="metric-meta">
            Sensitif terhadap radiasi matahari siang di atas kanopi hutan
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Kelembapan Udara (RH)</span>
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#EAF5EE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Droplets size={16} color="#27834A" />
            </span>
          </div>
          <div className="metric-value">{avgHumidity}%</div>
          <div className="metric-meta">
            RH &gt; 60% meminimalkan risiko penjalaran api tajuk pohon
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Kadar Air Tanah Gambut</span>
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: avgSoil < 30 ? "#FDF2F1" : "#EAF5EE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sprout
                size={16}
                color={avgSoil < 30 ? "#C7473D" : "#27834A"}
              />
            </span>
          </div>
          <div
            className="metric-value"
            style={{
              color:
                avgSoil < 30
                  ? "#C7473D"
                  : avgSoil < 45
                  ? "#D99A2B"
                  : "#17251D",
            }}
          >
            {avgSoil}%
          </div>
          <div className="metric-meta">
            Ambang batas kritis pencegahan: <strong>&lt; 30%</strong>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-head">
            <span className="metric-label">Konsentrasi Gas Karhutla</span>
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#F5F7F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Wind size={16} color="#285C40" />
            </span>
          </div>
          <div className="metric-value">{avgGas} ADC</div>
          <div className="metric-meta">
            MQ Series: Partikel aerosol &amp; asap pembakaran biomassa
          </div>
        </div>
      </div>

      {/* 4. Simulator Bar (Telemetry Ingestion) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #DFE6DC",
          borderRadius: "14px",
          padding: "12px 18px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          boxShadow: "0 1px 3px rgba(23, 37, 29, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: "#EAF5EE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sliders size={15} color="#173F2B" />
          </div>
          <div>
            <strong style={{ fontSize: "12.5px", color: "#17251D" }}>
              Uji Simulasi Telemetri ({selectedLoc.deviceCode}):
            </strong>
            <span
              style={{
                fontSize: "11.5px",
                color: "#647268",
                marginLeft: "6px",
              }}
            >
              Injeksi skenario paket sensor ke backend Supabase
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleSimulateTelemetry("normal")}
            disabled={isSimulating}
            style={{
              padding: "6px 14px",
              borderRadius: "99px",
              backgroundColor: "#EAF5EE",
              border: "1px solid #BCE3CB",
              color: "#27834A",
              fontSize: "11.5px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.16s ease",
            }}
          >
            🌱 Skenario Normal
          </button>
          <button
            onClick={() => handleSimulateTelemetry("warning")}
            disabled={isSimulating}
            style={{
              padding: "6px 14px",
              borderRadius: "99px",
              backgroundColor: "#FEF8EC",
              border: "1px solid #F6DEAF",
              color: "#D99A2B",
              fontSize: "11.5px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.16s ease",
            }}
          >
            ⚡ Deteksi Asap (Perhatian)
          </button>
          <button
            onClick={() => handleSimulateTelemetry("critical")}
            disabled={isSimulating}
            style={{
              padding: "6px 14px",
              borderRadius: "99px",
              backgroundColor: "#FDF2F1",
              border: "1px solid #F8C8C4",
              color: "#C7473D",
              fontSize: "11.5px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.16s ease",
            }}
          >
            🔥 Gambut Kritis (&lt;30%)
          </button>
        </div>
      </div>

      {/* Toast Alert for Simulation */}
      {simulationToast && (
        <div
          style={{
            backgroundColor: "#EAF5EE",
            border: "1px solid #BCE3CB",
            borderRadius: "10px",
            padding: "12px 18px",
            marginBottom: "18px",
            fontSize: "12.5px",
            color: "#27834A",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(39, 131, 74, 0.08)",
          }}
        >
          <CheckCircle2 size={18} />
          <span>{simulationToast}</span>
        </div>
      )}

      {/* 5. Map Section (MapLibre & OpenStreetMap) */}
      <KapuasMonitoringMap
        locations={locations}
        selectedLocationId={selectedLoc.id}
        onSelectLocation={(loc) => setSelectedLoc(loc)}
      />

      {/* 6. Detailed Location & Sensor Telemetry Grid */}
      <div className="telemetry-inspector-grid">
        {/* Left Card: Selected Location Deep Inspector */}
        <div className="inspector-card">
          <div className="inspector-card-header">
            <div>
              <span className="inspector-eyebrow">
                DETAIL POS TERPILIH DI PETA
              </span>
              <h2 className="inspector-title">{selectedLoc.name}</h2>
              <span className="inspector-subtitle">
                <MapPin size={12} color="#285C40" />
                {selectedLoc.subDistrict}, {selectedLoc.regency} · [
                {selectedLoc.coordinates[1].toFixed(4)},{" "}
                {selectedLoc.coordinates[0].toFixed(4)}]
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              {renderStatusBadge(selectedLoc.status)}
              <span
                style={{
                  display: "block",
                  fontSize: "10.5px",
                  color: "#647268",
                  marginTop: "4px",
                }}
              >
                Kode: <strong>{selectedLoc.deviceCode}</strong>
              </span>
            </div>
          </div>

          {/* Peat Moisture Indicator Bar */}
          <div className="peat-gauge-wrap">
            <div className="peat-gauge-header">
              <span style={{ fontWeight: 700, color: "#17251D" }}>
                Kondisi Kelembapan Lahan Gambut
              </span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "13px",
                  color:
                    selectedLoc.soilMoisture < 30
                      ? "#C7473D"
                      : selectedLoc.soilMoisture < 45
                      ? "#D99A2B"
                      : "#27834A",
                }}
              >
                {selectedLoc.soilMoisture}%
              </span>
            </div>
            <div className="peat-gauge-track">
              <div
                className="peat-gauge-fill"
                style={{
                  width: `${Math.min(100, Math.max(0, selectedLoc.soilMoisture))}%`,
                  backgroundColor:
                    selectedLoc.soilMoisture < 30
                      ? "#C7473D"
                      : selectedLoc.soilMoisture < 45
                      ? "#D99A2B"
                      : "#27834A",
                }}
              ></div>
            </div>
            <div className="peat-gauge-markers">
              <span style={{ color: "#C7473D" }}>0% Kritis</span>
              <span style={{ color: "#D99A2B" }}>30% Ambang Batas</span>
              <span style={{ color: "#27834A" }}>45%+ Basah Aman</span>
              <span>100% Jenuh</span>
            </div>
          </div>

          {/* 4 Sensor Parameters Quad */}
          <div className="sensor-metric-quad">
            <div className="sensor-quad-box">
              <div
                className="sensor-quad-icon"
                style={{ background: "#FEF8EC" }}
              >
                <Thermometer size={18} color="#D99A2B" />
              </div>
              <div className="sensor-quad-data">
                <span className="sensor-quad-label">SUHU KANOPI</span>
                <span className="sensor-quad-val">
                  {selectedLoc.temperature}
                  <span className="sensor-quad-unit">°C</span>
                </span>
              </div>
            </div>

            <div className="sensor-quad-box">
              <div
                className="sensor-quad-icon"
                style={{ background: "#EAF5EE" }}
              >
                <Droplets size={18} color="#27834A" />
              </div>
              <div className="sensor-quad-data">
                <span className="sensor-quad-label">KELEMBAPAN UDARA</span>
                <span className="sensor-quad-val">
                  {selectedLoc.humidity}
                  <span className="sensor-quad-unit">% RH</span>
                </span>
              </div>
            </div>

            <div className="sensor-quad-box">
              <div
                className="sensor-quad-icon"
                style={{
                  background:
                    selectedLoc.soilMoisture < 30 ? "#FDF2F1" : "#EAF5EE",
                }}
              >
                <Sprout
                  size={18}
                  color={selectedLoc.soilMoisture < 30 ? "#C7473D" : "#27834A"}
                />
              </div>
              <div className="sensor-quad-data">
                <span className="sensor-quad-label">KADAR AIR GAMBUT</span>
                <span
                  className="sensor-quad-val"
                  style={{
                    color:
                      selectedLoc.soilMoisture < 30 ? "#C7473D" : "#17251D",
                  }}
                >
                  {selectedLoc.soilMoisture}
                  <span className="sensor-quad-unit">%</span>
                </span>
              </div>
            </div>

            <div className="sensor-quad-box">
              <div
                className="sensor-quad-icon"
                style={{ background: "#F5F7F2" }}
              >
                <Wind size={18} color="#285C40" />
              </div>
              <div className="sensor-quad-data">
                <span className="sensor-quad-label">KONSENTRASI GAS</span>
                <span className="sensor-quad-val">
                  {selectedLoc.gasPpm}
                  <span className="sensor-quad-unit"> ADC</span>
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Condition Callout */}
          <div className="eco-analysis-box">
            <strong style={{ display: "block", marginBottom: "3px" }}>
              Analisis Lapangan &amp; Ekologi:
            </strong>
            {selectedLoc.environmentalCondition}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "11px",
              color: "#647268",
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: "1px solid #DFE6DC",
            }}
          >
            <span>
              Pembaruan: <strong>{selectedLoc.lastUpdated}</strong>
            </span>
            <span>{selectedLoc.notes}</span>
          </div>

          {/* Operational Action Buttons for Petugas/Admin */}
          {canTriggerAlertResponse && (
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() =>
                  alert(
                    `[VERIFIKASI PETUGAS - ${role}]\nTitik pemantauan ${selectedLoc.name} (${selectedLoc.deviceCode}) telah diverifikasi normal di lapangan.`
                  )
                }
                style={{
                  flex: 1,
                  minWidth: "160px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "#EAF5EE",
                  color: "#173F2B",
                  border: "1px solid #BCE3CB",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.18s ease",
                }}
              >
                <ShieldCheck size={15} />
                <span>Verifikasi Pos</span>
              </button>

              {selectedLoc.status === "peringatan" && (
                <button
                  onClick={() =>
                    alert(
                      `[AKSI DARURAT AUTOSPRAY]\nPerintah pembasahan pompa darurat dikirim ke stasiun ${selectedLoc.name} via jaringan radio LoRa/WiFi.`
                    )
                  }
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    background: "#C7473D",
                    color: "#FFFFFF",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 4px 12px rgba(199, 71, 61, 0.25)",
                  }}
                >
                  <AlertTriangle size={15} />
                  <span>AutoSpray Darurat</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Card: Interactive 24-Hour Telemetry Trend Chart */}
        <div className="inspector-card">
          <div className="trend-chart-header">
            <div>
              <span className="inspector-eyebrow">TREN TELEMETRI 24 JAM</span>
              <h2 className="inspector-title" style={{ fontSize: "19px" }}>
                Fluktuasi Sensor Lingkungan
              </h2>
              <span className="inspector-subtitle">
                Dinamika suhu kanopi vs kelembapan lapisan gambut
              </span>
            </div>

            <div className="trend-metric-pills">
              <button
                className={`trend-pill-btn ${
                  activeChartMetric === "all" ? "is-active" : ""
                }`}
                onClick={() => setActiveChartMetric("all")}
              >
                Semua
              </button>
              <button
                className={`trend-pill-btn ${
                  activeChartMetric === "soil" ? "is-active" : ""
                }`}
                onClick={() => setActiveChartMetric("soil")}
              >
                Gambut
              </button>
              <button
                className={`trend-pill-btn ${
                  activeChartMetric === "temp" ? "is-active" : ""
                }`}
                onClick={() => setActiveChartMetric("temp")}
              >
                Suhu
              </button>
            </div>
          </div>

          {/* SVG Line & Area Chart */}
          <div style={{ flexGrow: 1, position: "relative", minHeight: "220px" }}>
            <svg
              viewBox="0 0 500 220"
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient id="soilAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#27834A" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#27834A" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D99A2B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D99A2B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              <line
                x1="40"
                y1="35"
                x2="480"
                y2="35"
                stroke="#EAEFE7"
                strokeDasharray="4,4"
              />
              <line
                x1="40"
                y1="85"
                x2="480"
                y2="85"
                stroke="#EAEFE7"
                strokeDasharray="4,4"
              />
              <line
                x1="40"
                y1="135"
                x2="480"
                y2="135"
                stroke="#EAEFE7"
                strokeDasharray="4,4"
              />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#DFE6DC" />

              {/* Critical Alert Threshold line (30% Peat Moisture) */}
              <line
                x1="40"
                y1="140"
                x2="480"
                y2="140"
                stroke="#C7473D"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <rect
                x="42"
                y="126"
                width="112"
                height="16"
                rx="4"
                fill="#FDF2F1"
              />
              <text
                x="46"
                y="138"
                fill="#C7473D"
                fontSize="9"
                fontWeight="bold"
              >
                Ambang Batas Kritis 30%
              </text>

              {/* Soil Moisture Curve (Green) */}
              {(activeChartMetric === "all" || activeChartMetric === "soil") && (
                <>
                  <path
                    d="M 40 70 Q 110 65, 170 80 T 270 110 T 370 135 T 480 120 L 480 180 L 40 180 Z"
                    fill="url(#soilAreaGrad)"
                  />
                  <path
                    d="M 40 70 Q 110 65, 170 80 T 270 110 T 370 135 T 480 120"
                    fill="none"
                    stroke="#27834A"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Nodes */}
                  <circle cx="40" cy="70" r="4" fill="#27834A" />
                  <circle cx="170" cy="80" r="4" fill="#27834A" />
                  <circle cx="270" cy="110" r="4" fill="#27834A" />
                  <circle cx="370" cy="135" r="4" fill="#27834A" />
                  <circle
                    cx="480"
                    cy="120"
                    r="5"
                    fill="#27834A"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* Temperature Curve (Amber) */}
              {(activeChartMetric === "all" || activeChartMetric === "temp") && (
                <>
                  <path
                    d="M 40 150 Q 110 160, 170 140 T 270 95 T 370 70 T 480 100"
                    fill="none"
                    stroke="#D99A2B"
                    strokeWidth="2.5"
                    strokeDasharray="5,3"
                    strokeLinecap="round"
                  />
                  {/* Nodes */}
                  <circle cx="40" cy="150" r="3.5" fill="#D99A2B" />
                  <circle cx="170" cy="140" r="3.5" fill="#D99A2B" />
                  <circle cx="270" cy="95" r="4" fill="#D99A2B" />
                  <circle cx="370" cy="70" r="4" fill="#D99A2B" />
                  <circle
                    cx="480"
                    cy="100"
                    r="5"
                    fill="#D99A2B"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* X Axis Time Labels */}
              <text x="40" y="198" fill="#647268" fontSize="10">
                00:00
              </text>
              <text x="145" y="198" fill="#647268" fontSize="10">
                06:00 (Pagi)
              </text>
              <text x="250" y="198" fill="#647268" fontSize="10">
                12:00 (Terik)
              </text>
              <text x="360" y="198" fill="#647268" fontSize="10">
                18:00 (Senja)
              </text>
              <text
                x="455"
                y="198"
                fill="#173F2B"
                fontSize="10"
                fontWeight="bold"
              >
                Sekarang
              </text>
            </svg>
          </div>

          {/* Chart Legend */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginTop: "8px",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#27834A",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "3.5px",
                  background: "#27834A",
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
                color: "#D99A2B",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "2.5px",
                  background: "#D99A2B",
                  borderRadius: "2px",
                  borderStyle: "dashed",
                }}
              ></span>
              Suhu Kanopi (°C)
            </span>
          </div>

          {/* 3 Summary Stat Cards */}
          <div className="trend-stats-summary">
            <div className="trend-stat-card">
              <span>Suhu Puncak Terik</span>
              <strong>34.8°C</strong>
            </div>
            <div className="trend-stat-card">
              <span>Palung Gambut Terendah</span>
              <strong style={{ color: "#D99A2B" }}>36%</strong>
            </div>
            <div className="trend-stat-card">
              <span>Stabilitas Kanal</span>
              <strong style={{ color: "#27834A" }}>94.2%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Live Telemetry Event Log Stream Feed */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #DFE6DC",
          borderRadius: "18px",
          padding: "22px 24px",
          boxShadow: "0 1px 4px rgba(23, 37, 29, 0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <span className="inspector-eyebrow">LOG AKTIVITAS TELEMETRI</span>
            <h3
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "18px",
                color: "#17251D",
                margin: "4px 0 0",
              }}
            >
              Aliran Paket Sensor Terkini (Real-Time Ingestion)
            </h3>
          </div>
          <span style={{ fontSize: "11.5px", color: "#647268" }}>
            Diperbarui: <strong>{lastRefreshed}</strong>
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "12.5px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1.5px solid #DFE6DC",
                  color: "#647268",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <th style={{ padding: "10px 12px" }}>Waktu</th>
                <th style={{ padding: "10px 12px" }}>Titik Stasiun</th>
                <th style={{ padding: "10px 12px" }}>Perangkat ID</th>
                <th style={{ padding: "10px 12px" }}>Suhu</th>
                <th style={{ padding: "10px 12px" }}>Gambut</th>
                <th style={{ padding: "10px 12px" }}>Gas MQ</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSelectedLoc(l)}
                  style={{
                    borderBottom: "1px solid #EAEFE7",
                    cursor: "pointer",
                    backgroundColor:
                      l.id === selectedLoc.id ? "#F8FAF7" : "transparent",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      color: "#647268",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Clock size={12} />
                    {l.lastUpdated}
                  </td>
                  <td style={{ padding: "12px", fontWeight: 700, color: "#17251D" }}>
                    {l.name}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <code
                      style={{
                        background: "#EAF5EE",
                        color: "#173F2B",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      {l.deviceCode}
                    </code>
                  </td>
                  <td style={{ padding: "12px", color: "#17251D" }}>
                    {l.temperature}°C
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: 700,
                      color:
                        l.soilMoisture < 30
                          ? "#C7473D"
                          : l.soilMoisture < 45
                          ? "#D99A2B"
                          : "#27834A",
                    }}
                  >
                    {l.soilMoisture}%
                  </td>
                  <td style={{ padding: "12px", color: "#17251D" }}>
                    {l.gasPpm} ADC
                  </td>
                  <td style={{ padding: "12px" }}>
                    {renderStatusBadge(l.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
