import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiHutan — Edisi Renaisans Hutan",
  description:
    "Platform monitoring cerdas berbasis IoT, telemetri muka air gambut, dan sistem peringatan dini untuk menjaga ekosistem hutan Kalimantan Barat bebas dari kebakaran hutan dan lahan.",
  icons: {
    icon: "/dihutan-logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
