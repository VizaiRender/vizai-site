"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const isVideo = (src: string) => src.toLowerCase().endsWith(".mp4");

type Tool = {
  id: number;
  mediaSrc: string; // aceita URL de imagem ou GIF
  hoverSrc?: string; // opcional: imagem mostrada no hover (cross-fade)
};

// Ordem alinhada com t.tools.items
const tools: Tool[] = [
  { id: 1, mediaSrc: "/tools/tool-01.jpg" },
  { id: 2, mediaSrc: "/tools/tool-02.jpg" },
  { id: 10, mediaSrc: "/tools/tool-edit.mp4" },
  { id: 11, mediaSrc: "/tools/tool-mirror.mp4" },
  { id: 12, mediaSrc: "/tools/tool-light.mp4" },
  { id: 3, mediaSrc: "/tools/tool-03.mp4" },
  { id: 4, mediaSrc: "/tools/tool-04.mp4" },
  { id: 5, mediaSrc: "/tools/tool-05.webp" },
  { id: 6, mediaSrc: "/tools/tool-06.jpg" },
  { id: 7, mediaSrc: "/tools/tool-07.jpg", hoverSrc: "/tools/tool-07-empty.avif" },
  { id: 8, mediaSrc: "/tools/tool-08.jpg" },
  { id: 9, mediaSrc: "/tools/tool-09.png" },
];

export function ToolsSection() {
  const t = useT();
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 300;
    el.scrollBy({ left: direction === "right" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  }

  return (
    <section className="pt-6 sm:pt-24 pb-40 px-6" id="ferramentas">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative mb-10">
          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
              style={{ color: "var(--foreground)" }}
            >
              {t.tools.title}
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
              {t.tools.subtitle}
            </p>
          </div>

          {/* Setas: só enquanto o carrossel existe (abaixo de lg vira grade) */}
          <div className="hidden sm:flex lg:hidden gap-2 shrink-0 absolute right-0 bottom-0">
            <button
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-10 h-10 rounded-full border transition-colors hover:bg-white/10"
              style={{ borderColor: "var(--foreground-muted)", color: "var(--foreground)" }}
              aria-label={t.tools.prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-10 h-10 rounded-full border transition-colors hover:bg-white/10"
              style={{ borderColor: "var(--foreground-muted)", color: "var(--foreground)" }}
              aria-label={t.tools.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carrossel no mobile/tablet; no desktop vira grade de 4 colunas (12 cards = 3 linhas) */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tools.map((tool, i) => {
            const meta = t.tools.items[i];
            return (
            <div
              key={tool.id}
              className="relative flex-none w-[280px] sm:w-[320px] lg:w-auto aspect-[3/4] rounded-2xl overflow-hidden snap-start group"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              {/* Media: imagem estática ou vídeo (.mp4) — basta preencher mediaSrc */}
              {tool.mediaSrc ? (
                <>
                  {isVideo(tool.mediaSrc) ? (
                    <video
                      src={tool.mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={meta.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                        tool.hoverSrc ? "group-hover:opacity-0" : ""
                      }`}
                    />
                  ) : (
                    <Image
                      src={tool.mediaSrc}
                      alt={meta.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, 320px"
                      className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                        tool.hoverSrc ? "group-hover:opacity-0" : ""
                      }`}
                    />
                  )}
                  {tool.hoverSrc && (
                    <Image
                      src={tool.hoverSrc}
                      alt={`${meta.name}: antes`}
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1024px) 25vw, 320px"
                      className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>
                    slot {String(tool.id).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white leading-tight">{meta.name}</h3>
                <p className="text-sm text-white/75 leading-relaxed" style={{ minHeight: "4.5rem" }}>{meta.description}</p>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
