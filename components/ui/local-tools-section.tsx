"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";

const screenshots = ["tools-otimizar", "tools-pisos"];

export function LocalToolsSection() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section className="pb-40 px-6" id="tools-gratis" data-track-section="tools-gratis">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 mb-5">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            {t.localTools.badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
          >
            {t.localTools.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            {t.localTools.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.localTools.items.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-accent-foreground/20"
              style={{ backgroundColor: "var(--card, transparent)" }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0d1726]">
                <Image
                  src={`/treinamento/ui/${screenshots[i]}-${lang}.webp`}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1726] to-transparent" />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg font-bold tracking-tight mb-1.5" style={{ color: "var(--foreground)" }}>
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
