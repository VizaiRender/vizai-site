// Dados estruturados (schema.org) do produto, no idioma e na moeda da página.
//
// Até 12/10/2026 o SoftwareApplication morava no layout raiz, escrito em
// português e com preço em real, e saía igual em /en e /es. O Google e as IAs
// leem esse bloco como fato sobre o produto: quem perguntava em inglês recebia
// preço em BRL, desencontrado da tabela que a página mostra em dólar. Agora cada
// página de produto (home e download) declara o seu, com os preços de
// lib/prices.ts, os mesmos da tabela.
//
// A Organization continua no layout raiz: ela não tem idioma nem moeda, e os
// artigos do Treinamento apontam para ela por @id.

import { absoluteUrl, SITE_URL, type Lang } from "./routes";
import {
  langToCurrency,
  PACK_CREDITS,
  packData,
  parsePriceToNumber,
  PLAN_CREDITS,
  planData,
  WELCOME_CREDITS,
} from "./prices";

type Copy = {
  description: string;
  requirements: string;
  features: string[];
  free: string;
  perMonth: (credits: number) => string;
  packName: Record<string, string>;
  packCredits: (credits: number) => string;
};

const fmt = (n: number, lang: Lang) => n.toLocaleString(lang === "en" ? "en-US" : "pt-BR");

const COPY: Record<Lang, Copy> = {
  pt: {
    description:
      "Extensão para SketchUp que transforma a vista do modelo em render fotorrealista com inteligência artificial em menos de um minuto, dentro do próprio SketchUp. Sem placa de vídeo e sem exportar o arquivo.",
    requirements: "SketchUp 2023 ou mais novo, no Windows ou no macOS, com conexão à internet",
    features: [
      "Render fotorrealista com IA de fachadas, interiores, espaços comerciais, edifícios e paisagismo",
      "Controle de luz, clima, distância focal e formato da imagem",
      "Edição de partes do render com máscara",
      "Novos ângulos e closes a partir de um render",
      "Ampliação para 4K",
      "Decoração de ambientes vazios, planta humanizada, moodboard e diagrama",
      "Vídeo com IA e panorama 360°",
      "Bloco 3D a partir de uma imagem de referência",
      "Ferramentas locais grátis, sem gastar créditos: reflexo de espelho, luz fake, otimizar arquivo e pisos seamless",
    ],
    free: `Grátis: ${WELCOME_CREDITS} créditos para testar, sem cartão`,
    perMonth: (c) => `${fmt(c, "pt")} créditos por mês`,
    packName: { mini: "Pacote Mini", basico: "Pacote Básico", "pro-pack": "Pacote PRO", empresa: "Pacote Empresa" },
    packCredits: (c) => `${fmt(c, "pt")} créditos que não expiram`,
  },
  en: {
    description:
      "SketchUp extension that turns the view of your model into a photorealistic AI render in under a minute, right inside SketchUp. No GPU needed and no exporting.",
    requirements: "SketchUp 2023 or newer, on Windows or macOS, with an internet connection",
    features: [
      "Photorealistic AI renders of exteriors, interiors, commercial spaces, buildings and landscapes",
      "Control of lighting, weather, focal length and aspect ratio",
      "Masked edits of parts of a render",
      "New angles and close-ups from a render",
      "4K upscale",
      "Virtual staging of empty rooms, rendered floor plans, moodboards and diagrams",
      "AI video and 360° panoramas",
      "3D component from a reference image",
      "Free local tools that use no credits: mirror reflections, fake lights, file optimizer and seamless floor tiles",
    ],
    free: `Free: ${WELCOME_CREDITS} credits to try, no card`,
    perMonth: (c) => `${fmt(c, "en")} credits per month`,
    packName: { mini: "Mini pack", basico: "Basic pack", "pro-pack": "PRO pack", empresa: "Enterprise pack" },
    packCredits: (c) => `${fmt(c, "en")} credits that never expire`,
  },
  es: {
    description:
      "Extensión para SketchUp que convierte la vista de tu modelo en un render fotorrealista con inteligencia artificial en menos de un minuto, dentro de SketchUp. Sin tarjeta gráfica y sin exportar.",
    requirements: "SketchUp 2023 o posterior, en Windows o macOS, con conexión a internet",
    features: [
      "Render fotorrealista con IA de fachadas, interiores, locales comerciales, edificios y paisajismo",
      "Control de luz, clima, distancia focal y formato",
      "Edición de partes del render con máscara",
      "Nuevos ángulos y primeros planos a partir de un render",
      "Ampliación a 4K",
      "Amueblado de espacios vacíos, plantas renderizadas, moodboards y diagramas",
      "Video con IA y panorama 360°",
      "Componente 3D a partir de una imagen de referencia",
      "Herramientas locales gratuitas, sin gastar créditos: reflejo de espejo, luz falsa, optimizar archivo y pisos seamless",
    ],
    free: `Gratis: ${WELCOME_CREDITS} créditos para probar, sin tarjeta`,
    perMonth: (c) => `${fmt(c, "es")} créditos al mes`,
    packName: { mini: "Paquete Mini", basico: "Paquete Básico", "pro-pack": "Paquete PRO", empresa: "Paquete Empresa" },
    packCredits: (c) => `${fmt(c, "es")} créditos que no caducan`,
  },
};

const PLAN_NAME: Record<string, string> = { starter: "Starter", pro: "PRO", business: "Business" };

/** 29 -> "29", 11.9 -> "11.90": o schema.org quer ponto decimal, sem símbolo. */
function schemaPrice(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

export function softwareApplicationJsonLd(lang: Lang) {
  const copy = COPY[lang];
  const currency = langToCurrency[lang];
  const pricingUrl = absoluteUrl(lang, "/#pricing");

  const plans = planData
    .filter((p) => p.id in PLAN_CREDITS)
    .map((p) => {
      const price = schemaPrice(parsePriceToNumber(p.monthly[currency]));
      return {
        "@type": "Offer",
        name: PLAN_NAME[p.id],
        description: copy.perMonth(PLAN_CREDITS[p.id]),
        price,
        priceCurrency: currency,
        url: pricingUrl,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: currency,
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "MON",
        },
      };
    });

  const packs = packData.map((p) => ({
    "@type": "Offer",
    name: copy.packName[p.id],
    description: copy.packCredits(PACK_CREDITS[p.id]),
    price: schemaPrice(parsePriceToNumber(p.monthly[currency])),
    priceCurrency: currency,
    url: pricingUrl,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "Vizai Render",
    url: absoluteUrl(lang, "/"),
    description: copy.description,
    image: `${SITE_URL}/og.png`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Windows, macOS",
    softwareRequirements: copy.requirements,
    inLanguage: ["pt-BR", "en", "es"],
    featureList: copy.features,
    downloadUrl: absoluteUrl(lang, "/download"),
    offers: [
      {
        "@type": "Offer",
        name: copy.free,
        price: "0",
        priceCurrency: currency,
        url: absoluteUrl(lang, "/download"),
      },
      ...plans,
      ...packs,
    ],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
