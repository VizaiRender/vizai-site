import { ArticlePage, articleMetadata } from "@/components/pages/article-page";
import { ARTICLES } from "@/lib/treinamento";
import { PREFIXED_LANGS } from "@/lib/routes";
import { langParam } from "@/lib/lang-param";

export function generateStaticParams() {
  return PREFIXED_LANGS.flatMap((lang) =>
    ARTICLES.map((a) => ({ lang, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const lang = await langParam(params);
  return articleMetadata(lang, slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const lang = await langParam(params);
  return <ArticlePage slug={slug} lang={lang} />;
}
