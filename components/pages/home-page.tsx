"use client";

import { Fragment, type ReactNode } from "react";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { useHref } from "@/app/components/LanguageProvider";
import { GoogleMark } from "@/components/ui/google-mark";
import { MidCtaSection } from "@/components/ui/mid-cta-section";
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
import { LocalToolsSection } from "@/components/ui/local-tools-section";
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


/**
 * PAINEL DE CONTROLE DA HOME
 *
 * Esta lista é a ORDEM em que as seções aparecem na página, de cima para baixo.
 * Ela é a única fonte da verdade: mudar aqui muda o site.
 *
 * COMO MEXER
 * - Trocar de posição: mova a linha para cima ou para baixo.
 * - Esconder: transforme a linha em comentário pondo // na frente. A linha
 *   comentada guarda o lugar onde a seção estava, então voltar é só tirar o //.
 * - Não invente nome: cada chave tem que existir no objeto `secoes` lá embaixo,
 *   senão o projeto nem compila. Isso é de propósito, é a rede de segurança.
 *
 * Os nomes são os mesmos que a medição usa (`data-track-section`), então o que
 * você lê aqui é o que aparece nos relatórios de comportamento.
 *
 * DUAS LINHAS QUE É MELHOR NÃO MOVER: `hero` precisa ser a primeira, porque ela
 * ocupa a tela inteira e é o que segura a primeira impressão; e `footer`
 * precisa ser a última, porque é rodapé.
 */
const ORDEM_DA_HOME: ChaveDeSecao[] = [
  "hero",
  "stats",
  "como-funciona",
  "antes-depois",
  "cta-meio",
  "demo-interativa",
  "por-que-vizai",
  "ferramentas",
  "tools-gratis",
  // Video: saiu do 3o lugar em 26/08/2026. Tinha 2 cliques no play em ~190
  // sessoes, nenhum no computador, e ocupava area nobre.
  "video",
  // Planos subiu de 16o para ca no mesmo dia: 29 sessoes foram parar em
  // /#pricing pelo menu, ou seja, gente cacando preco numa pagina que so
  // mostrava isso la embaixo, fora do alcance de quem rola 26% em media.
  "planos",
  // Prova social logo depois do preco: e ali que a duvida aparece.
  "depoimentos",
  "galeria",
  "softwares",
  "modelos-ia",
  "comparativo",
  "faq",
  "cta-final",
  "footer",
];

type ChaveDeSecao =
  | "hero"
  | "stats"
  | "video"
  | "demo-interativa"
  | "por-que-vizai"
  | "ferramentas"
  | "tools-gratis"
  | "como-funciona"
  | "antes-depois"
  | "softwares"
  | "modelos-ia"
  | "cta-meio"
  | "comparativo"
  | "galeria"
  | "depoimentos"
  | "planos"
  | "faq"
  | "cta-final"
  | "footer";

export function HomePage() {
  const t = useT();
  const href = useHref();
  const localizedGallery: ImageItem[] = galleryItems.map((item, i) => ({
    ...item,
    title: t.home.gallery[i].title,
    desc: t.home.gallery[i].desc,
  }));

  // O conteúdo de cada seção. A ORDEM não está aqui, está no painel lá em cima.
  // `Record` obriga este objeto a ter todas as chaves do tipo: se alguém criar
  // uma seção nova no painel e esquecer de escrever o conteúdo, o projeto para
  // de compilar em vez de publicar uma página com buraco.
  const secoes: Record<ChaveDeSecao, ReactNode> = {
    hero: (
      <section data-track-section="hero" className="hero-section isolate relative flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-6 overflow-hidden">
        <DottedSurfaceLazy className="absolute inset-0 z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <GradientBordersButton 
            className="mb-8"
            href={href("/download")}
          >
            {t.home.heroBadge}
          </GradientBordersButton>

          <h1
            className="max-w-4xl text-center text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ color: "var(--foreground)" }}
          >
            {t.home.heroTitle}{" "}
            <AnimatedWords words={[{ text: "SketchUp" }]} />
          </h1>

          <p
            className="max-w-xl text-center text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.home.heroSubtitle}
          </p>

          <div className="flex flex-col items-center gap-2">
            <Link
              href="/signup"
              className="bg-[#0940D2] hover:bg-[#0730b0] text-white text-base md:text-lg font-semibold py-3 px-5 md:px-6 rounded-full transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <GoogleMark />
              {t.home.heroCta}
            </Link>
            <p className="text-xs text-center flex items-center justify-center gap-1" style={{ color: "var(--foreground-muted)" }}>
              {t.home.heroFree}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#0940D2">
                <path d="M13 2L4.09 12.96A1 1 0 005 14.5h6.5L10 22l9.91-10.96A1 1 0 0019 10H12.5L13 2z" />
              </svg>
              {t.home.heroCredits}
            </p>
          </div>
        </div>
      </section>
    ),

    stats: <StatsSection />,

    // Vídeo de demonstração, um por idioma.
    video: <VideoSection />,

    "demo-interativa": (
      <section data-track-section="demo-interativa" style={{ padding: "100px 24px 100px", position: "relative" }}>
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-10 md:gap-20" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="w-full md:flex-none md:max-w-[460px]">
            <h2 style={{ fontSize: "clamp(2rem,3.4vw,3rem)", fontWeight: 400, color: "var(--foreground-muted)", margin: "0 0 20px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
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
    ),

    "por-que-vizai": <WhySection />,

    ferramentas: <ToolsSection />,

    // Janela Tools: ferramentas locais grátis.
    "tools-gratis": <LocalToolsSection />,

    "como-funciona": <HowItWorksSection />,

    "antes-depois": (
      <section data-track-section="antes-depois" className="pb-24 px-6 flex flex-col items-center gap-12">
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
              before: "/compare3-before.jpg?v=2",
              after: "/compare3-after.jpg?v=2",
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
            {
              before: "/compare2-before.jpg",
              after: "/compare2-after.jpg",
            },
            {
              before: "/compare4-before.jpg",
              after: "/compare4-after.jpg",
            },
          ]}
        />
      </section>
    ),

    softwares: <SoftwareMarquee />,

    "modelos-ia": <AiModelsSection />,

    "cta-meio": <MidCtaSection />,

    comparativo: <ComparisonSection />,

    galeria: (
      <InteractiveImageBentoGallery
        id="gallery"
        title={t.home.galleryTitle}
        description={t.home.galleryDescription}
        imageItems={localizedGallery}
      />
    ),

    depoimentos: <TestimonialsSection />,

    planos: <PricingSection />,

    faq: <FaqSection />,

    "cta-final": <CtaSection />,

    footer: <Footer />,
  };

  return (
    <main className="flex flex-col">
      {ORDEM_DA_HOME.map((chave) => (
        <Fragment key={chave}>{secoes[chave]}</Fragment>
      ))}
    </main>
  );
}
