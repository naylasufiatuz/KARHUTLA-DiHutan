import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TechNav from "@/components/TechNav";
import TechFooter from "@/components/TechFooter";

export const metadata: Metadata = {
  title: "AI Forest Guardian — Pos Jaga 02 DiHutan",
  description:
    "Konsep analitik cerdas AI Forest Guardian DiHutan: mendeteksi anomali kelembapan tanah, tren cuaca mikro, dan mitigasi dini karhutla.",
};

export default function AiForestGuardianPage() {
  return (
    <div className="tech-page">
      <TechNav activePage="ai-forest-guardian" />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Pos jaga 02 · Memahami</p>
              <h1>
                AI Forest <i>Guardian.</i>
              </h1>
              <p className="hero-copy">
                Ketika sensor telemetri mengumpulkan ribuan titik data kelembapan dan cuaca,
                kecerdasan buatan hadir sebagai asisten cerdas untuk memetakan pola dan mengenali
                kondisi kritis sebelum kebakaran gambut terjadi.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#cara-kerja">
                  Alur Analisis Data <span aria-hidden="true">↓</span>
                </a>
                <a className="button" href="#tingkat-risiko">
                  Kategori Risiko
                </a>
                <Link className="button" href="/technology">
                  ← Semua Teknologi
                </Link>
              </div>
            </div>
            <div className="hero-art">
              <Image
                src="/app-screenshot.png"
                alt="Contoh visual antarmuka platform AI DiHutan"
                width={360}
                height={300}
                priority
              />
              <span className="hero-art-caption">
                Platform Monitoring · Analitik Cerdas Lapangan
              </span>
            </div>
          </div>
        </section>

        {/* ALUR KERJA */}
        <section className="section" id="cara-kerja">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Asisten untuk Membaca Data</p>
              <h2>Bagaimana AI Membantu Petugas Rimba</h2>
              <p>
                AI Guardian dirancang sebagai penguat keputusan (*decision support system*),
                bukan pengganti peran manusia. Setiap rekomendasi dievaluasi dan dikonfirmasi oleh tim patroli lapangan.
              </p>
            </div>
            <div className="steps">
              <article className="step">
                <h3>01 · Agregasi Data Telemetri</h3>
                <p>
                  Menerima data periodik kelembapan tanah dari Pos 01, riwayat curah hujan, dan data cuaca lokal DAS Kapuas.
                </p>
              </article>
              <article className="step">
                <h3>02 · Analisis Pola Penurunan</h3>
                <p>
                  Membandingkan penurunan kelembapan dengan tren musiman untuk mendeteksi apakah tanah mengering lebih cepat dari wajar.
                </p>
              </article>
              <article className="step">
                <h3>03 · Rekomendasi Tindakan</h3>
                <p>
                  Menghasilkan notifikasi prioritas patroli dan mengaktifkan simulasi rekomendasi pembasahan ke Pos 03 (AutoSpray).
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* TINGKAT RISIKO & ANOMALI */}
        <section className="section alt" id="tingkat-risiko">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Interpretasi Cerdas</p>
              <h2>Klasifikasi Status Bahaya Lingkungan</h2>
              <p>
                Algoritma merangkum berbagai variabel lingkungan menjadi tiga status operasional yang mudah dipahami oleh seluruh tim.
              </p>
            </div>

            <div className="feature-grid hub-grid">
              <div className="feature-card" style={{ padding: "20px" }}>
                <span className="hub-card-tag" style={{ borderColor: "#27ae60", color: "#2ecc71" }}>STATUS 01</span>
                <h3 style={{ marginTop: "14px", color: "#c9ff9f" }}>🟢 Kondisi Terjaga</h3>
                <p style={{ margin: "10px 0 14px", fontSize: "11px", color: "#b6c5b5" }}>
                  Kelembapan tanah berada di atas 60%. Muka air gambut stabil dan cadangan air sekat kanal mencukupi.
                </p>
                <div style={{ fontSize: "10px", color: "#8da08c", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  Aksi: Pemantauan rutin otomatis 24 jam.
                </div>
              </div>

              <div className="feature-card" style={{ padding: "20px" }}>
                <span className="hub-card-tag" style={{ borderColor: "#e67e22", color: "#f39c12" }}>STATUS 02</span>
                <h3 style={{ marginTop: "14px", color: "#f1c40f" }}>🟡 Perhatian / Waspada</h3>
                <p style={{ margin: "10px 0 14px", fontSize: "11px", color: "#b6c5b5" }}>
                  Kelembapan menurun ke rentang 30%–60% dalam beberapa hari berturut-turut tanpa adanya presipitasi hujan.
                </p>
                <div style={{ fontSize: "10px", color: "#8da08c", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  Aksi: Notifikasi ke petugas untuk verifikasi lokasi terdekat.
                </div>
              </div>

              <div className="feature-card" style={{ padding: "20px" }}>
                <span className="hub-card-tag" style={{ borderColor: "#e74c3c", color: "#e74c3c" }}>STATUS 03</span>
                <h3 style={{ marginTop: "14px", color: "#ff7675" }}>🔴 Kritis / Bahaya</h3>
                <p style={{ margin: "10px 0 14px", fontSize: "11px", color: "#b6c5b5" }}>
                  Kelembapan tanah &lt; 30% di lapisan atas gambut. Risiko pemicuan api sangat tinggi jika ada sumber panas.
                </p>
                <div style={{ fontSize: "10px", color: "#8da08c", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                  Aksi: Peringatan darurat &amp; sinyal pemicuan pompa AutoSpray.
                </div>
              </div>
            </div>

            <p className="note">
              Catatan Sistem: Algoritma prediktif DiHutan dirancang dengan prinsip transparansi.
              Setiap nilai risiko dapat ditelusuri riwayat perubahannya dan diverifikasi dengan kondisi nyata di lapangan.
            </p>
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <div className="wrap closing-card">
            <div>
              <p className="eyebrow" style={{ color: "#c9ff9f" }}>Berikutnya: Pos Jaga 03</p>
              <h2>AutoSpray: Bergerak Melindungi Gambut</h2>
              <p>
                Ketika analisis AI mengindikasikan zona lahan mengalami kekeringan ekstrem,
                sistem AutoSpray menggerakkan pompa air dan katup solenoid untuk pembasahan terukur.
              </p>
            </div>
            <Link className="button primary" href="/autospray">
              Lanjut ke AutoSpray <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <TechFooter backLink={{ href: "/technology", label: "Semua teknologi ↗" }} />
    </div>
  );
}
