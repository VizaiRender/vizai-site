"use client";

import GradientBordersButton from "@/components/ui/gradient-borders-button";
import { useT } from "@/lib/i18n";

export function DownloadHero() {
  const t = useT();
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <GradientBordersButton className="mb-6">
        {t.download.badge}
      </GradientBordersButton>
      <h1
        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        style={{ color: "var(--foreground)" }}
      >
        {t.download.title}
      </h1>
      <p
        className="max-w-xl text-base md:text-lg leading-relaxed"
        style={{ color: "var(--foreground-muted)" }}
      >
        {t.download.subtitle}
      </p>
    </div>
  );
}
