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

/**
 * Alcance do `_fbc`: o domínio inteiro, subdomínios inclusive.
 *
 * Até 28/08/2026 nós gravávamos ele SEM domínio, o que faz um cookie preso a
 * `vizairender.com` e só a ele. Medido no navegador: o `sst.vizairender.com`,
 * que é o servidor do GTM, recebia ZERO cookie. O lado servidor da Conversions
 * API não tinha como ler o id do clique de jeito nenhum.
 *
 * O Pixel oficial da Meta grava com `domain=.` + host, exatamente isto. Mesmo
 * comportamento, mesma exposição: o id do clique já viaja aberto na URL do
 * anúncio.
 *
 * Só o `_fbc` ganha alcance de domínio. O `vz_fbc` e o `vz_fbc_js` são nossos,
 * só o apex usa, e continuam presos nele — menos exposição de graça.
 *
 * Fora de produção devolve undefined: em localhost um cookie com domínio é
 * recusado em silêncio, e depurar isso custa caro.
 */
const DOMINIO_RAIZ = "vizairender.com";

function dominioDoCookie(request: NextRequest): string | undefined {
  const host = request.nextUrl.hostname;
  if (host === DOMINIO_RAIZ || host.endsWith("." + DOMINIO_RAIZ)) {
    return "." + DOMINIO_RAIZ;
  }
  return undefined;
}

// O fbclid é entrada de terceiro e vai parar num header Set-Cookie. Só aceitamos
// o alfabeto base64url que o Facebook usa: um \r\n aqui seria header injection.
const FBCLID = /^[A-Za-z0-9_-]{1,400}$/;

// Guarda o id do clique no anúncio quando ele chega pela URL. Roda em toda
// requisição de página; sem fbclid é um regex e sai.
export function captureClickId(request: NextRequest, response: NextResponse) {
  const fbclid = request.nextUrl.searchParams.get("fbclid");
  const dominio = dominioDoCookie(request);

  if (fbclid && FBCLID.test(fbclid)) {
    // Formato exigido pela Meta: fb.<subdomainIndex>.<clique em ms>.<fbclid>.
    // O índice é 1 porque o cookie mora no apex — o www é redirecionado antes do
    // middleware, pelo redirects() do next.config.
    gravar(response, `fb.1.${Date.now()}.${fbclid}`, dominio);
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

  sincronizarComMeta(request, response, original, dominio);
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
  dominio?: string,
) {
  const deles = request.cookies.get(FBC_META)?.value;

  // O `_fbc` chega do NAVEGADOR do visitante, então é entrada de terceiro igual
  // ao fbclid da URL, e passa pela mesma desconfiança. Sem esta validação dava
  // pra guardar lixo no nosso `vz_fbc` (a fonte da verdade!) e depois mandar
  // esse lixo pra Meta como id de clique — pior que não mandar nada. E um
  // carimbo de tempo no futuro venceria a comparação PARA SEMPRE, congelando a
  // atribuição daquele visitante num clique falso.
  if (deles && ehFbcValido(deles) && deles !== nosso && quandoClicou(deles) > quandoClicou(nosso)) {
    gravar(response, deles, dominio);
    return;
  }

  // Reescreve SEMPRE que temos valor, mesmo quando o do navegador é igual.
  //
  // Antes a condição era `deles !== nosso`, e com ela a migração pro alcance de
  // domínio nunca aconteceria: quem já passou por aqui tem o `_fbc` preso ao
  // host com EXATAMENTE o mesmo valor, então a comparação daria igual e a gente
  // pularia a gravação pra sempre. E o cabeçalho Cookie não diz qual é o alcance
  // do que chegou, não dá pra descobrir de outro jeito.
  //
  // De brinde, cada visita renova os 90 dias — que era o objetivo original
  // deste arquivo, já que o Safari corta a validade de quem ele desconfia.
  if (nosso) {
    gravarMeta(response, nosso, dominio);
  }
}

// Formato exato que a Meta usa: `fb.<indice>.<ms>.<fbclid>`, com o fbclid no
// mesmo alfabeto base64url aceito na URL.
const FBC_FORMATO = /^fb\.\d{1,3}\.\d{10,17}\.[A-Za-z0-9_-]{1,400}$/;

// Um clique não pode ter acontecido no futuro nem antes da validade do cookie.
// A folga de 1 dia cobre relógio adiantado do visitante.
const FOLGA_RELOGIO = 24 * 60 * 60 * 1000;

function ehFbcValido(valor: string): boolean {
  if (!FBC_FORMATO.test(valor)) return false;
  const ms = quandoClicou(valor);
  const agora = Date.now();
  return ms <= agora + FOLGA_RELOGIO && ms >= agora - NINETY_DAYS * 1000;
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
function gravar(response: NextResponse, valor: string, dominio?: string) {
  const base = {
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: NINETY_DAYS,
  };
  response.cookies.set(FBC_COOKIE, valor, { ...base, httpOnly: true });
  response.cookies.set(FBC_COOKIE_JS, valor, { ...base, httpOnly: false });
  gravarMeta(response, valor, dominio);
}

/**
 * Grava o `_fbc` com alcance de domínio e APAGA a versão presa ao host.
 *
 * Apagar não é capricho. Cookie com o mesmo nome e alcances diferentes são dois
 * cookies distintos pro navegador, e ele manda OS DOIS no mesmo cabeçalho. Aí
 * ninguém sabe qual valor vale: nem o Pixel, nem o nosso próprio
 * `sincronizarComMeta`, que leria um valor e sobrescreveria o outro. Todo mundo
 * que passou por aqui entre 27 e 28/08/2026 tem uma dessas presas ao host.
 *
 * Some junto o `_fbc` de alcance curto que o sst.vizairender.com escrevia.
 */
function gravarMeta(response: NextResponse, valor: string, dominio?: string) {
  response.cookies.set(FBC_META, valor, {
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: NINETY_DAYS,
    httpOnly: false,
    ...(dominio ? { domain: dominio } : {}),
  });

  if (dominio) {
    // Cabeçalho CRU, e DEPOIS da gravação acima, nesta ordem.
    //
    // `response.cookies.set` guarda os cookies num mapa por nome e reescreve a
    // lista inteira de cabeçalhos a cada chamada. Duas coisas saem disso:
    // guardar dois `_fbc` pelo mapa é impossível (o segundo apaga o primeiro), e
    // um cabeçalho cru colocado ANTES é varrido pela próxima gravação. Medido no
    // preview nas duas ordens: antes saía 1 cabeçalho, agora saem 2.
    //
    // Isto aqui só funciona porque `captureClickId` é a última coisa que o
    // middleware faz antes de devolver a resposta. Se um dia entrar alguma
    // gravação de cookie depois dela, esta linha morre em silêncio.
    response.headers.append(
      "Set-Cookie",
      `${FBC_META}=; Path=/; Max-Age=0; Secure; SameSite=Lax`,
    );
  }
}
