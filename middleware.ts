import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { captureClickId } from "@/lib/fbc";

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
