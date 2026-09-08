const API_BASE =
  process.env.NEXT_PUBLIC_VIZAI_API_URL || "https://api.vizairender.com";

export type CreditsBalance = {
  monthly: number;
  perpetual: number;
  total: number;
  monthly_reset_at: string | null;
  capacity: number;
  capacity_monthly: number;
  capacity_perpetual: number;
  has_one_off?: boolean;
};

export type SubscriptionInfo = {
  plan: string;
  status: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  has_customer_id?: boolean;
};

const PLAN_LABELS: Record<string, string> = {
  free: "Grátis",
  starter_monthly: "Starter",
  starter_annual: "Starter Anual",
  pro_monthly: "PRO",
  pro_annual: "PRO Anual",
  business_monthly: "Business",
  business_annual: "Business Anual",
  unknown: "Plano ativo",
};

export function planLabel(plan: string | null | undefined): string {
  if (!plan) return "Grátis";
  return PLAN_LABELS[plan] || "Plano ativo";
}

async function authedFetch(
  path: string,
  accessToken: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
}

export async function fetchCreditsBalance(
  accessToken: string
): Promise<CreditsBalance | null> {
  try {
    const res = await authedFetch("/api/credits-balance", accessToken);
    if (!res.ok) return null;
    return (await res.json()) as CreditsBalance;
  } catch {
    return null;
  }
}

export async function fetchSubscription(
  accessToken: string
): Promise<SubscriptionInfo | null> {
  try {
    const res = await authedFetch("/api/me/subscription", accessToken);
    if (!res.ok) return null;
    return (await res.json()) as SubscriptionInfo;
  } catch {
    return null;
  }
}

/**
 * Avisa o servidor que alguém acabou de entrar pelo SITE.
 *
 * O servidor é quem decide se é a primeira vez (olhando se a pessoa já existe no
 * Resend) e quem abre a régua de "criou conta e ainda não instalou o plugin".
 * Daqui sai só o aviso: o email nunca viaja no corpo, vem do próprio token.
 *
 * NUNCA lança e nunca atrasa o login. Roda dentro de um `after()`, ou seja
 * depois de a pessoa já ter sido redirecionada, e ainda assim tem prazo: se a
 * API estiver fora, perder um email de onboarding é irrelevante perto de segurar
 * o processo de login de pé.
 */
export async function notifySiteLogin(
  accessToken: string,
  lang: string
): Promise<void> {
  try {
    await authedFetch("/api/site-first-login", accessToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // silêncio proposital: onboarding não pode derrubar autenticação
  }
}

/**
 * Identificadores de anúncio que viajam junto com o checkout.
 *
 * Servem pro Purchase de boleto/Pix, que nasce num webhook da Stripe: lá não há
 * navegador, nem cookie, nem IP do comprador, e o evento chegava na Meta só com
 * email e telefone. O servidor guarda isto na sessão da Stripe e lê de volta na
 * hora que o boleto é pago.
 *
 * Todos opcionais: quem nunca clicou num anúncio não tem fbc, e o checkout tem
 * que funcionar igual.
 */
export type CheckoutTracking = {
  fbc?: string;
  fbp?: string;
  external_id?: string;
  ip?: string;
  ua?: string;
};

export async function createCheckoutSession(
  accessToken: string,
  lookupKey: string,
  currency: string,
  tracking?: CheckoutTracking
): Promise<{ url: string } | { error: string; code?: string }> {
  try {
    const res = await authedFetch("/api/create-checkout-session", accessToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lookup_key: lookupKey, currency, tracking }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string };
      return { error: data.error || "checkout_failed", code: String(res.status) };
    }
    const data = (await res.json()) as { url?: string };
    if (!data.url) return { error: "missing_url" };
    return { url: data.url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "network_error" };
  }
}

export async function createPortalSession(
  accessToken: string,
  returnUrl: string
): Promise<{ url: string } | { error: string }> {
  try {
    const res = await authedFetch("/api/create-portal-session", accessToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ return_url: returnUrl }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { error: text.slice(0, 200) || "portal_failed" };
    }
    const data = (await res.json()) as { url?: string };
    if (!data.url) return { error: "missing_url" };
    return { url: data.url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "network_error" };
  }
}
