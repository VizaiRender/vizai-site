import type { Lang } from "@/app/components/LanguageProvider";

/**
 * As 8 aulas em vídeo do Treinamento.
 *
 * Os vídeos moram no R2 (bucket vizai-videos) e são servidos por
 * cdn.vizairender.com, não por `public/`: mesmo comprimidos eles somam 534 MB,
 * muito acima do teto de 25 MB por arquivo do deploy no Workers. O R2 não cobra
 * saída de dados, e o domínio próprio põe a CDN na frente.
 *
 * As legendas (.vtt) são leves e ficam no próprio site, em public/.
 */
export type Aula = {
  id: number;
  slug: string;
  /** URL do vídeo no CDN. Null enquanto não subiu. */
  src: string | null;
  /** Imagem de capa exibida antes do play. */
  poster: string | null;
  /** Duração real do arquivo, para o usuário saber no que está entrando. */
  duration: string;
  /** Slug da página com o texto completo da aula, quando ela já existe. */
  pagina?: string;
};

export const AULAS: Aula[] = [
  { id: 1, slug: "primeiro-render",    src: "https://cdn.vizairender.com/treinamento/primeiro-render.mp4", poster: "/treinamento/capas/primeiro-render.jpg", duration: "12:21", pagina: "primeiro-render" },
  { id: 2, slug: "reflexo-e-luz-fake", src: "https://cdn.vizairender.com/treinamento/reflexo-e-luz-fake.mp4", poster: "/treinamento/capas/reflexo-e-luz-fake.jpg", duration: "4:28", pagina: "reflexo-espelho" },
  { id: 3, slug: "otimizar-arquivo",   src: "https://cdn.vizairender.com/treinamento/otimizar-arquivo.mp4", poster: "/treinamento/capas/otimizar-arquivo.jpg", duration: "1:40" },
  { id: 4, slug: "texturas-seamless",  src: "https://cdn.vizairender.com/treinamento/texturas-seamless.mp4", poster: "/treinamento/capas/texturas-seamless.jpg", duration: "1:49" },
  { id: 5, slug: "gerando-videos",     src: "https://cdn.vizairender.com/treinamento/gerando-videos.mp4", poster: "/treinamento/capas/gerando-videos.jpg", duration: "2:25" },
  { id: 6, slug: "imagem-360",         src: "https://cdn.vizairender.com/treinamento/imagem-360.mp4", poster: "/treinamento/capas/imagem-360.jpg", duration: "1:25" },
  { id: 7, slug: "gerando-blocos",     src: "https://cdn.vizairender.com/treinamento/gerando-blocos.mp4", poster: "/treinamento/capas/gerando-blocos.jpg", duration: "2:09" },
  { id: 8, slug: "historico",          src: "https://cdn.vizairender.com/treinamento/historico.mp4", poster: "/treinamento/capas/historico.jpg", duration: "0:39" },
];

/** Caminho das legendas de uma aula, no idioma pedido. */
export function captionSrc(slug: string, lang: Lang): string {
  return `/treinamento/legendas/${slug}.${lang}.vtt`;
}

type AulaText = { title: string; excerpt: string };

