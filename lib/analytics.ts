// Comportamento no site: onde a pessoa clica, até onde ela rola e em que ponto
// ela para. Duas ferramentas, de propósito, porque respondem coisas diferentes:
//
// - Microsoft Clarity: mapa de calor de clique e de rolagem + gravação de
//   sessão. Responde o "onde" no visual, sem eu ter que adivinhar antes o que
//   vale medir.
// - GA4: funil, página de saída, retenção. Responde o "quantos" e "em que
//   ordem", e é o único dos dois que fecha o ciclo com begin_checkout/purchase.
//
// O GTM/Stape que já existe continua sendo do Meta — este arquivo NÃO empurra
// nada pro dataLayer, justamente pra não correr risco de contar venda duas
// vezes lá. Aqui só falamos gtag (GA4) e clarity.

/**
 * Os dois IDs são públicos por natureza: viajam no HTML de todo visitante e não
 * dão acesso a nada. Seguem o padrão do resto do repo (env var com fallback
 * fixo) pra funcionar no build do Worker mesmo sem .env.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-6ZWKNPPY5B";
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "y72haezc1o";

/**
 * Onde a gravação de sessão NÃO roda.
 *
 * A tela logada mostra email, saldo e renders de clientes; o checkout e o
 * /obrigado mostram dados de compra. Gravar isso seria guardar dado pessoal de
 * terceiro dentro da Microsoft, então essas rotas ficam fora por regra, não por
 * configuração de painel (que qualquer um pode desligar sem querer).
 *
 * /login e /signup FICAM dentro: antes do clique no Google não existe nenhum
 * dado pessoal na tela, e é exatamente ali que o funil sangra.
 */
const NO_RECORDING_PREFIXES = ["/app", "/checkout", "/obrigado", "/sucesso", "/auth"];

export function isRecordablePath(pathname: string): boolean {
  return !NO_RECORDING_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

type AnalyticsWindow = Window & {
  // Nome próprio de propósito. `window.gtag` é o nome que o GTM também pode
  // ocupar; sobrescrever ele daria um jeito silencioso de um quebrar o outro,
  // e quem quebraria é o rastreamento de venda do Meta, que já está validado
  // em produção.
  vizaiGtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

function w(): AnalyticsWindow | null {
  return typeof window === "undefined" ? null : (window as AnalyticsWindow);
}

/** Chave que o banner de cookies grava. Só o "false" explícito bloqueia: quem
 *  nunca respondeu segue sendo medido, que é a decisão de produto. */
export const CONSENT_KEY = "cookie-consent";

/** Evento que o banner dispara ao ser respondido, pra quem já está na página
 *  reagir na hora em vez de só na próxima visita. */
export const CONSENT_EVENT = "vizai-consent-change";

/**
 * A pessoa recusou?
 *
 * O banner sempre teve o botão "Recusar" e ele não recusava nada — gravava a
 * escolha e seguia medindo igual. Botão que mente é pior que banner nenhum,
 * então agora a recusa desliga de verdade o que este arquivo controla
 * (Clarity e os eventos de comportamento do GA4).
 *
 * O que NÃO está aqui: o GTM/Meta, que carrega no layout e é um trabalho
 * validado em produção. Ligar consentimento nele é um passo à parte.
 */
export function analyticsAllowed(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) !== "false";
  } catch {
    // Modo privado ou storage bloqueado: não dá pra saber que recusou, então
    // vale a decisão padrão (medir).
    return true;
  }
}

/**
 * Um evento de comportamento. Vai pro GA4 com os parâmetros e pro Clarity só
 * com o nome — o Clarity não aceita payload em evento, mas o nome já serve de
 * filtro pra achar as gravações de quem fez aquilo.
 *
 * Nunca passe email, telefone ou qualquer coisa que identifique a pessoa: o GA4
 * proíbe por contrato e apaga a propriedade inteira quando encontra.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  const win = w();
  if (!win || !analyticsAllowed()) return;
  try {
    win.vizaiGtag?.("event", event, params);
  } catch {
    // Analytics nunca pode derrubar a página. Falha calada é o certo aqui.
  }
  try {
    win.clarity?.("event", event);
  } catch {
    /* idem */
  }
}

/**
 * Etiqueta a gravação de sessão inteira (não um momento dela). Serve pra
 * filtrar no Clarity: "me mostra as sessões de quem chegou no preço".
 */
export function clarityTag(key: string, value: string): void {
  if (!analyticsAllowed()) return;
  try {
    w()?.clarity?.("set", key, value);
  } catch {
    /* idem */
  }
}

/**
 * Pageview de uma navegação INTERNA (sem recarregar o documento).
 *
 * A divisão de trabalho com o GTM foi medida no site em produção, não suposta:
 *
 * - Carregamento do documento: a tag do GTM manda `en=page_view` pro
 *   `G-6ZWKNPPY5B` através do servidor da Stape. Por isso o gtag daqui sobe com
 *   `send_page_view: false` — se mandasse também, toda visita contaria duas
 *   vezes.
 * - Navegação interna: o GTM não manda NADA. Verificado duas vezes no site ao
 *   vivo, em dois caminhos diferentes, inclusive esperando o flush da saída da
 *   aba. Como o site é uma SPA, isso significa que hoje só a página de entrada
 *   é contada e todo o resto é invisível. Este pageview aqui fecha esse buraco.
 *
 * CUIDADO AO MEXER NO GTM: se algum dia alguém criar lá um gatilho de "History
 * Change" (mudança de histórico), as duas fontes passam a contar a mesma
 * navegação e o número dobra. Nesse dia, apague esta chamada — não o gatilho.
 */
export function trackPageView(url: string, title?: string): void {
  const win = w();
  if (!win || !GA_MEASUREMENT_ID || !analyticsAllowed()) return;
  const pagina = {
    page_location: window.location.origin + url,
    page_path: url,
    page_title: title ?? document.title,
  };
  try {
    // O `set` vem ANTES e não é detalhe. O gtag guarda a página de quando foi
    // configurado, e numa SPA o documento não recarrega: sem isso, o pageview
    // sairia com o endereço certo mas TODO evento seguinte (clique, rolagem,
    // saída) continuaria sendo carimbado com a página de entrada. Nos
    // relatórios prontos do GA4 pareceria que ninguém nunca clica fora da home.
    win.vizaiGtag?.("set", pagina);
    win.vizaiGtag?.("event", "page_view", pagina);
  } catch {
    /* idem */
  }
}
