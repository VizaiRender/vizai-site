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
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "contato@vizairender.com",
        contactType: "customer support",
        availableLanguage: ["Portuguese", "English", "Spanish"],
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://vizairender.com/#software",
      name: "Vizai Render",
      url: "https://vizairender.com",
      description:
        "Plugin de renders fotorrealistas com inteligência artificial para SketchUp. Gere imagens profissionais em segundos diretamente do seu modelo 3D.",
      applicationCategory: "DesignApplication",
      operatingSystem: ["Windows", "macOS"],
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          name: "Plano Gratuito",
        },
        {
          "@type": "Offer",
          price: "97",
          priceCurrency: "BRL",
          name: "Plano Starter",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "97",
            priceCurrency: "BRL",
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: "MON",
          },
        },
        {
          "@type": "Offer",
          price: "197",
          priceCurrency: "BRL",
          name: "Plano PRO",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "197",
            priceCurrency: "BRL",
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: "MON",
          },
        },
        {
          "@type": "Offer",
          price: "519",
          priceCurrency: "BRL",
          name: "Plano Business",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "519",
            priceCurrency: "BRL",
            billingDuration: 1,
            billingIncrement: 1,
            unitCode: "MON",
          },
        },
      ],
      publisher: {
        "@id": "https://vizairender.com/#organization",
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
        <noscript>
          <iframe
            src="https://sst.vizairender.com/ns.html?id=GTM-N6TPTF3T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!(${JSON.stringify(MEASURED_HOSTS)}.includes(location.hostname)||"${process.env.NEXT_PUBLIC_MEASURE_LOCAL ?? ""}"==="1"))return;!function(){"use strict";function l(e){for(var t=e,r=0,n=document.cookie.split(";");r<n.length;r++){var o=n[r].split("=");if(o[0].trim()===t)return o[1]}}function s(e){return localStorage.getItem(e)}function u(e){return window[e]}function A(e,t){e=document.querySelector(e);return t?null==e?void 0:e.getAttribute(t):null==e?void 0:e.textContent}var e=window,t=document,r="script",n="dataLayer",o="https://sst.vizairender.com",a="",i="2qokirulflj",c="e1woubx=AwhbKyE%2FRCVcODY4M0E9TRxRVEJEVA0FVxoPFhQbGw4ECAMeWxEGBg%3D%3D",g="stapeUserId",v="",E="",d=!1;try{var d=!!g&&(m=navigator.userAgent,!!(m=new RegExp("Version/([0-9._]+)(.*Mobile)?.*Safari.*").exec(m)))&&16.4<=parseFloat(m[1]),f="stapeUserId"===g,I=d&&!f?function(e,t,r){void 0===t&&(t="");var n={cookie:l,localStorage:s,jsVariable:u,cssSelector:A},t=Array.isArray(t)?t:[t];if(e&&n[e])for(var o=n[e],a=0,i=t;a<i.length;a++){var c=i[a],c=r?o(c,r):o(c);if(c)return c}else console.warn("invalid uid source",e)}(g,v,E):void 0;d=d&&(!!I||f)}catch(e){console.error(e)}var m=e,g=(m[n]=m[n]||[],m[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"}),t.getElementsByTagName(r)[0]),v=I?"&bi="+encodeURIComponent(I):"",E=t.createElement(r),f=(d&&(i=8<i.length?i.replace(/([a-z]{8}$)/,"kp$1"):"kp"+i),!d&&a?a:o);E.async=!0,E.src=f+"/"+i+".js?"+c+v,null!=(e=g.parentNode)&&e.insertBefore(E,g)}();})();`,
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
