import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { captureClickId } from "@/lib/fbc";

export async function middleware(request: NextRequest) {
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
