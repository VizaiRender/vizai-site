import { PREFIXED_LANGS } from "@/lib/routes";
import { langParam } from "@/lib/lang-param";

/**
 * Segmento de idioma: /en/... e /es/...
 *
 * O português NÃO passa por aqui — ele mora na raiz, para que as URLs que o
 * Google já indexou continuem valendo sem redirect.
 *
 * Este layout só existe para barrar idioma inválido: sem o notFound, qualquer
 * caminho inexistente (/xpto) cairia neste segmento e renderizaria a home.
 */
export function generateStaticParams() {
  return PREFIXED_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await langParam(params);
  return <>{children}</>;
}
