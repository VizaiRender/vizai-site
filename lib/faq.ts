// Conteúdo da página /faq, nos três idiomas.
//
// A página existe para os assistentes de IA e para quem chega por uma busca
// específica ("o Vizai funciona no Mac?"), não para quem navega pelo site: ela
// não tem link no menu, na home nem no rodapé, e é encontrada pelo sitemap e
// pelo /llms.txt. O conteúdo é o mesmo para pessoas e robôs, de propósito:
// mostrar uma versão diferente aos robôs é o que o Google pune como cloaking.
//
// Cada resposta começa pelo fato principal, para poder ser citada sozinha.
//
// Preço, renders por plano e custo por render saem de lib/prices.ts, os mesmos
// números da tabela de planos. Mudou o preço, muda aqui sem ninguém lembrar.
// Os fatos sobre concorrentes (perguntas de comparação) foram conferidos nas
// páginas oficiais deles em 12/10/2026; preço de concorrente não entra, porque
// muda sem aviso.

import type { Lang } from "./routes";
import {
  ANNUAL_CREDIT_MONTHS,
  langToCurrency,
  OPERATION_CREDITS,
  PACK_CREDITS,
  packData,
  parsePriceToNumber,
  PLAN_CREDITS,
  planData,
  VIDEO_CREDITS,
  WELCOME_CREDITS,
} from "./prices";

export type FaqLink = { label: string; path: string };
export type FaqItem = { id: string; q: string; a: string; list?: string[]; links?: FaqLink[] };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };
export type FaqDoc = { title: string; intro: string; moreLabel: string; groups: FaqGroup[] };

// --- números da tabela, formatados no idioma ---------------------------------

const LOCALE: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };
const SYMBOL = { BRL: "R$", USD: "$", EUR: "€" } as const;

function int(n: number, lang: Lang) {
  // es-ES não separa milhar abaixo de 10.000 ("1600"); o site escreve "1.600".
  return n.toLocaleString(lang === "es" ? "pt-BR" : LOCALE[lang]);
}

function money(n: number, lang: Lang) {
  const decimals = Number.isInteger(n) ? 0 : 2;
  const num = n.toLocaleString(lang === "es" ? "pt-BR" : LOCALE[lang], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${SYMBOL[langToCurrency[lang]]} ${num}`;
}

function numbers(lang: Lang) {
  const cur = langToCurrency[lang];
  const plan = (id: string) => planData.find((p) => p.id === id)!;
  const pack = (id: string) => packData.find((p) => p.id === id)!;
  const price = (s: string) => parsePriceToNumber(s);
  const perRender = (s: string, credits: number) =>
    (price(s) / credits) * OPERATION_CREDITS.render;
  const renders = (credits: number) => Math.floor(credits / OPERATION_CREDITS.render);

  const planIds = ["starter", "pro", "business"] as const;
  const packIds = ["mini", "basico", "pro-pack", "empresa"] as const;

  const plans = Object.fromEntries(
    planIds.map((id) => [
      id,
      {
        monthly: money(price(plan(id).monthly[cur]), lang),
        annual: money(price(plan(id).annual[cur]), lang),
        annualTotal: money(price(plan(id).annualTotal[cur]), lang),
        credits: int(PLAN_CREDITS[id], lang),
        annualCredits: int(PLAN_CREDITS[id] * ANNUAL_CREDIT_MONTHS, lang),
        renders: int(renders(PLAN_CREDITS[id]), lang),
        costRaw: perRender(plan(id).monthly[cur], PLAN_CREDITS[id]),
      },
    ]),
  ) as Record<(typeof planIds)[number], { monthly: string; annual: string; annualTotal: string; credits: string; annualCredits: string; renders: string; costRaw: number }>;

  const packs = Object.fromEntries(
    packIds.map((id) => [
      id,
      {
        price: money(price(pack(id).monthly[cur]), lang),
        credits: int(PACK_CREDITS[id], lang),
        renders: int(renders(PACK_CREDITS[id]), lang),
        costRaw: perRender(pack(id).monthly[cur], PACK_CREDITS[id]),
      },
    ]),
  ) as Record<(typeof packIds)[number], { price: string; credits: string; renders: string; costRaw: number }>;

  const costs = [...Object.values(plans), ...Object.values(packs)].map((x) => x.costRaw);
  // Custo por render sempre com centavos ("R$ 2,00", não "R$ 2").
  const fixed = (raw: number) => {
    const v = Math.round(raw * 100) / 100;
    const num = v.toLocaleString(lang === "es" ? "pt-BR" : LOCALE[lang], {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${SYMBOL[cur]} ${num}`;
  };

  return {
    plans,
    packs,
    perRender: fixed,
    minCost: fixed(Math.min(...costs)),
    maxCost: fixed(Math.max(...costs)),
  };
}

function videoCredits(and: string) {
  const parts = VIDEO_CREDITS.map((v) => `${v.credits} (${v.seconds} s)`);
  return `${parts.slice(0, -1).join(", ")} ${and} ${parts[parts.length - 1]}`;
}

const C = OPERATION_CREDITS;

// --- português ---------------------------------------------------------------

