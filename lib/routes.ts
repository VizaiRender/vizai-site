// Idioma e endereço: a única fonte da verdade sobre COMO o idioma aparece na URL.
//
// Esquema escolhido: português na raiz, inglês e espanhol pendurados em /en e
// /es. As URLs que o Google já indexou continuam valendo exatamente iguais —
// nada de redirect na frente do que já ranqueia.
//
// Este arquivo NÃO é "use client" de propósito: layout, sitemap e metadata
// (que rodam no servidor) precisam das mesmas regras que os links do navegador.

export type Lang = "pt" | "en" | "es";

export const LANGS: Lang[] = ["pt", "en", "es"];

/** Idioma da raiz — o único que NÃO carrega prefixo na URL. */
export const DEFAULT_LANG: Lang = "pt";

/** Os que ganham prefixo. Vale como lista de rotas válidas do segmento [lang]. */
export const PREFIXED_LANGS = LANGS.filter((l) => l !== DEFAULT_LANG);

export const SITE_URL = "https://vizairender.com";

/** hreflang do <link rel="alternate"> e do og:locale. */
export const HREFLANG: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export const OG_LOCALE: Record<Lang, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as string[]).includes(value);
}

/**
 * Caminho canônico (o do português) traduzido para um idioma.
 * Aceita âncora: localePath("en", "/#pricing") === "/en#pricing".
 */
export function localePath(lang: Lang, path: string): string {
  const hashAt = path.indexOf("#");
  const base = hashAt === -1 ? path : path.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : path.slice(hashAt);
  if (lang === DEFAULT_LANG) return `${base || "/"}${hash}`;
  // "/" vira "/en" (e não "/en/"), pra não existir a mesma página em dois endereços.
  const tail = base === "/" ? "" : base;
  return `/${lang}${tail}${hash}`;
}

/**
 * O inverso: separa o prefixo de idioma de um pathname real do navegador.
 * "/en/download" -> { lang: "en", path: "/download" }
 * "/download"    -> { lang: "pt", path: "/download" }
 */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  const seg = pathname.split("/")[1];
  if (isLang(seg) && seg !== DEFAULT_LANG) {
    const rest = pathname.slice(seg.length + 1);
    return { lang: seg, path: rest || "/" };
  }
  return { lang: DEFAULT_LANG, path: pathname || "/" };
}

/**
 * Bloco `alternates` do metadata do Next: canonical + hreflang recíproco.
 *
 * O x-default aponta para o português (a raiz) porque é a versão que existe
 * desde sempre e a que o Google já mostra melhor. `path` é sempre o caminho
 * canônico em português, ex.: "/download".
 */
export function alternatesFor(lang: Lang, path: string) {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[HREFLANG[l]] = localePath(l, path);
  languages["x-default"] = localePath(DEFAULT_LANG, path);
  return { canonical: localePath(lang, path), languages };
}

/**
 * URL absoluta — para sitemap e JSON-LD, que não aceitam caminho relativo.
 * A home sai sem a barra final, igualzinho ao canonical que o Next escreve;
 * o sitemap apontando pra uma variação do endereço canônico é ruído à toa.
 */
export function absoluteUrl(lang: Lang, path: string): string {
  const p = localePath(lang, path);
  return `${SITE_URL}${p === "/" ? "" : p}`;
}

/**
 * Rotas que NÃO têm versão por idioma: login, cadastro, painel e checkout.
 *
 * Ficam de fora de propósito — são páginas noindex, e multiplicar por idioma
 * o que passa por autenticação e pagamento seria triplicar a superfície de
 * risco sem ganho nenhum de busca. Nelas o idioma continua vindo da
 * preferência salva / do navegador.
 */
export const NON_LOCALIZED_PREFIXES = [
  "/login",
  "/signup",
  "/app",
  "/checkout",
  "/obrigado",
  "/auth",
  "/sucesso",
];

export function isLocalizedPath(pathname: string): boolean {
  return !NON_LOCALIZED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}
