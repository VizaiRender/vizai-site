"use client";

import { useEffect } from "react";

type Props = {
  value?: string;
  currency?: string;
  transactionId?: string;
};

// Dispara o evento `purchase` no dataLayer (GTM) uma única vez por transação.
// O event_id = transactionId garante deduplicação entre Pixel (browser) e
// CAPI (servidor). A trava em sessionStorage evita re-disparo no refresh/voltar.
export function PurchaseTracker({ value, currency, transactionId }: Props) {
  useEffect(() => {
    if (!transactionId || !value || !currency) return;

    const key = `purchase_fired_${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage indisponível (modo privado): segue e dispara mesmo assim.
    }

    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "purchase",
      value: Number(value),
      currency: currency.toUpperCase(),
      transaction_id: transactionId,
    });
  }, [value, currency, transactionId]);

  return null;
}
