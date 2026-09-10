import { ArticlePage, articleMetadata } from "@/components/pages/article-page";
import { ARTICLES } from "@/lib/treinamento";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

// Aula ou guia fora de ARTICLES vira 404 pronta, sem montar a página. Ver o
// comentário em [lang]/layout.tsx. Guia removido continua precisando do 301 no
// next.config.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return articleMetadata("pt", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePage slug={slug} lang="pt" />;
}
