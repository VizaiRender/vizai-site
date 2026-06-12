"use client";

import { useEffect } from "react";

type Props = {
  value?: string;
  currency?: string;
  transactionId?: string;
  // Hashes SHA-256 do email/telefone do comprador (já vêm hasheados do
  // servidor) — advanced matching do Meta no Pixel (browser) e CAPI (server).
  em?: string;
  ph?: string;
};

// Dispara o evento `purchase` no dataLayer (GTM) uma única vez por transação.
// O event_id = transactionId garante deduplicação entre Pixel (browser) e
// CAPI (servidor). A trava em sessionStorage evita re-disparo no refresh/voltar.
export function PurchaseTracker({ value, currency, transactionId, em, ph }: Props) {
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
      ...(em ? { em } : {}),
      ...(ph ? { ph } : {}),
    });
  }, [value, currency, transactionId, em, ph]);

  return null;
}
