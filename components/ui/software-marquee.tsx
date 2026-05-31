"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Marquee } from "./marquee";
import { useT } from "@/lib/i18n";

const softwares = [
  { name: "Sketchup", src: "/logo-sketchup.svg", comingSoon: false },
  { name: "ArchiCAD", src: "/logo-archicad.png", comingSoon: true },
  { name: "Revit",    src: "/logo-revit.svg", comingSoon: true },
];

const items = [
  ...softwares, ...softwares, ...softwares,
  ...softwares, ...softwares, ...softwares,
];

export function SoftwareMarquee() {
  const t = useT();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && theme === "dark";

  // Mesmo "vidro fosco" dos cards de IA + hover azul
  const osPillClass =
    "group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl border border-[color:var(--glass-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0940D2]";
  const osPillStyle: React.CSSProperties = {
    background: "var(--glass-bg)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "var(--glass-shadow)",
    opacity: "var(--glass-opacity)",
  };
  const osIconClass =
    "text-[color:var(--foreground)] transition-colors duration-200 group-hover:text-[#0940D2]";

  return (
    <section className="pt-12 sm:pt-[160px] pb-36 sm:pb-[100px]" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginBottom: 24 }}>
        <h2 style={{
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
          fontWeight: 700,
          color: "var(--foreground)",
          letterSpacing: "-0.02em",
          margin: "0 0 16px",
        }}>
          {t.marquee.title}
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", margin: 0 }}>
          {t.marquee.subtitle}
        </p>
      </div>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <Marquee duration={60} fade fadeAmount={15} className="py-6">
          {items.map((s, i) => (
            <div key={i} style={{ padding: "0 52px", flexShrink: 0, display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={s.src}
                  alt={s.name}
                  style={{
                    height: 44,
                    width: "auto",
                    display: "block",
                    filter: dark ? "invert(1) hue-rotate(180deg)" : "none",
                    opacity: s.comingSoon ? (dark ? 0.3 : 0.4) : (dark ? 0.7 : 0.8),
                    transition: "filter 300ms, opacity 300ms",
                  }}
                />
                {s.comingSoon && (
                  <span style={{
                    position: "absolute",
                    top: -12,
                    right: -32,
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    backgroundColor: "var(--foreground)",
                    color: "var(--background)",
                    padding: "2px 6px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>
                    {t.marquee.comingSoon}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginTop: 56, textAlign: "center" }}>
        <p style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "var(--foreground-muted)",
          letterSpacing: "-0.01em",
          margin: "0 0 22px",
        }}>
          {t.marquee.osCompat}
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          color: "var(--foreground)",
        }}>
          <div className={osPillClass} style={osPillStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={osIconClass} aria-hidden="true">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            <span style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--foreground)" }}>Windows</span>
          </div>
          <div className={osPillClass} style={osPillStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={osIconClass} aria-hidden="true">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
            </svg>
            <span style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--foreground)" }}>macOS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
