"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ShieldCheck, User } from "lucide-react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { educationArticlesData, EducationArticle } from "@/lib/dashboard-data";

export default function PublicArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article: EducationArticle | undefined = educationArticlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F5F7F2", color: "#17251D" }}>
      <PublicNav />

      {/* Article Container */}
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px 64px", width: "100%" }}>
        {/* Back link */}
        <Link
          href="/edukasi"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12.5px",
            color: "#173F2B",
            textDecoration: "none",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={14} /> Kembali ke Ensiklopedia
        </Link>

        {/* Category & Reading Time */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 800,
              color: "#173F2B",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "#EAF5EE",
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #BFE2CB",
            }}
          >
            BAB {article.categoryCode} · {article.categoryTitle}
          </span>
          <span style={{ fontSize: "12px", color: "#647268", display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <Clock size={13} /> {article.readingTimeMinutes} Menit Baca
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#17251D", lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          {article.title}
        </h1>

        {article.scientificName && (
          <p style={{ fontSize: "14px", fontStyle: "italic", color: "#647268", margin: "-8px 0 16px" }}>
            Nama Ilmiah / Taksonomi: <strong style={{ color: "#17251D" }}>{article.scientificName}</strong>
          </p>
        )}

        {/* Subtitle / Lead */}
        <p style={{ fontSize: "16px", color: "#36453B", lineHeight: 1.65, margin: "0 0 24px", borderLeft: "3px solid #173F2B", paddingLeft: "16px" }}>
          {article.subtitle}
        </p>

        {/* Metadata Bar */}
        <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#647268", borderTop: "1px solid #DFE6DC", borderBottom: "1px solid #DFE6DC", padding: "12px 0", marginBottom: "28px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <User size={13} /> Penulis: <strong style={{ color: "#17251D" }}>{article.author}</strong>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <ShieldCheck size={13} /> Tinjauan: <strong style={{ color: "#17251D" }}>{article.reviewer}</strong>
          </span>
        </div>

        {/* Cover Photo */}
        <div style={{ height: "360px", position: "relative", borderRadius: "18px", overflow: "hidden", marginBottom: "32px", border: "1px solid #DFE6DC" }}>
          <Image
            src={article.heroImage || "/hutan.jpg"}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Highlight Callout */}
        {article.faktaMenarik && (
          <div style={{ background: "#EAF5EE", border: "1px solid #BFE2CB", borderRadius: "14px", padding: "20px 24px", marginBottom: "32px" }}>
            <strong style={{ fontSize: "12px", color: "#173F2B", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
              Fakta Menarik &amp; Signifikansi Ekologi
            </strong>
            <p style={{ fontSize: "13.5px", color: "#166534", lineHeight: 1.6, margin: 0 }}>
              {article.faktaMenarik}
            </p>
          </div>
        )}

        {/* Article Sections Content */}
        <article style={{ display: "flex", flexDirection: "column", gap: "28px", fontSize: "15px", color: "#29382F", lineHeight: 1.75 }}>
          {article.sections.map((sec, idx) => (
            <section key={idx} style={{ background: "#FFFFFF", border: "1px solid #DFE6DC", borderRadius: "16px", padding: "28px 32px" }}>
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#17251D", margin: "0 0 14px", letterSpacing: "-0.01em" }}>
                {sec.title}
              </h2>
              <div style={{ whiteSpace: "pre-line" }}>
                {sec.content}
              </div>
            </section>
          ))}
        </article>

        {/* Status Konservasi */}
        {article.statusKonservasi && (
          <div style={{ marginTop: "32px", background: "#FEF8EC", border: "1px solid #FDE68A", borderRadius: "14px", padding: "18px 24px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#92400E", textTransform: "uppercase" }}>
              STATUS KONSERVASI &amp; PERLINDUNGAN
            </span>
            <p style={{ fontSize: "13.5px", color: "#78350F", fontWeight: 700, margin: "4px 0 0" }}>
              {article.statusKonservasi}
            </p>
          </div>
        )}

        {/* References / Bibliography */}
        {article.referensiSumber && article.referensiSumber.length > 0 && (
          <div style={{ marginTop: "36px", borderTop: "1px solid #DFE6DC", paddingTop: "24px" }}>
            <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#17251D", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
              Sumber Rujukan &amp; Riset Terkait
            </h4>
            <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "12px", color: "#647268", display: "flex", flexDirection: "column", gap: "6px" }}>
              {article.referensiSumber.map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