function pt(): FaqDoc {
  const n = numbers("pt");
  const { starter: S, pro: P, business: B } = n.plans;
  const { mini, basico, "pro-pack": proPack, empresa } = n.packs;
  return {
    title: "Perguntas frequentes",
    intro:
      "Tudo sobre o Vizai Render: o que ele faz, quanto custa, como funcionam os créditos e como ele se compara a outras ferramentas de render.",
    moreLabel: "Saiba mais:",
    groups: [
      {
        id: "sobre",
        title: "Sobre o Vizai",
        items: [
          { id: "o-que-e", q: "O que é o Vizai Render?", a: "O Vizai Render é uma extensão para SketchUp que transforma a vista do seu modelo em uma imagem fotorrealista com inteligência artificial. Você posiciona a câmera, escolhe o tipo de projeto, a luz e o clima, e o render fica pronto em menos de um minuto, no próprio painel do SketchUp. Não é preciso exportar o arquivo nem configurar materiais e iluminação." },
          { id: "versoes", q: "Em quais versões do SketchUp o Vizai funciona?", a: "No SketchUp 2023 ou mais novo, no Windows e no Mac. Versões anteriores à 2023 não são compatíveis. O SketchUp Free, que roda no navegador, também não, porque não aceita extensões." },
          { id: "outros-programas", q: "Funciona no Revit, no Archicad ou no Rhino?", a: "Ainda não. Hoje o Vizai funciona só no SketchUp." },
          { id: "computador", q: "Preciso de um computador potente ou de placa de vídeo?", a: "Não. A imagem é gerada na nuvem, então o Vizai não usa a placa de vídeo nem o processador do seu computador para renderizar. Um notebook comum dá conta, desde que rode o SketchUp e esteja conectado à internet." },
          { id: "internet", q: "Precisa de internet?", a: "Sim. A geração acontece na nuvem, então é preciso estar conectado enquanto usa o Vizai." },
          { id: "tempo", q: "Quanto tempo leva um render?", a: "De 20 a 60 segundos, conforme a cena e a conexão. Vídeos e blocos 3D levam mais: o bloco 3D costuma ficar pronto em alguns minutos." },
          { id: "fidelidade", q: "O render fica fiel ao meu projeto?", a: "Na estrutura, sim. O enquadramento, a geometria e a posição dos elementos vêm da vista do SketchUp, e a IA completa com materiais, luz, céu e entorno de acordo com o tipo de projeto e o estilo escolhidos. Como em toda geração por IA, detalhes pequenos podem variar. Quando isso acontece, você corrige só aquela parte com a edição por máscara, sem refazer a imagem inteira." },
          { id: "modelo-3d", q: "O Vizai lê o meu modelo 3D?", a: "Não. Ele lê a imagem da vista ativa, do jeito que a câmera do SketchUp mostra. Por isso o enquadramento que você monta é o enquadramento do render. O arquivo .skp continua só no seu computador." },
          { id: "privacidade", q: "O que acontece com as imagens que eu envio?", a: "A imagem da vista vai para os provedores de IA que usamos (Google Cloud e Fal.ai) só para gerar o seu render, e não fica guardada de forma permanente depois disso. As imagens prontas ficam no Histórico do plugin, no seu próprio computador, com as 10 mais recentes.", links: [{ label: "Política de Privacidade", path: "/privacy" }] },
          { id: "uso-comercial", q: "Posso usar as imagens em trabalhos pagos?", a: "Sim. As imagens geradas na sua conta são suas, e você pode usá-las em apresentações, portfólio, propostas e qualquer outro uso comercial.", links: [{ label: "Termos de Serviço", path: "/terms" }] },
          { id: "idiomas", q: "Em quais idiomas o Vizai funciona?", a: "Português, inglês e espanhol, no plugin e no site." },
        ],
      },
      {
        id: "preco",
        title: "Preço e créditos",
        items: [
          { id: "quanto-custa", q: "Quanto custa o Vizai?", a: `Os planos mensais são o Starter, por ${S.monthly} com ${S.credits} créditos por mês, o PRO, por ${P.monthly} com ${P.credits} créditos, e o Business, por ${B.monthly} com ${B.credits} créditos. No plano anual, o valor equivale a ${S.annual}, ${P.annual} e ${B.annual} por mês, cobrados de uma vez (${S.annualTotal}, ${P.annualTotal} e ${B.annualTotal} por ano), e os créditos do ano também entram de uma vez: ${S.annualCredits}, ${P.annualCredits} e ${B.annualCredits}. Quem prefere não assinar compra pacotes avulsos, de ${mini.credits} créditos por ${mini.price} até ${empresa.credits} créditos por ${empresa.price}.`, links: [{ label: "Planos e pacotes", path: "/#pricing" }] },
          { id: "gratis", q: "Tem versão grátis?", a: `Quem cria a conta ganha ${WELCOME_CREDITS} créditos grátis no primeiro login pelo plugin, sem cartão de crédito. Dá para fazer dois renders com o seu próprio projeto antes de pagar. As ferramentas locais (Reflexo de Espelho, Luz Fake, Otimizar Arquivo e Pisos Seamless) não gastam créditos.`, links: [{ label: "Baixar o plugin", path: "/download" }] },
          { id: "creditos-por-operacao", q: "Quantos créditos custa cada operação?", a: "Cada operação tem um custo fixo em créditos:", list: [
            `Render em 2K: ${C.render} créditos`,
            `IA Criativa (Decorar Ambientes, Planta Humanizada, Moodboard e Diagrama): ${C.creative} créditos`,
            `Edição com máscara e novos ângulos: ${C.edit} créditos`,
            `Ampliação para 4K: ${C.upscale} créditos`,
            `Panorama 360°: ${C.panorama} créditos`,
            `Vídeo com IA: ${videoCredits("ou")} créditos`,
            `Bloco 3D a partir de uma imagem: ${C.block} créditos`,
            "Reflexo de Espelho, Luz Fake, Otimizar Arquivo e Pisos Seamless: grátis",
          ] },
          { id: "renders-por-plano", q: "Quantos renders dá para fazer em cada plano?", a: `Contando renders de ${C.render} créditos: cerca de ${S.renders} por mês no Starter, ${P.renders} no PRO e ${B.renders} no Business. Nos pacotes: ${mini.renders} no Mini, ${basico.renders} no Básico, ${proPack.renders} no PRO e ${empresa.renders} no Empresa. Na IA Criativa, que custa ${C.creative} créditos, rende mais. Vídeo, 4K e bloco 3D gastam mais.` },
          { id: "custo-por-render", q: "Quanto sai cada render, na prática?", a: `Entre ${n.minCost} e ${n.maxCost}, conforme a origem do crédito. Nos planos mensais: ${n.perRender(S.costRaw)} no Starter, ${n.perRender(P.costRaw)} no PRO e ${n.perRender(B.costRaw)} no Business. Nos pacotes: ${n.perRender(mini.costRaw)} no Mini, ${n.perRender(basico.costRaw)} no Básico, ${n.perRender(proPack.costRaw)} no PRO e ${n.perRender(empresa.costRaw)} no Empresa.` },
          { id: "expiram", q: "Os créditos expiram?", a: `Os do plano valem até a renovação: a cada ciclo, o saldo do plano volta ao total do plano, e o que sobrou não acumula. Os créditos de pacote avulso e os ${WELCOME_CREDITS} de boas-vindas não expiram. Ao gerar uma imagem, o Vizai usa primeiro os créditos do plano e só depois os de pacote.` },
          { id: "erro", q: "Se a geração der erro, perco os créditos?", a: "Não. Se a geração falhar, os créditos voltam para a sua conta automaticamente. Se a imagem não chegar ao plugin e os créditos não voltarem, escreva para suporte@vizairender.com." },
          { id: "cancelar", q: "Posso cancelar quando quiser?", a: "Sim, sem fidelidade e sem multa. O cancelamento é feito pelo plugin ou pela sua conta no site, e o plano continua ativo até o fim do período já pago, com os créditos daquele período." },
          { id: "pagamento", q: "Quais são as formas de pagamento?", a: "Os planos são pagos com cartão de crédito, inclusive por Apple Pay e Google Pay. Os pacotes avulsos aceitam cartão, Apple Pay, Google Pay e Pix. O Pix aparece nas compras em reais e libera os créditos na hora." },
          { id: "reembolso", q: "Tem reembolso?", a: "Nos pacotes avulsos, sim: em até 7 dias depois da compra, desde que nenhum crédito do pacote tenha sido usado. Nas assinaturas não há reembolso proporcional. Ao cancelar, o plano segue ativo até o fim do período pago." },
        ],
      },
      {
        id: "comparacao",
        title: "Vizai e outras ferramentas",
        items: [
          { id: "vray-enscape-lumion", q: "Qual a diferença entre o Vizai e o V-Ray, o Enscape ou o Lumion?", a: "São abordagens diferentes. O V-Ray, o Enscape e o Lumion calculam a luz a partir do modelo 3D: o resultado é tecnicamente preciso, mas exige configurar materiais, luz e entorno, e a velocidade depende do seu computador. O Enscape depende muito da placa de vídeo e, no Mac, só roda nos modelos com chip da Apple. O Lumion pede placa de vídeo com pelo menos 6 GB de memória e não tem suporte oficial no Mac. O Vizai gera a imagem com IA a partir da vista: não exige configurar material nem luz, roda em qualquer computador com SketchUp 2023 ou mais novo, inclusive no Mac, e entrega a imagem em menos de um minuto." },
          { id: "renderizador-tradicional", q: "Quando um renderizador tradicional é a melhor escolha?", a: "Quando você precisa de controle técnico: estudo de iluminação com valores reais, material de fabricante idêntico ao catálogo, animação longa de passeio pelo projeto ou uma série de vistas do mesmo ambiente idênticas entre si. Como a IA interpreta a cena a cada geração, pequenos detalhes podem mudar de uma imagem para outra. Dá para usar os dois: o Vizai para estudar e aprovar com o cliente, e o renderizador tradicional na entrega final." },
          { id: "sketchup-ai-render", q: "Qual a diferença entre o Vizai e o SketchUp AI Render (antigo SketchUp Diffusion)?", a: "O AI Render é a ferramenta de IA da própria Trimble. Ele vem nas assinaturas SketchUp Go, Pro e Studio, com uma cota mensal de créditos, e a extensão para desktop funciona a partir do SketchUp 2024. O Vizai funciona a partir do SketchUp 2023, com créditos em planos ou em pacotes que não expiram, e tem modos próprios para cada tipo de projeto (fachada, interiores, comercial, edifício e paisagismo), além de vídeo, panorama 360°, bloco 3D e ferramentas locais como Reflexo de Espelho e Luz Fake." },
          { id: "veras-d5", q: "E em relação ao Veras e ao D5 Lite?", a: "O Veras, da Chaos, funciona dentro de vários programas (Revit, SketchUp, Rhino, Archicad, entre outros), com assinatura em créditos e 14 dias de teste. O D5 Lite é um plugin gratuito para SketchUp, mas os recursos de IA exigem a licença paga D5 Pro, e ele roda só no Windows, com placa NVIDIA RTX. O Vizai roda no Windows e no Mac sem placa de vídeo dedicada, tem preço em reais, Pix nos pacotes e atendimento em português." },
          { id: "chatgpt-midjourney", q: "Por que não tirar um print e usar o ChatGPT ou o Midjourney?", a: "Dá para tentar, mas são ferramentas gerais: costumam mudar a geometria, mover janelas e inventar elementos, e cada tentativa exige exportar, escrever o pedido, baixar e voltar ao SketchUp. O Vizai roda dentro do SketchUp e usa instruções prontas e testadas para cada tipo de projeto, com regras para manter o enquadramento e a geometria da vista." },
        ],
      },
      {
        id: "uso",
        title: "Como usar",
        items: [
          { id: "instalar", q: "Como instalo o Vizai?", a: "Baixe o arquivo .rbz na página de download e, no SketchUp, abra Janela, Extension Manager, Instalar Extensão e escolha o arquivo. Leva menos de um minuto. Depois, abra o painel do Vizai e entre com a sua conta Google.", links: [{ label: "Baixar o plugin", path: "/download" }, { label: "Aula Primeiros passos", path: "/treinamento/primeiros-passos" }] },
          { id: "conta-google", q: "Preciso de conta Google?", a: "Sim. O login, no plugin e no site, é feito com a conta Google." },
          { id: "ia-criativa", q: "O que é a IA Criativa?", a: `São quatro modos além do render da vista: decorar um ambiente vazio, transformar a planta em planta humanizada, criar um moodboard e gerar diagramas do projeto. Cada um custa ${C.creative} créditos.`, links: [{ label: "Decorar Ambientes", path: "/treinamento/decorar-ambiente" }, { label: "Planta Humanizada", path: "/treinamento/planta-humanizada" }, { label: "Moodboard", path: "/treinamento/moodboard" }, { label: "Diagrama", path: "/treinamento/diagrama" }] },
          { id: "reflexo-espelho", q: "Como faço reflexo de espelho no SketchUp?", a: "Com a ferramenta Reflexo de Espelho do Vizai, que gera reflexos de espelho, vidro de armário, TV desligada e piso polido coerentes com a cena, antes do render e sem gastar créditos.", links: [{ label: "Aula Reflexo de Espelho e Luz Fake", path: "/treinamento/reflexo-espelho" }] },
          { id: "video-360", q: "Como gero um vídeo ou um panorama 360°?", a: "O vídeo sai de um render pronto: na aba Vídeo, você escolhe o movimento de câmera e a duração, de 4 a 15 segundos, e o clipe sai em 1080p, com som ambiente opcional. O panorama 360° sai direto do modelo: na aba 360, você marca a parede e o ponto onde está, e a IA devolve um panorama que o cliente explora por um link, no computador ou no celular.", links: [{ label: "Vídeo com IA", path: "/treinamento/video-com-ia" }, { label: "Panorama 360°", path: "/treinamento/panorama-360" }] },
          { id: "suporte", q: "Como falo com o suporte?", a: "Pelo e-mail suporte@vizairender.com, em português, inglês ou espanhol." },
        ],
      },
    ],
  };
}

