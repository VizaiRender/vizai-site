"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useLang } from "@/app/components/LanguageProvider";
import { AULAS, captionSrc } from "@/lib/treinamento/aulas";

const LEGENDA_LABEL: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Player da aula no topo do artigo. Mesmo comportamento do player da página
 *  de Treinamento: só carrega o vídeo depois do clique e liga a legenda do
 *  idioma da página, porque o atributo `default` do <track> não basta. */
export function AulaVideo({ slug, titulo }: { slug: string; titulo: string }) {
  const { lang } = useLang();
  const [tocando, setTocando] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const aula = AULAS.find((a) => a.slug === slug);

  const ligarLegendaDoIdioma = useCallback(() => {
    const faixas = videoRef.current?.textTracks;
    if (!faixas) return;
    for (let i = 0; i < faixas.length; i++) {
      faixas[i].mode = faixas[i].language === lang ? "showing" : "disabled";
    }
  }, [lang]);

  if (!aula?.src) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-8"
      style={{ aspectRatio: "1920 / 1068", backgroundColor: "rgba(0,0,0,0.85)", border: "1px solid var(--border)" }}
    >
      {tocando ? (
        <video
          key={lang}
          ref={videoRef}
          src={aula.src}
          poster={aula.poster ?? undefined}
          controls
          autoPlay
          playsInline
          preload="metadata"
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
      ) : (
        <button
          type="button"
          onClick={() => setTocando(true)}
          aria-label={titulo}
          className="group absolute inset-0 w-full h-full"
        >
          {aula.poster && (
            <Image src={aula.poster} alt={titulo} fill sizes="(max-width: 768px) 100vw, 768px" priority className="object-cover object-center" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
            <span
              className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#0940D2", color: "#fff" }}
            >
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
