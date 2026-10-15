"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import GradientBordersButton from "@/components/ui/gradient-borders-button";
import { useLang, useHref } from "@/app/components/LanguageProvider";
import { resolveSrc } from "@/lib/treinamento";
import { formatPostDate, getBlogUi, getPostContent, postsIn, type PostMeta } from "@/lib/blog";

function PostCard({ meta, featured }: { meta: PostMeta; featured?: boolean }) {
  const { lang } = useLang();
  const href = useHref();
  const ui = getBlogUi(lang);
  const content = getPostContent(meta.slug, lang);
  if (!content) return null;

  return (
    <Link
      href={href(`/blog/${meta.slug}`)}
      className={`group flex flex-col rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
        featured ? "md:flex-row" : ""
      }`}
      style={{ border: "1px solid var(--border)", backgroundColor: "rgba(128,128,128,0.04)" }}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "md:w-1/2 aspect-video md:aspect-auto md:min-h-[320px]" : "aspect-video"
        }`}
      >
        <Image
          src={resolveSrc(meta.cover, lang)}
          alt={content.title}
          fill
          priority={featured}
          sizes={featured ? "(max-width: 768px) 100vw, 560px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className={`flex flex-col flex-1 p-5 ${featured ? "md:p-8 md:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ color: "#0940D2", backgroundColor: "rgba(9,64,210,0.10)" }}
          >
            {ui.categories[meta.category]}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--foreground-muted)" }}>
            <Clock size={11} />
            {meta.minutes} {ui.minRead}
          </span>
          <time dateTime={meta.updated} className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>
            {formatPostDate(meta.updated, lang)}
          </time>
        </div>

        {/* H2 e não H3: no índice, cada post é uma seção da página. */}
        <h2
          className={`font-bold tracking-tight mb-2 ${featured ? "text-xl md:text-2xl" : "text-base"}`}
          style={{ color: "var(--foreground)" }}
        >
          {content.title}
        </h2>
        <p
          className={`leading-relaxed mb-4 ${featured ? "text-sm md:text-base" : "text-sm"}`}
          style={{ color: "var(--foreground-muted)" }}
        >
          {content.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#0940D2" }}>
          {ui.readMore}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function BlogIndex() {
  const { lang } = useLang();
  const ui = getBlogUi(lang);
  const posts = postsIn(lang);
  const [first, ...rest] = posts;

  return (
    <>
      <div className="flex flex-col items-center text-center mb-14">
        <GradientBordersButton className="mb-6">{ui.badge}</GradientBordersButton>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl"
          style={{ color: "var(--foreground)" }}
        >
          {ui.title}
        </h1>
        <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
          {ui.subtitle}
        </p>
      </div>

      {first && <PostCard meta={first} featured />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {rest.map((meta) => (
            <PostCard key={meta.slug} meta={meta} />
          ))}
        </div>
      )}
    </>
  );
}
