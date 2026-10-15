// Tipos do blog. O corpo de cada post usa os mesmos blocos dos guias do
// Treinamento (TreinoBlock), desenhados pelo mesmo componente: um recurso novo
// de conteúdo serve aos dois.

import type { TreinoBlock } from "@/lib/treinamento/types";

export type BlogCategory = "comparacao" | "casos" | "novidades";

export type PostMeta = {
  slug: string;
  category: BlogCategory;
  /** Capa do card e da prévia do link. Aceita {lang}, como nos guias. */
  cover: string;
  /** ISO 8601 COM hora e fuso: o Search Console reclama de data sem fuso. */
  published: string;
  /** Mesma regra. Mudou o conteúdo de verdade, muda aqui (e só então). */
  updated: string;
  /** Tempo de leitura em minutos. */
  minutes: number;
};

export type PostContent = {
  /** Título da página e do H1. Com a pergunta ou o termo que a pessoa busca. */
  title: string;
  /** Vira a meta description e a chamada do card: até ~155 caracteres. */
  excerpt: string;
  blocks: TreinoBlock[];
  /** Perguntas do fim do post. Saem na página E no FAQPage do JSON-LD, iguais. */
  faq?: { q: string; a: string }[];
};

export type BlogUi = {
  badge: string;
  title: string;
  subtitle: string;
  readMore: string;
  minRead: string;
  backToIndex: string;
  updatedOn: string;
  faqTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDownload: string;
  ctaSignup: string;
  categories: Record<BlogCategory, string>;
};
