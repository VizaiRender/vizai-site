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
  // Id do clique no anúncio (formato fb.1.<ms>.<fbclid>), lido do cookie de
  // primeira parte no servidor. O GTM repassa pra Conversions API, que é quem
  // liga a venda ao anúncio que a gerou.
  fbc?: string;
};

// Dispara o evento `purchase` no dataLayer (GTM) uma única vez por transação.
// A deduplicação entre Pixel (browser) e CAPI (servidor) NÃO é feita por este
// transaction_id: quem gera o event_id é o próprio GTM (variável "Unique Event
// ID"), e as duas tags disparam no mesmo evento do dataLayer, então recebem o
// mesmo valor. O transaction_id daqui viaja como order_id. Só a CAPI do boleto
// (Cloud Run) usa o id da sessão Stripe como event_id, e esse caminho nunca
// coexiste com o do browser. A trava fica em localStorage, não em sessionStorage:
// sessionStorage é POR ABA, então reabrir o link numa aba nova (histórico,
// restauração de sessão) re-disparava a mesma venda. Em localStorage a
// transação dispara uma vez só naquele navegador, pra sempre.
export function PurchaseTracker({ value, currency, transactionId, em, ph, fbc }: Props) {
  useEffect(() => {
    if (!transactionId || !value || !currency) return;

    const key = `purchase_fired_${transactionId}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      // localStorage indisponível (modo privado): segue e dispara mesmo assim —
      // perder uma venda real é pior que arriscar uma repetida.
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
      ...(fbc ? { fbc } : {}),
    });

    // NÃO espelhar a venda no GA4 daqui. O container web já tem a tag
    // "01 | Google Analytics - Purchase" disparando neste mesmo evento do
    // dataLayer (conferido no export do GTM). Duas fontes mandando a mesma
    // venda dobrariam a RECEITA no relatório — e receita dobrada é o tipo de
    // erro que ninguém percebe, porque o número só parece bom.
  }, [value, currency, transactionId, em, ph, fbc]);

  return null;
}
