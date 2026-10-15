// Posts do blog em português.
//
// Escritos para busca e para assistentes de IA (ChatGPT, Gemini, Perplexity):
// título com o termo que a pessoa busca, resposta direta na primeira frase de
// cada seção, números e nomes concretos, e parágrafos que se entendem sozinhos
// quando citados fora da página. Números de crédito vêm de lib/prices.ts, os
// mesmos da tabela de planos: reajuste lá e o texto acompanha.
//
// Fatos sobre outras ferramentas: os mesmos do /faq (lib/faq.ts), conferidos
// nas páginas oficiais em 12/10/2026. Sem preço de concorrente, de propósito.

import type { BlogUi, PostContent } from "./types";
import { OPERATION_CREDITS as C, REFERRAL, VIDEO_CREDITS, WELCOME_CREDITS } from "@/lib/prices";

const RENDERS_GRATIS = Math.floor(WELCOME_CREDITS / C.render);
const VIDEO_MIN = VIDEO_CREDITS[0];
const VIDEO_MAX = VIDEO_CREDITS[VIDEO_CREDITS.length - 1];
const IG = (perfil: string) => `[@${perfil}](https://www.instagram.com/${perfil}/)`;

export const ptUi: BlogUi = {
  badge: "Blog do Vizai",
  title: "Render com IA para quem usa SketchUp",
  subtitle:
    "Comparações entre ferramentas de render, projetos reais feitos no Vizai e tudo o que muda no plugin a cada versão.",
  readMore: "Ler artigo",
  minRead: "min de leitura",
  backToIndex: "Todos os artigos",
  updatedOn: "Atualizado em",
  faqTitle: "Perguntas frequentes",
  ctaTitle: "Teste no seu próprio projeto",
  ctaSubtitle: `Instale o plugin e ganhe ${WELCOME_CREDITS} créditos grátis no primeiro login, o bastante para ${RENDERS_GRATIS} renders.`,
  ctaDownload: "Baixar plugin",
  ctaSignup: "Criar conta grátis",
  categories: {
    comparacao: "Comparação",
    casos: "Renders reais",
    novidades: "Novidades",
  },
};

