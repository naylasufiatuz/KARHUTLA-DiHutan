import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PublicFooter() {
  return (
    <footer
      style={{
        background: "#173F2B",
        color: "#ffffff",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "48px 24px 32px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "36px",
          marginBottom: "40px",
        }}
      >
        {/* Brand & Purpose */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/dihutan-logo-mark.png"
                alt="Logo DiHutan"
                width={26}
                height={26}
              />
            </div>
            <div>
              <strong style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>DiHutan</strong>
              <span style={{ display: "block", fontSize: "8.5px", fontWeight: 800, letterSpacing: "0.14em", color: "#8BAF70" }}>
                INTELIJEN HUTAN
              </span>
            </div>
          </div>
          <p style={{ fontSize: "12.5px", color: "#b3cbbe", lineHeight: 1.6, margin: 0 }}>
            Platform pemantauan telemetri gambut dan edukasi keanekaragaman hayati hutan tropis Kalimantan, berfokus di koridor Sungai Kapuas, Kalimantan Barat.
          </p>
        </div>

        {/* Public Navigation */}
        <div>
          <strong style={{ fontSize: "13px", color: "#8BAF70", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
            Jelajahi Sistem
          </strong>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}>
            <li><Link href="/" style={{ color: "#c4d7cc", textDecoration: "none" }}>Beranda</Link></li>
            <li><Link href="/tentang" style={{ color: "#c4d7cc", textDecoration: "none" }}>Tentang DiHutan</Link></li>
            <li><Link href="/cara-kerja" style={{ color: "#c4d7cc", textDecoration: "none" }}>Cara Kerja Sistem</Link></li>
            <li><Link href="/perangkat" style={{ color: "#c4d7cc", textDecoration: "none" }}>Perangkat Keras IoT</Link></li>
            <li><Link href="/edukasi" style={{ color: "#c4d7cc", textDecoration: "none" }}>Perpustakaan Ensiklopedia</Link></li>
          </ul>
        </div>

        {/* Dashboard Services */}
        <div>
          <strong style={{ fontSize: "13px", color: "#8BAF70", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
            Layanan Dashboard
          </strong>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}>
            <li><Link href="/dashboard" style={{ color: "#c4d7cc", textDecoration: "none" }}>Overview Sistem</Link></li>
            <li><Link href="/dashboard/monitoring" style={{ color: "#c4d7cc", textDecoration: "none" }}>Peta Monitoring Kapuas</Link></li>
            <li><Link href="/dashboard/laporan" style={{ color: "#c4d7cc", textDecoration: "none" }}>Pelaporan Kebakaran</Link></li>
            <li><Link href="/masuk" style={{ color: "#c4d7cc", textDecoration: "none" }}>Portal Masuk Petugas</Link></li>
            <li><Link href="/daftar" style={{ color: "#c4d7cc", textDecoration: "none" }}>Daftar Akun Pengguna</Link></li>
            <li><a href="https://drive.google.com/file/d/1OvJh5XtWD4I64kgkJLK69zpy28fiMaIP/view" target="_blank" rel="noopener noreferrer" style={{ color: "#8BAF70", textDecoration: "none", fontWeight: 700 }}>Download APK Android ↗</a></li>
          </ul>
        </div>

        {/* Technical & Ethical Integrity */}
        <div>
          <strong style={{ fontSize: "13px", color: "#8BAF70", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
            Integritas Data
          </strong>
          <p style={{ fontSize: "12px", color: "#a2c0ad", lineHeight: 1.55, margin: 0 }}>
            DiHutan menyajikan data sensor secara jujur. Nilai simulasi secara eksplisit diberi label <strong>DATA SIMULASI</strong>. Pembacaan sensor merupakan indikasi kondisi lingkungan, bukan bukti mutlak kebakaran tanpa verifikasi lapangan.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "11.5px",
          color: "#7e9c88",
        }}
      >
        <span>&copy; {new Date().getFullYear()} DiHutan. Hak Cipta Dilindungi Undang-Undang.</span>
        <span>Wilayah Fokus: Sungai Kapuas &amp; Hutan Gambut Kalimantan Barat</span>
      </div>
    </footer>
  );
}

