"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CLARITY_PROJECT_ID,
  CONSENT_EVENT,
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

  // Nada de <script> do GA4 aqui, e isso é o conserto de 24/08/2026.
  //
  // Este componente carregava a biblioteca do gtag com o MESMO measurement id
  // que a tag do GTM já usava. A configuração do gtag é por id e vale pra
  // página inteira, então as duas brigavam: a do GTM aponta o
  // `server_container_url` pro sst.vizairender.com, a daqui não apontava, e
  // quem carregasse por último ganhava. Na maioria das cargas ganhava a daqui,
  // o evento ia direto pro Google, não passava pelo servidor da Stape e a tag
  // da Conversions API do Meta nunca disparava. Ficou assim 14 horas: na Meta,
  // o lado servidor caiu de ~100% pra 17% do lado navegador, e a venda do dia
  // seguinte perdeu a metade que carrega email, telefone e fbc.
  //
  // Fila própria (`&l=vizaiDataLayer`) NÃO protegia disso: a fila carrega os
  // comandos, mas o endereço do servidor é atributo do measurement id.
  //
  // Agora quem carrega o GA4 é só o GTM, e os eventos daqui entram na fila dele
  // com `send_to` (ver lib/analytics.ts). NÃO reintroduzir <Script> de gtag
  // neste arquivo, com id nenhum: se um dia precisar mesmo de instância
  // própria, tem que ser um measurement id DIFERENTE, de outro fluxo de dados.
  return null;
}
