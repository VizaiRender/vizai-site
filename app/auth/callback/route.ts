import { NextResponse, after, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { notifySiteLogin } from "@/lib/vizai-api";

const LANG_COOKIE = "vizai-lang";

/**
 * Idioma da pessoa, para a régua de emails sair na língua certa.
 *
 * O caminho de destino manda primeiro porque é o mais específico: quem logou
 * dentro de /en ou /es está lendo o site naquele idioma agora. O cookie é a
 * reserva, e ele existe justamente porque o middleware precisa do idioma antes
 * de a página carregar. Sem os dois, português, que é o idioma base da régua.
 */
function langFrom(next: string, cookie: string | undefined): string {
  if (next.startsWith("/en/") || next === "/en") return "en";
  if (next.startsWith("/es/") || next === "/es") return "es";
  if (cookie === "en" || cookie === "es") return cookie;
  return "pt";
}

function sanitizeNext(raw: string | null): string {
  if (!raw) return "/app";
  if (!raw.startsWith("/")) return "/app";
  if (raw.startsWith("//") || raw.startsWith("/\\")) return "/app";
  return raw;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNext(searchParams.get("next"));
  const errorParam = searchParams.get("error");

  if (errorParam) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorParam)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  // Roda DEPOIS de a pessoa já ter sido redirecionada. É todo login do site, não
  // só o primeiro: quem sabe distinguir é o servidor, olhando se a pessoa já
  // existe no Resend. Fazer essa checagem aqui exigiria um marcador no banco que
  // não existe, e criar um é DDL, que é passo manual.
  const token = data?.session?.access_token;
  if (token) {
    const lang = langFrom(next, request.cookies.get(LANG_COOKIE)?.value);
    after(() => notifySiteLogin(token, lang));
  }

  return NextResponse.redirect(`${origin}${next}`);
}
