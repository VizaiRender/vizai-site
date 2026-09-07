"use client";

import { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLang } from "@/app/components/LanguageProvider";
import { AULAS, captionSrc } from "@/lib/treinamento/aulas";

const LEGENDA_LABEL: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Player da aula no topo do artigo.
 *
 *  A tag <video> existe desde o primeiro render, com preload="none": o
 *  navegador mostra só a capa e não baixa um byte do vídeo até o play, e o
 *  robô do Google enxerga o vídeo na página. Montar o <video> só depois do
 *  clique economizava o mesmo download, mas deixava a página sem vídeo nenhum
 *  para quem não clica, e o robô não clica ("No video indexed" no Search
 *  Console). O botão azul é uma camada por cima, só enquanto está parado. */
export function AulaVideo({ slug, titulo }: { slug: string; titulo: string }) {
  const { lang } = useLang();
  const [iniciado, setIniciado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const aula = AULAS.find((a) => a.slug === slug);

  const ligarLegendaDoIdioma = useCallback(() => {
    const faixas = videoRef.current?.textTracks;
    if (!faixas) return;
    for (let i = 0; i < faixas.length; i++) {
      faixas[i].mode = faixas[i].language === lang ? "showing" : "disabled";
    }
  }, [lang]);

  const tocar = () => {
    setIniciado(true);
    videoRef.current?.play().catch(() => setIniciado(false));
  };

  if (!aula?.src) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-8"
      style={{ aspectRatio: "1920 / 1068", backgroundColor: "rgba(0,0,0,0.85)", border: "1px solid var(--border)" }}
    >
      <video
        key={lang}
        ref={videoRef}
        src={aula.src}
        poster={aula.poster ?? undefined}
        controls={iniciado}
        playsInline
        preload="none"
        onPlay={() => setIniciado(true)}
        onLoadedMetadata={ligarLegendaDoIdioma}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {(["pt", "en", "es"] as const).map((l) => (
          <track
            key={l}
            kind="subtitles"
            src={captionSrc(slug, l)}
            srcLang={l}
            label={LEGENDA_LABEL[l]}
            default={l === lang}
          />
        ))}
      </video>

      {!iniciado && (
        <button
          type="button"
          onClick={tocar}
          aria-label={titulo}
          className="group absolute inset-0 w-full h-full flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
        >
          <span
            className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: "#0940D2", color: "#fff" }}
          >
            <Play className="w-7 h-7 ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