// --- inglês ------------------------------------------------------------------

function en(): FaqDoc {
  const n = numbers("en");
  const { starter: S, pro: P, business: B } = n.plans;
  const { mini, basico, "pro-pack": proPack, empresa } = n.packs;
  return {
    title: "Frequently asked questions",
    intro:
      "Everything about Vizai Render: what it does, how much it costs, how credits work and how it compares with other rendering tools.",
    moreLabel: "Learn more:",
    groups: [
      {
        id: "about",
        title: "About Vizai",
        items: [
          { id: "what-is", q: "What is Vizai Render?", a: "Vizai Render is a SketchUp extension that turns the view of your model into a photorealistic image with artificial intelligence. You set up the camera, choose the project type, lighting and weather, and the render is ready in under a minute, right in the SketchUp panel. No exporting, and no material or lighting setup." },
          { id: "versions", q: "Which SketchUp versions does Vizai work with?", a: "SketchUp 2023 or newer, on Windows and Mac. Versions older than 2023 are not supported. SketchUp Free, which runs in the browser, is not supported either, because it doesn't accept extensions." },
          { id: "other-software", q: "Does it work in Revit, Archicad or Rhino?", a: "Not yet. Today Vizai works only in SketchUp." },
          { id: "computer", q: "Do I need a powerful computer or a graphics card?", a: "No. The image is generated in the cloud, so Vizai doesn't use your computer's graphics card or processor to render. A regular laptop is enough, as long as it runs SketchUp and is connected to the internet." },
          { id: "internet", q: "Does it need an internet connection?", a: "Yes. Generation happens in the cloud, so you need to be online while using Vizai." },
          { id: "time", q: "How long does a render take?", a: "20 to 60 seconds, depending on the scene and your connection. Videos and 3D blocks take longer: a 3D block is usually ready in a few minutes." },
          { id: "fidelity", q: "Will the render stay true to my design?", a: "In structure, yes. Framing, geometry and the position of elements come from the SketchUp view, and the AI adds materials, light, sky and surroundings based on the project type and style you choose. As with any AI generation, small details can vary. When that happens, you fix just that area with a masked edit, without redoing the whole image." },
          { id: "3d-model", q: "Does Vizai read my 3D model?", a: "No. It reads the image of the active view, exactly as the SketchUp camera shows it. That's why the framing you set up is the framing of the render. Your .skp file stays on your computer." },
          { id: "privacy", q: "What happens to the images I send?", a: "The view image goes to the AI providers we use (Google Cloud and Fal.ai) only to generate your render, and it isn't stored permanently afterwards. Finished images stay in the plugin's History, on your own computer, which keeps the 10 most recent.", links: [{ label: "Privacy Policy", path: "/privacy" }] },
          { id: "commercial-use", q: "Can I use the images in paid work?", a: "Yes. Images generated in your account are yours, and you can use them in presentations, portfolios, proposals and any other commercial use.", links: [{ label: "Terms of Service", path: "/terms" }] },
          { id: "languages", q: "Which languages is Vizai available in?", a: "English, Portuguese and Spanish, in the plugin and on the website." },
        ],
      },
      {
        id: "pricing",
        title: "Pricing and credits",
        items: [
          { id: "cost", q: "How much does Vizai cost?", a: `Monthly plans are Starter at ${S.monthly} for ${S.credits} credits a month, PRO at ${P.monthly} for ${P.credits} credits, and Business at ${B.monthly} for ${B.credits} credits. On yearly billing they come to ${S.annual}, ${P.annual} and ${B.annual} a month, charged once a year (${S.annualTotal}, ${P.annualTotal} and ${B.annualTotal}), and the year's credits also arrive at once: ${S.annualCredits}, ${P.annualCredits} and ${B.annualCredits}. If you'd rather not subscribe, one-time credit packs range from ${mini.credits} credits for ${mini.price} to ${empresa.credits} credits for ${empresa.price}.`, links: [{ label: "Plans and packs", path: "/#pricing" }] },
          { id: "free", q: "Is there a free version?", a: `New accounts get ${WELCOME_CREDITS} free credits on the first sign-in in the plugin, with no credit card. That's enough for two renders with your own project before you pay anything. The local tools (Mirror Reflection, Fake Light, Optimize File and Seamless Floors) don't use credits.`, links: [{ label: "Download the plugin", path: "/download" }] },
          { id: "credits-per-action", q: "How many credits does each action cost?", a: "Each action has a fixed credit cost:", list: [
            `2K render: ${C.render} credits`,
            `Creative AI (Furnish Spaces, Humanized Floor Plan, Moodboard and Diagram): ${C.creative} credits`,
            `Masked edit and new angles: ${C.edit} credits`,
            `4K upscale: ${C.upscale} credits`,
            `360° panorama: ${C.panorama} credits`,
            `AI video: ${videoCredits("or")} credits`,
            `3D block from an image: ${C.block} credits`,
            "Mirror Reflection, Fake Light, Optimize File and Seamless Floors: free",
          ] },
          { id: "renders-per-plan", q: "How many renders do I get with each plan?", a: `Counting ${C.render}-credit renders: about ${S.renders} a month on Starter, ${P.renders} on PRO and ${B.renders} on Business. With packs: ${mini.renders} on Mini, ${basico.renders} on Basic, ${proPack.renders} on PRO and ${empresa.renders} on Enterprise. Creative AI, at ${C.creative} credits, goes further. Video, 4K and 3D blocks use more.` },
          { id: "cost-per-render", q: "How much does each render cost in practice?", a: `Between ${n.minCost} and ${n.maxCost}, depending on where the credits come from. On monthly plans: ${n.perRender(S.costRaw)} on Starter, ${n.perRender(P.costRaw)} on PRO and ${n.perRender(B.costRaw)} on Business. With packs: ${n.perRender(mini.costRaw)} on Mini, ${n.perRender(basico.costRaw)} on Basic, ${n.perRender(proPack.costRaw)} on PRO and ${n.perRender(empresa.costRaw)} on Enterprise.` },
          { id: "expire", q: "Do credits expire?", a: `Plan credits last until the renewal: each billing cycle, the plan balance resets to the plan total, and unused plan credits don't roll over. Credit pack credits and the ${WELCOME_CREDITS} welcome credits never expire. When you generate an image, Vizai uses plan credits first and pack credits after.` },
          { id: "errors", q: "If a generation fails, do I lose the credits?", a: "No. If a generation fails, the credits go back to your account automatically. If the image doesn't reach the plugin and the credits don't come back, write to suporte@vizairender.com." },
          { id: "cancel", q: "Can I cancel anytime?", a: "Yes, with no lock-in and no fee. You cancel from the plugin or from your account on the website, and the plan stays active until the end of the period already paid, with that period's credits." },
          { id: "payment", q: "Which payment methods are accepted?", a: "Plans are paid by credit card, including through Apple Pay and Google Pay. Credit packs accept card, Apple Pay and Google Pay, plus Pix for purchases in Brazilian reais." },
          { id: "refund", q: "Is there a refund?", a: "For credit packs, yes: within 7 days of purchase, as long as no credit from the pack has been used. Subscriptions have no prorated refunds. When you cancel, the plan stays active until the end of the paid period." },
        ],
      },
      {
        id: "comparison",
        title: "Vizai and other tools",
        items: [
          { id: "vray-enscape-lumion", q: "How is Vizai different from V-Ray, Enscape or Lumion?", a: "They take different approaches. V-Ray, Enscape and Lumion calculate light from the 3D model: the result is technically precise, but you have to set up materials, lighting and surroundings, and speed depends on your computer. Enscape relies heavily on the graphics card and, on Mac, only runs on Apple silicon models. Lumion asks for a graphics card with at least 6 GB of memory and has no official Mac support. Vizai generates the image with AI from the view: no material or lighting setup, it runs on any computer with SketchUp 2023 or newer, Mac included, and delivers the image in under a minute." },
          { id: "traditional-renderer", q: "When is a traditional renderer the better choice?", a: "When you need technical control: lighting studies with real values, manufacturer materials that match the catalog exactly, long walkthrough animations, or a series of views of the same room that must be identical to each other. Because the AI interprets the scene on each generation, small details can change from one image to the next. You can use both: Vizai to explore and get client approval, and a traditional renderer for final delivery." },
          { id: "sketchup-ai-render", q: "How is Vizai different from SketchUp AI Render (formerly SketchUp Diffusion)?", a: "AI Render is Trimble's own AI tool. It comes with SketchUp Go, Pro and Studio subscriptions, with a monthly credit allowance, and the desktop extension works from SketchUp 2024. Vizai works from SketchUp 2023, with credits on plans or in packs that never expire, and has dedicated modes for each project type (exteriors, interiors, commercial, buildings and landscape), plus video, 360° panoramas, 3D blocks and local tools such as Mirror Reflection and Fake Light." },
          { id: "veras-d5", q: "What about Veras and D5 Lite?", a: "Veras, by Chaos, works inside several programs (Revit, SketchUp, Rhino, Archicad and others), with a credit-based subscription and a 14-day trial. D5 Lite is a free SketchUp plugin, but its AI features require the paid D5 Pro license, and it runs only on Windows with an NVIDIA RTX graphics card. Vizai runs on Windows and Mac with no dedicated graphics card, with prices in US dollars, euros or Brazilian reais and support in English, Portuguese and Spanish." },
          { id: "chatgpt-midjourney", q: "Why not take a screenshot and use ChatGPT or Midjourney?", a: "You can try, but they're general tools: they tend to change the geometry, move windows and invent elements, and every attempt means exporting, writing a prompt, downloading and going back to SketchUp. Vizai runs inside SketchUp and uses ready, tested instructions for each project type, with rules to keep the framing and geometry of the view." },
        ],
      },
      {
        id: "how-to",
        title: "How to use",
        items: [
          { id: "install", q: "How do I install Vizai?", a: "Download the .rbz file from the download page and, in SketchUp, go to Window, Extension Manager, Install Extension and pick the file. It takes less than a minute. Then open the Vizai panel and sign in with your Google account.", links: [{ label: "Download the plugin", path: "/download" }, { label: "Getting started lesson", path: "/treinamento/primeiros-passos" }] },
          { id: "google-account", q: "Do I need a Google account?", a: "Yes. Sign-in, in the plugin and on the website, uses a Google account." },
          { id: "creative-ai", q: "What is Creative AI?", a: `Four modes beyond rendering the view: furnishing an empty room, turning a floor plan into a humanized floor plan, creating a moodboard and generating project diagrams. Each costs ${C.creative} credits.`, links: [{ label: "Furnish Spaces", path: "/treinamento/decorar-ambiente" }, { label: "Humanized Floor Plan", path: "/treinamento/planta-humanizada" }, { label: "Moodboard", path: "/treinamento/moodboard" }, { label: "Diagram", path: "/treinamento/diagrama" }] },
          { id: "mirror-reflections", q: "How do I make mirror reflections in SketchUp?", a: "With Vizai's Mirror Reflection tool, which creates reflections on mirrors, cabinet glass, switched-off TVs and polished floors that match the scene, before rendering and without using credits.", links: [{ label: "Mirror Reflection and Fake Light lesson", path: "/treinamento/reflexo-espelho" }] },
          { id: "video-360", q: "How do I make a video or a 360° panorama?", a: "Video starts from a finished render: in the Video tab, you choose the camera movement and the length, from 4 to 15 seconds, and the clip comes out in 1080p with optional ambient sound. The 360° panorama comes straight from the model: in the 360 tab, you mark the wall and where you stand, and the AI returns a panorama your client explores through a link, on a computer or phone.", links: [{ label: "AI Video", path: "/treinamento/video-com-ia" }, { label: "360° Panorama", path: "/treinamento/panorama-360" }] },
          { id: "support", q: "How do I contact support?", a: "By email at suporte@vizairender.com, in English, Portuguese or Spanish." },
        ],
      },
    ],
  };
}

