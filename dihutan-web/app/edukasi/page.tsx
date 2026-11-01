"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Search } from "lucide-react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { educationCategoriesData, educationArticlesData } from "@/lib/dashboard-data";

export default function EdukasiPublikPage() {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = educationCategoriesData;
  const allArticles = Object.values(educationArticlesData);

  const filteredArticles = allArticles.filter((art) => {
    const matchesCat = selectedCat === "ALL" || art.categoryCode === selectedCat;
    const matchesQuery =
      searchQuery.trim() === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8f5", color: "#17251e" }}>
      <PublicNav />

      {/* Hero Section */}
      <section style={{ background: "#0b3b2b", color: "#ffffff", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#68d391", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            PERPUSTAKAAN DIGITAL FLORA, FAUNA &amp; GAMBUT
          </span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "10px 0 16px" }}>
            Ensiklopedia Rimba Kalimantan
          </h1>
          <p style={{ fontSize: "16px", color: "#d1ead7", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Koleksi bacaan ilmiah editorial mengenai keanekaragaman hayati, fungsi hidrologi kubah gambut, ekosistem Sungai Kapuas, dan konservasi alam. Tanpa gamifikasi atau elemen kuis.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        {/* Search & Filter Bar */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e8e2",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
          }}
        >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#f8faf8",
              border: "1px solid #dce3dc",
              borderRadius: "10px",
              padding: "8px 14px",
              flexGrow: 1,
              maxWidth: "400px",
            }}
          >
            <Search size={16} color="#6f8774" />
            <input
              type="text"
              placeholder="Cari artikel flora, fauna, atau gambut..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "13px",
                color: "#0f2417",
                width: "100%",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Categories Pill Selector */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedCat("ALL")}
              style={{
                padding: "7px 14px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                background: selectedCat === "ALL" ? "#0b3b2b" : "#ffffff",
                color: selectedCat === "ALL" ? "#ffffff" : "#43564b",
                border: `1px solid ${selectedCat === "ALL" ? "#0b3b2b" : "#dce3dc"}`,
                transition: "all 0.18s ease",
              }}
            >
              Semua Kategori
            </button>
            {categories.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCat(c.code)}
                style={{
                  padding: "7px 14px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: selectedCat === c.code ? "#0b3b2b" : "#ffffff",
                  color: selectedCat === c.code ? "#ffffff" : "#43564b",
                  border: `1px solid ${selectedCat === c.code ? "#0b3b2b" : "#dce3dc"}`,
                  transition: "all 0.18s ease",
                }}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/edukasi/${art.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "#ffffff",
                  border: "1px solid #e1e8e2",
                  borderRadius: "18px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
                  transition: "transform 0.18s ease, border-color 0.18s ease",
                }}
              >
                <div style={{ height: "180px", position: "relative", background: "#0a2618" }}>
                  <Image
                    src={art.heroImage || "/hutan.jpg"}
                    alt={art.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10.5px", fontWeight: 700, color: "#0a7544" }}>
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>{art.categoryTitle}</span>
                    <span style={{ color: "#7a947c" }}>{art.readingTimeMinutes} Menit Baca</span>
                  </div>

                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f2417", margin: 0, lineHeight: 1.35 }}>
                    {art.title}
                  </h3>

                  <p style={{ fontSize: "12.5px", color: "#526857", lineHeight: 1.55, margin: 0, flexGrow: 1 }}>
                    {art.subtitle}
                  </p>

                  <div style={{ borderTop: "1px solid #f0f3f0", paddingTop: "12px", marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#6f8774" }}>Oleh: {art.author}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#0a7544", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      Baca <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", padding: "64px 20px", textAlign: "center", background: "#ffffff", borderRadius: "18px", border: "1px solid #e1e8e2" }}>
              <BookOpen size={36} color="#6f8774" style={{ margin: "0 auto 12px" }} />
              <strong style={{ fontSize: "16px", color: "#0f2417", display: "block", marginBottom: "4px" }}>
                Tidak Ada Artikel yang Cocok
              </strong>
              <p style={{ fontSize: "13px", color: "#6f8774", margin: 0 }}>
                Coba gunakan kata kunci lain atau pilih &apos;Semua Kategori&apos;.
              </p>
            </div>
          )}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

