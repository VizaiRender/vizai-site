"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/app/components/LanguageProvider";
import { useT } from "@/lib/i18n";
import { useTheme } from "next-themes";
import { AnimatedGridBg } from "./animated-grid-bg";

type Currency = "BRL" | "USD" | "EUR";
type Tab = "assinatura" | "avulso";
type Billing = "mensal" | "anual";

const langToCurrency: Record<string, Currency> = { pt: "BRL", en: "USD", es: "EUR" };

// Dados numéricos/estruturais — textos vêm do dicionário (t.pricing) por índice
const planData = [
  {
    id: "free",
    monthly: { BRL: "R$ 0", USD: "$ 0", EUR: "€ 0" },
    annual: { BRL: "R$ 0", USD: "$ 0", EUR: "€ 0" },
    annualTotal: { BRL: "", USD: "", EUR: "" },
    highlighted: false,
    href: "/signup",
  },
  {
    id: "starter",
    monthly: { BRL: "R$ 97", USD: "$ 29", EUR: "€ 29" },
    annual: { BRL: "R$ 89", USD: "$ 25", EUR: "€ 25" },
    annualTotal: { BRL: "R$ 1.068", USD: "$ 295", EUR: "€ 295" },
    highlighted: false,
    href: "/signup",
  },
  {
    id: "pro",
    monthly: { BRL: "R$ 197", USD: "$ 59", EUR: "€ 59" },
    annual: { BRL: "R$ 179", USD: "$ 50", EUR: "€ 50" },
    annualTotal: { BRL: "R$ 2.148", USD: "$ 601", EUR: "€ 601" },
    highlighted: true,
    href: "/signup",
  },
  {
    id: "business",
    monthly: { BRL: "R$ 519", USD: "$ 129", EUR: "€ 129" },
    annual: { BRL: "R$ 479", USD: "$ 110", EUR: "€ 110" },
    annualTotal: { BRL: "R$ 5.748", USD: "$ 1.319", EUR: "€ 1.319" },
    highlighted: false,
    href: "/signup",
  },
];

const packData = [
  { id: "mini", monthly: { BRL: "R$ 49", USD: "$ 11,90", EUR: "€ 11,90" }, highlighted: false },
  { id: "basico", monthly: { BRL: "R$ 100", USD: "$ 25", EUR: "€ 25" }, highlighted: false },
  { id: "pro-pack", monthly: { BRL: "R$ 250", USD: "$ 75", EUR: "€ 75" }, highlighted: true },
  { id: "empresa", monthly: { BRL: "R$ 550", USD: "$ 149", EUR: "€ 149" }, highlighted: false },
];

function CheckIcon({ highlighted, dark }: { highlighted: boolean; dark: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="9" cy="9" r="9" fill={highlighted ? "rgba(255,255,255,0.15)" : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"} />
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke={highlighted ? "#fff" : "#0940D2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BillingToggle({ billing, onChange, dark, labels }: { billing: Billing; onChange: (b: Billing) => void; dark: boolean; labels: { monthly: string; annual: string; discount: string } }) {
  const isAnual = billing === "anual";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: !isAnual ? "var(--foreground)" : "var(--foreground-muted)", transition: "color 200ms" }}>
        {labels.monthly}
      </span>
      <button
        onClick={() => onChange(isAnual ? "mensal" : "anual")}
        style={{
          width: 44, height: 24, borderRadius: 9999, border: "none", cursor: "pointer",
          backgroundColor: "var(--foreground-muted)",
          position: "relative", transition: "background-color 200ms", padding: 0,
        }}
        aria-label="Toggle billing"
      >
        <div style={{
          position: "absolute", top: 2, left: isAnual ? 22 : 2,
          width: 20, height: 20, borderRadius: "50%",
          backgroundColor: "#fff",
          transition: "left 200ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </button>
      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: isAnual ? "var(--foreground)" : "var(--foreground-muted)", transition: "color 200ms" }}>
        {labels.annual}
      </span>
      <div style={{
        fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px",
        borderRadius: 9999, letterSpacing: "0.04em",
        border: "1px solid var(--foreground-muted)",
        color: "var(--foreground-muted)",
      }}>
        {labels.discount}
      </div>
    </div>
  );
}

