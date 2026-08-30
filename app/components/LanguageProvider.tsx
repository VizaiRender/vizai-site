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
 * Nas rotas de login, painel e checkout (noindex, sem versão por idioma) segue
 * valendo o comportamento antigo: preferência salva, senão idioma do navegador.
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
    if (routeDriven) return;
    const initial = readStoredLang() ?? detectLang();
    if (initial !== DEFAULT_LANG) setDetected(initial);
  }, [routeDriven]);

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
