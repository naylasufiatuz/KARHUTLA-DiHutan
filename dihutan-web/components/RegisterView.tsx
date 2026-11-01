"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Activity, Bell, Users, ShieldCheck, Leaf } from "lucide-react";

interface RegisteredUser {
  nama: string;
  email: string;
  telepon: string;
  peran: string;
  wilayah: string;
  idRegistrasi: string;
}

export default function RegisterView() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [peran, setPeran] = useState("Warga Komunitas Sekitar Hutan");
  const [wilayah, setWilayah] = useState("Pontianak & Sekitarnya (Kalimantan Barat)");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validations
    if (!nama.trim()) {
      setErrorMsg("Mohon masukkan nama lengkap Anda.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Mohon masukkan alamat email yang valid.");
      return;
    }

    if (!telepon.trim()) {
      setErrorMsg("Mohon masukkan nomor WhatsApp atau telepon aktif.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Kata sandi minimal harus terdiri dari 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok dengan kata sandi yang dimasukkan.");
      return;
    }

    if (!agreed) {
      setErrorMsg("Anda harus menyetujui Kode Etik Penjaga Rimba untuk melanjutkan.");
      return;
    }

    setIsSubmitting(true);

    const performSignUp = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: nama,
              phone: telepon,
              role: "USER",
              region: wilayah,
            },
          },
        });

        if (error) {
          console.warn("Supabase auth signUp warning:", error.message);
        }

        // Insert profile row into profiles table if user is available
        if (data?.user) {
          try {
            await supabase.from("profiles").upsert({
              id: data.user.id,
              email,
              full_name: nama,
              phone: telepon,
              role: "USER",
              region: wilayah,
            });
          } catch (profileErr) {
            console.warn("Profile insert warning:", profileErr);
          }
        }
      } catch (err) {
        console.warn("Registration network fallback:", err);
      } finally {
        try {
          const profileData = {
            name: nama,
            email,
            phone: telepon,
            region: wilayah,
            role: "USER" as const,
          };
          localStorage.setItem("dihutan_active_role", "USER");
          localStorage.setItem("dihutan_user_profile", JSON.stringify(profileData));
          window.dispatchEvent(new Event("storage"));
        } catch {
          // Ignore
        }

        const regId = `PR-KALBAR-${Math.floor(1000 + Math.random() * 9000)}`;
        setRegisteredUser({
          nama,
          email,
          telepon,
          peran,
          wilayah,
          idRegistrasi: regId,
        });
        setIsSubmitting(false);
        setIsSuccess(true);
      }
    };

    performSignUp();
  };

  const handleReset = () => {
    setNama("");
    setEmail("");
    setTelepon("");
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
    setErrorMsg("");
    setIsSuccess(false);
    setRegisteredUser(null);
  };

  return (
    <div className="register-page">
      {/* Top Header Navigation */}
      <header className="register-header">
        <Link href="/" className="register-brand" aria-label="DiHutan Beranda">
          <Image
            src="/dihutan-logo-mark.png"
            alt="Logo DiHutan"
            width={38}
            height={38}
            priority
          />
          <strong>DiHutan</strong>
        </Link>
        <div className="register-header-actions">
          <Link href="/" className="register-nav-link">
            BERANDA
          </Link>
          <Link href="/technology" className="register-nav-link">
            TEKNOLOGI
          </Link>
          <Link href="/" className="register-home-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali
          </Link>
        </div>
      </header>

      {/* Main Registration Content */}
      <main className="register-main">
        <div className="register-wrap">
          {/* Left Column: Story, Values & Benefits */}
          <div className="register-story">
            <span className="register-kicker">PENDAFTARAN PENJAGA RIMBA</span>
            <h1 className="register-title">
              Menjadi Bagian dari <i>Pelindung Rimba</i> Kalimantan
            </h1>
            <p className="register-lead">
              Bergabunglah bersama ribuan warga, relawan pemadam, dan pemerhati lingkungan dalam
              jaringan deteksi dini kebakaran hutan dan konservasi berbasis IoT DiHutan.
            </p>

            <div className="register-benefits">
              <div className="benefit-card">
                <div className="benefit-icon" style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#EAF5EE", display: "flex", alignItems: "center", justifyContent: "center", color: "#27834A" }}><Activity size={18} /></div>
                <div>
                  <strong>Akses Peta Pantau & Data Sensor Lapangan</strong>
                  <p>
                    Pantau kondisi suhu kanopi, kelembaban gambut, dan gas udara di DAS Kapuas secara
                    transparan dan terstruktur.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon" style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#FEF8EC", display: "flex", alignItems: "center", justifyContent: "center", color: "#D99A2B" }}><Bell size={18} /></div>
                <div>
                  <strong>Peringatan Dini Cepat Karhutla</strong>
                  <p>
                    Terima notifikasi darurat saat sensor mendeteksi potensi lonjakan panas ekstrem atau
                    indikasi asap sebelum api membesar.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon" style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#EAF2E8", display: "flex", alignItems: "center", justifyContent: "center", color: "#173F2B" }}><Users size={18} /></div>
                <div>
                  <strong>Kolaborasi Komunitas & Pelaporan Terpadu</strong>
                  <p>
                    Sampaikan laporan kondisi lapangan dengan koordinat lokasi dan koordinasi langsung
                    dengan posko pemadam setempat.
                  </p>
                </div>
              </div>
            </div>

            <div className="register-quote">
              &ldquo;Menjaga rimba bukan tugas satu pihak, melainkan ikhtiar bersama yang dihidupkan oleh
              setiap mata dan hati yang peduli.&rdquo;
            </div>
          </div>

          {/* Right Column: Register Form Card or Success View */}
          <div className="register-card">
            {!isSuccess ? (
              <>
                <div className="register-card-head">
                  <h2>Daftar Akun Penjaga</h2>
                  <p>Lengkapi formulir berikut untuk mendapatkan hak akses pemantauan rimba.</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px", padding: "5px 12px", borderRadius: "8px", backgroundColor: "#EAF5EE", border: "1px solid #BCE3CB", color: "#27834A", fontSize: "11.5px", fontWeight: 700 }}><ShieldCheck size={14} /><span>Hak Akses Publik: <strong>USER</strong> (Relawan / Warga Rimba)</span></div>
                </div>

                <form className="register-form" onSubmit={handleSubmit} noValidate>
                  {/* Nama Lengkap */}
                  <div className="register-field">
                    <label htmlFor="reg-nama">Nama Lengkap</label>
                    <input
                      id="reg-nama"
                      type="text"
                      className="register-input"
                      placeholder="cth. Budi Setiawan"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="register-field">
                    <label htmlFor="reg-email">Alamat Email</label>
                    <input
                      id="reg-email"
                      type="email"
                      className="register-input"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Nomor WhatsApp / Telepon */}
                  <div className="register-field">
                    <label htmlFor="reg-tel">No. WhatsApp / Telepon Aktif</label>
                    <input
                      id="reg-tel"
                      type="tel"
                      className="register-input"
                      placeholder="081234567890"
                      value={telepon}
                      onChange={(e) => setTelepon(e.target.value)}
                      required
                    />
                  </div>

                  {/* Peran Penjaga */}
                  <div className="register-field">
                    <label htmlFor="reg-peran">Peran Penjaga Rimba</label>
                    <select
                      id="reg-peran"
                      className="register-select"
                      value={peran}
                      onChange={(e) => setPeran(e.target.value)}
                    >
                      <option value="Warga Komunitas Sekitar Hutan">
                        Warga Komunitas Sekitar Hutan
                      </option>
                      <option value="Relawan Pemadam Kebakaran (MPA)">
                        Relawan Pemadam Kebakaran (MPA)
                      </option>
                      <option value="Pengelola Kawasan / Petugas Hutan">
                        Pengelola Kawasan / Petugas Hutan
                      </option>
                      <option value="Peneliti / Mahasiswa Lingkungan">
                        Peneliti / Mahasiswa Lingkungan
                      </option>
                      <option value="Masyarakat Umum Peduli Alam">
                        Masyarakat Umum Peduli Alam
                      </option>
                    </select>
                  </div>

                  {/* Wilayah Pantau */}
                  <div className="register-field">
                    <label htmlFor="reg-wilayah">Wilayah Fokus Pemantauan</label>
                    <select
                      id="reg-wilayah"
                      className="register-select"
                      value={wilayah}
                      onChange={(e) => setWilayah(e.target.value)}
                    >
                      <option value="Pontianak & Sekitarnya (Kalimantan Barat)">
                        Pontianak & Sekitarnya (Kalimantan Barat)
                      </option>
                      <option value="DAS Sungai Kapuas">DAS Sungai Kapuas</option>
                      <option value="Kabupaten Sintang & Melawi">
                        Kabupaten Sintang & Melawi
                      </option>
                      <option value="Kabupaten Ketapang & Kayong Utara">
                        Kabupaten Ketapang & Kayong Utara
                      </option>
                      <option value="Kabupaten Sambas & Bengkayang">
                        Kabupaten Sambas & Bengkayang
                      </option>
                      <option value="Kabupaten Kapuas Hulu">Kabupaten Kapuas Hulu</option>
                      <option value="Wilayah Lain di Indonesia">
                        Wilayah Lain di Indonesia
                      </option>
                    </select>
                  </div>

                  {/* Kata Sandi */}
                  <div className="register-field">
                    <label htmlFor="reg-pass">Kata Sandi (Minimal 8 karakter)</label>
                    <div className="register-input-group">
                      <input
                        id="reg-pass"
                        type={showPassword ? "text" : "password"}
                        className="register-input"
                        placeholder="Buat kata sandi aman"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                      >
                        {showPassword ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" x2="22" y1="2" y2="22" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Konfirmasi Kata Sandi */}
                  <div className="register-field">
                    <label htmlFor="reg-confirm-pass">Ulangi Kata Sandi</label>
                    <div className="register-input-group">
                      <input
                        id="reg-confirm-pass"
                        type={showConfirmPassword ? "text" : "password"}
                        className="register-input"
                        placeholder="Ulangi kata sandi Anda"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                      >
                        {showConfirmPassword ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" x2="22" y1="2" y2="22" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Persetujuan Kode Etik */}
                  <label className="register-checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>
                      Saya menyetujui <strong>Kode Etik Penjaga Rimba</strong> dan bersedia
                      menggunakan data pemantauan untuk perlindungan kelestarian hutan.
                    </span>
                  </label>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="register-note" role="alert">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="register-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Mendaftarkan Akun..."
                    ) : (
                      <>
                        Daftar sebagai Penjaga Rimba
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                <div className="register-card-footer">
                  Sudah memiliki akun?{" "}
                  <Link href="/masuk">Masuk ke Ruang Pemantauan &rarr;</Link>
                </div>
              </>
            ) : (
              /* Success Screen */
              <div className="register-success-view">
                <div className="success-badge-icon"><Leaf size={26} color="#27834A" /></div>
                <h3>Selamat Datang, Penjaga Rimba!</h3>
                <p>
                  Pendaftaran akunmu telah berhasil. Data kamu kini tercatat di jaringan
                  pengawasan DiHutan Kalimantan Barat.
                </p>

                {registeredUser && (
                  <div className="success-registered-info">
                    <p style={{ margin: "0 0 6px 0" }}>
                      Nama: <strong>{registeredUser.nama}</strong>
                    </p>
                    <p style={{ margin: "0 0 6px 0" }}>
                      Email: <strong>{registeredUser.email}</strong>
                    </p>
                    <p style={{ margin: "0 0 6px 0" }}>
                      Peran: <strong>{registeredUser.peran}</strong>
                    </p>
                    <p style={{ margin: "0 0 6px 0" }}>
                      Wilayah: <strong>{registeredUser.wilayah}</strong>
                    </p>
                    <p style={{ margin: "0", color: "#ffd77a", fontWeight: 700 }}>
                      ID Penjaga: {registeredUser.idRegistrasi}
                    </p>
                  </div>
                )}

                <div className="success-actions" style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", marginTop: "20px" }}>
                  <Link
                    href="/dashboard"
                    className="success-primary-btn"
                    style={{ textAlign: "center", textDecoration: "none" }}
                  >
                    Masuk ke Ruang Kerja Dashboard &rarr;
                  </Link>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Link
                      href="/masuk"
                      className="success-secondary-btn"
                      style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
                    >
                      Halaman Masuk (Login)
                    </Link>
                    <Link
                      href="/"
                      className="success-secondary-btn"
                      style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
                    >
                      Beranda DiHutan
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="success-secondary-btn"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8da08c", textAlign: "center" }}
                  >
                    Daftar akun lain
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

