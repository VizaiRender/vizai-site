import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { captureClickId } from "@/lib/fbc";
import { LANGS, isLocalizedPath, localePath, splitLang } from "@/lib/routes";

const LANG_COOKIE = "vizai-lang";

/**
 * O navegador pede SÓ idiomas que o site não tem?
 *
 * Devolve false quando não há cabeçalho: é o caso do Googlebot, que rastreia
 * sem preferência de idioma. Isso é de propósito e é o que torna este
 * redirecionamento seguro pro SEO. Empurrar o buscador pro /en poderia deixar
 * o português fora do índice, e é o português que converte 44,6% das exibições
 * em clique — ver o comentário do LanguageSuggestion, que por isso NÃO
 * redireciona ninguém.
 */
function soIdiomaQueNaoTemos(accept: string | null): boolean {
  if (!accept) return false;

  // Olha SÓ o idioma preferido, não a lista inteira. Quase todo navegador
  // estrangeiro traz inglês como terceira ou quarta opção — um alemão manda
  // "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7". Perguntar "tem algum dos nossos na
  // lista?" acharia o inglês e concluiria que está tudo bem, e o
  // redirecionamento nunca dispararia. O que importa é o que ele pede PRIMEIRO.
  const tags = accept
    .split(",")
    .map((parte) => {
      const [tag, ...params] = parte.split(";");
      const q = params
        .map((x) => x.trim().match(/^q=([\d.]+)$/i))
        .find(Boolean);
      return { tag: tag.trim().toLowerCase(), q: q ? parseFloat(q[1]) : 1 };
    })
    .filter((t) => t.tag && !Number.isNaN(t.q));
  if (tags.length === 0) return false;

  // Empate mantém a ordem de escrita, que é a preferência declarada.
  const preferido = tags.reduce((a, b) => (b.q > a.q ? b : a));
  if (preferido.tag === "*") return false;
  return !(LANGS as string[]).includes(preferido.tag.slice(0, 2));
}

export async function middleware(request: NextRequest) {
  // O português mora na raiz, não em /pt. Quem digitar (ou linkar) /pt/algo vai
  // parar em /algo — assim a mesma página nunca existe em dois endereços, que é
  // o jeito mais fácil de o Google achar que é conteúdo duplicado.
  const { pathname } = request.nextUrl;
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Visitante cujo navegador pede um idioma que não temos (francês, alemão,
  // italiano) caía na página em PORTUGUÊS, com preço em REAL — uns 38% abaixo
  // do que ele pagaria em dólar. A faixa de sugestão já existia, mas depende de
  // ele notar e clicar. Aqui ele vai direto pro inglês.
  //
  // Condições estreitas de propósito: só navegação de página, só onde existe
  // versão por idioma, só quem ainda não está numa página com prefixo, e nunca
  // por cima de uma escolha já feita (o cookie).
  if (
    request.method === "GET" &&
    (request.headers.get("accept") || "").includes("text/html") &&
    !request.cookies.get(LANG_COOKIE) &&
    isLocalizedPath(pathname) &&
    splitLang(pathname).lang === "pt" &&
    soIdiomaQueNaoTemos(request.headers.get("accept-language"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = localePath("en", pathname);
    const redirect = NextResponse.redirect(url);
    // Sem isto o clique no anúncio se perderia justo em quem vem de fora.
    captureClickId(request, redirect);
    return redirect;
  }

  const response = await updateSession(request);
  // Grava o clique no anúncio na resposta que já existe — inclusive quando ela
  // é um redirect (login/next), senão o clique se perderia justo em quem chega
  // por link protegido.
  captureClickId(request, response);
  return response;
}

export const config = {
  matcher: [
    /*
     * Roda em todas as rotas EXCETO:
     * - _next/static (assets estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico
     * - Arquivos estáticos comuns (svg, png, jpg, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
