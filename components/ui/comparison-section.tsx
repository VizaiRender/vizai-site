"use client";

import React from "react";
import { Check, X } from "lucide-react";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { useT } from "@/lib/i18n";

export function ComparisonSection() {
  const t = useT();
  const rows: { criteria: string; vizai: React.ReactNode; tradicional: string }[] = t.comparison.rows.map((row, i) =>
    i === 0
      ? {
          criteria: row.criteria,
          vizai: (
            <span style={{ display: "inline-flex", alignItems: "baseline", gap: 4, flexWrap: "wrap" }}>
              {t.comparison.insideOf}{" "}
              <span style={{ display: "inline-flex", position: "relative" }}>
                <AnimatedTextCycle words={["SketchUp"]} interval={2500} />
              </span>
            </span>
          ),
          tradicional: row.tradicional,
        }
      : { criteria: row.criteria, vizai: row.vizai, tradicional: row.tradicional }
  );
  return (
    <section className="pt-10 sm:pt-[100px] pb-10 sm:pb-[100px] px-6" style={{}}>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <p style={{
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--foreground-muted)",
          marginBottom: 16,
          fontWeight: 500,
        }}>
          {t.comparison.label}
        </p>

        <h2 style={{
          fontSize: "clamp(2.25rem, 4vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginBottom: 16,
          color: "var(--foreground)",
          maxWidth: 800,
        }}>
          {t.comparison.title}
        </h2>

        <p style={{
          fontSize: "1rem",
          color: "var(--foreground-muted)",
          lineHeight: 1.6,
          marginBottom: 56,
          maxWidth: 800,
        }}>
          {t.comparison.description}
        </p>

        {/* Cards lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Coluna Vizai */}
          <div style={{
            borderRadius: 20,
            border: "1.5px solid #0940D2",
            overflow: "hidden",
            backgroundColor: "rgba(9, 64, 210, 0.03)",
          }}>
            <div style={{
              padding: "16px 24px",
              borderBottom: "1.5px solid rgba(9, 64, 210, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#0940D2",
              }} />
              <span style={{
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#0940D2",
              }}>
                {t.comparison.withVizai}
              </span>
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 24px",
                  borderBottom: i < rows.length - 1 ? "1px solid rgba(9, 64, 210, 0.08)" : "none",
                }}
              >
                <p style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--foreground-muted)",
                  marginBottom: 4,
                  fontWeight: 500,
                  opacity: 0.7,
                }}>
                  {row.criteria}
                </p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Check size={15} style={{ color: "#0940D2", flexShrink: 0, marginTop: 2 }} />
                  <span style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    lineHeight: 1.4,
                  }}>
                    {row.vizai}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coluna Tradicional */}
          <div style={{
            borderRadius: 20,
            border: "1px solid rgba(127,127,127,0.3)",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 24px",
              borderBottom: "1px solid rgba(127,127,127,0.25)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "rgba(127,127,127,0.4)",
              }} />
              <span style={{
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--foreground-muted)",
              }}>
                {t.comparison.traditional}
              </span>
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 24px",
                  borderBottom: i < rows.length - 1 ? "1px solid rgba(127,127,127,0.2)" : "none",
                }}
              >
                <p style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--foreground-muted)",
                  marginBottom: 4,
                  fontWeight: 500,
                  opacity: 0.7,
                }}>
                  {row.criteria}
                </p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <X size={15} style={{ color: "var(--foreground-muted)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{
                    fontSize: "0.9rem",
                    color: "var(--foreground-muted)",
                    lineHeight: 1.4,
                  }}>
                    {row.tradicional}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
