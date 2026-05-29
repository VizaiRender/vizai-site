"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "pt" | "en" | "es";

const STORAGE_KEY = "vizai-lang";
const SUPPORTED: Lang[] = ["pt", "en", "es"];

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  setLang: () => {},
});

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "pt";
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const c of candidates) {
    const base = c.slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(base as Lang)) return base as Lang;
  }
  return "pt";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR/primeira renderização sempre "pt" (evita mismatch de hidratação);
  // ajustamos no cliente logo após montar.
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored as Lang)) initial = stored as Lang;
    } catch {}
    if (!initial) initial = detectLang();
    if (initial !== "pt") setLangState(initial);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