const packLookupKeys: Record<string, string> = {
  mini: "pack_mini",
  basico: "pack_basico",
  "pro-pack": "pack_pro",
  empresa: "pack_empresa",
};

function buildCheckoutUrl(
  planId: string,
  tab: Tab,
  billing: Billing,
  currency: Currency
): string | null {
  const curr = currency.toLowerCase();
  if (tab === "assinatura") {
    if (planId === "free") return null;
    const suffix = billing === "anual" ? "annual" : "monthly";
    return `/checkout?plan=${planId}_${suffix}&currency=${curr}`;
  } else {
    const key = packLookupKeys[planId];
    if (!key) return null;
    return `/checkout?plan=${key}&currency=${curr}`;
  }
}

// Converte preço exibido ("R$ 2.004", "$ 11,90") em número.
// Convenção do site: ponto = milhar, vírgula = decimal.
function parsePriceToNumber(s: string): number {
  const n = Number(s.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

// Dispara begin_checkout (InitiateCheckout) no dataLayer ao clicar num plano.
// Espelha o padrão do `purchase`: a deduplicação Pixel x CAPI é feita pelo
// {{event_id}} gerado no próprio GTM, então aqui só mandamos value/currency/plan.
function pushBeginCheckout(args: { value: number; currency: Currency; plan: string; billing: Billing | "onetime" }) {
  if (!args.value) return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "begin_checkout",
    value: args.value,
    currency: args.currency,
    plan: args.plan,
    billing: args.billing,
  });
}

