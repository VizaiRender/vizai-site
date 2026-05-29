import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession } from "@/lib/vizai-api";

const VALID_PLANS = new Set([
  "starter_monthly",
  "pro_monthly",
  "business_monthly",
  "starter_annual",
  "pro_annual",
  "business_annual",
  "pack_mini",
  "pack_basico",
  "pack_pro",
  "pack_empresa",
]);

const VALID_CURRENCIES = new Set(["brl", "usd", "eur"]);

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; currency?: string }>;
}) {
  const { plan = "", currency: rawCurrency = "brl" } = await searchParams;
  const currency = rawCurrency.toLowerCase();

  if (!VALID_PLANS.has(plan) || !VALID_CURRENCIES.has(currency)) {
    redirect("/#pricing");
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const next = `/checkout?plan=${plan}&currency=${currency}`;
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  const result = await createCheckoutSession(session.access_token, plan, currency);

  if ("error" in result) {
    if (result.error === "use_portal_to_change_plan") {
      redirect("/app/conta?notice=already_subscribed");
    }
    redirect("/app?checkout=error");
  }

  redirect(result.url);
}
