import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { PageTransition } from "./components/PageTransition";
import { LanguageProvider } from "./components/LanguageProvider";
import { CookieBanner } from "./components/CookieBanner";
import { LanguageSuggestion } from "./components/LanguageSuggestion";
import { Analytics } from "./components/Analytics";
import { MEASURED_HOSTS } from "@/lib/analytics";
import { BehaviorTracker } from "./components/BehaviorTracker";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vizairender.com"),
  title: {
    default: "Vizai Render: Renders fotorrealistas com IA",
    template: "%s | Vizai Render",
  },
  description: "Transforme modelos 3D do SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
  keywords: ["render", "SketchUp", "inteligência artificial", "arquitetura", "visualização 3D", "fotorrealismo", "AI render"],
  authors: [{ name: "Vizai Render", url: "https://vizairender.com" }],
  creator: "Vizai Render",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    url: "https://vizairender.com",
    siteName: "Vizai Render",
    title: "Vizai Render: Renders fotorrealistas com IA",
    description: "Transforme modelos 3D do SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
    // PNG estático de propósito: a geração em runtime (next/og) dava 500 no
    // Cloudflare e o preview do link ficava sem imagem no WhatsApp/Messenger.
    images: [
      {
        url: "https://vizairender.com/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Vizai Render: Renders fotorrealistas com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizai Render: Renders fotorrealistas com IA",
    description: "Transforme modelos 3D do SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
    creator: "@vizairender",
    images: ["https://vizairender.com/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Canonical é definido por página (em cada page.tsx) — um canonical global
  // aqui faria todas as rotas apontarem pra home e matar a indexação delas.
};

// Só a Organization mora aqui: ela não tem idioma nem moeda. O produto
// (SoftwareApplication, com preços) é declarado por página, no idioma e na moeda
// dela. Ver lib/structured-data.ts.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vizairender.com/#organization",
      name: "Vizai Render",
      url: "https://vizairender.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vizairender.com/icon.png",
      },
      // Perfis oficiais da marca. É o sameAs que faz o Google ligar estes
      // perfis ao Vizai Render; sem ele os links do rodapé são só links.
      sameAs: [
        "https://instagram.com/vizairender",
        "https://tiktok.com/@vizairender",
        "https://www.linkedin.com/company/vizairender/",
        // Canal com as aulas em vídeo. Gemini e Perplexity citam muito o YouTube,
        // e é este link que diz a eles que o canal é do mesmo Vizai do site.
        "https://www.youtube.com/@vizairender",
        // Perfis em diretórios de software (aprovados em 12/10/2026). Ajudam as
        // IAs a confirmar que o Vizai é uma empresa real, citada fora do site.
        "https://www.g2.com/products/vizai-render/reviews",
        "https://www.crunchbase.com/organization/vizai-render",
        "https://sourceforge.net/software/product/Vizai-Render/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "contato@vizairender.com",
        contactType: "customer support",
        availableLanguage: ["Portuguese", "English", "Spanish"],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={geist.variable} suppressHydrationWarning>
      <head>
        {/*
          Remendo pro empacotador da Cloudflare, NÃO é código nosso de verdade.

          O next-themes monta o script anti-piscada serializando uma função
          (`fn.toString()`) direto no HTML. O esbuild do OpenNext compila o
          servidor com `keepNames`, o que injeta uma chamada ao helper interno
          `__name(fn, "fn")` DENTRO daquela função — e o helper existe só no
          bundle do servidor, nunca no navegador.

          Resultado em produção: `ReferenceError: __name is not defined` na
          primeira linha útil do script, ABORTANDO ele antes da linha que aplica
          o tema. Quem escolheu escuro via fundo branco até a hidratação.
          Não acontece em `next start`, só no build do Worker.

          Definir `__name` como repasse resolve: é exatamente o que o helper faz
          de útil aqui (renomear função, irrelevante em runtime). Precisa vir no
          <head>, porque o script do tema é a primeira coisa do <body>.

          Pode sair quando o OpenNext parar de aplicar `keepNames` em código que
          vira string. Conferir com: build do Worker + procurar `__name` no HTML.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__name=window.__name||function(f){return f};`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        {/*
          GTM no endereço padrão do Google desde 10/2026. Antes vinha pelo
          sst.vizairender.com, o carregador da Stape (anti bloqueador e Cookie
          Keeper do Safari); a Stape saiu e a metade servidor do Purchase passou
          a sair do nosso webhook, com event_id = id da sessão da Stripe.
          Cancelar a Stape SEM esta troca no ar matava o GTM inteiro: Pixel,
          GA4 e Purchase, não só o lado servidor.
        */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6TPTF3T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!(${JSON.stringify(MEASURED_HOSTS)}.includes(location.hostname)||"${process.env.NEXT_PUBLIC_MEASURE_LOCAL ?? ""}"==="1"))return;(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N6TPTF3T');})();`,
          }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <LanguageSuggestion />
            <CookieBanner />
            <Analytics />
            <BehaviorTracker />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
