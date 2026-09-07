// Títulos e descrições que aparecem no Google e na prévia de link, por idioma.
//
// Isto vive fora do `lib/i18n.tsx` de propósito: aquele dicionário é "use
// client" (useT roda no navegador) e metadata é resolvido no servidor. Se
// dependesse do outro, o título voltaria a sair sempre em português.

import type { Metadata } from "next";
import type { Lang } from "./routes";
import { alternatesFor, localePath, OG_LOCALE, LANGS, SITE_URL } from "./routes";

// PNG estático de propósito: a geração em runtime (next/og) dava 500 no
// Cloudflare e o preview do link ficava sem imagem no WhatsApp/Messenger.
const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Vizai Render",
} as const;

export interface PageSeo {
  title: string;
  description: string;
}

type PageId = "home" | "download" | "treinamento" | "privacy" | "terms";

export const SEO: Record<Lang, Record<PageId, PageSeo>> = {
  pt: {
    home: {
      title: "Vizai Render: Renders fotorrealistas com IA",
      description:
        "Transforme modelos 3D do SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
    },
    download: {
      title: "Plugin de render com IA para SketchUp",
      description:
        "Instale no SketchUp em menos de 1 minuto, no Windows ou no Mac, do SketchUp 2023 em diante. São 8 créditos grátis no primeiro login.",
    },
    treinamento: {
      title: "8 aulas em vídeo de render com IA",
      description:
        "8 aulas em vídeo com legenda: primeiro render, reflexo de espelho, luz fake, textura seamless, vídeo com IA, panorama 360 e blocos 3D.",
    },
    privacy: {
      title: "Política de Privacidade",
      description: "Política de Privacidade do Vizai Render.",
    },
    terms: {
      title: "Termos de Serviço",
      description: "Termos de Serviço do Vizai Render.",
    },
  },
  en: {
    home: {
      title: "Vizai Render: Photorealistic AI renders for SketchUp",
      description:
        "Turn your SketchUp 3D models into photorealistic renders in seconds with artificial intelligence. No expensive GPU, no exporting to another program.",
    },
    download: {
      title: "AI rendering plugin for SketchUp",
      description:
        "Install it in SketchUp in under a minute, on Windows or Mac, SketchUp 2023 and up. You get 8 free credits on your first login.",
    },
    treinamento: {
      title: "8 video lessons on AI rendering",
      description:
        "8 subtitled video lessons: first render, mirror reflections, fake light, seamless textures, AI video, 360 panorama and 3D blocks.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "Vizai Render's Privacy Policy.",
    },
    terms: {
      title: "Terms of Service",
      description: "Vizai Render's Terms of Service.",
    },
  },
  es: {
    home: {
      title: "Vizai Render: Renders fotorrealistas con IA para SketchUp",
      description:
        "Convierte tus modelos 3D de SketchUp en renders fotorrealistas en segundos con inteligencia artificial. Sin GPU cara y sin exportar a otro programa.",
    },
    download: {
      title: "Plugin de render con IA para SketchUp",
      description:
        "Instálalo en SketchUp en menos de un minuto, en Windows o Mac, desde SketchUp 2023. Son 8 créditos gratis en el primer inicio de sesión.",
    },
    treinamento: {
      title: "8 clases en video de render con IA",
      description:
        "8 clases en video con subtítulos: primer render, reflejo de espejo, luz fake, textura seamless, video con IA, panorama 360 y bloques 3D.",
    },
    privacy: {
      title: "Política de Privacidad",
      description: "Política de Privacidad de Vizai Render.",
    },
    terms: {
      title: "Términos de Servicio",
      description: "Términos de Servicio de Vizai Render.",
    },
  },
};

export function pageSeo(lang: Lang, page: PageId): PageSeo {
  return SEO[lang][page];
}

// ---------------------------------------------------------------------------

/**
 * Metadata de uma página pública: título/descrição no idioma certo, canonical
 * apontando pra ela mesma, hreflang recíproco pros três idiomas e og:locale
 * coerente.
 *
 * `path` é sempre o caminho canônico em português (ex.: "/download"); quem
 * traduz o endereço é o `localePath`.
 */
export function buildMetadata(
  lang: Lang,
  page: PageId,
  path: string,
  extra?: { ogType?: "website" | "article" },
): Metadata {
  const { title, description } = pageSeo(lang, page);
  // A home usa o título inteiro (sem o sufixo "| Vizai Render" do template),
  // porque a marca já está escrita nele.
  const resolvedTitle = page === "home" ? { absolute: title } : title;

  return {
    title: resolvedTitle,
    description,
    alternates: alternatesFor(lang, path),
    // Atenção: o Next NÃO funde `openGraph` em profundidade — o bloco da
    // página SUBSTITUI o do layout raiz. Por isso siteName e imagem são
    // repetidos aqui; sem eles, a prévia do link sairia sem imagem em toda
    // página que define og próprio.
    openGraph: {
      type: extra?.ogType ?? "website",
      siteName: "Vizai Render",
      title: page === "home" ? title : `${title} | Vizai Render`,
      description,
      url: localePath(lang, path),
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page === "home" ? title : `${title} | Vizai Render`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
