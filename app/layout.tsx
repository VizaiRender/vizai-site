import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { PageTransition } from "./components/PageTransition";
import { LanguageProvider } from "./components/LanguageProvider";
import { CookieBanner } from "./components/CookieBanner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vizairender.com"),
  title: {
    default: "Vizai Render — Renders fotorrealistas com IA",
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
    title: "Vizai Render — Renders fotorrealistas com IA",
    description: "Transforme modelos 3D do SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizai Render — Renders fotorrealistas com IA",
    description: "Transforme modelos 3D do SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
    creator: "@vizairender",
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
          price: "49.90",
          priceCurrency: "BRL",
          name: "Plano Starter",
          billingIncrement: "month",
        },
        {
          "@type": "Offer",
          price: "99.90",
          priceCurrency: "BRL",
          name: "Plano Pro",
          billingIncrement: "month",
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
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://sst.vizairender.com/2qokirulflj.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','e1woubx=AwhbKyE%2FRCVcODY4M0E9TRxRVEJEVA0FVxoPFhQbGw4ECAMeWxEGBg%3D%3D');`,
          }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
