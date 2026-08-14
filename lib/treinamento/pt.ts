import type { ArticleContent, TreinoUiStrings } from "./types";

export const ptUi: TreinoUiStrings = {
  badge: "Treinamento oficial Vizai Render",
  title: "Aprenda a dominar o Vizai Render",
  subtitle:
    "Guias completos de todas as ferramentas do plugin — do primeiro render às apresentações em vídeo e 360°. Tudo explicado passo a passo, com imagens reais da interface e dos resultados.",
  featuredLabel: "Comece por aqui",
  readMore: "Ler guia",
  minRead: "min de leitura",
  backToIndex: "Todos os guias",
  prevArticle: "Anterior",
  nextArticle: "Próximo",
  ctaTitle: "Pronto para testar na prática?",
  ctaSubtitle:
    "Crie sua conta, instale o plugin e ganhe 8 créditos grátis no primeiro login.",
  ctaDownload: "Baixar plugin",
  ctaSignup: "Criar conta grátis",
  categories: {
    start: "Comece aqui",
    render: "Render",
    creative: "IA Criativa",
    present: "Apresentação",
    free: "Ferramentas grátis",
  },
};

export const ptArticles: Record<string, ArticleContent> = {
  "primeiros-passos": {
    title: "Primeiros passos: instale o plugin e faça seu primeiro login",
    excerpt:
      "Como instalar o Vizai Render no SketchUp, entrar com sua conta Google, ativar os 8 créditos grátis e entender o painel em poucos minutos.",
    blocks: [
      {
        type: "p",
        text: "O Vizai Render é um plugin de renderização com IA que roda dentro do SketchUp. Você configura a cena, escolhe o estilo e recebe um render fotorrealista em segundos — sem exportar nada, sem programa externo e sem placa de vídeo potente. Este guia mostra como deixar tudo funcionando.",
      },
      { type: "h2", text: "Instalação" },
      {
        type: "steps",
        items: [
          {
            title: "Baixe o arquivo .rbz",
            text: "Na página de download do site, baixe a versão mais recente do plugin (compatível com SketchUp 2017 ou superior, Windows e Mac).",
          },
          {
            title: "Instale pelo próprio SketchUp",
            text: "Abra o SketchUp e vá em Extensões → Gerenciador de Extensões → Instalar Extensão, selecione o arquivo .rbz baixado e confirme.",
          },
          {
            title: "Abra o Vizai Render",
            text: "O painel aparece no menu Extensões → Vizai Render, ou pelo ícone na barra de ferramentas.",
          },
        ],
      },
      {
        type: "video",
        src: "/tutorial-sketchup.mp4",
        caption: "Instalação do plugin pelo Gerenciador de Extensões do SketchUp.",
      },
      { type: "h2", text: "Login e créditos de boas-vindas" },
      {
        type: "p",
        text: "O login é feito com sua conta Google, em um clique — sem criar senha nova. No seu **primeiro login pelo plugin** você recebe **8 créditos grátis** para testar as ferramentas. O saldo aparece no canto superior direito do painel, ao lado do seu perfil.",
      },
      {
        type: "tip",
        text: "Criou a conta pelo site? Os 8 créditos grátis são ativados quando você faz o primeiro login dentro do plugin — é lá que eles aparecem.",
      },
      { type: "h2", text: "Conhecendo o painel" },
      {
        type: "img",
        src: "/treinamento/ui/cenas-{lang}.webp",
        alt: "Painel principal do Vizai Render",
        caption: "O painel do Vizai Render dentro do SketchUp.",
        ui: true,
      },
      {
        type: "p",
        text: "O painel é organizado em 6 abas, que acompanham o fluxo natural de um projeto:",
      },
      {
        type: "ul",
        items: [
          "**Cenas** — prepara a captura: iluminação, formato da imagem, distância focal e composição.",
          "**Estúdio** — o coração do plugin: gera o render fotorrealista ou usa as ferramentas de IA Criativa (moodboard, decoração, planta humanizada e diagrama).",
          "**Vídeo** — anima seus renders em vídeos cinematográficos com movimento de câmera e som ambiente.",
          "**360** — gera panoramas esféricos interativos para o cliente explorar no navegador.",
          "**Blocos** — transforma uma foto de referência em um modelo 3D para usar na cena.",
          "**Histórico** — tudo o que você gerou no projeto, com filtros e contagem de créditos.",
        ],
      },
      {
        type: "p",
        text: "Além das abas, há a janela **Tools** (aba lateral verde), com ferramentas locais e gratuitas para otimizar o arquivo e criar pisos seamless — e o **Editor**, que abre sempre que você clica em Editar sobre um render.",
      },
      {
        type: "tip",
        text: "Siga a ordem das abas: prepare a cena na aba Cenas, renderize no Estúdio e só então parta para vídeo, 360 ou edições. Cena bem preparada = render melhor e menos créditos gastos com tentativas.",
      },
    ],
  },

  "como-funciona-creditos": {
    title: "Como funcionam os créditos, planos e custos de cada ferramenta",
    excerpt:
      "Entenda o sistema de créditos do Vizai Render: quanto custa cada operação, a diferença entre planos mensais e pacotes avulsos, e como acompanhar seu saldo.",
    blocks: [
      {
        type: "p",
        text: "Tudo no Vizai Render funciona com **créditos**: cada geração com IA consome uma quantidade fixa, descontada do seu saldo. Ferramentas locais (como a janela Tools, os ajustes de foto do Editor e o Reflexo de Espelho) são **gratuitas** — você só paga pelo que a IA gera.",
      },
      { type: "h2", text: "Custo de cada ferramenta" },
      {
        type: "table",
        head: ["Ferramenta", "Custo"],
        rows: [
          ["Render (Estúdio)", "4 créditos"],
          ["IA Criativa (Moodboard, Decorar, Planta, Diagrama)", "3 créditos"],
          ["Edição com IA (inpaint, novas perspectivas)", "4 créditos"],
          ["Exportar em 4K (upscale)", "5 créditos"],
          ["Panorama 360°", "5 créditos"],
          ["Vídeo com IA (4 a 15 segundos)", "22 a 83 créditos"],
          ["Bloco 3D a partir de foto", "28 créditos"],
          ["Ferramentas Tools, ajustes de foto, recorte, download 2K", "Grátis"],
        ],
      },
      {
        type: "p",
        text: "O custo é sempre mostrado **antes** de você confirmar: o botão de gerar exibe o valor (ex.: “Renderizar (4 créditos)”). Se o saldo for insuficiente, o plugin avisa e nada é cobrado.",
      },
      {
        type: "tip",
        text: "Se uma geração falhar por erro do servidor, os créditos são estornados automaticamente. Você nunca paga por render que não chegou.",
      },
      { type: "h2", text: "Planos mensais e pacotes avulsos" },
      {
        type: "p",
        text: "Há duas formas de adquirir créditos, e elas se complementam:",
      },
      {
        type: "ul",
        items: [
          "**Planos mensais** — Starter (250 créditos/mês), Pro (600 créditos/mês) e Business (1.600 créditos/mês). Os créditos renovam todo mês e você pode cancelar quando quiser.",
          "**Pacotes avulsos** — de 50 a 1.750 créditos em compra única. **Não expiram** e são consumidos depois dos créditos mensais.",
        ],
      },
      {
        type: "p",
        text: "Você pode assinar e comprar tanto pelo site quanto de dentro do plugin: clique no seu perfil no canto superior direito do painel e escolha **Assinatura** ou **+ Comprar créditos**. O pagamento é processado pelo Stripe e o saldo cai na conta em segundos.",
      },
      { type: "h2", text: "Acompanhando o consumo" },
      {
        type: "img",
        src: "/treinamento/ui/assinatura-{lang}.webp",
        alt: "Painel Assinatura do Vizai Render",
        caption: "O painel Assinatura mostra todos os seus créditos disponíveis em um só lugar.",
        ui: true,
      },
      {
        type: "p",
        text: "Para acompanhar seu consumo, clique no seu perfil no canto superior direito e abra **Assinatura**. Ali você vê todos os créditos disponíveis em um só lugar: o saldo do seu plano mensal (com quantos dias faltam para renovar) e os créditos avulsos, que não expiram. As barras mostram de relance quanto resta de cada um.",
      },
    ],
  },

  "preparando-a-cena": {
    title: "Aba Cenas: prepare o enquadramento perfeito antes de renderizar",
    excerpt:
      "Iluminação da cena, formato de saída, distância focal, regra dos terços e 2 pontos de fuga — tudo o que define a qualidade do seu render começa aqui.",
    blocks: [
      {
        type: "p",
        text: "A IA renderiza exatamente o que ela enxerga na sua viewport. Por isso, o passo que mais influencia a qualidade do resultado não é o prompt — é a **preparação da cena**. A aba Cenas reúne todos os controles para isso, sem você precisar mexer nas configurações do SketchUp.",
      },
      {
        type: "img",
        src: "/treinamento/ui/cenas-full-{lang}.webp",
        alt: "Aba Cenas completa do Vizai Render",
        caption: "A aba Cenas: iluminação, formato, focal e guias de composição.",
        ui: true,
      },
      { type: "h2", text: "Iluminação da cena" },
      {
        type: "p",
        text: "Os controles **Claro** e **Escuro** ajustam as sombras do SketchUp. Ajuste os dois juntos para clarear a cena e revelar mais detalhes — quanto mais a IA enxerga do seu modelo, mais fiel é o render. O botão **Usar sol para sombreamento** melhora a leitura de volumes.",
      },
      {
        type: "p",
        text: "Não quer pensar nisso? Use os presets prontos: **Externa** para fachadas e áreas abertas, **Interior** para ambientes internos. Eles aplicam a configuração recomendada em um clique, e o plugin restaura as sombras originais do seu arquivo quando você fecha o painel.",
      },
      { type: "h2", text: "Formato de saída" },
      {
        type: "p",
        text: "Escolha a proporção da imagem final antes de renderizar: **Paisagem 16:9** (apresentações), **Quadrado 1:1**, **Feed 4:5** e **Retrato 9:16** (redes sociais), além de 5:4, **Clássico 4:3**, **Foto 3:2** e 7:5. A viewport mostra a máscara do recorte em tempo real — o que está dentro é o que vai pro render.",
      },
      { type: "h2", text: "Distância focal" },
      {
        type: "p",
        text: "A distância focal muda completamente a leitura do espaço: **24mm (grande angular)** abraça ambientes internos pequenos, **35–55mm** são neutras e realistas, **70–85mm** comprimem a perspectiva como uma foto profissional de detalhe. Há também o modo **Custom** para definir o valor manualmente.",
      },
      {
        type: "tip",
        text: "Para interiores residenciais, 24mm a 35mm é o padrão de fotografia de arquitetura. Para fachadas, experimente 35mm a 55mm a uma distância maior — distorce menos as verticais.",
      },
      { type: "h2", text: "Guias de composição" },
      {
        type: "ul",
        items: [
          "**Regra dos terços** — sobrepõe as linhas-guia clássicas de fotografia na viewport, para posicionar os elementos de interesse nos pontos fortes do quadro.",
          "**2 pontos de fuga** — ativa a perspectiva arquitetônica do SketchUp: todas as verticais ficam perfeitamente retas, o padrão das fotos profissionais de arquitetura.",
        ],
      },
      { type: "h2", text: "Salvar cenas" },
      {
        type: "p",
        text: "Encontrou um ângulo perfeito? Dê um nome e clique em **Salvar** — a cena é criada no SketchUp e você volta a ela quando quiser. Salve seus 3 ou 4 ângulos principais antes de começar a renderizar: facilita gerar a série completa de imagens do projeto e refazer ajustes depois.",
      },
    ],
  },

  "primeiro-render": {
    title: "Seu primeiro render fotorrealista no Estúdio",
    excerpt:
      "O passo a passo completo do modo Render: tipo de projeto, clima, luzes e detalhes da cena — e como escrever descrições que melhoram o resultado.",
    blocks: [
      {
        type: "p",
        text: "Com a cena preparada, renderizar é seguir os 5 passos numerados da aba **Estúdio**, no modo **Render**. Em segundos a IA devolve uma imagem fotorrealista do exato ângulo da sua viewport, preservando seu projeto — geometria, materiais e composição.",
      },
      {
        type: "img",
        src: "/treinamento/ui/studio-render-{lang}.webp",
        alt: "Aba Estúdio no modo Render",
        caption: "O modo Render do Estúdio: 5 passos numerados até o botão Renderizar.",
        ui: true,
      },
      { type: "h2", text: "Os 5 passos" },
      {
        type: "steps",
        items: [
          {
            title: "Tipo de projeto",
            text: "Diz à IA o que ela está vendo: Interiores, Fachada Externa, Meio à Natureza (integração com paisagem), Comercial (loja, escritório) ou Edifício. Cada tipo usa um tratamento específico de iluminação e contexto.",
          },
          {
            title: "Qualidade",
            text: "O motor de imagem do Vizai (Nano Banana Pro) — cada render custa 4 créditos.",
          },
          {
            title: "Estilo de clima",
            text: "Dia, Pôr do sol, Noite ou Nublado. Define o céu, a temperatura da luz e o clima geral da imagem.",
          },
          {
            title: "Luzes",
            text: "Luzes acesas (interiores à noite ou ambientes aconchegantes), apagadas, ou Nenhum para deixar a IA decidir o natural.",
          },
          {
            title: "Detalhes da cena",
            text: "Campo livre opcional para orientar a IA: materiais, vegetação, atmosfera. É integrado automaticamente ao prompt.",
          },
        ],
      },
      { type: "h2", text: "O resultado" },
      {
        type: "compare",
        before: { src: "/compare2-before.jpg", label: "Modelo SketchUp" },
        after: { src: "/compare2-after.jpg", label: "Render Vizai" },
      },
      {
        type: "p",
        text: "O render aparece no próprio painel com o controle **Antes/Depois** para comparar com o modelo original — inclusive em tela cheia. Dali você pode **Baixar** a imagem, abrir o **Editor** para refinar, ou **Exportar em alta resolução**: o download padrão é grátis, e o upscale para **4K custa 5 créditos**.",
      },
      { type: "h2", text: "Escrevendo bons detalhes de cena" },
      {
        type: "p",
        text: "O campo de detalhes não precisa de frases elaboradas — palavras-chave separadas por vírgula funcionam melhor. Descreva o que a IA não consegue adivinhar pelo modelo:",
      },
      {
        type: "ul",
        items: [
          "**Materiais específicos**: “piso de porcelanato acetinado, marcenaria em freijó, bancada de quartzo branco”.",
          "**Vegetação e entorno**: “vegetação tropical, gramado aparado, rua arborizada”.",
          "**Atmosfera**: “luz suave de fim de tarde, ambiente acolhedor”.",
        ],
      },
      {
        type: "tip",
        text: "Aplique texturas reais no modelo em vez de deixar tudo branco: a IA respeita os materiais que enxerga. Modelo texturizado + detalhes curtos no prompt = o resultado mais fiel.",
      },
      {
        type: "warn",
        text: "Se o render vier escuro ou com áreas “inventadas”, volte à aba Cenas e clareie a iluminação — geralmente a IA não estava enxergando aquela região do modelo.",
      },
      { type: "cost", text: "4 créditos por render · upscale 4K opcional por 5 créditos" },
    ],
  },

  "editar-render": {
    title: "Editor: inpaint, novas perspectivas e ajustes profissionais",
    excerpt:
      "Tudo da janela Editar Render: corrija áreas específicas com IA, gere novos ângulos e closeups a partir de um render pronto, recorte e finalize a foto — sem refazer o render.",
    blocks: [
      {
        type: "p",
        text: "Gerou um render bom, mas o sofá ficou estranho? Quer o mesmo ambiente visto de outro ângulo, ou um closeup da bancada pra apresentação? É para isso que existe o **Editor** — clique em **Editar** sobre qualquer render e ele abre em uma janela dedicada com três abas: **Edição com IA**, **Recorte** e **Ajustes**.",
      },
      {
        type: "img",
        src: "/treinamento/ui/editor-ia-{lang}.webp",
        alt: "Janela Editar Render com a aba Edição com IA",
        caption: "O Editor: ferramentas de máscara, prompt de edição e histórico à direita.",
      },
      { type: "h2", text: "Edição com IA (inpaint)" },
      {
        type: "p",
        text: "O inpaint permite alterar **só uma área** da imagem, mantendo todo o resto intacto. Pinte a região que quer mudar e descreva a alteração:",
      },
      {
        type: "steps",
        items: [
          {
            title: "Marque a área",
            text: "Use o Pincel (com controle de espessura), o Retângulo ou o Círculo para criar a máscara. Errou? Borracha, Desfazer pincelada ou Limpar máscara.",
          },
          {
            title: "Descreva a mudança",
            text: "“Trocar o sofá por um de linho bege”, “remover o carro”, “adicionar quadros na parede”… A IA edita apenas a área marcada.",
          },
          {
            title: "Aplique e compare",
            text: "Cada edição custa 4 créditos e entra no histórico lateral — você navega entre as versões e segura o botão Antes/Depois para comparar com o original.",
          },
        ],
      },
      {
        type: "video",
        src: "/tools/tool-edit.mp4",
        caption: "Inpaint em ação: marque, descreva e a IA altera só aquela área.",
      },
      {
        type: "tip",
        text: "Sem máscara nenhuma, o comando vale para a imagem inteira — útil para mudanças globais como “deixar o ambiente noturno” ou “trocar a cor das paredes”.",
      },
      { type: "h2", text: "Novas perspectivas: várias cenas a partir de um render" },
      {
        type: "p",
        text: "Este é um dos recursos mais poderosos do Editor: peça **outro ângulo** do mesmo ambiente direto no campo de texto, sem mover a câmera no SketchUp e sem gastar um render novo do zero. A IA entende a intenção do seu comando:",
      },
      {
        type: "ul",
        items: [
          "**“Closeup da poltrona”** — marque a poltrona (ou apenas escreva) e receba um detalhe aproximado, com materiais e iluminação preservados.",
          "**“Vista lateral do ambiente”** ou **“nova perspectiva mostrando a cozinha pela direita”** — gera o mesmo espaço visto de outro ponto.",
          "**“Vista de drone”** — afasta e eleva a câmera para uma tomada aérea.",
        ],
      },
      {
        type: "img",
        src: "/tools/tool-02.jpg",
        alt: "Novas perspectivas geradas a partir de um render",
        caption: "Um render base pode virar uma série inteira de imagens do projeto.",
      },
      {
        type: "p",
        text: "Na prática, um único render de 4 créditos vira a base de uma **apresentação completa**: gere o geral, depois peça closeups dos detalhes e ângulos alternativos por 4 créditos cada — muito mais rápido do que reposicionar câmera e re-renderizar cada vista.",
      },
      { type: "h2", text: "Recorte e Ajustes (grátis)" },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/editor-crop-{lang}.webp",
            alt: "Aba Recorte do Editor",
            caption: "Recorte com proporções prontas ou livre.",
          },
          {
            src: "/treinamento/ui/editor-adjust-{lang}.webp",
            alt: "Aba Ajustes do Editor",
            caption: "Ajustes finos de foto, sem custo.",
          },
        ],
      },
      {
        type: "p",
        text: "A aba **Recorte** reenquadra a imagem nas proporções do plugin (Paisagem, Quadrado, Feed, Retrato, Clássico, Foto) ou em recorte livre/personalizado. A aba **Ajustes** finaliza como num editor de foto: **brilho, contraste, saturação, exposição e temperatura**. As duas são totalmente gratuitas, assim como o download em 2K.",
      },
      {
        type: "p",
        text: "Ao clicar em **Finalizar Edição**, a versão final volta para o painel principal — pronta para virar vídeo, 360 ou upscale 4K.",
      },
      { type: "cost", text: "Edição com IA e novas perspectivas: 4 créditos cada · Recorte, Ajustes e download 2K: grátis" },
    ],
  },

  "reflexo-espelho": {
    title: "Reflexo de Espelho: espelhos, vidros, TV e piso polido",
    excerpt:
      "O SketchUp não renderiza reflexos — o Vizai gera o reflexo real do ambiente na superfície, de graça, antes do render. Serve para espelho, vidro de armário, TV desligada e piso polido.",
    blocks: [
      {
        type: "p",
        text: "Superfície que reflete é um problema clássico: o SketchUp mostra uma face chapada, e a IA, sem referência, inventa um reflexo qualquer. A ferramenta **Reflexo de Espelho** (na aba Cenas) projeta na face o que ela **realmente refletiria** — e aí sim você renderiza, com o reflexo coerente com o ambiente.",
      },
      {
        type: "video",
        src: "/treinamento/ui/reflexo-espelho.mp4",
        caption: "Reflexo aplicado direto na aba Cenas, sem custo de créditos.",
      },
      { type: "h2", text: "Seis tipos de superfície" },
      {
        type: "p",
        text: "A captura é a mesma para todos; o que muda é o acabamento. Escolha o tipo **antes** de clicar na face:",
      },
      {
        type: "ul",
        items: [
          "**Espelho** — opaco, reflexo cheio. O comportamento clássico da ferramenta.",
          "**Piso** — porcelanato polido, bancada de mármore, mesa laca. Reflexo fraco por cima: o material do piso continua mandando na aparência.",
          "**TV** — tela desligada. Opaca e bem escura, com o ambiente aparecendo só insinuado, como numa tela apagada de verdade.",
          "**Vidro** — vidro incolor de box ou porta. Reflete menos e deixa ver através, sem alterar a cor do que reflete.",
          "**Bronze** e **Fumê** — os vidros coloridos de porta de armário. Semitransparentes: o reflexo aparece por cima e o interior do armário por baixo.",
        ],
      },
      { type: "h2", text: "Como usar" },
      {
        type: "steps",
        items: [
          {
            title: "Salve a cena",
            text: "Deixe a viewport na vista que você vai renderizar e salve como uma cena. O reflexo fica amarrado a essa cena.",
          },
          {
            title: "Escolha o tipo e clique na face",
            text: "Selecione o tipo de superfície, clique em **Gerar Reflexo na Cena** e depois na face — ela acende em azul. Não precisa entrar no grupo. Tela de TV e piso importados costumam vir divididos em vários pedaços: o plugin junta os pedaços vizinhos sozinho e a superfície inteira acende.",
          },
          {
            title: "Superfície em partes separadas? Use Shift",
            text: "Espelho em painéis ou vidro em folhas: segure **Shift** e clique nas outras faces, depois **Enter**. Sai um reflexo contínuo, sem emenda entre as partes.",
          },
          {
            title: "Ajuste sem refazer",
            text: "Piso e TV têm um slider; vidro, bronze e fumê têm dois — **brilho** e **transparência**. Solte o slider e o reflexo que já está na cena muda na hora, sem gerar de novo. Cada slider tem um botão de voltar ao valor padrão.",
          },
        ],
      },
      {
        type: "p",
        text: "O plugin reflete a câmera da cena pelo plano da superfície, captura o ambiente que ela realmente refletiria e projeta na face — em segundos, **sem custo de créditos**, pois tudo acontece localmente no seu SketchUp.",
      },
      {
        type: "warn",
        text: "O reflexo fica **salvo na cena** e some ao trocar de cena — gere um para cada cena. Se você mudar a vista da cena depois, refaça o reflexo antes de renderizar. O botão **Apagar todos os reflexos** limpa de uma vez tudo que a ferramenta criou no modelo.",
      },
      {
        type: "tip",
        text: "No vidro colorido, o interior do armário só aparece se o material da porta estiver transparente no SketchUp. E vale combinar: espelho no banheiro, fumê nas portas do closet, piso polido na sala — é o conjunto que faz o render parecer fotografia.",
      },
      { type: "cost", text: "Grátis — processado localmente, sem créditos" },
    ],
  },

  "luz-fake": {
    title: "Luz Fake: fitas de LED e spots direto no SketchUp",
    excerpt:
      "O Vizai cria a luz como geometria — fita contornando espelhos e marcenaria, spot com facho visível — pra IA entender a iluminação do seu projeto.",
    blocks: [
      {
        type: "p",
        text: "O SketchUp não mostra luz. Você desenha a sanca, o nicho, o espelho — e a cena continua chapada, sem nenhuma pista do que deve acender no render. A **Luz Fake** (na aba Cenas, logo abaixo do Reflexo de Espelho) resolve isso desenhando a luz: uma fita de LED que corre pela borda, ou um spot com o facho visível. Não é iluminação de verdade — é uma referência clara pra IA entender onde tem luz e de que cor ela é.",
      },
      {
        type: "video",
        src: "/treinamento/ui/luz-fake.mp4",
        caption: "Fita de LED atrás do espelho, na marcenaria e spots no teto — tudo local, sem custo de créditos.",
      },
      { type: "h2", text: "Fita de LED ou Spot" },
      {
        type: "ul",
        items: [
          "**Fita de LED** — corre ao longo de uma linha (sanca, nicho, rodapé) ou contorna a borda inteira de um espelho. Em **Tipo de objeto** você escolhe entre **Marcenaria** e **Espelho**.",
          "**Spot** — o facho cônico de uma luminária. Você clica na face da luminária e o facho sai dela.",
        ],
      },
      { type: "h2", text: "Como usar" },
      {
        type: "steps",
        items: [
          {
            title: "Escolha o modo e ajuste a luz",
            text: "Selecione **Fita de LED** ou **Spot**, a cor (o padrão é um branco quente, #ffe76e), a direção do facho e os sliders de **Alcance**, **Intensidade** e **Abertura**. Cada modo guarda os próprios valores.",
          },
          {
            title: "Clique em Gerar e depois no lugar da luz",
            text: "Para fita na marcenaria, clique na **linha** onde ela vai correr — segure **Shift** pra somar várias linhas de uma vez. Para fita em espelho, clique na **face do espelho** e ela contorna a borda inteira. Para spot, clique na **face da luminária**. **ESC** sai da ferramenta.",
          },
          {
            title: "Refine sem refazer",
            text: "Com uma luz selecionada no SketchUp, os sliders passam a editar aquela luz — solte o slider e ela se reconstrói na hora. Dá pra mover a luz na mão que o ajuste seguinte respeita a nova posição.",
          },
        ],
      },
      {
        type: "p",
        text: "A fita é uma faixa contínua: os cantos se encontram sem rasgo, e num contorno em pé (o espelho) o brilho sai pra fora acompanhando o formato, enquanto num contorno deitado (a sanca) ele desce ou sobe. Tudo é gerado no seu computador, em segundos, **sem consumir créditos**.",
      },
      {
        type: "warn",
        text: "É luz **fake**: ela não ilumina a cena do SketchUp, serve como referência visual pro render. O botão **Apagar todas as luzes** remove de uma vez tudo que a ferramenta criou no modelo.",
      },
      {
        type: "tip",
        text: "O uso que mais rende é a fita atrás do espelho — o desenho do brilho contornando a borda é o que faz a IA entregar aquele espelho retroiluminado de projeto. Combine com o **Reflexo de Espelho** na mesma cena: um dá o reflexo, o outro dá a luz.",
      },
      { type: "cost", text: "Grátis — processado localmente, sem créditos" },
    ],
  },

  "decorar-ambiente": {
    title: "Decorar Ambiente: mobília e decoração com IA em ambientes vazios",
    excerpt:
      "O virtual staging do Vizai: carregue um ambiente vazio, escolha o tipo de espaço e os estilos de decoração, e a IA cria um layout completo.",
    blocks: [
      {
        type: "p",
        text: "**Decorar Ambiente** é a ferramenta de virtual staging da IA Criativa: ela mobília e decora um ambiente a partir de uma imagem base. Perfeita para mostrar potencial de espaços vazios — imóveis na planta, reformas, home staging para venda.",
      },
      {
        type: "compare",
        before: { src: "/tools/tool-07-empty.avif", label: "Ambiente vazio" },
        after: { src: "/tools/tool-07.jpg", label: "Decorado com IA" },
      },
      { type: "h2", text: "Passo a passo" },
      {
        type: "steps",
        items: [
          {
            title: "Ative a IA Criativa",
            text: "Na aba Estúdio, alterne de Render para IA Criativa e escolha Decorar Ambiente.",
          },
          {
            title: "Carregue a imagem base",
            text: "Arraste uma foto ou render do ambiente (JPG/PNG até 5MB), ou capture direto da viewport.",
          },
          {
            title: "Configure o estilo",
            text: "Escolha o tipo de ambiente, os estilos de decoração e o horário (dia ou noite).",
          },
          {
            title: "Gere",
            text: "3 créditos por imagem. O resultado chega com Antes/Depois para comparar com a base.",
          },
        ],
      },
      {
        type: "img",
        src: "/treinamento/ui/modal-decorar-{lang}.webp",
        alt: "Modal de configuração do Decorar Ambiente",
        caption: "13 tipos de ambiente e 8 estilos de decoração combináveis.",
        ui: true,
      },
      { type: "h2", text: "Tipos de ambiente e estilos" },
      {
        type: "p",
        text: "São **13 tipos de ambiente** — Sala, Quarto, Cozinha, Banheiro, Escritório, Varanda, Garagem, Hall, Piscina, Adega, Despensa, Sala de Jantar e Espaço Gourmet — e **8 estilos de decoração** que você pode combinar: Moderno, Minimalista, Clássico, Industrial, Escandinavo, Rústico, Contemporâneo e Tropical. Ative mais de um estilo para um mix (ex.: Moderno + Escandinavo), ou nenhum para deixar a IA livre.",
      },
      {
        type: "tip",
        text: "Para o melhor resultado, use uma imagem do ambiente **sem mobiliário**: com paredes, piso e estrutura bem visíveis, a IA posiciona os móveis com muito mais precisão.",
      },
      { type: "cost", text: "3 créditos por geração" },
    ],
  },

  "planta-humanizada": {
    title: "Planta Humanizada: do desenho técnico à apresentação",
    excerpt:
      "Transforme a planta baixa do seu modelo (ou um desenho do PC) em uma planta humanizada renderizada, pronta para apresentar ao cliente.",
    blocks: [
      {
        type: "p",
        text: "A **Planta Humanizada** converte um desenho técnico — a vista de topo do seu modelo ou uma planta que você já tem em imagem — em uma planta renderizada com pisos, móveis, vegetação e sombras, no padrão das apresentações de lançamentos imobiliários.",
      },
      {
        type: "compare",
        aspect: "4 / 5",
        before: { src: "/tools/tool-08-before.webp", label: "Planta técnica" },
        after: { src: "/tools/tool-08.jpg", label: "Planta humanizada" },
      },
      { type: "h2", text: "Capturando a planta da viewport" },
      {
        type: "steps",
        items: [
          {
            title: "Vista de Topo",
            text: "No SketchUp, posicione a câmera em Câmera → Vistas Padrão → Superior.",
          },
          {
            title: "Projeção Paralela",
            text: "Ative Câmera → Projeção Paralela — isso elimina a perspectiva e deixa a planta “reta”, como um desenho técnico.",
          },
          {
            title: "Enquadre e capture",
            text: "Ajuste o zoom para a planta preencher a viewport e clique em Capturar Cena Atual no plugin.",
          },
        ],
      },
      {
        type: "p",
        text: "Também dá para pular a captura e **carregar uma imagem do PC** — funciona com plantas exportadas do AutoCAD, Revit ou até foto de um desenho, desde que as paredes estejam legíveis.",
      },
      { type: "h2", text: "Observações que fazem diferença" },
      {
        type: "p",
        text: "No campo de observações, descreva materiais e paleta: “piso de porcelanato claro, sofá de linho, marcenaria em madeira natural, plantas decorativas”. A IA mantém o desenho das paredes e aplica o acabamento descrito.",
      },
      {
        type: "tip",
        text: "Capture com os nomes de ambientes e cotas desligados se quiser uma planta limpa — ou mantenha os textos se a apresentação pedir a planta anotada.",
      },
      { type: "cost", text: "3 créditos por geração" },
    ],
  },

  diagrama: {
    title: "Diagrama: vistas isométricas e axonométricas com 5 estilos",
    excerpt:
      "Gere diagramas conceituais do seu projeto — do isométrico técnico em P&B à maquete física em madeira balsa — a partir de uma captura da viewport.",
    blocks: [
      {
        type: "p",
        text: "A ferramenta **Diagrama** transforma uma vista isométrica do seu modelo em pranchas conceituais com linguagem de escritório de arquitetura — ótimas para concursos, pranchas de apresentação e redes sociais.",
      },
      {
        type: "img",
        src: "/tools/tool-09.png",
        alt: "Diagrama gerado pelo Vizai Render",
        caption: "Diagrama gerado a partir de uma captura isométrica do modelo.",
      },
      { type: "h2", text: "Capturando a base" },
      {
        type: "steps",
        items: [
          {
            title: "Vista isométrica",
            text: "Posicione a câmera em um ângulo isométrico (Câmera → Vistas Padrão → Iso, ou ajuste manual).",
          },
          {
            title: "Projeção Paralela",
            text: "Ative Câmera → Projeção Paralela para o efeito axonométrico correto, sem fuga.",
          },
          {
            title: "Capture ou carregue",
            text: "Use Capturar Cena Atual, ou carregue uma imagem do PC.",
          },
        ],
      },
      { type: "h2", text: "Os 5 estilos" },
      {
        type: "p",
        text: "Primeiro escolha o contexto — **Exterior** (com entorno) ou **Interiores** (ambientes isolados) — e depois o estilo:",
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/tecnico.webp",
            alt: "Diagrama isométrico técnico",
            caption: "Isométrico Técnico — linhas P&B com entorno urbano.",
          },
          {
            src: "/demo/assets/diag/destaque.webp",
            alt: "Diagrama com destaque",
            caption: "Com Destaque — projeto em cor, entorno em cinza.",
          },
          {
            src: "/demo/assets/diag/colorido.webp",
            alt: "Diagrama colorido com contexto",
            caption: "Colorido — ilustração aquarelada com entorno.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/maquete.webp",
            alt: "Diagrama estilo maquete física",
            caption: "Maquete Física — estilo madeira balsa.",
          },
          {
            src: "/demo/assets/diag/int_axo.webp",
            alt: "Diagrama axonométrico de interiores",
            caption: "Axonométrico — corte isométrico do ambiente interno.",
          },
        ],
      },
      {
        type: "tip",
        text: "O estilo Com Destaque é o queridinho para concursos e posts: o olho vai direto pro projeto, e o entorno em cinza dá contexto sem competir.",
      },
      { type: "cost", text: "3 créditos por geração" },
    ],
  },

  moodboard: {
    title: "Moodboard: painéis de materiais e conceito em um clique",
    excerpt:
      "Crie moodboards profissionais a partir de uma imagem de referência — 7 composições de cena e 5 proporções, do flat lay ao painel de apresentação.",
    blocks: [
      {
        type: "p",
        text: "O **Moodboard** gera painéis de referência visual — amostras de materiais, paleta e objetos — a partir de uma imagem base do seu projeto ou de referências. É a ferramenta para o início da conversa com o cliente: apresenta o conceito antes mesmo do primeiro render.",
      },
      {
        type: "img",
        src: "/tools/tool-06.jpg",
        alt: "Moodboard gerado pelo Vizai Render",
        caption: "Moodboard gerado com amostras de materiais do projeto.",
      },
      { type: "h2", text: "Composições disponíveis" },
      {
        type: "p",
        text: "São **7 estilos de composição** — a “cena” onde as amostras são fotografadas:",
      },
      {
        type: "ul",
        items: [
          "**Bancada Studio** — superfície premium com fundo em gradiente suave.",
          "**Mesa de Projeto** — sobre mesa de trabalho, fundo semi-desfocado.",
          "**Vista do Topo** — flat lay direto de cima, sem perspectiva.",
          "**Painel de Apresentação** — amostras fixadas em board vertical.",
          "**Chão Iluminado** — flat lay em piso de madeira com luz lateral.",
          "**Linha de Materiais** — amostras alinhadas em fileira horizontal.",
          "**Tapete Decorado** — composição 3/4 sobre tapete com objetos.",
        ],
      },
      {
        type: "img",
        src: "/treinamento/ui/modal-moodboard-{lang}.webp",
        alt: "Modal de configuração do Moodboard",
        caption: "Escolha a composição e a proporção no modal de configuração.",
        ui: true,
      },
      { type: "h2", text: "Proporções" },
      {
        type: "p",
        text: "O moodboard sai no formato certo pro destino: **1:1** (Instagram clássico), **4:3** (apresentações), **16:9** (telas e portfólio), **4:5** (feed vertical) e **9:16** (Stories e Reels).",
      },
      {
        type: "tip",
        text: "Use como base uma imagem que já contenha os materiais do projeto (um render seu, ou colagem de referências). A IA extrai a paleta e os materiais dela.",
      },
      { type: "cost", text: "3 créditos por geração" },
    ],
  },

  "video-com-ia": {
    title: "Vídeo com IA: anime seus renders com câmera cinematográfica",
    excerpt:
      "Transforme um render em vídeo de 4 a 15 segundos com movimento de câmera profissional e som ambiente gerado por IA — direto do plugin.",
    blocks: [
      {
        type: "p",
        text: "A aba **Vídeo** transforma qualquer render em um clipe cinematográfico usando o **Kling 3.0 Pro**, um dos motores de vídeo mais avançados do mundo. O resultado sai em **1080p**, com movimento de câmera suave e, se quiser, som ambiente gerado por IA.",
      },
      {
        type: "video",
        src: "/tools/tool-03.mp4",
        caption: "Vídeo gerado a partir de um render do plugin.",
      },
      { type: "h2", text: "Montando o vídeo" },
      {
        type: "img",
        src: "/treinamento/ui/video-{lang}.webp",
        alt: "Aba Vídeo do Vizai Render",
        caption: "A aba Vídeo: frames, proporção, câmera e duração.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Frame inicial",
            text: "O ponto de partida do vídeo: use o último render, escolha do histórico ou faça upload do PC.",
          },
          {
            title: "Frame final (opcional)",
            text: "Defina também a imagem de chegada e a IA cria a transição entre as duas — ótimo para “tour” entre dois ângulos do ambiente.",
          },
          {
            title: "Proporção",
            text: "16:9 paisagem, 1:1 quadrado ou 9:16 vertical para Reels e Stories.",
          },
          {
            title: "Câmera e áudio",
            text: "Escolha o movimento e o som no modal de configuração (detalhes abaixo).",
          },
          {
            title: "Duração",
            text: "4, 6, 8, 10 ou 15 segundos — o custo aparece no botão antes de gerar.",
          },
        ],
      },
      { type: "h2", text: "Movimentos de câmera" },
      {
        type: "img",
        src: "/treinamento/ui/modal-camera-{lang}.webp",
        alt: "Modal de câmera e áudio do vídeo",
        caption: "8 movimentos prontos + descrição livre do movimento.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Automático** — movimento natural escolhido pela IA (recomendado).",
          "**Zoom In / Zoom Out** — aproximação ou afastamento suave.",
          "**Panorâmica esquerda / direita** — deslizamento lateral.",
          "**Tilt Up / Tilt Down** — inclinação para cima ou para baixo.",
          "**Órbita (Drone)** — giro suave ao redor do projeto.",
        ],
      },
      {
        type: "p",
        text: "Prefere dirigir a cena? Descreva o movimento livremente (“câmera avança devagar pela sala revelando a varanda”) e use as **Observações** para pedir foco em algum elemento. No áudio, escolha **Som Ambiente por IA** — vento, passos, sons urbanos, grátis — ou vídeo mudo para editar depois.",
      },
      {
        type: "table",
        head: ["Duração", "Custo"],
        rows: [
          ["4 segundos", "22 créditos"],
          ["6 segundos", "33 créditos"],
          ["8 segundos", "44 créditos"],
          ["10 segundos", "55 créditos"],
          ["15 segundos", "83 créditos"],
        ],
      },
      {
        type: "tip",
        text: "Vídeos de 4–6 segundos com movimento Automático ou Zoom In são os que mais convertem em redes sociais — e os mais baratos. Comece por eles.",
      },
    ],
  },

  "panorama-360": {
    title: "Panorama 360°: apresentações imersivas que o cliente explora",
    excerpt:
      "Marque a parede e onde você fica de pé — o SketchUp captura o ambiente inteiro e a IA devolve um panorama esférico que o cliente explora pelo link, sem instalar nada.",
    blocks: [
      {
        type: "p",
        text: "A aba **360** transforma o seu ambiente em um **panorama esférico interativo** direto do modelo — sem renderizar nada antes. Você marca onde a câmera fica e o plugin cuida do resto. O cliente recebe um link, abre no navegador (computador ou celular) e explora o espaço girando a imagem.",
      },
      {
        type: "img",
        src: "/demo/360/pano-result.webp",
        alt: "Panorama 360 gerado pelo Vizai Render",
        caption: "O panorama gerado — pronto para o visualizador interativo.",
      },
      { type: "h2", text: "Como gerar" },
      {
        type: "img",
        src: "/treinamento/ui/pano-{lang}.webp",
        alt: "Aba 360 do Vizai Render",
        caption: "A aba 360: marque a parede e depois onde o observador fica de pé.",
        ui: true,
      },
      {
        type: "p",
        text: "Você não precisa renderizar nada antes. **Clique na parede** que vai ficar no centro do panorama e depois **onde você fica de pé** — o SketchUp captura o ambiente inteiro sozinho, em todas as direções, e monta a imagem esférica. A IA transforma essa captura em uma foto realista.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Escolha a parede de frente",
            text: "Ela fica no centro do panorama. A emenda cai na parede oposta, então deixe a mais bonita à frente.",
          },
          {
            title: "Marque onde você fica de pé",
            text: "Clique no chão, no ponto de onde o cliente vai olhar. A altura do olho já vem em 1,60 m e você pode mudar.",
          },
          {
            title: "Confira a prévia",
            text: "O plugin mostra o ambiente capturado antes de gastar crédito. Se o observador caiu dentro de um móvel, é só refazer — a prévia é grátis.",
          },
          {
            title: "Gere e compartilhe",
            text: "5 créditos. Depois: visualize no plugin, baixe a imagem, copie o link ou envie direto pelo WhatsApp.",
          },
        ],
      },
      {
        type: "tip",
        text: "Escolha uma parede sem móveis colados e um ponto de vista com espaço em volta. Observador espremido num canto achata o ambiente; do meio do cômodo, o panorama respira.",
      },
      { type: "cost", text: "5 créditos por panorama · link de compartilhamento grátis" },
    ],
  },
  "blocos-3d": {
    title: "Blocos 3D: transforme qualquer foto em modelo para o SketchUp",
    excerpt:
      "Viu uma cadeira perfeita numa referência? A aba Blocos converte a foto em um modelo 3D texturizado e importa direto na sua cena.",
    blocks: [
      {
        type: "p",
        text: "A aba **Blocos** resolve aquele clássico: o cliente quer um móvel específico que não existe no 3D Warehouse. Envie uma foto de referência e a IA reconstrói o objeto em 3D, com textura, pronto para importar na cena na escala certa.",
      },
      {
        type: "img",
        src: "/tools/tool-05.webp",
        alt: "Bloco 3D gerado a partir de foto",
        caption: "Da foto de referência ao bloco 3D na cena.",
      },
      { type: "h2", text: "Como gerar" },
      {
        type: "img",
        src: "/treinamento/ui/blocos-{lang}.webp",
        alt: "Aba Blocos do Vizai Render",
        caption: "A aba Blocos: foto, densidade de malha e textura.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Adicione a foto de referência",
            text: "Arraste ou clique para carregar. Funciona melhor com o objeto inteiro visível, bem iluminado e com fundo limpo.",
          },
          {
            title: "Nomeie o bloco",
            text: "O nome organiza o componente no seu modelo (ex.: “Cadeira de Madeira”).",
          },
          {
            title: "Escolha a densidade de polígonos",
            text: "Leve, Recomendado, Pesado ou Ultra. Para SketchUp, Leve ou Recomendado mantêm o arquivo ágil.",
          },
          {
            title: "Textura",
            text: "Com textura PBR (cores e materiais da foto) ou só geometria, para aplicar seus próprios materiais.",
          },
          {
            title: "Importe ou baixe",
            text: "Importar na cena coloca o bloco direto no modelo; ou baixe o .GLB para usar em qualquer software.",
          },
        ],
      },
      {
        type: "warn",
        text: "Blocos com densidade Pesado/Ultra podem deixar o arquivo lento em modelos grandes. Se exagerar, a janela Tools (Impacto dos Componentes) mostra quais blocos estão pesando — e o guia de Otimizar Arquivo resolve.",
      },
      { type: "cost", text: "28 créditos por bloco gerado" },
    ],
  },

  "otimizar-arquivo": {
    title: "Tools — Otimizar Arquivo: deixe seu .skp leve de graça",
    excerpt:
      "Purge inteligente, materiais duplicados, redução de texturas e relatório de impacto dos componentes — a faxina completa do arquivo, 100% local e gratuita.",
    blocks: [
      {
        type: "p",
        text: "Arquivo travando, órbita engasgada, .skp com centenas de MB? A janela **Tools** (aba lateral verde do painel) inclui o **Otimizar Arquivo**: um conjunto de limpezas que roda 100% no seu computador, **sem custar créditos**. O tamanho do arquivo aparece no topo, antes e depois — você vê o resultado na hora.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-otimizar-{lang}.webp",
        alt: "Janela Tools com a aba Otimizar Arquivo",
        caption: "Otimizar Arquivo: Limpeza, Texturas e Impacto.",
        ui: true,
      },
      { type: "h2", text: "Limpeza" },
      {
        type: "ul",
        items: [
          "**Purge** — elimina materiais, componentes e estilos que não estão sendo usados em nada no projeto. É a limpeza que mais reduz arquivos que passaram por muitas versões.",
          "**Materiais Duplicados** — une materiais que usam a mesma textura com nomes diferentes (Madeira, Madeira1, Madeira-copy…), comum em modelos montados com blocos de origens variadas.",
        ],
      },
      { type: "h2", text: "Texturas" },
      {
        type: "p",
        text: "O **Gerenciador de Texturas** lista todas as imagens do modelo com suas dimensões. Texturas de 4K em um puxador de gaveta são peso morto: selecione as exageradas e reduza para a resolução alvo em um clique. O visual na viewport praticamente não muda — o tamanho do arquivo, sim.",
      },
      { type: "h2", text: "Impacto" },
      {
        type: "p",
        text: "O relatório de **Impacto dos Componentes** mostra quais blocos têm mais geometria (faces) e quantas instâncias existem de cada um. É como descobrir que uma árvore baixada do Warehouse tem 800 mil faces — e que ela está repetida 12 vezes. O botão Ver localiza o componente no modelo para você decidir o que fazer.",
      },
      {
        type: "tip",
        text: "Rode o Otimizar Arquivo antes de renderizar projetos grandes: modelo leve = viewport fluida = captura mais rápida. E faça backup na primeira vez que rodar limpezas pesadas num arquivo importante.",
      },
      { type: "cost", text: "Grátis — processado localmente, sem créditos" },
    ],
  },

  "pisos-seamless": {
    title: "Tools — Pisos Seamless: paginação de piso profissional em segundos",
    excerpt:
      "Crie texturas de piso pagináveis a partir de qualquer imagem: porcelanato, madeira com variações, rejunte configurável e aplicação direta nas faces.",
    blocks: [
      {
        type: "p",
        text: "A segunda ferramenta da janela **Tools** monta **texturas de piso seamless** a partir de imagens soltas — aquela foto de porcelanato do site do fornecedor vira um piso paginado, com rejunte e na dimensão real da peça. Também é local e gratuita.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-pisos-{lang}.webp",
        alt: "Aba Pisos Seamless da janela Tools",
        caption: "Preview ao vivo da paginação, com rejunte e dimensões reais.",
        ui: true,
      },
      { type: "h2", text: "Montando o piso" },
      {
        type: "steps",
        items: [
          {
            title: "Textura base",
            text: "Carregue a imagem da peça (foto do porcelanato, da madeira, do ladrilho).",
          },
          {
            title: "Variações (opcional)",
            text: "Adicione até 3 imagens alternativas da mesma linha — o plugin intercala as peças e elimina o efeito de repetição, essencial em madeiras.",
          },
          {
            title: "Paginação e rotação",
            text: "Grid Reto (alinhado), Transpassado 50% ou Transpassado 1/3 — e gire a peça se precisar (réguas na vertical, por exemplo).",
          },
          {
            title: "Dimensões reais",
            text: "Largura e altura da peça em centímetros (90×90, 20×120…). A textura entra no SketchUp já na escala correta.",
          },
          {
            title: "Rejunte",
            text: "Espessura em milímetros e cor — rejunte cinza, bege, preto ou combinando com a peça.",
          },
        ],
      },
      { type: "h2", text: "Aplicando no modelo" },
      {
        type: "p",
        text: "O preview mostra a paginação em tempo real. Para aplicar: **selecione as faces do piso** no SketchUp antes de clicar em Aplicar Textura — o material é criado e mapeado direto nelas. Sem seleção, o plugin ativa o balde de tinta para você clicar onde quiser.",
      },
      {
        type: "tip",
        text: "Pisos com paginação e rejunte corretos elevam o realismo do render: a IA respeita o desenho do piso que enxerga na cena. Monte o piso aqui antes de renderizar no Estúdio.",
      },
      { type: "cost", text: "Grátis — processado localmente, sem créditos" },
    ],
  },
};
