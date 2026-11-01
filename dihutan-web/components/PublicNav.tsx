"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogIn, ArrowRight } from "lucide-react";

export default function PublicNav() {
  const pathname = usePathname();

  const links = [
    { label: "Beranda", href: "/" },
    { label: "Tentang DiHutan", href: "/tentang" },
    { label: "Cara Kerja", href: "/cara-kerja" },
    { label: "Perangkat IoT", href: "/perangkat" },
    { label: "Edukasi Hutan", href: "/edukasi" },
  ];

  return (
    <header
      style={{
        background: "#082f22",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src="/dihutan-logo-mark.png"
              alt="Logo DiHutan"
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <strong style={{ fontSize: "18px", letterSpacing: "-0.02em", display: "block", lineHeight: 1.1 }}>
              DiHutan
            </strong>
            <span style={{ fontSize: "8.5px", fontWeight: 800, letterSpacing: "0.14em", color: "#68d391", textTransform: "uppercase" }}>
              INTELIJEN HUTAN
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {links.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "8px 14px",
                  borderRadius: "99px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: isActive ? "#ffffff" : "#c4d7cc",
                  background: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                  transition: "all 0.18s ease",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href="/masuk"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "99px",
              fontSize: "12.5px",
              fontWeight: 600,
              textDecoration: "none",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <LogIn size={14} />
            <span>Masuk</span>
          </Link>

          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "99px",
              fontSize: "12.5px",
              fontWeight: 700,
              textDecoration: "none",
              color: "#082f22",
              background: "#68d391",
            }}
          >
            <span>Buka Dashboard</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}

