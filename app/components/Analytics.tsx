"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  CLARITY_PROJECT_ID,
  CONSENT_EVENT,
  GA_MEASUREMENT_ID,
  analyticsAllowed,
  isRecordablePath,
  trackPageView,
} from "@/lib/analytics";

/** Só o que serve pra atribuir a visita. O resto da query fica de fora porque
 *  é por ali que token e código de login viajam. */
const KEEP_QUERY = /^(utm_|gclid$|fbclid$|ttclid$|ref$)/;

function safeUrl(pathname: string): string {
  let search = "";
  try {
    const kept = new URLSearchParams();
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (KEEP_QUERY.test(k)) kept.append(k, v);
    });
    const s = kept.toString();
    if (s) search = `?${s}`;
  } catch {
    /* sem query é melhor que quebrar */
  }
  return pathname + search;
}

function clarityCall(...args: unknown[]): void {
  try {
    (window as Window & { clarity?: (...a: unknown[]) => void }).clarity?.(...args);
  } catch {
    /* analytics nunca derruba a página */
  }
}

/**
 * Carrega GA4 e Clarity e mantém os dois em dia com a navegação SPA.
 *
 * Nada é carregado antes de saber a resposta do banner de cookies, e nada é
 * carregado se a pessoa recusou. Sem os IDs preenchidos o componente também não
 * injeta nada, então dá pra subir o código antes de existir conta.
 */
export function Analytics() {
  const pathname = usePathname();
  // null = ainda não sei (primeiro render / servidor). O localStorage só existe
  // no navegador, então a resposta do banner só chega depois da montagem.
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const firstRun = useRef(true);
  const clarityLoaded = useRef(false);
  const clarityRunning = useRef(false);

  // Lê a resposta do banner na montagem e reage a quem responde com a página já
  // aberta (o banner dispara CONSENT_EVENT), pra recusa valer na hora e não só
  // na próxima visita.
  useEffect(() => {
    const ler = () => setAllowed(analyticsAllowed());
    ler();
    window.addEventListener(CONSENT_EVENT, ler);
    return () => window.removeEventListener(CONSENT_EVENT, ler);
  }, []);

  // Pageview só das navegações internas. Ver trackPageView em lib/analytics.ts:
  // o carregamento do documento já é contado pela tag do GTM, e a navegação
  // interna não é contada por ninguém.
  useEffect(() => {
    if (allowed !== true) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    trackPageView(safeUrl(pathname));
  }, [pathname, allowed]);

  // Clarity: gravação de sessão só nas páginas públicas, e só com consentimento.
  useEffect(() => {
    if (!CLARITY_PROJECT_ID || allowed === null) return;

    const deveGravar = allowed && isRecordablePath(pathname);

    if (!deveGravar) {
      // Entrou numa tela com dado pessoal (ou recusou os cookies): para de
      // gravar na hora. Não basta não carregar no início — quem navega da home
      // pro painel levaria o gravador junto, porque o script já está na página.
      // Verificado: depois do stop, minutos de rolagem e clique não geram
      // nenhum envio, e o conteúdo da tela seguinte não sai.
      if (clarityRunning.current) {
        clarityCall("stop");
        clarityRunning.current = false;
      }
      return;
    }

    if (!clarityLoaded.current) {
      clarityLoaded.current = true;
      clarityRunning.current = true;
      const win = window as Window & {
        clarity?: ((...a: unknown[]) => void) & { q?: unknown[] };
      };
      win.clarity =
        win.clarity ||
        function (...args: unknown[]) {
          (win.clarity!.q = win.clarity!.q || []).push(args);
        };
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
      document.head.appendChild(s);
      return;
    }

    if (!clarityRunning.current) {
      clarityCall("start");
      clarityRunning.current = true;
    }
  }, [pathname, allowed]);

  if (!GA_MEASUREMENT_ID || allowed !== true) return null;

  return (
    <>
      <Script
        id="ga4-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}&l=vizaiDataLayer`}
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
// Fila PRÓPRIA e nome PRÓPRIO, os dois separados do GTM (daí o &l= na URL da
// lib acima). O GTM/Stape que manda venda pro Meta é um trabalho já validado em
// produção; dividir a fila ou o nome com ele criaria um jeito silencioso de um
// quebrar o outro.
window.vizaiDataLayer = window.vizaiDataLayer || [];
window.vizaiGtag = function(){window.vizaiDataLayer.push(arguments);};
window.vizaiGtag('js', new Date());
window.vizaiGtag('config', '${GA_MEASUREMENT_ID}', {
  // NÃO manda pageview no carregamento: quem conta essa visita é a tag do GTM,
  // medido no site em produção. A navegação interna, que o GTM não cobre, é
  // mandada pelo componente.
  send_page_view: false,
  // Nada de publicidade personalizada a partir do GA4: quem faz remarketing
  // aqui é o Meta, pelo GTM. Estes dois são respeitados de verdade (o
  // anonymize_ip que costuma vir junto em tutoriais NÃO é: no GA4 ele é
  // ignorado, porque o IP já não é guardado por padrão).
  allow_google_signals: false,
  allow_ad_personalization_signals: false
  // NAO usar server_container_url aqui. Passar por sst.vizairender.com faria
  // meus eventos entrarem no container servidor, e lá o gatilho da CAPI do Meta
  // casa com ^(page_view|begin_checkout|purchase)$. O meu page_view de
  // navegação interna viraria um PageView extra na Meta, SEM o par no pixel do
  // navegador (que tem disablePushState ligado de propósito) — ou seja, sem
  // deduplicação e com a contagem inflada. O preço de ir direto é perder
  // alguma coisa pra bloqueador de anúncio; vale menos que sujar a Meta.
});`,
        }}
      />
    </>
  );
}
