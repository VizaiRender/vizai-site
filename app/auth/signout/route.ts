import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Quanto esperamos o Supabase revogar a sessão antes de seguir em frente. Sessão
// órfã no servidor expira sozinha; cookie órfão no navegador trava o site inteiro
// pro usuário — toda página passa a tentar renovar um token morto. Entre os dois
// males, nunca fique preso esperando o primeiro.
const SIGNOUT_TIMEOUT_MS = 3000;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    await Promise.race([
      // `scope: "local"` revoga só a sessão DESTE navegador. O padrão do Supabase
      // é "global", que derruba todos os dispositivos — inclusive o login do
      // plugin no SketchUp, que não tem nada a ver com sair do site.
      supabase.auth.signOut({ scope: "local" }),
      new Promise((resolve) => setTimeout(resolve, SIGNOUT_TIMEOUT_MS)),
    ]);
  } catch {
    // Falhar em revogar não pode impedir a limpeza de cookies abaixo. O logout
    // do usuário é a parte que não pode falhar.
  }

  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/`, { status: 303 });

  // Apaga TODO cookie de auth do Supabase, incluindo os fatiados (`...auth-token.0`,
  // `.1`) e o code-verifier do PKCE. É esta limpeza, e não o signOut() acima, que
  // garante que o navegador saia num estado utilizável mesmo se tudo der errado.
  for (const cookie of request.cookies.getAll()) {
    if (!cookie.name.startsWith("sb-")) continue;
    response.cookies.set(cookie.name, "", {
      path: "/",
      // `expires` no passado + `maxAge: 0`: o Next omite o Max-Age sozinho, e sem
      // um dos dois o cookie só ficaria vazio em vez de apagado.
      expires: new Date(0),
      maxAge: 0,
      sameSite: "lax",
      secure: origin.startsWith("https://"),
    });
  }

  // Redirect de logout nunca pode ser servido de cache.
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}

// Abrir /auth/signout pela URL é um GET, e o navegador não tem o que renderizar
// aqui — daí a página em branco. Mandamos pra home.
//
// Este GET NÃO desloga ninguém, de propósito: qualquer site poderia forçar um GET
// no seu navegador (uma <img> escondida basta) e derrubar sua sessão sem você
// pedir. Sair de verdade exige o POST do formulário.
export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/`, { status: 303 });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
