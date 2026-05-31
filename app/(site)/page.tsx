"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";
import { DottedSurfaceLazy } from "@/components/ui/dotted-surface-lazy";
import { CompareGrid } from "@/components/ui/compare-grid";
import { AnimatedWords } from "@/components/ui/animated-words";
import { PricingSection } from "@/components/ui/pricing-section";
import { SoftwareMarquee } from "@/components/ui/software-marquee";
import { AiModelsSection } from "@/components/ui/ai-models-section";
import InteractiveImageBentoGallery, { ImageItem } from "@/components/ui/interactive-image-bento-gallery";
import GradientBordersButton from "@/components/ui/gradient-borders-button";
import { Footer } from "@/components/ui/footer";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolsSection } from "@/components/ui/tools-section";
import { PluginDemo } from "@/components/ui/plugin-demo";
import { VideoSection } from "@/components/ui/video-section";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { ComparisonSection } from "@/components/ui/comparison-section";
import { WhySection } from "@/components/ui/why-section";
import { StatsSection } from "@/components/ui/stats-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { CtaSection } from "@/components/ui/cta-section";
import { HowItWorksSection } from "@/components/ui/how-it-works-section";

const galleryItems: ImageItem[] = [
  {
    id: 1,
    title: "Sala de Estar Moderna",
    desc: "Iluminação natural e texturas realistas.",
    url: "https://downloads.vizairender.com/site/vr-sala.jpg?v=1",
    span: "md:row-span-2 md:col-span-2",
  },
  {
    id: 2,
    title: "Cozinha Planejada",
    desc: "Reflexos perfeitos nos materiais.",
    url: "https://downloads.vizairender.com/site/vr-cozinha.jpg?v=1",
    span: "",
  },
  {
    id: 3,
    title: "Quarto Aconchegante",
    desc: "Tecidos e iluminação quente.",
    url: "https://downloads.vizairender.com/site/vr-quarto.jpg?v=1",
    span: "",
  },
  {
    id: 4,
    title: "Fachada Externa",
    desc: "Integração com o ambiente.",
    url: "https://downloads.vizairender.com/site/vr-fachada.jpg?v=1",
    span: "md:row-span-2",
    position: "object-[75%_center]",
  },
  {
    id: 5,
    title: "Banheiro Minimalista",
    desc: "Materiais reflexivos e luz indireta.",
    url: "https://downloads.vizairender.com/site/vr-banheiro.jpg?v=1",
    span: "",
  },
  {
    id: 6,
    title: "Área de Lazer",
    desc: "Piscina e paisagismo.",
    url: "https://downloads.vizairender.com/site/vr-area-lazer.jpg?v=1",
    span: "md:col-span-2",
  },
  {
    id: 7,
    title: "Home Office",
    desc: "Luz suave e detalhes nítidos.",
    url: "https://downloads.vizairender.com/site/vr-homeoffice.jpg?v=1",
    span: "",
  },
  {
    id: 8,
    title: "Varanda Gourmet",
    desc: "Texturas de madeira e reflexos.",
    url: "https://downloads.vizairender.com/site/vr-varanda.jpg?v=1",
    span: "md:row-span-2 md:col-span-2",
  },
  {
    id: 9,
    title: "Hall de Entrada",
    desc: "Iluminação dramática.",
    url: "https://downloads.vizairender.com/site/vr-cozinha2.jpg?v=1",
    span: "",
  },
  {
    id: 10,
    title: "Quarto Infantil",
    desc: "Cores vivas e formas suaves.",
    url: "https://downloads.vizairender.com/site/vr-lazer.jpg?v=1",
    span: "md:row-span-2",
  },
  {
    id: 11,
    title: "Slot 11",
    desc: "Aguardando imagem.",
    url: "https://downloads.vizairender.com/site/render-14-23.jpg?v=1",
    span: "",
  },
  {
    id: 12,
    title: "Slot 12",
    desc: "Aguardando imagem.",
    url: "https://downloads.vizairender.com/site/render-14-07.jpg?v=1",
    span: "md:col-span-2",
  },
  {
    id: 13,
    title: "Render IA",
    desc: "Gerado pelo Vizai.",
    url: "https://downloads.vizairender.com/site/vr-sala2.jpg?v=1",
    span: "",
  },
  {
    id: 14,
    title: "Render IA",
    desc: "Gerado pelo Vizai.",
    url: "https://downloads.vizairender.com/site/vr-fachada2.jpg?v=1",
    span: "md:row-span-2 md:col-span-2",
  },
  {
    id: 15,
    title: "Render IA",
    desc: "Gerado pelo Vizai.",
    url: "https://downloads.vizairender.com/site/vr-externo.jpg?v=1",
    span: "",
  },
];

