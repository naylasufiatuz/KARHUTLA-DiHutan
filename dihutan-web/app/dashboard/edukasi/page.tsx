"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  TreePine,
  Bird,
  Droplets,
  Flame,
  Leaf,
  Cpu,
  Users,
  BookOpen,
} from "lucide-react";
import {
  educationCategoriesData,
  educationArticlesData,
} from "@/lib/dashboard-data";
import { useDashboard } from "@/lib/dashboard-context";
import "@/app/encyclopedia.css";

/* ─── Library Shelf Data ─── */
interface LibraryBook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  coverColor: string;
  h: "1" | "2" | "3";
  w: "1" | "2" | "3" | "4";
  comingSoon?: boolean;
}

interface LibraryShelf {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  books: LibraryBook[];
}

const LIBRARY_SHELVES: LibraryShelf[] = [
  {
    id: "ensiklopedia",
    name: "Ensiklopedia Hutan",
    subtitle: "Ekosistem · Gambut · Sungai Kapuas",
    icon: <TreePine size={18} strokeWidth={1.8} />,
    books: [
      {
        id: "b01",
        slug: "ekosistem-hutan-hujan-tropis-kalimantan",
        title: "Penjaga Rimba",
        subtitle: "Ekosistem Hutan Hujan Tropis",
        coverImage: "/hutan.jpg",
        coverColor: "#193C2E",
        h: "1",
        w: "3",
      },
      {
        id: "b02",
        slug: "anatomi-lahan-gambut-penyimpan-karbon-raksasa",
        title: "Lahan Gambut",
        subtitle: "Penyimpan Karbon Raksasa",
        coverImage: "/download-forest.jpg",
        coverColor: "#254E3B",
        h: "2",
        w: "4",
      },
      {
        id: "b03",
        slug: "sungai-kapuas-urat-nadi-rimba-kalimantan-barat",
        title: "Sungai Kapuas",
        subtitle: "Urat Nadi Rimba",
        coverImage: "/download-forest.jpg",
        coverColor: "#102D23",
        h: "1",
        w: "2",
      },
      {
        id: "b04",
        slug: "ekosistem-hutan-hujan-tropis-kalimantan",
        title: "Rahasia Rimba",
        subtitle: "Hutan Hujan Tropis Kalimantan",
        coverImage: "/hutan.jpg",
        coverColor: "#193C2E",
        h: "3",
        w: "3",
        comingSoon: true,
      },
    ],
  },
  {
    id: "flora",
    name: "Flora Nusantara",
    subtitle: "Pohon · Tumbuhan · Botani Kalimantan",
    icon: <Leaf size={18} strokeWidth={1.8} />,
    books: [
      {
        id: "b05",
        slug: "pohon-ulin-besi-rimba-kalimantan",
        title: "Pohon Ulin",
        subtitle: "Besi Rimba Kalimantan",
        coverImage: "/download-forest.jpg",
        coverColor: "#193C2E",
        h: "1",
        w: "4",
      },
      {
        id: "b06",
        slug: "pohon-ulin-besi-rimba-kalimantan",
        title: "Flora Gambut",
        subtitle: "Tumbuhan Lahan Basah",
        coverImage: "/hutan.jpg",
        coverColor: "#254E3B",
        h: "2",
        w: "2",
        comingSoon: true,
      },
      {
        id: "b07",
        slug: "pohon-ulin-besi-rimba-kalimantan",
        title: "Mangrove",
        subtitle: "Penjaga Garis Pantai",
        coverImage: "/download-forest.jpg",
        coverColor: "#78845B",
        h: "3",
        w: "3",
        comingSoon: true,
      },
      {
        id: "b08",
        slug: "pohon-ulin-besi-rimba-kalimantan",
        title: "Kayu Hutan",
        subtitle: "Jenis & Karakteristik",
        coverImage: "/hutan.jpg",
        coverColor: "#102D23",
        h: "1",
        w: "2",
        comingSoon: true,
      },
    ],
  },
  {
    id: "fauna",
    name: "Fauna Nusantara",
    subtitle: "Satwa Liar · Burung · Mamalia Kalimantan",
    icon: <Bird size={18} strokeWidth={1.8} />,
    books: [
      {
        id: "b09",
        slug: "orangutan-kalimantan-penjaga-kanopi",
        title: "Orangutan",
        subtitle: "Penjaga Kanopi Kalimantan",
        coverImage: "/orangutan-clean.webp",
        coverColor: "#74563B",
        h: "1",
        w: "4",
      },
      {
        id: "b10",
        slug: "orangutan-kalimantan-penjaga-kanopi",
        title: "Bekantan",
        subtitle: "Maskot Kalimantan",
        coverImage: "/orangutan.webp",
        coverColor: "#193C2E",
        h: "2",
        w: "3",
        comingSoon: true,
      },
      {
        id: "b11",
        slug: "orangutan-kalimantan-penjaga-kanopi",
        title: "Burung Enggang",
        subtitle: "Simbol Kalimantan",
        coverImage: "/download-forest.jpg",
        coverColor: "#29291F",
        h: "3",
        w: "2",
        comingSoon: true,
      },
      {
        id: "b12",
        slug: "orangutan-kalimantan-penjaga-kanopi",
        title: "Reptil Tropis",
        subtitle: "Keragaman Herpetofauna",
        coverImage: "/hutan.jpg",
        coverColor: "#254E3B",
        h: "1",
        w: "3",
        comingSoon: true,
      },
    ],
  },
  {
    id: "teknologi",
    name: "Teknologi IoT",
    subtitle: "Sensor · Sistem Cerdas · Pemantauan Digital",
    icon: <Cpu size={18} strokeWidth={1.8} />,
    books: [
      {
        id: "b13",
        slug: "teknologi-iot-dan-respons-cerdas-dihutan",
        title: "Teknologi Penjaga",
        subtitle: "IoT & Respons Cerdas DiHutan",
        coverImage: "/assets/technology/ESP32 Development Board Product Cutout.png",
        coverColor: "#102D23",
        h: "1",
        w: "4",
      },
      {
        id: "b14",
        slug: "teknologi-iot-dan-respons-cerdas-dihutan",
        title: "Sensor Hutan",
        subtitle: "DHT11, MQ-series & Probe Tanah",
        coverImage: "/hutan.jpg",
        coverColor: "#193C2E",
        h: "2",
        w: "3",
        comingSoon: true,
      },
      {
        id: "b15",
        slug: "teknologi-iot-dan-respons-cerdas-dihutan",
        title: "Data & Cloud",
        subtitle: "Arsitektur Sistem Realtime",
        coverImage: "/download-forest.jpg",
        coverColor: "#254E3B",
        h: "3",
        w: "2",
        comingSoon: true,
      },
      {
        id: "b16",
        slug: "teknologi-iot-dan-respons-cerdas-dihutan",
        title: "AI & Prediksi",
        subtitle: "Machine Learning untuk Hutan",
        coverImage: "/hutan.jpg",
        coverColor: "#29291F",
        h: "1",
        w: "3",
        comingSoon: true,
      },
    ],
  },
  {
    id: "konservasi",
    name: "Kebakaran & Konservasi",
    subtitle: "Karhutla · Restorasi · Pengelolaan Lahan",
    icon: <Flame size={18} strokeWidth={1.8} />,
    books: [
      {
        id: "b17",
        slug: "dinamika-karhutla-dan-bahaya-api-bawah-tanah",
        title: "Dinamika Karhutla",
        subtitle: "Bahaya Api Bawah Tanah",
        coverImage: "/hutan.jpg",
        coverColor: "#4A1E0E",
        h: "1",
        w: "4",
      },
      {
        id: "b18",
        slug: "restorasi-gambut-dan-peran-masyarakat-peduli-api",
        title: "Restorasi Gambut",
        subtitle: "Peran Masyarakat Peduli Api",
        coverImage: "/download-forest.jpg",
        coverColor: "#193C2E",
        h: "2",
        w: "3",
      },
      {
        id: "b19",
        slug: "dinamika-karhutla-dan-bahaya-api-bawah-tanah",
        title: "Mitigasi Bencana",
        subtitle: "Strategi Pencegahan Kebakaran",
        coverImage: "/hutan.jpg",
        coverColor: "#2E1A0A",
        h: "3",
        w: "2",
        comingSoon: true,
      },
      {
        id: "b20",
        slug: "restorasi-gambut-dan-peran-masyarakat-peduli-api",
        title: "Konservasi Lokal",
        subtitle: "Kearifan Masyarakat Dayak",
        coverImage: "/download-forest.jpg",
        coverColor: "#254E3B",
        h: "1",
        w: "3",
        comingSoon: true,
      },
    ],
  },
];

