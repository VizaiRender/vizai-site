// Tipos do conteúdo da página de Treinamento.
// Conteúdo em si fica em pt.ts / en.ts / es.ts (mesmo padrão do lib/legal.ts).

export type TreinoBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: { title: string; text?: string }[] }
  | { type: "tip"; text: string }
  | { type: "warn"; text: string }
  | { type: "cost"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string; ui?: boolean }
  | {
      type: "imgrow";
      images: { src: string; alt: string; caption?: string }[];
      ui?: boolean;
    }
  | { type: "video"; src: string; caption?: string }
  | {
      type: "compare";
      before: { src: string; label: string };
      after: { src: string; label: string };
      aspect?: string;
    }
  | { type: "table"; head: string[]; rows: string[][] };

export type ArticleContent = {
  title: string;
  excerpt: string;
  blocks: TreinoBlock[];
};

export type CategoryId = "start" | "render" | "creative" | "present" | "free" | "aulas";

export type ArticleMeta = {
  slug: string;
  category: CategoryId;
  /** Capa do card no índice. Aceita {lang} para screenshots da UI. */
  cover: string;
  /** Tempo de leitura em minutos. */
  minutes: number;
  /** Slug da aula em vídeo, quando a página tem o vídeo no topo. */
  aula?: string;
};

export type TreinoUiStrings = {
  badge: string;
  title: string;
  subtitle: string;
  featuredLabel: string;
  readMore: string;
  minRead: string;
  backToIndex: string;
  prevArticle: string;
  nextArticle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDownload: string;
  ctaSignup: string;
  categories: Record<CategoryId, string>;
};
