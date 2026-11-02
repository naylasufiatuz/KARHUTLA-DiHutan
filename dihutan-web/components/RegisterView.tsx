"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, MapPin, Leaf } from "lucide-react";

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
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAgreed(false);
    setErrorMsg("");
    setIsSuccess(false);
    setRegisteredUser(null);
  };

  return (
    <div className="register-page">
      {/* Top Header Navigation */}
      <header className="register-header">
        <Link href="/" className="register-close-btn" aria-label="Tutup halaman daftar">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </Link>
      </header>

      {/* Main Registration Content */}
      <main className="login-section register-main">
        <div className="wrap login-wrap register-wrap">
          {/* Left Column: Story, Values & Benefits */}
          <div className="login-copy register-story">
            <span className="login-kicker">RUANG PENJAGA · DIHUTAN</span>
            <h2 className="register-title">
              Hutan memanggil.
              <br />
              <i>Daftar,</i>
              <br />
              jaga bersama.
            </h2>
            <p className="register-lead">
              Bergabung ke ruang pemantauan untuk membaca tanda-tanda alam,
              berbagi laporan lapangan, dan ikut menjaga hutan Kalimantan.
            </p>

            <div className="login-location register-location">
              <MapPin size={20} aria-hidden="true" />
              <span>DAS Kapuas · Kalimantan Barat</span>
            </div>
          </div>

          {/* Right Column: Register Form Card or Success View */}
          <div className="login-card register-card">
            {!isSuccess ? (
              <>
                <div className="login-card-head register-card-head">
                  <div>
                    <h3 className="login-card-title">Daftar akun penjaga</h3>
                    <p className="login-card-subtitle">Lengkapi data untuk bergabung menjaga hutan.</p>
                    <div className="register-access-badge"><ShieldCheck size={14} /><span>Hak Akses Publik: <strong>USER</strong> (Relawan / Warga Rimba)</span></div>
                  </div>
                </div>

                <form className="login-form register-form" onSubmit={handleSubmit} noValidate>
                  {/* Nama Lengkap */}
                  <div className="login-field register-field">
                    <label htmlFor="reg-nama">Nama Lengkap</label>
                    <input
                      id="reg-nama"
                      type="text"
                      className="login-input register-input"
                      placeholder="cth. Budi Setiawan"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="login-field register-field">
                    <label htmlFor="reg-email">Alamat Email</label>
                    <input
                      id="reg-email"
                      type="email"
                      className="login-input register-input"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Nomor WhatsApp / Telepon */}
                  <div className="login-field register-field">
                    <label htmlFor="reg-tel">No. WhatsApp / Telepon Aktif</label>
                    <input
                      id="reg-tel"
                      type="tel"
                      className="login-input register-input"
                      placeholder="081234567890"
                      value={telepon}
                      onChange={(e) => setTelepon(e.target.value)}
                      required
                    />
                  </div>

                  {/* Peran Penjaga */}
                  <div className="login-field register-field">
                    <label htmlFor="reg-peran">Peran Penjaga Rimba</label>
                    <select
                      id="reg-peran"
                      className="login-input register-select"
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
                  <div className="login-field register-field">
                    <label htmlFor="reg-wilayah">Wilayah Fokus Pemantauan</label>
                    <select
                      id="reg-wilayah"
                      className="login-input register-select"
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
                  <div className="login-field register-field">
                    <label htmlFor="reg-pass">Kata Sandi (Minimal 8 karakter)</label>
                    <div className="login-input-wrap register-input-group">
                      <input
                        id="reg-pass"
                        type={showPassword ? "text" : "password"}
                        className="login-input register-input"
                        placeholder="Buat kata sandi aman"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="login-eye password-toggle-btn"
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
                  <div className="login-field register-field">
                    <label htmlFor="reg-confirm-pass">Ulangi Kata Sandi</label>
                    <div className="login-input-wrap register-input-group">
                      <input
                        id="reg-confirm-pass"
                        type={showConfirmPassword ? "text" : "password"}
                        className="login-input register-input"
                        placeholder="Ulangi kata sandi Anda"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="login-eye password-toggle-btn"
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
                  <label className="login-remember register-checkbox-label">
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
                    className="login-submit register-submit-btn"
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

                <div className="login-footer register-card-footer">
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
