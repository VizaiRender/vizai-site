// Textos da página do convite do "Indique e ganhe" (/convite/<código>), nos 3
// idiomas. Moram aqui, e não no dicionário de lib/i18n.tsx, pelo mesmo motivo
// do lib/faq.ts: é uma página só, e o dicionário já é grande demais.
//
// Os números vêm de lib/prices.ts (REFERRAL e WELCOME_CREDITS), que espelham o
// servidor. Quem paga é o servidor; aqui é só o que a pessoa lê.
//
// Este arquivo NÃO é "use client": a metadata da página (que roda no servidor)
// usa o título e a descrição daqui.

import type { Lang } from "./routes";
import { REFERRAL, WELCOME_CREDITS } from "./prices";

export type ConviteTexts = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  title: string;
  subtitle: string;
  codeLabel: string;
  copy: string;
  copied: string;
  noCode: string;
  stepsTitle: string;
  steps: string[];
  downloadCta: string;
  fine: string;
  termsLink: string;
};

const encher = (s: string) =>
  s
    .split("{welcome}").join(String(WELCOME_CREDITS))
    .split("{bonus}").join(String(REFERRAL.bonus));

const raw: Record<Lang, ConviteTexts> = {
  pt: {
    metaTitle: "Você recebeu um convite para o Vizai",
    metaDescription:
      "Render fotorrealista com IA direto do SketchUp. Instale o plugin, entre com sua conta Google e ganhe {welcome} créditos grátis para testar.",
    badge: "Convite",
    title: "Você recebeu um convite para o Vizai",
    subtitle:
      "Render fotorrealista com IA direto do SketchUp. Instale o plugin, entre com sua conta Google e ganhe {welcome} créditos grátis para testar.",
    codeLabel: "Código do convite",
    copy: "Copiar",
    copied: "Copiado",
    noCode:
      "Peça o código à pessoa que te convidou. Ele tem letras e números, como MARIA7K2.",
    stepsTitle: "Como usar o convite",
    steps: [
      "Baixe e instale o plugin no SketchUp.",
      "Abra o Vizai e entre com sua conta Google. Você já ganha {welcome} créditos grátis.",
      "Clique no botão com seu nome e seus créditos, no topo do painel, e em \"Tenho um código de convite\". Digite o código.",
      "Ao assinar um plano ou comprar a partir do Pacote Básico, você ganha {bonus} créditos extras.",
    ],
    downloadCta: "Baixar o Vizai",
    fine:
      "O convite vale para quem está começando: antes da primeira compra, uma vez por conta, e para quem usa o Vizai pela primeira vez neste computador. O Pacote Mini não conta.",
    termsLink: "Regras completas nos Termos de Serviço",
  },
  en: {
    metaTitle: "You got an invite to Vizai",
    metaDescription:
      "Photorealistic AI rendering right inside SketchUp. Install the plugin, sign in with Google and get {welcome} free credits to try it.",
    badge: "Invite",
    title: "You got an invite to Vizai",
    subtitle:
      "Photorealistic AI rendering right inside SketchUp. Install the plugin, sign in with your Google account and get {welcome} free credits to try it.",
    codeLabel: "Invite code",
    copy: "Copy",
    copied: "Copied",
    noCode:
      "Ask the person who invited you for the code. It has letters and numbers, like MARIA7K2.",
    stepsTitle: "How to use your invite",
    steps: [
      "Download and install the plugin in SketchUp.",
      "Open Vizai and sign in with your Google account. You get {welcome} free credits right away.",
      "Click the button with your name and credits at the top of the panel, then \"I have an invite code\". Enter the code.",
      "When you subscribe to a plan or buy the Basic Pack or larger, you get {bonus} extra credits.",
    ],
    downloadCta: "Download Vizai",
    fine:
      "Invites are for people who are just starting: before the first purchase, once per account, and for people using Vizai for the first time on this computer. The Mini Pack does not count.",
    termsLink: "Full rules in the Terms of Service",
  },
  es: {
    metaTitle: "Recibiste una invitación a Vizai",
    metaDescription:
      "Render fotorrealista con IA directo en SketchUp. Instala el plugin, entra con tu cuenta de Google y gana {welcome} créditos gratis para probar.",
    badge: "Invitación",
    title: "Recibiste una invitación a Vizai",
    subtitle:
      "Render fotorrealista con IA directo en SketchUp. Instala el plugin, entra con tu cuenta de Google y gana {welcome} créditos gratis para probar.",
    codeLabel: "Código de invitación",
    copy: "Copiar",
    copied: "Copiado",
    noCode:
      "Pídele el código a la persona que te invitó. Tiene letras y números, como MARIA7K2.",
    stepsTitle: "Cómo usar la invitación",
    steps: [
      "Descarga e instala el plugin en SketchUp.",
      "Abre Vizai y entra con tu cuenta de Google. Ya ganas {welcome} créditos gratis.",
      "Haz clic en el botón con tu nombre y tus créditos, arriba en el panel, y en \"Tengo un código de invitación\". Escribe el código.",
      "Al suscribirte a un plan o comprar a partir del Paquete Básico, ganas {bonus} créditos extra.",
    ],
    downloadCta: "Descargar Vizai",
    fine:
      "La invitación es para quien está empezando: antes de la primera compra, una vez por cuenta, y para quien usa Vizai por primera vez en este ordenador. El Paquete Mini no cuenta.",
    termsLink: "Reglas completas en los Términos de Servicio",
  },
};

export function conviteTexts(lang: Lang): ConviteTexts {
  const t = raw[lang] ?? raw.pt;
  return {
    ...t,
    metaDescription: encher(t.metaDescription),
    subtitle: encher(t.subtitle),
    steps: t.steps.map(encher),
  };
}

/**
 * O código vem do endereço (/convite/RAMONWUP). Só letras e números, de 4 a
 * 12, igual ao banco: qualquer outra coisa não vira texto na página.
 */
export function codigoDoCaminho(pathname: string): string | null {
  const m = pathname.match(/\/convite\/([^/?#]+)/);
  if (!m) return null;
  let bruto = m[1];
  try {
    bruto = decodeURIComponent(bruto);
  } catch {
    return null;
  }
  const code = bruto.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return code.length >= 4 && code.length <= 12 ? code : null;
}
