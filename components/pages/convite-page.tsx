"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Download } from "lucide-react";
import GradientBordersButton from "@/components/ui/gradient-borders-button";
import { Footer } from "@/components/ui/footer";
import { PluginScreenshot } from "@/components/ui/plugin-screenshot";
import { useLang } from "@/app/components/LanguageProvider";
import { localePath } from "@/lib/routes";
import { codigoDoCaminho, conviteTexts } from "@/lib/convite";

// Página de pouso do convite do "Indique e ganhe" (/convite/<código>).
//
// Todo código serve esta MESMA página pronta: o middleware reescreve
// /convite/<código> para /convite e o código sai do endereço aqui, no
// navegador. Gerar uma página por código obrigaria o Worker a montar a página
// a cada pedido, num plano com teto de 10 ms de CPU.
//
// Não confere o código no servidor de propósito: para isso a API precisaria de
// uma rota pública, e varrer códigos viraria lista de nomes. Quem confere é o
// plugin, na hora em que a pessoa digita.
export function ConvitePage() {
  const { lang } = useLang();
  const t = conviteTexts(lang);
  const [code, setCode] = useState<string | null>(null);
  const [lido, setLido] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setCode(codigoDoCaminho(window.location.pathname));
    setLido(true);
  }, []);

  async function copiar() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1600);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex-1 max-w-5xl mx-auto px-6 pb-16 w-full"
        style={{ paddingTop: "180px" }}
      >
        <div className="flex flex-col items-center text-center mb-12">
          <GradientBordersButton className="mb-6">{t.badge}</GradientBordersButton>
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance"
            style={{ color: "var(--foreground)" }}
          >
            {t.title}
          </h1>
          <p
            className="max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center md:items-start justify-center">
          <div className="w-full max-w-md flex flex-col gap-6 min-w-0">
            <div
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--glass-shadow)",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--foreground-muted)" }}
              >
                {t.codeLabel}
              </span>
              {code ? (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 border-2 border-dashed"
                  style={{ borderColor: "var(--border)" }}>
                  <span
                    className="min-w-0 break-all text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.1em] sm:tracking-[0.18em] select-all"
                    style={{ color: "var(--foreground)" }}
                  >
                    {code}
                  </span>
                  <button
                    type="button"
                    onClick={copiar}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                    style={{
                      color: copiado ? "#16a34a" : "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {copiado ? <Check size={16} /> : <Copy size={16} />}
                    {copiado ? t.copied : t.copy}
                  </button>
                </div>
              ) : (
                // Antes de ler o endereço não mostra nada, para não piscar o
                // aviso de "sem código" em quem tem código.
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)", minHeight: "3.5rem" }}>
                  {lido ? t.noCode : ""}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                {t.stepsTitle}
              </h2>
              <ol className="flex flex-col gap-4">
                {t.steps.map((passo, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "#0940D2" }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-3 pt-0.5 min-w-0">
                      <span className="leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                        {passo}
                      </span>
                      {i === 0 && (
                        <Link
                          href={localePath(lang, "/download")}
                          className="self-start inline-flex items-center gap-2 bg-[linear-gradient(135deg,#2B6BFF_0%,#0940D2_52%,#0A2E9E_100%)] text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-[#0940D2]/25 transition-[filter] duration-200 hover:brightness-110"
                        >
                          <Download size={18} />
                          {t.downloadCta}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t.fine}{" "}
              <Link href={localePath(lang, "/terms")} className="underline underline-offset-2">
                {t.termsLink}
              </Link>
            </p>
          </div>

          <div className="hidden md:block">
            <PluginScreenshot />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
