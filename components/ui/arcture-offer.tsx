"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@/lib/analytics";
import { useT } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";
import type { Lang } from "@/lib/routes";

// Oferta do Arcture na página de obrigado: a plataforma de gestão de
// escritório do mesmo criador do Vizai, com 20% no primeiro mês pra quem
// acabou de comprar aqui.
//
// O cupom é criado e validado na Stripe do ARCTURE, não na nossa. Este código
// só mostra o texto: trocar o cupom aqui sem criar lá entrega um código que o
// checkout do Arcture recusa. A página de obrigado é pública, então o cupom
// pode circular; quem limita o estrago é a configuração dele lá (duração "uma
// vez" e só para quem nunca pagou o Arcture).
//
// Os textos moram em lib/i18n.tsx (t.sucesso.arcture), nos três idiomas.
//
// A página precisa continuar leve (já derrubou o Worker com 1102 quando
// pesou), então aqui não entra animação nem imagem grande: o logo tem 4 KB.

// ARCTURE20 desde 05/10/2026, a pedido do Ramon (antes ARCTURE30, que segue
// ativo na Stripe do Arcture, também por escolha dele).
export const ARCTURE_COUPON = "ARCTURE20";

// O botão leva pra página inicial do Arcture, e não direto pro cadastro, a
// pedido do Ramon: quem chega daqui ainda não conhece o produto. Os parâmetros
// utm não são lidos pelo Arcture hoje. Vão assim mesmo porque custam nada e
// deixam a origem registrada no dia em que ele passar a ler.
// O site do Arcture tem /en e /es (conferido em 05/10), então cada pessoa cai
// na versão do idioma em que comprou aqui.
const ARCTURE_PATH: Record<Lang, string> = { pt: "/", en: "/en", es: "/es" };
const ctaUrl = (lang: Lang) =>
  `https://www.arcture.com.br${ARCTURE_PATH[lang]}?utm_source=vizai&utm_medium=obrigado&utm_campaign=upsell_obrigado`;

export function ArctureOffer() {
  const TEXTO = useT().sucesso.arcture;
  const { lang } = useLang();
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(ARCTURE_COUPON);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sem permissão de área de transferência: o código continua na tela e
      // pode ser selecionado com um clique (user-select: all).
    }
    // Nome próprio, nunca `purchase`/`begin_checkout`: ver a regra no topo do
    // lib/analytics.ts.
    track("arcture_cupom_copiado", { local: "obrigado" });
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        border: "1px solid rgba(22,22,26,0.08)",
        borderRadius: 20,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.06)",
        padding: "28px 28px 24px",
        textAlign: "left",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(22,22,26,0.45)",
          margin: 0,
          marginBottom: 14,
        }}
      >
        {TEXTO.eyebrow}
      </p>

      <picture>
        <source srcSet="/brand/arcture.avif" type="image/avif" />
        {/* <img> direto: logo de 4 KB não compensa o otimizador de imagem. */}
        <img src="/brand/arcture.png" alt="Arcture" width={113} height={26} style={{ display: "block", height: 26, width: "auto", marginBottom: 18 }} />
      </picture>

      <h2
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#16161a",
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          margin: 0,
          marginBottom: 10,
        }}
      >
        {TEXTO.title}
      </h2>

      <p style={{ fontSize: "0.9rem", lineHeight: 1.55, color: "rgba(22,22,26,0.65)", margin: 0, marginBottom: 16 }}>
        {TEXTO.description}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2" style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 20 }}>
        {TEXTO.benefits.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.875rem", color: "rgba(22,22,26,0.8)", lineHeight: 1.45 }}>
            <Check size={16} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2, color: "#059669" }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* A oferta: o motivo do cartão existir, então é o bloco que destaca. */}
      <div
        style={{
          background: "#f7f5f0",
          border: "1px dashed rgba(22,22,26,0.2)",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 18,
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "rgba(22,22,26,0.75)", margin: 0, marginBottom: 10, lineHeight: 1.45 }}>
          {TEXTO.offerLead} <strong style={{ color: "#16161a" }}>{TEXTO.offerStrong}</strong>
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "rgba(22,22,26,0.5)" }}>{TEXTO.couponLabel}</span>
          <span
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#16161a",
              background: "#fff",
              border: "1px solid rgba(22,22,26,0.12)",
              borderRadius: 8,
              padding: "6px 12px",
              userSelect: "all",
            }}
          >
            {ARCTURE_COUPON}
          </span>
          <button
            type="button"
            onClick={copiar}
            className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold px-3 py-2 transition-opacity hover:opacity-70"
            style={{ background: "rgba(22,22,26,0.06)", color: "#16161a", border: "none", cursor: "pointer" }}
          >
            {copiado ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
            {copiado ? TEXTO.copied : TEXTO.copy}
          </button>
        </div>
      </div>

      <a
        href={ctaUrl(lang)}
        target="_blank"
        rel="noopener"
        onClick={() => track("arcture_click", { local: "obrigado", destino: "botao" })}
        className="w-full flex items-center justify-center rounded-full font-bold text-sm py-3.5 px-6 transition-opacity hover:opacity-85"
        style={{ background: "#16161a", color: "#fff", textDecoration: "none", marginBottom: 10 }}
      >
        {TEXTO.cta}
      </a>

      <p style={{ fontSize: "0.75rem", color: "rgba(22,22,26,0.5)", margin: 0, textAlign: "center" }}>{TEXTO.note}</p>
    </div>
  );
}
