import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/footer";
import { BlogPost } from "@/components/ui/blog-post";
import { getBlogUi, getPostContent, getPostMeta, postLangs } from "@/lib/blog";
import { resolveSrc } from "@/lib/treinamento";
import {
  DEFAULT_LANG,
  HREFLANG,
  OG_LOCALE,
  SITE_URL,
  absoluteUrl,
  localePath,
  type Lang,
} from "@/lib/routes";

const HOME_LABEL: Record<Lang, string> = { pt: "Início", en: "Home", es: "Inicio" };

/** hreflang só para os idiomas em que o post existe: traduzir para um endereço
 *  que dá 404 vira erro no Search Console e desperdiça o rastreio. */
function postAlternates(lang: Lang, path: string, langs: Lang[]) {
  const languages: Record<string, string> = {};
  for (const l of langs) languages[HREFLANG[l]] = localePath(l, path);
  languages["x-default"] = localePath(langs.includes(DEFAULT_LANG) ? DEFAULT_LANG : langs[0], path);
  return { canonical: localePath(lang, path), languages };
}

export function blogPostMetadata(lang: Lang, slug: string) {
  const meta = getPostMeta(slug);
  const content = getPostContent(slug, lang);
  if (!meta || !content) return {};
  const path = `/blog/${slug}`;
  const langs = postLangs(slug);
  const image = `${SITE_URL}${resolveSrc(meta.cover, lang)}`;
  return {
    title: content.title,
    description: content.excerpt,
    alternates: postAlternates(lang, path, langs),
    openGraph: {
      title: `${content.title} | Vizai Render`,
      description: content.excerpt,
      url: localePath(lang, path),
      type: "article" as const,
      siteName: "Vizai Render",
      locale: OG_LOCALE[lang],
      alternateLocale: langs.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      publishedTime: meta.published,
      modifiedTime: meta.updated,
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${content.title} | Vizai Render`,
      description: content.excerpt,
      images: [image],
    },
  };
}

// BlogPosting + trilha + perguntas frequentes. O @id da Organization vem do
// JSON-LD do layout raiz, como nos guias do Treinamento. Aqui há data real de
// publicação e de atualização, então elas entram (nos guias não entram porque
// lá não existe data por artigo).
function postJsonLd(lang: Lang, slug: string) {
  const meta = getPostMeta(slug)!;
  const content = getPostContent(slug, lang)!;
  const url = absoluteUrl(lang, `/blog/${slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: content.title,
        description: content.excerpt,
        image: `${SITE_URL}${resolveSrc(meta.cover, lang)}`,
        datePublished: meta.published,
        dateModified: meta.updated,
        inLanguage: HREFLANG[lang],
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${absoluteUrl(lang, "/blog")}#blog` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: HOME_LABEL[lang], item: absoluteUrl(lang, "/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(lang, "/blog") },
          { "@type": "ListItem", position: 3, name: content.title },
        ],
      },
      ...(content.faq && content.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: HREFLANG[lang],
              mainEntity: content.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };
}

export function BlogPostPage({ slug, lang }: { slug: string; lang: Lang }) {
  if (!getPostContent(slug, lang)) notFound();

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(lang, slug)) }}
      />
      <section className="flex-1 max-w-3xl mx-auto px-6 pb-16 w-full" style={{ paddingTop: "160px" }}>
        <BlogPost slug={slug} />
      </section>
      <Footer />
    </main>
  );
}

// Usado pela página do índice: a lista de posts também vai em JSON-LD, para o
// robô entender a página como o blog do site e não como uma página solta.
export function blogIndexJsonLd(lang: Lang, slugs: string[]) {
  const url = absoluteUrl(lang, "/blog");
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: getBlogUi(lang).title,
    url,
    inLanguage: HREFLANG[lang],
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: slugs.map((slug) => ({ "@id": `${absoluteUrl(lang, `/blog/${slug}`)}#post` })),
  };
}
