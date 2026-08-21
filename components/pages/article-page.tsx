import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/footer";
import { TreinamentoArticle } from "@/components/ui/treinamento-article";
import {
  ARTICLES,
  getArticleContent,
  getArticleMeta,
  resolveSrc,
} from "@/lib/treinamento";
import { pageSeo } from "@/lib/seo";
import {
  HREFLANG,
  SITE_URL,
  absoluteUrl,
  alternatesFor,
  localePath,
  LANGS,
  OG_LOCALE,
  type Lang,
} from "@/lib/routes";

/**
 * Metadata de um artigo de treinamento. Título e resumo saem do próprio
 * conteúdo traduzido — os 16 guias já existem nos três idiomas.
 */
export function articleMetadata(lang: Lang, slug: string) {
  const content = getArticleContent(slug, lang);
  const path = `/treinamento/${slug}`;
  if (!content) return { title: pageSeo(lang, "treinamento").title };
  return {
    title: content.title,
    description: content.excerpt,
    alternates: alternatesFor(lang, path),
    openGraph: {
      title: `${content.title} | Vizai Render`,
      description: content.excerpt,
      url: localePath(lang, path),
      type: "article" as const,
      siteName: "Vizai Render",
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [`${SITE_URL}/og.png`],
    },
  };
}

const HOME_LABEL: Record<Lang, string> = {
  pt: "Início",
  en: "Home",
  es: "Inicio",
};

// Article + trilha de navegação. O @id da Organization vem do JSON-LD do
// layout raiz: os dois blocos convivem na mesma página, então o Google resolve
// a referência sem precisar repetir os dados da empresa aqui.
//
// Sem datePublished/dateModified de propósito: não existe data real por artigo
// no conteúdo, e inventar uma seria pior que omitir. A trilha (BreadcrumbList)
// é o que de fato aparece no resultado de busca, e ela não depende de data.
function articleJsonLd(
  lang: Lang,
  slug: string,
  title: string,
  description: string,
  image: string,
) {
  const url = absoluteUrl(lang, `/treinamento/${slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        image: `${SITE_URL}${image}`,
        inLanguage: HREFLANG[lang],
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: HOME_LABEL[lang],
            item: absoluteUrl(lang, "/"),
          },
          {
            // Rótulo CURTO ("Treinamento"), não o título da página. Esta trilha
            // é o que o Google desenha no resultado de busca; com o H1 inteiro
            // ("Aprenda a dominar o Vizai Render") ela fica ilegível.
            "@type": "ListItem",
            position: 2,
            name: pageSeo(lang, "treinamento").title,
            item: absoluteUrl(lang, "/treinamento"),
          },
          // O último degrau é a página atual e, por especificação, não leva item.
          { "@type": "ListItem", position: 3, name: title },
        ],
      },
    ],
  };
}

export function ArticlePage({ slug, lang }: { slug: string; lang: Lang }) {
  if (!ARTICLES.some((a) => a.slug === slug)) notFound();

  const content = getArticleContent(slug, lang);
  const meta = getArticleMeta(slug);
  const jsonLd =
    content && meta
      ? articleJsonLd(
          lang,
          slug,
          content.title,
          content.excerpt,
          resolveSrc(meta.cover, lang),
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
