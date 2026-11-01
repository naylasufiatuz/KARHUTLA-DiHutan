import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next",
  async rewrites() {
    return [
      {
        source: "/technology.html",
        destination: "/perangkat",
      },
      {
        source: "/technology",
        destination: "/perangkat",
      },
      {
        source: "/login",
        destination: "/masuk",
      },
      {
        source: "/iot-monitoring.html",
        destination: "/iot-monitoring",
      },
      {
        source: "/ai-forest-guardian.html",
        destination: "/ai-forest-guardian",
      },
      {
        source: "/autospray.html",
        destination: "/autospray",
      },
    ];
  },
};

export default nextConfig;
