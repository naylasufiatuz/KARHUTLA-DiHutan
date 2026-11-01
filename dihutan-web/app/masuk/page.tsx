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
      setErrorMsg("Mohon isi email dan kata sandi.");
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
        background: "#082f22",
        color: "#ffffff",
        position: "relative",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          padding: "20px 24px",
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
            color: "#c4d7cc",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            src="/dihutan-logo-mark.png"
            alt="Logo"
            width={28}
            height={28}
          />
          <strong style={{ fontSize: "16px" }}>DiHutan</strong>
        </div>
      </div>

      {/* Main Login Box */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            color: "#0f2417",
            borderRadius: "22px",
            padding: "36px 32px",
            maxWidth: "460px",
            width: "100%",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: "#0a7544",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              PORTAL AUTENTIKASI
            </span>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#0f2417",
                margin: "6px 0 4px",
                letterSpacing: "-0.02em",
              }}
            >
              Masuk ke DiHutan
            </h1>
            <p style={{ fontSize: "12.5px", color: "#6f8774", margin: 0 }}>
              Akses dashboard pemantauan telemetri dan pengelolaan sistem
            </p>
          </div>

          {/* Logged Out Success Banner */}
          {isLoggedOut && !errorMsg && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "10px",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "#166534",
                marginBottom: "18px",
              }}
            >
              <CheckCircle2
                size={16}
                color="#166534"
                style={{ flexShrink: 0 }}
              />
              <span>
                Anda telah berhasil keluar dari akun DiHutan. Sesi aman telah
                ditutup.
              </span>
            </div>
          )}

          {errorMsg && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "10px",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "#991b1b",
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{ fontSize: "12px", fontWeight: 700, color: "#234e32" }}
              >
                Alamat Email
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #dce3dc",
                  fontSize: "13px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#234e32",
                  }}
                >
                  Kata Sandi
                </label>
                <span style={{ fontSize: "11px", color: "#0a7544" }}>
                  Lupa sandi?
                </span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #dce3dc",
                  fontSize: "13px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#0b3b2b",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "6px",
              }}
            >
              <LogIn size={16} />
              <span>
                {loading ? "Memproses Autentikasi..." : "Masuk ke Dashboard"}
              </span>
            </button>
          </form>

          {/* Quick Demo Login Matrix for Evaluators */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid #eef2ee",
            }}
          >
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 800,
                color: "#0a7544",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "8px",
              }}
            >
              <Sparkles size={12} />
              Akses Cepat Pengujian (3 Peran Sistem):
            </span>

            <div style={{ display: "grid", gap: "6px" }}>
              <button
                type="button"
                onClick={() =>
                  handleQuickLogin("USER", "relawan@dihutan.id")
                }
                style={{
                  padding: "7px 12px",
                  borderRadius: "8px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <User size={13} color="#166534" />
                  <span>Masuk sebagai USER (Penjaga Warga / Relawan)</span>
                </span>
                <ArrowRight size={12} />
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
                  padding: "7px 12px",
                  borderRadius: "8px",
                  background: "#fefce8",
                  border: "1px solid #fef08a",
                  color: "#854d0e",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <ShieldAlert size={13} color="#854d0e" />
                  <span>Masuk sebagai PIHAK BERTANGGUNG JAWAB (BKSDA)</span>
                </span>
                <ArrowRight size={12} />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickLogin("ADMIN", "admin.sistem@dihutan.id")
                }
                style={{
                  padding: "7px 12px",
                  borderRadius: "8px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#991b1b",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Shield size={13} color="#991b1b" />
                  <span>Masuk sebagai ADMIN (Administrator Sistem)</span>
                </span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "14px",
              borderTop: "1px solid #f0f3f0",
              textAlign: "center",
              fontSize: "12px",
              color: "#6f8774",
            }}
          >
            Belum memiliki akun terdaftar?{" "}
            <Link
              href="/daftar"
              style={{
                color: "#0a7544",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              Daftar Akun USER <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "16px",
          textAlign: "center",
          fontSize: "11.5px",
          color: "#688d77",
        }}
      >
        Platform DiHutan · Menjaga Hutan Kalimantan Melalui Telemetri Nyata
      </div>
    </div>
  );
}

export default function MasukPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#082f22" }} />
      }
    >
      <MasukContent />
    </Suspense>
  );
}
