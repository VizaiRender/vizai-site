// Comportamento no site: onde a pessoa clica, até onde ela rola e em que ponto
// ela para. Duas ferramentas, de propósito, porque respondem coisas diferentes:
//
// - Microsoft Clarity: mapa de calor de clique e de rolagem + gravação de
//   sessão. Responde o "onde" no visual, sem eu ter que adivinhar antes o que
//   vale medir.
// - GA4: funil, página de saída, retenção. Responde o "quantos" e "em que
//   ordem", e é o único dos dois que fecha o ciclo com begin_checkout/purchase.
//
// COMO ISTO CHEGA NO GA4 (mudou em 24/08/2026, ler antes de mexer):
//
// Este arquivo NÃO carrega mais a biblioteca do GA4. Carregava, e isso derrubou
// o rastreamento do Meta por 14 horas: eram DUAS instâncias do gtag para o
// MESMO measurement id na mesma página, e a configuração do gtag é por id e
// global. A do GTM aponta o `server_container_url` pro sst.vizairender.com; a
// daqui não apontava pra lugar nenhum. Quem carregava por último ganhava, e na
// maioria das vezes ganhava a daqui: o evento ia direto pro Google, não passava
// pelo servidor da Stape, e a tag da Conversions API do Meta nunca disparava.
// Medido na Meta: o lado servidor caiu de ~100% pra 17% do lado navegador.
//
// Agora existe UMA instância só, a do GTM. Este arquivo empurra comandos gtag
// na fila do GTM com `send_to`, então herda a configuração dela, inclusive o
// endereço do servidor. Caminho final: código -> gtag do GTM -> Stape -> GA4.
//
// REGRA QUE NÃO PODE SER QUEBRADA: nunca mandar daqui evento chamado
// `purchase`, `begin_checkout` ou `page_view` puro. O gatilho "ec - eventos
// Meta" do contêiner servidor casa com `^(page_view|begin_checkout|purchase)$`
// e transformaria isso em conversão inventada na Meta. O pageview de navegação
// interna leva `vz_nav: 1` justamente pra ser excluído lá.

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
  // A fila do GTM, compartilhada de propósito. É ela que o gtag do container
  // lê, e é assim que herdamos o `server_container_url` sem redefinir nada.
  dataLayer?: unknown[];
  clarity?: (...args: unknown[]) => void;
};

/**
 * Um comando gtag na fila do GTM.
 *
 * Tem que ser `function` com `arguments` de verdade: o gtag.js reconhece o
 * comando pelo formato do objeto `arguments`, e uma lista comum passa batida e
 * some sem erro nenhum.
 *
 * Se o GTM estiver bloqueado (bloqueador de anúncio), o comando fica parado na
 * fila e nada acontece. É o mesmo destino que o resto da medição já tem.
 */
// Os parâmetros existem só pra assinatura bater; quem viaja é o `arguments`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtagCmd(_comando?: unknown, _nome?: unknown, _params?: unknown) {
  const win = w();
  if (!win) return;
  win.dataLayer = win.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  win.dataLayer.push(arguments);
}

/** Endereço da página no momento do evento. Numa SPA o documento não recarrega,
 *  então sem isto todo evento sairia carimbado com a página de ENTRADA e o
 *  relatório diria que ninguém clica fora da home. */
function contextoDaPagina(): Record<string, unknown> {
  try {
    return {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
    };
  } catch {
    return {};
  }
}

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
/**
 * Endereços onde a medição vale. Qualquer outro host (localhost, preview do
 * Cloudflare, túnel de teste) fica de fora.
 *
 * Motivo, medido em 2026-08-26: o relatório do Clarity trazia 13 visitas de
 * `localhost:3111`, ou seja, a máquina de desenvolvimento mandando dado pro
 * projeto de PRODUÇÃO. Com ~200 sessões por período, isso é 6% de dado falso,
 * e envenena justamente a leitura de página nova, que é quando a gente mais
 * mexe no site rodando local.
 *
 * Pra testar a medição localmente de propósito, subir o dev com
 * `NEXT_PUBLIC_MEASURE_LOCAL=1`.
 */
export const MEASURED_HOSTS = ["vizairender.com", "www.vizairender.com"];

function medindoNesteHost(): boolean {
  if (process.env.NEXT_PUBLIC_MEASURE_LOCAL === "1") return true;
  try {
    return MEASURED_HOSTS.includes(window.location.hostname);
  } catch {
    // Sem window (render no servidor) não existe host pra decidir, e nada é
    // medido de lá mesmo.
    return false;
  }
}

export function analyticsAllowed(): boolean {
  // A trava de host vem primeiro de propósito: ela não depende de consentimento
  // nem de storage, e vale pro Clarity e pros eventos de comportamento juntos,
  // porque todo mundo aqui passa por esta função.
  if (!medindoNesteHost()) return false;
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
  if (!win || !GA_MEASUREMENT_ID || !analyticsAllowed()) return;
  try {
    // `send_to` é o que amarra o evento na configuração do GTM. Sem ele o gtag
    // manda pra toda configuração registrada na página, e um dia isso vira
    // evento duplicado quando aparecer uma segunda.
    gtagCmd("event", event, {
      ...contextoDaPagina(),
      ...params,
      send_to: GA_MEASUREMENT_ID,
    });
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
 * Um evento com NOME PRÓPRIO no Clarity, sem par no GA4.
 *
 * Existe porque `track()` manda tudo pro Clarity como o mesmo nome de evento,
 * já que lá evento não aceita parâmetro. Resultado: dentro do Clarity o clique
 * que baixa o plugin era indistinguível do clique em qualquer outro botão, e
 * não dava pra usar como etapa de funil.
 *
 * O caminho alternativo (evento inteligente por TEXTO do botão, montado no
 * painel) não resolve: "Baixar plugin" é o texto do menu e do rodapé também,
 * que aparecem em 10 páginas e só navegam. Aqui só entra o clique verdadeiro.
 */
export function clarityEvent(name: string): void {
  if (!analyticsAllowed()) return;
  try {
    w()?.clarity?.("event", name);
  } catch {
    /* analytics nunca derruba a página */
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
 *
 * O `vz_nav: 1` NÃO é enfeite. Este evento se chama `page_view`, e no contêiner
 * servidor o gatilho "ec - eventos Meta" casa com esse nome e mandaria um
 * PageView extra pra Conversions API, sem par no navegador e sem deduplicação.
 * A marca existe pra aquele gatilho poder excluir esta navegação. Se ela sair
 * daqui, a contagem da Meta infla calada.
 */
export function trackPageView(url: string, title?: string): void {
  const win = w();
  if (!win || !GA_MEASUREMENT_ID || !analyticsAllowed()) return;
  try {
    // Nada de `set` global. O `set` do gtag vale pra TODA configuração da
    // página, então ele reescreveria também a página das tags de venda do GTM,
    // que alimentam o Meta. O endereço vai evento a evento, que é o que o GA4
    // precisa de qualquer forma.
    gtagCmd("event", "page_view", {
      page_location: window.location.origin + url,
      page_path: url,
      page_title: title ?? document.title,
      vz_nav: 1,
      send_to: GA_MEASUREMENT_ID,
    });
  } catch {
    /* idem */
  }
}
