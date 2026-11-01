"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LogIn,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
  Shield,
  User,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Lock,
  Mail,
  Loader2,
  TreePine,
  Activity,
  Cpu,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { UserRole } from "@/lib/dashboard-data";

function MasukContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoggedOut = searchParams.get("status") === "logged_out";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const applyRoleAndNavigate = (
    role: UserRole,
    userEmail?: string,
    userName?: string
  ) => {
    try {
      const resolvedEmail =
        userEmail ||
        (role === "ADMIN"
          ? "admin.sistem@dihutan.id"
          : role === "PIHAK_BERTANGGUNG_JAWAB"
          ? "petugas.bksda@dihutan.id"
          : "relawan@dihutan.id");

      const resolvedName =
        userName ||
        (role === "ADMIN"
          ? "Administrator Sistem"
          : role === "PIHAK_BERTANGGUNG_JAWAB"
          ? "Budi Santoso (BKSDA)"
          : "Ardi Rahman");

      const profileData = {
        name: resolvedName,
        email: resolvedEmail,
        role: role,
        phone: "0812-3456-7890",
        region: "Pontianak & DAS Kapuas (Kalimantan Barat)",
      };

      localStorage.setItem("dihutan_active_role", role);
      localStorage.setItem("dihutan_user_profile", JSON.stringify(profileData));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Ignore
    }
    router.push("/dashboard");
  };

  const handleQuickLogin = (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    const demoName =
      role === "ADMIN"
        ? "Administrator Sistem"
        : role === "PIHAK_BERTANGGUNG_JAWAB"
        ? "Budi Santoso (BKSDA)"
        : "Relawan Penjaga Rimba";
    applyRoleAndNavigate(role, demoEmail, demoName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Mohon masukkan alamat email dan kata sandi Anda.");
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Fallback for demo when Supabase auth user hasn't been created yet
        if (email.includes("@")) {
          let detectedRole: UserRole = "USER";
          let detectedName = email.split("@")[0].replace(/[._]/g, " ");
          detectedName =
            detectedName.charAt(0).toUpperCase() + detectedName.slice(1);

          if (email.toLowerCase().includes("admin")) {
            detectedRole = "ADMIN";
            detectedName = "Administrator Sistem";
          } else if (
            email.toLowerCase().includes("petugas") ||
            email.toLowerCase().includes("bksda")
          ) {
            detectedRole = "PIHAK_BERTANGGUNG_JAWAB";
            detectedName = "Budi Santoso (BKSDA)";
          }
          applyRoleAndNavigate(detectedRole, email, detectedName);
          return;
        }
        setErrorMsg(error.message || "Email atau kata sandi tidak cocok.");
        return;
      }

      if (data?.session) {
        let detectedRole: UserRole = "USER";
        let detectedName =
          data.session.user.user_metadata?.full_name || email.split("@")[0];

        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", data.session.user.id)
            .single();

          if (profile) {
            if (profile.role) detectedRole = profile.role as UserRole;
            if (profile.full_name) detectedName = profile.full_name;
          }
        } catch {
          // Ignore
        }
        applyRoleAndNavigate(detectedRole, email, detectedName);
      } else {
        applyRoleAndNavigate("USER", email);
      }
    } catch {
      // Offline fallback
      applyRoleAndNavigate("USER", email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F7F2",
        color: "#17251D",
        fontFamily:
          '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          borderBottom: "1px solid #DFE6DC",
          backgroundColor: "#FFFFFF",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#647268",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#173F2B")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#647268")}
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#173F2B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/dihutan-logo-mark.png"
              alt="Logo DiHutan"
              width={22}
              height={22}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong
              style={{
                fontSize: "16px",
                letterSpacing: "-0.02em",
                color: "#17251D",
                lineHeight: 1.1,
              }}
            >
              DiHutan
            </strong>
            <span
              style={{
                fontSize: "8.5px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "#285C40",
                textTransform: "uppercase",
              }}
            >
              INTELIJEN HUTAN
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 4vw, 48px) 16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            maxWidth: "960px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid #DFE6DC",
            boxShadow: "0 10px 30px rgba(23, 37, 29, 0.06)",
            overflow: "hidden",
          }}
        >
          {/* Left Decorative Forest Showcase */}
          <div
            style={{
              backgroundColor: "#173F2B",
              color: "#FFFFFF",
              padding: "clamp(32px, 4vw, 48px)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            {/* Background forest image with atmospheric tint */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.28,
                mixBlendMode: "luminosity",
                pointerEvents: "none",
              }}
            >
              <Image
                src="/hutan.jpg"
                alt="Hutan Kalimantan"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Gradient overlay to guarantee text legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(23, 63, 43, 0.85) 0%, rgba(23, 63, 43, 0.98) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Left Content */}
            <div style={{ position: "relative", zIndex: 10 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "99px",
                  backgroundColor: "rgba(139, 175, 112, 0.2)",
                  border: "1px solid rgba(139, 175, 112, 0.4)",
                  color: "#E2F0D8",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                <TreePine size={13} color="#8BAF70" />
                <span>Teknologi Pemantauan Hutan</span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  margin: "0 0 12px 0",
                  lineHeight: 1.2,
                }}
              >
                Satu Pusat Kendali Lingkungan Rimba
              </h2>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#D0DDD3",
                  lineHeight: 1.6,
                  margin: "0 0 24px 0",
                }}
              >
                Masuk ke platform DiHutan untuk mengakses telemetri real-time muka
                air gambut, status perangkat IoT fisik, ensiklopedia botani, dan
                koordinasi verifikasi lapangan.
              </p>

              {/* Feature Highlights */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "12.5px",
                    color: "#E2F0D8",
                  }}
                >
                  <Activity size={16} color="#8BAF70" />
                  <span>Monitoring Sensor Suhu, Kelembapan & Gas</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "12.5px",
                    color: "#E2F0D8",
                  }}
                >
                  <Cpu size={16} color="#8BAF70" />
                  <span>3 Pos Perangkat Hardware ESP32 Terintegrasi</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "12.5px",
                    color: "#E2F0D8",
                  }}
                >
                  <Shield size={16} color="#8BAF70" />
                  <span>Verifikasi Cepat & Tindak Lanjut Pihak Berwenang</span>
                </div>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 10,
                marginTop: "32px",
                fontSize: "11px",
                color: "#A2C0AD",
              }}
            >
              Fokus Kawasan: Koridor DAS Sungai Kapuas, Kalimantan Barat
            </div>
          </div>

          {/* Right Form Card */}
          <div
            style={{
              padding: "clamp(32px, 4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  color: "#285C40",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                PORTAL AUTENTIKASI
              </span>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#17251D",
                  margin: "6px 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Masuk ke DiHutan
              </h1>
              <p style={{ fontSize: "13px", color: "#647268", margin: 0 }}>
                Gunakan kredensial terdaftar untuk membuka dashboard
              </p>
            </div>

            {/* Logged Out Banner */}
            {isLoggedOut && !errorMsg && (
              <div
                style={{
                  backgroundColor: "#EAF5EE",
                  border: "1px solid #BCE3CB",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "12px",
                  color: "#27834A",
                  marginBottom: "18px",
                }}
              >
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                <span>
                  Anda telah berhasil keluar dari akun. Sesi aman telah ditutup.
                </span>
              </div>
            )}

            {/* Error Banner */}
            {errorMsg && (
              <div
                style={{
                  backgroundColor: "#FDF2F1",
                  border: "1px solid #F8C8C4",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "12px",
                  color: "#C7473D",
                  marginBottom: "18px",
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Field Email */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  htmlFor="login-email"
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 700,
                    color: "#17251D",
                  }}
                >
                  Alamat Email
                </label>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={16}
                    color="#647268"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 38px",
                      borderRadius: "10px",
                      border: "1px solid #DFE6DC",
                      backgroundColor: "#FFFFFF",
                      color: "#17251D",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#173F2B")}
                    onBlur={(e) => (e.target.style.borderColor = "#DFE6DC")}
                  />
                </div>
              </div>

              {/* Field Password */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label
                    htmlFor="login-pass"
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#17251D",
                    }}
                  >
                    Kata Sandi
                  </label>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: "#285C40",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      alert(
                        "Silakan gunakan email login akun demo atau hubungi administrator untuk menyetel ulang kata sandi."
                      )
                    }
                  >
                    Lupa sandi?
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={16}
                    color="#647268"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    id="login-pass"
                    type="password"
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 38px",
                      borderRadius: "10px",
                      border: "1px solid #DFE6DC",
                      backgroundColor: "#FFFFFF",
                      color: "#17251D",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#173F2B")}
                    onBlur={(e) => (e.target.style.borderColor = "#DFE6DC")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#173F2B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "6px",
                  boxShadow: "0 2px 6px rgba(23, 63, 43, 0.2)",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "#285C40";
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "#173F2B";
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="status-spin" />
                    <span>Memproses Autentikasi...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Masuk ke Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Matrix */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "18px",
                borderTop: "1px solid #DFE6DC",
              }}
            >
              <div
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  color: "#647268",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                }}
              >
                <Sparkles size={13} color="#285C40" />
                <span>Akses Cepat Pengujian 3 Peran:</span>
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickLogin("USER", "relawan@dihutan.id")
                  }
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: "#EAF5EE",
                    border: "1px solid #BCE3CB",
                    color: "#27834A",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <User size={14} color="#27834A" />
                    <span>USER — Relawan / Warga Rimba</span>
                  </span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleQuickLogin(
                      "PIHAK_BERTANGGUNG_JAWAB",
                      "petugas.bksda@dihutan.id"
                    )
                  }
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: "#FEF8EC",
                    border: "1px solid #F6DEAF",
                    color: "#D99A2B",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <ShieldAlert size={14} color="#D99A2B" />
                    <span>PETUGAS — BKSDA / Manggala Agni</span>
                  </span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleQuickLogin("ADMIN", "admin.sistem@dihutan.id")
                  }
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: "#FDF2F1",
                    border: "1px solid #F8C8C4",
                    color: "#C7473D",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Shield size={14} color="#C7473D" />
                    <span>ADMIN — Administrator Sistem</span>
                  </span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Registration Footer Link */}
            <div
              style={{
                marginTop: "20px",
                paddingTop: "14px",
                borderTop: "1px solid #DFE6DC",
                textAlign: "center",
                fontSize: "12.5px",
                color: "#647268",
              }}
            >
              Belum memiliki akun?{" "}
              <Link
                href="/daftar"
                style={{
                  color: "#173F2B",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                Daftar Akun USER <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer
        style={{
          padding: "16px",
          textAlign: "center",
          fontSize: "12px",
          color: "#647268",
          borderTop: "1px solid #DFE6DC",
          backgroundColor: "#FFFFFF",
        }}
      >
        Platform DiHutan · Menjaga Hutan Kalimantan Melalui Telemetri Nyata
      </footer>
    </div>
  );
}

export default function MasukPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", backgroundColor: "#F5F7F2" }} />
      }
    >
      <MasukContent />
    </Suspense>
  );
}
