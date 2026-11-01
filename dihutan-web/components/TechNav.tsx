import Link from "next/link";
import Image from "next/image";

interface TechNavProps {
  activePage?: "technology" | "iot-monitoring" | "ai-forest-guardian" | "autospray";
}

export default function TechNav({ activePage }: TechNavProps) {
  return (
    <header className="tech-nav">
      <Link href="/" className="brand" aria-label="DiHutan, kembali ke beranda">
        <Image
          src="/dihutan-logo-mark.png"
          alt="DiHutan logo"
          width={42}
          height={42}
          priority
        />
        <strong>DiHutan</strong>
      </Link>
      <nav className="nav-links" aria-label="Navigasi teknologi">
        <Link
          href="/technology"
          className={activePage === "technology" ? "active" : ""}
          aria-current={activePage === "technology" ? "page" : undefined}
        >
          Teknologi
        </Link>
        <Link
          href="/iot-monitoring"
          className={activePage === "iot-monitoring" ? "active" : ""}
          aria-current={activePage === "iot-monitoring" ? "page" : undefined}
        >
          IoT Monitoring
        </Link>
        <Link
          href="/ai-forest-guardian"
          className={activePage === "ai-forest-guardian" ? "active" : ""}
          aria-current={activePage === "ai-forest-guardian" ? "page" : undefined}
        >
          AI Guardian
        </Link>
        <Link
          href="/autospray"
          className={activePage === "autospray" ? "active" : ""}
          aria-current={activePage === "autospray" ? "page" : undefined}
        >
          AutoSpray
        </Link>
      </nav>
      <Link className="home-link" href="/">
        BERANDA <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