/* ─── Category icon map (for filter pills) ─── */
const categoryIcons: Record<string, React.ReactNode> = {
  "01": <TreePine size={12} strokeWidth={2} />,
  "02": <Leaf size={12} strokeWidth={2} />,
  "03": <Bird size={12} strokeWidth={2} />,
  "04": <Users size={12} strokeWidth={2} />,
  "05": <Droplets size={12} strokeWidth={2} />,
  "06": <Flame size={12} strokeWidth={2} />,
  "07": <Users size={12} strokeWidth={2} />,
  "08": <Cpu size={12} strokeWidth={2} />,
};

/* ─── Book Component ─── */
function LibBook({ book }: { book: LibraryBook }) {
  const inner = (
    <div
      className={`lib-book${book.comingSoon ? " lib-book-coming-soon" : ""}`}
      data-h={book.h}
      data-w={book.w}
    >
      {/* Top page edge */}
      <div className="lib-book-top" />

      {/* Main cover face */}
      <div
        className="lib-book-cover"
        style={{ background: book.coverColor }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.coverImage} alt={book.title} />
        <div className="lib-book-cover-overlay" />
        <div className="lib-book-cover-text">
          <div className="lib-book-cover-title">{book.title}</div>
          {!book.comingSoon && (
            <div className="lib-book-cover-cat">Baca</div>
          )}
          {book.comingSoon && (
            <div className="lib-book-coming-label">Segera</div>
          )}
        </div>
      </div>

      {/* Spine */}
      <div className="lib-book-spine" />

      {/* Tooltip on hover */}
      {!book.comingSoon && (
        <div className="lib-book-tooltip">
          <div className="lib-tooltip-title">{book.title}</div>
          <div className="lib-tooltip-cat">{book.subtitle}</div>
          <div className="lib-tooltip-desc">Klik untuk membuka dan membaca buku ini</div>
        </div>
      )}
    </div>
  );

  if (book.comingSoon) return inner;

  return (
    <Link href={`/dashboard/edukasi/${book.slug}`} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  );
}

