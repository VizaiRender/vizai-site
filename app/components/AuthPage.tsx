"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Ruler, Aperture, Building2, Workflow, GraduationCap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import WavyBackground from "@/components/ui/wavy-background";
import { useHref } from "@/app/components/LanguageProvider";
import { useT } from "@/lib/i18n";

// Coluna da esquerda no claro: mesmo #fafafa e mesmo preto do resto do site
// (globals.css), pra ela não virar um branco solto que não existe em lugar
// nenhum. O acento é o azul da marca, no papel que o laranja faz na referência.
const PANEL_INK     = "#0a0a0a";
const PANEL_INK_SOFT = "rgba(10,10,10,0.55)";
const ACCENT = "#0940D2";

const ICONS = { ruler: Ruler, camera: Aperture, building: Building2, workflow: Workflow, training: GraduationCap };

function sanitizeNext(raw: string | null): string {
  if (!raw) return "/app";
  if (!raw.startsWith("/")) return "/app";
  if (raw.startsWith("//") || raw.startsWith("/\\")) return "/app";
  return raw;
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const t = useT();
  const href = useHref();
  const [loading, setLoading] = useState(false);

  const copy = mode === "login" ? t.auth.login : t.auth.signup;
  const panel = t.auth.panel;
  // Caminho fixo, sem prefixo de idioma: login e cadastro estão em
  // NON_LOCALIZED_PREFIXES, então "/en/signup" não existe e daria 404.
  // O idioma da página segue vindo da preferência salva.
  const switchTo = mode === "login" ? "/signup" : "/login";

  const btnBg    = "rgba(255,255,255,0.08)";
  const btnBgHov = "rgba(255,255,255,0.14)";

  const handleGoogle = async () => {
    setLoading(true);
    const supabase = createClient();
    const params = new URLSearchParams(window.location.search);
    const next = sanitizeNext(params.get("next"));
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", next);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl.toString() },
    });
  };

  return (
    // Sem Navbar de propósito: nesta tela a única coisa a fazer é entrar, e
    // menu é porta de saída. O logo no topo do card é a volta pra home.
    //
    // No desktop a página é travada em uma tela cheia, sem rolagem. No celular
    // ela rola, senão a copy (que fica embaixo do botão) seria inalcançável.
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-black lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden">
      <WavyBackground className="absolute inset-0 z-0" />

      {/* Painel claro da esquerda: corte reto no meio exato, e uma sombra
          caindo por cima da onda. Sem a sombra a emenda fica chapada, como duas
          imagens coladas; com ela o painel parece uma camada apoiada sobre a
          animação. O degradê que havia aqui antes embaçava a divisão e sujava
          as duas cores. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-1/2 lg:block"
        style={{
          background:
            "radial-gradient(70% 90% at 8% 18%, rgba(9,64,210,0.10) 0%, rgba(250,250,250,0) 60%)," +
            " #fafafa",
          boxShadow: "14px 0 40px -6px rgba(0,0,0,0.45)",
        }}
      />
      {/* Sem largura máxima no container: cada coluna precisa valer exatamente
          metade da janela, senão o centro da coluna não cai no centro da metade
          e o card de login fica visivelmente torto pra esquerda. */}
      <div className="relative z-10 grid min-h-[100dvh] w-full grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-2">

        {/* Copy. No celular vem depois do botão, pra não empurrar o Google
            pra fora da primeira tela. */}
        <aside className="order-2 flex items-center justify-center bg-[#fafafa] px-8 py-16 shadow-[0_-14px_40px_-6px_rgba(0,0,0,0.45)] lg:order-1 lg:bg-transparent lg:px-10 lg:py-10 lg:shadow-none xl:px-14">
          <div className="w-full max-w-[540px]">
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.9vw, 2.5rem)", fontWeight: 700, color: PANEL_INK,
              letterSpacing: "-0.02em", lineHeight: 1.12, margin: 0, maxWidth: 500,
            }}
          >
            {panel.title}
          </h2>

          {/* Espaçamentos amarrados na altura da janela: em notebook baixo a
              coluna encolhe sozinha em vez de estourar a tela travada. */}
          <div
            className="flex flex-wrap items-start gap-x-10 gap-y-5"
            style={{ marginTop: "clamp(18px, 3.2vh, 36px)" }}
          >
            {panel.stats.map((s, i) => (
              <div
                key={s.value}
                className={i > 0 ? "lg:border-l lg:border-black/10 lg:pl-9" : ""}
                style={{ maxWidth: 220 }}
              >
                <div style={{ fontSize: "1.375rem", fontWeight: 700, color: PANEL_INK, letterSpacing: "-0.01em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8125rem", color: PANEL_INK_SOFT, lineHeight: 1.45, marginTop: 3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <ul
            className="flex list-none flex-col p-0"
            style={{ marginTop: "clamp(20px, 3.6vh, 40px)", gap: "clamp(12px, 2.1vh, 22px)" }}
          >
            {panel.features.map((f) => {
              const Icon = ICONS[f.icon as keyof typeof ICONS] ?? Ruler;
              return (
                <li key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0, width: 36, height: 36, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#ffffff",
                      border: "1px solid rgba(10,10,10,0.08)",
                    }}
                  >
                    <Icon size={17} color={ACCENT} strokeWidth={1.8} />
                  </span>
                  <div style={{ maxWidth: 440 }}>
                    <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: PANEL_INK, lineHeight: 1.3 }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: PANEL_INK_SOFT, lineHeight: 1.5, marginTop: 3 }}>
                      {f.body}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
        </aside>

        {/* Card de entrada */}
        {/* No celular o card toma a primeira tela inteira e fica centralizado
            nela, o que empurra a copy pra baixo da dobra. */}
        <section className="order-1 flex min-h-[100dvh] items-center justify-center px-8 py-16 lg:order-2 lg:min-h-0 lg:px-10 lg:py-10">
          <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", gap: 28, textAlign: "center" }}>
            <Link href={href("/")} className="mx-auto flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100">
              {/* unoptimized: SVG não passa pelo otimizador de imagem, que
                  devolve 400 e faz o logo sumir. */}
              <Image src="/logo.svg" alt="Vizai Render" width={36} height={36} className="rounded-lg" unoptimized />
              <span style={{ fontSize: "1.0625rem", fontWeight: 400, color: "#fff", letterSpacing: "-0.01em" }}>
                Vizai Render
              </span>
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#fff",
                  letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
                }}
              >
                {copy.title}
              </h1>
              <p style={{ fontSize: "clamp(1rem, 2.2vw, 1.125rem)", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                {copy.subtitle}
              </p>
            </div>

            <button
              onClick={handleGoogle}
              disabled={loading}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                background: btnBg,
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 9999, color: "#fff",
                fontWeight: 500, fontSize: "1rem",
                padding: "18px 24px", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "background 150ms",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = btnBgHov)}
              onMouseLeave={e => (e.currentTarget.style.background = btnBg)}
            >
              {!loading && <GoogleIcon />}
              {loading ? copy.redirecting : copy.button}
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {copy.switch}{" "}
                <Link href={switchTo} style={{ color: "#fff", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {copy.switchCta}
                </Link>
              </p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
                {copy.terms}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
