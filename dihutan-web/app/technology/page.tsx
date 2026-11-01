import type { Metadata } from "next";
import TechnologyView from "@/components/TechnologyView";

export const metadata: Metadata = {
  title: "Teknologi DiHutan — Tiga Pos Penjagaan Rimba",
  description:
    "Jelajahi ekosistem teknologi DiHutan: IoT Monitoring lapangan, analisis AI Forest Guardian, dan sistem pembasahan otomatis AutoSpray.",
};

export default function TechnologyPage() {
  return <TechnologyView />;
}
