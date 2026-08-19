import type { NextRequest, NextResponse } from "next/server";

export const FBC_COOKIE = "vz_fbc";

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
  if (!fbclid || !FBCLID.test(fbclid)) return;

  // Formato exigido pela Meta: fb.<subdomainIndex>.<clique em ms>.<fbclid>.
  // O índice é 1 porque o cookie mora no apex — o www é redirecionado antes do
  // middleware, pelo redirects() do next.config.
  response.cookies.set(FBC_COOKIE, `fb.1.${Date.now()}.${fbclid}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: NINETY_DAYS,
  });
}
