"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, AlertCircle, Info } from "lucide-react";
import { useT, langToLocale } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageProvider";

type Props = {
  email: string | null | undefined;
  name: string | null;
  plan: string | null | undefined;
  periodEnd: string | null;
  cancelScheduled: boolean;
  notice: string | null;
  portalError: string | null;
};

export function AccountContent({
  email,
  name,
  plan,
  periodEnd,
  cancelScheduled,
  notice,
  portalError,
}: Props) {
  const t = useT();
  const { lang } = useLang();

  const formatDate = (iso: string | null): string => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString(langToLocale[lang], {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const isFreePlan = !plan || plan === "free";
  const planLabel = t.planLabels[plan as keyof typeof t.planLabels] ?? t.planLabels.unknown;

  return (
    <>
      <Link
        href="/app"
        className="inline-flex items-center gap-1.5 text-sm mb-8"
        style={{ color: "var(--foreground-muted)" }}
      >
        <ArrowLeft size={14} />
        {t.account.back}
      </Link>

      <h1
        className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
        style={{ color: "var(--foreground)" }}
      >
        {t.account.title}
      </h1>
      <p className="mb-10" style={{ color: "var(--foreground-muted)" }}>
        {t.account.subtitle}
      </p>

      {notice === "already_subscribed" ? (
        <div
          className="rounded-2xl border p-4 mb-6 flex items-start gap-3"
          style={{
            borderColor: "rgba(9, 64, 210, 0.3)",
            backgroundColor: "rgba(9, 64, 210, 0.05)",
          }}
        >
          <Info size={18} className="shrink-0 mt-0.5" style={{ color: "#0940D2" }} />
          <div className="min-w-0">
            <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
              {t.account.alreadySubscribedTitle}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t.account.alreadySubscribedBody}
            </p>
          </div>
        </div>
      ) : null}

      {portalError ? (
        <div
          className="rounded-2xl border p-4 mb-6 flex items-start gap-3"
          style={{
            borderColor: "rgba(220, 60, 60, 0.3)",
            backgroundColor: "rgba(220, 60, 60, 0.05)",
          }}
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "rgb(180, 40, 40)" }} />
          <div className="min-w-0">
            <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
              {t.account.portalErrorTitle}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {portalError === "no_stripe_customer"
                ? t.account.portalErrorNoCustomer
                : t.account.portalErrorGeneric}
            </p>
          </div>
        </div>
      ) : null}

      <div
        className="rounded-2xl border p-6 mb-6"
        style={{ borderColor: "rgba(127,127,127,0.18)" }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>
          {t.account.accountDataTitle}
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt style={{ color: "var(--foreground-muted)" }}>{t.account.email}</dt>
            <dd style={{ color: "var(--foreground)" }}>{email}</dd>
          </div>
          {name ? (
            <div className="flex justify-between gap-4">
              <dt style={{ color: "var(--foreground-muted)" }}>{t.account.name}</dt>
              <dd style={{ color: "var(--foreground)" }}>{name}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ borderColor: "rgba(127,127,127,0.18)" }}
      >
        <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          {t.account.subscriptionTitle}
        </h2>
        <dl className="space-y-3 text-sm mb-5">
          <div className="flex justify-between gap-4">
            <dt style={{ color: "var(--foreground-muted)" }}>{t.account.plan}</dt>
            <dd className="font-medium" style={{ color: "var(--foreground)" }}>
              {planLabel}
            </dd>
          </div>
          {periodEnd && !isFreePlan ? (
            <div className="flex justify-between gap-4">
              <dt style={{ color: "var(--foreground-muted)" }}>
                {cancelScheduled ? t.account.cancelsOn : t.account.nextRenewalLabel}
              </dt>
              <dd style={{ color: "var(--foreground)" }}>{formatDate(periodEnd)}</dd>
            </div>
          ) : null}
        </dl>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground-muted)" }}>
          {t.account.portalHint}
        </p>

        {isFreePlan ? (
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-[#0940D2] hover:bg-[#0730b0] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            {t.account.viewPlans}
          </Link>
        ) : (
          <form action="/app/portal" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#0940D2] hover:bg-[#0730b0] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <CreditCard size={16} />
              {t.account.openPortal}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
