import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Target, Users, AlertCircle, ArrowRight } from "lucide-react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function TentangDiHutanPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8f5", color: "#17251e" }}>
      <PublicNav />

      {/* Hero Section */}
      <section style={{ background: "#0b3b2b", color: "#ffffff", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#68d391", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            PROFIL &amp; MISI SISTEM
          </span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "10px 0 16px" }}>
            Tentang DiHutan
          </h1>
          <p style={{ fontSize: "16px", color: "#d1ead7", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Inisiatif teknologi pemantauan lingkungan berbasis Internet of Things (IoT) dan edukasi ensiklopedia rimba yang dirancang khusus untuk memitigasi risiko kebakaran hutan dan lahan (karhutla) di lanskap gambut Sungai Kapuas, Kalimantan Barat.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "54px 24px", display: "flex", flexDirection: "column", gap: "48px" }}>
        {/* 1. Latar Belakang & Urgensi */}
        <section style={{ background: "#ffffff", border: "1px solid #e1e8e2", borderRadius: "20px", padding: "36px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#0a7544", marginBottom: "8px" }}>
            <Target size={22} />
            <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              LATAR BELAKANG
            </span>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2417", margin: "0 0 16px" }}>
            Ancaman Kebakaran Hutan Gambut Kalimantan Barat
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "center" }}>
            <div style={{ fontSize: "14px", color: "#43564b", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ margin: 0 }}>
                Hutan rawa gambut di sepanjang daerah aliran Sungai Kapuas menyimpan cadangan karbon raksasa sekaligus menjadi benteng hidrologis alami. Namun, ketika musim kemarau tiba dan kanal-kanal buatan mengeringkan kubah gambut, lapisan tanah organik purba ini menjadi sangat rentan membara di bawah permukaan.
              </p>
              <p style={{ margin: 0 }}>
                Kebakaran gambut seringkali sulit dideteksi pada tahap awal karena api merayap lambat di kedalaman tanah tanpa kobaran besar di tajuk pohon. Begitu asap tebal muncul, penanganan menjadi sangat mahal dan membahayakan habitat satwa endemik seperti Orangutan Kalimantan dan Bekantan.
              </p>
            </div>
            <div style={{ position: "relative", height: "240px", borderRadius: "14px", overflow: "hidden", border: "1px solid #e1e8e2" }}>
              <Image
                src="/hutan.jpg"
                alt="Kondisi Hutan Gambut Kalimantan"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* 2. Sasaran Pengguna & Manfaat */}
        <section>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#0a7544", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              SASARAN SISTEM
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2417", margin: "4px 0 0" }}>
              Tiga Pilar Kolaborasi Penjaga Hutan
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            <div style={{ background: "#ffffff", border: "1px solid #e1e8e2", borderRadius: "16px", padding: "24px" }}>
              <Users size={24} color="#0a7544" style={{ marginBottom: "12px" }} />
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: "0 0 8px" }}>
                1. Masyarakat &amp; Relawan Desa
              </h3>
              <p style={{ fontSize: "13px", color: "#43564b", lineHeight: 1.6, margin: 0 }}>
                Mendapatkan akses informasi kondisi lingkungan gambut terkini, wawasan konservasi, serta saluran resmi untuk menyampaikan laporan indikasi kebakaran secara cepat dan terdata.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e1e8e2", borderRadius: "16px", padding: "24px" }}>
              <ShieldCheck size={24} color="#0a7544" style={{ marginBottom: "12px" }} />
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: "0 0 8px" }}>
                2. Petugas BKSDA &amp; Manggala Agni
              </h3>
              <p style={{ fontSize: "13px", color: "#43564b", lineHeight: 1.6, margin: 0 }}>
                Memantau peta sebaran perangkat telemetri secara geospasial, menerima peringatan awal ambang kritis, melakukan verifikasi lapangan, dan mencatat riwayat penanganan resmi.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e1e8e2", borderRadius: "16px", padding: "24px" }}>
              <Target size={24} color="#0a7544" style={{ marginBottom: "12px" }} />
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: "0 0 8px" }}>
                3. Peneliti &amp; Edukator Konservasi
              </h3>
              <p style={{ fontSize: "13px", color: "#43564b", lineHeight: 1.6, margin: 0 }}>
                Mengakses data historis telemetri gambut, mempelajari keanekaragaman flora dan fauna Sungai Kapuas melalui ensiklopedia ilmiah tanpa materi kuis atau gamifikasi dangkal.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Batasan Sistem & Etika Rekayasa */}
        <section style={{ background: "#fef8f0", border: "1px solid #fbd9b3", borderRadius: "20px", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#b45309", marginBottom: "8px" }}>
            <AlertCircle size={22} />
            <strong style={{ fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              BATASAN TEKNIS &amp; INTEGRITAS INFORMASI
            </strong>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#78350f", margin: "0 0 12px" }}>
            Sensor Memberikan Indikasi Lingkungan, Bukan Pembuktian Otomatis
          </h2>
          <p style={{ fontSize: "13.5px", color: "#92400e", lineHeight: 1.65, margin: "0 0 12px" }}>
            DiHutan menganut prinsip kejujuran sistem rekayasa. Perangkat keras IoT membaca parameter fisik lingkungan (suhu udara, kelembapan relatif, kadar air gambut, dan partikel gas). Kenaikan suhu atau penurunan kelembapan tanah melewati batas kritis adalah <strong>indikasi anomali lingkungan</strong> yang memerlukan tindakan pemeriksaan manusia, bukan bukti mutlak bahwa kebakaran telah berkobar.
          </p>
          <p style={{ fontSize: "13px", color: "#92400e", lineHeight: 1.6, margin: 0 }}>
            Website ini tidak membuat klaim kecerdasan buatan muluk-muluk, tidak memicu semprotan air tanpa integrasi aktuator tervalidasi, dan tidak mengarang koordinat stasiun yang belum dipasang di lapangan.
          </p>
        </section>

        {/* 4. Tautan Navigasi Lanjutan */}
        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", borderTop: "1px solid #e1e8e2", flexWrap: "wrap", gap: "16px" }}>
          <Link
            href="/cara-kerja"
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
            <span>Pelajari Alur &amp; Cara Kerja Sistem</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/perangkat"
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
            <span>Lihat Dokumentasi Foto Asli Perangkat IoT</span>
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

