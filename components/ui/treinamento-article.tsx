"use client";

import { AutoVideo } from "@/components/ui/auto-video";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Lightbulb,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { useLang, useHref, type Lang } from "@/app/components/LanguageProvider";
import {
  getAdjacentArticles,
  getArticleContent,
  getArticleMeta,
  getTreinoUi,
  resolveSrc,
  type TreinoBlock,
} from "@/lib/treinamento";

// Renderiza **negrito** dentro dos textos do conteúdo.
function richText(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold" style={{ color: "var(--foreground)" }}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function Figure({
  src,
  alt,
  caption,
  ui,
  lang,
}: {
  src: string;
  alt: string;
  caption?: string;
  ui?: boolean;
  lang: Lang;
}) {
  return (
    <figure className={`my-8 ${ui ? "max-w-[360px] mx-auto" : ""}`}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveSrc(src, lang)}
          alt={alt}
          loading="lazy"
          className="w-full h-auto block"
        />
      </div>
      {caption && (
        <figcaption
          className="text-center text-xs mt-3"
          style={{ color: "var(--foreground-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Block({ block, lang }: { block: TreinoBlock; lang: Lang }) {
  switch (block.type) {
    case "p":
      return (
        <p
          className="text-[15px] md:text-base leading-relaxed mb-5"
          style={{ color: "var(--foreground-muted)" }}
        >
          {richText(block.text)}
        </p>
      );

    case "h2":
      return (
        <h2
          className="text-2xl md:text-[1.7rem] font-bold tracking-tight mt-12 mb-5"
          style={{ color: "var(--foreground)" }}
        >
          {block.text}
        </h2>
      );

    case "ul":
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] md:text-base leading-relaxed">
              <span
                className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#0940D2" }}
              />
              <span style={{ color: "var(--foreground-muted)" }}>{richText(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="mb-8 space-y-5">
          {block.items.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold shrink-0 mt-0.5 text-white"
                style={{ backgroundColor: "#0940D2" }}
              >
                {i + 1}
              </span>
              <div>
                <div
                  className="text-[15px] md:text-base font-semibold mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {step.title}
                </div>
                {step.text && (
                  <p
                    className="text-sm md:text-[15px] leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {richText(step.text)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      );

    case "tip":
      return (
        <div
          className="flex gap-3 rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: "rgba(9,64,210,0.07)",
            border: "1px solid rgba(9,64,210,0.20)",
          }}
        >
          <Lightbulb size={18} className="shrink-0 mt-0.5" style={{ color: "#0940D2" }} />
          <p
            className="text-sm md:text-[15px] leading-relaxed"
            style={{ color: "var(--foreground)" }}
          >
            {richText(block.text)}
          </p>
        </div>
      );

    case "warn":
      return (
        <div
          className="flex gap-3 rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: "rgba(217,119,6,0.08)",
            border: "1px solid rgba(217,119,6,0.25)",
          }}
        >
          <TriangleAlert size={18} className="shrink-0 mt-0.5" style={{ color: "#d97706" }} />
          <p
            className="text-sm md:text-[15px] leading-relaxed"
            style={{ color: "var(--foreground)" }}
          >
            {richText(block.text)}
          </p>
        </div>
      );

    case "cost":
      return (
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 mb-6 text-sm font-semibold"
          style={{
            color: "#0940D2",
            backgroundColor: "rgba(9,64,210,0.10)",
            border: "1px solid rgba(9,64,210,0.20)",
          }}
        >
          <Zap size={15} />
          {block.text}
        </div>
      );

    case "img":
      return (
        <Figure
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          ui={block.ui}
          lang={lang}
        />
      );

    case "imgrow":
      return (
        <div
          className={`my-8 grid gap-4 ${
            block.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
          } ${block.ui ? "max-w-[760px] mx-auto" : ""}`}
        >
          {block.images.map((img, i) => (
            <figure key={i}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveSrc(img.src, lang)}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
              {img.caption && (
                <figcaption
                  className="text-center text-xs mt-3"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );

    case "video":
      return (
        <figure className="my-8">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <AutoVideo
              src={block.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block"
            />
          </div>
          {block.caption && (
            <figcaption
              className="text-center text-xs mt-3"
              style={{ color: "var(--foreground-muted)" }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "compare":
      return (
        <div className="my-8 grid grid-cols-2 gap-4">
          {[block.before, block.after].map((side, i) => (
            <figure key={i}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)", aspectRatio: block.aspect ?? "4 / 3" }}
              >
                <Image
                  src={side.src}
                  alt={side.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 384px"
                  className="object-cover"
                />
                <span
                  className="absolute bottom-2 left-2 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{
                    backgroundColor: i === 0 ? "rgba(0,0,0,0.55)" : "#0940D2",
                  }}
                >
                  {side.label}
                </span>
              </div>
            </figure>
          ))}
        </div>
      );

    case "table":
      return (
        <div
          className="my-8 rounded-2xl overflow-hidden overflow-x-auto"
          style={{ border: "1px solid var(--border)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "rgba(9,64,210,0.07)" }}>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className={`px-5 py-3 font-semibold ${i === 0 ? "text-left" : "text-right"}`}
                    style={{ color: "var(--foreground)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-5 py-3 ${j === 0 ? "text-left" : "text-right font-semibold"}`}
                      style={{
                        color: j === 0 ? "var(--foreground-muted)" : "var(--foreground)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

function AdjacentLink({
  slug,
  direction,
}: {
  slug: string;
  direction: "prev" | "next";
}) {
  const { lang } = useLang();
  const href = useHref();
  const ui = getTreinoUi(lang);
  const content = getArticleContent(slug, lang);
  if (!content) return null;

  return (
    <Link
      href={href(`/treinamento/${slug}`)}
      className={`group flex flex-col gap-1.5 rounded-2xl p-5 flex-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        direction === "next" ? "items-end text-right" : ""
      }`}
      style={{
        border: "1.5px solid rgba(9,64,210,0.30)",
        backgroundColor: "rgba(9,64,210,0.05)",
      }}
    >
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
        style={{ color: "#0940D2" }}
      >
        {direction === "prev" && (
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
        )}
        {direction === "prev" ? ui.prevArticle : ui.nextArticle}
        {direction === "next" && (
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      <span
        className="text-sm font-semibold leading-snug"
        style={{ color: "var(--foreground)" }}
      >
        {content.title}
      </span>
    </Link>
  );
}

export function TreinamentoArticle({ slug }: { slug: string }) {
  const { lang } = useLang();
  const href = useHref();
  const ui = getTreinoUi(lang);
  const meta = getArticleMeta(slug);
  const content = getArticleContent(slug, lang);

  if (!meta || !content) return null;

  const { prev, next } = getAdjacentArticles(slug);

  return (
    <article>
      {/* Voltar */}
      <Link
        href={href("/treinamento")}
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
        style={{ color: "#0940D2" }}
      >
        <ArrowLeft size={15} />
        {ui.backToIndex}
      </Link>

      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-4">
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
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
        style={{ color: "var(--foreground)" }}
      >
        {content.title}
      </h1>
      <p
        className="text-base md:text-lg leading-relaxed mb-10"
        style={{ color: "var(--foreground-muted)" }}
      >
        {content.excerpt}
      </p>

      {/* Conteúdo */}
      {content.blocks.map((block, i) => (
        <Block key={i} block={block} lang={lang} />
      ))}

      {/* Navegação anterior/próximo */}
      <nav className="flex flex-col sm:flex-row gap-4 mt-14">
        {prev ? <AdjacentLink slug={prev.slug} direction="prev" /> : <div className="flex-1" />}
        {next ? <AdjacentLink slug={next.slug} direction="next" /> : <div className="flex-1" />}
      </nav>

      {/* CTA */}
      <div
        className="rounded-2xl p-8 md:p-10 text-center mt-10"
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
