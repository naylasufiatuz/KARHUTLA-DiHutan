import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TechNav from "@/components/TechNav";
import TechFooter from "@/components/TechFooter";
import DeviceGalleryWithModal from "@/components/DeviceGalleryWithModal";
import { iotMonitoringDevices } from "@/lib/devicesData";

export const metadata: Metadata = {
  title: "IoT Monitoring — Pos Jaga 01 DiHutan",
  description:
    "Penjelasan lengkap IoT Monitoring DiHutan: sensor kelembapan tanah, mikrokontroler ESP32, dan transmisi data telemetri lapangan.",
};

export default function IotMonitoringPage() {
  return (
    <div className="tech-page">
      <TechNav activePage="iot-monitoring" />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Pos jaga 01 · Mengamati</p>
              <h1>
                IoT <i>Monitoring.</i>
              </h1>
              <p className="hero-copy">
                Sensor cerdas di lapangan memeriksa kondisi tanah dan muka air gambut secara real-time.
                Data dikirimkan langsung ke pusat komando pemantau, sehingga petugas dapat
                mendeteksi potensi kekeringan sebelum titik api muncul.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#perangkat">
                  Kenali Perangkat <span aria-hidden="true">↓</span>
                </a>
                <a className="button" href="#cara-kerja">
                  Alur Kerja
                </a>
                <Link className="button" href="/technology">
                  ← Semua Teknologi
                </Link>
              </div>
            </div>
            <div className="hero-art">
              <Image
                src="/assets/technology/Soil%20Moisture%20Sensor%20Module%20and%20Probe.png"
                alt="Modul dan probe sensor kelembapan tanah"
                width={360}
                height={300}
                priority
              />
              <span className="hero-art-caption">
                Sensor Lapangan · Kelembapan Tanah Gambut
              </span>
            </div>
          </div>
        </section>

        {/* ALUR KERJA */}
        <section className="section" id="cara-kerja">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Dari tanah ke layar</p>
              <h2>Alur Pemantauan Lapangan</h2>
              <p>
                Setiap komponen memiliki peran terpadu dalam rantai telemetri.
                Data mentah dari tanah diubah menjadi informasi penting bagi petugas penjaga rimba.
              </p>
            </div>
            <div className="steps">
              <article className="step">
                <h3>01 · Sensor Mengukur</h3>
                <p>
                  Probe elektroda membaca resistansi dan kejenuhan air tanah gambut secara berkala setiap interval waktu tertentu.
                </p>
              </article>
              <article className="step">
                <h3>02 · ESP32 Mengolah Data</h3>
                <p>
                  Papan prosesor ESP32 mengonversi sinyal analog ke format digital, melakukan kalibrasi, dan menyiapkan enkripsi data.
                </p>
              </article>
              <article className="step">
                <h3>03 · Transmisi &amp; Pantauan</h3>
                <p>
                  Data dikirim melalui Wi-Fi / LoRa / Seluler ke platform DiHutan untuk visualisasi dasbor dan peringatan dini.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PERANGKAT & POPUP MODAL */}
        <section className="section alt" id="perangkat">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Katalog Perangkat Pos 01</p>
              <h2>Perangkat yang Disiapkan</h2>
              <p>
                Berikut adalah perangkat keras fisik yang terintegrasi pada pos pemantauan DiHutan.
                Klik <strong>Pelajari Lebih Lanjut</strong> pada salah satu alat untuk membuka pop-up penjelasan detail, spesifikasi, dan peran lapangannya.
              </p>
            </div>

            {/* Interactive gallery with modal */}
            <DeviceGalleryWithModal devices={iotMonitoringDevices} />

            <p className="note">
              Catatan Lapangan: Sensor kelembapan tanah adalah modul primer dalam pemantauan hidrologi gambut.
              Sensor tambahan (seperti suhu, gas MQ, atau ultrasonik tinggi muka air) dapat dihubungkan ke papan ekspansi ESP32
              sesuai konfigurasi pos pemantauan di wilayah target.
            </p>
          </div>
        </section>

        {/* FAQ & MANFAAT */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Fakta &amp; Penerapan</p>
              <h2>Memahami Nilai Nyata IoT di Rimba</h2>
            </div>
            <div className="feature-list">
              <div className="feature-row">
                <strong>Apa manfaat utama untuk pencegahan karhutla?</strong>
                <p>
                  Kebakaran gambut sering kali bermula dari lapisan atas yang mengalami defisit kelembapan ekstrem.
                  Sensor IoT mendeteksi tren kekeringan berminggu-minggu lebih awal sebelum risiko api membesar.
                </p>
              </div>
              <div className="feature-row">
                <strong>Bagaimana jika lokasi pos berada jauh di pedalaman?</strong>
                <p>
                  ESP32 mendukung penyimpanan lokal (microSD buffer) dan transmisi jarak jauh berbasis LoRa / GSM
                  dengan konsumsi daya ultra-hemat yang ditenagai panel surya mini dan baterai lithium.
                </p>
              </div>
              <div className="feature-row">
                <strong>Bagaimana data ini terhubung ke pos berikutnya?</strong>
                <p>
                  Setelah data terkumpul, Pos Jaga 02 (AI Forest Guardian) menganalisis pola anomali untuk memicu
                  peringatan dini serta mengarahkan Pos Jaga 03 (AutoSpray).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <div className="wrap closing-card">
            <div>
              <p className="eyebrow" style={{ color: "#c9ff9f" }}>Berikutnya: Pos Jaga 02</p>
              <h2>AI Forest Guardian: Membaca Pola &amp; Anomali</h2>
              <p>
                Setelah data kelembapan dan lingkungan terkumpul, kecerdasan buatan membantu
                merangkum ribuan titik angka menjadi petunjuk aksi yang jelas bagi tim patroli.
              </p>
            </div>
            <Link className="button primary" href="/ai-forest-guardian">
              Lanjut ke AI Guardian <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <TechFooter backLink={{ href: "/technology", label: "Semua teknologi ↗" }} />
    </div>
  );
}
