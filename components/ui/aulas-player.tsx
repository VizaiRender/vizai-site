"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useHref, useLang } from "@/app/components/LanguageProvider";
import { AULAS, AULAS_UI, captionSrc, getAulaText } from "@/lib/treinamento/aulas";

const LEGENDA_LABEL: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export function AulasPlayer() {
  const { lang } = useLang();
  const href = useHref();
  const ui = AULAS_UI[lang] ?? AULAS_UI.pt;
  const [atual, setAtual] = useState(0);
  const [tocando, setTocando] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trilhaRef = useRef<HTMLDivElement>(null);
  // A trilha rola de lado, mas sem seta ninguém descobre que existem mais
  // aulas depois da quinta: a barra de rolagem horizontal não aparece no Mac.
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);
  // Altura da capa da miniatura, medida na tela. Calcular em pixels fixos erra,
  // porque a largura muda com a tela e o título embaixo tem uma ou duas linhas.
  const [alturaCapa, setAlturaCapa] = useState(0);

  const medirTrilha = useCallback(() => {
    const t = trilhaRef.current;
    if (!t) return;
    setPodeVoltar(t.scrollLeft > 8);
    setPodeAvancar(t.scrollLeft + t.clientWidth < t.scrollWidth - 8);
    const capa = t.firstElementChild?.firstElementChild as HTMLElement | undefined;
    if (capa) setAlturaCapa(capa.offsetHeight);
  }, []);

  useEffect(() => {
    medirTrilha();
    window.addEventListener("resize", medirTrilha);
    return () => window.removeEventListener("resize", medirTrilha);
  }, [medirTrilha]);

  const rolarTrilha = (direcao: 1 | -1) => {
    const t = trilhaRef.current;
    if (t) t.scrollBy({ left: direcao * t.clientWidth * 0.8, behavior: "smooth" });
  };

  const aula = AULAS[atual];
  const texto = getAulaText(aula.slug, lang);

  // O atributo `default` do <track> nem sempre liga a legenda sozinho (o Safari
  // costuma ignorar), então ligamos na mão a faixa do idioma da página.
  const ligarLegendaDoIdioma = useCallback(() => {
    const faixas = videoRef.current?.textTracks;
    if (!faixas) return;
    for (let i = 0; i < faixas.length; i++) {
      faixas[i].mode = faixas[i].language === lang ? "showing" : "disabled";
    }
  }, [lang]);

  // Trocar de aula no meio de uma reprodução continua tocando: quem está
  // assistindo a série não quer clicar em play de novo a cada aula.
  const trocar = (indice: number) => {
    const proximo = (indice + AULAS.length) % AULAS.length;
    setAtual(proximo);
  };

  useEffect(() => {
    if (!tocando) return;
    const v = videoRef.current;
    if (v) v.play().catch(() => setTocando(false));
  }, [atual, tocando]);

  // Mantém a miniatura selecionada visível na trilha.
  useEffect(() => {
    const trilha = trilhaRef.current;
    const alvo = trilha?.children[atual] as HTMLElement | undefined;
    alvo?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [atual]);

  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
        {ui.title}
      </h2>
      <p className="text-sm md:text-base mb-6" style={{ color: "var(--foreground-muted)" }}>
        {ui.subtitle}
      </p>

      <div className="relative">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "1920 / 1068",
            backgroundColor: "rgba(0,0,0,0.85)",
            border: "1px solid var(--border)",
          }}
        >
          {tocando && aula.src ? (
            <video
              key={`${aula.slug}-${lang}`}
              ref={videoRef}
              src={aula.src}
              poster={aula.poster ?? undefined}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onLoadedMetadata={ligarLegendaDoIdioma}
              onEnded={() => atual < AULAS.length - 1 && trocar(atual + 1)}
              className="absolute inset-0 w-full h-full object-cover"
            >
              {(["pt", "en", "es"] as const).map((l) => (
                <track
                  key={l}
                  kind="subtitles"
                  src={captionSrc(aula.slug, l)}
                  srcLang={l}
                  label={LEGENDA_LABEL[l]}
                  default={l === lang}
                />
              ))}
            </video>
          ) : (
            <button
              type="button"
              onClick={() => aula.src && setTocando(true)}
              disabled={!aula.src}
              aria-label={`${ui.lesson} ${aula.id}: ${texto.title}`}
              className="group absolute inset-0 w-full h-full disabled:cursor-default"
            >
              {aula.poster && (
                <Image
                  src={aula.poster}
                  alt={texto.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                  className="object-cover object-center"
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                <span
                  className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: aula.src ? "#0940D2" : "rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  <Play className="w-9 h-9 ml-1" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Setas fora do vídeo no desktop, para não cobrir os controles do player */}
        {[["prev", -1], ["next", 1]].map(([dir, passo]) => (
          <button
            key={dir as string}
            type="button"
            onClick={() => trocar(atual + (passo as number))}
            aria-label={dir === "prev" ? ui.prev : ui.next}
            className={`absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full shadow-md transition-transform hover:scale-110 ${
              dir === "prev" ? "left-2 lg:-left-14" : "right-2 lg:-right-14"
            }`}
            style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            {dir === "prev" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        ))}
      </div>

      <div className="mt-5 mb-7">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(9,64,210,0.10)", color: "#0940D2" }}
          >
            {ui.lesson} {aula.id} {ui.of} {AULAS.length}
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <Clock className="w-3.5 h-3.5" />
            {aula.duration}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
          {texto.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed max-w-3xl" style={{ color: "var(--foreground-muted)" }}>
          {texto.excerpt}
        </p>
        {/* Quem prefere ler tem a aula escrita, e é essa página que o Google indexa. */}
        {aula.pagina && (
          <Link
            href={href(`/treinamento/${aula.pagina}`)}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold hover:underline underline-offset-4"
            style={{ color: "#0940D2" }}
          >
            {ui.readFull}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="relative">
      {podeVoltar && (
        <button
          type="button"
          onClick={() => rolarTrilha(-1)}
          aria-label={ui.prev}
          className="absolute left-0 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full shadow-md"
          style={{ top: alturaCapa ? alturaCapa / 2 : "35%", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {podeAvancar && (
        <button
          type="button"
          onClick={() => rolarTrilha(1)}
          aria-label={ui.next}
          className="absolute right-0 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full shadow-md"
          style={{ top: alturaCapa ? alturaCapa / 2 : "35%", backgroundColor: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      <div
        ref={trilhaRef}
        onScroll={medirTrilha}
        className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x scrollbar-none"
      >
        {AULAS.map((a, i) => {
          const t = getAulaText(a.slug, lang);
          const ativa = i === atual;
          return (
            <button
              key={a.slug}
              type="button"
              onClick={() => { setAtual(i); setTocando(false); }}
              aria-current={ativa}
              className="group shrink-0 w-40 sm:w-48 text-left snap-start"
            >
              <div
                className="relative rounded-lg overflow-hidden mb-2 transition-opacity"
                style={{
                  aspectRatio: "1920 / 1068",
                  border: ativa ? "2px solid #0940D2" : "1px solid var(--border)",
                  opacity: ativa ? 1 : 0.72,
                }}
              >
                {a.poster && (
                  <Image src={a.poster} alt={t.title} fill sizes="200px" className="object-cover object-center" />
                )}
                <span className="absolute bottom-1 right-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/70 text-white">
                  {a.duration}
                </span>
              </div>
              <span className="block text-[11px] font-semibold mb-0.5" style={{ color: "#0940D2" }}>
                {ui.lesson} {a.id}
              </span>
              <span
                className="block text-xs leading-snug line-clamp-2"
                style={{ color: ativa ? "var(--foreground)" : "var(--foreground-muted)" }}
              >
                {t.title}
              </span>
            </button>
          );
        })}
      </div>
      </div>
    </section>
  );
}
