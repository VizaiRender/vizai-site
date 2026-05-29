"use client";

import { useT } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";

// Vídeo de demonstração do plugin, com versão por idioma (pt/en/es).
// Usa a mesma moldura das imagens de antes/depois.
export function VideoSection() {
  const t = useT();
  const { lang } = useLang();

  return (
    <section className="pt-20 sm:pt-[140px] pb-16 sm:pb-[80px] px-6">
      <div className="max-w-4xl mx-auto">
        {/* Título + chamada pra assistir */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ color: "var(--foreground)" }}
          >
            {t.home.watchTitle}
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.home.watchSubtitle}
          </p>
        </div>

        {/* Moldura (mesmo estilo do antes/depois) */}
        <div className="p-2 border rounded-3xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <video
            key={lang}
            className="w-full rounded-2xl block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={`/videos/vizai-${lang}.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
