"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  BookOpen,
  User,
  FlaskConical,
} from "lucide-react";
import {
  educationArticlesData,
  EducationArticle,
} from "@/lib/dashboard-data";
import { useDashboard } from "@/lib/dashboard-context";

/* Helper: parse simple markdown-ish bold **text** → <strong> */
function renderContent(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/* Helper: split content into paragraphs & render */
function renderParagraphs(content: string, isFirst: boolean): React.ReactNode {
  const paras = content.split("\n\n").filter(Boolean);
  return paras.map((para, idx) => (
    <p key={idx} style={idx === 0 && isFirst ? { marginTop: 0 } : undefined}>
      {renderContent(para)}
    </p>
  ));
}

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { isBookmarked, toggleBookmark } = useDashboard();
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  const article: EducationArticle | undefined = educationArticlesData[slug];

  /* Reading progress scroll listener */
  useEffect(() => {
    const handleScroll = () => {
      const totalH =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;
      setScrollProgress(Math.min(100, (window.scrollY / totalH) * 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) notFound();

  const saved = isBookmarked(article.slug);

  const allArticles = Object.values(educationArticlesData);
  const idx = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = idx > 0 ? allArticles[idx - 1] : null;
  const nextArticle = idx < allArticles.length - 1 ? allArticles[idx + 1] : null;

  /* Related: same category, different slug */
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.categoryCode === article.categoryCode && a.slug !== article.slug
    )
    .slice(0, 2);

  return (
    <div
      className="enc-root enc-article-detail"
      style={{ margin: "-36px" }}
    >
      {/* ─── READING PROGRESS BAR ─── */}
      <div
        className="enc-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* ─── STICKY DETAIL TOPBAR ─── */}
      <div className="enc-detail-topbar">
        <div className="enc-detail-topbar-left">
          <Link
            href="/dashboard/edukasi"
            className="enc-detail-back-link"
            aria-label="Kembali ke daftar artikel"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Ensiklopedia
          </Link>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "var(--color-border)",
            }}
          >
            /
          </span>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              color: "var(--color-muted)",
              maxWidth: "260px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {article.title}
          </span>
        </div>

        <div className="enc-detail-topbar-right">
          {/* Reading progress text */}
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "var(--color-muted)",
            }}
          >
            {Math.round(scrollProgress)}% dibaca
          </span>
          <button
            className={`enc-bookmark-btn ${saved ? "is-bookmarked" : ""}`}
            onClick={() => toggleBookmark(article.slug)}
            aria-label={saved ? "Hapus dari pustaka" : "Simpan ke pustaka"}
          >
            {saved ? (
              <>
                <BookmarkCheck size={13} strokeWidth={2} />
                Tersimpan
              </>
            ) : (
              <>
                <Bookmark size={13} strokeWidth={2} />
                Simpan
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── ARTICLE READING AREA ─── */}
      <div className="enc-detail-wrap">

        {/* Breadcrumb */}
        <nav
          className="enc-detail-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/dashboard">Dashboard</Link>
          <span className="sep">/</span>
          <Link href="/dashboard/edukasi">Ensiklopedia</Link>
          <span className="sep">/</span>
          <span>
            Bab {article.categoryCode} · {article.categoryTitle}
          </span>
          <span className="sep">/</span>
          <span
            style={{
              color: "var(--color-text)",
              fontWeight: 600,
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {article.title.split(":")[0]}
          </span>
        </nav>

        {/* ─── ARTICLE HEADER ─── */}
        <header className="enc-detail-header">
          <div className="enc-detail-category-badge">
            <BookOpen size={11} strokeWidth={2} />
            Bab {article.categoryCode} · {article.categoryTitle}
          </div>

          <h1 className="enc-detail-title">{article.title}</h1>

          {article.scientificName && (
            <div className="enc-detail-sci-name">
              {article.scientificName}
            </div>
          )}

          <p className="enc-detail-subtitle">{article.subtitle}</p>

          <div className="enc-detail-meta">
            <span>
              <User size={11} />
              &nbsp;Penulis: <strong>{article.author}</strong>
            </span>
            <span>
              <FlaskConical size={11} />
              &nbsp;Ditinjau: <strong>{article.reviewer}</strong>
            </span>
            <span>
              <Clock size={11} />
              &nbsp;{article.readingTimeMinutes} menit membaca
            </span>
            {article.statusKonservasi && (
              <span className="enc-conservation-badge">
                {article.statusKonservasi}
              </span>
            )}
          </div>
        </header>

        {/* ─── HERO IMAGE ─── */}
        <div className="enc-detail-hero-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.heroImage} alt={article.title} />
        </div>

        {/* ─── TABLE OF CONTENTS ─── */}
        {article.sections.length > 1 && (
          <div className="enc-toc">
            <div className="enc-toc-title">Daftar Isi</div>
            <ol className="enc-toc-list">
              {article.sections.map((sec, i) => (
                <li key={i}>
                  <a href={`#sec-${i}`}>{sec.title}</a>
                </li>
              ))}
              <li>
                <a href="#fakta-menarik">Fakta Menarik</a>
              </li>
              <li>
                <a href="#referensi">Daftar Pustaka</a>
              </li>
            </ol>
          </div>
        )}

        {/* ─── ARTICLE BODY ─── */}
        <article className="enc-article-body" ref={articleRef}>
          {article.sections.map((sec, secIdx) => (
            <section
              key={secIdx}
              id={`sec-${secIdx}`}
              style={{ marginBottom: 0 }}
            >
              <h2 className="enc-section-heading">{sec.title}</h2>
              {renderParagraphs(sec.content, secIdx === 0)}

              {sec.imageUrl && (
                <figure className="enc-section-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sec.imageUrl}
                    alt={sec.imageCaption || sec.title}
                  />
                  {sec.imageCaption && (
                    <figcaption>{sec.imageCaption}</figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          {/* Peat infographic — only for category 04 */}
          {article.categoryCode === "04" && (
            <div className="enc-peat-infographic">
              <h3>
                Infografis: Penampang Vertikal Lapisan Kubah Gambut Tropis
              </h3>
              <p>
                Tiga tingkatan dekomposisi bahan organik dari permukaan hingga
                lapisan lempung kedap air
              </p>
              <div className="enc-peat-layer enc-peat-layer--fibrik">
                <strong>01. Lapisan Fibrik (0 – 50 cm)</strong>
                <p>
                  Gambut kasar dengan serat yang belum terurai. Sangat porous,
                  cepat mengering di kemarau, dan menjadi pemicu kebakaran
                  pertama.
                </p>
              </div>
              <div className="enc-peat-layer enc-peat-layer--hemik">
                <strong>02. Lapisan Hemik (50 – 200 cm)</strong>
                <p>
                  Serat setengah terurai dengan kapasitas retensi air sangat
                  besar — bertindak sebagai spons alami penyimpan cadangan air
                  DAS Kapuas.
                </p>
              </div>
              <div className="enc-peat-layer enc-peat-layer--saprik">
                <strong>03. Lapisan Saprik (&gt; 200 cm)</strong>
                <p>
                  Gambut matang berwarna hitam pekat, bertumpu di atas tanah
                  mineral impermeabel dasar cekungan purba.
                </p>
              </div>
            </div>
          )}

          {/* Fact Box */}
          <div className="enc-fact-box" id="fakta-menarik">
            <div className="enc-fact-box-title">
              <Lightbulb size={14} strokeWidth={2} />
              Fakta Menarik
            </div>
            <p>{article.faktaMenarik}</p>
          </div>

          {/* References */}
          <div className="enc-references" id="referensi">
            <div className="enc-references-title">Daftar Pustaka & Rujukan Ilmiah</div>
            <ol className="enc-references-list">
              {article.referensiSumber.map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ol>
          </div>
        </article>

        {/* ─── RELATED ARTICLES ─── */}
        {relatedArticles.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-earth)",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 1.5,
                  background: "var(--color-earth)",
                }}
              />
              Artikel Terkait
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
              }}
            >
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/dashboard/edukasi/${rel.slug}`}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "16px 18px",
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 4,
                    textDecoration: "none",
                    alignItems: "flex-start",
                    transition: "border-color 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-forest-mid)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-border)";
                  }}
                >
                  <BookOpen
                    size={16}
                    color="var(--color-forest-mid)"
                    strokeWidth={1.8}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "9.5px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-earth)",
                        marginBottom: 4,
                      }}
                    >
                      {rel.categoryTitle}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-editorial)",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--color-deep-forest)",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {rel.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── PREV / NEXT NAVIGATION ─── */}
        <div className="enc-nav-footer">
          {prevArticle ? (
            <Link
              href={`/dashboard/edukasi/${prevArticle.slug}`}
              className="enc-nav-btn"
            >
              <div className="enc-nav-direction">
                <ChevronLeft size={12} />
                Sebelumnya
              </div>
              <p className="enc-nav-label">
                {prevArticle.title.split(":")[0]}
              </p>
            </Link>
          ) : (
            <Link href="/dashboard/edukasi" className="enc-nav-btn">
              <div className="enc-nav-direction">
                <ChevronLeft size={12} />
                Kembali
              </div>
              <p className="enc-nav-label">Katalog Ensiklopedia</p>
            </Link>
          )}

          {nextArticle ? (
            <Link
              href={`/dashboard/edukasi/${nextArticle.slug}`}
              className="enc-nav-btn is-next"
            >
              <div className="enc-nav-direction">
                Berikutnya
                <ChevronRight size={12} />
              </div>
              <p className="enc-nav-label">
                {nextArticle.title.split(":")[0]}
              </p>
            </Link>
          ) : (
            <Link
              href="/dashboard/edukasi"
              className="enc-nav-btn is-next"
            >
              <div className="enc-nav-direction">
                Kembali ke Katalog
                <ChevronRight size={12} />
              </div>
              <p className="enc-nav-label">Semua Artikel</p>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