/** Títulos definidos pelo Ramon, iguais aos nomes dos arquivos de vídeo. */
const TEXTS: Record<Lang, Record<string, AulaText>> = {
  pt: {
    "primeiro-render":    { title: "Fazendo o seu primeiro render", excerpt: "A interface inteira, o que cada aba faz e o passo a passo do primeiro render, do enquadramento às variações no editor." },
    "reflexo-e-luz-fake": { title: "Como gerar reflexo de espelhos e Luz Fake", excerpt: "Reflexos em espelhos e vidros amarrados à cena, e fitas de LED e spots inseridos direto no seu projeto." },
    "otimizar-arquivo":   { title: "Otimizando o seu arquivo", excerpt: "Remova texturas duplicadas, reduza as pesadas e descubra quais blocos estão inflando o seu .skp." },
    "texturas-seamless":  { title: "Criando texturas seamless", excerpt: "Pegue a imagem do fornecedor e transforme em textura contínua, ajustando tamanho, rejunte e outros detalhes." },
    "gerando-videos":     { title: "Gerando vídeos", excerpt: "Anime um render usando frame inicial e final, com movimento de câmera, áudio e transição entre imagens." },
    "imagem-360":         { title: "Imagem 360", excerpt: "Gere o panorama em poucos segundos e mande o link direto no WhatsApp, para o cliente explorar pelo celular." },
    "gerando-blocos":     { title: "Gerando Blocos", excerpt: "Transforme a foto de um móvel em bloco pronto para o SketchUp, sem procurar no 3D Warehouse." },
    "historico":          { title: "Aba Histórico", excerpt: "As últimas 10 imagens geradas, quanto de crédito você já usou e como baixar o que esqueceu." },
  },
  en: {
    "primeiro-render":    { title: "Making your first render", excerpt: "The whole interface, what each tab does, and the first render step by step, from framing to variations in the editor." },
    "reflexo-e-luz-fake": { title: "Mirror reflections and Fake Light", excerpt: "Reflections on mirrors and glass tied to the scene, plus LED strips and spots placed right in your project." },
    "otimizar-arquivo":   { title: "Optimizing your file", excerpt: "Remove duplicated textures, shrink the heavy ones and find out which blocks are inflating your .skp." },
    "texturas-seamless":  { title: "Creating seamless textures", excerpt: "Take the supplier's image and turn it into a seamless texture, adjusting size, grout and other details." },
    "gerando-videos":     { title: "Generating videos", excerpt: "Animate a render using an initial and a final frame, with camera movement, audio and transition between images." },
    "imagem-360":         { title: "360 image", excerpt: "Generate the panorama in seconds and send the link straight to WhatsApp, for the client to explore on their phone." },
    "gerando-blocos":     { title: "Generating blocks", excerpt: "Turn a photo of a piece of furniture into a block ready for SketchUp, without hunting the 3D Warehouse." },
    "historico":          { title: "History tab", excerpt: "The last 10 images you generated, how many credits you have used and how to download what you forgot." },
  },
  es: {
    "primeiro-render":    { title: "Haciendo tu primer render", excerpt: "Toda la interfaz, qué hace cada pestaña y el paso a paso del primer render, del encuadre a las variaciones en el editor." },
    "reflexo-e-luz-fake": { title: "Cómo generar reflejos de espejos y Luz Fake", excerpt: "Reflejos en espejos y vidrios atados a la escena, y tiras de LED y spots puestos directo en tu proyecto." },
    "otimizar-arquivo":   { title: "Optimizando tu archivo", excerpt: "Elimina texturas duplicadas, reduce las pesadas y descubre qué bloques están inflando tu .skp." },
    "texturas-seamless":  { title: "Creando texturas seamless", excerpt: "Toma la imagen del proveedor y conviértela en textura continua, ajustando tamaño, junta y otros detalles." },
    "gerando-videos":     { title: "Generando videos", excerpt: "Anima un render usando frame inicial y final, con movimiento de cámara, audio y transición entre imágenes." },
    "imagem-360":         { title: "Imagen 360", excerpt: "Genera el panorama en segundos y manda el enlace por WhatsApp, para que el cliente lo explore desde el celular." },
    "gerando-blocos":     { title: "Generando bloques", excerpt: "Convierte la foto de un mueble en un bloque listo para SketchUp, sin buscar en el 3D Warehouse." },
    "historico":          { title: "Pestaña Historial", excerpt: "Las últimas 10 imágenes generadas, cuántos créditos gastaste y cómo descargar lo que olvidaste." },
  },
};

export function getAulaText(slug: string, lang: Lang): AulaText {
  return TEXTS[lang]?.[slug] ?? TEXTS.pt[slug];
}

/** Strings da seção de aulas, fora do TreinoUiStrings para não mexer no tipo dos guias. */
export const AULAS_UI: Record<Lang, { readFull: string; title: string; subtitle: string; soon: string; lesson: string; of: string; prev: string; next: string }> = {
  pt: { readFull: "Ler a aula completa", title: "Treinamento Vizai Render", subtitle: "Assista às aulas na ordem, ou vá direto na que você precisa.", soon: "Vídeo em breve", lesson: "Aula", of: "de", prev: "Aula anterior", next: "Próxima aula" },
  en: { readFull: "Read the full lesson", title: "Vizai Render Training", subtitle: "Watch the lessons in order, or jump straight to the one you need.", soon: "Video coming soon", lesson: "Lesson", of: "of", prev: "Previous lesson", next: "Next lesson" },
  es: { readFull: "Leer la clase completa", title: "Entrenamiento Vizai Render", subtitle: "Mira las clases en orden, o ve directo a la que necesitas.", soon: "Video muy pronto", lesson: "Clase", of: "de", prev: "Clase anterior", next: "Clase siguiente" },
};
