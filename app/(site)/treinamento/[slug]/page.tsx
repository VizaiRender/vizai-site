import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/footer";
import { TreinamentoArticle } from "@/components/ui/treinamento-article";
import { ARTICLES, getArticleContent } from "@/lib/treinamento";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getArticleContent(slug, "pt");
  if (!content) return { title: "Treinamento | Vizai Render" };
  return {
    title: `${content.title} | Treinamento Vizai Render`,
    description: content.excerpt,
  };
}

export default async function TreinamentoArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ARTICLES.some((a) => a.slug === slug)) notFound();

  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex-1 max-w-3xl mx-auto px-6 pb-16 w-full"
        style={{ paddingTop: "160px" }}
      >
        <TreinamentoArticle slug={slug} />
      </section>

      <Footer />
    </main>
  );
}
