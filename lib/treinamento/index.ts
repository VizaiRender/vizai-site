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
  // Aulas em vídeo com texto completo (não aparecem como grade: a página de
  // Treinamento mostra o player, e é de lá que se chega nestas páginas).
  { slug: "primeiro-render", category: "aulas", cover: "/treinamento/capas/primeiro-render.jpg", minutes: 12, aula: "primeiro-render" },
  { slug: "reflexo-espelho", category: "aulas", cover: "/treinamento/capas/reflexo-e-luz-fake.jpg", minutes: 8, aula: "reflexo-e-luz-fake" },
  { slug: "otimizar-arquivo", category: "aulas", cover: "/treinamento/capas/otimizar-arquivo.jpg", minutes: 5, aula: "otimizar-arquivo" },
  { slug: "pisos-seamless", category: "aulas", cover: "/treinamento/capas/texturas-seamless.jpg", minutes: 4, aula: "texturas-seamless" },
  { slug: "video-com-ia", category: "aulas", cover: "/treinamento/capas/gerando-videos.jpg", minutes: 6, aula: "gerando-videos" },
  { slug: "panorama-360", category: "aulas", cover: "/treinamento/capas/imagem-360.jpg", minutes: 5, aula: "imagem-360" },
  { slug: "blocos-3d", category: "aulas", cover: "/treinamento/capas/gerando-blocos.jpg", minutes: 4, aula: "gerando-blocos" },
  { slug: "historico", category: "aulas", cover: "/treinamento/capas/historico.jpg", minutes: 4, aula: "historico" },
  // IA Criativa
  { slug: "decorar-ambiente", category: "creative", cover: "/tools/tool-07.jpg", minutes: 4 },
  { slug: "planta-humanizada", category: "creative", cover: "/tools/tool-08.jpg", minutes: 4 },
  { slug: "diagrama", category: "creative", cover: "/tools/tool-09.webp", minutes: 4 },
  { slug: "moodboard", category: "creative", cover: "/tools/tool-06.jpg", minutes: 4 },
];

export const CATEGORY_ORDER: CategoryId[] = [
  "start",
  "creative",
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
