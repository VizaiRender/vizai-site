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

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isAuthPage(pathname: string) {
  return AUTH_ONLY_PATHS.includes(pathname);
}

function sanitizeNext(raw: string | null): string {
  if (!raw) return "/app";
  if (!raw.startsWith("/")) return "/app";
  if (raw.startsWith("//") || raw.startsWith("/\\")) return "/app";
  return raw;
}

export async function updateSession(request: NextRequest) {
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
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;

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
