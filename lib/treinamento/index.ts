import type { Lang } from "@/app/components/LanguageProvider";
import type {
  ArticleContent,
  ArticleMeta,
  CategoryId,
  TreinoUiStrings,
} from "./types";
import { ptArticles, ptUi } from "./pt";
import { enArticles, enUi } from "./en";
import { esArticles, esUi } from "./es";

export type { TreinoBlock, ArticleMeta, CategoryId } from "./types";

// Ordem define a navegação (anterior/próximo) e a listagem dentro de cada categoria.
export const ARTICLES: ArticleMeta[] = [
  // Comece aqui
  { slug: "primeiros-passos", category: "start", cover: "/demo/render.webp", minutes: 9 },
  // Render
  { slug: "preparando-a-cena", category: "render", cover: "/compare2-before.jpg", minutes: 6 },
  { slug: "primeiro-render", category: "render", cover: "/tools/tool-01.jpg", minutes: 6 },
  { slug: "editar-render", category: "render", cover: "/tools/tool-02.jpg", minutes: 8 },
  { slug: "reflexo-espelho", category: "render", cover: "/treinamento/ui/reflexo-espelho-capa.jpg", minutes: 4 },
  { slug: "luz-fake", category: "render", cover: "/treinamento/ui/luz-fake-capa.jpg", minutes: 4 },
  // IA Criativa
  { slug: "decorar-ambiente", category: "creative", cover: "/tools/tool-07.jpg", minutes: 4 },
  { slug: "planta-humanizada", category: "creative", cover: "/tools/tool-08.jpg", minutes: 4 },
  { slug: "diagrama", category: "creative", cover: "/tools/tool-09.webp", minutes: 4 },
  { slug: "moodboard", category: "creative", cover: "/tools/tool-06.jpg", minutes: 4 },
  // Apresentação
  { slug: "video-com-ia", category: "present", cover: "/demo/capa-video.webp", minutes: 6 },
  { slug: "panorama-360", category: "present", cover: "/demo/360/pano-result.webp", minutes: 5 },
  { slug: "blocos-3d", category: "present", cover: "/tools/tool-05.webp", minutes: 4 },
  // Ferramentas grátis
  { slug: "otimizar-arquivo", category: "free", cover: "/treinamento/ui/tools-otimizar-{lang}.webp", minutes: 5 },
  { slug: "pisos-seamless", category: "free", cover: "/treinamento/ui/tools-pisos-{lang}.webp", minutes: 4 },
];

export const CATEGORY_ORDER: CategoryId[] = [
  "start",
  "render",
  "creative",
  "present",
  "free",
];

const CONTENT: Record<Lang, Record<string, ArticleContent>> = {
  pt: ptArticles,
  en: enArticles,
  es: esArticles,
};

const UI: Record<Lang, TreinoUiStrings> = {
  pt: ptUi,
  en: enUi,
  es: esUi,
};

export function getTreinoUi(lang: Lang): TreinoUiStrings {
  return UI[lang] ?? UI.pt;
}

export function getArticleContent(
  slug: string,
  lang: Lang,
): ArticleContent | null {
  const dict = CONTENT[lang] ?? CONTENT.pt;
  return dict[slug] ?? null;
}

export function getArticleMeta(slug: string): ArticleMeta | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

/** Substitui o placeholder {lang} nos caminhos de screenshots da UI. */
export function resolveSrc(src: string, lang: Lang): string {
  return src.replace("{lang}", lang);
}

export function getAdjacentArticles(slug: string): {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
} {
  const idx = ARTICLES.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ARTICLES[idx - 1] : null,
    next: idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null,
  };
}
