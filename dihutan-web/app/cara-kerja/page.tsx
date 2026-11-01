import React from "react";
import Link from "next/link";
import {
  Radio,
  Cpu,
  Layers,
  Activity,
  AlertTriangle,
  UserCheck,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Database,
  ArrowDown,
} from "lucide-react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function CaraKerjaSistemPage() {
  const steps = [
    {
      num: 1,
      type: "OTOMATIS (SENSOR)",
      title: "Sensor Membaca Parameter Fisik Lingkungan",
      icon: <Radio size={24} color="#0a7544" />,
      desc: "Tiga unit sensor membaca variabel lingkungan di titik pemasangan: DHT11 mengukur suhu dan kelembapan udara kanopi, MQ-series mendeteksi partikel gas pembakaran, dan sensor soil moisture resistif membaca kadar air tanah gambut dangkal.",
      actor: "Perangkat Keras Sensor",
    },
    {
      num: 2,
      type: "OTOMATIS (EDGE COMPUTING)",
      title: "ESP32 Mengumpulkan & Mengolah Pembacaan",
      icon: <Cpu size={24} color="#0a7544" />,
      desc: "Mikrokontroler ESP32 membaca pin analog (ADC) dan digital, menerapkan penyaringan derau (noise filtering), dan mengemas parameter telemetri ke dalam format JSON terstruktur bersama identitas unik perangkat.",
      actor: "Mikrokontroler ESP32",
    },
    {
      num: 3,
      type: "OTOMATIS (JARINGAN)",
      title: "Pengiriman Data Telemetri ke Backend",
      icon: <Database size={24} color="#0a7544" />,
      desc: "Data dikirimkan secara periodik ke endpoint backend Supabase melalui jaringan seluler atau gateway Wi-Fi. Jika koneksi terputus, perangkat menandai kegagalan transmisi tanpa memalsukan data baru.",
      actor: "Protokol HTTP/REST",
    },
    {
      num: 4,
      type: "OTOMATIS (SERVER & ATURAN)",
      title: "Validasi Database & Evaluasi Ambang Batas",
      icon: <Layers size={24} color="#0a7544" />,
      desc: "PostgreSQL menyimpan baris data dengan timestamp waktu nyata (WIB). Mesin aturan memeriksa apakah kadar air gambut anjlok di bawah ambang batas kritis (< 30%) atau gas melonjak di atas batas normal.",
      actor: "Supabase PostgreSQL",
    },
    {
      num: 5,
      type: "OTOMATIS (ANTARMUKA WEB)",
      title: "Penyajian Geospasial pada Peta Monitoring",
      icon: <Activity size={24} color="#0a7544" />,
      desc: "Data sensor terbaru dipetakan secara visual ke stasiun pemantauan kawasan Sungai Kapuas menggunakan MapLibre GL JS. Indikator marker berubah warna (Hijau: Normal, Kuning: Perhatian, Merah: Kritis).",
      actor: "Frontend Next.js MapLibre",
    },
    {
      num: 6,
      type: "OTOMATIS (SISTEM LOG)",
      title: "Pembuatan Catatan Peringatan Dini",
      icon: <AlertTriangle size={24} color="#d97706" />,
      desc: "Jika parameter lingkungan melampaui batas risiko karhutla, sistem membuat record peringatan dengan status awal 'Menunggu Verifikasi', mencantumkan lokasi, parameter pemicu, dan nilai sensor.",
      actor: "Mesin Peringatan Sistem",
    },
    {
      num: 7,
      type: "MANUSIA (PETUGAS BKSDA)",
      title: "Pemeriksaan Informasi oleh Petugas Lapangan",
      icon: <UserCheck size={24} color="#0369a1" />,
      desc: "Petugas yang bertanggung jawab menerima pembaruan status peringatan pada dashboard, memeriksa riwayat grafik 24 jam, dan menyiapkan koordinasi pemeriksaan fisik ke titik koordinat stasiun.",
      actor: "Pihak Bertanggung Jawab",
    },
    {
      num: 8,
      type: "MANUSIA (VERIFIKASI FISIK)",
      title: "Verifikasi Nyata di Lokasi Hutan",
      icon: <FileCheck2 size={24} color="#166534" />,
      desc: "Petugas mendatangi lokasi untuk memastikan apakah kondisi tersebut akibat kekeringan alami gambut atau terdapat titik bara bawah permukaan. Status indikasi tidak otomatis dianggap sebagai kebakaran sampai diverifikasi mata manusia.",
      actor: "Tim Patroli Lapangan",
    },
    {
      num: 9,
      type: "MANUSIA & DATA (PENYELESAIAN)",
      title: "Pencatatan Resmi Hasil & Tindak Lanjut",
      icon: <CheckCircle2 size={24} color="#15803d" />,
      desc: "Hasil patroli dicatat ke dalam sistem: jika terkonfirmasi kebakaran, status dialihkan ke 'Dalam Penanganan' dan aksi pembasahan dikoordinasikan; jika tidak terbukti, dicatat sebagai 'Tidak Terkonfirmasi'.",
      actor: "Pelaporan & Audit Resmi",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8f5", color: "#17251e" }}>
      <PublicNav />

      {/* Hero Section */}
      <section style={{ background: "#0b3b2b", color: "#ffffff", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#68d391", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            ARSITEKTUR &amp; PROSES REKAYASA
          </span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "10px 0 16px" }}>
            Cara Kerja Sistem DiHutan
          </h1>
          <p style={{ fontSize: "16px", color: "#d1ead7", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Rantai komprehensif mulai dari akuisisi sinyal sensor di lapangan gambut Kalimantan Barat hingga verifikasi dan pencatatan tindak lanjut oleh petugas yang berwenang.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "54px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Intro Card */}
        <div style={{ background: "#ffffff", border: "1px solid #e1e8e2", borderRadius: "18px", padding: "28px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f2417", margin: "0 0 10px" }}>
            Pemisahan Tegas Antara Otomatisasi Alat dan Tanggung Jawab Manusia
          </h2>
          <p style={{ fontSize: "13.5px", color: "#43564b", lineHeight: 1.65, margin: 0 }}>
            DiHutan tidak mengklaim sistem sepenuhnya berjalan secara magis oleh AI tanpa intervensi. Pemantauan lingkungan adalah kerja rekayasa yang disiplin: perangkat keras membaca telemetri, backend mengolah data secara jujur, dan keputusan penanganan bencana tetap berada di tangan tim manusia yang terlatih.
          </p>
        </div>

        {/* Steps List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {steps.map((st, idx) => (
            <React.Fragment key={st.num}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e1e8e2",
                  borderRadius: "16px",
                  padding: "24px 28px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                {/* Number & Icon */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "#eaf5ee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#0a7544",
                    }}
                  >
                    {st.num}
                  </div>
                  {st.icon}
                </div>

                {/* Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: st.type.startsWith("OTOMATIS") ? "#eaf5ee" : "#fef3c7",
                        color: st.type.startsWith("OTOMATIS") ? "#0a7544" : "#92400e",
                      }}
                    >
                      {st.type}
                    </span>
                    <span style={{ fontSize: "11px", color: "#75847a", fontWeight: 600 }}>
                      Pelaksana: <strong>{st.actor}</strong>
                    </span>
                  </div>

                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: "2px 0 4px" }}>
                    {st.title}
                  </h3>

                  <p style={{ fontSize: "13px", color: "#43564b", lineHeight: 1.6, margin: 0 }}>
                    {st.desc}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div style={{ display: "flex", justifyContent: "center", margin: "-6px 0" }}>
                  <ArrowDown size={18} color="#b8d4be" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Next */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", borderTop: "1px solid #e1e8e2", flexWrap: "wrap", gap: "16px" }}>
          <Link
            href="/perangkat"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "99px",
              background: "#0b3b2b",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 700,
            }}
          >
            <span>Kenali Rincian Foto Fisik Perangkat IoT</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/dashboard/monitoring"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "99px",
              background: "#ffffff",
              color: "#0f2417",
              border: "1px solid #e1e8e2",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 700,
            }}
          >
            <span>Buka Peta Monitoring Sungai Kapuas</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