export function PricingSection() {
  const { lang } = useLang();
  const t = useT();
  const currency = langToCurrency[lang] ?? "BRL";
  const [tab, setTab] = useState<Tab>("assinatura");
  const [billing, setBilling] = useState<Billing>("mensal");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && theme === "dark";

  const plans = planData.map((p, i) => ({ ...p, ...t.pricing.plans[i], suffix: i === 0 ? "" : t.pricing.perMonth }));
  const packs = packData.map((p, i) => ({ ...p, ...t.pricing.packs[i], suffix: "" }));

  useEffect(() => {
    const applyFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "pricing-packs") {
        setTab("avulso");
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (hash === "pricing-plans" || hash === "pricing") {
        setTab("assinatura");
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const items = tab === "assinatura" ? plans : packs;

  return (
    <section 
      id="pricing" 
      style={{ position: "relative", overflow: "hidden" }}
      className="bg-[var(--background)] pt-10 sm:pt-[100px] pb-[100px]"
    >
      <AnimatedGridBg />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "var(--foreground)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            {t.pricing.title}
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", margin: 0, maxWidth: 520, marginInline: "auto" }}>
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 56 }}>
          {/* Tab toggle */}
          <div style={{ display: "flex", borderRadius: 9999, padding: 4, gap: 2, backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}` }}>
            {([["assinatura", t.pricing.tabSubscription], ["avulso", t.pricing.tabPacks]] as [Tab, string][]).map(([tabId, label]) => (
              <button key={tabId} onClick={() => setTab(tabId)} style={{
                padding: "10px 24px", borderRadius: 9999, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "0.9rem", transition: "all 150ms",
                backgroundColor: tab === tabId ? (dark ? "#fff" : "#0a0a0a") : "transparent",
                color: tab === tabId ? (dark ? "#0a0a0a" : "#fff") : "var(--foreground-muted)",
              }}>
                {label}
              </button>
            ))}
          </div>

          {/* Billing toggle — only on assinatura tab */}
          {tab === "assinatura" && (
            <>
              <BillingToggle billing={billing} onChange={setBilling} dark={dark} labels={{ monthly: t.pricing.monthly, annual: t.pricing.annual, discount: t.pricing.discount }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 500, color: "var(--foreground-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t.pricing.cancelAnytime}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 500, color: "var(--foreground-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                  {t.pricing.creditsRenew}
                </div>
              </div>
            </>
          )}

          {/* Credits info — only on avulso tab */}
          {tab === "avulso" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 500, color: "var(--foreground-muted)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {t.pricing.neverExpire}
            </div>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((plan) => {
            const hl = plan.highlighted;
            const isAnual = tab === "assinatura" && billing === "anual";
            const price = isAnual && "annual" in plan ? (plan as any).annual[currency] : plan.monthly[currency];
            const annualTotalPrice = isAnual && "annualTotal" in plan ? (plan as any).annualTotal[currency] : "";
            const annualTotal = annualTotalPrice ? `${annualTotalPrice} ${t.pricing.billedAnnually}` : "";
            const checkoutUrl = buildCheckoutUrl(plan.id, tab, billing, currency);

            return (
              <div key={plan.id} style={{
                padding: "32px 28px 36px",
                backgroundColor: hl ? "#0f1729" : (dark ? "#111111" : "#ffffff"),
                borderRadius: 16, position: "relative",
                border: hl ? "none" : `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                boxShadow: hl ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                {hl && (
                  <div style={{ position: "absolute", top: 16, right: 16, backgroundColor: "#0940D2", color: "#fff",
                    fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 9999,
                    letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {t.pricing.popular}
                  </div>
                )}

                <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 8, color: hl ? "rgba(255,255,255,0.9)" : "var(--foreground)" }}>
                  {plan.name}
                </div>

                <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1, color: hl ? "#fff" : "var(--foreground)", marginBottom: 4 }}>
                  {price}
                  <span style={{ fontSize: "1rem", fontWeight: 400, opacity: 0.5 }}>
                    {"suffix" in plan ? (plan as any).suffix : ""}
                  </span>
                </div>

                {/* Annual total */}
                {annualTotal ? (
                  <div style={{ fontSize: "0.72rem", color: hl ? "rgba(255,255,255,0.45)" : "var(--foreground-muted)", marginBottom: 6 }}>
                    {annualTotal}
                  </div>
                ) : <div style={{ height: 18, marginBottom: 6 }} />}

                <div style={{ fontSize: "0.75rem", fontWeight: 500, color: hl ? "rgba(255,255,255,0.5)" : "var(--foreground-muted)", marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0940D2" style={{ flexShrink: 0 }}>
                    <path d="M13 2L4.09 12.96A1 1 0 005 14.5h6.5L10 22l9.91-10.96A1 1 0 0019 10H12.5L13 2z" />
                  </svg>
                  {isAnual && "creditsAnnual" in plan ? (plan as any).creditsAnnual : plan.credits}
                </div>

                <div style={{ fontSize: "0.875rem", color: hl ? "rgba(255,255,255,0.5)" : "var(--foreground-muted)", marginBottom: 28, minHeight: 40 }}>
                  {plan.desc}
                </div>

                {checkoutUrl ? (
                  <a
                    href={checkoutUrl}
                    onClick={() =>
                      pushBeginCheckout({
                        value: parsePriceToNumber(isAnual ? annualTotalPrice : price),
                        currency,
                        plan:
                          tab === "assinatura"
                            ? `${plan.id}_${isAnual ? "annual" : "monthly"}`
                            : packLookupKeys[plan.id],
                        billing: tab === "assinatura" ? billing : "onetime",
                      })
                    }
                    style={{
                      display: "block", textAlign: "center", padding: "12px 0", borderRadius: 9999,
                      marginBottom: 28, fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
                      transition: "opacity 150ms", cursor: "pointer",
                      backgroundColor: hl ? "#fff" : "var(--foreground)",
                      color: hl ? "#0f1729" : "var(--background)",
                    }}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link href="/signup" style={{
                    display: "block", textAlign: "center", padding: "12px 0", borderRadius: 9999,
                    marginBottom: 28, fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
                    transition: "opacity 150ms",
                    backgroundColor: hl ? "#fff" : "var(--foreground)",
                    color: hl ? "#0f1729" : "var(--background)",
                  }}>
                    {plan.cta}
                  </Link>
                )}

               <div style={{ height: 1, marginBottom: 24, backgroundColor: hl ? "rgba(255,255,255,0.1)" : "rgba(128,128,128,0.15)" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckIcon highlighted={hl} dark={dark} />
                      <span style={{ fontSize: "0.875rem", lineHeight: 1.4, color: hl ? "rgba(255,255,255,0.75)" : "var(--foreground-muted)" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