/* ─── Main Page ─── */
export default function DashboardEdukasiPage() {
  const { isBookmarked, toggleBookmark, canManageContent } = useDashboard();
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const allArticles = useMemo(() => Object.values(educationArticlesData), []);
  const featuredArticle =
    educationArticlesData["orangutan-kalimantan-penjaga-kanopi"];

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      const matchCat =
        selectedCat === "ALL" || art.categoryCode === selectedCat;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.categoryTitle.toLowerCase().includes(q) ||
        (art.scientificName && art.scientificName.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allArticles, selectedCat, search]);

  const savedArticles = allArticles.filter((a) => isBookmarked(a.slug));

  const isSearchActive = search.trim().length > 0 || selectedCat !== "ALL";

  return (
    <div className="lib-root" style={{ margin: "-36px" }}>

      {/* ── Admin Banner ── */}
      {canManageContent && (
        <div className="lib-admin-banner">
          <div>
            <strong>Mode Administrator</strong> — Anda dapat mengelola konten perpustakaan.
          </div>
          <button
            className="lib-admin-btn"
            onClick={() =>
              alert(
                "[ADMIN] Fitur manajemen artikel terhubung ke tabel 'education_articles' Supabase."
              )
            }
          >
            + Tambah Buku
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════
          HERO — Library Entrance
      ══════════════════════════════════════ */}
      <section className="lib-hero">
        <div
          className="lib-hero-bg"
          style={{ backgroundImage: "url('/hutan.jpg')" }}
        />
        <div className="lib-hero-overlay" />
        <div className="lib-hero-content">
          <div className="lib-hero-eyebrow">Perpustakaan Digital DiHutan</div>
          <h1 className="lib-hero-title">
            Perpustakaan<br />
            <em>Penjaga Rimba</em>
          </h1>
          <p className="lib-hero-desc">
            Jelajahi koleksi pengetahuan tentang ekosistem hutan Kalimantan —
            dari flora, fauna, hingga teknologi pemantauan IoT yang menjaga
            kelestarian Sungai Kapuas.
          </p>
          <div className="lib-hero-stats">
            <div className="lib-hero-stat">
              <strong>5</strong>
              <span>Rak Koleksi</span>
            </div>
            <div className="lib-hero-stat">
              <strong>20</strong>
              <span>Judul Buku</span>
            </div>
            <div className="lib-hero-stat">
              <strong>9</strong>
              <span>Artikel Aktif</span>
            </div>
            <div className="lib-hero-stat">
              <strong>DAS Kapuas</strong>
              <span>Fokus Ekologis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEARCH BAR (sticky)
      ══════════════════════════════════════ */}
      <div className="lib-search-strip" id="lib-search">
        <div className="lib-search-inner">
          <div className="lib-search-field">
            <Search size={14} strokeWidth={2} color="rgba(198,173,112,0.5)" />
            <input
              type="text"
              placeholder="Cari ulin, gambut, orangutan, IoT, Kapuas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari buku atau artikel"
            />
            {search && (
              <button
                className="lib-search-clear"
                onClick={() => setSearch("")}
                aria-label="Hapus pencarian"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <span className="lib-result-count">
            {isSearchActive ? `${filteredArticles.length} artikel` : `${allArticles.length} artikel`}
          </span>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="lib-filter-pills">
        <button
          className={`lib-filter-pill ${selectedCat === "ALL" ? "active" : ""}`}
          onClick={() => setSelectedCat("ALL")}
        >
          Semua Koleksi
        </button>
        {educationCategoriesData.map((cat) => (
          <button
            key={cat.code}
            className={`lib-filter-pill ${selectedCat === cat.code ? "active" : ""}`}
            onClick={() => setSelectedCat(cat.code)}
          >
            {categoryIcons[cat.code]}
            &nbsp;{cat.title}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════
          SEARCH RESULTS (shown when filtering)
      ══════════════════════════════════════ */}
      {isSearchActive && (
        <section className="lib-catalogue-section">
          <div className="lib-section-header">
            <div>
              <div className="lib-section-label">Hasil Pencarian</div>
              <h2 className="lib-section-title">
                {filteredArticles.length} Artikel Ditemukan
              </h2>
            </div>
            <button
              style={{
                background: "none",
                border: "1px solid rgba(198,173,112,0.3)",
                borderRadius: "99px",
                color: "rgba(198,173,112,0.7)",
                fontSize: "11px",
                fontWeight: 600,
                padding: "6px 14px",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
              onClick={() => { setSearch(""); setSelectedCat("ALL"); }}
            >
              ✕ Reset Filter
            </button>
          </div>
          <div className="lib-catalogue-grid">
            {filteredArticles.length === 0 ? (
              <div className="lib-empty-state">
                <BookOpen size={32} strokeWidth={1} style={{ opacity: 0.3 }} />
                <strong>Tidak ada hasil</strong>
                <p style={{ margin: 0, fontSize: 13 }}>
                  Coba kata kunci berbeda atau pilih kategori lain.
                </p>
              </div>
            ) : (
              filteredArticles.map((art) => {
                const saved = isBookmarked(art.slug);
                return (
                  <div key={art.slug} className="lib-article-card">
                    <div className="lib-article-card-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={art.heroImage} alt={art.title} />
                      <span className="lib-article-cat-tag">
                        Bab {art.categoryCode}
                      </span>
                      <button
                        className={`lib-article-bookmark-btn ${saved ? "is-saved" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(art.slug);
                        }}
                        aria-label={saved ? "Hapus dari pustaka" : "Simpan ke pustaka"}
                      >
                        {saved ? (
                          <BookmarkCheck size={14} strokeWidth={2} />
                        ) : (
                          <Bookmark size={14} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                    <div className="lib-article-body">
                      <div className="lib-article-cat-label">{art.categoryTitle}</div>
                      <h3 className="lib-article-title">{art.title}</h3>
                      {art.scientificName && (
                        <p className="lib-article-sci-name">{art.scientificName}</p>
                      )}
                      <p className="lib-article-excerpt">{art.subtitle}</p>
                      <div className="lib-article-footer">
                        <span className="lib-article-read-time">
                          <BookOpen size={11} />
                          &nbsp;{art.readingTimeMinutes} mnt
                        </span>
                        <Link
                          href={`/dashboard/edukasi/${art.slug}`}
                          className="lib-article-read-link"
                        >
                          Buka Buku
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          FEATURED — Pilihan Pustakawan
      ══════════════════════════════════════ */}
      {!isSearchActive && (
        <section className="lib-featured-section">
          <div>
            <div className="lib-section-label">Pilihan Pustakawan</div>
            <h2 className="lib-section-title">Buku Unggulan Koleksi</h2>
          </div>
          <br />
          <Link
            href={`/dashboard/edukasi/${featuredArticle.slug}`}
            className="lib-featured-card"
          >
            <div className="lib-featured-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredArticle.heroImage} alt={featuredArticle.title} />
              <div className="lib-featured-img-overlay" />
            </div>
            <div className="lib-featured-body">
              <div className="lib-featured-category">
                Bab {featuredArticle.categoryCode} · {featuredArticle.categoryTitle}
              </div>
              <h2 className="lib-featured-title">{featuredArticle.title}</h2>
              <p className="lib-featured-excerpt">{featuredArticle.subtitle}</p>
              <span className="lib-featured-cta">
                <BookOpen size={14} />
                Buka & Baca Sekarang
                <ChevronRight size={14} />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════
          BOOKSHELF — 5 Rak Perpustakaan
      ══════════════════════════════════════ */}
      {!isSearchActive && (
        <section className="lib-shelf-section">
          <div style={{ marginBottom: 32 }}>
            <div className="lib-section-label">Koleksi Perpustakaan</div>
            <h2 className="lib-section-title">Rak Buku Penjaga Rimba</h2>
          </div>

          {LIBRARY_SHELVES.map((shelf) => (
            <div key={shelf.id} className="lib-shelf-unit">
              {/* Shelf header */}
              <div className="lib-shelf-header">
                <div className="lib-shelf-icon">{shelf.icon}</div>
                <div>
                  <h3 className="lib-shelf-name">{shelf.name}</h3>
                  <p className="lib-shelf-subtitle">{shelf.subtitle}</p>
                </div>
              </div>

              {/* Shelf display with books */}
              <div className="lib-shelf-display">
                <div className="lib-book-row">
                  {shelf.books.map((book) => (
                    <LibBook key={book.id} book={book} />
                  ))}
                </div>
              </div>

              {/* Wooden plank */}
              <div className="lib-shelf-plank" />
              <div className="lib-shelf-shadow" />
            </div>
          ))}
        </section>
      )}

      {/* ══════════════════════════════════════
          SAVED ARTICLES — Pustaka Saya
      ══════════════════════════════════════ */}
      <section className="lib-saved-section">
        <div className="lib-section-header">
          <div>
            <div className="lib-section-label">Koleksi Pribadi</div>
            <h2 className="lib-section-title">Pustaka Saya</h2>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: "rgba(198,173,112,0.5)",
              fontWeight: 600,
            }}
          >
            {savedArticles.length} artikel disimpan
          </span>
        </div>

        {savedArticles.length === 0 ? (
          <div className="lib-saved-empty">
            <Bookmark size={24} strokeWidth={1.5} />
            <p>
              Belum ada artikel yang disimpan. Klik ikon{" "}
              <Bookmark size={12} style={{ verticalAlign: "middle" }} /> pada
              artikel untuk menyimpannya ke pustaka.
            </p>
          </div>
        ) : (
          <div className="lib-saved-grid">
            {savedArticles.map((art) => (
              <div
                key={art.slug}
                style={{ display: "flex", alignItems: "center", gap: 0 }}
              >
                <Link
                  href={`/dashboard/edukasi/${art.slug}`}
                  className="lib-saved-item"
                  style={{ flexGrow: 1, textDecoration: "none" }}
                >
                  <div className="lib-saved-item-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art.heroImage} alt={art.title} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="lib-saved-item-cat">{art.categoryTitle}</div>
                    <p className="lib-saved-item-title">{art.title}</p>
                  </div>
                  <button
                    className="lib-saved-remove"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(art.slug);
                    }}
                    aria-label="Hapus dari pustaka"
                  >
                    <X size={14} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
