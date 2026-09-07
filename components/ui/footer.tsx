"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { useHref } from "@/app/components/LanguageProvider";

export function Footer() {
  const t = useT();
  const href = useHref();
  const brandName = "Vizai Render";

  const logo = <img src="/logo.svg" alt="Vizai Render" className="h-8 w-8 rounded-lg" />;

  const socialLinks = [
    {
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      href: "https://instagram.com/vizairender",
      label: "Instagram",
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.416.638 4.68 1.752 6.644L2 30l7.54-1.724A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.822-1.588l-.416-.248-4.318.988.996-4.196-.272-.432A11.47 11.47 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.424c-.344-.172-2.036-1.004-2.352-1.12-.316-.112-.546-.172-.776.172-.23.344-.888 1.12-1.088 1.35-.2.228-.4.258-.744.086-.344-.172-1.452-.536-2.768-1.708-1.022-.912-1.712-2.04-1.912-2.384-.2-.344-.022-.53.15-.7.154-.154.344-.4.516-.6.172-.2.228-.344.344-.572.116-.228.058-.43-.028-.6-.088-.172-.776-1.872-1.064-2.562-.28-.672-.562-.58-.776-.59l-.66-.012a1.27 1.27 0 0 0-.92.43c-.316.344-1.204.118-1.204 2.894 0 1.134.308 2.25.716 3.046.044.09 1.078 3.716 5.862 4.9.82.283 1.46.45 1.96.578.822.208 1.572.178 2.164.108.66-.078 2.034-.832 2.322-1.636.288-.804.288-1.492.2-1.636-.084-.144-.314-.228-.658-.4z"/>
        </svg>
      ),
      href: "https://wa.me/5571996455318",
      label: t.footer.support,
    },
    {
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      href: "https://tiktok.com/@vizairender",
      label: "TikTok",
    },
    {
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      ),
      href: "https://www.linkedin.com/company/vizairender/",
      label: "LinkedIn",
    },
  ];

  // Três colunas de links internos. Além de organizar, dá ao Google um caminho
  // para cada página do site a partir de qualquer lugar, que é o que ajuda a
  // busca orgânica: página sem link interno é página que o robô custa a achar.
  // Três colunas de links internos. Além de organizar, dá ao Google um caminho
  // para cada página do site a partir de qualquer lugar, que é o que ajuda a
  // busca orgânica: página sem link interno é página que o robô custa a achar.
  // Entrar e Criar conta ficam de fora de propósito: são noindex, já estão no
  // topo do site e no bloco de convite logo acima do rodapé.
  const linkColumns = [
    {
      title: t.footer.colProduct,
      links: [
        { href: href("/#pricing"), label: t.footer.plans },
        { href: href("/download"), label: t.footer.download },
        { href: href("/#gallery"), label: t.footer.gallery },
      ],
    },
    {
      title: t.footer.colTraining,
      links: [
        { href: href("/treinamento"), label: t.footer.allLessons },
        { href: href("/treinamento/primeiro-render"), label: t.footer.lessonRender },
        { href: href("/treinamento/reflexo-espelho"), label: t.footer.lessonMirror },
      ],
    },
    {
      title: t.footer.colGuides,
      links: [
        { href: href("/treinamento/primeiros-passos"), label: t.footer.firstSteps },
        { href: href("/treinamento/decorar-ambiente"), label: t.footer.decorate },
        { href: href("/treinamento/planta-humanizada"), label: t.footer.floorPlan },
      ],
    },
  ];

  const legalLinks = [
    { href: href("/privacy"), label: t.footer.privacy },
    { href: href("/terms"), label: t.footer.terms },
  ];

  const copyright = {
    text: `© ${new Date().getFullYear()} Vizai Render`,
    license: t.footer.rights,
  };

  return (
    <footer className="w-full pb-10 pt-4 mt-4 sm:pt-6 sm:mt-6 bg-[var(--background)] relative z-20" data-track-section="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cartão arredondado: o rodapé fica destacado do corpo da página */}
        <div
          className="rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
          style={{
            backgroundColor: "rgba(128,128,128,0.05)",
            border: "1px solid var(--border)",
          }}
        >
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">

          {/* Marca, frase e redes */}
          <div className="max-w-sm">
            <Link href={href("/")} className="inline-flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              {logo}
              <span className="font-medium text-lg" style={{ color: "var(--foreground)" }}>
                {brandName}
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t.footer.tagline}
            </p>

            {/* Centralizados no celular, à esquerda a partir do tablet */}
            <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          <nav className="grid grid-cols-2 items-start gap-x-8 gap-y-10 sm:flex sm:gap-12 lg:gap-16">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:underline underline-offset-4 transition-colors"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <hr className="mt-10 mb-6 border-black/10 dark:border-white/20" />

        {/* Copyright e links legais */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {copyright.text}. {copyright.license}
          </p>
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm underline underline-offset-4 hover:no-underline transition-colors"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        </div>
      </div>
    </footer>
  );
}
