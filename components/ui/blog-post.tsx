"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useLang, useHref } from "@/app/components/LanguageProvider";
import { ArticleBlock } from "@/components/ui/treinamento-article";
import { formatPostDate, getBlogUi, getPostContent, getPostMeta } from "@/lib/blog";

export function BlogPost({ slug }: { slug: string }) {
  const { lang } = useLang();
  const href = useHref();
  const ui = getBlogUi(lang);
  const meta = getPostMeta(slug);
  const content = getPostContent(slug, lang);
  if (!meta || !content) return null;

  return (
    <article>
      <Link
        href={href("/blog")}
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
        style={{ color: "#0940D2" }}
      >
        <ArrowLeft size={15} />
        {ui.backToIndex}
      </Link>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ color: "#0940D2", backgroundColor: "rgba(9,64,210,0.10)" }}
        >
          {ui.categories[meta.category]}
        </span>
        <span
          className="inline-flex items-center gap-1 text-xs"
          style={{ color: "var(--foreground-muted)" }}
        >
          <Clock size={12} />
          {meta.minutes} {ui.minRead}
        </span>
        {/* Data visível de propósito: é o sinal de atualidade que buscador e
            assistente de IA leem na página, além do dateModified do JSON-LD. */}
        <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          {ui.updatedOn} <time dateTime={meta.updated}>{formatPostDate(meta.updated, lang)}</time>
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
        style={{ color: "var(--foreground)" }}
      >
        {content.title}
      </h1>
      <p
        className="text-base md:text-lg leading-relaxed mb-10"
        style={{ color: "var(--foreground-soft)" }}
      >
        {content.excerpt}
      </p>

      {content.blocks.map((block, i) => (
        <ArticleBlock key={i} block={block} lang={lang} />
      ))}

      {/* Perguntas do fim do post. O texto é o mesmo do FAQPage no JSON-LD:
          resposta diferente para robô e para pessoa é cloaking. */}
      {content.faq && content.faq.length > 0 && (
        <section className="mt-14">
          <ArticleBlock block={{ type: "h2", text: ui.faqTitle }} lang={lang} />
          {content.faq.map((item, i) => (
            <div key={i}>
              <ArticleBlock block={{ type: "h3", text: item.q }} lang={lang} />
              <ArticleBlock block={{ type: "p", text: item.a }} lang={lang} />
            </div>
          ))}
        </section>
      )}

      <div
        className="rounded-2xl p-8 md:p-10 text-center mt-12"
        style={{ backgroundColor: "#0940D2" }}
      >
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-white">
          {ui.ctaTitle}
        </h2>
        <p className="text-sm mb-6 text-white/75 max-w-xl mx-auto">{ui.ctaSubtitle}</p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0940D2] hover:bg-white/90 text-sm font-semibold px-6 py-3 rounded-full transition-colors w-full sm:w-auto sm:min-w-[190px]"
          >
            {ui.ctaSignup}
          </Link>
          <Link
            href={href("/download")}
            className="inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors border border-white/30 hover:bg-white/10 w-full sm:w-auto sm:min-w-[190px]"
          >
            {ui.ctaDownload}
          </Link>
        </div>
      </div>
    </article>
  );
}