// --- espanhol ----------------------------------------------------------------

function es(): FaqDoc {
  const n = numbers("es");
  const { starter: S, pro: P, business: B } = n.plans;
  const { mini, basico, "pro-pack": proPack, empresa } = n.packs;
  return {
    title: "Preguntas frecuentes",
    intro:
      "Todo sobre Vizai Render: qué hace, cuánto cuesta, cómo funcionan los créditos y cómo se compara con otras herramientas de render.",
    moreLabel: "Más información:",
    groups: [
      {
        id: "sobre",
        title: "Sobre Vizai",
        items: [
          { id: "que-es", q: "¿Qué es Vizai Render?", a: "Vizai Render es una extensión para SketchUp que convierte la vista de tu modelo en una imagen fotorrealista con inteligencia artificial. Colocas la cámara, eliges el tipo de proyecto, la luz y el clima, y el render está listo en menos de un minuto, en el propio panel de SketchUp. Sin exportar el archivo y sin configurar materiales ni iluminación." },
          { id: "versiones", q: "¿Con qué versiones de SketchUp funciona Vizai?", a: "Con SketchUp 2023 o posterior, en Windows y Mac. Las versiones anteriores a 2023 no son compatibles. SketchUp Free, que funciona en el navegador, tampoco, porque no admite extensiones." },
          { id: "otros-programas", q: "¿Funciona en Revit, Archicad o Rhino?", a: "Todavía no. Hoy Vizai funciona solo en SketchUp." },
          { id: "computadora", q: "¿Necesito una computadora potente o tarjeta gráfica?", a: "No. La imagen se genera en la nube, así que Vizai no usa la tarjeta gráfica ni el procesador de tu computadora para renderizar. Basta con una portátil común, siempre que ejecute SketchUp y esté conectada a internet." },
          { id: "internet", q: "¿Necesita internet?", a: "Sí. La generación se hace en la nube, así que necesitas estar conectado mientras usas Vizai." },
          { id: "tiempo", q: "¿Cuánto tarda un render?", a: "Entre 20 y 60 segundos, según la escena y la conexión. Los videos y los bloques 3D tardan más: el bloque 3D suele estar listo en unos minutos." },
          { id: "fidelidad", q: "¿El render es fiel a mi proyecto?", a: "En la estructura, sí. El encuadre, la geometría y la posición de los elementos vienen de la vista de SketchUp, y la IA completa con materiales, luz, cielo y entorno según el tipo de proyecto y el estilo que elijas. Como en toda generación con IA, los detalles pequeños pueden variar. Cuando pasa, corriges solo esa parte con la edición con máscara, sin rehacer toda la imagen." },
          { id: "modelo-3d", q: "¿Vizai lee mi modelo 3D?", a: "No. Lee la imagen de la vista activa, tal como la muestra la cámara de SketchUp. Por eso el encuadre que armas es el encuadre del render. Tu archivo .skp se queda en tu computadora." },
          { id: "privacidad", q: "¿Qué pasa con las imágenes que envío?", a: "La imagen de la vista va a los proveedores de IA que usamos (Google Cloud y Fal.ai) solo para generar tu render, y no se guarda de forma permanente después. Las imágenes terminadas quedan en el Historial del plugin, en tu propia computadora, con las 10 más recientes.", links: [{ label: "Política de Privacidad", path: "/privacy" }] },
          { id: "uso-comercial", q: "¿Puedo usar las imágenes en trabajos pagados?", a: "Sí. Las imágenes generadas en tu cuenta son tuyas, y puedes usarlas en presentaciones, portafolio, propuestas y cualquier otro uso comercial.", links: [{ label: "Términos de Servicio", path: "/terms" }] },
          { id: "idiomas", q: "¿En qué idiomas está Vizai?", a: "Español, inglés y portugués, en el plugin y en el sitio." },
        ],
      },
      {
        id: "precio",
        title: "Precio y créditos",
        items: [
          { id: "cuanto-cuesta", q: "¿Cuánto cuesta Vizai?", a: `Los planes mensuales son Starter, por ${S.monthly} con ${S.credits} créditos al mes; PRO, por ${P.monthly} con ${P.credits} créditos, y Business, por ${B.monthly} con ${B.credits} créditos. Con pago anual equivalen a ${S.annual}, ${P.annual} y ${B.annual} al mes, cobrados de una vez (${S.annualTotal}, ${P.annualTotal} y ${B.annualTotal} al año), y los créditos del año también llegan de una vez: ${S.annualCredits}, ${P.annualCredits} y ${B.annualCredits}. Si prefieres no suscribirte, hay paquetes sueltos desde ${mini.credits} créditos por ${mini.price} hasta ${empresa.credits} créditos por ${empresa.price}.`, links: [{ label: "Planes y paquetes", path: "/#pricing" }] },
          { id: "gratis", q: "¿Hay versión gratis?", a: `Las cuentas nuevas reciben ${WELCOME_CREDITS} créditos gratis en el primer inicio de sesión en el plugin, sin tarjeta de crédito. Alcanza para dos renders con tu propio proyecto antes de pagar. Las herramientas locales (Reflejo de Espejo, Luz Falsa, Optimizar Archivo y Pisos Seamless) no gastan créditos.`, links: [{ label: "Descargar el plugin", path: "/download" }] },
          { id: "creditos-por-operacion", q: "¿Cuántos créditos cuesta cada operación?", a: "Cada operación tiene un costo fijo en créditos:", list: [
            `Render en 2K: ${C.render} créditos`,
            `IA Creativa (Decorar Ambientes, Plano Humanizado, Moodboard y Diagrama): ${C.creative} créditos`,
            `Edición con máscara y nuevos ángulos: ${C.edit} créditos`,
            `Ampliación a 4K: ${C.upscale} créditos`,
            `Panorama 360°: ${C.panorama} créditos`,
            `Video con IA: ${videoCredits("u")} créditos`,
            `Bloque 3D a partir de una imagen: ${C.block} créditos`,
            "Reflejo de Espejo, Luz Falsa, Optimizar Archivo y Pisos Seamless: gratis",
          ] },
          { id: "renders-por-plan", q: "¿Cuántos renders puedo hacer con cada plan?", a: `Contando renders de ${C.render} créditos: unos ${S.renders} al mes en Starter, ${P.renders} en PRO y ${B.renders} en Business. Con paquetes: ${mini.renders} en Mini, ${basico.renders} en Básico, ${proPack.renders} en PRO y ${empresa.renders} en Empresa. La IA Creativa, que cuesta ${C.creative} créditos, rinde más. Video, 4K y bloque 3D gastan más.` },
          { id: "costo-por-render", q: "¿Cuánto cuesta cada render en la práctica?", a: `Entre ${n.minCost} y ${n.maxCost}, según el origen del crédito. En los planes mensuales: ${n.perRender(S.costRaw)} en Starter, ${n.perRender(P.costRaw)} en PRO y ${n.perRender(B.costRaw)} en Business. En los paquetes: ${n.perRender(mini.costRaw)} en Mini, ${n.perRender(basico.costRaw)} en Básico, ${n.perRender(proPack.costRaw)} en PRO y ${n.perRender(empresa.costRaw)} en Empresa.` },
          { id: "caducan", q: "¿Los créditos caducan?", a: `Los del plan valen hasta la renovación: en cada ciclo, el saldo del plan vuelve al total del plan, y lo que sobra no se acumula. Los créditos de paquetes sueltos y los ${WELCOME_CREDITS} de bienvenida no caducan. Al generar una imagen, Vizai usa primero los créditos del plan y después los del paquete.` },
          { id: "errores", q: "Si la generación falla, ¿pierdo los créditos?", a: "No. Si la generación falla, los créditos vuelven a tu cuenta automáticamente. Si la imagen no llega al plugin y los créditos no vuelven, escribe a suporte@vizairender.com." },
          { id: "cancelar", q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia y sin multa. Cancelas desde el plugin o desde tu cuenta en el sitio, y el plan sigue activo hasta el final del período ya pagado, con los créditos de ese período." },
          { id: "pago", q: "¿Qué formas de pago aceptan?", a: "Los planes se pagan con tarjeta de crédito, también mediante Apple Pay y Google Pay. Los paquetes sueltos aceptan tarjeta, Apple Pay y Google Pay, además de Pix en las compras en reales brasileños." },
          { id: "reembolso", q: "¿Hay reembolso?", a: "En los paquetes sueltos, sí: hasta 7 días después de la compra, siempre que no se haya usado ningún crédito del paquete. Las suscripciones no tienen reembolso proporcional. Al cancelar, el plan sigue activo hasta el final del período pagado." },
        ],
      },
      {
        id: "comparacion",
        title: "Vizai y otras herramientas",
        items: [
          { id: "vray-enscape-lumion", q: "¿En qué se diferencia Vizai de V-Ray, Enscape o Lumion?", a: "Son enfoques distintos. V-Ray, Enscape y Lumion calculan la luz a partir del modelo 3D: el resultado es técnicamente preciso, pero exige configurar materiales, luz y entorno, y la velocidad depende de tu computadora. Enscape depende mucho de la tarjeta gráfica y, en Mac, solo funciona en los modelos con chip de Apple. Lumion pide una tarjeta gráfica con al menos 6 GB de memoria y no tiene soporte oficial en Mac. Vizai genera la imagen con IA a partir de la vista: no hace falta configurar materiales ni luz, funciona en cualquier computadora con SketchUp 2023 o posterior, Mac incluida, y entrega la imagen en menos de un minuto." },
          { id: "renderizador-tradicional", q: "¿Cuándo conviene un renderizador tradicional?", a: "Cuando necesitas control técnico: estudios de iluminación con valores reales, materiales de fabricante idénticos al catálogo, animaciones largas de recorrido o una serie de vistas del mismo espacio idénticas entre sí. Como la IA interpreta la escena en cada generación, los detalles pequeños pueden cambiar de una imagen a otra. Puedes usar los dos: Vizai para estudiar y aprobar con el cliente, y el renderizador tradicional en la entrega final." },
          { id: "sketchup-ai-render", q: "¿En qué se diferencia Vizai de SketchUp AI Render (antes SketchUp Diffusion)?", a: "AI Render es la herramienta de IA de la propia Trimble. Viene con las suscripciones SketchUp Go, Pro y Studio, con una cuota mensual de créditos, y la extensión de escritorio funciona desde SketchUp 2024. Vizai funciona desde SketchUp 2023, con créditos en planes o en paquetes que no caducan, y tiene modos propios para cada tipo de proyecto (fachada, interiores, comercial, edificio y paisajismo), además de video, panorama 360°, bloque 3D y herramientas locales como Reflejo de Espejo y Luz Falsa." },
          { id: "veras-d5", q: "¿Y frente a Veras y D5 Lite?", a: "Veras, de Chaos, funciona dentro de varios programas (Revit, SketchUp, Rhino, Archicad, entre otros), con suscripción por créditos y 14 días de prueba. D5 Lite es un plugin gratuito para SketchUp, pero las funciones de IA requieren la licencia paga D5 Pro, y funciona solo en Windows, con tarjeta NVIDIA RTX. Vizai funciona en Windows y Mac sin tarjeta gráfica dedicada, con precios en euros, dólares o reales y soporte en español, inglés y portugués." },
          { id: "chatgpt-midjourney", q: "¿Por qué no hacer una captura y usar ChatGPT o Midjourney?", a: "Puedes intentarlo, pero son herramientas generales: suelen cambiar la geometría, mover ventanas e inventar elementos, y cada intento exige exportar, escribir el pedido, descargar y volver a SketchUp. Vizai funciona dentro de SketchUp y usa instrucciones listas y probadas para cada tipo de proyecto, con reglas para mantener el encuadre y la geometría de la vista." },
        ],
      },
      {
        id: "uso",
        title: "Cómo usar",
        items: [
          { id: "instalar", q: "¿Cómo instalo Vizai?", a: "Descarga el archivo .rbz en la página de descarga y, en SketchUp, ve a Ventana, Extension Manager, Instalar Extensión y elige el archivo. Tarda menos de un minuto. Después, abre el panel de Vizai e inicia sesión con tu cuenta de Google.", links: [{ label: "Descargar el plugin", path: "/download" }, { label: "Clase Primeros pasos", path: "/treinamento/primeiros-passos" }] },
          { id: "cuenta-google", q: "¿Necesito una cuenta de Google?", a: "Sí. El inicio de sesión, en el plugin y en el sitio, se hace con una cuenta de Google." },
          { id: "ia-creativa", q: "¿Qué es la IA Creativa?", a: `Son cuatro modos además del render de la vista: decorar un espacio vacío, convertir la planta en plano humanizado, crear un moodboard y generar diagramas del proyecto. Cada uno cuesta ${C.creative} créditos.`, links: [{ label: "Decorar Ambientes", path: "/treinamento/decorar-ambiente" }, { label: "Plano Humanizado", path: "/treinamento/planta-humanizada" }, { label: "Moodboard", path: "/treinamento/moodboard" }, { label: "Diagrama", path: "/treinamento/diagrama" }] },
          { id: "reflejo-espejo", q: "¿Cómo hago reflejos de espejo en SketchUp?", a: "Con la herramienta Reflejo de Espejo de Vizai, que genera reflejos en espejos, vidrios de armario, televisores apagados y pisos pulidos coherentes con la escena, antes del render y sin gastar créditos.", links: [{ label: "Clase Reflejo de Espejo y Luz Fake", path: "/treinamento/reflexo-espelho" }] },
          { id: "video-360", q: "¿Cómo genero un video o un panorama 360°?", a: "El video sale de un render terminado: en la pestaña Video eliges el movimiento de cámara y la duración, de 4 a 15 segundos, y el clip sale en 1080p, con sonido ambiente opcional. El panorama 360° sale directo del modelo: en la pestaña 360 marcas la pared y el punto donde estás, y la IA devuelve un panorama que el cliente explora con un enlace, en la computadora o el celular.", links: [{ label: "Video con IA", path: "/treinamento/video-com-ia" }, { label: "Panorama 360°", path: "/treinamento/panorama-360" }] },
          { id: "soporte", q: "¿Cómo contacto al soporte?", a: "Por correo a suporte@vizairender.com, en español, inglés o portugués." },
        ],
      },
    ],
  };
}

const BUILDERS: Record<Lang, () => FaqDoc> = { pt, en, es };

export function getFaq(lang: Lang): FaqDoc {
  return BUILDERS[lang]();
}

/** Texto corrido da resposta, para os dados estruturados (FAQPage). */
export function answerText(item: FaqItem): string {
  return [item.a, ...(item.list ?? [])].join(" ");
}
