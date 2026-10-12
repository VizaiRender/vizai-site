"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LANG,
  HREFLANG,
  LANGS,
  isLocalizedPath,
  localePath,
  splitLang,
  type Lang,
} from "@/lib/routes";

export type { Lang };

/** Onde a escolha de idioma fica guardada. Exportado porque a faixa de
 * sugestão também grava aqui — dois literais soltos desandariam calados. */
export const STORAGE_KEY = "vizai-lang";

/**
 * Grava a escolha de idioma em localStorage E em cookie.
 *
 * O cookie existe porque o middleware roda no servidor, ANTES de a página
 * carregar, e de lá não se enxerga o localStorage. Sem ele, o redirecionamento
 * de idioma ficaria empurrando pro inglês alguém que escolheu português de
 * propósito — brigar com a escolha do usuário é pior que o problema original.
 */
export function persistLang(l: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {}
  try {
    // 1 ano; Lax basta porque só é lido em navegação de topo.
    document.cookie = `${STORAGE_KEY}=${l}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {}
}
const SUPPORTED: Lang[] = LANGS;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** true quando o idioma veio da URL (páginas públicas), não do navegador. */
  fromRoute: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  fromRoute: false,
});

/**
 * Idioma da última página pública vista NESTA aba.
 *
 * Login, cadastro, painel e checkout não têm versão por idioma. Até 12/10/2026
 * eles usavam só a preferência salva ou o idioma do navegador, então quem
 * estava lendo a home em português e clicava em "Entrar" num Mac em inglês
 * caía no login em inglês. Quem chega vindo de uma página tem o idioma dela
 * como sinal mais forte de qual língua está lendo.
 *
 * Chave separada de STORAGE_KEY de propósito: aquela é a escolha explícita, e
 * a faixa de sugestão de idioma depende dela. Gravar ali a cada página vista
 * faria a faixa sumir para todo estrangeiro que passasse pela home. E fica em
 * sessionStorage, não em localStorage: vale para a aba (sobrevive à ida ao
 * Google no login e à Stripe no checkout) e some numa visita nova.
 */
const PAGE_LANG_KEY = "vizai-lang-page";

function readPageLang(): Lang | null {
  try {
    const page = sessionStorage.getItem(PAGE_LANG_KEY);
    if (page && SUPPORTED.includes(page as Lang)) return page as Lang;
  } catch {}
  return null;
}

export function readStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored as Lang)) return stored as Lang;
  } catch {}
  return null;
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const c of candidates) {
    const base = c.slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(base as Lang)) return base as Lang;
  }
  return DEFAULT_LANG;
}

/**
 * Contexto de idioma.
 *
 * Nas páginas públicas o idioma vem do ENDEREÇO (`/`, `/en/...`, `/es/...`).
 * Como `usePathname` já responde certo durante a renderização no servidor, o
 * HTML sai traduzido de saída — era exatamente isso que faltava: antes o
 * servidor mandava sempre português e a troca só acontecia depois de carregar,
 * então todo visitante estrangeiro (e toda prévia de link no WhatsApp) via
 * português.
 *
 * Nas rotas de login, painel e checkout (noindex, sem versão por idioma) vale,
 * nesta ordem: o idioma da última página pública vista na aba, a preferência
 * salva e o idioma do navegador.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const routeDriven = isLocalizedPath(pathname);
  const routeLang = splitLang(pathname).lang;

  // Só usado FORA das páginas públicas. Começa em pt para servidor e cliente
  // renderizarem a mesma coisa; ajusta logo após montar.
  const [detected, setDetected] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    if (routeDriven) {
      try {
        sessionStorage.setItem(PAGE_LANG_KEY, routeLang);
      } catch {}
      return;
    }
    // Sem o "if (initial !== pt)" de antes: o provedor sobrevive à navegação
    // dentro do site, e quem fosse /en → login → home em português → login de
    // novo ficaria preso no inglês da primeira visita.
    setDetected(readPageLang() ?? readStoredLang() ?? detectLang());
  }, [routeDriven, routeLang]);

  const lang = routeDriven ? routeLang : detected;

  // O <html lang> mora no layout raiz e é escrito uma vez só; aqui ele passa a
  // acompanhar o idioma da página. O next-themes já mexe nesse mesmo elemento,
  // então não é novidade nesta base.
  useEffect(() => {
    document.documentElement.lang = HREFLANG[lang];
  }, [lang]);

  const setLang = (l: Lang) => {
    persistLang(l);
    if (routeDriven) {
      // Página pública: trocar de idioma é trocar de endereço.
      router.push(localePath(l, splitLang(pathname).path));
      return;
    }
    setDetected(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, fromRoute: routeDriven }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

/**
 * Traduz um caminho canônico (o do português) para o idioma atual.
 * `useHref()("/download")` devolve "/download", "/en/download" ou "/es/download".
 */
export function useHref() {
  const { lang } = useLang();
  return (path: string) => localePath(lang, path);
}
