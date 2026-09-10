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

/**
 * Só existem os idiomas de generateStaticParams; o resto é 404 direto.
 *
 * Sem isto, todo caminho inexistente (/xpto, /wp-login.php, /en/qualquer-coisa,
 * que é o que robô de varredura pede o dia inteiro) fazia o Worker montar a
 * página na hora só pra chegar no notFound, gastando CPU num plano com teto de
 * 10 ms por pedido. Com false, a 404 sai pronta do build. O notFound do langParam
 * continua como segunda barreira.
 *
 * Repetido em cada page.tsx com parâmetro de propósito: a documentação só garante
 * o efeito no arquivo que declara. E esta opção deixa de existir se um dia o
 * `cacheComponents` for ligado no next.config: aí o 404 precisa de outro caminho.
 */
export const dynamicParams = false;

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
