"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Cpu,
  BookOpen,
  FileText,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Leaf,
  Menu,
} from "lucide-react";
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context";
import { UserRole } from "@/lib/dashboard-data";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, setRole, userProfile, logout } = useDashboard();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Derive dynamic user initials
  const userName = userProfile?.name || "";
  const nameParts = userName.trim().split(/\s+/).filter(Boolean);
  const userInitials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : userName.slice(0, 2).toUpperCase() || "DH";

  // Exact 6 main navigation items per design.md and alur-web.md
  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} strokeWidth={2} />,
    },
    {
      label: "Monitoring",
      href: "/dashboard/monitoring",
      icon: <Activity size={18} strokeWidth={2} />,
    },
    {
      label: "Perangkat IoT",
      href: "/dashboard/perangkat-iot",
      icon: <Cpu size={18} strokeWidth={2} />,
    },
    {
      label: "Edukasi Hutan",
      href: "/dashboard/edukasi",
      icon: <BookOpen size={18} strokeWidth={2} />,
    },
    {
      label: "Laporan",
      href: "/dashboard/laporan",
      icon: <FileText size={18} strokeWidth={2} />,
    },
    {
      label: "Pengaturan",
      href: "/dashboard/pengaturan",
      icon: <Settings size={18} strokeWidth={2} />,
    },
  ];

  // Dynamic breadcrumb label
  const getBreadcrumb = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname.startsWith("/dashboard/monitoring")) return "Monitoring";
    if (pathname.startsWith("/dashboard/perangkat-iot")) return "Perangkat IoT";
    if (pathname.startsWith("/dashboard/edukasi")) return "Edukasi Hutan";
    if (pathname.startsWith("/dashboard/laporan")) return "Laporan";
    if (pathname.startsWith("/dashboard/pengaturan")) return "Pengaturan";
    return "Overview";
  };

  return (
    <div className="dashboard-root">
      {/* Mobile Backdrop overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. FIXED DEEP EMERALD SIDEBAR */}
      <aside
        className={`dashboard-sidebar ${isCollapsed ? "is-collapsed" : ""} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* Brand Header */}
        <Link
          href="/dashboard"
          className="sidebar-brand-wrap"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="sidebar-logo-icon">
            <Leaf size={22} color="#092e1d" strokeWidth={2.2} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-name">DiHutan</span>
              <span className="sidebar-brand-sub">INTELIJEN HUTAN</span>
            </div>
          )}
        </Link>

        {/* Navigation Items (Exact 6 core menus) */}
        <div className="sidebar-nav-container" role="navigation" aria-label="Ruang Kerja">
          {!isCollapsed && <div className="sidebar-section-title">RUANG KERJA</div>}

          {navItems.map((item, idx) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={idx}
                href={item.href}
                className={`sidebar-nav-link ${isActive ? "is-active" : ""}`}
                title={isCollapsed ? item.label : undefined}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Bottom Sidebar Area */}
        <div className="sidebar-bottom-area">
          {/* Status Box */}
          {!isCollapsed && (
            <div className="sidebar-status-box">
              <div className="status-dot-pulse" />
              <div className="status-box-texts">
                <span className="status-box-title">Sistem terhubung</span>
                <span className="status-box-sub">Sinkron 2 menit lalu</span>
              </div>
            </div>
          )}

          {/* User Row */}
          <div className="sidebar-user-row">
            <div className="sidebar-user-avatar">{userInitials}</div>
            {!isCollapsed && (
              <>
                <div className="sidebar-user-info">
                  <span className="sidebar-user-name" title={userProfile.name}>
                    {userProfile.name}
                  </span>
                  <span className="sidebar-user-role">{role}</span>
                </div>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="sidebar-logout-btn"
                  title="Keluar dari Akun (Logout)"
                  aria-label="Keluar dari Akun"
                >
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>

          {/* Collapse/Expand Toggle Button */}
          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <>
                <ChevronLeft size={16} />
                <span>Ciutkan sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE AREA */}
      <div className={`dashboard-main-wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        {/* Top Navbar */}
        <header className="dashboard-topbar">
          {/* Breadcrumb Left with Mobile Toggle */}
          <div className="topbar-left-group">
            <button
              type="button"
              className="topbar-mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Buka menu navigasi"
            >
              <Menu size={18} />
            </button>
            <div className="topbar-breadcrumb">
              <Link href="/dashboard">Dashboard</Link>
              <span className="topbar-breadcrumb-sep">&gt;</span>
              <span className="topbar-breadcrumb-current">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Actions Right */}
          <div className="topbar-actions">
            {/* Search Input with ⌘ K */}
            <div className="topbar-search-box">
              <Search size={14} strokeWidth={2.2} />
              <input
                type="text"
                placeholder="Cari informasi..."
                className="topbar-search-input"
              />
              <span className="topbar-search-shortcut">⌘ K</span>
            </div>

            {/* System Status Pill Badge */}
            <div className="topbar-status-pill">
              <span className="pill-dot" />
              <span>Semua sistem normal</span>
            </div>

            {/* Notification Bell Button */}
            <button
              type="button"
              className="topbar-icon-btn"
              title="Notifikasi Sistem"
              onClick={() => alert("Semua sensor dan sistem terhubung dalam batas aman.")}
            >
              <Bell size={16} />
            </button>

            {/* User Dropdown Pill */}
            <div
              className="topbar-user-pill"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="topbar-avatar">{userInitials}</div>
              <div className="topbar-user-text">
                <span className="topbar-user-name">{userProfile.name}</span>
                <span className="topbar-user-role">{role}</span>
              </div>
              <ChevronDown size={14} color="#637867" />

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "44px",
                    right: 0,
                    width: "230px",
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                    border: "1px solid #e1e7e1",
                    padding: "10px",
                    zIndex: 50,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      padding: "4px 8px 10px",
                      borderBottom: "1px solid #f0f3f0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#0f2417",
                      }}
                    >
                      {userProfile.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#6f8774",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userProfile.email}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "8px 8px 4px",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      color: "#6f8774",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Ganti Peran Demonstrasi:
                  </div>
                  {(
                    ["USER", "PIHAK_BERTANGGUNG_JAWAB", "ADMIN"] as UserRole[]
                  ).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "7px 10px",
                        borderRadius: "6px",
                        border: "none",
                        background: role === r ? "#eaf5ee" : "transparent",
                        color: role === r ? "#0a7544" : "#0f2417",
                        fontSize: "11.5px",
                        fontWeight: role === r ? 700 : 500,
                        cursor: "pointer",
                      }}
                    >
                      {r === "USER"
                        ? "USER (Warga)"
                        : r === "PIHAK_BERTANGGUNG_JAWAB"
                        ? "PETUGAS (BKSDA)"
                        : "ADMIN (Sistem)"}
                    </button>
                  ))}

                  <div
                    style={{
                      borderTop: "1px solid #f0f3f0",
                      marginTop: "6px",
                      paddingTop: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Link
                      href="/dashboard/pengaturan"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 10px",
                        color: "#274d32",
                        fontSize: "11.5px",
                        textDecoration: "none",
                        fontWeight: 600,
                        borderRadius: "6px",
                      }}
                    >
                      <Settings size={13} /> Pengaturan Akun
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 10px",
                        color: "#ef4444",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        background: "transparent",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <LogOut size={13} /> Keluar dari Akun (Logout)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="dashboard-content-body">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardProvider>
  );
}
