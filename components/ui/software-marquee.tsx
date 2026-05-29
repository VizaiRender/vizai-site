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
    </section>
  );
}