export default function Home() {
  const t = useT();
  const { lang } = useLang();
  const localizedGallery: ImageItem[] = galleryItems.map((item, i) => ({
    ...item,
    title: t.home.gallery[i].title,
    desc: t.home.gallery[i].desc,
  }));
  return (
    <main className="flex flex-col">
      <section className="hero-section isolate relative flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-6 overflow-hidden">
        <DottedSurfaceLazy className="absolute inset-0 z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <GradientBordersButton 
            className="mb-8"
            href="/download"
          >
            {t.home.heroBadge}
          </GradientBordersButton>

          <h1
            className="max-w-4xl text-center text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ color: "var(--foreground)" }}
          >
            {t.home.heroTitle}{" "}
            <AnimatedWords
              words={[
                { text: "Sketchup" },
                { text: "Archicad", comingSoon: true },
                { text: "Revit", comingSoon: true },
              ]}
            />
          </h1>

          <p
            className="max-w-xl text-center text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.home.heroSubtitle}
          </p>

          <div className={`flex flex-col items-center gap-2 w-full ${lang === "es" ? "max-w-[300px] md:max-w-[340px]" : "max-w-[220px] md:max-w-[280px]"}`}>
            <Link
              href="/signup"
              className="bg-[#0940D2] hover:bg-[#0730b0] text-white text-lg font-semibold py-3 px-12 rounded-full transition-colors w-full text-center whitespace-nowrap"
            >
              {t.home.heroCta}
            </Link>
            <p className="text-xs w-full text-center flex items-center justify-center gap-1" style={{ color: "var(--foreground-muted)" }}>
              {t.home.heroFree}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#0940D2">
                <path d="M13 2L4.09 12.96A1 1 0 005 14.5h6.5L10 22l9.91-10.96A1 1 0 0019 10H12.5L13 2z" />
              </svg>
              {t.home.heroCredits}
            </p>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Seção Vídeo de demonstração (por idioma) */}
      <VideoSection />

      {/* Seção Demo Interativa */}
      <section style={{ padding: "100px 24px 100px", position: "relative" }}>
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-10 md:gap-20" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="w-full md:flex-none md:max-w-[460px]">
            <h2 style={{ fontSize: "clamp(2rem,2.8vw,2.5rem)", fontWeight: 400, color: "var(--foreground-muted)", margin: "0 0 20px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {t.home.demoTitlePre}{" "}
              <span style={{ color: "var(--foreground)" }}>
                <AnimatedTextCycle words={t.home.demoCycle} interval={3000} />
              </span>{" "}
              {t.home.demoTitlePost}
              <br />
              {t.home.demoTitleLine2}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.6 }}>
              {t.home.demoP1}
            </p>
            <hr style={{ border: "none", borderTop: "1px solid rgba(127,127,127,0.2)", margin: "20px 0" }} />
            <p className="hidden md:block" style={{ fontSize: "0.95rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.6 }}>
              {t.home.demoP2}
            </p>
            <p className="md:hidden" style={{ fontSize: "0.95rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.6 }}>
              {t.home.demoP2Mobile}
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            <PluginDemo />
          </div>
        </div>
      </section>

      {/* Seção Por Que Vizai Render */}
      <WhySection />

      <ToolsSection />

      <HowItWorksSection />

      {/* Seção Antes / Depois */}
      <section className="pb-24 px-6 flex flex-col items-center gap-12">
        <div className="text-center max-w-4xl">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {t.home.compareTitle1}<br />{t.home.compareTitle2}
          </h2>
          <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
            {t.home.compareSubtitle}
          </p>
        </div>

        <CompareGrid
          pairs={[
            {
              before: "https://downloads.vizairender.com/site/compare-before-1.jpg?v=1",
              after: "https://downloads.vizairender.com/site/compare-after-1.jpg?v=1",
            },
            {
              before: "/compare2-before.jpg",
              after: "/compare2-after.jpg",
            },
            {
              before: "https://downloads.vizairender.com/site/compare-before-2.jpg?v=1",
              after: "https://downloads.vizairender.com/site/compare-after-2.jpg?v=1",
            },
            {
              before: "https://downloads.vizairender.com/site/compare-before-3.jpg?v=1",
              after: "https://downloads.vizairender.com/site/compare-after-4.jpg?v=1",
            },
            {
              before: "https://downloads.vizairender.com/site/compare-before-4.jpg?v=1",
              after: "https://downloads.vizairender.com/site/vr-homeoffice.jpg?v=1",
            },
            {
              before: "https://downloads.vizairender.com/site/compare-before-5.jpg?v=1",
              after: "https://downloads.vizairender.com/site/compare-after-5.jpg?v=1",
            },
          ]}
        />
      </section>

      <SoftwareMarquee />

      <AiModelsSection />

      <ComparisonSection />

      <InteractiveImageBentoGallery
        id="gallery"
        title={t.home.galleryTitle}
        description={t.home.galleryDescription}
        imageItems={localizedGallery}
      />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />

      <CtaSection />

      <Footer />
    </main>
  );
}
