"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Layers,
  Cpu,
  Radio,
  ToggleLeft,
  Droplets,
  Plug,
  Clock,
  CheckCircle2,
  X,
  RotateCcw,
  Search,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sliders,
} from "lucide-react";
import {
  iotDevicesDataset,
  initialDeviceLogs,
  IoTDeviceItem,
} from "@/lib/dashboard-data";
import { useDashboard } from "@/lib/dashboard-context";

export default function DashboardPerangkatIoTPage() {
  const { canManageContent } = useDashboard();
  const [devices, setDevices] = useState<IoTDeviceItem[]>(iotDevicesDataset);
  const [selectedDevice, setSelectedDevice] = useState<IoTDeviceItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pingToast, setPingToast] = useState<string | null>(null);

  const fetchDevices = useCallback(async () => {
    try {
      const res = await fetch("/api/devices");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setDevices(json.data);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/devices")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (
          active &&
          json?.success &&
          Array.isArray(json.data) &&
          json.data.length > 0
        ) {
          setDevices(json.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const categories = [
    { key: "ALL", label: "Semua", count: devices.length },
    {
      key: "Mikrokontroler",
      label: "Mikrokontroler",
      count: devices.filter((d) => d.category === "Mikrokontroler").length,
    },
    {
      key: "Sensor Lingkungan",
      label: "Sensor",
      count: devices.filter((d) => d.category === "Sensor Lingkungan").length,
    },
    {
      key: "Aktuator Mekanik",
      label: "Aktuator & Pompa",
      count: devices.filter((d) => d.category === "Aktuator Mekanik").length,
    },
    {
      key: "Distribusi",
      label: "Distribusi",
      count: devices.filter((d) => d.category === "Distribusi").length,
    },
    {
      key: "Catu Daya",
      label: "Catu Daya",
      count: devices.filter((d) => d.category === "Catu Daya").length,
    },
  ];

  const filteredDevices = devices.filter((d) => {
    const matchCategory =
      filterCategory === "ALL" || d.category === filterCategory;
    const matchSearch =
      searchQuery.trim() === "" ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fieldRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleToggleDeviceStatus = async (dev: IoTDeviceItem) => {
    const nextConn = dev.connectionStatus === "ONLINE" ? "OFFLINE" : "ONLINE";
    const nextOp = dev.operationStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    // Optimistic update
    setDevices((prev) =>
      prev.map((d) =>
        d.id === dev.id
          ? {
              ...d,
              connectionStatus: dev.isPassive ? d.connectionStatus : nextConn,
              operationStatus: dev.isPassive ? d.operationStatus : nextOp,
              lastPing: "Baru saja dites",
            }
          : d
      )
    );

    if (selectedDevice && selectedDevice.id === dev.id) {
      setSelectedDevice((prev) =>
        prev
          ? {
              ...prev,
              connectionStatus: dev.isPassive ? prev.connectionStatus : nextConn,
              operationStatus: dev.isPassive ? prev.operationStatus : nextOp,
              lastPing: "Baru saja dites",
            }
          : null
      );
    }

    try {
      await fetch("/api/devices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: dev.id,
          connectionStatus: nextConn,
          operationStatus: nextOp,
        }),
      });

      setPingToast(
        `Status perangkat ${dev.name} berhasil diperbarui di database!`
      );
      setTimeout(() => setPingToast(null), 4000);
    } catch {
      setPingToast(`Gagal sinkron status perangkat ${dev.name}.`);
    }
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", paddingBottom: "36px" }}>
      {/* 1. Hardware Hero Header Banner */}
      <div className="hardware-hero-card">
        <div>
          <span className="hardware-hero-badge">
            <Cpu size={12} />
            KATALOG INSTRUMENTASI FISIK IOT
          </span>
          <h1 className="hardware-hero-title">
            Katalog Perangkat Keras &amp; Edge Telemetri
          </h1>
          <p className="hardware-hero-desc">
            Dokumentasi foto produk asli, spesifikasi teknis lapangan, dan rantai
            kelistrikan terpadu untuk monitoring muka air gambut dan pencegahan karhutla.
          </p>
        </div>

        <div className="hardware-stats-cluster">
          <div className="hardware-stat-pill">
            <span>Total Alat</span>
            <strong>{devices.length} Unit</strong>
          </div>
          <div className="hardware-stat-pill">
            <span>Sensor Aktif</span>
            <strong>3 Input</strong>
          </div>
          <div className="hardware-stat-pill">
            <span>Integritas</span>
            <strong style={{ color: "#C9FF9F" }}>100% Real</strong>
          </div>
        </div>
      </div>

      {/* 2. Interactive System Interconnection Architecture Diagram */}
      <div className="system-diagram-box">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 800,
                color: "#173F2B",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ARSITEKTUR KONEKSI FISIK (PIPELINE ELEKTRONIK &amp; MEKANIK)
            </span>
            <h2
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "20px",
                fontWeight: 750,
                color: "#17251D",
                margin: "4px 0 2px",
              }}
            >
              Rantai Daya, Pengolahan Sinyal, dan Aksi Aktuator
            </h2>
            <p style={{ fontSize: "12px", color: "#647268", margin: 0 }}>
              Klik tahapan node untuk memfilter kartu perangkat keras yang bersesuaian
            </p>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#EAF5EE",
              border: "1px solid #BCE3CB",
              borderRadius: "999px",
              padding: "5px 12px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#173F2B",
            }}
          >
            <ShieldCheck size={14} color="#27834A" />
            <span>Verifikasi Lab Fisik</span>
          </div>
        </div>

        <div className="diagram-flow-grid">
          {/* Node 1 */}
          <div
            className={`diagram-node ${
              filterCategory === "Catu Daya" ? "is-active-pipeline" : ""
            }`}
            onClick={() => setFilterCategory("Catu Daya")}
          >
            <span className="diagram-node-number">TAHAP 01</span>
            <div className="diagram-node-icon">
              <Plug size={20} color="#173F2B" />
            </div>
            <strong>Adaptor DC 12V/5V</strong>
            <span>Catu Daya Pasif</span>
          </div>

          {/* Node 2 */}
          <div
            className={`diagram-node ${
              filterCategory === "Distribusi" ? "is-active-pipeline" : ""
            }`}
            onClick={() => setFilterCategory("Distribusi")}
          >
            <span className="diagram-node-number">TAHAP 02</span>
            <div className="diagram-node-icon">
              <Layers size={20} color="#173F2B" />
            </div>
            <strong>Expansion Board</strong>
            <span>Distribusi Terminal</span>
          </div>

          {/* Node 3 */}
          <div
            className={`diagram-node ${
              filterCategory === "Mikrokontroler" ? "is-active-pipeline" : ""
            }`}
            onClick={() => setFilterCategory("Mikrokontroler")}
          >
            <span className="diagram-node-number">TAHAP 03</span>
            <div
              className="diagram-node-icon"
              style={{ background: "#EAF5EE", borderColor: "#BCE3CB" }}
            >
              <Cpu size={20} color="#27834A" />
            </div>
            <strong>ESP32 Core Board</strong>
            <span>Komputasi Edge</span>
          </div>

          {/* Node 4 */}
          <div
            className={`diagram-node ${
              filterCategory === "Sensor Lingkungan" ? "is-active-pipeline" : ""
            }`}
            onClick={() => setFilterCategory("Sensor Lingkungan")}
          >
            <span className="diagram-node-number">TAHAP 04</span>
            <div
              className="diagram-node-icon"
              style={{ background: "#FEF8EC", borderColor: "#F6DEAF" }}
            >
              <Radio size={20} color="#D99A2B" />
            </div>
            <strong>3 Sensor Input</strong>
            <span>DHT11 + Gas + Gambut</span>
          </div>

          {/* Node 5 */}
          <div
            className={`diagram-node ${
              filterCategory === "Aktuator Mekanik" ? "is-active-pipeline" : ""
            }`}
            onClick={() => setFilterCategory("Aktuator Mekanik")}
          >
            <span className="diagram-node-number">TAHAP 05</span>
            <div className="diagram-node-icon">
              <ToggleLeft size={20} color="#173F2B" />
            </div>
            <strong>Relay 5V Modul</strong>
            <span>Sakelar Optocoupler</span>
          </div>

          {/* Node 6 */}
          <div
            className={`diagram-node ${
              filterCategory === "Aktuator Mekanik" ? "is-active-pipeline" : ""
            }`}
            onClick={() => setFilterCategory("Aktuator Mekanik")}
          >
            <span className="diagram-node-number">TAHAP 06</span>
            <div
              className="diagram-node-icon"
              style={{ background: "#F0F9FF", borderColor: "#BAE6FD" }}
            >
              <Droplets size={20} color="#0284C7" />
            </div>
            <strong>Pompa &amp; Solenoid</strong>
            <span>Otomasi AutoSpray</span>
          </div>
        </div>
      </div>

      {/* 3. Search Bar and Category Filter Strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "24px",
          background: "#FFFFFF",
          border: "1px solid #DFE6DC",
          borderRadius: "16px",
          padding: "12px 18px",
          boxShadow: "0 1px 3px rgba(23, 37, 29, 0.03)",
        }}
      >
        {/* Search Input */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minWidth: "260px",
            flex: 1,
            maxWidth: "360px",
          }}
        >
          <Search
            size={15}
            color="#647268"
            style={{ position: "absolute", left: "12px", pointerEvents: "none" }}
          />
          <input
            type="text"
            placeholder="Cari alat, kode (ESP32), atau fungsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 30px 8px 34px",
              backgroundColor: "#F5F7F2",
              border: "1px solid #DFE6DC",
              borderRadius: "999px",
              fontSize: "12px",
              color: "#17251D",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "10px",
                background: "none",
                border: "none",
                color: "#647268",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterCategory(cat.key)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "11.5px",
                fontWeight: 600,
                background:
                  filterCategory === cat.key ? "#173F2B" : "#F5F7F2",
                border: `1px solid ${
                  filterCategory === cat.key ? "#173F2B" : "#DFE6DC"
                }`,
                color: filterCategory === cat.key ? "#FFFFFF" : "#647268",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.16s ease",
              }}
            >
              <span>{cat.label}</span>
              <span
                style={{
                  background:
                    filterCategory === cat.key
                      ? "rgba(255, 255, 255, 0.22)"
                      : "#E2E9DF",
                  color: filterCategory === cat.key ? "#FFFFFF" : "#173F2B",
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: "999px",
                }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Refresh Hardware Button */}
        <button
          onClick={fetchDevices}
          style={{
            background: "#F5F7F2",
            border: "1px solid #DFE6DC",
            borderRadius: "999px",
            padding: "7px 14px",
            color: "#17251D",
            fontSize: "11.5px",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.16s ease",
          }}
          title="Sinkronisasi status perangkat"
        >
          <RotateCcw size={12} />
          <span>Sinkron Hardware</span>
        </button>
      </div>

      {pingToast && (
        <div
          style={{
            background: "#EAF5EE",
            border: "1px solid #BCE3CB",
            borderRadius: "10px",
            padding: "12px 18px",
            marginBottom: "20px",
            fontSize: "12.5px",
            color: "#166534",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(39, 131, 74, 0.08)",
          }}
        >
          <CheckCircle2 size={18} color="#27834A" />
          <span>{pingToast}</span>
        </div>
      )}

      {/* 4. Hardware Cards Grid (8 Devices) */}
      <div className="hardware-grid">
        {filteredDevices.map((dev) => (
          <div key={dev.id} className="hardware-card">
            {/* Visual Studio Showcase */}
            <div className="hardware-card-visual">
              <span className="hardware-card-code-tag">{dev.code}</span>

              <Image
                src={dev.image}
                alt={dev.name}
                width={220}
                height={140}
                style={{
                  maxHeight: "140px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />

              {/* Status Badges Overlay */}
              <div className="hardware-status-badges">
                <span
                  className={`status-badge status-${dev.connectionStatus}`}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor:
                        dev.connectionStatus === "ONLINE"
                          ? "#27834A"
                          : "#C7473D",
                    }}
                  ></span>
                  {dev.connectionStatus}
                </span>

                {dev.isPassive ? (
                  <span
                    className="status-badge"
                    style={{
                      background: "#F0F4EE",
                      color: "#647268",
                      border: "1px solid #DFE6DC",
                    }}
                  >
                    Pasif
                  </span>
                ) : (
                  <span
                    className={`status-badge status-${dev.operationStatus}`}
                  >
                    {dev.operationStatus}
                  </span>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="hardware-card-body">
              <span className="hardware-category-tag">{dev.category}</span>
              <h3 className="hardware-name">{dev.name}</h3>
              <p className="hardware-role">{dev.fieldRole}</p>

              {/* Live Telemetry Reading Chip (if available) */}
              {dev.currentReading && (
                <div className="hardware-telemetry-chip">
                  <Activity size={13} color="#27834A" />
                  <span>{dev.currentReading}</span>
                </div>
              )}

              {/* Specifications Matrix */}
              <div className="hardware-specs-list">
                <div className="hardware-spec-row">
                  <span>Tegangan Kerja:</span>
                  <strong>{dev.workingVoltage}</strong>
                </div>
                <div className="hardware-spec-row">
                  <span>Sumber Daya:</span>
                  <strong>{dev.powerSource}</strong>
                </div>
              </div>

              {/* Footer */}
              <div className="hardware-card-footer">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#647268",
                    fontSize: "11px",
                  }}
                >
                  <Clock size={12} /> {dev.lastPing}
                </span>

                <div style={{ display: "flex", gap: "8px" }}>
                  {canManageContent && !dev.isPassive && (
                    <button
                      onClick={() => handleToggleDeviceStatus(dev)}
                      style={{
                        background: "#F0F4EE",
                        border: "1px solid #DFE6DC",
                        color: "#173F2B",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "5px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      title="Uji simulasi ubah status alat"
                    >
                      <Sliders size={11} style={{ marginRight: "3px" }} />
                      Uji Status
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedDevice(dev)}
                    className="btn-detail-hardware"
                  >
                    <span>Spesifikasi</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #DFE6DC",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
            color: "#647268",
          }}
        >
          <Cpu size={36} color="#8BAF70" style={{ marginBottom: "12px" }} />
          <h3 style={{ color: "#17251D", margin: "0 0 6px" }}>
            Tidak ada perangkat yang sesuai pencarian
          </h3>
          <p style={{ fontSize: "13px", margin: "0 0 16px" }}>
            Coba gunakan kata kunci lain atau pilih tab kategori &quot;Semua&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterCategory("ALL");
            }}
            style={{
              background: "#173F2B",
              color: "#FFFFFF",
              border: "none",
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* 5. Device Status Change History Table */}
      <div className="status-history-box" style={{ marginTop: "16px" }}>
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
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 800,
                color: "#173F2B",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              LOG OPERASIONAL HARDWARE
            </span>
            <h3
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "18px",
                fontWeight: 750,
                color: "#17251D",
                margin: "4px 0 0",
              }}
            >
              Riwayat Perubahan Status Komponen Lapangan
            </h3>
          </div>
          <span style={{ fontSize: "11.5px", color: "#647268" }}>
            Total {initialDeviceLogs.length} Aktivitas Tercatat
          </span>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>WAKTU</th>
              <th>KODE PERANGKAT</th>
              <th>NAMA PERANGKAT</th>
              <th>TIPE PERUBAHAN</th>
              <th>KETERANGAN LOG</th>
            </tr>
          </thead>
          <tbody>
            {initialDeviceLogs.map((log) => (
              <tr key={log.id}>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#647268",
                    }}
                  >
                    <Clock size={11} /> {log.timestamp}
                  </span>
                </td>
                <td>
                  <code
                    style={{
                      background: "#EAF5EE",
                      color: "#173F2B",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {log.deviceCode}
                  </code>
                </td>
                <td style={{ fontWeight: 700, color: "#17251D" }}>
                  {log.deviceName}
                </td>
                <td>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      background: "#EAF5EE",
                      color: "#166534",
                      border: "1px solid #BCE3CB",
                    }}
                  >
                    {log.changeType}
                  </span>
                </td>
                <td style={{ color: "#36453B" }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. Hardware Specification Detail Modal Dialog */}
      {selectedDevice && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(23, 37, 29, 0.55)",
            backdropFilter: "blur(8px)",
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
              borderRadius: "22px",
              maxWidth: "600px",
              width: "100%",
              padding: "30px",
              boxShadow: "0 28px 70px rgba(23, 37, 29, 0.22)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDevice(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "#F5F7F2",
                border: "1px solid #DFE6DC",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#17251D",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              title="Tutup dialog"
            >
              <X size={16} />
            </button>

            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#173F2B",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "#EAF5EE",
                padding: "3px 8px",
                borderRadius: "6px",
              }}
            >
              {selectedDevice.category} · {selectedDevice.code}
            </span>

            <h2
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "24px",
                fontWeight: 750,
                color: "#17251D",
                margin: "8px 0 14px",
                lineHeight: 1.25,
              }}
            >
              {selectedDevice.name}
            </h2>

            {/* Modal Image Showcase */}
            <div
              style={{
                height: "190px",
                background:
                  "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F4F7F2 100%)",
                border: "1px solid #DFE6DC",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                padding: "16px",
              }}
            >
              <Image
                src={selectedDevice.image}
                alt={selectedDevice.name}
                width={260}
                height={160}
                style={{
                  maxHeight: "160px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 18px rgba(23, 37, 29, 0.14))",
                }}
              />
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "13px",
                color: "#36453B",
                lineHeight: 1.65,
                margin: "0 0 18px",
              }}
            >
              {selectedDevice.fullDesc}
            </p>

            {/* Technical Specifications Table */}
            <h4
              style={{
                fontSize: "13px",
                color: "#173F2B",
                margin: "0 0 10px",
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Lembar Spesifikasi Teknis Lapangan
            </h4>
            <div
              style={{
                background: "#F8FAF7",
                border: "1px solid #DFE6DC",
                borderRadius: "12px",
                padding: "14px 16px",
                display: "grid",
                gap: "10px",
                fontSize: "12.5px",
                marginBottom: "20px",
              }}
            >
              {selectedDevice.specs.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom:
                      i < selectedDevice.specs.length - 1 ? "8px" : "0",
                    borderBottom:
                      i < selectedDevice.specs.length - 1
                        ? "1px dashed #DFE6DC"
                        : "none",
                  }}
                >
                  <span style={{ color: "#647268" }}>{s.label}:</span>
                  <strong style={{ color: "#17251D", textAlign: "right" }}>
                    {s.value}
                  </strong>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedDevice(null)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "999px",
                background: "#173F2B",
                border: "none",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                boxShadow: "0 4px 14px rgba(23, 63, 43, 0.2)",
              }}
            >
              Tutup Rincian Perangkat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
