import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPortalSession } from "@/lib/vizai-api";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/login?next=/app/conta`, { status: 303 });
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/login?next=/app/conta`, { status: 303 });
  }

  const { origin } = new URL(request.url);
  const result = await createPortalSession(session.access_token, `${origin}/app/conta`);

  if ("url" in result) {
    return NextResponse.redirect(result.url, { status: 303 });
  }

  return NextResponse.redirect(
    `${origin}/app/conta?portal_error=${encodeURIComponent(result.error)}`,
    { status: 303 }
  );
}
