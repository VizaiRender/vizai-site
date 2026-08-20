import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://eobtrpaxupquawgniwfe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_h6YDmjKWd_dVKkVjb74TVQ_OVale_jG";

const PROTECTED_PREFIXES = ["/app"];
const AUTH_ONLY_PATHS = ["/login", "/signup"];

// Rotas que realmente dependem da sessão no servidor: as protegidas, as que usam
// o access_token pra falar com a nossa API (/checkout) e as que precisam mandar
// embora quem já está logado (/login, /signup).
//
// Todo o resto — home, treinamento, download, obrigado, políticas — não usa
// sessão no servidor: o menu do topo resolve a autenticação no navegador. Chamar
// o Supabase nessas páginas custaria uma ida de rede por visita de usuário
// logado, sem ninguém consumir o resultado, e colocaria o site inteiro refém de
// uma instabilidade do Supabase.
//
// `/auth/*` fica de fora de propósito: o callback e o logout criam o próprio
// cliente e escrevem os próprios cookies, sem depender daqui.
const SESSION_PREFIXES = ["/app", "/checkout", "/login", "/signup"];

// Teto pra ida ao Supabase. Sem ele, uma lentidão lá trava o middleware, que roda
// antes de toda página, até o Worker estourar o limite de recurso — e aí o site
// sai do ar pra quem está logado, sem outra saída além de limpar os cookies.
const SUPABASE_TIMEOUT_MS = 3000;

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isProtected(pathname: string) {
  return matchesPrefix(pathname, PROTECTED_PREFIXES);
}

function isAuthPage(pathname: string) {
  return AUTH_ONLY_PATHS.includes(pathname);
}

function needsSession(pathname: string) {
  return matchesPrefix(pathname, SESSION_PREFIXES);
}

function sanitizeNext(raw: string | null): string {
  if (!raw) return "/app";
  if (!raw.startsWith("/")) return "/app";
  if (raw.startsWith("//") || raw.startsWith("/\\")) return "/app";
  return raw;
}

export async function updateSession(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Página pública: nada de sessão. A resposta segue viva pro captureClickId
  // gravar o clique de anúncio nela — isso continua valendo em TODA rota.
  if (!needsSession(pathname)) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
    global: {
      // Aborta a conexão pendurada em vez de deixá-la consumindo o Worker.
      fetch: (input, init) =>
        fetch(input, { ...init, signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS) }),
    },
  });

  // O abort acima corta cada requisição, mas o supabase-js re-tenta por dentro;
  // esta corrida é que garante um teto pro tempo TOTAL gasto aqui.
  type UserResult = Awaited<ReturnType<typeof supabase.auth.getUser>> | null;
  let result: UserResult = null;
  try {
    result = await Promise.race([
      supabase.auth.getUser(),
      new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), SUPABASE_TIMEOUT_MS)
      ),
    ]);
  } catch {
    // Supabase fora do ar. Trata como "não sei quem é" em vez de travar.
  }

  // Importante: em timeout/erro NÃO apagamos cookie nenhum. A sessão continua
  // válida e volta a funcionar sozinha quando o Supabase responder.
  const user = result?.data.user ?? null;

  if (isProtected(pathname) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (isAuthPage(pathname) && user) {
    const nextParam = sanitizeNext(request.nextUrl.searchParams.get("next"));
    // nextParam pode conter query string (ex: /checkout?plan=...&currency=brl);
    // resolver como URL relativa ao request preserva caminho E query.
    const url = new URL(nextParam, request.url);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
