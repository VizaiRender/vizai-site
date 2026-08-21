"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { readStoredLang, useLang, STORAGE_KEY } from "./LanguageProvider";
import { isLocalizedPath, localePath, splitLang, type Lang } from "@/lib/routes";

const DISMISS_KEY = "vizai-lang-hint-off";

// Escrito NO idioma sugerido de propósito: quem não lê português precisa
// entender a faixa sem traduzir nada.
const COPY: Record<Lang, { message: string; action: string; close: string }> = {
  pt: {
    message: "Esta página também está em português.",
    action: "Ver em português",
    close: "Fechar",
  },
  en: {
    message: "This page is also available in English.",
    action: "View in English",
    close: "Dismiss",
  },
  es: {
    message: "Esta página también está en español.",
    action: "Ver en español",
    close: "Cerrar",
  },
};

const FLAG: Record<Lang, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸" };

const SUPPORTED: Lang[] = ["pt", "en", "es"];

/**
 * Qual idioma oferecer a este visitante.
 *
 * Diferente do detectLang do provedor: lá o desconhecido cai em português
 * (é o padrão do site); aqui, quem não fala nenhum dos três — um francês, um
 * alemão — recebe a oferta do inglês, que é o mais provável de ele ler.
 */
function guessLang(): Lang | null {
  if (typeof navigator === "undefined") return null;
  const candidates = [navigator.language, ...(navigator.languages ?? [])].filter(
    Boolean,
  );
  if (candidates.length === 0) return null;
  for (const c of candidates) {
    const base = c.slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(base as Lang)) return base as Lang;
  }
  return "en";
}

/**
 * Faixa discreta oferecendo a página no idioma do visitante.
 *
 * NÃO redireciona sozinha. Redirecionar por idioma do navegador seria um tiro
 * no pé: o Googlebot rastreia dos Estados Unidos e cairia sempre no /en,
 * podendo nunca indexar o português — justo a versão que hoje converte 44,6%
 * das exibições em clique.
 *
 * Só aparece depois que a página monta no navegador, então não existe no HTML
 * que o buscador lê.
 */
export function LanguageSuggestion() {
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const [suggested, setSuggested] = useState<Lang | null>(null);
  // O aviso de cookies ocupa o centro do rodapé. Quando ele está em cena, esta
  // faixa sobe pra não encostar nele — no desktop os dois se tocavam.
  const [cookiesPending, setCookiesPending] = useState(false);

  useEffect(() => {
    if (!isLocalizedPath(pathname)) return setSuggested(null);
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return setSuggested(null);
    } catch {}
    try {
      setCookiesPending(!localStorage.getItem("cookie-consent"));
    } catch {}
    // A escolha explícita de antes vale mais que o palpite do navegador.
    const wanted = readStoredLang() ?? guessLang();
    setSuggested(wanted && wanted !== lang ? wanted : null);
  }, [pathname, lang]);

  if (!suggested) return null;

  const copy = COPY[suggested];
  const target = localePath(suggested, splitLang(pathname).path);

  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, suggested);
    } catch {}
  };

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setSuggested(null);
  };

  return (
    <div
      role="region"
      aria-live="polite"
      className={`fixed left-4 right-4 z-40 sm:right-auto sm:max-w-sm ${
        cookiesPending ? "bottom-28 sm:bottom-20" : "bottom-4"
      }`}
    >
      <div className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-2 shadow-lg dark:bg-neutral-900">
        <span aria-hidden className="text-base leading-none">
          {FLAG[suggested]}
        </span>
        <p className="flex-1 text-xs leading-snug text-[var(--foreground-muted)]">
          {copy.message}
        </p>
        <Link
          href={target}
          onClick={remember}
          className="shrink-0 whitespace-nowrap rounded-full bg-[#0940D2] px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-85"
        >
          {copy.action}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={copy.close}
          className="shrink-0 cursor-pointer text-[var(--foreground-muted)] transition-opacity hover:opacity-70"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
