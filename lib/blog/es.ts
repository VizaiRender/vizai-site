// Artículos del blog en español. Mismas reglas que pt.ts: el término de búsqueda
// en el título, respuesta directa en la primera frase de cada sección, números
// concretos y párrafos que se entienden solos cuando se citan fuera de la página.
// Los créditos salen de lib/prices.ts; los datos de otras herramientas son los
// de lib/faq.ts.

import type { BlogUi, PostContent } from "./types";
import { OPERATION_CREDITS as C, REFERRAL, VIDEO_CREDITS, WELCOME_CREDITS } from "@/lib/prices";

const RENDERS_GRATIS = Math.floor(WELCOME_CREDITS / C.render);
const VIDEO_MIN = VIDEO_CREDITS[0];
const VIDEO_MAX = VIDEO_CREDITS[VIDEO_CREDITS.length - 1];
const IG = (perfil: string) => `[@${perfil}](https://www.instagram.com/${perfil}/)`;

export const esUi: BlogUi = {
  badge: "Blog de Vizai",
  title: "Render con IA para quienes usan SketchUp",
  subtitle:
    "Comparaciones entre herramientas de render, proyectos reales hechos con Vizai y todo lo que cambia en el plugin en cada versión.",
  readMore: "Leer artículo",
  minRead: "min de lectura",
  backToIndex: "Todos los artículos",
  updatedOn: "Actualizado el",
  faqTitle: "Preguntas frecuentes",
  ctaTitle: "Pruébalo en tu propio proyecto",
  ctaSubtitle: `Instala el plugin y recibe ${WELCOME_CREDITS} créditos gratis en el primer inicio de sesión, suficiente para ${RENDERS_GRATIS} renders.`,
  ctaDownload: "Descargar plugin",
  ctaSignup: "Crear cuenta gratis",
  categories: {
    comparacao: "Comparación",
    casos: "Renders reales",
    novidades: "Novedades",
  },
};

