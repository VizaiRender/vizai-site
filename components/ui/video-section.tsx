"use client";

import { useT } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";
import { useRef, useState } from "react";

export function VideoSection() {
  const t = useT();
  const { lang } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const titleWords = t.home.watchTitle.split(" ");
  const titleHead = titleWords.slice(0, -2).join(" ");
  const titleTail = titleWords.slice(-2).join(" ");

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  // Sem respiro próprio em cima: a seção acima (Janela Tools) já termina com
  // pb-40, que sozinho dá 160px. Quando o vídeo vivia logo abaixo do hero ele
  // precisava do seu, e somar os dois deixava 300px de vazio na emenda.
  return (
    <section className="pb-16 sm:pb-[80px] px-6" data-track-section="video">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ color: "var(--foreground)" }}
          >
            {titleHead} <span className="whitespace-nowrap">{titleTail}</span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.home.watchSubtitle}
          </p>
        </div>

        <div className="p-2 border rounded-3xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              key={lang}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              preload="none"
              controls={playing}
              onEnded={() => setPlaying(false)}
            >
              <source src={`/videos/vizai-${lang}.mp4`} type="video/mp4" />
            </video>

            {!playing && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlay}
              >
                {/* Thumbnail desfocada cobrindo todo o frame */}
                <img
                  src={`/videos/thumb-${lang}.jpg`}
                  alt=""
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "blur(2px)", transform: "scale(1.02)" }}
                  aria-hidden
                />
                {/* Overlay escuro leve pra contrastar o botão */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Botão de play */}
                <button
                  type="button"
                  className="relative z-10 w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xl"
                  aria-label="Reproduzir vídeo"
                >
                  <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 ml-1.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
