import type { Metadata } from "next";
import RegisterView from "@/components/RegisterView";

export const metadata: Metadata = {
  title: "Daftar Penjaga Rimba — DiHutan",
  description:
    "Bergabunglah sebagai Penjaga Rimba DiHutan. Daftarkan diri Anda untuk mengakses peta pemantauan, peringatan dini karhutla, dan sistem IoT tiga pos penjagaan hutan Kalimantan Barat.",
};

export default function DaftarPage() {
  return <RegisterView />;
}

