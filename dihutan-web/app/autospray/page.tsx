import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TechNav from "@/components/TechNav";
import TechFooter from "@/components/TechFooter";
import DeviceGalleryWithModal from "@/components/DeviceGalleryWithModal";
import { autoSprayDevices } from "@/lib/devicesData";

export const metadata: Metadata = {
  title: "AutoSpray — Pos Jaga 03 DiHutan",
  description:
    "Rancangan sistem respons otomatis AutoSpray DiHutan: pompa air mini, katup solenoid, dan modul relay penjaga kelembapan gambut.",
};

export default function AutoSprayPage() {
  return (
    <div className="tech-page">
      <TechNav activePage="autospray" />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Pos jaga 03 · Menjaga</p>
              <h1>
                Auto<i>Spray.</i>
              </h1>
              <p className="hero-copy">
                AutoSpray adalah mekanisme respons cerdas yang mengalirkan air pembasah
                secara terukur saat gambut terdeteksi mengalami kekeringan kritis.
                Pompa dan katup solenoid bekerja harmonis berdasarkan perintah terkonfigurasi.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#perangkat">
                  Kenali Perangkat <span aria-hidden="true">↓</span>
                </a>
                <a className="button" href="#cara-kerja">
                  Alur Respons
                </a>
                <Link className="button" href="/technology">
                  ← Semua Teknologi
                </Link>
              </div>
            </div>
            <div className="hero-art">
              <Image
                src="/assets/technology/Mini%20Water%20Pump%20with%20Coiled%20Clear%20Tubing.png"
                alt="Pompa air mini dengan selang bening"
                width={360}
                height={300}
                priority
              />
              <span className="hero-art-caption">
                Aktuator Lapangan · Pompa Air Pembasah
              </span>
            </div>
          </div>
        </section>

        {/* ALUR KERJA */}
        <section className="section" id="cara-kerja">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Mekanisme otomatis</p>
              <h2>Air Bergerak Saat Diperlukan</h2>
              <p>
                Sistem pembasahan cerdas mengoptimalkan sumber air sekat kanal dan parit.
                Air dialirkan secara presisi untuk membasahi kembali lapisan gambut tanpa pemborosan.
              </p>
            </div>
            <div className="steps">
              <article className="step">
                <h3>01 · Ambang Batas Terlewati</h3>
                <p>
                  Data kelembapan tanah dari Pos 01 yang divalidasi oleh Pos 02 mengindikasikan kekeringan melebihi threshold aman (&lt; 30%).
                </p>
              </article>
              <article className="step">
                <h3>02 · Sinyal Pemicu Relay</h3>
                <p>
                  Mikrokontroler mengirim pulsa logika ke modul relay untuk mengaktifkan saluran daya pompa dan membuka katup solenoid.
                </p>
              </article>
              <article className="step">
                <h3>03 · Pembasahan Presisi</h3>
                <p>
                  Air didorong melalui selang ke area sasaran hingga sensor membaca kembali batas kelembapan optimal, lalu pompa berhenti otomatis.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PERANGKAT & POPUP MODAL */}
        <section className="section alt" id="perangkat">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Katalog Komponen Pos 03</p>
              <h2>Perangkat Pembasahan Otomatis</h2>
              <p>
                Komponen mekanikal dan elektrikal berikut membentuk sistem hidrolik terpadu AutoSpray.
                Klik <strong>Pelajari Lebih Lanjut</strong> untuk melihat rincian spesifikasi teknis dan perannya di lapangan.
              </p>
            </div>

            {/* Interactive device gallery with modal */}
            <DeviceGalleryWithModal devices={autoSprayDevices} />

            <p className="note">
              Catatan Operasional: Sistem pembasahan di lahan gambut wajib mempertimbangkan ketersediaan debit air sekat kanal,
              dampak ekologis, serta efisiensi daya baterai/surya. Ambang batas waktu semprot dikonfigurasi secara adaptif sesuai cuaca mikro.
            </p>
          </div>
        </section>

        {/* INTEGRASI SISTEM */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Keandalan Lapangan</p>
              <h2>Otomatisasi dengan Kendali Penuh Petugas</h2>
            </div>
            <div className="feature-list">
              <div className="feature-row">
                <strong>Apa tujuan utama sistem AutoSpray?</strong>
                <p>
                  Mencegah gambut mencapai titik kering kebakaran (*smoldering fire threshold*) secara preventif,
                  sehingga petugas tidak perlu memadamkan kebakaran besar di medan yang sulit dijangkau.
                </p>
              </div>
              <div className="feature-row">
                <strong>Apakah pompa dapat dikendalikan secara manual?</strong>
                <p>
                  Ya. Selain mode otomatis berbasis sensor, platform DiHutan mendukung override manual oleh petugas
                  melalui aplikasi saat inspeksi visual lapangan dilakukan.
                </p>
              </div>
              <div className="feature-row">
                <strong>Bagaimana jika debit air kanal sedang rendah?</strong>
                <p>
                  Sistem dilengkapi sensor proteksi level air (dry-run protection) untuk mencegah pompa bekerja tanpa air,
                  menjaga motor pompa tetap awet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <div className="wrap closing-card">
            <div>
              <p className="eyebrow" style={{ color: "#c9ff9f" }}>Ekosistem Terpadu</p>
              <h2>Kilas Balik: Dari Sensor Hingga Aksi Pompa</h2>
              <p>
                Ketiga pos teknologi DiHutan saling menyempurnakan: Mengamati melalui IoT,
                Memahami melalui AI Guardian, dan Menjaga melalui AutoSpray.
              </p>
            </div>
            <Link className="button primary" href="/technology">
              Kembali ke Ikhtisar Teknologi <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <TechFooter backLink={{ href: "/technology", label: "Semua teknologi ↗" }} />
    </div>
  );
}
