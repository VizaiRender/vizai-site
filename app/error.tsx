"use client";

/**
 * Rede de segurança do site. Até agora não existia nenhuma: quando qualquer
 * coisa estourava no navegador, a página inteira sumia e o visitante via uma
 * tela preta com "This page couldn't load". Foi assim que o fundo 3D derrubou
 * 1,09% das sessões (ver `dotted-surface.tsx`).
 *
 * Fica DENTRO do layout, então tema, idioma e fontes continuam valendo aqui.
 * O caso em que nem o layout sobe é o `global-error.tsx`, ao lado.
 */

import { useEffect } from "react";
import Link from "next/link";
import { useLang, useHref } from "@/app/components/LanguageProvider";
import { clarityEvent, clarityTag } from "@/lib/analytics";

// Dicionário local, e não o `lib/i18n`, de propósito: são quatro frases que
// existem só aqui, e esta tela precisa depender do mínimo possível para
// funcionar justamente quando algo já quebrou.
const textos = {
  pt: {
    titulo: "Algo deu errado",
    texto:
      "Tivemos um problema ao carregar esta parte do site. Tentar de novo costuma resolver.",
    tentar: "Tentar de novo",
    inicio: "Ir para a página inicial",
  },
  en: {
    titulo: "Something went wrong",
    texto:
      "We had a problem loading this part of the site. Trying again usually fixes it.",
    tentar: "Try again",
    inicio: "Go to the homepage",
  },
  es: {
    titulo: "Algo salió mal",
    texto:
      "Tuvimos un problema al cargar esta parte del sitio. Volver a intentarlo suele resolverlo.",
    tentar: "Intentar de nuevo",
    inicio: "Ir a la página de inicio",
  },
} as const;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLang();
  const href = useHref();
  const t = textos[lang] ?? textos.pt;

  useEffect(() => {
    // Marca a sessão no Clarity pra dar pra assistir o que a pessoa fez antes
    // de quebrar. Respeita host e consentimento, como todo o resto do arquivo.
    clarityEvent("erro_na_pagina");
    if (error?.digest) clarityTag("erro_digest", error.digest);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center text-center px-6 py-32 min-h-[70vh]">
      <h1
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        style={{ color: "var(--foreground)" }}
      >
        {t.titulo}
      </h1>

      <p
        className="text-base max-w-md mb-10"
        style={{ color: "var(--foreground-muted)" }}
      >
        {t.texto}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          type="button"
          onClick={reset}
          className="bg-[#0940D2] text-white hover:bg-[#0730b0] rounded-full px-8 h-12 text-base font-semibold transition-colors w-full sm:w-auto"
        >
          {t.tentar}
        </button>

        <Link
          href={href("/")}
          className="inline-flex items-center justify-center bg-transparent border border-gray-300 dark:border-white/25 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 rounded-full px-8 h-12 text-base font-semibold transition-colors w-full sm:w-auto"
        >
          {t.inicio}
        </Link>
      </div>
    </main>
  );
}
