"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useHref } from "@/app/components/LanguageProvider";

const PLAN_CREDITS_N: Record<string, string> = {
  starter_monthly: "250",
  starter_annual: "2.500",
  pro_monthly: "600",
  pro_annual: "6.000",
  business_monthly: "1.600",
  business_annual: "16.000",
};

// `pending` = boleto emitido mas ainda NÃO pago. A Stripe manda o comprador pra
// cá assim que gera o boleto, então sem este estado a página comemorava uma
// compra que ainda não aconteceu e o cliente ficava esperando crédito que não
// vinha. Cartão nunca cai aqui (paga na hora).
export function SucessoContent({
  plan,
  pending = false,
}: {
  plan: string | null | undefined;
  pending?: boolean;
}) {
  const t = useT();
  const href = useHref();
  const planName = t.planLabels[plan as keyof typeof t.planLabels] ?? t.planLabels.unknown;
  const creditsN = plan ? PLAN_CREDITS_N[plan] : null;
  const isAnnual = !!plan && plan.endsWith("_annual");
  const credits = creditsN ? (isAnnual ? t.sucesso.creditsPerYear : t.sucesso.creditsPerMonth).replace("{n}", creditsN) : null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: 560,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        textAlign: "center",
      }}
    >
      {/* Ícone: check verde quando pago, relógio âmbar quando aguarda boleto */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: pending ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)",
          border: `1.5px solid ${pending ? "rgba(245, 158, 11, 0.4)" : "rgba(16, 185, 129, 0.4)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {pending ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15.5 14" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: 0,
          marginBottom: 12,
        }}
      >
        {pending ? t.sucesso.pendingTitle : t.sucesso.title}
      </h1>

      {/* Aviso do boleto: o ponto central da página quando o pagamento está em
          aberto. Diz o prazo e deixa claro que não há nada mais a fazer. */}
      {pending && (
        <div
          style={{
            width: "100%",
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#fbbf24",
              margin: 0,
              marginBottom: 6,
            }}
          >
            {t.sucesso.pendingSubtitle}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.75)",
              margin: 0,
            }}
          >
            {t.sucesso.pendingNotice}
          </p>
        </div>
      )}

      {/* Plan badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 9999,
          padding: "6px 16px",
          marginBottom: 32,
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
          {t.sucesso.youSubscribed}
        </span>
        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>
          {t.sucesso.planPrefix} {planName}
        </span>
        {credits && (
          <>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
              {credits}
            </span>
          </>
        )}
      </div>

      {/* Steps */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 28,
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          {t.sucesso.nextSteps}
        </p>
        {t.sucesso.steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "12px 16px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </span>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <Link
        href={href("/download")}
        className="w-full flex items-center justify-center gap-2 rounded-full font-bold text-sm py-4 px-6 bg-white text-black hover:opacity-80 transition-opacity"
        style={{ textDecoration: "none", marginBottom: 12 }}
      >
        <Download size={16} />
        {t.sucesso.downloadBtn}
      </Link>

      <Link
        href="/app"
        className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {t.sucesso.goToAccount}
      </Link>
    </div>
  );
}
