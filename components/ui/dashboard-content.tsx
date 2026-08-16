"use client";

import Link from "next/link";
import { Download, CreditCard, Zap, LogOut, ShoppingBag } from "lucide-react";
import { useT, langToLocale } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";
import type { CreditsBalance } from "@/lib/vizai-api";

type Props = {
  firstName: string;
  balance: CreditsBalance | null;
  plan: string | null | undefined;
  periodEnd: string | null;
  cancelScheduled: boolean;
};

export function DashboardContent({
  firstName,
  balance,
  plan,
  periodEnd,
  cancelScheduled,
}: Props) {
  const t = useT();
  const { lang } = useLang();

  const formatDate = (iso: string | null): string => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleDateString(langToLocale[lang], {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const total = balance ? balance.total : null;
  const capacity = balance && balance.capacity > 0 ? balance.capacity : null;
  const usagePct =
    capacity && total !== null
      ? Math.max(0, Math.min(100, Math.round((total / capacity) * 100)))
      : null;

  const isFreePlan = !plan || plan === "free";
  const planLabel = t.planLabels[plan as keyof typeof t.planLabels] ?? t.planLabels.unknown;
  const planDisplay = !isFreePlan
    ? planLabel
    : balance?.has_one_off
      ? t.dashboard.oneOff
      : t.planLabels.free;
  const nextRenewal = periodEnd ? formatDate(periodEnd) : null;

  return (
    <>
      <div className="mb-10">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
          style={{ color: "var(--foreground)" }}
        >
          {t.dashboard.greeting}
          {firstName ? `, ${firstName}` : ""}
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>{t.dashboard.welcome}</p>
      </div>

      {/* Bloco hero: baixar plugin */}
      <div
        className="rounded-2xl border p-8 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <h2
            className="text-2xl font-bold tracking-tight mb-2"
            style={{ color: "var(--foreground)" }}
          >
            {t.dashboard.downloadTitle}
          </h2>
          <p style={{ color: "var(--foreground-muted)" }}>{t.dashboard.downloadDesc}</p>
        </div>
        <Link
          href="/download"
          className="inline-flex items-center gap-2 bg-[#0940D2] hover:bg-[#0730b0] text-white text-base font-semibold px-6 py-3 rounded-full transition-colors shrink-0"
        >
          <Download size={18} />
          {t.dashboard.downloadCta}
        </Link>
      </div>

      {/* Cards de conta */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Card Créditos */}
        <div
          className="rounded-2xl border p-6 flex flex-col"
          style={{ borderColor: "var(--border)" }}
        >
          <Zap size={22} className="mb-3" style={{ color: "#0940D2" }} />
          <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            {t.dashboard.creditsTitle}
          </h3>
          {balance ? (
            isFreePlan && total === 0 ? (
              <>
                <div className="mb-2">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t.dashboard.freeCredits}
                  </span>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {t.dashboard.freeCreditsHint}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {total}
                  </span>
                  {capacity ? (
                    <span
                      className="text-sm"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      / {capacity}
                    </span>
                  ) : null}
                </div>
                {usagePct !== null ? (
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden mb-3"
                    style={{ backgroundColor: "rgba(127,127,127,0.15)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${usagePct}%`, backgroundColor: "#0940D2" }}
                    />
                  </div>
                ) : null}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {balance.monthly > 0
                    ? t.dashboard.creditsMonthlyPerpetual
                        .replace("{monthly}", String(balance.monthly))
                        .replace("{perpetual}", String(balance.perpetual))
                    : t.dashboard.creditsPerpetualOnly.replace(
                        "{perpetual}",
                        String(balance.perpetual),
                      )}
                </p>
              </>
            )
          ) : (
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "var(--foreground-muted)" }}
            >
              {t.dashboard.creditsError}
            </p>
          )}
        </div>

        {/* Card Plano */}
        <div
          className="rounded-2xl border p-6 flex flex-col"
          style={{ borderColor: "var(--border)" }}
        >
          <CreditCard size={22} className="mb-3" style={{ color: "#0940D2" }} />
          <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            {t.dashboard.planTitle}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              {planDisplay}
            </span>
            {cancelScheduled ? (
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(220, 60, 60, 0.12)",
                  color: "rgb(180, 40, 40)",
                }}
              >
                {t.dashboard.cancelBadge}
              </span>
            ) : null}
          </div>
          {nextRenewal && !isFreePlan ? (
            <p className="text-xs mb-3 flex-1" style={{ color: "var(--foreground-muted)" }}>
              {t.dashboard.nextRenewal.replace("{date}", nextRenewal)}
            </p>
          ) : (
            <p className="text-xs mb-3 flex-1" style={{ color: "var(--foreground-muted)" }}>
              {isFreePlan ? t.dashboard.noSubscription : ""}
            </p>
          )}
          {isFreePlan ? (
            <Link
              href="/#pricing"
              className="text-sm font-medium inline-flex items-center gap-1"
              style={{ color: "#0940D2" }}
            >
              {t.dashboard.viewPlans}
            </Link>
          ) : (
            <form action="/app/portal" method="post">
              <button
                type="submit"
                className="text-sm font-medium inline-flex items-center gap-1"
                style={{ color: "#0940D2" }}
              >
                {t.dashboard.managePlan}
              </button>
            </form>
          )}
        </div>

        {/* Card Comprar Créditos */}
        <div
          className="rounded-2xl border p-6 flex flex-col"
          style={{ borderColor: "var(--border)" }}
        >
          <ShoppingBag size={22} className="mb-3" style={{ color: "#0940D2" }} />
          <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            {t.dashboard.buyCreditsTitle}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 flex-1"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.dashboard.buyCreditsDesc}
          </p>
          <Link
            href="/#pricing-packs"
            className="text-sm font-medium inline-flex items-center gap-1"
            style={{ color: "#0940D2" }}
          >
            {t.dashboard.viewOptions}
          </Link>
        </div>
      </div>

      {/* Sair */}
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
        >
          <LogOut size={16} />
          {t.dashboard.signOut}
        </button>
      </form>
    </>
  );
}
