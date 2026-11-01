"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface DeviceItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  shortDesc: string;
  image: string;
  fullDesc: string;
  specs: { label: string; value: string }[];
  fieldRole: string;
  benefits: string[];
}

interface DeviceGalleryWithModalProps {
  devices: DeviceItem[];
}

export default function DeviceGalleryWithModal({
  devices,
}: DeviceGalleryWithModalProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDevice(null);
      }
    };

    if (selectedDevice) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDevice]);

  // Navigate between devices inside modal
  const currentIndex = selectedDevice
    ? devices.findIndex((d) => d.id === selectedDevice.id)
    : -1;

  const handlePrevDevice = () => {
    if (currentIndex > 0) {
      setSelectedDevice(devices[currentIndex - 1]);
    }
  };

  const handleNextDevice = () => {
    if (currentIndex < devices.length - 1) {
      setSelectedDevice(devices[currentIndex + 1]);
    }
  };

  return (
    <div className="device-gallery-container">
      {/* Device Gallery Cards */}
      <div className="device-gallery">
        {devices.map((device) => (
          <article
            key={device.id}
            className="device device-card-interactive"
            onClick={() => setSelectedDevice(device)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedDevice(device);
              }
            }}
            aria-label={`Lihat penjelasan detail ${device.name}`}
          >
            <div className="device-img-wrap">
              <span className="device-badge">{device.tag}</span>
              <Image
                src={device.image}
                alt={device.name}
                width={320}
                height={160}
                className="device-thumbnail"
              />
            </div>
            <div className="device-info">
              <span className="device-category">{device.category}</span>
              <h3>{device.name}</h3>
              <p>{device.shortDesc}</p>
              <button
                type="button"
                className="device-learn-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDevice(device);
                }}
              >
                Pelajari lebih lanjut <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Detail Modal Pop-up */}
      {selectedDevice && (
        <div
          className="device-modal-backdrop"
          onClick={() => setSelectedDevice(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-device-title"
        >
          <div
            className="device-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="device-modal-header">
              <div className="device-modal-title-group">
                <span className="device-modal-badge">
                  {selectedDevice.category} · {selectedDevice.tag}
                </span>
                <h2 id="modal-device-title">{selectedDevice.name}</h2>
              </div>
              <button
                type="button"
                className="device-modal-close"
                onClick={() => setSelectedDevice(null)}
                aria-label="Tutup jendela penjelasan alat"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="device-modal-body">
              {/* Left Column: Image & Highlights */}
              <div className="device-modal-media-col">
                <div className="device-modal-img-container">
                  <Image
                    src={selectedDevice.image}
                    alt={selectedDevice.name}
                    width={400}
                    height={240}
                    className="device-modal-hero-img"
                    priority
                  />
                </div>

                <div className="device-modal-role-card">
                  <span className="role-card-label">Peran di Lapangan:</span>
                  <p>{selectedDevice.fieldRole}</p>
                </div>
              </div>

              {/* Right Column: Explanations, Specs & Benefits */}
              <div className="device-modal-text-col">
                <div className="device-modal-section">
                  <h3>Penjelasan Lengkap</h3>
                  <p className="device-modal-desc">{selectedDevice.fullDesc}</p>
                </div>

                <div className="device-modal-section">
                  <h3>Spesifikasi Teknis</h3>
                  <div className="device-specs-grid">
                    {selectedDevice.specs.map((spec) => (
                      <div key={spec.label} className="spec-item">
                        <span className="spec-label">{spec.label}</span>
                        <strong className="spec-value">{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="device-modal-section">
                  <h3>Keunggulan &amp; Nilai Desain</h3>
                  <ul className="device-benefits-list">
                    {selectedDevice.benefits.map((b, idx) => (
                      <li key={idx}>
                        <span className="check-icon">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="device-modal-footer">
              <div className="modal-nav-group">
                <button
                  type="button"
                  className="modal-nav-btn"
                  onClick={handlePrevDevice}
                  disabled={currentIndex <= 0}
                  aria-label="Lihat alat sebelumnya"
                >
                  ← Alat Sebelumnya
                </button>
                <span className="modal-nav-counter">
                  {currentIndex + 1} dari {devices.length}
                </span>
                <button
                  type="button"
                  className="modal-nav-btn"
                  onClick={handleNextDevice}
                  disabled={currentIndex >= devices.length - 1}
                  aria-label="Lihat alat selanjutnya"
                >
                  Alat Selanjutnya →
                </button>
              </div>

              <button
                type="button"
                className="modal-close-action-btn"
                onClick={() => setSelectedDevice(null)}
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
