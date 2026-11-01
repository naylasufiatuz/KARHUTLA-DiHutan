import Link from "next/link";

interface TechFooterProps {
  backLink?: {
    href: string;
    label: string;
  };
}

export default function TechFooter({
  backLink = { href: "/", label: "Kembali ke beranda ↗" },
}: TechFooterProps) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© DiHutan · Menjaga hutan, memahami perubahan.</span>
        <Link href={backLink.href}>{backLink.label}</Link>
      </div>
    </footer>
  );
}

