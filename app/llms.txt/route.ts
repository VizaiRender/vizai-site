// /llms.txt: resumo do site para assistentes de IA (ChatGPT, Claude, Perplexity,
// Gemini), no formato proposto em llmstxt.org. É texto puro, sem JavaScript, e é
// o que um assistente lê quando quer responder "o que é o Vizai Render, quanto
// custa e onde eu aprendo a usar" sem montar a página inteira.
//
// Em inglês de propósito: é a língua em que esses assistentes mais buscam, e o
// arquivo aponta para as versões em português e espanhol.
//
// Gerado no build a partir das mesmas fontes da página (lib/prices.ts e a lista
// de aulas), pelo mesmo motivo do sitemap.ts: um arquivo escrito à mão em
// public/ desencontraria do site no primeiro reajuste de preço ou aula nova.
// Os custos por operação vêm de OPERATION_CREDITS e VIDEO_CREDITS (lib/prices.ts).

import { ARTICLES, getArticleContent } from "@/lib/treinamento";
import { absoluteUrl } from "@/lib/routes";
import {
  OPERATION_CREDITS as C,
  PACK_CREDITS,
  packData,
  parsePriceToNumber,
  PLAN_CREDITS,
  planData,
  VIDEO_CREDITS,
  WELCOME_CREDITS,
} from "@/lib/prices";

export const dynamic = "force-static";

const usd = (s: string) => {
  const n = parsePriceToNumber(s);
  return `US$ ${Number.isInteger(n) ? n : n.toFixed(2)}`;
};
const num = (n: number) => n.toLocaleString("en-US");
const PLAN_NAME: Record<string, string> = { starter: "Starter", pro: "PRO", business: "Business" };
const PACK_NAME: Record<string, string> = { mini: "Mini", basico: "Basic", "pro-pack": "PRO", empresa: "Enterprise" };

function body(): string {
  const plans = planData
    .filter((p) => p.id in PLAN_CREDITS)
    .map(
      (p) =>
        `- ${PLAN_NAME[p.id]}: ${usd(p.monthly.USD)} per month for ${num(PLAN_CREDITS[p.id])} credits per month (${usd(p.annual.USD)} per month on yearly billing)`,
    );
  const packs = packData.map(
    (p) => `- ${PACK_NAME[p.id]} pack: ${num(PACK_CREDITS[p.id])} credits for ${usd(p.monthly.USD)}`,
  );
  const lessons = ARTICLES.map((a) => {
    const c = getArticleContent(a.slug, "en");
    return c ? `- [${c.title}](${absoluteUrl("en", `/treinamento/${a.slug}`)}): ${c.excerpt}` : null;
  }).filter(Boolean);

  return `# Vizai Render

> Vizai Render is an AI rendering extension for SketchUp, on Windows and macOS (SketchUp 2023 or newer). It turns the active SketchUp view into a photorealistic render in under a minute, inside the SketchUp panel, with no GPU and no exporting. The plugin and this site are available in English, Portuguese and Spanish.

## Key facts

- Product type: SketchUp extension (plugin). Rendering runs in the cloud: only the image of the current view is sent, and the .skp file stays on the user's computer.
- Requirements: SketchUp 2023 or newer, Windows or macOS, internet connection.
- Free trial: ${WELCOME_CREDITS} free credits on the first sign-in inside the plugin, no credit card.
- Credit costs: a 2K render or an AI edit with a mask costs ${C.render} credits, Creative AI modes cost ${C.creative}, 4K upscale costs ${C.upscale}, a 360° panorama costs ${C.panorama}, a 3D block costs ${C.block} and an AI video costs ${VIDEO_CREDITS[0].credits} to ${VIDEO_CREDITS[VIDEO_CREDITS.length - 1].credits} depending on its length.
- Plan credits renew every billing cycle. Credit packs never expire. Plans can be cancelled at any time from the plugin.
- Prices below are in US dollars. The Portuguese page shows prices in Brazilian reais and the Spanish page in euros.

## Plans

${plans.join("\n")}

## Credit packs (one-time, never expire)

${packs.join("\n")}

## Features

- Photorealistic AI renders of exteriors, interiors, commercial spaces, buildings and landscapes
- Control of lighting, weather, focal length and aspect ratio
- Masked edits, new angles and close-ups, 4K upscale
- Creative AI: virtual staging of empty rooms, rendered floor plans, moodboards and concept diagrams
- AI video and 360° panoramas from a render
- 3D component generated from a reference image
- Free local tools that use no credits: mirror reflections, fake LED and spot lights, file optimizer and seamless floor tiles

## Main pages

- [Home](${absoluteUrl("en", "/")}): product overview, before and after gallery, FAQ
- [Pricing](${absoluteUrl("en", "/#pricing")}): plans and credit packs
- [Download and installation](${absoluteUrl("en", "/download")}): how to install the plugin in SketchUp
- [Training](${absoluteUrl("en", "/treinamento")}): video lessons and guides
- [FAQ](${absoluteUrl("en", "/faq")}): pricing, credits, requirements, privacy and how Vizai compares with V-Ray, Enscape, Lumion, SketchUp AI Render, Veras and D5 Lite

## Lessons and guides

${lessons.join("\n")}

## Other languages

- Portuguese: ${absoluteUrl("pt", "/")}
- Spanish: ${absoluteUrl("es", "/")}

## Contact

- Support: suporte@vizairender.com
- General and partnerships: contato@vizairender.com
- YouTube (video lessons): https://www.youtube.com/@vizairender
- Instagram: https://instagram.com/vizairender
- TikTok: https://tiktok.com/@vizairender
- LinkedIn: https://www.linkedin.com/company/vizairender/
- G2 (reviews): https://www.g2.com/products/vizai-render/reviews
- Crunchbase: https://www.crunchbase.com/organization/vizai-render
- SourceForge: https://sourceforge.net/software/product/Vizai-Render/
`;
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
