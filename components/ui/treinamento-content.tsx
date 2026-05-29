"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import GradientBordersButton from "@/components/ui/gradient-borders-button";
import { useT } from "@/lib/i18n";

export function TreinamentoContent() {
  const t = useT();
  return (
    <>
      <div className="flex flex-col items-center text-center mb-12">
        <GradientBordersButton className="mb-6">
          {t.treinamento.badge}
        </GradientBordersButton>
      </div>

      <div className="flex flex-col items-center text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "rgba(9, 64, 210, 0.1)" }}
        >
          <Clock size={28} style={{ color: "#0940D2" }} />
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          {t.treinamento.title}
        </h1>
        <p
          className="text-base md:text-lg max-w-md mb-8 leading-relaxed"
          style={{ color: "var(--foreground-muted)" }}
        >
          {t.treinamento.subtitle}
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-[#0940D2] hover:bg-[#0730b0] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
        >
          {t.treinamento.cta}
        </Link>
      </div>
    </>
  );
}
