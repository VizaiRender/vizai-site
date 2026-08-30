import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FBC_COOKIE } from "@/lib/fbc";
import { createCheckoutSession, type CheckoutTracking } from "@/lib/vizai-api";

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

/**
 * Recolhe os identificadores de anúncio pra viajarem junto com o checkout.
 *
 * Esta página é o ÚLTIMO ponto do fluxo em que ainda existe navegador: daqui a
 * pessoa vai pra Stripe e, no boleto, só volta dias depois por um webhook, sem
 * cookie nenhum. Por isso é aqui que o clique é recolhido, e não no webhook.
 *
 * A fonte do fbc é o `vz_fbc`, que é httpOnly — de propósito, porque é a cópia
 * que ninguém mais escreve. As outras duas (`vz_fbc_js` e `_fbc`) são reescritas
 * pela tag do servidor e pelo pixel, então valem menos como verdade.
 *
 * O servidor confere formato e tamanho de tudo isto de novo (`limparRastreio`).
 * Não é desconfiança do nosso próprio código: o endpoint também é chamado pelo
 * plugin, e quem valida entrada é quem recebe.
 */
async function coletarRastreio(): Promise<CheckoutTracking> {
  const jar = await cookies();
  const h = await headers();

  // No Cloudflare o IP verdadeiro vem no `cf-connecting-ip`. O
  // `x-forwarded-for` fica de reserva e só o PRIMEIRO endereço vale: o resto da
  // lista são os proxies do caminho.
  const encaminhado = (h.get("x-forwarded-for") || "").split(",")[0].trim();

  return {
    fbc: jar.get(FBC_COOKIE)?.value,
    fbp: jar.get("_fbp")?.value,
    external_id: jar.get("_ga")?.value,
    ip: h.get("cf-connecting-ip") || encaminhado || undefined,
    ua: h.get("user-agent") || undefined,
  };
}

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

  const result = await createCheckoutSession(
    session.access_token,
    plan,
    currency,
    await coletarRastreio()
  );

  if ("error" in result) {
    if (result.error === "use_portal_to_change_plan") {
      redirect("/app/conta?notice=already_subscribed");
    }
    redirect("/app?checkout=error");
  }

  redirect(result.url);
}
