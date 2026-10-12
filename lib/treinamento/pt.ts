import type { ArticleContent, TreinoUiStrings } from "./types";

export const ptUi: TreinoUiStrings = {
  badge: "Treinamento oficial Vizai Render",
  title: "Treinamento Vizai Render",
  subtitle:
    "Guias completos de todas as ferramentas do plugin, do primeiro render às apresentações em vídeo e 360°. Tudo explicado passo a passo, com imagens reais da interface e dos resultados.",
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
    aulas: "Aula em vídeo",
    start: "Comece aqui",
    render: "Render",
    creative: "IA Criativa",
    present: "Apresentação",
    free: "Ferramentas grátis",
  },
};

export const ptArticles: Record<string, ArticleContent> = {
  "historico": {
    title: "Aba Histórico: recupere o que você esqueceu de salvar",
    excerpt:
      "As últimas 10 imagens e blocos que você gerou ficam guardados no seu computador, com o custo em créditos de cada um. Veja como baixar de novo e quando o limpar apaga para sempre.",
    blocks: [
      { type: "p", text: "Toda geração feita no plugin entra no Histórico: renders, edições, closeups, panoramas 360 e blocos 3D. É a rede de segurança para o caso mais comum de todos, que é fechar a janela antes de salvar a imagem no computador." },
      { type: "h2", text: "O que fica guardado" },
      { type: "p", text: "O Histórico guarda os 10 itens mais recentes, de todos os projetos, e não só do arquivo aberto. Cada linha mostra a miniatura, o tipo de geração, a data, o projeto de onde veio e quantos créditos aquele item custou." },
      { type: "p", text: "A lista é única de propósito: você troca de arquivo do SketchUp e continua enxergando o que gerou antes. No rodapé aparece a soma de créditos dos itens que estão ali, que é uma forma rápida de ver quanto consumiu recentemente." },
      { type: "tip", text: "O Histórico é persistente: ele sobrevive a fechar e reabrir o SketchUp. O que não sobrevive é passar do limite, porque o item mais antigo sai quando o décimo primeiro entra." },
      { type: "h2", text: "Baixar de novo" },
      { type: "p", text: "No botão de download de cada linha, a imagem cheia é salva no computador de novo, na resolução original. É por isso que o Histórico existe: não é uma galeria bonita, é a chance de recuperar o que passou." },
      { type: "warn", text: "Bloco 3D tem prazo. O arquivo do modelo fica hospedado temporariamente, então baixe o bloco no dia em que gerar. A imagem do render não tem esse limite." },
      { type: "h2", text: "Limpar tudo, e por que pensar duas vezes" },
      { type: "p", text: "O botão vermelho apaga a lista inteira e também as imagens guardadas na pasta do plugin no seu computador. Não há como desfazer, e o plugin avisa isso antes de executar." },
      { type: "p", text: "Só use quando quiser mesmo liberar espaço. Se a intenção é apenas organizar, não precisa: o próprio Histórico se limita a 10 itens e a 60 MB de imagens, descartando o mais antigo sozinho." },
      { type: "cost", text: "O Histórico não custa crédito nenhum. Ver, baixar de novo e limpar são operações locais, feitas no seu computador." },
    ],
  },
  "otimizar-arquivo": {
    title: "Otimizar Arquivo (Tools): deixe seu .skp leve de graça",
    excerpt:
      "Purge inteligente, materiais duplicados, redução de texturas e relatório de impacto dos componentes. A faxina completa do arquivo, 100% local e gratuita.",
    blocks: [
      {
        type: "p",
        text: "Arquivo travando, órbita engasgada, .skp com centenas de MB? A janela **Tools** (aba lateral verde do painel) inclui o **Otimizar Arquivo**: um conjunto de limpezas que roda 100% no seu computador, **sem custar créditos**. O tamanho do arquivo aparece no topo, antes e depois. Você vê o resultado na hora.",
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
          "**Purge**: elimina materiais, componentes e estilos que não estão sendo usados em nada no projeto. É a limpeza que mais reduz arquivos que passaram por muitas versões.",
          "**Materiais Duplicados**: une materiais que usam a mesma textura com nomes diferentes (Madeira, Madeira1, Madeira-copy…), comum em modelos montados com blocos de origens variadas.",
        ],
      },
      { type: "h2", text: "Texturas" },
      {
        type: "p",
        text: "O **Gerenciador de Texturas** lista todas as imagens do modelo com suas dimensões. Texturas de 4K em um puxador de gaveta são peso morto: selecione as exageradas e reduza para a resolução alvo em um clique. O visual na viewport praticamente não muda. O tamanho do arquivo, sim.",
      },
      { type: "h2", text: "Impacto" },
      {
        type: "p",
        text: "O relatório de **Impacto dos Componentes** mostra quais blocos têm mais geometria (faces) e quantas instâncias existem de cada um. É como descobrir que uma árvore baixada do Warehouse tem 800 mil faces, e que ela está repetida 12 vezes. O botão Ver localiza o componente no modelo para você decidir o que fazer.",
      },
      {
        type: "tip",
        text: "Rode o Otimizar Arquivo antes de renderizar projetos grandes: modelo leve = viewport fluida = captura mais rápida. E faça backup na primeira vez que rodar limpezas pesadas num arquivo importante.",
      },
      { type: "cost", text: "Grátis: processado localmente, sem créditos" },
    ],
  },
  "pisos-seamless": {
    title: "Pisos Seamless (Tools): paginação de piso profissional em segundos",
    excerpt:
      "Crie texturas de piso pagináveis a partir de qualquer imagem: porcelanato, madeira com variações, rejunte configurável e aplicação direta nas faces.",
    blocks: [
      { type: "p", text: "**Pisos Seamless**, na janela **Tools**, transforma a foto de uma peça (porcelanato, madeira, ladrilho) em um piso paginado, com rejunte e na dimensão real, aplicado direto nas faces do modelo. Roda no seu computador e não gasta créditos." },
      {
        type: "img",
        src: "/treinamento/ui/tools-pisos-{lang}.webp",
        alt: "Aba Pisos Seamless da janela Tools",
        caption: "Preview ao vivo da paginação, com rejunte e dimensões reais.",
        ui: true,
      },
      { type: "p", text: "O plugin monta uma textura com um bloco de 6 × 6 peças já paginadas e com rejunte, na escala real que você informar, e cria um material no SketchUp com ela. Com variações, ele intercala as imagens dentro desse bloco, e a repetição fica bem menos visível." },
      { type: "h2", text: "Montando o piso" },
      {
        type: "steps",
        items: [
          {
            title: "Textura base",
            text: "Carregue a imagem de uma peça: a foto do porcelanato, da régua de madeira ou do ladrilho. Use uma imagem reta, de frente, sem perspectiva e só com a peça.",
          },
          {
            title: "Variações (opcional)",
            text: "Adicione até 3 imagens da mesma linha. O plugin intercala as peças e quebra o efeito de repetição, essencial em madeira e em porcelanato com veio.",
          },
          {
            title: "Paginação e rotação",
            text: "Grid Reto (alinhado), Transpassado 50% ou Transpassado 1/3. Use Girar para deixar as réguas no sentido certo.",
          },
          {
            title: "Dimensões reais",
            text: "Largura e altura da peça em centímetros (começa em 90 × 90; para réguas, algo como 20 × 120). A textura entra no SketchUp já na escala correta.",
          },
          {
            title: "Rejunte",
            text: "Espessura em milímetros (começa em 2 mm) e cor (começa em cinza-escuro). Rejunte da cor da peça deixa o piso mais contínuo.",
          },
        ],
      },
      { type: "h2", text: "Aplicando no modelo" },
      { type: "p", text: "O preview mostra a paginação em tempo real. Para aplicar: **selecione as faces do piso** no SketchUp antes de clicar em Aplicar Textura. O material é criado e mapeado direto nelas. Sem seleção, o plugin ativa o balde de tinta para você clicar onde quiser." },
      { type: "h2", text: "Para o piso ficar bom" },
      {
        type: "ul",
        items: [
          "**Foto da peça, não do ambiente.** Recorte só a peça, sem bordas, reflexo forte ou perspectiva.",
          "**Variações em madeira.** Uma única régua repetida denuncia o piso; 3 variações já resolvem.",
          "**Medida certa da peça.** É ela que define a escala. Confira na ficha do fornecedor.",
          "**Monte o piso antes do render.** A IA respeita a paginação e o rejunte que vê na cena, e o realismo do render sobe.",
        ],
      },
      { type: "h2", text: "Se o resultado não sair como esperado" },
      {
        type: "ul",
        items: [
          "**Repetição aparente**: adicione variações da mesma linha, ou use Transpassado para quebrar o alinhamento.",
          "**Peça grande ou pequena demais**: confira largura e altura em centímetros e aplique de novo.",
          "**Réguas no sentido errado**: use Girar e aplique de novo nas faces.",
          "**Textura na face errada**: selecione as faces do piso antes de clicar em Aplicar Textura.",
        ],
      },
      { type: "h2", text: "Perguntas rápidas" },
      {
        type: "ul",
        items: [
          "**Gasta créditos?** Não. É processado no seu computador.",
          "**Posso usar em revestimento de parede?** Sim. A ferramenta aplica nas faces que você selecionar, seja piso ou parede.",
          "**Funciona com foto de catálogo?** Sim, desde que a peça esteja de frente e sem perspectiva.",
        ],
      },
      { type: "cost", text: "Grátis: processado localmente, sem créditos" },
    ],
  },
  "video-com-ia": {
    title: "Vídeo com IA: anime seus renders com câmera cinematográfica",
    excerpt:
      "Transforme um render em vídeo de 4 a 15 segundos, em 1080p, com movimento de câmera e som ambiente gerado por IA, direto do plugin.",
    blocks: [
      { type: "p", text: "Com a aba **Vídeo** do Vizai, um render pronto vira um clipe de **4 a 15 segundos em 1080p**, com movimento de câmera e, se você quiser, som ambiente gerado por IA. É o jeito mais rápido de levar o projeto para Reels, Stories ou para a apresentação ao cliente, sem montar animação no SketchUp e sem renderizar quadro a quadro." },
      {
        type: "video",
        src: "/tools/tool-03.mp4",
        caption: "Vídeo gerado a partir de um render do plugin.",
      },
      { type: "p", text: "Quem anima a imagem é o **Kling 3.0 Pro**, um modelo de vídeo por IA. Ele parte do seu render e cria o movimento a partir dele: o que aparece no vídeo é o projeto da imagem, e não o modelo 3D andando em tempo real. Por isso o resultado depende tanto do render de partida." },
      { type: "h2", text: "Do render ao vídeo, passo a passo" },
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
            title: "Escolha o frame inicial",
            text: "É a imagem de onde o vídeo parte. Por padrão é o último render; você também pode pegar uma imagem do Histórico ou subir uma do computador. A IA não conserta o que está errado na imagem, então comece por um render que você já aprovaria.",
          },
          {
            title: "Defina o frame final, se quiser",
            text: "Opcional. Com uma segunda imagem, a IA cria a transição entre as duas. Funciona melhor com dois renders do mesmo ambiente, com a mesma luz e ângulos próximos.",
          },
          {
            title: "Escolha a proporção",
            text: "Paisagem (16:9) para apresentação e YouTube, quadrado (1:1) para o feed e retrato (9:16) para Reels e Stories. Use a mesma proporção do render: se o vídeo vai ser vertical, gere o render já em 9:16.",
          },
          {
            title: "Configure câmera e áudio",
            text: "No botão **Configurar Câmera e Áudio**, escolha um dos 8 movimentos e se o vídeo terá som.",
          },
          {
            title: "Escreva observações, se quiser",
            text: "No campo **Observações**, peça atenção a um elemento (“focar na cadeira de madeira”) ou descreva o movimento com suas palavras (“câmera avança devagar e revela a varanda”). O texto é somado ao movimento escolhido.",
          },
          {
            title: "Escolha a duração e gere",
            text: "4, 6, 8, 10 ou 15 segundos. O custo aparece no botão antes de gerar, e o vídeo fica pronto em 2 a 5 minutos.",
          },
        ],
      },
      { type: "h2", text: "Os 8 movimentos de câmera" },
      {
        type: "img",
        src: "/treinamento/ui/modal-camera-{lang}.webp",
        alt: "Modal de câmera e áudio do vídeo",
        caption: "Os 8 movimentos prontos e as opções de som.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Automático (Recomendado)**: a IA escolhe um movimento natural para a cena. É o melhor ponto de partida.",
          "**Zoom In Suave**: a câmera avança para dentro da cena. Destaca um ambiente ou um detalhe de marcenaria.",
          "**Zoom Out Suave**: a câmera recua e revela o espaço inteiro. Bom para fechar o vídeo mostrando o todo.",
          "**Panorâmica para Direita ou para Esquerda**: a câmera desliza de lado. Funciona em salas largas, cozinhas lineares e fachadas compridas.",
          "**Tilt Up e Tilt Down**: a câmera inclina para cima ou para baixo. Mostra pé-direito alto, escadas e fachadas de prédio.",
          "**Órbita (Drone)**: a câmera gira em volta do projeto, como um drone. É o movimento mais vistoso para fachadas e casas, e o que mais exige da IA.",
        ],
      },
      { type: "h2", text: "Som do vídeo" },
      {
        type: "ul",
        items: [
          "**Som Ambiente (Gerado por IA)**: vento, passos e ruído da cidade, criados para combinar com a cena. Não muda o preço.",
          "**Sem Som**: vídeo mudo, para você colocar música ou narração na edição.",
        ],
      },
      { type: "h2", text: "Quanto custa" },
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
      { type: "h2", text: "Para o vídeo sair bom" },
      {
        type: "ul",
        items: [
          "**Comece curto.** Vídeos de 4 a 6 segundos com movimento Automático ou Zoom In são os mais estáveis e os mais baratos. Deixe 10 ou 15 segundos para quando o movimento precisar de tempo, como uma órbita.",
          "**Render limpo, vídeo limpo.** Corrija o render antes, com a edição por máscara, e só depois anime. A IA leva para o vídeo tudo o que estiver na imagem.",
          "**Proporção certa desde o render.** Para Reels, gere o render em 9:16 em vez de usar um render horizontal.",
        ],
      },
      { type: "h2", text: "Se o resultado não sair como esperado" },
      {
        type: "ul",
        items: [
          "**Esquadria, marcenaria ou fachada deformando**: quanto mais a câmera se desloca, mais a IA precisa inventar o que não aparece no render. Troque para um movimento mais curto (Zoom In ou Automático), reduza a duração ou use um frame final para segurar o ponto de chegada.",
          "**Movimento diferente do pedido**: descreva o movimento nas Observações com uma frase simples e direta, e mantenha o movimento pronto coerente com ela.",
        ],
      },
      { type: "warn", text: "Se a geração falhar ou o vídeo não chegar ao plugin, os créditos voltam para a sua conta automaticamente." },
      { type: "h2", text: "Perguntas rápidas" },
      {
        type: "ul",
        items: [
          "**Quanto tempo leva?** De 2 a 5 minutos, conforme a duração.",
          "**Qual a resolução?** 1080p, na proporção escolhida.",
          "**Dá para fazer um tour pela casa inteira?** Não num vídeo só: cada vídeo parte de um render e dura até 15 segundos. Para um tour, gere um vídeo por ambiente e junte na edição.",
          "**Posso animar uma imagem que não veio do Vizai?** Sim. No frame inicial, use Upload do PC.",
        ],
      },
      { type: "cost", text: "22 a 83 créditos por vídeo, conforme a duração" },
    ],
  },
  "panorama-360": {
    title: "Panorama 360°: apresentações imersivas que o cliente explora",
    excerpt:
      "Marque a parede e onde você fica de pé: o SketchUp captura o ambiente inteiro e a IA devolve, em cerca de 30 segundos, um panorama esférico que o cliente explora pelo link, sem instalar nada.",
    blocks: [
      { type: "p", text: "A aba **360** transforma um ambiente do seu modelo em um **panorama esférico realista**, que o cliente abre por um link no computador ou no celular e explora girando a imagem. Não é preciso renderizar nada antes: você marca a parede e o ponto onde está, e o panorama fica pronto em cerca de 30 segundos, por 5 créditos." },
      {
        type: "img",
        src: "/treinamento/ui/pano-360-resultado.webp",
        alt: "Panorama 360 gerado pelo Vizai Render",
        caption: "O panorama gerado: pronto para o visualizador interativo.",
      },
      { type: "p", text: "São duas etapas. Primeiro o próprio SketchUp captura o ambiente em todas as direções a partir do ponto marcado e monta uma prévia esférica, sem custo. Depois a IA transforma essa prévia em fotografia: mantém a arquitetura, os móveis e as proporções, troca os materiais do modelo por acabamentos reais e apaga as linhas de contorno do SketchUp." },
      { type: "h2", text: "Passo a passo" },
      {
        type: "img",
        src: "/treinamento/ui/pano-{lang}.webp",
        alt: "Aba 360 do Vizai Render",
        caption: "A aba 360: marque a parede e depois onde o observador fica de pé.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Escolha a parede de frente",
            text: "Clique na parede que vai ficar no centro do panorama. A emenda da imagem cai na parede oposta, então deixe a mais bonita à frente. Se você clicar no piso ou no teto, o plugin usa a direção da câmera atual.",
          },
          {
            title: "Marque onde você fica de pé",
            text: "Clique no chão, no ponto de onde o cliente vai olhar. A altura do olho já vem em 1,60 m, e você pode mudar.",
          },
          {
            title: "Confira a prévia",
            text: "O plugin captura as 6 vistas e costura o 360 antes de gastar crédito. Se o observador caiu dentro de um móvel ou de uma parede, é só refazer. A prévia é grátis.",
          },
          {
            title: "Gere",
            text: "Clique em **Gerar 360**. São 5 créditos, e o panorama fica pronto em cerca de 30 segundos.",
          },
          {
            title: "Compartilhe",
            text: "Visualize maior no plugin, baixe a imagem, copie o link ou envie direto pelo WhatsApp. O cliente abre no navegador e pode girar, dar zoom e ver em tela cheia.",
          },
        ],
      },
      { type: "h2", text: "Como o panorama sai" },
      {
        type: "ul",
        items: [
          "**Feito para interiores.** O 360 trata a cena como um ambiente interno fotografado para revista.",
          "**Luz natural do dia.** As luzes artificiais saem apagadas: fitas de LED, spots e luminárias não acendem no panorama. Para mostrar a iluminação noturna, use o render, com o estilo de luz que quiser.",
          "**Arquitetura e móveis travados.** A IA não acrescenta nem remove objetos e não muda layout nem proporções. O que muda são os acabamentos, que passam de material de modelo para material real.",
          "**Vista pela janela.** Do lado de fora do vidro, a IA cria um entorno urbano residencial, para a janela não ficar branca nem vazia. A janela em si não muda.",
        ],
      },
      { type: "h2", text: "Para o panorama sair bom" },
      {
        type: "ul",
        items: [
          "**Do meio do cômodo.** Observador espremido num canto achata o ambiente; do meio, o panorama respira.",
          "**Parede limpa à frente.** Escolha para o centro do panorama uma parede sem móveis colados.",
          "**Ambiente fechado e com materiais.** Paredes, piso e teto modelados e com materiais aplicados dão à IA o que interpretar. Onde falta parede ou teto, a IA precisa adivinhar o que tem ali.",
        ],
      },
      { type: "h2", text: "Se o resultado não sair como esperado" },
      {
        type: "ul",
        items: [
          "**Observador dentro de um móvel ou de uma parede**: aparece na prévia, antes de gastar crédito. Marque o ponto de novo, um pouco mais afastado.",
          "**Emenda aparente**: ela sempre cai na parede oposta à que você escolheu como frente. Escolha como frente a parede mais importante, e a emenda vai para a de trás.",
          "**Panorama virado para o lado errado**: você clicou no piso ou no teto em vez de uma parede, e o plugin usou a direção da câmera. Clique numa parede para escolher a frente.",
        ],
      },
      { type: "tip", text: "O link serve para mostrar ao cliente. Para guardar o panorama junto com o projeto, baixe a imagem também." },
      { type: "h2", text: "Perguntas rápidas" },
      {
        type: "ul",
        items: [
          "**Quanto tempo leva?** Cerca de 30 segundos depois da prévia.",
          "**Qual o tamanho da imagem?** 2048 × 1024 pixels, no formato esférico (equiretangular) que os visualizadores 360 usam.",
          "**Preciso renderizar antes?** Não. O 360 sai direto do modelo.",
          "**O cliente precisa instalar algo?** Não. O link abre no navegador do computador ou do celular.",
          "**Funciona em área externa?** O 360 foi feito para ambientes internos, e é neles que funciona melhor.",
        ],
      },
      { type: "cost", text: "5 créditos por panorama · prévia e link de compartilhamento grátis" },
    ],
  },
  "blocos-3d": {
    title: "Blocos 3D: transforme qualquer foto em modelo para o SketchUp",
    excerpt:
      "Viu uma cadeira perfeita numa referência? A aba Blocos converte a foto em um modelo 3D com textura e importa direto na sua cena.",
    blocks: [
      { type: "p", text: "A aba **Blocos** transforma a foto de um móvel ou objeto em um **modelo 3D com textura**, que entra no SketchUp como componente. Resolve aquele clássico: o cliente quer uma peça específica que não existe no 3D Warehouse. Cada bloco custa 28 créditos e fica pronto em poucos minutos." },
      {
        type: "img",
        src: "/tools/tool-05.webp",
        alt: "Bloco 3D gerado a partir de foto",
        caption: "Da foto de referência ao bloco 3D na cena.",
      },
      { type: "p", text: "Quem reconstrói o objeto é o **Meshy**, um modelo de IA que gera 3D a partir de uma imagem. Ele deduz as partes que não aparecem na foto, como o lado de trás, e entrega uma malha leve, com cerca de 10 mil polígonos, pensada para não pesar o SketchUp." },
      { type: "h2", text: "Como gerar" },
      {
        type: "img",
        src: "/treinamento/ui/blocos-{lang}.webp",
        alt: "Aba Blocos do Vizai Render",
        caption: "A aba Blocos: foto de referência, nome e geração.",
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
            text: "O nome organiza o componente no seu modelo (por exemplo, “Cadeira de Madeira”).",
          },
          {
            title: "Gere",
            text: "São 28 créditos. Na maioria das vezes fica pronto em 3 a 5 minutos; em horário de fila, pode passar de 10.",
          },
          {
            title: "Importe ou baixe",
            text: "Importar na cena coloca o bloco direto no modelo; ou baixe o arquivo .GLB para usar em outro programa.",
          },
        ],
      },
      { type: "h2", text: "Ajuste o tamanho depois de importar" },
      { type: "p", text: "O bloco não chega na medida real da peça. Depois de importar, confira o tamanho e use a ferramenta **Escala** do SketchUp para deixar o móvel com as medidas certas." },
      { type: "h2", text: "Para o bloco sair bom" },
      {
        type: "ul",
        items: [
          "**Objeto inteiro e sozinho na foto.** Bem iluminado, com fundo limpo e sem outros móveis encostados.",
          "**Foto em três quartos.** Uma foto levemente de lado mostra frente e lateral, e a IA erra menos as partes escondidas.",
          "**Peças de forma clara saem melhores.** Cadeiras, poltronas, mesas, luminárias e vasos costumam funcionar bem. Peças muito vazadas ou com detalhes finos, como palhinha e arame, tendem a perder definição.",
        ],
      },
      { type: "warn", text: "Muitos blocos num modelo grande somam peso. A janela Tools (Impacto dos Componentes) mostra quais blocos estão pesando, e a aula Otimizar Arquivo ensina a resolver." },
      { type: "h2", text: "Se o resultado não sair como esperado" },
      {
        type: "ul",
        items: [
          "**Lado de trás estranho**: a IA deduz o que não aparece na foto. Use uma foto em três quartos, que mostra mais do objeto.",
          "**Tamanho errado**: ajuste com a ferramenta Escala depois de importar.",
          "**O bloco não chegou**: se a geração falhar ou o bloco não chegar ao plugin, os créditos voltam para a sua conta automaticamente.",
        ],
      },
      { type: "h2", text: "Perguntas rápidas" },
      {
        type: "ul",
        items: [
          "**Quanto tempo leva?** De 3 a 5 minutos, na maioria das vezes.",
          "**Quantos polígonos tem o bloco?** Cerca de 10 mil: leve o bastante para usar várias vezes no mesmo modelo.",
          "**Que arquivo sai?** O plugin importa o bloco direto na cena; o arquivo para baixar é GLB, que a maioria dos programas 3D abre.",
        ],
      },
      { type: "cost", text: "28 créditos por bloco gerado" },
    ],
  },
  "primeiro-render": {
    title: "Seu primeiro render fotorrealista no SketchUp, do enquadramento ao resultado",
    excerpt:
      "A aula completa: prepare a cena na aba Cenas, gere o render no Estúdio e refine a imagem no editor, sem sair do SketchUp.",
    blocks: [
{
        type: "p",
        text: "A IA renderiza exatamente o que ela enxerga na sua viewport. Por isso, o passo que mais influencia a qualidade do resultado não é o prompt. É a **preparação da cena**. A aba Cenas reúne todos os controles para isso, sem você precisar mexer nas configurações do SketchUp.",
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
        text: "Os controles **Claro** e **Escuro** ajustam as sombras do SketchUp. Ajuste os dois juntos para clarear a cena e revelar mais detalhes. Quanto mais a IA enxerga do seu modelo, mais fiel é o render. O botão **Usar sol para sombreamento** melhora a leitura de volumes.",
      },
      {
        type: "p",
        text: "Não quer pensar nisso? Use os presets prontos: **Externa** para fachadas e áreas abertas, **Interior** para ambientes internos. Eles aplicam a configuração recomendada em um clique, e o plugin restaura as sombras originais do seu arquivo quando você fecha o painel.",
      },
      { type: "h2", text: "Formato de saída" },
      {
        type: "p",
        text: "Escolha a proporção da imagem final antes de renderizar: **Paisagem 16:9** (apresentações), **Quadrado 1:1**, **Feed 4:5** e **Retrato 9:16** (redes sociais), além de 5:4, **Clássico 4:3**, **Foto 3:2** e 7:5. A viewport mostra a máscara do recorte em tempo real. O que está dentro é o que vai pro render.",
      },
      { type: "h2", text: "Distância focal" },
      {
        type: "p",
        text: "A distância focal muda completamente a leitura do espaço: **24mm (grande angular)** abraça ambientes internos pequenos, **35–55mm** são neutras e realistas, **70–85mm** comprimem a perspectiva como uma foto profissional de detalhe. Há também o modo **Custom** para definir o valor manualmente.",
      },
      {
        type: "tip",
        text: "Para interiores residenciais, 24mm a 35mm é o padrão de fotografia de arquitetura. Para fachadas, experimente 35mm a 55mm a uma distância maior. Distorce menos as verticais.",
      },
      { type: "h2", text: "Guias de composição" },
      {
        type: "ul",
        items: [
          "**Regra dos terços**: sobrepõe as linhas-guia clássicas de fotografia na viewport, para posicionar os elementos de interesse nos pontos fortes do quadro.",
          "**2 pontos de fuga**: ativa a perspectiva arquitetônica do SketchUp, deixando todas as verticais perfeitamente retas, o padrão das fotos profissionais de arquitetura.",
        ],
      },
      { type: "h2", text: "Salvar cenas" },
      {
        type: "p",
        text: "Encontrou um ângulo perfeito? Dê um nome e clique em **Salvar**. A cena é criada no SketchUp e você volta a ela quando quiser. Salve seus 3 ou 4 ângulos principais antes de começar a renderizar: facilita gerar a série completa de imagens do projeto e refazer ajustes depois.",
      },
        { type: "p", text: "Com a cena salva, é hora de gerar a primeira imagem. Todo o trabalho acontece na aba Estúdio, e leva menos de um minuto." },
{
        type: "p",
        text: "Com a cena preparada, renderizar é seguir os 5 passos numerados da aba **Estúdio**, no modo **Render**. Em segundos a IA devolve uma imagem fotorrealista do exato ângulo da sua viewport, preservando seu projeto. Geometria, materiais e composição.",
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
            text: "Diz à IA o que ela está vendo: Interiores, Fachada Externa, Meio à Natureza (integração com paisagem), Comercial (loja, escritório) ou Edifício. Cada tipo usa um tratamento específico de iluminação e contexto. Ao escolher **Fachada Externa** aparece uma segunda escolha, o entorno do terreno: **Casas vizinhas** (o padrão — uma casa de cada lado, no mesmo padrão do seu projeto), **Lotes com muro** (terrenos vagos com muro ou cerca de divisa) ou **Terreno vazio** (terreno aberto, sem muro nem cerca).",
          },
          {
            title: "Qualidade",
            text: "O motor de imagem do Vizai (Nano Banana Pro). Cada render custa 4 créditos.",
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
        text: "O render aparece no próprio painel com o controle **Antes/Depois** para comparar com o modelo original, inclusive em tela cheia. Dali você pode **Baixar** a imagem, abrir o **Editor** para refinar, ou **Exportar em alta resolução**: o download padrão é grátis, e o upscale para **4K custa 5 créditos**.",
      },
      { type: "h2", text: "Escrevendo bons detalhes de cena" },
      {
        type: "p",
        text: "O campo de detalhes não precisa de frases elaboradas. Palavras-chave separadas por vírgula funcionam melhor. Descreva o que a IA não consegue adivinhar pelo modelo:",
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
        text: "Se o render vier escuro ou com áreas “inventadas”, volte à aba Cenas e clareie a iluminação. Geralmente a IA não estava enxergando aquela região do modelo.",
      },
      { type: "cost", text: "4 créditos por render · upscale 4K opcional por 5 créditos" },
        { type: "p", text: "O render ficou pronto, mas você não precisa aceitar o primeiro resultado. A janela Editar permite corrigir um detalhe, criar novas perspectivas e ajustar a imagem sem gastar um render novo." },
{
        type: "p",
        text: "Gerou um render bom, mas o sofá ficou estranho? Quer o mesmo ambiente visto de outro ângulo, ou um closeup da bancada pra apresentação? É para isso que existe o **Editor**. Clique em **Editar** sobre qualquer render e ele abre em uma janela dedicada com três abas: **Edição com IA**, **Recorte** e **Ajustes**.",
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
            text: "Cada edição custa 4 créditos e entra no histórico lateral. Você navega entre as versões e segura o botão Antes/Depois para comparar com o original.",
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
        text: "Sem máscara nenhuma, o comando vale para a imagem inteira, útil para mudanças globais como “deixar o ambiente noturno” ou “trocar a cor das paredes”.",
      },
      { type: "h2", text: "Novas perspectivas: várias cenas a partir de um render" },
      {
        type: "p",
        text: "Este é um dos recursos mais poderosos do Editor: peça **outro ângulo** do mesmo ambiente direto no campo de texto, sem mover a câmera no SketchUp e sem gastar um render novo do zero. A IA entende a intenção do seu comando:",
      },
      {
        type: "ul",
        items: [
          "**“Closeup da poltrona”**: marque a poltrona (ou apenas escreva) e receba um detalhe aproximado, com materiais e iluminação preservados.",
          "**“Vista lateral do ambiente”** ou **“nova perspectiva mostrando a cozinha pela direita”**: gera o mesmo espaço visto de outro ponto.",
          "**“Vista de drone”**: afasta e eleva a câmera para uma tomada aérea.",
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
        text: "Na prática, um único render de 4 créditos vira a base de uma **apresentação completa**: gere o geral, depois peça closeups dos detalhes e ângulos alternativos por 4 créditos cada, muito mais rápido do que reposicionar câmera e re-renderizar cada vista.",
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
        text: "Ao clicar em **Finalizar Edição**, a versão final volta para o painel principal, pronta para virar vídeo, 360 ou upscale 4K.",
      },
      { type: "cost", text: "Edição com IA e novas perspectivas: 4 créditos cada · Recorte, Ajustes e download 2K: grátis" },
    ],
  },
  "reflexo-espelho": {
    title: "Reflexo de espelho e Luz Fake no SketchUp",
    excerpt:
      "Como amarrar reflexo em espelhos, vidros e piso polido à sua cena, e como inserir fitas de LED e spots direto no modelo.",
    blocks: [
{
        type: "p",
        text: "Superfície que reflete é um problema clássico: o SketchUp mostra uma face chapada, e a IA, sem referência, inventa um reflexo qualquer. A ferramenta **Reflexo de Espelho** (na aba Cenas) projeta na face o que ela **realmente refletiria**, e aí sim você renderiza, com o reflexo coerente com o ambiente.",
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
          "**Espelho**: opaco, reflexo cheio. O comportamento clássico da ferramenta.",
          "**Piso**: porcelanato polido, bancada de mármore, mesa laca. Reflexo fraco por cima: o material do piso continua mandando na aparência.",
          "**TV**: tela desligada. Opaca e bem escura, com o ambiente aparecendo só insinuado, como numa tela apagada de verdade.",
          "**Vidro**: vidro incolor de box ou porta. Reflete menos e deixa ver através, sem alterar a cor do que reflete.",
          "**Bronze** e **Fumê**: os vidros coloridos de porta de armário. Semitransparentes: o reflexo aparece por cima e o interior do armário por baixo.",
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
            text: "Selecione o tipo de superfície, clique em **Gerar Reflexo na Cena** e depois na face. Ela acende em azul. Não precisa entrar no grupo. Tela de TV e piso importados costumam vir divididos em vários pedaços: o plugin junta os pedaços vizinhos sozinho e a superfície inteira acende.",
          },
          {
            title: "Superfície em partes separadas? Use Shift",
            text: "Espelho em painéis ou vidro em folhas: segure **Shift** e clique nas outras faces, depois **Enter**. Sai um reflexo contínuo, sem emenda entre as partes.",
          },
          {
            title: "Ajuste sem refazer",
            text: "Piso e TV têm um slider; vidro, bronze e fumê têm dois: **brilho** e **transparência**. Solte o slider e o reflexo que já está na cena muda na hora, sem gerar de novo. Cada slider tem um botão de voltar ao valor padrão.",
          },
        ],
      },
      {
        type: "p",
        text: "O plugin reflete a câmera da cena pelo plano da superfície, captura o ambiente que ela realmente refletiria e projeta na face, em segundos, **sem custo de créditos**, pois tudo acontece localmente no seu SketchUp.",
      },
      {
        type: "warn",
        text: "O reflexo fica **salvo na cena** e some ao trocar de cena. Gere um para cada cena. Se você mudar a vista da cena depois, refaça o reflexo antes de renderizar. O botão **Apagar todos os reflexos** limpa de uma vez tudo que a ferramenta criou no modelo.",
      },
      {
        type: "tip",
        text: "No vidro colorido, o interior do armário só aparece se o material da porta estiver transparente no SketchUp. E vale combinar: espelho no banheiro, fumê nas portas do closet, piso polido na sala. É o conjunto que faz o render parecer fotografia.",
      },
      { type: "cost", text: "Grátis: processado localmente, sem créditos" },
        { type: "p", text: "O reflexo já está na cena. Agora vamos à segunda ferramenta desta aula, a Luz Fake, que resolve iluminação de ambiente sem você modelar luminária nenhuma." },
{
        type: "p",
        text: "O SketchUp não mostra luz. Você desenha a sanca, o nicho, o espelho, e a cena continua chapada, sem nenhuma pista do que deve acender no render. A **Luz Fake** (na aba Cenas, logo abaixo do Reflexo de Espelho) resolve isso desenhando a luz: uma fita de LED que corre pela borda, ou um spot com o facho visível. Não é iluminação de verdade. É uma referência clara pra IA entender onde tem luz e de que cor ela é.",
      },
      {
        type: "video",
        src: "/treinamento/ui/luz-fake.mp4",
        caption: "Fita de LED atrás do espelho, na marcenaria e spots no teto, tudo local, sem custo de créditos.",
      },
      { type: "h2", text: "Fita de LED ou Spot" },
      {
        type: "ul",
        items: [
          "**Fita de LED**: corre ao longo de uma linha (sanca, nicho, rodapé) ou contorna a borda inteira de um espelho. Em **Tipo de objeto** você escolhe entre **Marcenaria** e **Espelho**.",
          "**Spot**: o facho cônico de uma luminária. Você clica na face da luminária e o facho sai dela.",
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
            text: "Para fita na marcenaria, clique na **linha** onde ela vai correr. Segure **Shift** pra somar várias linhas de uma vez. Para fita em espelho, clique na **face do espelho** e ela contorna a borda inteira. Para spot, clique na **face da luminária**. **ESC** sai da ferramenta.",
          },
          {
            title: "Refine sem refazer",
            text: "Com uma luz selecionada no SketchUp, os sliders passam a editar aquela luz. Solte o slider e ela se reconstrói na hora. Dá pra mover a luz na mão que o ajuste seguinte respeita a nova posição.",
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
        text: "O uso que mais rende é a fita atrás do espelho. O desenho do brilho contornando a borda é o que faz a IA entregar aquele espelho retroiluminado de projeto. Combine com o **Reflexo de Espelho** na mesma cena: um dá o reflexo, o outro dá a luz.",
      },
      { type: "cost", text: "Grátis: processado localmente, sem créditos" },
    ],
  },
  "primeiros-passos": {
    title: "Primeiros passos: instale o plugin e faça seu primeiro login",
    excerpt:
      "Como instalar o Vizai Render no SketchUp, entrar com sua conta Google, ativar os 8 créditos grátis e entender quanto custa cada ferramenta.",
    blocks: [
      {
        type: "p",
        text: "O Vizai Render é um plugin de renderização com IA que roda dentro do SketchUp. Você configura a cena, escolhe o estilo e recebe um render fotorrealista em segundos, sem exportar nada, sem programa externo e sem placa de vídeo potente. Este guia mostra como deixar tudo funcionando.",
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
        text: "O login é feito com sua conta Google, em um clique, sem criar senha nova. No seu **primeiro login pelo plugin** você recebe **8 créditos grátis** para testar as ferramentas. O saldo aparece no canto superior direito do painel, ao lado do seu perfil.",
      },
      {
        type: "tip",
        text: "Criou a conta pelo site? Os 8 créditos grátis são ativados quando você faz o primeiro login dentro do plugin. É lá que eles aparecem.",
      },
      { type: "h2", text: "Como funcionam os créditos, planos e custos de cada ferramenta" },
      {
        type: "p",
        text: "Tudo no Vizai Render funciona com **créditos**: cada geração com IA consome uma quantidade fixa, descontada do seu saldo. Ferramentas locais (como a janela Tools, os ajustes de foto do Editor e o Reflexo de Espelho) são **gratuitas**. Você só paga pelo que a IA gera.",
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
          "**Planos mensais**: Starter (250 créditos/mês), Pro (600 créditos/mês) e Business (1.600 créditos/mês). Os créditos renovam todo mês e você pode cancelar quando quiser.",
          "**Pacotes avulsos**: de 50 a 1.750 créditos em compra única. **Não expiram** e são consumidos depois dos créditos mensais.",
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






  "decorar-ambiente": {
    title: "Decorar Ambiente: mobília e decoração com IA em ambientes vazios",
    excerpt:
      "O virtual staging do Vizai: carregue a foto ou o render de um ambiente vazio, escolha o tipo de espaço, o estilo e o horário, e a IA mobilia e decora mantendo a arquitetura.",
    blocks: [
      { type: "p", text: "**Decorar Ambiente** mobília e decora um ambiente vazio a partir de uma foto ou de um render, em menos de um minuto, por 3 créditos. A arquitetura, os acabamentos, as janelas e o enquadramento ficam como estão: a IA só acrescenta móveis e decoração do tipo de ambiente e do estilo que você escolher. Serve para mostrar o potencial de imóveis vazios, apartamentos na planta, reformas e anúncios de venda ou aluguel." },
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
            text: "Arraste uma foto ou um render do ambiente vazio (JPG ou PNG, até 5 MB) ou capture a cena atual do SketchUp. O resultado sai na mesma proporção da imagem.",
          },
          {
            title: "Escolha o ambiente, o estilo e o horário",
            text: "Um dos 13 tipos de ambiente, um ou mais estilos de decoração, e dia ou noite.",
          },
          {
            title: "Gere",
            text: "3 créditos por imagem. O resultado chega com Antes e Depois para comparar com a base.",
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
      { type: "h2", text: "Tipos de ambiente" },
      { type: "p", text: "Sala, Quarto, Cozinha, Banheiro, Escritório, Varanda, Garagem, Hall, Piscina, Adega, Despensa, Sala de Jantar e Espaço Gourmet. Cada tipo tem um programa próprio, que define o que entra. Na Sala de Jantar, a IA monta uma mesa para 6 a 8 pessoas; no Escritório, mesa de trabalho, cadeira ergonômica e estante. Na Cozinha, ela arruma a bancada e coloca banquetas e pendentes sem mexer em armários, bancada e eletrodomésticos. No Banheiro, acrescenta toalhas, acessórios e plantas sem mexer nas louças." },
      { type: "h2", text: "Estilos de decoração" },
      { type: "p", text: "Moderno, Minimalista, Clássico, Industrial, Escandinavo, Rústico, Contemporâneo e Tropical. Marque mais de um para misturar, como Moderno com Escandinavo. Se nenhum estiver marcado, o Vizai usa o Moderno." },
      { type: "h2", text: "Dia ou noite" },
      {
        type: "ul",
        items: [
          "**Dia**: luz natural suave entrando pelas janelas, com sombras leves.",
          "**Noite**: céu azul-escuro do lado de fora e o ambiente iluminado por luminárias quentes, como pendentes, arandelas e abajures.",
        ],
      },
      { type: "h2", text: "Para o resultado sair bom" },
      {
        type: "ul",
        items: [
          "**Ambiente realmente vazio.** Com paredes, piso e estrutura bem visíveis, a IA posiciona os móveis com muito mais precisão.",
          "**Imagem bem enquadrada.** A IA mantém o enquadramento da imagem, então corrija a inclinação e o corte antes de carregar.",
          "**Tipo de ambiente igual ao uso real.** É o tipo que define os móveis que entram.",
        ],
      },
      { type: "h2", text: "Se o resultado não sair como esperado" },
      {
        type: "ul",
        items: [
          "**Móvel fora de escala ou em lugar estranho**: gere de novo, porque cada geração sai diferente, ou corrija só aquele trecho com a edição por máscara.",
          "**Algo da arquitetura mudou**: a IA tem ordem de manter paredes, piso, janelas e acabamentos. Se mudar, gere de novo.",
        ],
      },
      { type: "h2", text: "Perguntas rápidas" },
      {
        type: "ul",
        items: [
          "**Funciona com foto real ou só com render?** Com os dois. Foi pensado para foto de ambiente vazio e funciona também com render do SketchUp.",
          "**Posso usar em anúncio de imóvel?** Sim, a imagem é sua. É boa prática avisar no anúncio que a decoração é virtual.",
          "**Quanto tempo leva?** Menos de um minuto.",
          "**Quantos créditos?** 3 por imagem, como os outros modos da IA Criativa.",
        ],
      },
      { type: "cost", text: "3 créditos por geração" },
    ],
  },
  "planta-humanizada": {
    title: "Planta Humanizada: do desenho técnico à apresentação",
    excerpt:
      "Transforme a planta baixa do seu modelo (ou um desenho do computador) em uma planta humanizada renderizada, pronta para apresentar ao cliente.",
    blocks: [
      { type: "p", text: "A **Planta Humanizada** transforma um desenho técnico (a vista de topo do seu modelo ou uma planta que você já tem em imagem) em uma planta renderizada vista de cima, com pisos, móveis, vegetação e sombras suaves, no padrão das apresentações de lançamentos imobiliários. Fica pronta em menos de um minuto, por 3 créditos." },
      {
        type: "compare",
        aspect: "4 / 5",
        before: { src: "/tools/tool-08-before.webp", label: "Planta técnica" },
        after: { src: "/tools/tool-08.jpg", label: "Planta humanizada" },
      },
      { type: "p", text: "A IA lê a planta antes de desenhar: identifica os cômodos, as portas e janelas, os móveis e os materiais que já aparecem no desenho, e mantém tudo no mesmo lugar. As paredes cortadas saem num cinza-escuro sólido, como na planta técnica, e a luz é difusa, de estúdio, sem sol direto nem sombra dura." },
      { type: "h2", text: "Capturando a planta do SketchUp" },
      {
        type: "steps",
        items: [
          {
            title: "Vista de Topo",
            text: "No SketchUp, posicione a câmera em Câmera → Vistas Padrão → Superior.",
          },
          {
            title: "Projeção Paralela",
            text: "Ative Câmera → Projeção Paralela: isso elimina a perspectiva e deixa a planta “reta”, como um desenho técnico.",
          },
          {
            title: "Enquadre e capture",
            text: "Ajuste o zoom para a planta preencher a tela e clique em **Capturar Cena Atual** no plugin.",
          },
          {
            title: "Escreva observações e gere",
            text: "Descreva o estilo e os materiais (veja abaixo) e gere. São 3 créditos.",
          },
        ],
      },
      { type: "p", text: "Também dá para pular a captura e **carregar uma imagem do computador** (JPG ou PNG, até 5 MB). Funciona com plantas exportadas do AutoCAD, do Revit ou até foto de um desenho, desde que as paredes estejam legíveis." },
      { type: "h2", text: "Observações que fazem diferença" },
      { type: "p", text: "No campo de observações, descreva estilo, materiais e paleta: “piso de porcelanato claro, sofá de linho, marcenaria em madeira natural, plantas decorativas”. A IA acrescenta o que você pedir sem mexer nas paredes. Se o desenho já tem materiais (capturado do modelo com texturas, por exemplo), eles ficam no mesmo lugar, e as observações completam o resto. Sem observações, a planta sai num estilo contemporâneo e neutro." },
      { type: "h2", text: "Para a planta sair boa" },
      {
        type: "ul",
        items: [
          "**Projeção Paralela sempre.** Com perspectiva, as paredes saem tortas e a IA lê o desenho errado.",
          "**Planta preenchendo a tela.** Quanto maior a planta na imagem, mais detalhe a IA consegue desenhar.",
          "**Textos e cotas, você escolhe.** Desligue nomes de ambientes e cotas para uma planta limpa, ou mantenha se a apresentação pedir a planta anotada.",
          "**Desenho legível.** Em planta escaneada ou fotografada, paredes nítidas e com contraste dão um resultado muito melhor.",
        ],
      },
      { type: "h2", text: "Se o resultado não sair como esperado" },
      {
        type: "ul",
        items: [
          "**Móvel ou material diferente do pedido**: seja mais específico nas observações, citando o cômodo (“no quarto, cama com cabeceira de madeira”), e gere de novo.",
          "**Detalhe errado num ponto da planta**: corrija só aquele trecho com a edição por máscara, sem refazer tudo.",
          "**Paredes deformadas**: confira se a captura foi feita na Vista de Topo e em Projeção Paralela.",
        ],
      },
      { type: "h2", text: "Perguntas rápidas" },
      {
        type: "ul",
        items: [
          "**Funciona com planta do AutoCAD ou do Revit?** Sim. Exporte como imagem (JPG ou PNG, até 5 MB) e carregue no plugin.",
          "**Quanto tempo leva?** Menos de um minuto.",
          "**Posso usar a planta em material de venda?** Sim, a imagem é sua.",
        ],
      },
      { type: "cost", text: "3 créditos por geração" },
    ],
  },
  diagrama: {
    title: "Diagrama: vistas isométricas e axonométricas com 5 estilos",
    excerpt:
      "Gere diagramas conceituais do seu projeto (do isométrico técnico em P&B à maquete física em madeira balsa) a partir de uma captura da viewport.",
    blocks: [
      {
        type: "p",
        text: "A ferramenta **Diagrama** transforma uma vista isométrica do seu modelo em pranchas conceituais com linguagem de escritório de arquitetura, ótimas para concursos, pranchas de apresentação e redes sociais.",
      },
      {
        type: "img",
        src: "/tools/tool-09.webp",
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
        text: "Primeiro escolha o contexto: **Exterior** (com entorno) ou **Interiores** (ambientes isolados). Depois o estilo:",
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/diagrama-tecnico.webp",
            alt: "Diagrama isométrico técnico",
            caption: "Isométrico Técnico: linhas P&B com entorno urbano.",
          },
          {
            src: "/treinamento/ui/diagrama-destaque.webp",
            alt: "Diagrama com destaque",
            caption: "Com Destaque: projeto em cor, entorno em cinza.",
          },
          {
            src: "/treinamento/ui/diagrama-colorido.webp",
            alt: "Diagrama colorido com contexto",
            caption: "Colorido: ilustração aquarelada com entorno.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/diagrama-maquete.webp",
            alt: "Diagrama estilo maquete física",
            caption: "Maquete Física: estilo madeira balsa.",
          },
          {
            src: "/treinamento/ui/diagrama-int-axo.webp",
            alt: "Diagrama axonométrico de interiores",
            caption: "Axonométrico: corte isométrico do ambiente interno.",
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
      "Crie moodboards profissionais a partir de uma imagem de referência: 7 composições de cena e 5 proporções, do flat lay ao painel de apresentação.",
    blocks: [
      {
        type: "p",
        text: "O **Moodboard** gera painéis de referência visual (amostras de materiais, paleta e objetos) a partir de uma imagem base do seu projeto ou de referências. É a ferramenta para o início da conversa com o cliente: apresenta o conceito antes mesmo do primeiro render.",
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
        text: "São **7 estilos de composição**, a “cena” onde as amostras são fotografadas:",
      },
      {
        type: "ul",
        items: [
          "**Bancada Studio**: superfície premium com fundo em gradiente suave.",
          "**Mesa de Projeto**: sobre mesa de trabalho, fundo semi-desfocado.",
          "**Vista do Topo**: flat lay direto de cima, sem perspectiva.",
          "**Painel de Apresentação**: amostras fixadas em board vertical.",
          "**Chão Iluminado**: flat lay em piso de madeira com luz lateral.",
          "**Linha de Materiais**: amostras alinhadas em fileira horizontal.",
          "**Tapete Decorado**: composição 3/4 sobre tapete com objetos.",
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




};
