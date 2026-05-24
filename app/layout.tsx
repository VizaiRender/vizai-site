import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vizai Render — Renders fotorrealistas direto do SketchUp",
  description: "Transforme modelos SketchUp em renders fotorrealistas em segundos com inteligência artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
