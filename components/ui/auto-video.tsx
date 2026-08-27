"use client";

import { useEffect, useRef } from "react";

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
export function AutoVideo(props: React.ComponentProps<"video">) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
    };
  }, []);

  return <video ref={ref} {...props} />;
}
