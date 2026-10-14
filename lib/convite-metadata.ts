import type { Metadata } from "next";
import { OG_LOCALE, type Lang } from "./routes";
import { OG_IMAGE } from "./seo";
import { conviteTexts } from "./convite";

// Metadata da página do convite. Fica fora do lib/seo.ts porque é a única
// página que NÃO vai para o índice: cada código seria um endereço diferente
// com o mesmo conteúdo, e o Google trataria como página repetida. Também fica
// fora do sitemap. O que importa aqui é a prévia do link no WhatsApp, que é por
// onde o convite chega: título, descrição e imagem (repetida porque o Next não
// funde o openGraph do layout raiz, ver buildMetadata).
export function conviteMetadata(lang: Lang): Metadata {
  const t = conviteTexts(lang);
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "Vizai Render",
      title: t.metaTitle,
      description: t.metaDescription,
      locale: OG_LOCALE[lang],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}
