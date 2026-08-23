"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { CONSENT_EVENT, CONSENT_KEY } from "@/lib/analytics";

const EXIT_MS = 300;

const CookieBanner = () => {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(CONSENT_KEY)
        : null;
    if (!stored) {
      setRender(true);
      requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  const closeWithExit = () => {
    setVisible(false);
    setTimeout(() => setRender(false), EXIT_MS);
  };

  // O aviso existe pra resposta valer NA HORA, não só na próxima visita. Quem
  // recusa e continua na mesma página tem a gravação de sessão e os eventos de
  // comportamento desligados no mesmo instante (ver app/components/Analytics).
  const registrar = (resposta: "true" | "false") => {
    try {
      localStorage.setItem(CONSENT_KEY, resposta);
    } catch {
      // Modo privado: sem onde guardar. Fecha o banner mesmo assim pra não
      // ficar batendo na cara da pessoa a cada página.
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    closeWithExit();
  };

  const handleAccept = () => registrar("true");

  const handleDecline = () => registrar("false");

  if (!render) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed left-1/2 bottom-4 z-50 w-[95%] max-w-2xl -translate-x-1/2"
    >
      <div
        className={cn(
          "border border-border rounded-lg bg-white dark:bg-neutral-900 text-card-foreground shadow-lg",
          "px-4 py-2.5 flex flex-row items-center gap-3",
          visible
            ? "animate-in fade-in slide-in-from-bottom-8"
            : "animate-out fade-out slide-out-to-bottom-8",
          "duration-300 ease-out"
        )}
      >
        <p className="text-xs flex-1">{t.cookieBanner.message}</p>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className={cn(
              "cursor-pointer px-3 py-1 rounded-md border border-border",
              "bg-muted text-muted-foreground text-xs",
              "transition-colors duration-200 hover:bg-muted/70"
            )}
          >
            {t.cookieBanner.decline}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className={cn(
              "cursor-pointer px-3 py-1 rounded-md border border-black dark:border-white",
              "bg-black text-white dark:bg-white dark:text-black text-xs",
              "transition-colors duration-200 hover:opacity-80"
            )}
          >
            {t.cookieBanner.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CookieBanner };
