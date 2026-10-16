import type { Lang } from "@/lib/routes";
import { LANGS } from "@/lib/routes";
import type { BlogUi, PostContent, PostMeta } from "./types";
import { ptPosts, ptUi } from "./pt";
import { enPosts, enUi } from "./en";
import { esPosts, esUi } from "./es";

export type { BlogCategory, PostContent, PostMeta } from "./types";

// Mais novo primeiro: é a ordem da página do blog. Post novo entra no topo.
export const POSTS: PostMeta[] = [
  {
    slug: "vray-enscape-lumion-ou-render-com-ia",
    category: "comparacao",
    cover: "/compare2-after.jpg",
    published: "2026-10-15T12:00:00-03:00",
    updated: "2026-10-15T12:00:00-03:00",
    minutes: 6,
  },
  {
    slug: "render-com-ia-no-sketchup",
    category: "comparacao",
    cover: "/compare3-after.jpg",
    published: "2026-10-15T12:00:00-03:00",
    updated: "2026-10-15T12:00:00-03:00",
    minutes: 6,
  },
  {
    slug: "renders-reais-feitos-no-vizai",
    category: "casos",
    cover: "/blog/renders-reais/fachada-pedra-escura-isx-maquetes.jpg",
    published: "2026-10-15T12:00:00-03:00",
    updated: "2026-10-15T12:00:00-03:00",
    minutes: 4,
  },
  {
    slug: "novidades-do-vizai",
    category: "novidades",
    cover: "/treinamento/capas/primeiro-render.jpg",
    published: "2026-10-15T12:00:00-03:00",
    updated: "2026-10-16T19:00:00-03:00",
    minutes: 5,
  },
];

const CONTENT: Record<Lang, Record<string, PostContent>> = {
  pt: ptPosts,
  en: enPosts,
  es: esPosts,
};

const UI: Record<Lang, BlogUi> = { pt: ptUi, en: enUi, es: esUi };

export function getBlogUi(lang: Lang): BlogUi {
  return UI[lang] ?? UI.pt;
}

/** Sem cair no português: post sem tradução não existe naquele idioma. */
export function getPostContent(slug: string, lang: Lang): PostContent | null {
  return CONTENT[lang]?.[slug] ?? null;
}

export function getPostMeta(slug: string): PostMeta | null {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

/** Idiomas em que o post existe. Página, sitemap e hreflang só listam estes:
 *  apontar a tradução para um endereço que dá 404 é erro no Search Console. */
export function postLangs(slug: string): Lang[] {
  return LANGS.filter((l) => getPostContent(slug, l));
}

export function postsIn(lang: Lang): PostMeta[] {
  return POSTS.filter((p) => getPostContent(p.slug, lang));
}

/** "15 de outubro de 2026" no idioma da página, lida no fuso de Brasília. */
export function formatPostDate(iso: string, lang: Lang): string {
  const locale = { pt: "pt-BR", en: "en-US", es: "es-ES" }[lang];
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
