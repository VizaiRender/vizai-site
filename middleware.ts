import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
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
