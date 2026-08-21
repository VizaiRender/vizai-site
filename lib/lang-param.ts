import { notFound } from "next/navigation";
import { DEFAULT_LANG, isLang, type Lang } from "./routes";

/**
 * Lê e valida o segmento [lang] da rota.
 *
 * Precisa ser chamado TAMBÉM no generateMetadata, não só no layout: o Next
 * resolve o metadata antes de renderizar o layout, então um idioma inexistente
 * (/xpto) estourava um 500 na busca do título em vez de dar 404 limpo.
 *
 * "pt" cai no notFound de propósito — o português mora na raiz, e /pt é
 * redirecionado no middleware antes de chegar aqui.
 */
export async function langParam(
  params: Promise<{ lang: string }>,
): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return lang;
}
