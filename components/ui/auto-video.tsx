"use client";

import { useEffect, useRef, useState } from "react";

type AutoVideoProps = React.ComponentProps<"video"> & {
  /** Adia o download até perto da tela. O container deve reservar a altura. */
  lazy?: boolean;
};

/**
 * Vídeo decorativo que só toca enquanto está na tela.
 *
 * O `autoPlay` do HTML não tem noção de viewport: o vídeo começa a tocar e não
 * para nunca, mesmo com a seção a três telas de distância. O Safari disfarça
 * isso porque suspende vídeo mudo fora da viewport por economia de energia; o
 * Chromium (Edge, Chrome) NÃO suspende, e segue decodificando e compondo cada
 * quadro de cada vídeo. Com 5 vídeos em loop na home isso media 60 pontos de
 * CPU no Edge, com a página parada, contra 2,6% numa página sem vídeo.
 *
 * Aqui o IntersectionObserver pausa ao sair da tela e retoma ao voltar, e o
 * `visibilitychange` cobre a aba em segundo plano (vídeo mudo em aba oculta
 * continua decodificando sozinho). Visualmente idêntico ao `<video autoPlay>`.
 */
export function AutoVideo({ lazy = false, src, preload, ...props }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<AutoVideoProps["src"]>();
  const videoSrc = lazy && loadedSrc !== src ? undefined : src;

  useEffect(() => {
    const el = ref.current;
    if (!el || !lazy || loadedSrc === src) return;

    let nearScreen = false;
    const load = () => {
      if (nearScreen && !document.hidden) setLoadedSrc(src);
    };
    const io = new IntersectionObserver(([entry]) => {
      nearScreen = entry.isIntersecting;
      load();
    }, { rootMargin: "300px" });
    io.observe(el);
    document.addEventListener("visibilitychange", load);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", load);
    };
  }, [lazy, src, loadedSrc]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !videoSrc) return;

    let onScreen = false;

    const update = () => {
      if (onScreen && !document.hidden) {
        // play() devolve promessa: se o observer pausar logo em seguida (o que
        // acontece na carga, antes do primeiro quadro), ela rejeita com
        // AbortError. É esperado e não é erro de verdade.
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      el.pause();
    };
  }, [videoSrc]);

  // autoPlay no HTML inicia o download antes de o observer poder pausar.
  // Só o observer dá play. Nos cards, nem o src existe antes da aproximação;
  // depois ele permanece para preservar o buffer e a posição ao voltar.
  return (
    <video
      ref={ref}
      {...props}
      src={videoSrc}
      autoPlay={false}
      preload={lazy ? (videoSrc ? "auto" : "none") : preload}
    />
  );
}
