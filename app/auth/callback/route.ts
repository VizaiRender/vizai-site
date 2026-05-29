import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
