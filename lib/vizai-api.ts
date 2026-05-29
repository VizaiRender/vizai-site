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

export async function createCheckoutSession(
  accessToken: string,
  lookupKey: string,
  currency: string
): Promise<{ url: string } | { error: string; code?: string }> {
  try {
    const res = await authedFetch("/api/create-checkout-session", accessToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lookup_key: lookupKey, currency }),
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
