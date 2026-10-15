import { BlogPostPage, blogPostMetadata } from "@/components/pages/blog-post-page";
import { postsIn } from "@/lib/blog";

export function generateStaticParams() {
  return postsIn("pt").map((p) => ({ slug: p.slug }));
}

// Post fora da lista vira 404 pronta, sem montar a página. Ver o comentário em
// [lang]/layout.tsx. Post removido precisa de 301 no next.config, como os guias.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return blogPostMetadata("pt", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} lang="pt" />;
}
