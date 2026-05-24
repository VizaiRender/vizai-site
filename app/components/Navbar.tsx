"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type Lang = "pt" | "en" | "es";

const flags: Record<Lang, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸" };
const langOrder: Lang[] = ["pt", "en", "es"];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "max-w-5xl mt-3 mx-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-md px-6 py-3"
            : "max-w-none px-12 py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="Vizai Render" width={32} height={32} className="rounded-lg" />
              <span className="text-black dark:text-white font-normal text-lg tracking-tight">
                Vizai Render
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="#pricing" className="text-sm text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors">
                Planos
              </Link>
              <Link
                href="#download"
                className="text-sm flex items-center gap-1.5 font-medium text-black dark:text-white border border-black/20 dark:border-white/20 px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Sparkles size={13} />
                Teste agora
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <>
                <div className="relative group">
                  <button
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-base leading-none"
                    aria-label="Idioma"
                  >
                    {flags[lang]}
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-col gap-0.5 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl p-1.5 shadow-lg">
                    {langOrder
                      .filter((l) => l !== lang)
                      .map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-base leading-none"
                          aria-label={l}
                        >
                          {flags[l]}
                        </button>
                      ))}
                  </div>
                </div>

                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Alternar tema"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </>
            )}
            <Link
              href="/login"
              className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors px-4 py-2"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-black dark:bg-white text-white dark:text-black font-medium px-4 py-2 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-colors"
            >
              Começar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
