import type { Metadata } from "next";
import { Geist } from "next/font/google";
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
  title: "Vizai Render — Renders fotorrealistas com IA",
  description: "Transforme modelos 3D em renders fotorrealistas em segundos com inteligência artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
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
