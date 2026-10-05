"use client";

import { useT } from "@/lib/i18n";
import { ArctureOffer } from "@/components/ui/arcture-offer";

const PLAN_CREDITS_N: Record<string, string> = {
  starter_monthly: "250",
  starter_annual: "2.500",
  pro_monthly: "600",
  pro_annual: "6.000",
  business_monthly: "1.600",
  business_annual: "16.000",
};

// Desde 10/2026 a página não tem mais "próximos passos" nem botão de baixar o
// plugin: quem compra já instalou, porque os créditos grátis só existem no
// plugin. A minoria que compra pelo site sem instalar recebe o lembrete pela
// régua de email (Fluxo 3, que olha `instalou` e não `cliente`).
//
// A tela de "boleto gerado" também saiu: o boleto foi desligado em 30/09 e o
// Pix confirma na hora. A trava que impede reportar venda não paga pra Meta
// continua em app/obrigado/page.tsx, invisível.
export function SucessoContent({ plan }: { plan: string | null | undefined }) {
  const t = useT();

  // O `plan` vem da URL, então é texto de quem abriu o link: só vale o que está
  // nas listas, conferido com hasOwn (`plan=toString` não pode achar nada). Fora
  // delas a linha do plano some; antes caía em "Plano ativo" e a página dizia
  // "Você assinou o Plano Plano ativo", inclusive pra quem comprou pacote.
  const pack = plan && Object.hasOwn(t.sucesso.packs, plan)
    ? t.sucesso.packs[plan as keyof typeof t.sucesso.packs]
    : null;
  const isPlan = !!plan && Object.hasOwn(PLAN_CREDITS_N, plan) && Object.hasOwn(t.planLabels, plan);
  const isAnnual = !!plan && plan.endsWith("_annual");

  let badge: { lead: string; name: string; credits: string } | null = null;
  if (pack) {
    badge = {
      lead: t.sucesso.youBought,
      name: pack.name,
      credits: t.sucesso.creditsNoExpiry.replace("{n}", pack.credits),
    };
  } else if (isPlan) {
    badge = {
      lead: t.sucesso.youSubscribed,
      name: `${t.sucesso.planPrefix} ${t.planLabels[plan as keyof typeof t.planLabels]}`,
      credits: (isAnnual ? t.sucesso.creditsPerYear : t.sucesso.creditsPerMonth).replace("{n}", PLAN_CREDITS_N[plan]),
    };
  }

  const confirmacao = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(16, 185, 129, 0.12)",
          border: "1.5px solid rgba(16, 185, 129, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "#16161a",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: 0,
          marginBottom: 14,
        }}
      >
        {t.sucesso.title}
      </h1>

      {/* Plano ou pacote. Sem saber o que foi comprado, some, pra não inventar
          um nome. */}
      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 6,
            background: "rgba(22,22,26,0.04)",
            border: "1px solid rgba(22,22,26,0.1)",
            borderRadius: 9999,
            padding: "6px 16px",
          }}
        >
          <span style={{ fontSize: "0.875rem", color: "rgba(22,22,26,0.6)" }}>{badge.lead}</span>
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#16161a" }}>{badge.name}</span>
          <span style={{ color: "rgba(22,22,26,0.3)" }}>·</span>
          <span style={{ fontSize: "0.8rem", color: "rgba(22,22,26,0.55)" }}>{badge.credits}</span>
        </div>
      )}
    </div>
  );

  // Duas colunas no computador, uma embaixo da outra no celular (Vizai em
  // cima). A confirmação é bem mais curta que o cartão, então fica centrada
  // na altura pra não sobrar um buraco embaixo dela.
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-14"
      style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1000 }}
    >
      {confirmacao}
      <div style={{ width: "100%", maxWidth: 460, justifySelf: "center" }}>
        <ArctureOffer />
      </div>
    </div>
  );
}
