import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Em dev, Next.js precisa de unsafe-eval pro HMR. Em prod, removemos.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://js.stripe.com",
  "https://checkout.stripe.com",
  "https://www.googletagmanager.com",
  "https://sst.vizairender.com",
  "https://connect.facebook.net",
].join(" ");

const styleSrc = [
  "'self'",
  "'unsafe-inline'",
  "https://fonts.googleapis.com",
].join(" ");

const imgSrc = [
  "'self'",
  "data:",
  "blob:",
  "https://lh3.googleusercontent.com",
  "https://i.ibb.co",
  "https://*.supabase.co",
  "https://downloads.vizairender.com",
  "https://i.pravatar.cc",
  "https://www.googletagmanager.com",
  "https://sst.vizairender.com",
  "https://www.google-analytics.com",
  "https://www.facebook.com",
].join(" ");

const connectSrc = [
  "'self'",
  "https://eobtrpaxupquawgniwfe.supabase.co",
  "wss://eobtrpaxupquawgniwfe.supabase.co",
  "https://api.vizairender.com",
  "https://downloads.vizairender.com",
  "https://sst.vizairender.com",
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://region1.google-analytics.com",
  "https://www.facebook.com",
  "https://connect.facebook.net",
  ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : []),
].join(" ");

const frameSrc = [
  "'self'",
  "https://js.stripe.com",
  "https://checkout.stripe.com",
  "https://www.googletagmanager.com",
  "https://sst.vizairender.com",
].join(" ");

const fontSrc = ["'self'", "data:", "https://fonts.gstatic.com"].join(" ");

const cspDirectives = [
  `default-src 'self'`,
  `script-src ${scriptSrc}`,
  `style-src ${styleSrc}`,
  `img-src ${imgSrc}`,
  `font-src ${fontSrc}`,
  `connect-src ${connectSrc}`,
  `frame-src ${frameSrc}`,
  `worker-src 'self' blob:`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self' https://checkout.stripe.com https://billing.stripe.com`,
  `frame-ancestors 'none'`,
];
// upgrade-insecure-requests só em prod — em dev quebra HMR/assets (localhost é HTTP)
if (!isDev) cspDirectives.push(`upgrade-insecure-requests`);
const csp = cspDirectives.join("; ");

const securityHeaders = [
  // CSP em modo enforce — browser BLOQUEIA recursos fora da policy.
  // Validado em modo Report-Only antes de ligar.
  { key: "Content-Security-Policy", value: csp },

  // HSTS — força HTTPS por 2 anos. Safari aplica até em localhost,
  // então só ligamos em produção pra não quebrar dev.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),

  // Bloqueia clickjacking
  { key: "X-Frame-Options", value: "DENY" },

  // Browser não tenta adivinhar MIME type
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Ao sair do site, vaza só o domínio, não a URL completa
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Desliga capabilities que o site não usa
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(self 'https://checkout.stripe.com'), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },

  // Perf bonus — habilita prefetch de DNS
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const demoHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://ajax.googleapis.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data:",
      "connect-src 'self' https: blob:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "frame-src 'self' https://cdn.pannellum.org",
      "frame-ancestors 'self'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonicalização de host. O site respondia 200 em www E sem www, sem
      // redirecionar — e o cookie de sessão do Supabase é host-only (gravado no
      // host exato do login). Resultado: quem logava no www e voltava por um
      // link fixo sem www (cancel_url/success_url do checkout, que apontam pro
      // apex) caía num host sem sessão e parecia deslogado. Sem canônico o
      // Google também via o mesmo conteúdo em dois domínios, contra o que
      // sitemap/robots/metadataBase já declaram (todos apontam pro apex).
      // Precisa vir PRIMEIRO: as regras abaixo são relativas e manteriam o host.
      // São DUAS regras de propósito: com `/:path*` a raiz casa com vazio e o
      // destino sai com o literal ":path*" na URL (404). `/:path+` exige ao
      // menos um segmento, e a raiz vai numa regra própria.
      {
        source: "/",
        has: [{ type: "host", value: "www.vizairender.com" }],
        destination: "https://vizairender.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.vizairender.com" }],
        destination: "https://vizairender.com/:path+",
        permanent: true,
      },
      // URL "adivinhável" que gente digita ou recebe por anúncio/WhatsApp
      { source: "/planos", destination: "/#pricing", permanent: true },
      { source: "/plans", destination: "/#pricing", permanent: true },
      { source: "/precios", destination: "/#pricing", permanent: true },
    ];
  },
  images: {
    // Otimizador desligado: o endpoint /_next/image quebra no Worker da
    // Cloudflare (erro 1101 ao codificar AVIF). Com unoptimized, o next/image
    // serve os arquivos originais direto (já versionados e com peso ok).
    unoptimized: true,
    // Imagens otimizadas passam a ser cacheadas por 1 ano (padrão do Next é
    // só 60s → o navegador/edge re-baixava à toa = "efficient cache lifetimes").
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "downloads.vizairender.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/((?!demo/).*)",
        headers: securityHeaders,
      },
      {
        // Imagens otimizadas: cache longo no navegador/edge. As URLs já são
        // versionadas (?v=1) e o next/image varia por Accept, então é seguro.
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/demo/:path*",
        headers: demoHeaders,
      },
    ];
  },
};

export default nextConfig;

import("@opennextjs/cloudflare").then((m) =>
  m.initOpenNextCloudflareForDev()
);
