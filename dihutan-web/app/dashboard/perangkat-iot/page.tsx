"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Zap,
  Layers,
  Cpu,
  Radio,
  ToggleLeft,
  Droplets,
  Plug,
  Clock,
  Lightbulb,
  CheckCircle2,
  X,
  RotateCcw,
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
        if (active && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setDevices(json.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const categories = [
    { key: "ALL", label: "Semua 8 Perangkat" },
    { key: "Mikrokontroler", label: "Mikrokontroler" },
    { key: "Distribusi", label: "Distribusi Sinyal" },
    { key: "Sensor Lingkungan", label: "Sensor" },
    { key: "Aktuator Mekanik", label: "Aktuator / Pompa" },
    { key: "Catu Daya", label: "Catu Daya" },
  ];

  const filteredDevices = devices.filter(
    (d) => filterCategory === "ALL" || d.category === filterCategory
  );

  const handleToggleDeviceStatus = async (dev: IoTDeviceItem) => {
    const nextConn = dev.connectionStatus === "ONLINE" ? "OFFLINE" : "ONLINE";
    const nextOp =
      dev.operationStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

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

      setPingToast(`Status perangkat ${dev.name} berhasil diperbarui di database!`);
      setTimeout(() => setPingToast(null), 4000);
    } catch {
      setPingToast(`Gagal sinkron status perangkat ${dev.name}.`);
    }
  };

  return (
    <div>
      {/* 1. Header Notice on Status Separation */}
      <div
        style={{
          background: "#EAF5EE",
          border: "1px solid #BFE2CB",
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "12.5px",
          color: "#173F2B",
          lineHeight: 1.5,
        }}
      >
        <Zap size={22} color="#173F2B" style={{ flexShrink: 0 }} />
        <div>
          <strong>Arsitektur Logika &amp; Pemisahan Status Nyata:</strong> Status
          koneksi (ONLINE/OFFLINE) menunjukkan keterhubungan mikrokontroler
          dengan gateway. Status ESP32 Online <em>tidak otomatis</em> berarti
          pompa menyala. Pompa dan relay memiliki status operasional
          (ACTIVE/INACTIVE) terpisah yang hanya terpicu saat ambang batas
          kelembapan gambut kritis (&lt;30%) terlewati.
        </div>
      </div>

      {pingToast && (
        <div
          style={{
            background: "#EAF5EE",
            border: "1px solid #27834A",
            borderRadius: "10px",
            padding: "10px 16px",
            marginBottom: "16px",
            fontSize: "12px",
            color: "#166534",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircle2 size={16} color="#27834A" />
          <span>{pingToast}</span>
        </div>
      )}

      {/* 2. System Interconnection Architecture Diagram */}
      <div className="system-diagram-box">
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 800,
              color: "#173F2B",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            DIAGRAM HUBUNGAN ANTARPERANGKAT (SISTEM IOT DIHUTAN)
          </span>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#17251D",
              margin: "4px 0 2px",
            }}
          >
            Rantai Daya, Sinyal Sensor, dan Aksi Aktuator
          </h3>
          <p style={{ fontSize: "12px", color: "#647268", margin: 0 }}>
            Alur keterhubungan fisik dari catu daya, papan terminal,
            mikrokontroler, 3 sensor telemetri, hingga modul relay pembasah
          </p>
        </div>

        <div className="diagram-flow-grid">
          {/* Node 1: Catu Daya */}
          <div className="diagram-node">
            <Plug size={20} color="#173F2B" />
            <strong>Adaptor DC 12V/5V</strong>
            <span>Catu Daya Pasif</span>
          </div>

          <div className="diagram-arrow">&rarr;</div>

          {/* Node 2: Expansion Board */}
          <div className="diagram-node">
            <Layers size={20} color="#173F2B" />
            <strong>Expansion Board</strong>
            <span>Distribusi Rel &amp; Terminal</span>
          </div>

          <div className="diagram-arrow">&rarr;</div>

          {/* Node 3: ESP32 Core */}
          <div className="diagram-node node-esp32">
            <Cpu size={20} color="#27834A" />
            <strong>ESP32 Dual-Core</strong>
            <span>Pusat Logika Edge &amp; Wi-Fi</span>
          </div>

          <div className="diagram-arrow">&harr;</div>

          {/* Node 4: 3 Sensors (DHT11, Gas, Soil) */}
          <div
            className="diagram-node"
            style={{ background: "#EAF5EE", borderColor: "#BFE2CB" }}
          >
            <Radio size={20} color="#166534" />
            <strong style={{ color: "#166534" }}>3 Sensor Masukan</strong>
            <span style={{ color: "#27834A" }}>DHT11 + MQ Gas + Gambut</span>
          </div>

          <div className="diagram-arrow">&rarr;</div>

          {/* Node 5: Relay Module */}
          <div className="diagram-node">
            <ToggleLeft size={20} color="#173F2B" />
            <strong>Modul Relay 5V</strong>
            <span>Sakelar Optocoupler</span>
          </div>

          <div className="diagram-arrow">&rarr;</div>

          {/* Node 6: Mini Pump */}
          <div
            className="diagram-node"
            style={{ borderColor: "#BAE6FD", background: "#F0F9FF" }}
          >
            <Droplets size={20} color="#0284C7" />
            <strong style={{ color: "#0369A1" }}>Mini Water Pump</strong>
            <span style={{ color: "#0284C7" }}>Pembasah AutoSpray</span>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterCategory(cat.key)}
              style={{
                padding: "7px 14px",
                borderRadius: "99px",
                fontSize: "11.5px",
                fontWeight: 600,
                background: filterCategory === cat.key ? "#173F2B" : "#FFFFFF",
                border: `1px solid ${
                  filterCategory === cat.key ? "#173F2B" : "#DFE6DC"
                }`,
                color: filterCategory === cat.key ? "#FFFFFF" : "#647268",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={fetchDevices}
          style={{
            background: "#FFFFFF",
            border: "1px solid #DFE6DC",
            borderRadius: "99px",
            padding: "6px 12px",
            color: "#647268",
            fontSize: "11.5px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <RotateCcw size={12} />
          <span>Refresh Hardware</span>
        </button>
      </div>

      {/* 4. Hardware Cards Grid (8 Devices) */}
      <div className="hardware-grid">
        {filteredDevices.map((dev) => (
          <div key={dev.id} className="hardware-card">
            {/* Visual Cutout */}
            <div className="hardware-card-visual">
              <Image
                src={dev.image}
                alt={dev.name}
                width={200}
                height={140}
                style={{ objectFit: "contain" }}
              />

              {/* Status Badges Overlay */}
              <div className="hardware-status-badges">
                <span
                  className={`status-badge status-${dev.connectionStatus}`}
                >
                  Koneksi: {dev.connectionStatus}
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
                    Komponen Pasif
                  </span>
                ) : (
                  <span
                    className={`status-badge status-${dev.operationStatus}`}
                  >
                    Status: {dev.operationStatus}
                  </span>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="hardware-card-body">
              <span className="hardware-category-tag">
                {dev.category} · {dev.code}
              </span>
              <h3 className="hardware-name">{dev.name}</h3>
              <p className="hardware-role">{dev.fieldRole}</p>

              {/* Hardware Specs Snippet */}
              <div className="hardware-specs-list">
                <div className="hardware-spec-row">
                  <span>Tegangan:</span>
                  <strong>{dev.workingVoltage}</strong>
                </div>
                <div className="hardware-spec-row">
                  <span>Sumber Daya:</span>
                  <strong>{dev.powerSource}</strong>
                </div>
                {dev.currentReading && (
                  <div
                    className="hardware-spec-row"
                    style={{
                      color: "#27834A",
                      borderTop: "1px solid #DFE6DC",
                      paddingTop: "6px",
                    }}
                  >
                    <span>Telemetri:</span>
                    <strong style={{ color: "#27834A" }}>
                      {dev.currentReading}
                    </strong>
                  </div>
                )}
              </div>

              {/* Status Notes */}
              <p
                style={{
                  fontSize: "11px",
                  color: "#647268",
                  margin: "6px 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Lightbulb size={13} color="#27834A" />
                <span>{dev.statusNotes}</span>
              </p>

              {/* Footer */}
              <div className="hardware-card-footer">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#647268",
                  }}
                >
                  <Clock size={11} /> {dev.lastPing}
                </span>

                <div style={{ display: "flex", gap: "6px" }}>
                  {canManageContent && !dev.isPassive && (
                    <button
                      onClick={() => handleToggleDeviceStatus(dev)}
                      style={{
                        background: "#F0F4EE",
                        border: "1px solid #DFE6DC",
                        color: "#17251D",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      title="Uji Toggle Status"
                    >
                      Ubah Status
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedDevice(dev)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#173F2B",
                      fontSize: "11.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    Detail &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Device Status Change History Table */}
      <div className="status-history-box">
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#17251D",
            margin: "0 0 4px",
          }}
        >
          Riwayat Perubahan Status Perangkat
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#647268",
            margin: "0 0 16px",
          }}
        >
          Log peristiwa operasional mikrokontroler, sensor tanah, modul relay,
          dan pompa mini
        </p>

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
                <td>{log.timestamp}</td>
                <td>
                  <strong>{log.deviceCode}</strong>
                </td>
                <td>{log.deviceName}</td>
                <td>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "10px",
                      fontWeight: 800,
                      background: "#EAF5EE",
                      color: "#166534",
                    }}
                  >
                    {log.changeType}
                  </span>
                </td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. Detail Modal Dialog */}
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
              maxWidth: "540px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 24px 60px rgba(23, 37, 29, 0.15)",
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
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: "#647268",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <X size={18} />
            </button>

            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 800,
                color: "#173F2B",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {selectedDevice.category} · {selectedDevice.code}
            </span>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#17251D",
                margin: "4px 0 12px",
              }}
            >
              {selectedDevice.name}
            </h3>

            <div
              style={{
                height: "160px",
                background: "#F8FAF7",
                border: "1px solid #DFE6DC",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Image
                src={selectedDevice.image}
                alt={selectedDevice.name}
                width={220}
                height={140}
                style={{ objectFit: "contain" }}
              />
            </div>

            <p
              style={{
                fontSize: "12.5px",
                color: "#36453B",
                lineHeight: 1.6,
                margin: "0 0 16px",
              }}
            >
              {selectedDevice.fullDesc}
            </p>

            <h4
              style={{
                fontSize: "12.5px",
                color: "#173F2B",
                margin: "0 0 8px",
                fontWeight: 800,
              }}
            >
              Spesifikasi Lengkap Lapangan
            </h4>
            <div
              style={{
                background: "#F8FAF7",
                border: "1px solid #DFE6DC",
                borderRadius: "10px",
                padding: "12px 14px",
                display: "grid",
                gap: "8px",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              {selectedDevice.specs.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
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
                padding: "11px",
                borderRadius: "99px",
                background: "#173F2B",
                border: "none",
                color: "#FFFFFF",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
            >
              Tutup Rincian Alat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
