"use client";

import { useEffect, useRef } from "react";

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
// Quanto esperar pelo cookie `_ga` antes de disparar assim mesmo. Medido em
// produção, 5 rodadas: nesta página o `purchase` sai aos 310-410 ms e o `_ga`
// só nasce aos 770-1490 ms. Ou seja, o evento SEMPRE ganhava a corrida por meio
// segundo, e a tag lia um cookie que ainda não existia — era daí que vinham os
// 40% de Purchase sem `external_id` no Events Manager. 2,5 s cobre a pior
// medição com folga, inclusive celular lento.
const ESPERA_GA_MS = 2500;

const temGa = () => /(?:^|;\s*)_ga=/.test(document.cookie);

export function PurchaseTracker({ value, currency, transactionId, em, ph, fbc }: Props) {
  // Trava de memória, separada da de localStorage: o React remonta o efeito em
  // desenvolvimento, e sem isto a espera abaixo abriria brecha pra dois envios.
  const jaDisparou = useRef(false);

  useEffect(() => {
    if (!transactionId || !value || !currency) return;
    if (jaDisparou.current) return;

    const key = `purchase_fired_${transactionId}`;
    try {
      if (localStorage.getItem(key)) return;
    } catch {
      // localStorage indisponível (modo privado): segue e dispara mesmo assim —
      // perder uma venda real é pior que arriscar uma repetida.
    }

    const disparar = () => {
      if (jaDisparou.current) return;
      jaDisparou.current = true;
      // A trava só é gravada AGORA, não antes da espera. Se fosse antes, um
      // recarregamento no meio dos 2,5 s deixaria a venda travada sem nunca ter
      // sido enviada.
      try {
        localStorage.setItem(key, "1");
      } catch {
        /* idem */
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
    };

    // Quem já navegou pelo site chega com o `_ga` pronto: dispara na hora, sem
    // atraso nenhum. Só espera quem não tem — que é justamente quem estava
    // perdendo o identificador.
    if (temGa()) {
      disparar();
      return;
    }

    const inicio = Date.now();
    const relogio = setInterval(() => {
      if (temGa() || Date.now() - inicio >= ESPERA_GA_MS) {
        clearInterval(relogio);
        disparar();
      }
    }, 50);

    // Saiu da página no meio da espera? Dispara sem o identificador. Uma venda
    // sem `external_id` é o que acontecia antes; uma venda NÃO reportada seria
    // pior que isso.
    return () => {
      clearInterval(relogio);
      disparar();
    };

    // NÃO espelhar a venda no GA4 daqui. O container web já tem a tag
    // "01 | Google Analytics - Purchase" disparando neste mesmo evento do
    // dataLayer (conferido no export do GTM). Duas fontes mandando a mesma
    // venda dobrariam a RECEITA no relatório — e receita dobrada é o tipo de
    // erro que ninguém percebe, porque o número só parece bom.
  }, [value, currency, transactionId, em, ph, fbc]);

  return null;
}
