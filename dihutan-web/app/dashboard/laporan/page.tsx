"use client";

import React, { useState } from "react";
import {
  Shield,
  CheckCircle2,
  MapPin,
  Send,
  User,
  Phone,
  Clock,
  ArrowRight,
  Search,
  MessageSquare,
  X,
  FileText,
  RotateCcw,
} from "lucide-react";
import { useDashboard } from "@/lib/dashboard-context";
import { ReportStatus, CommunityReport } from "@/lib/dashboard-data";

export default function DashboardLaporanPage() {
  const {
    role,
    reports,
    isLoadingReports,
    refreshReports,
    addReport,
    updateReportStatus,
    canVerifyReports,
  } = useDashboard();

  // Form State
  const [title, setTitle] = useState("");
  const [incidentType, setIncidentType] =
    useState<CommunityReport["incidentType"]>("Indikasi Asap");
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | ReportStatus>("ALL");

  // Selected Report Modal for Detail & Verification
  const [selectedReport, setSelectedReport] = useState<CommunityReport | null>(
    null
  );
  const [customNotes, setCustomNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !locationName.trim() || !description.trim()) {
      alert("Mohon lengkapi judul, lokasi kejadian, dan deskripsi laporan.");
      return;
    }

    setIsSubmitting(true);
    await addReport({
      title,
      incidentType,
      locationName,
      description,
      reporterName:
        reporterName.trim() ||
        (role === "USER" ? "Warga Rimba (Anonim)" : "Petugas Terdaftar"),
      reporterPhone: reporterPhone.trim() || undefined,
      photoUrl: "/hutan.jpg",
    });

    // Reset Form
    setTitle("");
    setLocationName("");
    setDescription("");
    setReporterName("");
    setReporterPhone("");
    setIsSubmitting(false);
    setIsSuccessMsg(true);
    setTimeout(() => setIsSuccessMsg(false), 5000);
  };

  const filteredReports = reports.filter((r) => {
    const matchStatus = filterStatus === "ALL" || r.status === filterStatus;
    const matchSearch =
      !searchQuery.trim() ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadgeClass = (status: ReportStatus) => {
    switch (status) {
      case "TERKIRIM":
        return "rep-TERKIRIM";
      case "DIVERIFIKASI":
        return "rep-DIVERIFIKASI";
      case "INVESTIGASI":
        return "rep-INVESTIGASI";
      case "SELESAI":
        return "rep-SELESAI";
    }
  };

  const handleUpdateStatus = async (
    reportId: string,
    status: ReportStatus,
    notes?: string
  ) => {
    await updateReportStatus(reportId, status, notes);
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status,
              officerNotes: notes ?? prev.officerNotes,
              verifiedBy:
                role === "ADMIN"
                  ? "Admin Sistem DiHutan"
                  : "Petugas Lapangan BKSDA",
            }
          : null
      );
    }
  };

  return (
    <div>
      {/* 1. Role Notice */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #DFE6DC",
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "12.5px",
          color: "#17251D",
          boxShadow: "0 1px 3px rgba(23, 37, 29, 0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Shield size={18} color="#173F2B" />
          <span>
            Anda saat ini terhubung sebagai: <strong>{role}</strong>.{" "}
            {canVerifyReports
              ? "Anda memiliki otorisasi verifikasi lapangan dan dapat memperbarui status laporan masyarakat ke database Supabase."
              : "Anda dapat mengirim laporan indikasi kebakaran/kerusakan kanal dan memantau respons tim lapangan secara realtime."}
          </span>
        </div>
        <button
          onClick={() => refreshReports()}
          style={{
            background: "none",
            border: "1px solid #DFE6DC",
            borderRadius: "99px",
            padding: "4px 10px",
            color: "#647268",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            fontWeight: 600,
          }}
          title="Sinkronisasi Data"
        >
          <RotateCcw size={12} />
          <span>Sinkron</span>
        </button>
      </div>

      <div className="reports-layout">
        {/* 2. Left Column: Form Pelaporan Lapangan */}
        <div className="report-form-card">
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 800,
              color: "#173F2B",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            PARTISIPASI WARGA RIMBA
          </span>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#17251D",
              margin: "4px 0 6px",
            }}
          >
            Buat Laporan Lapangan
          </h2>
          <p style={{ fontSize: "12px", color: "#647268", margin: 0, lineHeight: 1.5 }}>
            Laporkan kepulan asap, pintu sekat kanal rusak, atau titik api
            gambut di sekitar kawasan Anda.
          </p>

          {isSuccessMsg && (
            <div
              style={{
                background: "#EAF5EE",
                border: "1px solid #27834A",
                borderRadius: "10px",
                padding: "10px 14px",
                marginTop: "12px",
                fontSize: "12px",
                color: "#166534",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircle2 size={16} color="#27834A" />
              <span>
                Laporan berhasil dikirim ke pos pantau dan tersimpan di database!
              </span>
            </div>
          )}

          <form className="report-form" onSubmit={handleSubmit}>
            <div className="report-field">
              <label>Judul Laporan Singkat</label>
              <input
                type="text"
                className="report-input"
                placeholder="cth. Terlihat asap tebal di balik kebun gambut KM 12"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="report-field">
              <label>Jenis Kejadian</label>
              <select
                className="report-select"
                value={incidentType}
                onChange={(e) =>
                  setIncidentType(
                    e.target.value as CommunityReport["incidentType"]
                  )
                }
              >
                <option value="Indikasi Asap">Indikasi Asap Pembakaran</option>
                <option value="Kebakaran Gambut">Kebakaran Gambut Aktif</option>
                <option value="Kekeringan Parit">
                  Kekeringan Parit / Sekat Kanal Rusak
                </option>
                <option value="Aktivitas Ilegal">
                  Aktivitas Ilegal di Hutan Lindung
                </option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="report-field">
              <label>Lokasi / Titik Acuan di Lapangan</label>
              <input
                type="text"
                className="report-input"
                placeholder="cth. Dusun Rasau Karya, Sekat Kanal No. 03, Kubu Raya"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              />
            </div>

            <div className="report-field">
              <label>Nama Pelapor (Opsional)</label>
              <input
                type="text"
                className="report-input"
                placeholder="cth. Budi Setiawan (Relawan MPA)"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
              />
            </div>

            <div className="report-field">
              <label>No. Kontak WhatsApp (Untuk Koordinasi)</label>
              <input
                type="tel"
                className="report-input"
                placeholder="08xxxxxxxxxx"
                value={reporterPhone}
                onChange={(e) => setReporterPhone(e.target.value)}
              />
            </div>

            <div className="report-field">
              <label>Deskripsi &amp; Detail Kondisi</label>
              <textarea
                className="report-textarea"
                rows={3}
                placeholder="Jelaskan perkiraan luas area, ada/tidaknya sumber air terdekat, dan arah hembusan angin..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="report-submit-btn"
              disabled={isSubmitting}
            >
              <Send size={14} />
              <span>
                {isSubmitting
                  ? "Mengirim Laporan..."
                  : "Kirim Laporan ke Pos Pantau"}
              </span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* 3. Right Column: Laporan Masuk & Tracking Status Stepper */}
        <div>
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
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#17251D",
                  margin: 0,
                }}
              >
                Daftar Laporan Terkini ({filteredReports.length})
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#647268",
                  margin: "2px 0 0",
                }}
              >
                Pelacakan alur respon: Terkirim &rarr; Diverifikasi &rarr;
                Investigasi &rarr; Selesai
              </p>
            </div>

            {/* Search and Filters */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#FFFFFF",
                  border: "1px solid #DFE6DC",
                  borderRadius: "99px",
                  padding: "4px 10px",
                }}
              >
                <Search size={13} color="#647268" />
                <input
                  type="text"
                  placeholder="Cari laporan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "#17251D",
                    fontSize: "11.5px",
                    width: "110px",
                  }}
                />
              </div>

              {(
                [
                  "ALL",
                  "TERKIRIM",
                  "DIVERIFIKASI",
                  "INVESTIGASI",
                  "SELESAI",
                ] as const
              ).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "99px",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    background:
                      filterStatus === st ? "#173F2B" : "#FFFFFF",
                    border: `1px solid ${
                      filterStatus === st ? "#173F2B" : "#DFE6DC"
                    }`,
                    color: filterStatus === st ? "#FFFFFF" : "#647268",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Loading or Empty State */}
          {isLoadingReports ? (
            <div
              style={{
                padding: "36px",
                textAlign: "center",
                color: "#647268",
                background: "#FFFFFF",
                border: "1px solid #DFE6DC",
                borderRadius: "14px",
              }}
            >
              <RotateCcw
                size={20}
                style={{
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 8px",
                }}
              />
              <p style={{ margin: 0, fontSize: "12.5px" }}>
                Memuat data laporan dari pusat komando...
              </p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div
              style={{
                padding: "36px",
                textAlign: "center",
                color: "#647268",
                background: "#FFFFFF",
                border: "1px solid #DFE6DC",
                borderRadius: "14px",
              }}
            >
              <FileText
                size={32}
                style={{ opacity: 0.4, margin: "0 auto 8px" }}
              />
              <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "#17251D" }}>
                Tidak ada laporan yang sesuai kriteria pencarian.
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#647268" }}>
                Gunakan formulir di sebelah kiri untuk memasukkan laporan baru.
              </p>
            </div>
          ) : (
            filteredReports.map((rep) => {
              const steps: ReportStatus[] = [
                "TERKIRIM",
                "DIVERIFIKASI",
                "INVESTIGASI",
                "SELESAI",
              ];
              const currentStepIdx = steps.indexOf(rep.status);

              return (
                <div key={rep.id} className="report-item-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          color: "#647268",
                        }}
                      >
                        ID: {rep.id} · {rep.incidentType} · {rep.createdAt}
                      </span>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#17251D",
                          margin: "4px 0",
                        }}
                      >
                        {rep.title}
                      </h4>
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 600,
                          color: "#173F2B",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <MapPin size={12} color="#173F2B" />
                        {rep.locationName}
                      </span>
                    </div>

                    <span
                      className={`report-status-badge ${getStatusBadgeClass(
                        rep.status
                      )}`}
                    >
                      {rep.status}
                    </span>
                  </div>

                  {/* 4-Stage Workflow Stepper */}
                  <div className="status-stepper">
                    {steps.map((st, sIdx) => (
                      <React.Fragment key={st}>
                        <span
                          className={`stepper-step ${
                            sIdx <= currentStepIdx ? "is-done" : ""
                          }`}
                        >
                          {sIdx <= currentStepIdx ? "✓" : "○"} {st}
                        </span>
                        {sIdx < steps.length - 1 && (
                          <span className="stepper-arrow">&rarr;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <p
                    style={{
                      fontSize: "12.5px",
                      color: "#36453B",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {rep.description}
                  </p>

                  {rep.officerNotes && (
                    <div
                      style={{
                        background: "#F0F7F2",
                        borderLeft: "3px solid #27834A",
                        padding: "8px 12px",
                        borderRadius: "0 8px 8px 0",
                        fontSize: "11.5px",
                        color: "#166534",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <MessageSquare
                        size={13}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <div>
                        <strong>
                          Tanggapan Petugas ({rep.verifiedBy || "Petugas"}):
                        </strong>{" "}
                        {rep.officerNotes}
                      </div>
                    </div>
                  )}

                  {/* Pelapor Info */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "11px",
                      color: "#647268",
                      borderTop: "1px solid #DFE6DC",
                      paddingTop: "10px",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <User size={12} />
                      Pelapor: <strong style={{ color: "#17251D" }}>{rep.reporterName}</strong>{" "}
                      {rep.reporterPhone && (
                        <span>
                          <Phone
                            size={11}
                            style={{
                              display: "inline",
                              verticalAlign: "middle",
                            }}
                          />{" "}
                          {rep.reporterPhone}
                        </span>
                      )}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={11} />
                      Update: {rep.updatedAt}
                    </span>
                  </div>

                  {/* Action Buttons for PETUGAS / ADMIN */}
                  {canVerifyReports && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#F8FAF7",
                        border: "1px solid #DFE6DC",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        marginTop: "4px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 800,
                          color: "#173F2B",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Shield size={12} color="#173F2B" />
                        TINDAKAN PETUGAS:
                      </span>
                      {rep.status !== "DIVERIFIKASI" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              rep.id,
                              "DIVERIFIKASI",
                              "Data laporan telah dicek silang dengan sensor telemetri terdekat."
                            )
                          }
                          style={{
                            padding: "4px 10px",
                            borderRadius: "99px",
                            background: "#FEF8EC",
                            border: "1px solid #D99A2B",
                            color: "#92400E",
                            fontSize: "10.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Tandai Diverifikasi
                        </button>
                      )}
                      {rep.status !== "INVESTIGASI" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              rep.id,
                              "INVESTIGASI",
                              "Regu patroli Manggala Agni diberangkatkan menuju lokasi."
                            )
                          }
                          style={{
                            padding: "4px 10px",
                            borderRadius: "99px",
                            background: "#FFF7ED",
                            border: "1px solid #EA580C",
                            color: "#9A3412",
                            fontSize: "10.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Kirim Regu Investigasi
                        </button>
                      )}
                      {rep.status !== "SELESAI" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              rep.id,
                              "SELESAI",
                              "Penanganan lapangan tuntas. Situasi kembali aman terkendali."
                            )
                          }
                          style={{
                            padding: "4px 10px",
                            borderRadius: "99px",
                            background: "#EAF5EE",
                            border: "1px solid #27834A",
                            color: "#166534",
                            fontSize: "10.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Selesaikan Kasus
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedReport(rep);
                          setCustomNotes(rep.officerNotes || "");
                        }}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "99px",
                          background: "#173F2B",
                          border: "1px solid #173F2B",
                          color: "#FFFFFF",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          cursor: "pointer",
                          marginLeft: "auto",
                        }}
                      >
                        Buka &amp; Tulis Catatan
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. MODAL DETAIL & CATATAN INVESTIGASI PETUGAS */}
      {selectedReport && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(23, 37, 29, 0.45)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedReport(null)}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #DFE6DC",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "540px",
              width: "100%",
              color: "#17251D",
              boxShadow: "0 20px 50px rgba(23, 37, 29, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 800,
                    color: "#173F2B",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  DETAIL LAPORAN #{selectedReport.id}
                </span>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#17251D",
                    margin: "4px 0 0",
                  }}
                >
                  {selectedReport.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#647268",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                fontSize: "12px",
                marginBottom: "16px",
                background: "#F8FAF7",
                border: "1px solid #DFE6DC",
                padding: "14px",
                borderRadius: "10px",
              }}
            >
              <div>
                <span style={{ color: "#647268", display: "block", fontSize: "11px" }}>
                  Kategori
                </span>
                <strong>{selectedReport.incidentType}</strong>
              </div>
              <div>
                <span style={{ color: "#647268", display: "block", fontSize: "11px" }}>
                  Status Terkini
                </span>
                <span
                  className={`report-status-badge ${getStatusBadgeClass(
                    selectedReport.status
                  )}`}
                >
                  {selectedReport.status}
                </span>
              </div>
              <div>
                <span style={{ color: "#647268", display: "block", fontSize: "11px" }}>
                  Lokasi
                </span>
                <strong>{selectedReport.locationName}</strong>
              </div>
              <div>
                <span style={{ color: "#647268", display: "block", fontSize: "11px" }}>
                  Pelapor
                </span>
                <strong>{selectedReport.reporterName}</strong>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#17251D",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Deskripsi Lapangan:
              </label>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "#36453B",
                  lineHeight: 1.6,
                  margin: 0,
                  background: "#FAFCF9",
                  border: "1px solid #DFE6DC",
                  padding: "10px 12px",
                  borderRadius: "8px",
                }}
              >
                {selectedReport.description}
              </p>
            </div>

            {canVerifyReports && (
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#173F2B",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Catatan Investigasi Petugas / Tindak Lanjut:
                </label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ketik catatan hasil pengecekan lapangan, kondisi sekat kanal, atau instruksi pompa..."
                  style={{
                    width: "100%",
                    background: "#FFFFFF",
                    border: "1px solid #DFE6DC",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    color: "#17251D",
                    fontSize: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {(["DIVERIFIKASI", "INVESTIGASI", "SELESAI"] as const).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => {
                          handleUpdateStatus(selectedReport.id, st, customNotes);
                          setSelectedReport(null);
                        }}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "6px",
                          background:
                            st === "SELESAI"
                              ? "#27834A"
                              : st === "INVESTIGASI"
                              ? "#EA580C"
                              : "#D99A2B",
                          border: "none",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Set: {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedReport(null)}
                style={{
                  background: "#F0F4EE",
                  border: "1px solid #DFE6DC",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  color: "#17251D",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
