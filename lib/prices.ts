// Preços e créditos que o site MOSTRA, em cada moeda. Fonte única para a tabela
// de planos (components/ui/pricing-section.tsx), para os dados estruturados que o
// Google e as IAs leem (lib/structured-data.ts) e para o /llms.txt.
//
// Morava dentro da pricing-section, que é "use client": de lá o servidor não
// consegue ler nada, e os dados estruturados acabaram com uma cópia à mão, só em
// real, repetida nas páginas em inglês e espanhol. Uma cópia por moeda seria a
// próxima a desencontrar da tabela.
//
// Quem cobra é a Stripe, pelo lookup_key; o servidor resolve o preço ativo em
// runtime. Estes números são o que o cliente VÊ antes de pagar, então reprecificar
// na Stripe exige mexer aqui também. Créditos de plano seguem o LOOKUP_KEY_MAP do
// servidor (ver a seção 7 do CLAUDE.md do plugin).
//
// Este arquivo NÃO é "use client" de propósito.

import type { Lang } from "./routes";

export type Currency = "BRL" | "USD" | "EUR";

export const langToCurrency: Record<Lang, Currency> = { pt: "BRL", en: "USD", es: "EUR" };

// Dados numéricos/estruturais — textos vêm do dicionário (t.pricing) por índice
export const planData = [
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

export const packData = [
  { id: "mini", monthly: { BRL: "R$ 49", USD: "$ 11,90", EUR: "€ 11,90" }, highlighted: false },
  { id: "basico", monthly: { BRL: "R$ 100", USD: "$ 25", EUR: "€ 25" }, highlighted: false },
  { id: "pro-pack", monthly: { BRL: "R$ 250", USD: "$ 75", EUR: "€ 75" }, highlighted: true },
  { id: "empresa", monthly: { BRL: "R$ 550", USD: "$ 149", EUR: "€ 149" }, highlighted: false },
];

// Os textos da tabela ("250 créditos/mês") vêm do dicionário, que é "use client".
// Aqui ficam só os números, para quem roda no servidor.
export const WELCOME_CREDITS = 8;

// Indique e ganhe (14/10/2026). Espelha o REFERRAL do servidor (server/index.js
// do repo do plugin), que é quem paga: mudou lá, muda aqui. Usado pela página
// /convite e pelos Termos. O Pacote Mini não conta para a indicação.
export const REFERRAL = {
  reward: 50,
  bonus: 25,
  milestoneEvery: 10,
  milestoneBonus: 200,
} as const;

export const PLAN_CREDITS: Record<string, number> = {
  starter: 250,
  pro: 600,
  business: 1600,
};

export const PACK_CREDITS: Record<string, number> = {
  mini: 50,
  basico: 200,
  "pro-pack": 700,
  empresa: 1750,
};

// O plano anual credita 10 meses de crédito de uma vez (LOOKUP_KEY_MAP do servidor:
// starter_annual 2500, pro_annual 6000, business_annual 16000).
export const ANNUAL_CREDIT_MONTHS = 10;

// Quanto cada operação gasta. Espelha o CREDIT_COST do servidor e o FAQ da home
// (lib/i18n.tsx): mudou lá, muda aqui. Usado pelo /faq e pelo /llms.txt.
export const OPERATION_CREDITS = {
  render: 4,
  creative: 3,
  edit: 4,
  upscale: 5,
  panorama: 5,
  block: 28,
} as const;

// Vídeo cobra round(segundos × 5,5) no servidor. As durações são as do plugin.
export const VIDEO_CREDITS: { seconds: number; credits: number }[] = [4, 6, 8, 10, 15].map(
  (seconds) => ({ seconds, credits: Math.round(seconds * 5.5) }),
);

/** "R$ 1.068" -> 1068, "$ 11,90" -> 11.9. Todas as moedas seguem o formato pt-BR. */
export function parsePriceToNumber(s: string): number {
  const n = Number(s.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
