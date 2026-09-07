"use client";

import { AutoVideo } from "@/components/ui/auto-video";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import GradientBordersButton from "@/components/ui/gradient-borders-button";
import { useLang, useHref } from "@/app/components/LanguageProvider";
import { AulasPlayer } from "@/components/ui/aulas-player";
import {
  ARTICLES,
  CATEGORY_ORDER,
  getArticleContent,
  getTreinoUi,
  resolveSrc,
  type ArticleMeta,
} from "@/lib/treinamento";

function ArticleCard({ meta, featured }: { meta: ArticleMeta; featured?: boolean }) {
  const { lang } = useLang();
  const href = useHref();
  const ui = getTreinoUi(lang);
  const content = getArticleContent(meta.slug, lang);
  if (!content) return null;

  return (
    <Link
      href={href(`/treinamento/${meta.slug}`)}
      className={`group flex flex-col rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
        featured ? "md:flex-row" : ""
      }`}
      style={{
        border: "1px solid var(--border)",
        backgroundColor: "rgba(128,128,128,0.04)",
      }}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "md:w-1/2 aspect-video md:aspect-auto md:min-h-[300px]" : "aspect-video"
        }`}
      >
        {featured ? (
          <AutoVideo
            src="/tutorial-sketchup.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={content.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={resolveSrc(meta.cover, lang)}
            alt={content.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className={`flex flex-col flex-1 p-5 ${featured ? "md:p-8 md:justify-center" : ""}`}>
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ color: "#0940D2", backgroundColor: "rgba(9,64,210,0.10)" }}
          >
            {ui.categories[meta.category]}
          </span>
          <span
            className="inline-flex items-center gap-1 text-[11px]"
            style={{ color: "var(--foreground-muted)" }}
          >
            <Clock size={11} />
            {meta.minutes} {ui.minRead}
          </span>
        </div>

        <h3
          className={`font-bold tracking-tight mb-2 ${featured ? "text-xl md:text-2xl" : "text-base"}`}
          style={{ color: "var(--foreground)" }}
        >
          {content.title}
        </h3>
        <p
          className={`leading-relaxed mb-4 ${featured ? "text-sm md:text-base" : "text-sm"}`}
          style={{ color: "var(--foreground-muted)" }}
        >
          {content.excerpt}
        </p>

        <span
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: "#0940D2" }}
        >
          {ui.readMore}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function TreinamentoContent() {
  const { lang } = useLang();
  const href = useHref();
  const ui = getTreinoUi(lang);

  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);
  const startRest = rest.filter((a) => a.category === "start");

  return (
    <>
      {/* Hero */}
      <div className="flex flex-col items-center text-center mb-14">
        <GradientBordersButton className="mb-6">{ui.badge}</GradientBordersButton>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl"
          style={{ color: "var(--foreground)" }}
        >
          {ui.title}
        </h1>
        <p
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: "var(--foreground-muted)" }}
        >
          {ui.subtitle}
        </p>
      </div>

      {/* Comece aqui: destaque + demais artigos de início no mesmo bloco,
          evitando dois cabeçalhos quase iguais ("Comece por aqui" / "Comece aqui"). */}
      <div className="mb-14">
        <h2
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--foreground-muted)" }}
        >
          {ui.featuredLabel}
        </h2>
        <ArticleCard meta={featured} featured />
        {startRest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {startRest.map((meta) => (
              <ArticleCard key={meta.slug} meta={meta} />
            ))}
          </div>
        )}
      </div>

      {/* As 8 aulas em vídeo, com player grande e trilha de miniaturas. */}
      <AulasPlayer />

      {/* Seções por categoria (a categoria "start" já foi exibida acima) */}
      {CATEGORY_ORDER.map((cat) => {
        if (cat === "start") return null;
        const items = rest.filter((a) => a.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mb-14">
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
              style={{ color: "var(--foreground)" }}
            >
              {ui.categories[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((meta) => (
                <ArticleCard key={meta.slug} meta={meta} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA final */}
      <div
        className="rounded-2xl p-8 md:p-12 text-center"
        style={{ backgroundColor: "#0940D2" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">
          {ui.ctaTitle}
        </h2>
        <p className="text-sm md:text-base mb-7 text-white/75 max-w-xl mx-auto">
          {ui.ctaSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0940D2] hover:bg-white/90 text-sm font-semibold px-6 py-3 rounded-full transition-colors w-full sm:w-auto"
          >
            {ui.ctaSignup}
          </Link>
          <Link
            href={href("/download")}
            className="inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors border border-white/30 hover:bg-white/10 w-full sm:w-auto"
          >
            {ui.ctaDownload}
          </Link>
        </div>
      </div>
    </>
  );
}
