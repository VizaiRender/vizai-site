"use client";

import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
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
  ];

  const mainLinks = [
    { href: "#pricing", label: t.footer.plans },
    { href: "/download", label: t.footer.download },
    { href: "#gallery", label: t.footer.gallery },
  ];

  const legalLinks = [
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
  ];

  const copyright = {
    text: `© ${new Date().getFullYear()} Vizai Render`,
    license: t.footer.rights,
  };

  return (
    <footer className="w-full pb-16 pt-8 mt-6 sm:pt-16 sm:mt-16 bg-[var(--background)] relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            {logo}
            <span className="font-medium text-lg" style={{ color: "var(--foreground)" }}>
              {brandName}
            </span>
          </a>

          <div className="flex items-center gap-2">
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

        {/* Divider */}
        <hr className="my-3 border-black/10 dark:border-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-5 text-center">

          {/* Main Links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {mainLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm font-medium hover:underline underline-offset-4 transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm hover:underline underline-offset-4 transition-colors"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="flex flex-col gap-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
            <p>{copyright.text}</p>
            <p>{copyright.license}</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
