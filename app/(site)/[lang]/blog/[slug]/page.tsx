import { BlogPostPage, blogPostMetadata } from "@/components/pages/blog-post-page";
import { postsIn } from "@/lib/blog";
import { PREFIXED_LANGS } from "@/lib/routes";
import { langParam } from "@/lib/lang-param";

// Só os posts que existem naquele idioma: post sem tradução não gera página.
export function generateStaticParams() {
  return PREFIXED_LANGS.flatMap((lang) => postsIn(lang).map((p) => ({ lang, slug: p.slug })));
}

// Idioma ou post fora da lista vira 404 pronta. Ver o comentário em [lang]/layout.tsx.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const lang = await langParam(params);
  return blogPostMetadata(lang, slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const lang = await langParam(params);
  return <BlogPostPage slug={slug} lang={lang} />;
}
