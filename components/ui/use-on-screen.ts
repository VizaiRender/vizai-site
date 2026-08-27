"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Diz se um elemento está na tela, guardando a resposta num ref.
 *
 * É ref e não estado de propósito: quem consome isto são laços que rodam a cada
 * quadro, e um `useState` aqui provocaria re-render a cada entrada e saída da
 * seção — justamente o custo que a gente está tentando cortar.
 *
 * Nasce `true` para não engolir o primeiro quadro de uma seção que já está
 * visível no carregamento; o observer corrige na primeira entrega, que acontece
 * logo após o primeiro layout.
 */
export function useOnScreen(ref: RefObject<Element | null>, margem = "200px") {
  const naTela = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        naTela.current = entry.isIntersecting;
      },
      // A margem faz a animação já estar rodando quando a seção entra de fato,
      // em vez de "acordar" na cara do usuário no meio da rolagem.
      { rootMargin: margem, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margem]);

  return naTela;
}