export const esPosts: Record<string, PostContent> = {
  "vray-enscape-lumion-ou-render-com-ia": {
    title: "V-Ray, Enscape, Lumion o render con IA: ¿cuál usar en SketchUp?",
    excerpt:
      "El renderizador tradicional calcula la luz del modelo 3D; el render con IA parte de la vista. Compara configuración, computadora, Mac, tiempo y cuándo usar cada uno.",
    blocks: [
      {
        type: "p",
        text: "**Respuesta corta:** V-Ray, Enscape, Lumion y D5 calculan la luz a partir del modelo 3D y dan control técnico total, pero piden configuración y una buena tarjeta gráfica. El render con IA, como el de Vizai, parte de la vista de SketchUp, está listo en 20 a 60 segundos y funciona en cualquier computadora. Ninguno reemplaza al otro en todo: cada uno gana en una etapa del proyecto.",
      },
      { type: "h2", text: "¿Qué diferencia hay entre un renderizador tradicional y el render con IA?" },
      {
        type: "p",
        text: "El **renderizador tradicional** (V-Ray, Enscape, Lumion, D5) simula la física de la luz sobre el modelo 3D. Cada material tiene sus propiedades, cada luminaria emite luz de verdad, y el resultado es técnicamente preciso. El costo es la configuración, material por material y luz por luz, y un tiempo de render que depende de la tarjeta gráfica.",
      },
      {
        type: "p",
        text: "El **render con IA** parte de la imagen de la vista, tal como la muestra la cámara de SketchUp. En Vizai eliges el tipo de proyecto, la luz y el clima, y la IA completa materiales, iluminación, cielo y entorno. No hay materiales que configurar, y la imagen se genera en la nube: la computadora no influye en el resultado.",
      },
      {
        type: "compare",
        before: { src: "/compare2-before.jpg", label: "Vista de SketchUp" },
        after: { src: "/compare2-after.jpg", label: "Render de Vizai" },
        aspect: "1200 / 1491",
      },
      { type: "h2", text: "Comparación lado a lado" },
      {
        type: "table",
        align: "left",
        head: ["", "V-Ray, Enscape, Lumion y D5", "Vizai (render con IA)"],
        rows: [
          ["Cómo genera la imagen", "Calcula la luz a partir del modelo 3D", "IA a partir de la vista de SketchUp"],
          ["Qué configuras", "Materiales, luces, entorno y cámara", "Tipo de proyecto, luz y clima"],
          ["Tarjeta gráfica", "Enscape, Lumion y D5 dependen de ella; V-Ray puede usar CPU o GPU", "No la usa: la imagen se genera en la nube"],
          ["Mac", "Enscape solo en Mac con chip de Apple; Lumion sin soporte oficial; D5 Lite solo en Windows", "Funciona en Mac y Windows"],
          ["Tiempo por imagen", "Depende de la escena y la computadora", "De 20 a 60 segundos"],
          ["Control técnico", "Total, con valores reales de luz y material", "La IA interpreta la escena en cada generación"],
          ["Internet", "No hace falta para renderizar", "Hace falta, la generación es en la nube"],
        ],
      },
      { type: "h2", text: "¿Cuándo conviene un renderizador tradicional?" },
      {
        type: "p",
        text: "El renderizador tradicional conviene cuando el proyecto exige una precisión técnica que la IA no garantiza. Los casos más comunes:",
      },
      {
        type: "ul",
        items: [
          "**Estudios de iluminación** con valores reales de luminarias y de asoleamiento.",
          "**Materiales de fabricante** que deben salir idénticos al catálogo.",
          "**Animaciones largas** de recorrido por el proyecto.",
          "**Series de vistas idénticas** del mismo espacio, en las que ningún detalle puede cambiar de una imagen a otra.",
        ],
      },
      {
        type: "p",
        text: "En esos casos, las horas de configuración valen la pena. La IA interpreta la escena en cada generación, así que los detalles pequeños pueden variar entre una imagen y otra, incluso con la misma vista.",
      },
      { type: "h2", text: "¿Cuándo funciona mejor el render con IA?" },
      {
        type: "p",
        text: "El render con IA funciona mejor cuando importan la velocidad y la cantidad de imágenes atractivas, no el cálculo exacto de la luz. Los casos más comunes:",
      },
      {
        type: "ul",
        items: [
          "**Estudio y aprobación con el cliente:** probar día y noche, sol y lluvia, estilos de decoración, sin rehacer materiales.",
          "**Plazos cortos:** varias vistas en el mismo día, sin cola de render y sin bloquear la computadora.",
          "**Computadora sin tarjeta gráfica dedicada**, o Mac.",
          "**Espacios vacíos, plantas y moodboards:** en Vizai, amueblar un espacio vacío, humanizar una planta y armar un moodboard están en el mismo panel, en la pestaña IA Creativa.",
        ],
      },
      {
        type: "p",
        text: "Cuando un detalle sale distinto del proyecto, la edición con máscara de Vizai corrige solo esa zona, sin generar toda la imagen de nuevo. Mira el paso a paso en la clase [Primer render](/es/treinamento/primeiro-render).",
      },
      { type: "h2", text: "¿Puedo usar los dos en el mismo proyecto?" },
      {
        type: "p",
        text: "Sí, y es una división que funciona bien: render con IA en las fases de estudio y presentación, mientras el cliente todavía decide, y renderizador tradicional en la entrega final, cuando cada material ya está definido. Los dos parten del mismo archivo de SketchUp, así que no hay que volver a modelar.",
      },
      {
        type: "tip",
        text: `Vizai da ${WELCOME_CREDITS} créditos gratis en el primer inicio de sesión, suficiente para ${RENDERS_GRATIS} renders. [Descarga el plugin](/es/download) y compara en tu propio proyecto.`,
      },
    ],
    faq: [
      {
        q: "¿El render con IA reemplaza a V-Ray?",
        a: "No en todos los casos. Para estudio, presentación y aprobación con el cliente, el render con IA entrega la imagen en menos de un minuto, sin configurar materiales. Para estudios de iluminación con valores reales, materiales idénticos al catálogo o series de vistas idénticas, V-Ray y los demás renderizadores tradicionales siguen siendo la opción correcta.",
      },
      {
        q: "¿Se puede renderizar SketchUp sin tarjeta gráfica?",
        a: "Sí, con render en la nube. Vizai genera la imagen en sus servidores, así que funciona en una portátil común, en Windows o Mac, siempre que ejecute SketchUp 2023 o posterior y esté conectada a internet.",
      },
      {
        q: "¿Qué renderizador para SketchUp funciona en Mac?",
        a: "Vizai funciona en Mac sin tarjeta gráfica dedicada, y V-Ray tiene versión para Mac. Enscape funciona solo en Mac con chip de Apple, Lumion no tiene soporte oficial en Mac y D5 Lite funciona solo en Windows.",
      },
      {
        q: "¿Cuánto cuesta un render en Vizai?",
        a: `Cada render cuesta ${C.render} créditos (${C.creative} en los modos de IA Creativa). Los créditos vienen en planes mensuales o anuales, o en paquetes que no caducan, y el primer inicio de sesión en el plugin da ${WELCOME_CREDITS} créditos gratis.`,
      },
    ],
  },

  "render-com-ia-no-sketchup": {
    title: "Render con IA en SketchUp: ¿ChatGPT, AI Render, Veras o Vizai?",
    excerpt:
      "Cuatro formas de hacer render con IA desde SketchUp: qué exige cada una, dónde funciona, cómo cobra y en qué caso conviene cada una.",
    blocks: [
      {
        type: "p",
        text: "**Respuesta corta:** hay cuatro formas de hacer un render con IA de un proyecto de SketchUp: una captura en ChatGPT o Gemini, el SketchUp AI Render de Trimble, Veras de Chaos o un plugin hecho para arquitectura, como Vizai. La captura en el chat sirve para una idea rápida; si renderizas todas las semanas, conviene una herramienta que funcione dentro de SketchUp y mantenga la geometría del proyecto.",
      },
      { type: "h2", text: "¿Se puede usar ChatGPT o Gemini para renderizar SketchUp?" },
      {
        type: "p",
        text: "Sí, exportando la vista, subiéndola al chat y escribiendo el pedido. Es el camino más conocido y sirve para una imagen de referencia. El límite es la fidelidad: ChatGPT y Gemini son herramientas generales, y suelen cambiar la geometría, mover ventanas e inventar elementos que no están en el proyecto.",
      },
      {
        type: "p",
        text: "El pedido también corre por tu cuenta. Un texto que funciona en una fachada no funciona en un interior, y acertar la luz de noche o el cielo nublado se vuelve prueba y error. Cada intento repite el ciclo de exportar, pedir, descargar y volver a SketchUp.",
      },
      { type: "h2", text: "¿Qué es SketchUp AI Render?" },
      {
        type: "p",
        text: "SketchUp AI Render es la herramienta de IA de la propia Trimble, antes llamada SketchUp Diffusion. Viene con las suscripciones SketchUp Go, Pro y Studio, con una cuota mensual de créditos, y la extensión de escritorio funciona desde SketchUp 2024. Conviene si ya pagas la suscripción de Trimble y usas SketchUp 2024 o posterior.",
      },
      { type: "h2", text: "¿Qué es Veras?" },
      {
        type: "p",
        text: "Veras, de Chaos (la misma empresa de V-Ray y Enscape), es una herramienta de render con IA que funciona dentro de varios programas: Revit, SketchUp, Rhino, Archicad, entre otros. Se cobra por suscripción en créditos, con 14 días de prueba. Conviene si alternas entre esos programas en el día a día.",
      },
      { type: "h2", text: "¿Cómo funciona Vizai?" },
      {
        type: "p",
        text: "Vizai es un plugin de render con IA hecho para arquitectura, que funciona dentro de SketchUp 2023 o posterior, en Windows y Mac. Captura la vista activa en el formato que elijas y usa instrucciones listas y probadas para cada tipo de proyecto (fachada, interiores, comercial, edificio y paisajismo), con reglas para mantener el encuadre y la geometría de la vista. La luz y el clima se eligen con botones: no hace falta escribir pedidos.",
      },
      {
        type: "compare",
        before: { src: "/compare3-before.jpg", label: "Vista de SketchUp" },
        after: { src: "/compare3-after.jpg", label: "Render de Vizai" },
        aspect: "1 / 1",
      },
      {
        type: "p",
        text: `Además del render, el mismo panel genera videos de ${VIDEO_MIN.seconds} a ${VIDEO_MAX.seconds} segundos, panoramas 360°, bloques 3D a partir de una foto, ampliaciones en 4K y herramientas que no gastan créditos, como [Reflejo de Espejo](/es/treinamento/reflexo-espelho) y Luz Fake. Un render cuesta ${C.render} créditos, y los créditos vienen en planes o en paquetes que no caducan.`,
      },
      { type: "h2", text: "Comparación lado a lado" },
      {
        type: "table",
        align: "left",
        head: ["", "Dónde funciona", "Cómo cobra"],
        rows: [
          ["Captura en ChatGPT o Gemini", "En el navegador, fuera de SketchUp", "Plan del chat, con versiones gratis limitadas"],
          ["SketchUp AI Render", "SketchUp 2024 o posterior", "Cuota mensual de las suscripciones Go, Pro y Studio"],
          ["Veras", "Revit, SketchUp, Rhino, Archicad y otros", "Suscripción en créditos"],
          ["Vizai", "SketchUp 2023 o posterior, Windows y Mac", "Planes o paquetes de créditos que no caducan"],
        ],
      },
      { type: "h2", text: "¿Cuál elegir?" },
      {
        type: "ul",
        items: [
          "**Una imagen de referencia de vez en cuando:** una captura en ChatGPT o Gemini resuelve.",
          "**Ya pagas SketchUp y usas la versión 2024 o posterior:** vale la pena probar el AI Render que viene incluido.",
          "**Trabajas en Revit, Rhino o Archicad además de SketchUp:** Veras los cubre todos.",
          "**Renderizas todas las semanas en SketchUp, incluso en la versión 2023 o en Mac:** un plugin dedicado como Vizai ahorra el ciclo de exportar y pedir, y mantiene la geometría del proyecto.",
        ],
      },
      {
        type: "tip",
        text: `Para comparar en tu proyecto, Vizai da ${WELCOME_CREDITS} créditos gratis en el primer inicio de sesión. [Descarga el plugin](/es/download) y haz el mismo render en las herramientas que ya usas.`,
      },
    ],
    faq: [
      {
        q: "¿Puedo usar ChatGPT para renderizar un proyecto de SketchUp?",
        a: "Puedes, exportando la vista y escribiendo el pedido. El problema es la fidelidad: herramientas generales como ChatGPT y Gemini suelen cambiar la geometría, mover ventanas e inventar elementos, y cada intento repite el ciclo de exportar, pedir y descargar.",
      },
      {
        q: "¿Qué diferencia hay entre SketchUp AI Render y Vizai?",
        a: "AI Render es de Trimble, viene con las suscripciones SketchUp Go, Pro y Studio con una cuota mensual de créditos y funciona desde SketchUp 2024. Vizai funciona desde SketchUp 2023, con créditos en planes o en paquetes que no caducan, tiene modos propios para cada tipo de proyecto y también genera video, panorama 360° y bloque 3D.",
      },
      {
        q: "¿El render con IA es fiel al proyecto?",
        a: "En la estructura, sí, cuando la herramienta está hecha para eso. En Vizai, el encuadre, la geometría y la posición de los elementos vienen de la vista de SketchUp, y la IA completa materiales, luz, cielo y entorno. Los detalles pequeños pueden variar, y la edición con máscara corrige solo esa parte.",
      },
      {
        q: "¿Tengo que escribir prompts en Vizai?",
        a: "No. El tipo de proyecto, la luz y el clima se eligen con botones, y Vizai arma las instrucciones para la IA a partir de esas elecciones.",
      },
    ],
  },

  "renders-reais-feitos-no-vizai": {
    title: "Renders reales hechos con Vizai por arquitectos",
    excerpt:
      "Fachadas, salas, cocinas y dormitorios renderizados con Vizai por arquitectos y diseñadores, a partir de proyectos reales modelados en SketchUp.",
    blocks: [
      {
        type: "p",
        text: "Todas las imágenes de esta página se generaron con Vizai por personas que usan el plugin, a partir de proyectos reales modelados en SketchUp. Cada una lleva el perfil del autor en Instagram, donde puedes ver más de su trabajo.",
      },
      { type: "h2", text: "Fachadas" },
      {
        type: "p",
        text: "En la fachada, Vizai completa cielo, vegetación, vereda y vecindario a partir del tipo de proyecto y del entorno elegido en el panel. La volumetría, las aberturas y los revestimientos vienen del modelo.",
      },
      {
        type: "imgrow",
        aspect: "1 / 1",
        images: [
          {
            src: "/blog/renders-reais/fachada-pedra-escura-isx-maquetes.jpg",
            alt: "Casa contemporánea de dos plantas con revestimiento de piedra oscura, puerta pivotante de madera y garaje, renderizada con Vizai",
            caption: `Fachada de ${IG("isx.maquetes")}`,
          },
          {
            src: "/blog/renders-reais/fachada-tijolinho-matheus-oengenheiro.jpg",
            alt: "Casa de dos plantas con ladrillo claro, jardinera con plantas colgantes y escalera de acceso, renderizada con Vizai",
            caption: `Fachada de ${IG("matheus.oengenheiro")}`,
          },
        ],
      },
      { type: "h2", text: "Salas, cocinas y áreas sociales" },
      {
        type: "p",
        text: "En interiores, la luz es lo que más cambia el resultado. En Vizai, la luz y el clima se eligen en el panel, y la herramienta Luz Fake ayuda cuando la luminaria del modelo no alcanza.",
      },
      {
        type: "img",
        src: "/blog/renders-reais/cozinha-e-jantar-dafnefreitas-arq.jpg",
        alt: "Cocina integrada al comedor, con vitrina iluminada, mesa redonda de madera y sillas tapizadas, renderizada con Vizai",
        caption: `Cocina y comedor de ${IG("dafnefreitas.arq")}`,
      },
      {
        type: "imgrow",
        aspect: "4 / 5",
        images: [
          {
            src: "/blog/renders-reais/sala-estante-madeira-debernardi-arq.jpg",
            alt: "Sala integrada con estantería de madera de piso a techo, sofá claro y gran ventana, renderizada con Vizai",
            caption: `Sala de ${IG("debernardi_arq")}`,
          },
          {
            src: "/blog/renders-reais/bar-marmore-studiowm-arq.jpg",
            alt: "Aparador de mármol con bar, botellas y copas iluminadas frente a un panel de madera, renderizado con Vizai",
            caption: `Bar de ${IG("studiowm.arq")}`,
          },
        ],
      },
      { type: "h2", text: "Dormitorios" },
      {
        type: "img",
        src: "/blog/renders-reais/quarto-casal-arquitetamariajuliareis.jpg",
        alt: "Dormitorio principal con panel de listones de madera, vestidor abierto y tocador con espejo iluminado, renderizado con Vizai",
        caption: `Dormitorio principal de ${IG("arquitetamariajuliareis")}`,
      },
      {
        type: "img",
        src: "/blog/renders-reais/quarto-bebe-elianayrafreitas.jpg",
        alt: "Cuarto de bebé con cuna de madera y sillón de lactancia, con madre y bebé, renderizado con Vizai",
        caption: `Cuarto de bebé de ${IG("elianayrafreitas")}`,
      },
      {
        type: "imgrow",
        aspect: "1 / 1",
        images: [
          {
            src: "/blog/renders-reais/quarto-bebe-dafnefreitas-arq.jpg",
            alt: "Cuarto de bebé con papel tapiz de animales de la selva, cuna y cómoda de madera, renderizado con Vizai",
            caption: `Cuarto de bebé de ${IG("dafnefreitas.arq")}`,
          },
          {
            src: "/blog/renders-reais/quarto-casal-thedouglaspaz.jpg",
            alt: "Dormitorio principal con cabecera capitoné azul marino, cuadro abstracto y colgante escultural, renderizado con Vizai",
            caption: `Dormitorio principal de ${IG("thedouglaspaz")}`,
          },
        ],
      },
      { type: "h2", text: "¿Cómo se hacen estas imágenes?" },
      {
        type: "steps",
        items: [
          {
            title: "Modelar y encuadrar en SketchUp",
            text: "El encuadre de la vista es el encuadre del render. Vizai no lee el archivo .skp, solo la imagen de la vista activa.",
          },
          {
            title: "Elegir el tipo de proyecto, la luz y el clima",
            text: "Fachada, interiores, comercial, edificio o paisajismo. Las elecciones se hacen con botones, sin escribir pedidos.",
          },
          {
            title: "Generar y ajustar",
            text: `El render está listo en 20 a 60 segundos y cuesta ${C.render} créditos. Si un detalle sale distinto del proyecto, la edición con máscara corrige solo esa zona.`,
          },
        ],
      },
      {
        type: "tip",
        text: "¿Hiciste un render con Vizai y quieres verlo aquí? Publícalo en Instagram y etiqueta a [@vizairender](https://www.instagram.com/vizairender/).",
      },
    ],
    faq: [
      {
        q: "¿Puedo usar las imágenes de Vizai en trabajos pagados?",
        a: "Sí. Las imágenes generadas en tu cuenta son tuyas, y puedes usarlas en presentaciones, portafolio, propuestas y cualquier otro uso comercial.",
      },
      {
        q: "¿Vizai sirve para fachadas y para interiores?",
        a: "Sí. Vizai tiene modos propios para fachada, interiores, comercial, edificio y paisajismo, cada uno con instrucciones hechas para ese tipo de proyecto, además de los modos de IA Creativa para amueblar espacios vacíos, humanizar plantas, diagramas y moodboards.",
      },
    ],
  },

  "novidades-do-vizai": {
    title: "Novedades de Vizai: qué cambió en cada versión",
    excerpt:
      "El historial del plugin Vizai Render para SketchUp, de la versión más nueva a la del lanzamiento: qué se agregó y qué se corrigió en cada una.",
    blocks: [
      {
        type: "p",
        text: "Esta página reúne todo lo que cambió en Vizai desde el lanzamiento, en mayo de 2026, de la versión más nueva a la más antigua. La versión actual es la **1.0.38**, del 14 de octubre de 2026. Cuando sale una versión nueva, el panel de Vizai muestra un aviso arriba con el botón para descargarla.",
      },
      { type: "h2", text: "Qué hace Vizai hoy" },
      {
        type: "ul",
        items: [
          `**Render con IA** a partir de la vista de SketchUp, en 20 a 60 segundos, con modos para fachada, interiores, comercial, edificio y paisajismo (${C.render} créditos).`,
          `**IA Creativa:** amueblar espacios vacíos, planta humanizada, diagrama y moodboard (${C.creative} créditos).`,
          `**Edición con máscara, ampliación en 4K** (${C.upscale} créditos), **video** de ${VIDEO_MIN.seconds} a ${VIDEO_MAX.seconds} segundos en 1080p, **panorama 360°** (${C.panorama} créditos) y **bloque 3D** a partir de una foto (${C.block} créditos).`,
          "**Herramientas sin créditos:** Reflejo de Espejo, Luz Fake, Optimizar Archivo y Pisos Seamless.",
          "**Funciona** en SketchUp 2023 o posterior, en Windows y Mac, en español, inglés y portugués.",
        ],
      },
      { type: "h2", text: "Octubre de 2026" },
      {
        type: "ul",
        items: [
          `**1.0.38 (14/10): Recomienda y gana.** Cada cuenta tiene un código para enviar a los colegas. Quien recomienda gana ${REFERRAL.reward} créditos por cada amigo que compre, y el amigo gana ${REFERRAL.bonus} créditos extra.`,
          "**1.0.37 (13/10):** en Windows en portugués, los avisos de error de red vuelven a aparecer, en lugar de dejar el panel cargando.",
          "**1.0.36 (13/10):** aviso de versión nueva arriba del panel; el video puede tardar hasta 20 minutos sin que el plugin se rinda; la opción Sin sonido del video empieza a funcionar; el panorama 360 queda en el Historial aunque el enlace original caduque; y una conexión fallida avisa que no se descontó ningún crédito.",
          "**11/10:** cuando el modelo principal rechaza una imagen, Vizai lo intenta de nuevo con otro modelo antes de mostrar el aviso.",
          "**07/10:** render, edición y 4K pasan a Nano Banana 2.1, de Google, y el panorama 360 a GPT Image 2.5, que entrega en unos 20 segundos (antes, más de un minuto).",
          "**1.0.35 (02/10):** el bloque 3D espera hasta 14 minutos y, si el resultado no llega, el panel avisa que los créditos volvieron a la cuenta. Lo mismo vale para el video.",
        ],
      },
      { type: "h2", text: "Septiembre de 2026" },
      {
        type: "ul",
        items: [
          "**30/09:** los paquetes de créditos aceptan Pix (pago instantáneo de Brasil), con los créditos liberados al momento.",
          "**1.0.34 (16/09):** avisos más claros al cambiar de plan, cuando la tarjeta de la suscripción no permite la mejora al momento.",
          "**1.0.33 (12/09):** el formato 3:4 reemplaza al 7:5.",
          "**1.0.32 (05/09):** el Historial muestra el costo real en créditos de cada generación, y el panel deja de depender de archivos descargados de fuera.",
          "**1.0.31 (01/09):** el panel abre una ventana a la vez, y las guías de encuadre dejan de aparecer en la imagen enviada a la IA.",
        ],
      },
      { type: "h2", text: "Agosto de 2026" },
      {
        type: "ul",
        items: [
          "**1.0.30 (29/08):** el panel sigue el idioma de SketchUp y avisa cuando una generación tarda más de lo normal.",
          "**20/08:** botones de entorno en la fachada, para elegir qué aparece alrededor del proyecto.",
          "**19/08:** el plugin detecta cuando el firewall de Windows bloquea SketchUp y ofrece desbloquearlo.",
          "**15/08:** el plugin revisa la versión de SketchUp y avisa cuando es anterior a 2023, en lugar de abrir un panel que no funciona.",
          "**1.0.25 (13/08):** el Historial guarda los renders entre una sesión y otra, y Reflejo de Espejo gana 6 tipos de superficie y ajuste en vivo.",
          "**10/08:** la pestaña 360 se rehace: marcas el punto de vista en el propio modelo.",
          "**1.0.21 (06/08):** Reflejo de Espejo funciona en archivos pesados y acepta varias caras a la vez, con Shift.",
          "**1.0.20 (03/08):** Luz Fake, con tira LED y spot, en la pestaña Escenas.",
        ],
      },
      { type: "h2", text: "Julio de 2026" },
      {
        type: "ul",
        items: [
          "**1.0.19 (30/07):** aviso en el panel cuando la renovación del plan no se aprueba.",
          "**1.0.18 (28/07):** el instalador pasa a estar firmado digitalmente.",
          "**05/07:** cambio de plan al momento: la mejora vale en el acto, con los créditos del nuevo plan.",
        ],
      },
      { type: "h2", text: "Junio y mayo de 2026" },
      {
        type: "ul",
        items: [
          "**1.0.14 (18/06):** el saldo se actualiza solo cuando llegan los créditos de bienvenida.",
          "**1.0.13 (14/06):** Reflejo de Espejo por escena, con la cámara reflejada.",
          "**11/06:** corrección de la conexión en Windows (error de certificado) y saldo visible aunque falle el navegador interno de SketchUp.",
          "**1.0.9 (07/06):** pestaña Herramientas, con Optimizar Archivo y Pisos Seamless, sin gastar créditos.",
          "**1.0.5 (02/06):** primera versión de Reflejo de Espejo.",
          "**01/06:** aviso de actualización dentro del plugin.",
          "**31/05:** comparación de Antes y Después en pantalla completa.",
          "**Fines de mayo:** lanzamiento de Vizai, el plugin de render con IA para SketchUp.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuál es la versión más reciente de Vizai?",
        a: "La versión 1.0.38, del 14 de octubre de 2026, que trajo Recomienda y gana. Esta página se actualiza con cada versión nueva.",
      },
      {
        q: "¿Cómo actualizo Vizai?",
        a: "Cuando sale una versión nueva, el panel de Vizai muestra un aviso arriba con el botón para descargarla. Después instalas el archivo .rbz desde el Administrador de extensiones de SketchUp, igual que en la primera instalación.",
      },
    ],
  },
};
