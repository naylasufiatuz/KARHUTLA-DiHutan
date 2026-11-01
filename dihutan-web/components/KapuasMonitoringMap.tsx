"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Map as MapLibreMap,
  NavigationControl,
  ScaleControl,
  Marker,
  Popup,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  MonitoringLocation,
  LocationStatus,
  monitoringLocationsData,
} from "@/lib/dashboard-data";

interface KapuasMonitoringMapProps {
  locations?: MonitoringLocation[];
  onSelectLocation?: (location: MonitoringLocation) => void;
  selectedLocationId?: string | null;
  customTileUrl?: string;
}

const DEFAULT_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

// Koordinat Kawasan Sungai Kapuas & Kalimantan Barat
// Pusat di sekitar Pontianak & aliran hilir Sungai Kapuas
const INITIAL_CENTER: [number, number] = [109.3425, -0.0389];
const INITIAL_ZOOM = 8.2;

export default function KapuasMonitoringMap({
  locations = monitoringLocationsData,
  onSelectLocation,
  selectedLocationId,
  customTileUrl = DEFAULT_TILE_URL,
}: KapuasMonitoringMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [activeFilter, setActiveFilter] = useState<"all" | LocationStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapError, setMapError] = useState<string | null>(null);
  const [tileSourceUrl, setTileSourceUrl] = useState(customTileUrl);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filter locations based on status and search query
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchStatus = activeFilter === "all" || loc.status === activeFilter;
      const matchSearch =
        searchQuery.trim() === "" ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.regency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.deviceCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [locations, activeFilter, searchQuery]);

  // Status Color Helper
  const getStatusColor = (status: LocationStatus): { bg: string; text: string; label: string } => {
    switch (status) {
      case "normal":
        return { bg: "#27ae60", text: "#e8f8f0", label: "Normal" };
      case "perhatian":
        return { bg: "#f39c12", text: "#fef9e7", label: "Perlu Perhatian" };
      case "peringatan":
        return { bg: "#e74c3c", text: "#fdeeed", label: "Peringatan Bahaya" };
      case "tidak_ada_data":
      default:
        return { bg: "#7f8c8d", text: "#f2f4f4", label: "Tidak Ada Data" };
    }
  };

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      const mapStyle: StyleSpecification = {
        version: 8,
        sources: {
          "osm-raster-tiles": {
            type: "raster",
            tiles: [tileSourceUrl],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm-raster-layer",
            type: "raster",
            source: "osm-raster-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      };

      const map = new MapLibreMap({
        container: mapContainerRef.current,
        style: mapStyle,
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        maxZoom: 18,
        minZoom: 5,
      });

      // Controls
      map.addControl(new NavigationControl({ showCompass: true }), "top-right");
      map.addControl(new ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");

      map.on("load", () => {
        setMapLoaded(true);
        setMapError(null);
      });

      map.on("error", (e) => {
        // Only trigger critical error if tiles failed completely
        if (e.error && e.error.message && !e.error.message.includes("404")) {
          setMapError("Gagal memuat peta dasar. Periksa koneksi internet atau ganti Tile URL.");
        }
      });

      mapInstanceRef.current = map;

      return () => {
        map.remove();
        mapInstanceRef.current = null;
      };
    } catch {
      // Inisialisasi error handled gracefully
    }
  }, [tileSourceUrl]);

  // Update Markers when filteredLocations change or map loads
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredLocations.forEach((loc) => {
      const colors = getStatusColor(loc.status);
      const isSelected = loc.id === selectedLocationId;

      // Create Custom DOM Element for Marker
      const el = document.createElement("div");
      el.className = `map-custom-marker marker-${loc.status} ${
        isSelected ? "is-selected-marker" : ""
      }`;
      el.style.width = isSelected ? "38px" : "32px";
      el.style.height = isSelected ? "38px" : "32px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = colors.bg;
      el.style.border = isSelected ? "3px solid #ffffff" : "2.5px solid #ffffff";
      el.style.boxShadow = isSelected
        ? `0 0 0 4px #173F2B, 0 8px 20px rgba(0,0,0,0.4)`
        : `0 4px 12px rgba(0,0,0,0.35), 0 0 16px ${colors.bg}88`;
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.color = "#ffffff";
      el.style.fontSize = isSelected ? "16px" : "14px";
      el.style.fontWeight = "bold";
      el.style.transition = "all 0.25s ease";
      el.setAttribute("aria-label", `${loc.name} - ${colors.label}`);

      // Icon inside marker
      el.innerHTML =
        loc.status === "peringatan"
          ? "⚠️"
          : loc.status === "perhatian"
          ? "⚡"
          : loc.status === "normal"
          ? "🌲"
          : "•";

      // Popup content
      const popupHtml = `
        <div class="map-popup-card" style="font-family: 'Inter', sans-serif; min-width: 240px; padding: 4px; color: #1e293b;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
            <strong style="font-size: 13.5px; color: #0f172a; line-height: 1.3;">${loc.name}</strong>
            <span style="display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; background: ${colors.bg}; color: #ffffff;">
              ${colors.label}
            </span>
          </div>

          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            📍 ${loc.subDistrict}, ${loc.regency}<br/>
            📟 ID: <strong>${loc.deviceCode}</strong>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; margin-bottom: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px;">
            <div>🌡️ Suhu: <strong>${loc.temperature}°C</strong></div>
            <div>💧 RH: <strong>${loc.humidity}%</strong></div>
            <div>🌱 Gambut: <strong style="color: ${loc.soilMoisture < 30 ? '#e74c3c' : '#0f172a'}">${loc.soilMoisture}%</strong></div>
            <div>💨 Gas: <strong>${loc.gasPpm} ppm</strong></div>
          </div>

          <p style="font-size: 11px; line-height: 1.4; color: #334155; margin: 0 0 8px;">
            ${loc.environmentalCondition}
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 6px; font-size: 9.5px; color: #94a3b8;">
            <span>🕒 ${loc.lastUpdated}</span>
            <span style="background: #f1f5f9; padding: 1px 6px; border-radius: 4px; font-weight: 600; color: #64748b;">
              ${loc.isDemo ? "DEMO DAS KAPUAS" : "AKTUAL"}
            </span>
          </div>
        </div>
      `;

      const popup = new Popup({ offset: 25, maxWidth: "320px" }).setHTML(popupHtml);

      const marker = new Marker({ element: el })
        .setLngLat(loc.coordinates)
        .setPopup(popup)
        .addTo(map);

      el.addEventListener("click", () => {
        if (onSelectLocation) onSelectLocation(loc);
      });

      markersRef.current.push(marker);
    });
  }, [filteredLocations, mapLoaded, onSelectLocation, selectedLocationId]);

  // Focus location if selectedLocationId changes
  useEffect(() => {
    if (!selectedLocationId || !mapInstanceRef.current) return;
    const target = locations.find((l) => l.id === selectedLocationId);
    if (target) {
      mapInstanceRef.current.flyTo({
        center: target.coordinates,
        zoom: 11,
        essential: true,
        duration: 1200,
      });
    }
  }, [selectedLocationId, locations]);

  // Quick navigation preset buttons
  const flyToRegion = (coords: [number, number], zoom = 9) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo({
      center: coords,
      zoom,
      essential: true,
      duration: 1000,
    });
  };

  return (
    <div className="kapuas-map-wrapper">
      {/* Top Filter and Search Bar */}
      <div className="map-toolbar">
        <div className="map-search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="map-search-input"
            placeholder="Cari lokasi DAS Kapuas, pos, atau ID alat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="map-clear-search" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="map-filter-group">
          <button
            className={`map-filter-btn ${activeFilter === "all" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Semua ({locations.length})
          </button>
          <button
            className={`map-filter-btn filter-normal ${activeFilter === "normal" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("normal")}
          >
            <span className="dot dot-normal"></span> Normal
          </button>
          <button
            className={`map-filter-btn filter-perhatian ${activeFilter === "perhatian" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("perhatian")}
          >
            <span className="dot dot-perhatian"></span> Perlu Perhatian
          </button>
          <button
            className={`map-filter-btn filter-peringatan ${activeFilter === "peringatan" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("peringatan")}
          >
            <span className="dot dot-peringatan"></span> Peringatan
          </button>
        </div>

        {/* Tile Configuration Button */}
        <button
          className="map-config-btn"
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          title="Konfigurasi Tile Peta"
        >
          ⚙️ Tile URL
        </button>
      </div>

      {/* Tile Config Drawer / Overlay */}
      {isConfigOpen && (
        <div className="tile-config-box">
          <div className="tile-config-header">
            <strong>Konfigurasi Sumber Tile Peta (OpenStreetMap)</strong>
            <button onClick={() => setIsConfigOpen(false)}>✕</button>
          </div>
          <p className="tile-config-desc">
            Sistem menggunakan MapLibre GL JS dengan OpenStreetMap tiles. Anda dapat mengganti URL tile jika memiliki
            penyedia ubin mandiri / MapTiler / Stadia.
          </p>
          <div className="tile-config-input-group">
            <input
              type="text"
              value={tileSourceUrl}
              onChange={(e) => setTileSourceUrl(e.target.value)}
              className="tile-url-input"
            />
            <button
              onClick={() => setTileSourceUrl(DEFAULT_TILE_URL)}
              className="tile-reset-btn"
            >
              Reset OSM Standar
            </button>
          </div>
        </div>
      )}

      {/* Main Map Container */}
      <div className="map-canvas-container" ref={mapContainerRef}>
        {/* Error Fallback */}
        {mapError && (
          <div className="map-error-overlay">
            <div className="map-error-card">
              <span className="error-icon">⚠️</span>
              <h4>Koneksi Tile Peta Terganggu</h4>
              <p>{mapError}</p>
              <button
                onClick={() => {
                  setMapError(null);
                  setTileSourceUrl(DEFAULT_TILE_URL);
                }}
                className="error-retry-btn"
              >
                Coba Muat Ulang Peta
              </button>
            </div>
          </div>
        )}

        {/* Quick Location Nav Jump Pills (Overlay di atas peta) */}
        <div className="map-quick-jump">
          <span className="quick-jump-label">Jelajah Aliran Kapuas:</span>
          <button onClick={() => flyToRegion([109.3425, -0.0389], 9.5)}>
            🌊 Hilir Pontianak
          </button>
          <button onClick={() => flyToRegion([109.3982, -0.2315], 11)}>
            🌱 Gambut Rasau Jaya
          </button>
          <button onClick={() => flyToRegion([110.1124, -0.1583], 9.5)}>
            🛶 Tengah (Tayan/Sanggau)
          </button>
          <button onClick={() => flyToRegion([111.4981, 0.0769], 10)}>
            ⚠️ Sintang &amp; Melawi
          </button>
          <button onClick={() => flyToRegion([112.1645, 0.8542], 9)}>
            🏞️ Hulu (Danau Sentarum)
          </button>
        </div>

        {/* Marker Color Legend */}
        <div className="map-legend-box">
          <div className="legend-title">LEGENDA STATUS TITIK</div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: "#27ae60" }}></span>
            <span>Normal (Gambut &gt;60%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: "#f39c12" }}></span>
            <span>Perhatian (30%–60%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: "#e74c3c" }}></span>
            <span>Peringatan Bahaya (&lt;30%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: "#7f8c8d" }}></span>
            <span>Tidak Ada Data / Offline</span>
          </div>
          <div className="legend-note">
            Titik bertanda <strong>[DEMO]</strong> adalah simulasi telemetri DAS Kapuas Kalimantan Barat.
          </div>
        </div>
      </div>
    </div>
  );
}