export const ptPosts: Record<string, PostContent> = {
  "vray-enscape-lumion-ou-render-com-ia": {
    title: "V-Ray, Enscape, Lumion ou render com IA: qual usar no SketchUp?",
    excerpt:
      "O renderizador tradicional calcula a luz do modelo 3D; o render com IA parte da vista. Compare configuração, computador, Mac, tempo e quando usar cada um.",
    blocks: [
      {
        type: "p",
        text: "**Resposta curta:** V-Ray, Enscape, Lumion e D5 calculam a luz a partir do modelo 3D e dão controle técnico total, mas pedem configuração e uma boa placa de vídeo. O render com IA, como o do Vizai, parte da vista do SketchUp, fica pronto em 20 a 60 segundos e roda em qualquer computador. Um não substitui o outro em tudo: cada um ganha numa etapa do projeto.",
      },
      { type: "h2", text: "Qual a diferença entre renderizador tradicional e render com IA?" },
      {
        type: "p",
        text: "O **renderizador tradicional** (V-Ray, Enscape, Lumion, D5) simula a física da luz sobre o modelo 3D. Cada material tem as suas propriedades, cada luminária emite luz de verdade, e o resultado é tecnicamente preciso. O custo disso é configuração, material por material e luz por luz, e um tempo de render que depende da placa de vídeo.",
      },
      {
        type: "p",
        text: "O **render com IA** parte da imagem da vista, do jeito que a câmera do SketchUp mostra. No Vizai, você escolhe o tipo de projeto, a luz e o clima, e a IA completa materiais, iluminação, céu e entorno. Não há material para configurar, e a imagem é gerada na nuvem: o computador não pesa no resultado.",
      },
      {
        type: "compare",
        before: { src: "/compare2-before.jpg", label: "Vista do SketchUp" },
        after: { src: "/compare2-after.jpg", label: "Render do Vizai" },
        aspect: "1200 / 1491",
      },
      { type: "h2", text: "Comparação lado a lado" },
      {
        type: "table",
        align: "left",
        head: ["", "V-Ray, Enscape, Lumion e D5", "Vizai (render com IA)"],
        rows: [
          ["Como gera a imagem", "Calcula a luz a partir do modelo 3D", "IA a partir da vista do SketchUp"],
          ["O que você configura", "Materiais, luzes, entorno e câmera", "Tipo de projeto, luz e clima"],
          ["Placa de vídeo", "Enscape, Lumion e D5 dependem dela; o V-Ray pode usar CPU ou GPU", "Não usa: a imagem é gerada na nuvem"],
          ["Mac", "Enscape só nos Macs com chip da Apple; Lumion sem suporte oficial; D5 Lite só no Windows", "Funciona no Mac e no Windows"],
          ["Tempo por imagem", "Depende da cena e do computador", "De 20 a 60 segundos"],
          ["Controle técnico", "Total, com valores reais de luz e material", "A IA interpreta a cena a cada geração"],
          ["Internet", "Não precisa para renderizar", "Precisa, a geração é na nuvem"],
        ],
      },
      { type: "h2", text: "Quando o renderizador tradicional é a melhor escolha?" },
      {
        type: "p",
        text: "O renderizador tradicional é a melhor escolha quando o projeto exige precisão técnica que a IA não garante. Os casos mais comuns:",
      },
      {
        type: "ul",
        items: [
          "**Estudo de iluminação** com valores reais de luminária e de insolação.",
          "**Material de fabricante** que precisa sair idêntico ao catálogo.",
          "**Animação longa** de passeio pelo projeto.",
          "**Série de vistas idênticas** do mesmo ambiente, em que nenhum detalhe pode mudar de uma imagem para outra.",
        ],
      },
      {
        type: "p",
        text: "Nesses casos, as horas de configuração se pagam. A IA interpreta a cena a cada geração, então pequenos detalhes podem variar entre uma imagem e outra, mesmo com a mesma vista.",
      },
      { type: "h2", text: "Quando o render com IA resolve melhor?" },
      {
        type: "p",
        text: "O render com IA resolve melhor quando o que importa é velocidade e volume de imagens bonitas, não cálculo exato de luz. Os casos mais comuns:",
      },
      {
        type: "ul",
        items: [
          "**Estudo e aprovação com o cliente:** testar dia e noite, sol e chuva, estilos de decoração, sem refazer material.",
          "**Prazo curto:** várias vistas no mesmo dia, sem fila de render e sem travar o computador.",
          "**Computador sem placa de vídeo dedicada**, ou Mac.",
          "**Ambiente vazio, planta e moodboard:** no Vizai, decorar ambiente vazio, humanizar planta e montar moodboard ficam no mesmo painel, na aba IA Criativa.",
        ],
      },
      {
        type: "p",
        text: "Quando um detalhe sai diferente do projeto, a edição por máscara do Vizai corrige só aquela área, sem gerar a imagem inteira de novo. Veja o passo a passo na aula [Primeiro render](/treinamento/primeiro-render).",
      },
      { type: "h2", text: "Dá para usar os dois no mesmo projeto?" },
      {
        type: "p",
        text: "Sim, e é uma divisão que funciona bem: render com IA nas fases de estudo e apresentação, quando o cliente ainda está decidindo, e renderizador tradicional na entrega final, quando cada material já está fechado. Os dois partem do mesmo arquivo do SketchUp, então não há retrabalho de modelagem.",
      },
      {
        type: "tip",
        text: `O Vizai dá ${WELCOME_CREDITS} créditos grátis no primeiro login, o bastante para ${RENDERS_GRATIS} renders. [Baixe o plugin](/download) e compare no seu próprio projeto.`,
      },
    ],
    faq: [
      {
        q: "O render com IA substitui o V-Ray?",
        a: "Não em todos os casos. Para estudo, apresentação e aprovação com o cliente, o render com IA entrega a imagem em menos de um minuto, sem configurar material. Para estudo de iluminação com valores reais, material de catálogo idêntico ou série de vistas idênticas, o V-Ray e outros renderizadores tradicionais continuam sendo a escolha certa.",
      },
      {
        q: "Dá para renderizar o SketchUp sem placa de vídeo?",
        a: "Sim, com render na nuvem. O Vizai gera a imagem nos servidores, então funciona em notebook comum, no Windows ou no Mac, desde que rode o SketchUp 2023 ou mais novo e esteja conectado à internet.",
      },
      {
        q: "Qual renderizador para SketchUp funciona no Mac?",
        a: "O Vizai funciona no Mac sem placa de vídeo dedicada, e o V-Ray tem versão para Mac. O Enscape roda só nos Macs com chip da Apple, o Lumion não tem suporte oficial no Mac e o D5 Lite roda só no Windows.",
      },
      {
        q: "Quanto custa um render no Vizai?",
        a: `Cada render custa ${C.render} créditos (${C.creative} nos modos de IA Criativa). Os créditos vêm em planos mensais ou anuais, ou em pacotes que não expiram, e o primeiro login no plugin dá ${WELCOME_CREDITS} créditos grátis.`,
      },
    ],
  },

  "render-com-ia-no-sketchup": {
    title: "Render com IA no SketchUp: ChatGPT, AI Render, Veras ou Vizai?",
    excerpt:
      "Quatro jeitos de fazer render com IA a partir do SketchUp: o que cada um exige, onde roda, como cobra e em que caso cada um faz sentido.",
    blocks: [
      {
        type: "p",
        text: "**Resposta curta:** dá para fazer render com IA de um projeto do SketchUp de quatro jeitos: tirando um print e usando o ChatGPT ou o Gemini, com o SketchUp AI Render da Trimble, com o Veras da Chaos ou com um plugin feito para arquitetura, como o Vizai. O print no chat serve para uma ideia rápida; para quem renderiza toda semana, vale uma ferramenta que fique dentro do SketchUp e mantenha a geometria do projeto.",
      },
      { type: "h2", text: "Dá para usar o ChatGPT ou o Gemini para renderizar o SketchUp?" },
      {
        type: "p",
        text: "Dá, exportando a vista, enviando no chat e escrevendo o pedido. É o caminho mais conhecido e funciona para uma imagem de referência. O limite é a fidelidade: ChatGPT e Gemini são ferramentas gerais, e costumam mudar a geometria, mover janelas e inventar elementos que não estão no projeto.",
      },
      {
        type: "p",
        text: "O pedido também fica por sua conta. Um texto que funciona numa fachada não funciona num interior, e acertar a luz da noite ou o céu nublado vira tentativa e erro. Cada tentativa repete o ciclo de exportar, pedir, baixar e voltar ao SketchUp.",
      },
      { type: "h2", text: "O que é o SketchUp AI Render?" },
      {
        type: "p",
        text: "O SketchUp AI Render é a ferramenta de IA da própria Trimble, antes chamada SketchUp Diffusion. Ele vem nas assinaturas SketchUp Go, Pro e Studio, com uma cota mensal de créditos, e a extensão para desktop funciona a partir do SketchUp 2024. Faz sentido para quem já paga a assinatura da Trimble e usa o SketchUp 2024 ou mais novo.",
      },
      { type: "h2", text: "O que é o Veras?" },
      {
        type: "p",
        text: "O Veras, da Chaos (a mesma empresa do V-Ray e do Enscape), é uma ferramenta de render com IA que funciona dentro de vários programas: Revit, SketchUp, Rhino, Archicad, entre outros. A cobrança é por assinatura em créditos, com 14 dias de teste. Faz sentido para quem alterna entre esses programas no dia a dia.",
      },
      { type: "h2", text: "Como o Vizai funciona?" },
      {
        type: "p",
        text: "O Vizai é um plugin de render com IA feito para arquitetura, que roda dentro do SketchUp 2023 ou mais novo, no Windows e no Mac. Ele captura a vista ativa no formato escolhido e usa instruções prontas e testadas para cada tipo de projeto (fachada, interiores, comercial, edifício e paisagismo), com regras para manter o enquadramento e a geometria da vista. Luz e clima são escolhidos em botões: não é preciso escrever pedido.",
      },
      {
        type: "compare",
        before: { src: "/compare3-before.jpg", label: "Vista do SketchUp" },
        after: { src: "/compare3-after.jpg", label: "Render do Vizai" },
        aspect: "1 / 1",
      },
      {
        type: "p",
        text: `Além do render, o mesmo painel gera vídeo de ${VIDEO_MIN.seconds} a ${VIDEO_MAX.seconds} segundos, panorama 360°, bloco 3D a partir de uma foto, ampliação em 4K e ferramentas que não gastam crédito, como [Reflexo de Espelho](/treinamento/reflexo-espelho) e Luz Fake. Um render custa ${C.render} créditos, e os créditos vêm em planos ou em pacotes que não expiram.`,
      },
      { type: "h2", text: "Comparação lado a lado" },
      {
        type: "table",
        align: "left",
        head: ["", "Onde roda", "Como cobra"],
        rows: [
          ["Print no ChatGPT ou Gemini", "No navegador, fora do SketchUp", "Plano do chat, com versões grátis limitadas"],
          ["SketchUp AI Render", "SketchUp 2024 ou mais novo", "Cota mensal das assinaturas Go, Pro e Studio"],
          ["Veras", "Revit, SketchUp, Rhino, Archicad e outros", "Assinatura em créditos"],
          ["Vizai", "SketchUp 2023 ou mais novo, Windows e Mac", "Planos ou pacotes de créditos que não expiram"],
        ],
      },
      { type: "h2", text: "Qual escolher?" },
      {
        type: "ul",
        items: [
          "**Uma imagem de referência de vez em quando:** o print no ChatGPT ou no Gemini resolve.",
          "**Já paga a assinatura do SketchUp e usa a versão 2024 ou mais nova:** vale testar o AI Render que vem nela.",
          "**Trabalha em Revit, Rhino ou Archicad além do SketchUp:** o Veras cobre todos.",
          "**Renderiza toda semana no SketchUp, inclusive na versão 2023 ou no Mac:** um plugin dedicado como o Vizai economiza o ciclo de exportar e pedir, e mantém a geometria do projeto.",
        ],
      },
      {
        type: "tip",
        text: `Para comparar com o seu projeto, o Vizai dá ${WELCOME_CREDITS} créditos grátis no primeiro login. [Baixe o plugin](/download) e faça o mesmo render nas ferramentas que você já usa.`,
      },
    ],
    faq: [
      {
        q: "Posso usar o ChatGPT para renderizar um projeto do SketchUp?",
        a: "Pode, exportando a vista e escrevendo o pedido. O problema é a fidelidade: ferramentas gerais como ChatGPT e Gemini costumam mudar a geometria, mover janelas e inventar elementos, e cada tentativa repete o ciclo de exportar, pedir e baixar.",
      },
      {
        q: "Qual a diferença entre o SketchUp AI Render e o Vizai?",
        a: "O AI Render é da Trimble, vem nas assinaturas SketchUp Go, Pro e Studio com cota mensal de créditos e funciona a partir do SketchUp 2024. O Vizai funciona a partir do SketchUp 2023, com créditos em planos ou em pacotes que não expiram, tem modos próprios para cada tipo de projeto e também gera vídeo, panorama 360° e bloco 3D.",
      },
      {
        q: "O render com IA fica fiel ao projeto?",
        a: "Na estrutura, sim, quando a ferramenta é feita para isso. No Vizai, o enquadramento, a geometria e a posição dos elementos vêm da vista do SketchUp, e a IA completa materiais, luz, céu e entorno. Detalhes pequenos podem variar, e a edição por máscara corrige só aquela parte.",
      },
      {
        q: "Preciso escrever prompt no Vizai?",
        a: "Não. O tipo de projeto, a luz e o clima são escolhidos em botões, e o Vizai monta as instruções para a IA a partir dessas escolhas.",
      },
    ],
  },

  "renders-reais-feitos-no-vizai": {
    title: "Renders reais feitos no Vizai por arquitetos",
    excerpt:
      "Fachadas, salas, cozinhas e quartos renderizados no Vizai por arquitetos e designers, a partir de projetos reais modelados no SketchUp.",
    blocks: [
      {
        type: "p",
        text: "Todas as imagens desta página foram geradas no Vizai por quem usa o plugin, a partir de projetos reais modelados no SketchUp. Cada uma leva o perfil do autor no Instagram, onde dá para ver mais do trabalho de cada um.",
      },
      { type: "h2", text: "Fachadas" },
      {
        type: "p",
        text: "Na fachada, o Vizai completa céu, vegetação, calçada e vizinhança a partir do tipo de projeto e do entorno escolhido no painel. A volumetria, as aberturas e os revestimentos vêm do modelo.",
      },
      {
        type: "imgrow",
        aspect: "1 / 1",
        images: [
          {
            src: "/blog/renders-reais/fachada-pedra-escura-isx-maquetes.jpg",
            alt: "Sobrado contemporâneo com revestimento de pedra escura, porta pivotante de madeira e garagem, renderizado no Vizai",
            caption: `Fachada por ${IG("isx.maquetes")}`,
          },
          {
            src: "/blog/renders-reais/fachada-tijolinho-matheus-oengenheiro.jpg",
            alt: "Sobrado com tijolinho claro, jardineira com plantas pendentes e escada de acesso, renderizado no Vizai",
            caption: `Fachada por ${IG("matheus.oengenheiro")}`,
          },
        ],
      },
      { type: "h2", text: "Salas, cozinhas e áreas sociais" },
      {
        type: "p",
        text: "Em interiores, a luz é o que mais muda o resultado. No Vizai, a luz e o clima são escolhidos no painel, e a ferramenta Luz Fake ajuda quando a luminária do modelo não basta.",
      },
      {
        type: "img",
        src: "/blog/renders-reais/cozinha-e-jantar-dafnefreitas-arq.jpg",
        alt: "Cozinha integrada à sala de jantar, com cristaleira iluminada, mesa redonda de madeira e cadeiras estofadas, renderizada no Vizai",
        caption: `Cozinha e jantar por ${IG("dafnefreitas.arq")}`,
      },
      {
        type: "imgrow",
        aspect: "4 / 5",
        images: [
          {
            src: "/blog/renders-reais/sala-estante-madeira-debernardi-arq.jpg",
            alt: "Sala integrada com estante de madeira do piso ao teto, sofá claro e grande janela, renderizada no Vizai",
            caption: `Sala por ${IG("debernardi_arq")}`,
          },
          {
            src: "/blog/renders-reais/bar-marmore-studiowm-arq.jpg",
            alt: "Aparador de mármore com bar, garrafas e taças iluminadas diante de painel de madeira, renderizado no Vizai",
            caption: `Bar por ${IG("studiowm.arq")}`,
          },
        ],
      },
      { type: "h2", text: "Quartos" },
      {
        type: "img",
        src: "/blog/renders-reais/quarto-casal-arquitetamariajuliareis.jpg",
        alt: "Quarto de casal com painel ripado de madeira, closet aberto e penteadeira com espelho iluminado, renderizado no Vizai",
        caption: `Quarto de casal por ${IG("arquitetamariajuliareis")}`,
      },
      {
        type: "img",
        src: "/blog/renders-reais/quarto-bebe-elianayrafreitas.jpg",
        alt: "Quarto de bebê com berço de madeira e poltrona de amamentação, com mãe e bebê, renderizado no Vizai",
        caption: `Quarto de bebê por ${IG("elianayrafreitas")}`,
      },
      {
        type: "imgrow",
        aspect: "1 / 1",
        images: [
          {
            src: "/blog/renders-reais/quarto-bebe-dafnefreitas-arq.jpg",
            alt: "Quarto de bebê com papel de parede de bichos da floresta, berço e cômoda de madeira, renderizado no Vizai",
            caption: `Quarto de bebê por ${IG("dafnefreitas.arq")}`,
          },
          {
            src: "/blog/renders-reais/quarto-casal-thedouglaspaz.jpg",
            alt: "Quarto de casal com cabeceira capitonê azul-marinho, quadro abstrato e pendente escultural, renderizado no Vizai",
            caption: `Quarto de casal por ${IG("thedouglaspaz")}`,
          },
        ],
      },
      { type: "h2", text: "Como essas imagens são feitas?" },
      {
        type: "steps",
        items: [
          {
            title: "Modelar e enquadrar no SketchUp",
            text: "O enquadramento da vista é o enquadramento do render. O Vizai não lê o arquivo .skp, só a imagem da vista ativa.",
          },
          {
            title: "Escolher o tipo de projeto, a luz e o clima",
            text: "Fachada, interiores, comercial, edifício ou paisagismo. As escolhas são feitas em botões, sem escrever pedido.",
          },
          {
            title: "Gerar e ajustar",
            text: `O render fica pronto em 20 a 60 segundos e custa ${C.render} créditos. Se um detalhe sair diferente do projeto, a edição por máscara corrige só aquela área.`,
          },
        ],
      },
      {
        type: "tip",
        text: "Fez um render no Vizai e quer ver ele aqui? Publique no Instagram e marque o [@vizairender](https://www.instagram.com/vizairender/).",
      },
    ],
    faq: [
      {
        q: "Posso usar as imagens do Vizai em trabalhos pagos?",
        a: "Sim. As imagens geradas na sua conta são suas, e podem ir para apresentações, portfólio, propostas e qualquer outro uso comercial.",
      },
      {
        q: "O Vizai serve para fachada e para interiores?",
        a: "Sim. O Vizai tem modos próprios para fachada, interiores, comercial, edifício e paisagismo, cada um com instruções feitas para aquele tipo de projeto, além dos modos de IA Criativa para decorar ambiente vazio, humanizar planta, diagrama e moodboard.",
      },
    ],
  },

  "novidades-do-vizai": {
    title: "Novidades do Vizai: o que mudou em cada versão",
    excerpt:
      "O histórico do plugin Vizai Render para SketchUp, da versão mais nova à de lançamento: o que entrou e o que foi corrigido em cada uma.",
    blocks: [
      {
        type: "p",
        text: "Esta página reúne tudo o que mudou no Vizai desde o lançamento, em maio de 2026, da versão mais nova para a mais antiga. A versão atual é a **1.0.38**, de 14 de outubro de 2026. Quando sai uma versão nova, o painel do Vizai mostra um aviso no topo com o botão para baixar.",
      },
      { type: "h2", text: "O que o Vizai faz hoje" },
      {
        type: "ul",
        items: [
          `**Render com IA** a partir da vista do SketchUp, em 20 a 60 segundos, com modos para fachada, interiores, comercial, edifício e paisagismo (${C.render} créditos).`,
          `**IA Criativa:** decorar ambiente vazio, planta humanizada, diagrama e moodboard (${C.creative} créditos).`,
          `**Edição por máscara, ampliação em 4K** (${C.upscale} créditos), **vídeo** de ${VIDEO_MIN.seconds} a ${VIDEO_MAX.seconds} segundos em 1080p, **panorama 360°** (${C.panorama} créditos) e **bloco 3D** a partir de uma foto (${C.block} créditos).`,
          "**Ferramentas sem crédito:** Reflexo de Espelho, Luz Fake, Otimizar Arquivo e Pisos Seamless.",
          "**Funciona** no SketchUp 2023 ou mais novo, no Windows e no Mac, em português, inglês e espanhol.",
        ],
      },
      { type: "h2", text: "Outubro de 2026" },
      {
        type: "ul",
        items: [
          `**1.0.38 (14/10): Indique e ganhe.** Cada conta tem um código para mandar aos colegas. Quem indica ganha ${REFERRAL.reward} créditos por amigo que comprar, e o amigo ganha ${REFERRAL.bonus} créditos extras.`,
          "**1.0.37 (13/10):** no Windows em português, avisos de erro de rede voltam a aparecer, em vez de deixar o painel carregando.",
          "**1.0.36 (13/10):** aviso de versão nova no topo do painel; vídeo pode levar até 20 minutos sem o plugin desistir; a opção Sem som do vídeo passa a valer; o panorama 360 fica salvo no Histórico mesmo depois que o link original expira; e falha de conexão avisa que nenhum crédito foi descontado.",
          "**11/10:** quando o modelo principal recusa uma imagem, o Vizai tenta de novo com outro modelo antes de mostrar o aviso.",
          "**07/10:** render, edição e 4K passam a sair do Nano Banana 2.1, do Google, e o panorama 360 do GPT Image 2.5, que entrega em cerca de 20 segundos (antes, mais de um minuto).",
          "**1.0.35 (02/10):** o bloco 3D espera até 14 minutos e, se a resposta não chegar, o painel avisa que os créditos voltaram para a conta. O mesmo vale para o vídeo.",
        ],
      },
      { type: "h2", text: "Setembro de 2026" },
      {
        type: "ul",
        items: [
          "**30/09:** pacotes de créditos aceitam Pix, com os créditos liberados na hora.",
          "**1.0.34 (16/09):** avisos mais claros na troca de plano, quando o cartão da assinatura não permite o upgrade na hora.",
          "**1.0.33 (12/09):** o formato 3:4 entra no lugar do 7:5.",
          "**1.0.32 (05/09):** o Histórico mostra o custo real em créditos de cada geração, e o painel deixa de depender de arquivos baixados de fora.",
          "**1.0.31 (01/09):** o painel abre uma janela por vez, e as guias de enquadramento deixam de aparecer na imagem enviada para a IA.",
        ],
      },
      { type: "h2", text: "Agosto de 2026" },
      {
        type: "ul",
        items: [
          "**1.0.30 (29/08):** o painel segue o idioma do SketchUp e avisa quando uma geração está demorando mais que o normal.",
          "**20/08:** botões de entorno na fachada, para escolher o que aparece em volta do projeto.",
          "**19/08:** o plugin detecta quando o firewall do Windows bloqueia o SketchUp e oferece a liberação.",
          "**15/08:** o plugin confere a versão do SketchUp e avisa quando é anterior à 2023, em vez de abrir um painel que não funciona.",
          "**1.0.25 (13/08):** o Histórico passa a guardar os renders entre uma sessão e outra, e o Reflexo de Espelho ganha 6 tipos de superfície e ajuste ao vivo.",
          "**10/08:** a aba 360 é refeita: você marca o ponto de vista no próprio modelo.",
          "**1.0.21 (06/08):** Reflexo de Espelho funciona em arquivos pesados e aceita várias faces de uma vez, com Shift.",
          "**1.0.20 (03/08):** Luz Fake, com fita de LED e spot, na aba Cenas.",
        ],
      },
      { type: "h2", text: "Julho de 2026" },
      {
        type: "ul",
        items: [
          "**1.0.19 (30/07):** aviso no painel quando a renovação do plano não é aprovada.",
          "**1.0.18 (28/07):** o instalador passa a ser assinado digitalmente.",
          "**05/07:** troca de plano na hora: o upgrade vale no mesmo momento, com os créditos do novo plano.",
        ],
      },
      { type: "h2", text: "Junho e maio de 2026" },
      {
        type: "ul",
        items: [
          "**1.0.14 (18/06):** o saldo atualiza sozinho quando os créditos de boas-vindas chegam.",
          "**1.0.13 (14/06):** Reflexo de Espelho por cena, com a câmera refletida.",
          "**11/06:** correção da conexão no Windows (erro de certificado) e saldo que aparece mesmo quando o navegador interno do SketchUp falha.",
          "**1.0.9 (07/06):** aba Ferramentas, com Otimizar Arquivo e Pisos Seamless, sem gastar créditos.",
          "**1.0.5 (02/06):** primeira versão do Reflexo de Espelho.",
          "**01/06:** aviso de atualização dentro do plugin.",
          "**31/05:** comparação de Antes e Depois em tela cheia.",
          "**Fim de maio:** lançamento do Vizai, o plugin de render com IA para SketchUp.",
        ],
      },
    ],
    faq: [
      {
        q: "Qual é a versão mais recente do Vizai?",
        a: "A versão 1.0.38, de 14 de outubro de 2026, que trouxe o Indique e ganhe. Esta página é atualizada a cada versão nova.",
      },
      {
        q: "Como atualizo o Vizai?",
        a: "Quando sai uma versão nova, o painel do Vizai mostra um aviso no topo com o botão para baixar. Depois é instalar o arquivo .rbz pelo Gerenciador de extensões do SketchUp, como na primeira instalação.",
      },
    ],
  },
};
