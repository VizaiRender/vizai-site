import type { NextRequest, NextResponse } from "next/server";

export const FBC_COOKIE = "vz_fbc";

// Cópia LEGÍVEL pelo navegador do mesmo valor. Existe porque o GTM roda no
// navegador e não alcança o cookie httpOnly, então as tags do Pixel e da
// Conversions API ficavam presas ao `_fbc` da Meta, que o Safari corta pra 7
// dias. Resultado medido no Events Manager: fbc em 0% no InitiateCheckout.
//
// Por que abrir mão do httpOnly aqui é aceitável: o identificador do clique já
// viaja aberto na URL do anúncio e o próprio `_fbc` da Meta é legível por
// natureza. Quem conseguisse ler este cookie já teria execução de script na
// página, e nesse cenário o fbc é o menor dos problemas. O `vz_fbc` original
// continua httpOnly e segue sendo a fonte usada no servidor, na /obrigado.
export const FBC_COOKIE_JS = "vz_fbc_js";

// O cookie da PRÓPRIA Meta. Escrevemos nele também, e o motivo é que as tags do
// Pixel no navegador NÃO conseguem receber o nosso valor: nos templates usados
// (Meta Pixel e Facebook Pixel by Stape) a lista de Advanced Matching não tem a
// opção `fbc`, e o que estava configurado em "Object Properties" vira
// `custom_data`, onde a Meta ignora. Ou seja, no navegador o pixel só usa este
// cookie aqui — e quem escrevia nele era o sst.vizairender.com, que o Safari
// trata como terceiro disfarçado e corta pra 7 DIAS.
//
// Gravando `_fbc` daqui, do apex, ele é cookie de primeira parte de verdade e
// vale os 90 dias. Se o Stape reescrever curto no meio do caminho, a próxima
// visita restaura, porque o `vz_fbc` httpOnly (que ninguém mais toca) continua
// sendo a fonte da verdade.
const FBC_META = "_fbc";

// Por que um cookie NOSSO em vez de escrever direto no `_fbc` da Meta:
// quem grava o `_fbc` é o sst.vizairender.com, que é CNAME pro Stape. O Safari
// trata domínio mascarado assim como terceiro disfarçado e corta a validade do
// cookie pra 7 DIAS — e a tag do servidor reescreve esse cookie a cada evento,
// então um valor longo que a gente gravasse lá seria substituído por um curto
// no próximo PageView. Nosso ciclo de compra é bem maior que 7 dias (clica no
// anúncio → instala o plugin → gasta os créditos grátis → compra semanas
// depois), e era por isso que o Purchase chegava na Meta com o clique zerado.
// `vz_fbc` é de origem própria, ninguém mais escreve nele, e sobrevive.
const NINETY_DAYS = 60 * 60 * 24 * 90;

// O fbclid é entrada de terceiro e vai parar num header Set-Cookie. Só aceitamos
// o alfabeto base64url que o Facebook usa: um \r\n aqui seria header injection.
const FBCLID = /^[A-Za-z0-9_-]{1,400}$/;

// Guarda o id do clique no anúncio quando ele chega pela URL. Roda em toda
// requisição de página; sem fbclid é um regex e sai.
export function captureClickId(request: NextRequest, response: NextResponse) {
  const fbclid = request.nextUrl.searchParams.get("fbclid");

  if (fbclid && FBCLID.test(fbclid)) {
    // Formato exigido pela Meta: fb.<subdomainIndex>.<clique em ms>.<fbclid>.
    // O índice é 1 porque o cookie mora no apex — o www é redirecionado antes do
    // middleware, pelo redirects() do next.config.
    gravar(response, `fb.1.${Date.now()}.${fbclid}`);
    return;
  }

  // Sem fbclid na URL, mas com clique já guardado e ainda sem a cópia legível:
  // espelha. Sem isto, todo mundo que clicou no anúncio ANTES desta mudança
  // ficaria sem fbc no navegador até clicar num anúncio de novo — e o ciclo de
  // compra aqui é de semanas, então seria justamente a galera prestes a comprar.
  const jaTem = request.cookies.get(FBC_COOKIE_JS)?.value;
  const original = request.cookies.get(FBC_COOKIE)?.value;
  if (!jaTem && original) {
    response.cookies.set(FBC_COOKIE_JS, original, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: NINETY_DAYS,
    });
  }

  sincronizarComMeta(request, response, original);
}

/**
 * Mantém o `_fbc` da Meta e o nosso `vz_fbc` com o MESMO valor, sempre o do
 * clique mais recente. Corre nos dois sentidos de propósito:
 *
 * - o pixel viu um clique que a gente não viu (chegada por uma URL que o
 *   middleware não cobre, ou fbclid que o nosso filtro recusou): adotamos o
 *   dele, senão a gente sobrescreveria um clique NOVO por um velho, que é pior
 *   do que não ter feito nada;
 * - o nosso é o mais recente (o normal): reescrevemos o dele, devolvendo os 90
 *   dias que o Safari tinha cortado.
 */
function sincronizarComMeta(
  request: NextRequest,
  response: NextResponse,
  nosso: string | undefined,
) {
  const deles = request.cookies.get(FBC_META)?.value;

  if (deles && deles !== nosso && quandoClicou(deles) > quandoClicou(nosso)) {
    gravar(response, deles);
    return;
  }

  if (nosso && deles !== nosso) {
    response.cookies.set(FBC_META, nosso, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: NINETY_DAYS,
    });
  }
}

/** Momento do clique dentro do formato `fb.<indice>.<ms>.<fbclid>`. Valor
 *  estranho vira 0, então ele nunca ganha de um valor bem formado. */
function quandoClicou(valor: string | undefined): number {
  if (!valor) return 0;
  const partes = valor.split(".");
  if (partes.length < 4 || partes[0] !== "fb") return 0;
  const ms = Number(partes[2]);
  return Number.isFinite(ms) ? ms : 0;
}

/** Grava os TRÊS cookies com o mesmo valor: o nosso httpOnly (fonte da verdade,
 *  lido no servidor pela /obrigado), a cópia legível que o GTM lê, e o `_fbc` da
 *  própria Meta, que é o único que o Pixel do navegador enxerga. */
function gravar(response: NextResponse, valor: string) {
  const base = {
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: NINETY_DAYS,
  };
  response.cookies.set(FBC_COOKIE, valor, { ...base, httpOnly: true });
  response.cookies.set(FBC_COOKIE_JS, valor, { ...base, httpOnly: false });
  response.cookies.set(FBC_META, valor, { ...base, httpOnly: false });
}
