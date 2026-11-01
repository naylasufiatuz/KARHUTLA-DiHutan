"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PenjaraRimbaBook from "@/components/PenjaraRimbaBook";
import PosDetailModal from "@/components/PosDetailModal";

export default function LandingView() {
  const [selectedPosModal, setSelectedPosModal] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("h");
  const [showPassword, setShowPassword] = useState(false);
  const [loginNote, setLoginNote] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("Masuk ke DiHutan");

  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rkCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loginDialogRef = useRef<HTMLDialogElement | null>(null);
  const flowerbedRef = useRef<HTMLDivElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // 1. Hero Canvas + Parallax + Foliage Generation
  useEffect(() => {
    let s = 11;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const R = (a: number, b: number) => a + r() * (b - a);
    const leaf = (
      x: number,
      y: number,
      L: number,
      a: number,
      c: string,
      o = 1
    ) => {
      const w = L * 0.2;
      return `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0Q${L * 0.3
        } ${-w} ${L} 0Q${L * 0.3} ${w} 0 0Z" fill="${c}" opacity="${o}"/>`;
    };
    const fern = (
      x: number,
      y: number,
      L: number,
      cols: string[],
      n: number,
      a0 = -170,
      a1 = -10
    ) => {
      let o = "";
      for (let i = 0; i < n; i++)
        o += leaf(x, y, L * R(0.6, 1), R(a0, a1), cols[i % cols.length]);
      return o;
    };

    // Layer 0: Sky glow & light rays
    const b0 = document.getElementById("b0");
    if (b0) {
      let rays = "";
      [180, 420, 700, 980, 1260, 1480].forEach((x, i) => {
        rays += `<polygon points="${x},0 ${x + 70 + i * 8},0 ${x + 330},900 ${x - 150
          },900" fill="url(#ry)"/>`;
      });
      b0.innerHTML = `<defs><radialGradient id="g0" cx=".5" cy=".38" r=".85"><stop offset="0" stop-color="#5fa843"/><stop offset=".4" stop-color="#2c6a36"/><stop offset="1" stop-color="#071a0f"/></radialGradient><linearGradient id="ry" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8ffb0" stop-opacity=".32"/><stop offset="1" stop-color="#e8ffb0" stop-opacity="0"/></linearGradient><filter id="bl4"><feGaussianBlur stdDeviation="4"/></filter><filter id="bl9"><feGaussianBlur stdDeviation="10"/></filter></defs><g filter="url(#bl9)" style="mix-blend-mode:screen">${rays}</g>`;
    }

    // Layer 4: Foreground dark corner foliage
    const b4 = document.getElementById("b4");
    if (b4) {
      let a = "";
      for (let i = 0; i < 16; i++) {
        a += fern(
          R(-60, 1660),
          R(880, 960),
          R(120, 260),
          ["#07180d", "#0f3320", "#1a4a2b"],
          4
        );
      }
      a +=
        fern(-20, 920, 470, ["#050f08", "#0a2112"], 10) +
        fern(1620, 920, 450, ["#050f08", "#0a2112"], 10);
      for (let i = 0; i < 12; i++) {
        a += leaf(R(-60, 520), -20, R(150, 340), R(30, 150), "#06160c");
      }
      for (let i = 0; i < 7; i++) {
        a += leaf(1630, -10, R(150, 280), R(105, 190), "#06160c");
      }
      b4.innerHTML = a;
    }

    // Hero Canvas (Kunang-kunang + jejak kursor glow)
    const cv = heroCanvasRef.current;
    if (!cv) return;
    const c = cv.getContext("2d");
    if (!c) return;

    const P: { x: number; y: number; r: number; p: number; v: number }[] = [];
    const T: { x: number; y: number }[] = [];

    const rs = () => {
      if (cv) {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
      }
    };
    rs();
    window.addEventListener("resize", rs);

    for (let i = 0; i < 70; i++) {
      P.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.6,
        p: Math.random() * 6,
        v: Math.random() * 0.0004 + 0.0001,
      });
    }

    const glow = (
      X: number,
      Y: number,
      rad: number,
      alpha: number,
      col: string
    ) => {
      const g = c.createRadialGradient(X, Y, 0, X, Y, rad);
      g.addColorStop(0, `rgba(${col},${alpha})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.arc(X, Y, rad, 0, 7);
      c.fill();
    };

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      mx = window.innerWidth * 0.72,
      my = window.innerHeight * 0.5,
      sx = mx,
      sy = my;
    const t0 = performance.now();
    const heroEl = document.getElementById("h");
    const E = heroEl ? [...heroEl.querySelectorAll<HTMLElement>("[data-d]")] : [];

    const mv = (e: MouseEvent | TouchEvent) => {
      const p = "touches" in e ? e.touches[0] : e;
      if (!p) return;
      tx = (p.clientX / window.innerWidth - 0.5) * 2;
      ty = (p.clientY / window.innerHeight - 0.5) * 2;
      mx = p.clientX;
      my = p.clientY;
    };

    window.addEventListener("pointermove", mv);
    window.addEventListener("touchmove", mv, { passive: true });

    let animId: number;
    const f = (t: number) => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const k = Math.min(1, (t - t0) / 1700);
      const e = 1 - Math.pow(1 - k, 4);

      E.forEach((el) => {
        const d = +(el.dataset.d || 0);
        const rt = +(el.dataset.r || 0);
        const sw = Math.sin(t / 1400 + d) * +(el.dataset.s || 0);
        const y = el.classList.contains("fig") ? -(1 - e) * 400 : 0;
        el.style.transform = `translate3d(${cx * d}px,${cy * d * 0.5 + y
          }px,0) rotate(${cx * rt + sw}deg)`;
      });

      c.clearRect(0, 0, cv.width, cv.height);
      P.forEach((o) => {
        o.y -= o.v;
        if (o.y < 0) o.y = 1;
        const X =
          (o.x + Math.sin(t / 2000 + o.p) * 0.012 - cx * 0.012) * cv.width;
        const Y = o.y * cv.height;
        const a = 0.25 + 0.75 * Math.abs(Math.sin(t / 700 + o.p));
        glow(X, Y, o.r * 7, a, "210,255,130");
      });

      sx += (mx - sx) * 0.07;
      sy += (my - sy) * 0.07;
      T.unshift({ x: sx + Math.sin(t / 260) * 7, y: sy + Math.cos(t / 340) * 7 });
      if (T.length > 36) T.pop();

      T.forEach((q, i) => {
        const a = (1 - i / 36) * 0.7;
        glow(q.x, q.y, 5 + (1 - i / 36) * 9, a, "255,214,110");
      });

      if (T[0]) {
        glow(T[0].x, T[0].y, 24, 0.95, "255,240,170");
        glow(T[0].x, T[0].y, 5, 1, "255,255,235");
      }

      animId = requestAnimationFrame(f);
    };

    animId = requestAnimationFrame(f);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", rs);
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("touchmove", mv);
    };
  }, []);

  // 2. Interactive SVG Path & Stations + Quote & Peatland Risk Section
  useEffect(() => {
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const rm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    // Helper functions for SVG flora
    let s = 11;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const R = (a: number, b: number) => a + r() * (b - a);
    const leaf = (
      x: number,
      y: number,
      L: number,
      a: number,
      c: string,
      o = 1
    ) => {
      const w = L * 0.2;
      return `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0Q${L * 0.3
        } ${-w} ${L} 0Q${L * 0.3} ${w} 0 0Z" fill="${c}" opacity="${o}"/>`;
    };

    const trp = document.querySelector<HTMLElement>(".tr-path");
    const sts = trp ? [...trp.querySelectorAll<HTMLElement>(".st")] : [];
    const ps = trp ? trp.querySelector<SVGSVGElement>(".tr-svg") : null;
    const pm = ps ? ps.querySelector<SVGPathElement>(".pm") : null;
    const pb = ps ? ps.querySelector<SVGPathElement>(".pb") : null;
    const lan = ps ? ps.querySelector<SVGGElement>(".lan") : null;
    let L = 1;

    function build() {
      if (!trp || !ps || !pm || !pb) return;
      const W = trp.clientWidth,
        H = trp.clientHeight,
        m = window.innerWidth < 820;
      ps.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const pts: [number, number][] = [[m ? 10 : W / 2, 0]];
      sts.forEach((st, i) =>
        pts.push([
          m ? (i % 2 ? 18 : 10) : i % 2 ? W * 0.36 : W * 0.64,
          st.offsetTop + st.offsetHeight / 2,
        ])
      );
      pts.push([m ? 10 : W / 2, H]);
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1],
          b = pts[i],
          h = (b[1] - a[1]) / 2;
        d += `C${a[0]} ${a[1] + h} ${b[0]} ${b[1] - h} ${b[0]} ${b[1]}`;
      }
      pm.setAttribute("d", d);
      pb.setAttribute("d", d);
      L = pm.getTotalLength();
      pm.style.strokeDasharray = `${L}`;
      sts.forEach((st, i) => (st.dataset.f = `${pts[i + 1][1] / H}`));
    }

    build();
    window.addEventListener("resize", build);
    if ("fonts" in document) {
      document.fonts.ready.then(build);
    }

    // Quote Section
    const qs = document.querySelector<HTMLElement>(".q");
    const qp = document.querySelector<HTMLElement>(".q-in p");
    let ws: HTMLElement[] = [];
    if (qp) {
      qp.innerHTML = (qp.textContent || "")
        .trim()
        .split(/\s+/)
        .map((w) => `<span>${w}</span>`)
        .join(" ");
      ws = [...qp.querySelectorAll<HTMLElement>("span")];
    }

    // Peatland Risk Section
    const rk = document.querySelector<HTMLElement>(".rk");
    const st = document.getElementById("rk-st");
    const gs = document.getElementById("rk-svg");
    const cv = rkCanvasRef.current;
    const x2 = cv ? cv.getContext("2d") : null;
    const pt: {
      k: number;
      x: number;
      y: number;
      vx?: number;
      vy?: number;
      r?: number;
      a?: number;
    }[] = [];

    function rz() {
      if (cv && st) {
        cv.width = st.clientWidth;
        cv.height = st.clientHeight;
      }
    }
    rz();
    window.addEventListener("resize", rz);

    // Initial SVG decorations for risk section
    const frEl = document.getElementById("fr");
    if (frEl) {
      let fh = "";
      for (let i = 0; i < 46; i++) {
        fh += leaf(
          R(0, 1600),
          62,
          R(26, 60),
          R(-165, -15),
          ["#2d6a35", "#1f4a28", "#3f7d3a"][i % 3],
          0.95
        );
      }
      frEl.innerHTML = fh;
    }

    const tkEl = document.getElementById("tk");
    if (tkEl) {
      let tk = "";
      for (let k = 0; k <= 6; k++) {
        const y = 60 + k * 60;
        tk += `<path d="M586 ${y}h28" stroke="#e9dfc0" stroke-width="2"/><text x="578" y="${y + 4
          }" text-anchor="end" fill="#e9dfc0">${k ? "-0." + k : "0"}</text>`;
      }
      tkEl.innerHTML = tk;
    }

    const fbEl = document.getElementById("fb");
    if (fbEl) {
      let fb = "";
      for (let i = 0; i < 70; i++) {
        const x = R(0, 1560),
          y = R(90, 500);
        fb += `<path d="M${x} ${y}q14 -9 30 2"/>`;
      }
      fbEl.innerHTML = fb;
    }

    const TX = {
      low: "Muka air tinggi. Gambut basah dan api sulit menjalar.",
      mid: "Permukaan gambut mulai kering. Patroli ditambah dan pompa siaga.",
      high: "Gambut kering dan mudah terbakar. AutoSpray aktif, tim diberi peringatan.",
    };
    const COL = { low: "#a7e58d", mid: "#f3d87a", high: "#ff9b83" };
    const lvs = [...document.querySelectorAll<HTMLButtonElement>(".lv")];

    let lp = -1,
      tma = -0.1,
      act = false,
      risk: "low" | "mid" | "high" = "low",
      d = 0;

    function wave(t: number) {
      const wv = document.getElementById("wv");
      const led = document.getElementById("led");
      if (!wv) return;
      const wy = 60 - tma * 600;
      let w = `M0 ${wy}`;
      for (let x = 0; x <= 1600; x += 40) {
        w += `L${x} ${wy + (rm ? 0 : Math.sin(x / 90 + t / 700) * 3)}`;
      }
      wv.setAttribute("d", w + "V520H0Z");
      if (led) {
        led.setAttribute(
          "opacity",
          rm ? "1" : `${0.4 + 0.6 * Math.abs(Math.sin(t / 400))}`
        );
      }
    }

    function upd(p: number) {
      tma = -0.1 - p * 0.5;
      d = cl((-tma - 0.2) / 0.4);
      risk = tma >= -0.35 ? "low" : tma > -0.45 ? "mid" : "high";
      act = tma < -0.4;

      const wy = 60 - tma * 600;
      const hum = Math.min(92, 78.4 + (tma + 0.24) * 95);
      const tmp = 28.1 + (-0.24 - tma) * 18;
      const pr = 100 / (1 + Math.exp(-(-tma - 0.458) / 0.07));

      const rTma = document.getElementById("r-tma");
      const rS = document.getElementById("r-s");
      const rH = document.getElementById("r-h");
      const rT = document.getElementById("r-t");
      const rP = document.getElementById("r-p");
      const fl = document.getElementById("fl");
      const flt = document.getElementById("flt");
      const pl = document.getElementById("pl");

      if (rTma) rTma.textContent = tma.toFixed(2) + " m";
      if (rS) rS.textContent = TX[risk] + (act ? " Pompa menyala." : "");
      if (rH) rH.textContent = hum.toFixed(1) + "%";
      if (rT) rT.textContent = tmp.toFixed(1) + " °C";
      if (rP)
        rP.textContent = pr < 10 ? pr.toFixed(1) + "%" : Math.round(pr) + "%";

      if (fl) fl.setAttribute("transform", `translate(0 ${wy})`);
      if (flt) flt.textContent = tma.toFixed(2) + " m";

      ["dr", "dc"].forEach((id, i) => {
        const e = document.getElementById(id);
        if (e) {
          e.setAttribute("height", `${wy - 60}`);
          e.setAttribute("opacity", `${d * (i ? 0.7 : 0.55)}`);
        }
      });

      if (st) {
        st.style.setProperty("--rc", COL[risk]);
        st.style.setProperty("--sa", `${1.05 - 0.4 * d}`);
        st.style.setProperty("--se", `${0.7 * d}`);
        st.style.setProperty("--br", `${0.85 - 0.3 * d}`);
        st.style.setProperty(
          "--hz",
          `${d > 0.6 ? ((d - 0.6) / 0.4) * 0.55 : 0}`
        );
      }

      if (pl) pl.setAttribute("fill", act ? "#c9ff9f" : "#555");
      lvs.forEach((b) => b.classList.toggle("on", b.dataset.k === risk));
      wave(0);
    }

    const handleLvClick = (b: HTMLButtonElement) => {
      if (!rk) return;
      const targetT = parseFloat(b.dataset.t || "-0.1");
      const sp = 0.06 + 0.88 * ((-0.1 - targetT) / 0.5);
      const top = rk.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + sp * (rk.offsetHeight - window.innerHeight),
        behavior: "smooth",
      });
    };

    lvs.forEach((b) => {
      b.onclick = () => handleLvClick(b);
    });

    let fr = 0;
    let tickId: number;

    const tick = (t: number) => {
      // 1. Path update
      if (trp && pm && lan) {
        const r1 = trp.getBoundingClientRect();
        const pr = cl((window.innerHeight * 0.65 - r1.top) / r1.height);
        pm.style.strokeDashoffset = `${L * (1 - pr)}`;
        const o = pm.getPointAtLength(L * pr);
        lan.setAttribute("transform", `translate(${o.x} ${o.y})`);
        lan.style.opacity = pr > 0.005 ? "1" : "0";
        sts.forEach((s) => {
          s.classList.toggle("on", pr >= +(s.dataset.f || 0) - 0.07);
        });
      }

      // 2. Quote update
      if (qs && qp) {
        const a = qs.getBoundingClientRect();
        const qp2 = cl(-a.top / (a.height - window.innerHeight));
        qs.style.setProperty("--z", `${1 + qp2 * 0.14}`);
        ws.forEach((w, i) => {
          w.style.opacity = `${0.14 + 0.86 * cl(qp2 * 1.2 * ws.length - i)}`;
        });
      }

      // 3. Peatland Risk update
      if (rk && st && gs && cv && x2) {
        const b = rk.getBoundingClientRect();
        if (b.bottom > 0 && b.top < window.innerHeight) {
          const p = cl(
            (cl(-b.top / (b.height - window.innerHeight)) - 0.06) / 0.88
          );
          if (p !== lp) {
            lp = p;
            upd(p);
          } else {
            wave(t);
          }

          x2.clearRect(0, 0, cv.width, cv.height);
          if (!rm) {
            const sr = st.getBoundingClientRect();
            const gr = gs.getBoundingClientRect();
            const sc = Math.max(gr.width / 1600, gr.height / 520);
            const sy = gr.top - sr.top + 58 * sc;

            if (act) {
              const nz = document.getElementById("nz");
              if (nz) {
                const n = nz.getBoundingClientRect();
                for (let i = 0; i < 5; i++) {
                  pt.push({
                    k: 0,
                    x: n.left - sr.left + n.width / 2,
                    y: n.top - sr.top,
                    vx: Math.random() * 6 - 3,
                    vy: Math.random() * 2 - 1,
                  });
                }
              }
            }

            if (d > 0.55 && ++fr % 5 === 0) {
              pt.push({
                k: 1,
                x: Math.random() * cv.width,
                y: sy,
                r: 10,
                a: 0.22,
              });
            }

            for (let i = pt.length - 1; i >= 0; i--) {
              const q1 = pt[i];
              if (q1.k === 0) {
                q1.vy = (q1.vy || 0) + 0.25;
                q1.x += q1.vx || 0;
                q1.y += q1.vy;
                x2.strokeStyle = "rgba(190,230,255,.7)";
                x2.beginPath();
                x2.moveTo(q1.x, q1.y);
                x2.lineTo(
                  q1.x - (q1.vx || 0) * 1.5,
                  q1.y - (q1.vy || 0) * 1.5
                );
                x2.stroke();
                if (q1.y > sy) pt.splice(i, 1);
              } else {
                q1.r = (q1.r || 10) + 0.35;
                q1.y -= 0.5;
                q1.a = (q1.a || 0.22) - 0.0007;
                if ((q1.a || 0) <= 0) {
                  pt.splice(i, 1);
                  continue;
                }
                const g = x2.createRadialGradient(
                  q1.x,
                  q1.y,
                  0,
                  q1.x,
                  q1.y,
                  q1.r
                );
                g.addColorStop(0, `rgba(80,62,50,${q1.a})`);
                g.addColorStop(1, "rgba(80,62,50,0)");
                x2.fillStyle = g;
                x2.beginPath();
                x2.arc(q1.x, q1.y, q1.r, 0, 7);
                x2.fill();
              }
            }

            if (pt.length > 500) pt.splice(0, 100);
          }
        }
      }

      tickId = requestAnimationFrame(tick);
    };

    tickId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(tickId);
      window.removeEventListener("resize", build);
      window.removeEventListener("resize", rz);
    };
  }, []);

  // 3. Orchid Bloom Observer & Navigation Scroll-Spy
  useEffect(() => {
    // Orchid Bloom
    const flowerbed = flowerbedRef.current;
    if (flowerbed) {
      if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const bloomObserver = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              flowerbed.classList.add("is-blooming");
              bloomObserver.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        bloomObserver.observe(flowerbed);
      } else {
        flowerbed.classList.add("is-blooming");
      }
    }

    // Nav Scroll-Spy
    const sections = ["h", "fitur", "teknologi", "risiko"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if ("IntersectionObserver" in window) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => b.intersectionRatio - a.intersectionRatio
            )[0];
          if (visible) {
            setActiveNav(visible.target.id);
          }
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.4, 0.6] }
      );
      sections.forEach((s) => navObserver.observe(s));
      return () => navObserver.disconnect();
    }
  }, []);

  // 4. Keyboard Escape handler for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (loginDialogRef.current?.open) {
          loginDialogRef.current.close();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Login Modal handlers
  const handleOpenLogin = () => {
    setLoginNote("");
    if (loginDialogRef.current) {
      loginDialogRef.current.showModal();
      requestAnimationFrame(() => emailInputRef.current?.focus());
    }
  };

  const handleCloseLogin = () => {
    if (loginDialogRef.current) {
      loginDialogRef.current.close();
    }
    stopCasting();
  };

  const stopCasting = () => {
    setIsCasting(false);
    setSubmitLabel("Masuk ke DiHutan");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stopCasting();
    setLoginNote("Menyalakan cahaya hutan...");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoginNote("Form login belum terhubung ke layanan autentikasi.");
      return;
    }

    setIsCasting(true);
    setSubmitLabel("Menyalakan cahaya...");

    setTimeout(() => {
      stopCasting();
      setLoginNote("Form login belum terhubung ke layanan autentikasi.");
    }, 1350);
  };

  return (
    <>
      {/* Hero Section */}
      <main className="hero" id="h">
        <div className="bg" data-d="-8">
          <Image
            className="bgi"
            alt="Pemandangan kanopi hutan Kalimantan"
            src="/hutan.jpg"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="tint"></div>
        <div className="bg" data-d="-6" style={{ mixBlendMode: "screen" }}>
          <svg
            id="b0"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          ></svg>
        </div>
        <canvas id="fx" ref={heroCanvasRef}></canvas>
        <div className="fig fa" data-d="40" data-r="1.2" data-s="1" id="fa">
          <Image
            alt="Orangutan bergelantungan di dahan pohon"
            src="/orangutan-clean.webp"
            width={1100}
            height={658}
            priority
          />
        </div>
        <div className="fig fa2" data-d="24" data-r=".7" data-s=".6">
          <Image
            alt="Orangutan kedua bergelantungan di sisi kiri hutan"
            src="/orangutan-clean.webp"
            width={1100}
            height={658}
            priority
          />
        </div>
        <div className="fr">
          <h1>
            Edisi <i>Renaisans</i>
            <br />
            Hutan
          </h1>
          <p className="tg">
            Dunia baru untuk hutan Kalimantan.
            <br />9 fitur cegah karhutla.
          </p>
        </div>
        <div className="bg" data-d="-52">
          <svg
            id="b4"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          ></svg>
        </div>
        <svg className="ov" width="100%" height="100%">
          <filter id="n">
            <feTurbulence baseFrequency=".8" numOctaves={2} />
            <feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .9 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>
        <div className="vg"></div>

        {/* Main Navigation */}
        <nav className="landing-nav" aria-label="Navigasi utama">
          <a className="lg" href="#h" aria-label="DiHutan, ke Beranda">
            <Image
              src="/dihutan-logo-mark.png"
              alt="Logo DiHutan"
              width={40}
              height={40}
            />
            <strong>dihutan</strong>
          </a>
          <div className="nav-links" aria-label="Section">
            <a
              href="#h"
              className={activeNav === "h" ? "is-active" : ""}
              aria-current={activeNav === "h" ? "page" : undefined}
            >
              BERANDA
            </a>
            <a
              href="#fitur"
              className={activeNav === "fitur" ? "is-active" : ""}
              aria-current={activeNav === "fitur" ? "page" : undefined}
            >
              FITUR
            </a>
            <a
              href="#teknologi"
              className={activeNav === "teknologi" ? "is-active" : ""}
              aria-current={activeNav === "teknologi" ? "page" : undefined}
            >
              TEKNOLOGI
            </a>
            <a
              href="#risiko"
              className={activeNav === "risiko" ? "is-active" : ""}
              aria-current={activeNav === "risiko" ? "page" : undefined}
            >
              PETA RISIKO
            </a>
          </div>
          <div className="nav-actions">
            <a className="login-nav" href="/dashboard" style={{ borderColor: "rgba(201, 255, 159, 0.6)", color: "#c9ff9f" }}>
              Dashboard
            </a>
            <button
              className="login-nav"
              id="login-open"
              type="button"
              aria-haspopup="dialog"
              aria-controls="login"
              onClick={handleOpenLogin}
            >
              Masuk
            </button>
            <a className="login-nav register-nav-btn" href="/daftar">
              Daftar
            </a>
            <a className="pill" href="https://drive.google.com/file/d/1OvJh5XtWD4I64kgkJLK69zpy28fiMaIP/view" target="_blank" rel="noopener noreferrer">
              Download App
            </a>
          </div>
        </nav>
        {/* Pos Detail Popup Modal */}
        <PosDetailModal
          posId={selectedPosModal}
          onClose={() => setSelectedPosModal(null)}
          onSelectPos={(id) => setSelectedPosModal(id)}
        />
      </main>

      {/* Content wrapper */}
      <div className="content">
        {/* Intro / Fitur Section */}
        <section className="intro content-inner" id="fitur">
          <span className="eyebrow">
            Pantau hutan · Kenali risiko · Jaga ekosistem
          </span>
          <h2>
            Teknologi untuk hutan,
            <br />
            <i>aksi nyata di lapangan.</i>
          </h2>
          <p>
            Platform monitoring cerdas berbasis IoT, telemetri muka air gambut,
            dan sistem peringatan dini untuk menjaga ekosistem hutan Kalimantan
            Barat bebas dari kebakaran hutan dan lahan.
          </p>
          <a className="text-link" href="#teknologi">
            Jelajahi DiHutan <span>→</span>
          </a>
        </section>

        {/* Interactive Field Guidebook */}
        <PenjaraRimbaBook />

        {/* Teknologi / 3 Pos Penjagaan Section */}
        <section className="tr" id="teknologi">
          <div className="wrap">
            <div className="tr-head">
              <h2>Kenali perubahan sebelum terlambat.</h2>
              <p>
                Data lapangan, analisis cerdas, dan otomasi bekerja bersama
                untuk mendukung penjaga hutan. Susuri tiga pos jaganya.
              </p>
            </div>
            <div className="tr-path">
              <svg className="tr-svg" aria-hidden="true">
                <path className="pb" />
                <path className="pm" />
                <g className="lan">
                  <circle r="14" opacity=".25" />
                  <circle r="6" />
                </g>
              </svg>

              <article className="st" id="iot-monitoring">
                <svg
                  className="il"
                  viewBox="0 0 80 80"
                  fill="none"
                  stroke="#c9ff9f"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M40 6v60M32 20h16M32 34h16M32 48h16" />
                  <path
                    d="M8 54q8-6 16 0t16 0 16 0 16 0"
                    stroke="#7fd6c9"
                  />
                </svg>
                <small>pos jaga 1 · telemetri</small>
                <h3>IoT Monitoring</h3>
                <p>
                  Contoh rancangan pemantauan: sensor membaca kelembapan tanah,
                  lalu ESP32 menyiapkan data untuk dikirim ke perangkat
                  pemantau.
                </p>
                <div className="mt">
                  <div>
                    <span>Sensor di aset</span>
                    <b>Kelembapan tanah</b>
                  </div>
                  <div>
                    <span>Papan pengendali</span>
                    <b>ESP32</b>
                  </div>
                  <div>
                    <span>Status data</span>
                    <b>Belum live</b>
                  </div>
                </div>
                <button
                  type="button"
                  className="pos-popup-trigger-btn"
                  onClick={() => setSelectedPosModal("iot-monitoring")}
                  aria-label="Lihat penjelasan lengkap Pos 01 IoT Monitoring"
                >
                  Pelajari lebih lanjut <span aria-hidden="true">→</span>
                </button>
              </article>

              <article className="st" id="ai-forest-guardian">
                <svg
                  className="il"
                  viewBox="0 0 80 80"
                  fill="none"
                  stroke="#c9ff9f"
                  strokeWidth="2"
                >
                  <circle cx="40" cy="40" r="34" />
                  <circle cx="40" cy="40" r="20" />
                  <g className="sw">
                    <path
                      d="M40 40V6A34 34 0 0 1 70 24Z"
                      fill="#c9ff9f33"
                      stroke="none"
                    />
                  </g>
                  <circle cx="56" cy="30" r="3" fill="#ffd36e" stroke="none" />
                </svg>
                <small>pos jaga 2 · kecerdasan</small>
                <h3>AI Forest Guardian</h3>
                <p>
                  Konsep asisten yang merangkum perubahan data agar petugas tahu
                  apa yang perlu diperiksa—bukan pengganti pengecekan lapangan.
                </p>
                <div className="mt">
                  <div>
                    <span>Masukan</span>
                    <b>Data pemantauan</b>
                  </div>
                  <div>
                    <span>Peran AI</span>
                    <b>Mencari perubahan</b>
                  </div>
                  <div>
                    <span>Status</span>
                    <b>Konsep</b>
                  </div>
                </div>
                <button
                  type="button"
                  className="pos-popup-trigger-btn"
                  onClick={() => setSelectedPosModal("ai-forest-guardian")}
                  aria-label="Lihat penjelasan lengkap Pos 02 AI Forest Guardian"
                >
                  Pelajari lebih lanjut <span aria-hidden="true">→</span>
                </button>
              </article>

              <article className="st" id="autospray">
                <svg
                  className="il"
                  viewBox="0 0 80 80"
                  fill="none"
                  stroke="#7fd6c9"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M40 76V22" stroke="#c9ff9f" />
                  <circle cx="40" cy="18" r="5" stroke="#c9ff9f" />
                  <path className="dp" d="M34 26 20 52M40 28v28M46 26 60 52" />
                </svg>
                <small>pos jaga 3 · otomasi</small>
                <h3>AutoSpray</h3>
                <p>
                  Rancangan kendali pompa dan katup untuk membantu menjaga
                  kelembapan gambut. Perangkat perlu diuji sebelum digunakan.
                </p>
                <div className="mt">
                  <div>
                    <span>Komponen contoh</span>
                    <b>Pompa &amp; katup</b>
                  </div>
                  <div>
                    <span>Cara kerja</span>
                    <b>Rancangan otomatis</b>
                  </div>
                  <div>
                    <span>Status</span>
                    <b>Belum terhubung</b>
                  </div>
                </div>
                <button
                  type="button"
                  className="pos-popup-trigger-btn"
                  onClick={() => setSelectedPosModal("autospray")}
                  aria-label="Lihat penjelasan lengkap Pos 03 AutoSpray"
                >
                  Pelajari lebih lanjut <span aria-hidden="true">→</span>
                </button>
              </article>
            </div>
          </div>
        </section>

        {/* Quote Section with zoom and mist */}
        <section className="q">
          <div className="q-in">
            <div className="mist" style={{ top: "8%" }}></div>
            <div
              className="mist"
              style={{
                bottom: "4%",
                animationDuration: "34s",
                animationDirection: "alternate-reverse",
              }}
            ></div>
            <p>
              “Hutan yang lestari dan gambut yang basah adalah nafas bagi
              kehidupan kita bersama.”
            </p>
          </div>
        </section>

        {/* Peatland Risk Section (Interactive TMA simulator) */}
        <section className="rk" id="risiko">
          <div className="rk-st" id="rk-st">
            <div className="rk-bg"></div>
            <div className="rk-haze"></div>
            <svg
              className="rk-g"
              id="rk-svg"
              viewBox="0 0 1600 520"
              preserveAspectRatio="xMidYMin slice"
              role="img"
              aria-label="Penampang gambut: tinggi muka air turun saat Anda menggulir"
            >
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4d3421" />
                  <stop offset=".7" stopColor="#241810" />
                  <stop offset="1" stopColor="#16100b" />
                </linearGradient>
                <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3f9a8e" stopOpacity=".62" />
                  <stop offset="1" stopColor="#17524f" stopOpacity=".82" />
                </linearGradient>
                <pattern
                  id="ck"
                  width="90"
                  height="70"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M5 10 30 24 22 50M30 24 66 18M66 18 80 44M44 62 22 50"
                    fill="none"
                    stroke="#2a1b0e"
                    strokeWidth="2"
                  />
                </pattern>
              </defs>
              <rect y="60" width="1600" height="460" fill="url(#pg)" />
              <g
                id="fb"
                stroke="#00000055"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              ></g>
              <rect id="dr" y="60" width="1600" fill="#b8935a" />
              <rect id="dc" y="60" width="1600" fill="url(#ck)" />
              <path
                id="wv"
                fill="url(#wg)"
                stroke="#9fe3d6"
                strokeOpacity=".7"
                strokeWidth="2"
              />
              <path
                d="M930 60 975 330H1045L1090 60Z"
                fill="#1f4a49"
                stroke="#0b1a14"
                strokeWidth="3"
              />
              <rect x="1006" y="130" width="10" height="200" fill="#7a5a34" />
              <path
                d="M936 60 980 100H1040L1084 60Z"
                fill="#4aa89b"
                opacity=".5"
              />
              <g id="tk" fontSize="13" fontFamily="Inter,sans-serif"></g>
              <rect
                x="592"
                y="-90"
                width="16"
                height="560"
                rx="3"
                fill="#8a6a40"
              />
              <rect
                x="580"
                y="-122"
                width="40"
                height="32"
                rx="5"
                fill="#26301f"
                stroke="#c9ff9f"
              />
              <circle id="led" cx="600" cy="-106" r="4" fill="#c9ff9f" />
              <g id="fl">
                <path
                  d="M612 0 640 -14H724V14H640Z"
                  fill="#06140c"
                  stroke="var(--rc)"
                  strokeWidth="2"
                />
                <text
                  id="flt"
                  x="650"
                  y="5"
                  fill="#fff"
                  fontSize="15"
                  fontWeight="700"
                  fontFamily="Inter,sans-serif"
                ></text>
              </g>
              <path
                d="M0 60Q200 38 400 58T800 54 1200 60 1600 52V78H0Z"
                fill="#2b4a20"
              />
              <g id="fr"></g>
              <rect
                x="1100"
                y="34"
                width="36"
                height="26"
                rx="4"
                fill="#3b3b30"
              />
              <circle id="pl" cx="1108" cy="42" r="4" fill="#555" />
              <path d="M1124 34V-130" stroke="#8a8a7a" strokeWidth="5" />
              <circle id="nz" cx="1124" cy="-130" r="7" fill="#c9c9b8" />
            </svg>
            <canvas
              className="rk-fx"
              id="rk-fx"
              ref={rkCanvasRef}
            ></canvas>
            <div className="rk-copy">
              <h2>Tingkat risiko karhutla.</h2>
              <p>
                Contoh kategori risiko berdasarkan tinggi muka air gambut.
                Hubungkan sumber sensor untuk menampilkan kondisi lapangan
                terkini. Gulir ke bawah dan lihat air gambut turun.
              </p>
              <div className="lc">
                DAS Kapuas &amp; Kubu Raya · 0.0389° S, 109.3425° E
              </div>
              <a
                href="https://www.google.com/maps/place/Kubu+Raya+Regency,+West+Kalimantan/@-0.2447,109.3378,10z"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat lokasi di Google Maps
              </a>
            </div>
            <div className="rk-r">
              <div className="n" id="r-tma">
                -0.10 m
              </div>
              <div>
                <div className="s" id="r-s"></div>
                <div className="x">
                  <span>
                    Lembap<b id="r-h"></b>
                  </span>
                  <span>
                    Suhu<b id="r-t"></b>
                  </span>
                  <span>
                    Api 24 jam<b id="r-p"></b>
                  </span>
                </div>
              </div>
              <div className="rk-lvs">
                <button className="lv" data-k="low" data-t="-.28" type="button">
                  <b>RENDAH · AMAN</b>
                  <span>TMA &gt; -0.35 m</span>
                </button>
                <button className="lv" data-k="mid" data-t="-.40" type="button">
                  <b>SEDANG · WASPADA</b>
                  <span>TMA sekitar -0.40 m</span>
                </button>
                <button className="lv" data-k="high" data-t="-.54" type="button">
                  <b>TINGGI · BAHAYA</b>
                  <span>TMA &lt; -0.45 m</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="dl" id="aplikasi">
          <div className="wrap dl-w">
            <div className="dl-p">
              <h2>
                Bawa DiHutan.
                <br />
                <i>Ke mana saja.</i>
              </h2>
              <p>
                Akses edukasi ekosistem hutan, pemantauan sensor telemetri, dan
                pengiriman laporan kondisi terverifikasi dari garda terdepan
                melalui aplikasi Android DiHutan.
              </p>
              <a
                className="dl-b"
                href="https://drive.google.com/file/d/1OvJh5XtWD4I64kgkJLK69zpy28fiMaIP/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Aplikasi Android
              </a>
              <p className="dd">
                Versi Stabil v1.4.2 · Android 8.0+ · 28 MB
                <br />
                Siap dipakai di lapangan, mendukung mode offline
              </p>
            </div>
            <div className="dl-visual" ref={flowerbedRef}>
              <span className="orchid-label">Anggrek hitam · Kalimantan</span>
              <svg
                className="orchid-art"
                viewBox="0 0 520 640"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="orchid-leaf"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop stopColor="#789b58" />
                    <stop offset="1" stopColor="#183d29" />
                  </linearGradient>
                </defs>
                <path
                  className="orchid-stem"
                  d="M75 635C95 512 118 440 184 337S274 177 306 88M126 635c11-129 66-228 143-300s94-133 104-211M126 635c41-113 83-156 166-204s114-88 151-173"
                />
                <path
                  className="orchid-leaf"
                  d="M104 536C24 492 8 423 14 356c72 14 118 57 115 131-2 20-10 36-25 49ZM137 467c74-62 91-137 77-205-71 30-105 83-89 153 4 19 8 35 12 52ZM177 369c-75-45-100-111-98-174 65 19 108 63 108 124 0 18-3 34-10 50ZM222 290c65-57 78-123 61-183-62 27-93 73-80 134 4 18 10 34 19 49ZM268 202c-58-47-72-104-61-158 55 21 86 59 78 111-3 17-8 32-17 47ZM303 116c48-46 60-96 48-143-47 23-68 58-58 102 2 15 6 28 10 41Z"
                />
                <path
                  className="orchid-vein"
                  d="M111 517 28 373M134 450l62-164M168 350 91 199M221 268l49-143M266 182l-49-121M306 94l39-105"
                />
                <g className="orchid-blossom">
                  <path
                    className="orchid-petal"
                    d="M306 90c-31-31-34-62-14-79 26 19 31 44 14 79Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M306 90c8-41 31-62 56-49-3 31-22 48-56 49Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M306 90c38-19 68-13 76 13-27 17-52 12-76-13Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M306 90c22 34 18 64-7 76-20-24-17-50 7-76Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M306 90c-39 18-68 10-74-17 28-15 52-9 74 17Z"
                  />
                  <path
                    className="orchid-lip"
                    d="M305 84c-19-9-29-4-31 7 11 2 15 7 18 17 10-3 18-12 13-24Z"
                  />
                </g>
                <g className="orchid-blossom">
                  <path
                    className="orchid-petal"
                    d="M390 126c-27-27-29-53-12-68 22 17 26 38 12 68Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M390 126c7-35 27-53 48-42-3 26-19 41-48 42Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M390 126c32-16 58-11 65 11-23 15-44 10-65-11Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M390 126c19 29 15 55-6 65-17-21-14-43 6-65Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M390 126c-33 15-58 8-63-15 24-13 44-7 63 15Z"
                  />
                  <path
                    className="orchid-lip"
                    d="M389 121c-16-8-25-3-26 8 9 2 13 6 15 14 9-3 15-10 11-22Z"
                  />
                </g>
                <g className="orchid-blossom">
                  <path
                    className="orchid-petal"
                    d="M450 260c-27-27-29-53-12-68 22 17 26 38 12 68Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M450 260c7-35 27-53 48-42-3 26-19 41-48 42Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M450 260c32-16 58-11 65 11-23 15-44 10-65-11Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M450 260c19 29 15 55-6 65-17-21-14-43 6-65Z"
                  />
                  <path
                    className="orchid-petal"
                    d="M450 260c-33 15-58 8-63-15 24-13 44-7 63 15Z"
                  />
                  <path
                    className="orchid-lip"
                    d="M449 255c-16-8-25-3-26 8 9 2 13 6 15 14 9-3 15-10 11-22Z"
                  />
                </g>
              </svg>
              <div
                className="phone"
                role="img"
                aria-label="Pratinjau aplikasi DiHutan pada ponsel"
              >
                <Image
                  className="phone-screen"
                  src="/app-screenshot.png"
                  alt="Tangkapan layar aplikasi DiHutan: beranda, peta risiko, dan status sensor IoT"
                  width={245}
                  height={518}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Login Dialog Modal */}
        <dialog
          className="login-modal"
          id="login"
          ref={loginDialogRef}
          aria-labelledby="login-title"
          onClick={(e) => {
            if (e.target === loginDialogRef.current) {
              handleCloseLogin();
            }
          }}
        >
          <section className="login-section">
            <button
              className="login-close"
              id="login-close"
              type="button"
              aria-label="Tutup jendela masuk"
              onClick={handleCloseLogin}
            >
              &times;
            </button>
            <div className="login-fireflies" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="wrap login-wrap">
              <div className="login-copy">
                <span className="login-kicker">Ruang penjaga · DiHutan</span>
                <h2 id="login-title">
                  Hutan memanggil.
                  <br />
                  <i>Masuk, penjaga.</i>
                </h2>
                <p>
                  Masuk ke ruang pemantauan untuk kembali ke peta, membaca kabar
                  dari sensor, dan melanjutkan langkahmu menjaga hutan.
                </p>
                <div className="login-location">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.4" />
                  </svg>
                  DAS Kapuas · Kalimantan Barat
                </div>
              </div>
              <div className={`login-card ${isCasting ? "is-casting" : ""}`}>
                <div className="login-card-head">
                  <div>
                    <h3 className="login-card-title">Selamat datang kembali</h3>
                    <p className="login-card-subtitle">
                      Gunakan akun penjaga hutanmu.
                    </p>
                  </div>
                  <span className="login-seal" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M12 3 19 6v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                </div>
                <form
                  className="login-form"
                  id="login-form"
                  onSubmit={handleLoginSubmit}
                >
                  <div className="login-field">
                    <label htmlFor="login-email">Email penjaga</label>
                    <input
                      ref={emailInputRef}
                      className="login-input"
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      placeholder="nama@contoh.com"
                      required
                    />
                  </div>
                  <div className="login-field">
                    <label htmlFor="login-password">Kata sandi</label>
                    <div className="login-input-wrap">
                      <input
                        className="login-input login-password"
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Masukkan kata sandi"
                        required
                      />
                      <button
                        className="login-eye"
                        id="login-eye"
                        type="button"
                        aria-label={
                          showPassword
                            ? "Sembunyikan kata sandi"
                            : "Tampilkan kata sandi"
                        }
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          aria-hidden="true"
                        >
                          <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="login-options">
                    <label className="login-remember">
                      <input type="checkbox" name="remember" />
                      Ingat saya
                    </label>
                    <button
                      id="login-help"
                      type="button"
                      onClick={() =>
                        setLoginNote(
                          "Pemulihan kata sandi belum tersedia. Hubungi tim DiHutan untuk bantuan."
                        )
                      }
                    >
                      Lupa kata sandi?
                    </button>
                  </div>
                  <button
                    className={`login-submit ${isCasting ? "is-casting" : ""}`}
                    id="login-submit"
                    type="submit"
                    disabled={isCasting}
                    aria-busy={isCasting}
                  >
                    <span id="login-submit-label">{submitLabel}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </button>
                  <p
                    className="login-note"
                    id="login-note"
                    role="status"
                    aria-live="polite"
                  >
                    {loginNote}
                  </p>
                </form>
                <p className="login-footer">
                  Belum punya akun?{" "}
                  <a href="/daftar">Daftar sebagai Penjaga Rimba &rarr;</a>
                </p>
              </div>
            </div>
          </section>
        </dialog>

        {/* Footer */}
        <footer className="ft">
          <svg
            className="ft-land"
            viewBox="0 0 1600 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="hill-back"
              d="M0 166C190 142 300 190 492 168s310-35 482-5 320 5 626-24v101H0Z"
            />
            <path
              className="hill-front"
              d="M0 198c210-41 335 20 520-6s337-38 535-9 350 22 545-14v71H0Z"
            />
            <g className="grass">
              <path d="M70 240q-9-67-35-91m35 91q4-77 31-114m-31 114q27-54 57-69m1380 69q9-75 38-105m-38 105q-2-58-31-85m31 85q28-49 61-61M285 240q2-48-17-69m17 69q18-42 45-56m1020 56q-10-47 4-76m-4 76q21-39 49-46" />
              <path
                className="grass-light"
                d="M115 240q-5-42-25-57m25 57q13-40 37-54m1302 54q1-45 19-66m-19 66q17-33 42-45m-956 0q1-30 20-46m-20 46q15-24 34-32m322 32q-4-29 12-45"
              />
            </g>
          </svg>
          <div className="ft-inner">
            <div className="ft-main">
              <div className="ft-brand">
                <a
                  className="ft-brand-mark"
                  href="#h"
                  aria-label="DiHutan, kembali ke beranda"
                >
                  <Image
                    src="/dihutan-logo-mark.png"
                    alt="Logo DiHutan"
                    width={45}
                    height={45}
                  />
                  <strong>dihutan</strong>
                </a>
                <p>
                  Menjaga hutan, merawat gambut, dan membawa teknologi lebih
                  dekat ke lapangan.
                </p>
              </div>
              <div className="ft-links">
                <section aria-label="Jelajahi">
                  <h2>JELAJAHI</h2>
                  <a href="#h">Beranda</a>
                  <a href="#fitur">Fitur</a>
                  <Link href="/technology">Teknologi</Link>
                </section>
                <section aria-label="Terhubung">
                  <h2>TERHUBUNG</h2>
                  <a href="#risiko">Peta risiko</a>
                  <a href="https://drive.google.com/file/d/1OvJh5XtWD4I64kgkJLK69zpy28fiMaIP/view" target="_blank" rel="noopener noreferrer">Download aplikasi</a>
                  <a href="mailto:halo@dihutan.id">Hubungi kami ↗</a>
                </section>
              </div>
            </div>
            <div className="ft-bottom">
              <span>
                © DiHutan Editions ’26 · Tumbuh bersama hutan Kalimantan.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

