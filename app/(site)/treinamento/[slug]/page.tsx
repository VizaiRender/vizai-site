import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/footer";
import { TreinamentoArticle } from "@/components/ui/treinamento-article";
import {
  ARTICLES,
  getArticleContent,
  getArticleMeta,
  resolveSrc,
} from "@/lib/treinamento";

const SITE = "https://vizairender.com";

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
  if (!content) return { title: "Treinamento" };
  return {
    title: content.title,
    description: content.excerpt,
    alternates: { canonical: `/treinamento/${slug}` },
    openGraph: {
      title: `${content.title} | Vizai Render`,
      description: content.excerpt,
      url: `/treinamento/${slug}`,
      type: "article",
    },
  };
}

// Article + trilha de navegação. O @id da Organization vem do JSON-LD do
// layout raiz: os dois blocos convivem na mesma página, então o Google resolve
// a referência sem precisar repetir os dados da empresa aqui.
//
// Sem datePublished/dateModified de propósito: não existe data real por artigo
// no conteúdo, e inventar uma seria pior que omitir. A trilha (BreadcrumbList)
// é o que de fato aparece no resultado de busca, e ela não depende de data.
function articleJsonLd(slug: string, title: string, description: string, image: string) {
  const url = `${SITE}/treinamento/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        image: `${SITE}${image}`,
        inLanguage: "pt-BR",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Treinamento",
            item: `${SITE}/treinamento`,
          },
          // O último degrau é a página atual e, por especificação, não leva item.
          { "@type": "ListItem", position: 3, name: title },
        ],
      },
    ],
  };
}

export default async function TreinamentoArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ARTICLES.some((a) => a.slug === slug)) notFound();

  const content = getArticleContent(slug, "pt");
  const meta = getArticleMeta(slug);
  const jsonLd =
    content && meta
      ? articleJsonLd(
          slug,
          content.title,
          content.excerpt,
          resolveSrc(meta.cover, "pt"),
        )
      : null;

  return (
    <main className="flex flex-col min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

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
