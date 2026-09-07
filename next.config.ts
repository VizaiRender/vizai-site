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
  // Microsoft Clarity (mapa de calor + gravação de sessão). A tag inicial vem
  // do www e ela mesma puxa scripts de subdomínios regionais.
  "https://www.clarity.ms",
  "https://*.clarity.ms",
  // Analise Web da Cloudflare. Ela injeta este script em TODA pagina na saida
  // do servidor, querendo ou nao: sem esta linha o browser bloqueava, dava erro
  // no console em toda pagina e o painel ficava vazio. E o unico lugar de onde
  // sai Core Web Vitals (LCP, INP, CLS) de visitante de verdade, que e o que o
  // Google usa pra ranquear. Nao usa cookie.
  // A tag injetada vem com `integrity`, entao se o CDN da Cloudflare for
  // adulterado o browser recusa o script em vez de executar.
  "https://static.cloudflareinsights.com",
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
  // O GA4 cai em pixel de imagem quando o sendBeacon não está disponível.
  // `analytics.google.com` fica FORA de propósito: aquele endereço é o sync do
  // Google Signals (rastreio entre dispositivos por conta Google logada), que
  // ninguém pediu. Segue bloqueado, como já estava.
  "https://region1.google-analytics.com",
  "https://www.facebook.com",
  "https://*.clarity.ms",
  "https://c.bing.com",
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
  // Clarity manda o que gravou pra cá. Sem isso a tag carrega, parece que está
  // funcionando e o painel fica vazio — o browser bloqueia o envio em silêncio.
  "https://*.clarity.ms",
  "https://c.bing.com",
  // O beacon manda a medicao pro proprio site (/cdn-cgi/rum, coberto por
  // 'self') e usa este endereco como reserva. Sem ele a medicao carrega, parece
  // que funciona, e o envio morre em silencio.
  "https://cloudflareinsights.com",
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

// Aulas em vídeo do Treinamento: os arquivos moram no R2 e são servidos pelo
// CDN próprio. Sem media-src explícito eles caem no default-src 'self' e o
// navegador bloqueia o play sem dizer o motivo na tela.
const mediaSrc = ["'self'", "blob:", "https://cdn.vizairender.com"].join(" ");

const cspDirectives = [
  `default-src 'self'`,
  `script-src ${scriptSrc}`,
  `style-src ${styleSrc}`,
  `img-src ${imgSrc}`,
  `media-src ${mediaSrc}`,
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

  // Desliga capabilities que o site não usa.
  //
  // A origem vai entre aspas DUPLAS. Com aspas simples o cabeçalho é inválido
  // pela gramática de structured headers e o Chrome descarta ele INTEIRO —
  // ou seja, câmera, microfone e localização voltavam a ficar liberados, sem
  // nenhum erro visível além de uma linha no console. Estava assim em produção.
  {
    key: "Permissions-Policy",
    value:
      'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.stripe.com"), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
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
      // O guia de créditos foi absorvido pelo "primeiros-passos" (set/2026).
      // A URL antiga estava no sitemap e indexada, então vai de 301 em vez de 404.
      { source: "/treinamento/como-funciona-creditos", destination: "/treinamento/primeiros-passos", permanent: true },
      { source: "/en/treinamento/como-funciona-creditos", destination: "/en/treinamento/primeiros-passos", permanent: true },
      { source: "/es/treinamento/como-funciona-creditos", destination: "/es/treinamento/primeiros-passos", permanent: true },
      // Dos 10 guias que viraram aula em vídeo, 7 mantiveram a própria URL (agora
      // com o vídeo no topo e o texto embaixo). Os 3 que foram absorvidos por
      // outra aula redirecionam, porque as URLs estavam indexadas.
      // Guias absorvidos pelas aulas 1 e 2: vão para a página da aula que os cobre.
      ...[
        ["preparando-a-cena", "primeiro-render"],
        ["editar-render", "primeiro-render"],
        ["luz-fake", "reflexo-espelho"],
      ].flatMap(([de, para]) => [
        { source: `/treinamento/${de}`, destination: `/treinamento/${para}`, permanent: true },
        { source: `/en/treinamento/${de}`, destination: `/en/treinamento/${para}`, permanent: true },
        { source: `/es/treinamento/${de}`, destination: `/es/treinamento/${para}`, permanent: true },
      ]),
      // URL "adivinhável" que gente digita ou recebe por anúncio/WhatsApp
      { source: "/planos", destination: "/#pricing", permanent: true },
      { source: "/plans", destination: "/#pricing", permanent: true },
      { source: "/precios", destination: "/#pricing", permanent: true },
    ];
  },
  images: {
    // Otimizador LIGADO. Ele já esteve desligado por causa do erro 1101 no
    // Worker da Cloudflare ao codificar AVIF. Hoje o Next 16 só pede WebP
    // por padrão (images-manifest: formats = ["image/webp"]), e o
    // @opennextjs/cloudflare atende /_next/image pelo binding IMAGES
    // declarado no wrangler.jsonc. AVIF não entra mais no caminho — se algum
    // dia alguém quiser AVIF, o erro 1101 volta.
    // Um detalhe que quebra o site inteiro se esquecido: SVG passando pelo
    // otimizador vira 400, porque dangerouslyAllowSVG é falso (e deve seguir
    // assim). O único <Image> com SVG é o logo da barra, marcado unoptimized.
    // Imagens otimizadas passam a ser cacheadas por 1 ano (padrão do Next é
    // só 60s → o navegador/edge re-baixava à toa = "efficient cache lifetimes").
    minimumCacheTTL: 31536000,
    // O Next 16 passou a exigir que query string em imagem local seja
    // declarada aqui. Deixar liberado (um item sem "search") seria um buraco:
    // cada query diferente vira uma transformacao nova e paga na Cloudflare,
    // entao qualquer um poderia queimar a cota pedindo /logo.png?1, ?2, ?3...
    // Por isso a lista e exata, com espaco pra trocar arte ate o "?v=5".
    // Passou disso, o build QUEBRA com a mensagem certa e e so somar a linha.
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/**", search: "?v=1" },
      { pathname: "/**", search: "?v=2" },
      { pathname: "/**", search: "?v=3" },
      { pathname: "/**", search: "?v=4" },
      { pathname: "/**", search: "?v=5" },
    ],
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
        // ATENÇÃO: esta regra NÃO vale em produção. No Worker da Cloudflare o
        // /_next/image é atendido antes do Next, e quem decide o cache é o
        // @opennextjs/cloudflare: ele só marca cache longo quando o arquivo de
        // ORIGEM vem com `immutable`. É por isso que public/_headers marca as
        // imagens como immutable — tirar de lá deixa toda imagem do site sem
        // cache nenhum, sem nenhum erro aparecer. Aqui em baixo só serve pro
        // `next dev`.
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
