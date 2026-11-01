"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, ShieldCheck, User } from "lucide-react";
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

  const allArticles = Object.values(educationArticlesData);
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8f5", color: "#17251e" }}>
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
            color: "#0a7544",
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
              fontSize: "10px",
              fontWeight: 800,
              color: "#0a7544",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "#eaf5ee",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            BAB {article.categoryCode} · {article.categoryTitle}
          </span>
          <span style={{ fontSize: "12px", color: "#75847a", display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <Clock size={13} /> {article.readingTimeMinutes} Menit Baca
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#0f2417", lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          {article.title}
        </h1>

        {article.scientificName && (
          <p style={{ fontSize: "14px", fontStyle: "italic", color: "#526857", margin: "-8px 0 16px" }}>
            Nama Ilmiah / Taksonomi: <strong>{article.scientificName}</strong>
          </p>
        )}

        {/* Subtitle / Lead */}
        <p style={{ fontSize: "16px", color: "#43564b", lineHeight: 1.65, margin: "0 0 24px", borderLeft: "3px solid #0a7544", paddingLeft: "16px" }}>
          {article.subtitle}
        </p>

        {/* Metadata Bar */}
        <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#75847a", borderTop: "1px solid #e1e8e2", borderBottom: "1px solid #e1e8e2", padding: "12px 0", marginBottom: "28px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <User size={13} /> Penulis: <strong>{article.author}</strong>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <ShieldCheck size={13} /> Tinjauan: <strong>{article.reviewer}</strong>
          </span>
        </div>

        {/* Cover Photo */}
        <div style={{ height: "360px", position: "relative", borderRadius: "18px", overflow: "hidden", marginBottom: "32px", border: "1px solid #e1e8e2" }}>
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
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "14px", padding: "20px 24px", marginBottom: "32px" }}>
            <strong style={{ fontSize: "12px", color: "#166534", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
              Fakta Menarik &amp; Signifikansi Ekologi
            </strong>
            <p style={{ fontSize: "13.5px", color: "#14532d", lineHeight: 1.6, margin: 0 }}>
              {article.faktaMenarik}
            </p>
          </div>
        )}

        {/* Article Sections Content */}
        <article style={{ display: "flex", flexDirection: "column", gap: "28px", fontSize: "15px", color: "#2d3748", lineHeight: 1.75 }}>
          {article.sections.map((sec, idx) => (
            <section key={idx} style={{ background: "#ffffff", border: "1px solid #e1e8e2", borderRadius: "16px", padding: "28px 32px" }}>
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#0f2417", margin: "0 0 14px", letterSpacing: "-0.01em" }}>
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
          <div style={{ marginTop: "32px", background: "#fef8f0", border: "1px solid #fed7aa", borderRadius: "14px", padding: "18px 24px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#c2410c", textTransform: "uppercase" }}>
              STATUS KONSERVASI &amp; PERLINDUNGAN
            </span>
            <p style={{ fontSize: "13px", color: "#9a3412", fontWeight: 700, margin: "4px 0 0" }}>
              {article.statusKonservasi}
            </p>
          </div>
        )}

        {/* References / Bibliography */}
        {article.referensiSumber && article.referensiSumber.length > 0 && (
          <div style={{ marginTop: "36px", borderTop: "1px solid #e1e8e2", paddingTop: "24px" }}>
            <strong style={{ fontSize: "12px", color: "#6f8774", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "10px" }}>
              Rujukan Ilmiah &amp; Sumber Data
            </strong>
            <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#526857", lineHeight: 1.6 }}>
              {article.referensiSumber.map((ref, i) => (
                <li key={i} style={{ marginBottom: "4px" }}>{ref}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Prev / Next Article Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginTop: "48px", borderTop: "1px solid #e1e8e2", paddingTop: "24px", flexWrap: "wrap" }}>
          {prevArticle ? (
            <Link
              href={`/edukasi/${prevArticle.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                textDecoration: "none",
                color: "inherit",
                maxWidth: "340px",
              }}
            >
              <span style={{ fontSize: "11px", color: "#6f8774", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <ArrowLeft size={12} /> Artikel Sebelumnya
              </span>
              <strong style={{ fontSize: "13px", color: "#0a7544" }}>{prevArticle.title}</strong>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/edukasi/${nextArticle.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                textAlign: "right",
                textDecoration: "none",
                color: "inherit",
                maxWidth: "340px",
                marginLeft: "auto",
              }}
            >
              <span style={{ fontSize: "11px", color: "#6f8774", display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                Artikel Selanjutnya <ArrowRight size={12} />
              </span>
              <strong style={{ fontSize: "13px", color: "#0a7544" }}>{nextArticle.title}</strong>
            </Link>
          ) : <div />}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
