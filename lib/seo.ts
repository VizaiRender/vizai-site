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
      title: "Baixar plugin",
      description:
        "Baixe o plugin Vizai Render para SketchUp. Instalação em menos de 1 minuto.",
    },
    treinamento: {
      title: "Treinamento",
      description:
        "Guias completos de todas as ferramentas do Vizai Render: render com IA, edição, vídeo, panorama 360°, blocos 3D, IA criativa e ferramentas gratuitas. Passo a passo com imagens reais.",
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
      title: "Download the plugin",
      description:
        "Download the Vizai Render plugin for SketchUp. Installs in under a minute.",
    },
    treinamento: {
      title: "Training",
      description:
        "Complete guides to every Vizai Render tool: AI rendering, editing, video, 360° panoramas, 3D blocks, creative AI and the free tools. Step by step, with real screenshots.",
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
      title: "Descargar el plugin",
      description:
        "Descarga el plugin Vizai Render para SketchUp. Se instala en menos de un minuto.",
    },
    treinamento: {
      title: "Capacitación",
      description:
        "Guías completas de todas las herramientas de Vizai Render: render con IA, edición, video, panorama 360°, bloques 3D, IA creativa y herramientas gratuitas. Paso a paso, con imágenes reales.",
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
