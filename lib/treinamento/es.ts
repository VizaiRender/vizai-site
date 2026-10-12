import type { ArticleContent, TreinoUiStrings } from "./types";

export const esUi: TreinoUiStrings = {
  badge: "Capacitación oficial Vizai Render",
  title: "Entrenamiento Vizai Render",
  subtitle:
    "Guías completas de todas las herramientas del plugin. Desde tu primer render hasta presentaciones en video y 360°. Todo explicado paso a paso, con imágenes reales de la interfaz y de los resultados.",
  featuredLabel: "Empieza por aquí",
  readMore: "Leer guía",
  minRead: "min de lectura",
  backToIndex: "Todas las guías",
  prevArticle: "Anterior",
  nextArticle: "Siguiente",
  ctaTitle: "¿Listo para probarlo en la práctica?",
  ctaSubtitle:
    "Crea tu cuenta, instala el plugin y recibe 8 créditos gratis en tu primer inicio de sesión.",
  ctaDownload: "Descargar plugin",
  ctaSignup: "Crear cuenta gratis",
  categories: {
    aulas: "Clase en video",
    start: "Empieza aquí",
    render: "Render",
    creative: "IA Creativa",
    present: "Presentación",
    free: "Herramientas gratis",
  },
};

export const esArticles: Record<string, ArticleContent> = {
  "historico": {
    title: "Pestaña Historial: recupera lo que olvidaste guardar",
    excerpt:
      "Las últimas 10 imágenes y bloques que generaste quedan guardados en tu computadora, con el costo en créditos de cada uno. Aquí ves cómo descargarlos de nuevo y cuándo limpiar borra para siempre.",
    blocks: [
      { type: "p", text: "Cada generación hecha en el plugin entra en el Historial: renders, ediciones, closeups, panoramas 360 y bloques 3D. Es la red de seguridad para el error más común de todos, que es cerrar la ventana antes de guardar la imagen en la computadora." },
      { type: "h2", text: "Qué queda guardado" },
      { type: "p", text: "El Historial guarda los 10 elementos más recientes, de todos los proyectos, no solo del archivo abierto. Cada línea muestra la miniatura, el tipo de generación, la fecha, el proyecto de donde vino y cuántos créditos costó ese elemento." },
      { type: "p", text: "La lista es única a propósito: cambias de archivo de SketchUp y sigues viendo lo que generaste antes. En el pie aparece la suma de créditos de los elementos listados, una forma rápida de ver tu consumo reciente." },
      { type: "tip", text: "El Historial es persistente: sobrevive a cerrar y abrir SketchUp. Lo que no sobrevive es el límite, porque el elemento más antiguo sale cuando entra el número once." },
      { type: "h2", text: "Descargar de nuevo" },
      { type: "p", text: "Con el botón de descarga de cada línea, la imagen completa se guarda otra vez en tu computadora, en la resolución original. Para eso existe el Historial: no es una galería bonita, es la oportunidad de recuperar lo que pasó." },
      { type: "warn", text: "El bloque 3D tiene plazo. El archivo del modelo queda alojado temporalmente, así que descarga el bloque el mismo día que lo generas. La imagen del render no tiene ese límite." },
      { type: "h2", text: "Limpiar todo, y por qué pensarlo dos veces" },
      { type: "p", text: "El botón rojo borra la lista entera y también las imágenes guardadas en la carpeta del plugin en tu computadora. No se puede deshacer, y el plugin lo avisa antes de ejecutar." },
      { type: "p", text: "Úsalo solo cuando quieras liberar espacio de verdad. Si la intención es apenas ordenar, no hace falta: el Historial ya se limita a 10 elementos y 60 MB de imágenes, descartando el más antiguo por su cuenta." },
      { type: "cost", text: "El Historial no cuesta créditos. Ver, descargar de nuevo y limpiar son operaciones locales, hechas en tu computadora." },
    ],
  },
  "otimizar-arquivo": {
    title: "Optimizar Archivo (Tools): deja tu .skp ligero gratis",
    excerpt:
      "Purga inteligente, materiales duplicados, reducción de texturas e informe de impacto de los componentes. La limpieza completa del archivo, 100% local y gratuita.",
    blocks: [
      { type: "p", text: "¿Archivo que se traba, órbita que se atasca, un .skp de cientos de MB? **Optimizar Archivo**, en la ventana **Tools**, hace la limpieza completa del modelo: quita lo que no se usa, une materiales repetidos, reduce texturas exageradas y muestra qué componentes pesan más. Funciona en tu computadora y no gasta créditos." },
      {
        type: "img",
        src: "/treinamento/ui/tools-otimizar-{lang}.webp",
        alt: "Ventana Tools con la pestaña Optimizar Archivo",
        caption: "Optimizar Archivo: Limpieza, Texturas e Impacto.",
        ui: true,
      },
      { type: "h2", text: "Paso a paso" },
      {
        type: "steps",
        items: [
          {
            title: "Guarda el archivo antes",
            text: "El tamaño que aparece arriba es el del archivo guardado. Guarda antes de empezar para tener el punto de partida.",
          },
          {
            title: "Limpieza",
            text: "Marca lo que quieres limpiar y haz clic en **Ejecutar Limpieza**.",
          },
          {
            title: "Texturas",
            text: "Selecciona las imágenes exageradas, elige la resolución y haz clic en **Optimizar Imágenes**.",
          },
          {
            title: "Impacto",
            text: "Haz clic en **Analizar Impacto** y usa Ver para encontrar los componentes más pesados del modelo.",
          },
          {
            title: "Guarda de nuevo",
            text: "El plugin pregunta si quieres guardar. Al guardar, el tamaño nuevo aparece arriba, con cuánto ahorraste.",
          },
        ],
      },
      { type: "h2", text: "Limpieza" },
      {
        type: "ul",
        items: [
          "**Purga**: elimina componentes, materiales, etiquetas y estilos que no se usan en nada en el proyecto. Es la limpieza que más reduce archivos que pasaron por muchas versiones.",
          "**Materiales Duplicados**: une materiales que usan la misma imagen de textura, del mismo tamaño, con nombres distintos (Madera, Madera1, Madera-copy...), común en modelos armados con bloques de orígenes variados.",
        ],
      },
      { type: "h2", text: "Texturas" },
      { type: "p", text: "El **Gestor de Texturas** lista todas las imágenes del modelo con sus dimensiones. Texturas 4K en un tirador de cajón son peso muerto: selecciona las exageradas y redúcelas a 512, 720, 1024 o 2048 px en un clic. El aspecto en pantalla casi no cambia. El tamaño del archivo, sí." },
      { type: "h2", text: "Impacto" },
      { type: "p", text: "El informe de **Impacto de los Componentes** muestra qué bloques tienen más geometría (caras) y cuántas instancias hay de cada uno. Es como descubrir que un árbol descargado del 3D Warehouse tiene 800 mil caras y está repetido 12 veces. El botón Ver ubica el componente en el modelo para que decidas qué hacer." },
      { type: "tip", text: "Cada limpieza entra como una sola acción en SketchUp. Si no te gusta el resultado, Ctrl+Z (Cmd+Z en Mac) lo deshace todo de una vez." },
      { type: "h2", text: "Para que la limpieza rinda más" },
      {
        type: "ul",
        items: [
          "**Empieza por las texturas** en modelos con muchos bloques descargados: ahí suele estar el mayor peso.",
          "**720 px resuelve la mayoría.** Un objeto pequeño no necesita más; deja 1024 o 2048 px para pisos y paredes grandes.",
          "**Antes de renderizar proyectos grandes.** Un modelo liviano es una pantalla fluida y capturas más rápidas.",
          "**Copia de seguridad la primera vez.** Haz una copia antes de correr limpiezas pesadas en un archivo importante.",
        ],
      },
      { type: "h2", text: "Si algo sale mal" },
      {
        type: "ul",
        items: [
          "**Desapareció algo que querías**: Ctrl+Z (Cmd+Z en Mac) deshace la limpieza entera.",
          "**El tamaño no cambió**: el número de arriba es el del archivo guardado. Guarda para ver el tamaño nuevo.",
          "**Una textura quedó borrosa**: deshaz y reduce a una resolución mayor.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Gasta créditos?** No, todo se hace en tu computadora.",
          "**¿Se puede deshacer?** Sí, con Ctrl+Z (Cmd+Z en Mac).",
          "**¿Funciona en un archivo sin guardar?** Funciona, pero el tamaño solo aparece después de guardar el archivo.",
        ],
      },
      { type: "cost", text: "Gratis: procesado localmente, sin créditos" },
    ],
  },
  "pisos-seamless": {
    title: "Pisos Seamless (Tools): despiece de pisos profesional en segundos",
    excerpt:
      "Crea texturas de piso con despiece a partir de cualquier imagen: porcelanato, madera con variaciones, junta configurable y aplicación directa en las caras.",
    blocks: [
      { type: "p", text: "**Pisos Seamless**, en la ventana **Tools**, convierte la foto de una pieza (porcelanato, madera, baldosa) en un piso con despiece, con junta y en su tamaño real, aplicado directo en las caras del modelo. Funciona en tu computadora y no gasta créditos." },
      {
        type: "img",
        src: "/treinamento/ui/tools-pisos-{lang}.webp",
        alt: "Pestaña Pisos Seamless de la ventana Tools",
        caption: "Vista previa en vivo del despiece, con junta y dimensiones reales.",
        ui: true,
      },
      { type: "p", text: "El plugin arma una textura con un bloque de 6 × 6 piezas ya colocadas y con junta, en la escala real que indiques, y crea con ella un material en SketchUp. Con variaciones, intercala las imágenes dentro de ese bloque, y la repetición se nota mucho menos." },
      { type: "h2", text: "Armando el piso" },
      {
        type: "steps",
        items: [
          {
            title: "Textura Base",
            text: "Sube la imagen de una pieza: la foto del porcelanato, de la tabla de madera o de la baldosa. Usa una imagen recta, de frente, sin perspectiva y solo con la pieza.",
          },
          {
            title: "Variaciones (opcional)",
            text: "Agrega hasta 3 imágenes de la misma línea. El plugin intercala las piezas y rompe el efecto de repetición, clave en madera y en porcelanatos con veta.",
          },
          {
            title: "Despiece y rotación",
            text: "Cuadrícula Recta (alineada), Trabado 50% o Trabado 1/3. Usa Girar para dejar las tablas en el sentido correcto.",
          },
          {
            title: "Dimensiones reales",
            text: "Ancho y alto de la pieza en centímetros (empieza en 90 × 90; para tablas, algo como 20 × 120). La textura entra en SketchUp ya en la escala correcta.",
          },
          {
            title: "Junta",
            text: "Espesor en milímetros (empieza en 2 mm) y color (empieza en gris oscuro). Una junta del color de la pieza deja el piso más continuo.",
          },
        ],
      },
      { type: "h2", text: "Aplicando al modelo" },
      { type: "p", text: "La vista previa muestra el despiece en tiempo real. Para aplicarlo, **selecciona las caras del piso** en SketchUp antes de hacer clic en Aplicar Textura. El material se crea y se mapea directo en ellas. Sin selección, el plugin activa el bote de pintura para que hagas clic donde quieras." },
      { type: "h2", text: "Para que el piso quede bien" },
      {
        type: "ul",
        items: [
          "**Foto de la pieza, no del ambiente.** Recorta solo la pieza, sin bordes, reflejos fuertes ni perspectiva.",
          "**Variaciones en madera.** Una sola tabla repetida delata el piso; 3 variaciones lo resuelven.",
          "**La medida correcta de la pieza.** Es la que define la escala. Revísala en la ficha del proveedor.",
          "**Arma el piso antes del render.** La IA respeta el despiece y la junta que ve en la escena, y el realismo del render sube.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Repetición visible**: agrega variaciones de la misma línea, o usa Trabado para romper la alineación.",
          "**Piezas demasiado grandes o pequeñas**: revisa el ancho y el alto en centímetros y aplica de nuevo.",
          "**Tablas en el sentido equivocado**: usa Girar y aplica de nuevo en las caras.",
          "**Textura en la cara equivocada**: selecciona las caras del piso antes de hacer clic en Aplicar Textura.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Gasta créditos?** No. Se procesa en tu computadora.",
          "**¿Puedo usarlo para revestimiento de pared?** Sí. La herramienta aplica en las caras que selecciones, sean de piso o de pared.",
          "**¿Funciona con una foto de catálogo?** Sí, siempre que la pieza esté de frente y sin perspectiva.",
        ],
      },
      { type: "cost", text: "Gratis: procesado localmente, sin créditos" },
    ],
  },
  "video-com-ia": {
    title: "Video con IA: anima tus renders con cámara cinematográfica",
    excerpt:
      "Convierte un render en un video de 4 a 15 segundos en 1080p, con movimiento de cámara y sonido ambiente generado por IA, directo desde el plugin.",
    blocks: [
      { type: "p", text: "Con la pestaña **Video** de Vizai, un render terminado se convierte en un clip de **4 a 15 segundos en 1080p**, con movimiento de cámara y, si quieres, sonido ambiente generado por IA. Es la forma más rápida de llevar el proyecto a Reels, Stories o a la presentación al cliente, sin armar una animación en SketchUp ni renderizar cuadro por cuadro." },
      {
        type: "video",
        src: "/tools/tool-03.mp4",
        caption: "Video generado desde un render del plugin.",
      },
      { type: "p", text: "Quien anima la imagen es **Kling 3.0 Pro**, un modelo de video con IA. Parte de tu render y crea el movimiento a partir de él: lo que aparece en el video es el proyecto de la imagen, no el modelo 3D moviéndose en tiempo real. Por eso el resultado depende tanto del render de partida." },
      { type: "h2", text: "Del render al video, paso a paso" },
      {
        type: "img",
        src: "/treinamento/ui/video-{lang}.webp",
        alt: "Pestaña Video de Vizai Render",
        caption: "La pestaña Video: frames, proporción, cámara y duración.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Elige el frame inicial",
            text: "Es la imagen desde la que parte el video. Por defecto es el último render; también puedes tomar una imagen del Historial o subir una desde tu computadora. La IA no corrige lo que está mal en la imagen, así que empieza con un render que ya aprobarías.",
          },
          {
            title: "Define el frame final, si quieres",
            text: "Opcional. Con una segunda imagen, la IA crea la transición entre las dos. Funciona mejor con dos renders del mismo ambiente, con la misma luz y ángulos cercanos.",
          },
          {
            title: "Elige la proporción",
            text: "Paisaje (16:9) para presentaciones y YouTube, cuadrado (1:1) para el feed y retrato (9:16) para Reels y Stories. Usa la misma proporción del render: si el video será vertical, genera el render en 9:16 desde el principio.",
          },
          {
            title: "Configura cámara y audio",
            text: "En **Configurar Cámara y Audio**, elige uno de los 8 movimientos y si el video tendrá sonido.",
          },
          {
            title: "Escribe observaciones, si quieres",
            text: "En el campo **Observaciones**, pide atención a un elemento (“enfocar en la silla de madera”) o describe el movimiento con tus palabras (“la cámara avanza despacio y revela el balcón”). El texto se suma al movimiento elegido.",
          },
          {
            title: "Elige la duración y genera",
            text: "4, 6, 8, 10 o 15 segundos. El costo aparece en el botón antes de generar, y el video está listo en 2 a 5 minutos.",
          },
        ],
      },
      { type: "h2", text: "Los 8 movimientos de cámara" },
      {
        type: "img",
        src: "/treinamento/ui/modal-camera-{lang}.webp",
        alt: "Modal de cámara y audio del video",
        caption: "Los 8 movimientos listos y las opciones de sonido.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Automático (Recomendado)**: la IA elige un movimiento natural para la escena. Es el mejor punto de partida.",
          "**Zoom In Suave**: la cámara avanza hacia la escena. Destaca un ambiente o un detalle de carpintería.",
          "**Zoom Out Suave**: la cámara retrocede y revela todo el espacio. Bueno para cerrar el video mostrando el conjunto.",
          "**Panorámica a la Derecha o a la Izquierda**: la cámara se desliza de lado. Funciona en salas amplias, cocinas lineales y fachadas largas.",
          "**Tilt Up y Tilt Down**: la cámara se inclina hacia arriba o hacia abajo. Muestra techos altos, escaleras y fachadas de edificios.",
          "**Órbita (Drone)**: la cámara gira alrededor del proyecto, como un dron. Es el movimiento más llamativo para fachadas y casas, y el que más exige a la IA.",
        ],
      },
      { type: "h2", text: "Sonido del video" },
      {
        type: "ul",
        items: [
          "**Sonido Ambiente (Generado por IA)**: viento, pasos y ruido de ciudad, creados para combinar con la escena. No cambia el precio.",
          "**Sin Sonido**: video mudo, para que agregues música o narración en la edición.",
        ],
      },
      { type: "h2", text: "Cuánto cuesta" },
      {
        type: "table",
        head: ["Duración", "Costo"],
        rows: [
          ["4 segundos", "22 créditos"],
          ["6 segundos", "33 créditos"],
          ["8 segundos", "44 créditos"],
          ["10 segundos", "55 créditos"],
          ["15 segundos", "83 créditos"],
        ],
      },
      { type: "h2", text: "Para que el video salga bien" },
      {
        type: "ul",
        items: [
          "**Empieza corto.** Los videos de 4 a 6 segundos con movimiento Automático o Zoom In son los más estables y los más baratos. Deja 10 o 15 segundos para movimientos que necesitan tiempo, como una órbita.",
          "**Render limpio, video limpio.** Corrige el render antes, con la edición con máscara, y solo después anímalo. La IA lleva al video todo lo que esté en la imagen.",
          "**Proporción correcta desde el render.** Para Reels, genera el render en 9:16 en lugar de usar uno horizontal.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Ventanas, carpintería o fachada deformándose**: cuanto más se desplaza la cámara, más tiene que inventar la IA lo que no aparece en el render. Cambia a un movimiento más corto (Zoom In o Automático), reduce la duración o usa un frame final para fijar el punto de llegada.",
          "**Movimiento distinto al pedido**: describe el movimiento en Observaciones con una frase simple y directa, y mantén el movimiento elegido coherente con ella.",
        ],
      },
      { type: "warn", text: "Si la generación falla o el video no llega al plugin, los créditos vuelven a tu cuenta automáticamente." },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Cuánto tarda?** De 2 a 5 minutos, según la duración.",
          "**¿Qué resolución tiene?** 1080p, en la proporción elegida.",
          "**¿Puedo hacer un recorrido por toda la casa?** No en un solo video: cada video parte de un render y dura hasta 15 segundos. Para un recorrido, genera un video por ambiente y únelos en la edición.",
          "**¿Puedo animar una imagen que no salió de Vizai?** Sí. En el frame inicial, usa Subir desde PC.",
        ],
      },
      { type: "cost", text: "22 a 83 créditos por video, según la duración" },
    ],
  },
  "panorama-360": {
    title: "Panorama 360°: presentaciones inmersivas que el cliente explora",
    excerpt:
      "Marca la pared y dónde te paras: SketchUp captura todo el ambiente y la IA devuelve, en unos 30 segundos, un panorama esférico que el cliente explora con un enlace, sin instalar nada.",
    blocks: [
      { type: "p", text: "La pestaña **360** convierte un ambiente de tu modelo en un **panorama esférico realista**, que el cliente abre con un enlace en la computadora o en el celular y explora girando la imagen. No hace falta renderizar nada antes: marcas la pared y el punto donde estás, y el panorama está listo en unos 30 segundos, por 5 créditos." },
      {
        type: "img",
        src: "/treinamento/ui/pano-360-resultado.webp",
        alt: "Panorama 360 generado por Vizai Render",
        caption: "El panorama generado: listo para el visor interactivo.",
      },
      { type: "p", text: "Son dos etapas. Primero el propio SketchUp captura el ambiente en todas las direcciones desde el punto marcado y arma una vista previa esférica, sin costo. Después la IA convierte esa vista previa en fotografía: mantiene la arquitectura, los muebles y las proporciones, cambia los materiales del modelo por acabados reales y borra las líneas de contorno de SketchUp." },
      { type: "h2", text: "Paso a paso" },
      {
        type: "img",
        src: "/treinamento/ui/pano-{lang}.webp",
        alt: "Pestaña 360 de Vizai Render",
        caption: "La pestaña 360: marca la pared y después dónde se para el observador.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Elige la pared del frente",
            text: "Haz clic en la pared que quedará en el centro del panorama. La unión de la imagen cae en la pared opuesta, así que deja la más bonita al frente. Si haces clic en el piso o en el techo, el plugin usa la dirección de la cámara actual.",
          },
          {
            title: "Marca dónde te paras",
            text: "Haz clic en el piso, en el punto desde donde mirará el cliente. La altura del ojo viene en 1,60 m, y puedes cambiarla.",
          },
          {
            title: "Revisa la vista previa",
            text: "El plugin captura las 6 vistas y une el 360 antes de gastar créditos. Si el observador quedó dentro de un mueble o de una pared, solo repítelo. La vista previa es gratis.",
          },
          {
            title: "Genera",
            text: "Haz clic en **Generar 360**. Son 5 créditos, y el panorama está listo en unos 30 segundos.",
          },
          {
            title: "Comparte",
            text: "Míralo más grande en el plugin, descarga la imagen, copia el enlace o envíalo directo por WhatsApp. El cliente lo abre en el navegador y puede girar, hacer zoom y verlo en pantalla completa.",
          },
        ],
      },
      { type: "h2", text: "Cómo sale el panorama" },
      {
        type: "ul",
        items: [
          "**Hecho para interiores.** El 360 trata la escena como un interior fotografiado para una revista.",
          "**Luz natural de día.** Las luces artificiales salen apagadas: tiras LED, spots y lámparas no se encienden en el panorama. Para mostrar la iluminación nocturna, usa el render, con el estilo de luz que quieras.",
          "**Arquitectura y muebles fijos.** La IA no agrega ni quita objetos y no cambia la distribución ni las proporciones. Lo que cambia son los acabados, que pasan de material de modelo a material real.",
          "**Vista por la ventana.** Del otro lado del vidrio, la IA crea un entorno urbano residencial creíble, para que la ventana no quede blanca ni vacía. La ventana en sí no cambia.",
        ],
      },
      { type: "h2", text: "Para que el panorama salga bien" },
      {
        type: "ul",
        items: [
          "**Desde el centro del ambiente.** Un observador metido en una esquina aplana el espacio; desde el centro, el panorama respira.",
          "**Pared despejada al frente.** Para el centro del panorama, elige una pared sin muebles pegados.",
          "**Ambiente cerrado y con materiales.** Paredes, piso y techo modelados y con materiales aplicados le dan a la IA qué interpretar. Donde falta una pared o el techo, la IA tiene que adivinar qué hay ahí.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Observador dentro de un mueble o de una pared**: aparece en la vista previa, antes de gastar créditos. Marca el punto otra vez, un poco más lejos.",
          "**Unión visible**: siempre cae en la pared opuesta a la que elegiste como frente. Elige como frente la pared más importante, y la unión queda atrás.",
          "**Panorama mirando al lado equivocado**: hiciste clic en el piso o en el techo en lugar de una pared, y el plugin usó la dirección de la cámara. Haz clic en una pared para elegir el frente.",
        ],
      },
      { type: "tip", text: "El enlace sirve para mostrárselo al cliente. Para guardar el panorama junto con el proyecto, descarga también la imagen." },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Cuánto tarda?** Unos 30 segundos después de la vista previa.",
          "**¿Qué tamaño tiene la imagen?** 2048 × 1024 píxeles, en el formato esférico (equirrectangular) que usan los visores 360.",
          "**¿Tengo que renderizar antes?** No. El 360 sale directo del modelo.",
          "**¿El cliente tiene que instalar algo?** No. El enlace se abre en el navegador de la computadora o del celular.",
          "**¿Funciona en exteriores?** El 360 está hecho para ambientes interiores, y es donde mejor funciona.",
        ],
      },
      { type: "cost", text: "5 créditos por panorama · vista previa y enlace para compartir gratis" },
    ],
  },
  "blocos-3d": {
    title: "Bloques 3D: convierte cualquier foto en un modelo para SketchUp",
    excerpt:
      "¿Viste la silla perfecta en una referencia? La pestaña Bloques convierte la foto en un modelo 3D con textura y lo importa directo en tu escena.",
    blocks: [
      { type: "p", text: "La pestaña **Bloques** convierte la foto de un mueble u objeto en un **modelo 3D con textura**, que entra en SketchUp como componente. Resuelve el clásico: el cliente quiere una pieza específica que no está en 3D Warehouse. Cada bloque cuesta 28 créditos y está listo en pocos minutos." },
      {
        type: "img",
        src: "/tools/tool-05.webp",
        alt: "Bloque 3D generado desde una foto",
        caption: "De la foto de referencia al bloque 3D en la escena.",
      },
      { type: "p", text: "Quien reconstruye el objeto es **Meshy**, un modelo de IA que genera 3D a partir de una imagen. Deduce las partes que no aparecen en la foto, como la parte de atrás, y entrega una malla liviana, de unos 10 mil polígonos, pensada para no hacer pesado SketchUp." },
      { type: "h2", text: "Cómo generarlo" },
      {
        type: "img",
        src: "/treinamento/ui/blocos-{lang}.webp",
        alt: "Pestaña Bloques de Vizai Render",
        caption: "La pestaña Bloques: foto de referencia, nombre y generación.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Agrega la foto de referencia",
            text: "Arrástrala o haz clic para subirla. Funciona mejor con el objeto entero visible, bien iluminado y con fondo limpio.",
          },
          {
            title: "Ponle nombre al bloque",
            text: "El nombre organiza el componente en tu modelo (por ejemplo, “Silla de Madera”).",
          },
          {
            title: "Genera",
            text: "Son 28 créditos. La mayoría de las veces está listo en 3 a 5 minutos; en horas de mucha demanda puede pasar de 10.",
          },
          {
            title: "Importa o descarga",
            text: "Importar a la escena coloca el bloque directo en el modelo; o descarga el archivo .GLB para usarlo en otro programa.",
          },
        ],
      },
      { type: "h2", text: "Ajusta el tamaño después de importar" },
      { type: "p", text: "El bloque no llega con la medida real de la pieza. Después de importarlo, revisa el tamaño y usa la herramienta **Escala** de SketchUp para dejar el mueble con las medidas correctas." },
      { type: "h2", text: "Para que el bloque salga bien" },
      {
        type: "ul",
        items: [
          "**El objeto entero y solo en la foto.** Bien iluminado, con fondo limpio y sin otros muebles pegados.",
          "**Foto en tres cuartos.** Una foto un poco de costado muestra el frente y un lateral, y la IA se equivoca menos en las partes ocultas.",
          "**Las piezas de forma clara salen mejor.** Sillas, sillones, mesas, lámparas y jarrones suelen funcionar bien. Las piezas muy caladas o con detalles finos, como esterilla y alambre, tienden a perder definición.",
        ],
      },
      { type: "warn", text: "Muchos bloques en un modelo grande suman peso. La ventana Tools (Impacto de los Componentes) muestra qué bloques pesan más, y la clase Optimizar Archivo enseña a resolverlo." },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Parte de atrás rara**: la IA deduce lo que la foto no muestra. Usa una foto en tres cuartos, que muestra más del objeto.",
          "**Tamaño equivocado**: ajústalo con la herramienta Escala después de importar.",
          "**El bloque no llegó**: si la generación falla o el bloque no llega al plugin, los créditos vuelven a tu cuenta automáticamente.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Cuánto tarda?** De 3 a 5 minutos, la mayoría de las veces.",
          "**¿Cuántos polígonos tiene el bloque?** Unos 10 mil: liviano para usarlo varias veces en el mismo modelo.",
          "**¿Qué archivo sale?** El plugin importa el bloque directo a la escena; el archivo para descargar es GLB, que la mayoría de los programas 3D abre.",
        ],
      },
      { type: "cost", text: "28 créditos por bloque generado" },
    ],
  },
  "primeiro-render": {
    title: "Tu primer render fotorrealista en SketchUp, del encuadre al resultado",
    excerpt:
      "La clase completa: prepara la escena en la pestaña Escenas, genera el render en Estudio y refina la imagen en el editor, sin salir de SketchUp.",
    blocks: [
{
        type: "p",
        text: "La IA renderiza exactamente lo que ve en tu viewport. Por eso, el paso que más influye en la calidad del resultado no es el prompt. Es la **preparación de la escena**. La pestaña Escenas reúne todos los controles para eso, sin tocar las configuraciones de SketchUp.",
      },
      {
        type: "img",
        src: "/treinamento/ui/cenas-full-{lang}.webp",
        alt: "Pestaña Escenas completa de Vizai Render",
        caption: "La pestaña Escenas: iluminación, formato, focal y guías de composición.",
        ui: true,
      },
      { type: "h2", text: "Iluminación de la escena" },
      {
        type: "p",
        text: "Los controles **Claro** y **Oscuro** ajustan las sombras de SketchUp. Súbelos juntos para aclarar la escena y revelar más detalles. Cuanto más vea la IA de tu modelo, más fiel es el render. El botón **Usar sol para sombreado** mejora la lectura de los volúmenes.",
      },
      {
        type: "p",
        text: "¿No quieres pensar en eso? Usa los presets: **Exterior** para fachadas y áreas abiertas, **Interior** para ambientes internos. Aplican la configuración recomendada en un clic, y el plugin restaura las sombras originales de tu archivo al cerrar el panel.",
      },
      { type: "h2", text: "Formato de salida" },
      {
        type: "p",
        text: "Elige la proporción de la imagen final antes de renderizar: **Paisaje 16:9** (presentaciones), **Cuadrado 1:1**, **Feed 4:5** y **Retrato 9:16** (redes sociales), además de 5:4, **Clásico 4:3**, **Foto 3:2** y 7:5. La viewport muestra la máscara de recorte en tiempo real. Lo que está dentro es lo que se renderiza.",
      },
      { type: "h2", text: "Distancia focal" },
      {
        type: "p",
        text: "La distancia focal cambia por completo la lectura del espacio: **24mm (gran angular)** abraza interiores pequeños, **35–55mm** son neutras y realistas, **70–85mm** comprimen la perspectiva como una foto profesional de detalle. También hay un modo **Custom** para definir el valor manualmente.",
      },
      {
        type: "tip",
        text: "Para interiores residenciales, 24mm a 35mm es el estándar de la fotografía de arquitectura. Para fachadas, prueba 35mm a 55mm desde más lejos. Distorsiona menos las verticales.",
      },
      { type: "h2", text: "Guías de composición" },
      {
        type: "ul",
        items: [
          "**Regla de los tercios**: superpone las líneas guía clásicas de fotografía en la viewport, para ubicar los puntos de interés en las zonas fuertes del cuadro.",
          "**2 puntos de fuga**: activa la perspectiva arquitectónica de SketchUp: todas las verticales quedan perfectamente rectas, el estándar de las fotos profesionales de arquitectura.",
        ],
      },
      { type: "h2", text: "Guardar escenas" },
      {
        type: "p",
        text: "¿Encontraste el ángulo perfecto? Ponle nombre y haz clic en **Guardar**. La escena se crea en SketchUp y vuelves a ella cuando quieras. Guarda tus 3 o 4 ángulos principales antes de empezar a renderizar: facilita generar la serie completa de imágenes del proyecto y rehacer ajustes después.",
      },
        { type: "p", text: "Con la escena guardada, es hora de generar la primera imagen. Todo pasa en la pestaña Estudio, y toma menos de un minuto." },
{
        type: "p",
        text: "Con la escena preparada, renderizar es seguir los 5 pasos numerados de la pestaña **Estudio**, en modo **Render**. En segundos la IA devuelve una imagen fotorrealista del ángulo exacto de tu viewport, preservando tu proyecto. Geometría, materiales y composición.",
      },
      {
        type: "img",
        src: "/treinamento/ui/studio-render-{lang}.webp",
        alt: "Pestaña Estudio en modo Render",
        caption: "El modo Render del Estudio: 5 pasos numerados hasta el botón Renderizar.",
        ui: true,
      },
      { type: "h2", text: "Los 5 pasos" },
      {
        type: "steps",
        items: [
          {
            title: "Tipo de proyecto",
            text: "Le dice a la IA qué está viendo: Interiores, Fachada Externa, En la Naturaleza (integración con paisaje), Comercial (tienda, oficina) o Edificio. Cada tipo recibe un tratamiento específico de iluminación y contexto. Al elegir **Fachada Externa** aparece una segunda opción, el entorno del terreno: **Casas vecinas** (la predeterminada — una casa a cada lado, del mismo nivel que tu proyecto), **Lotes con muro** (terrenos vacíos con muro o cerca divisoria) o **Terreno abierto** (terreno abierto, sin muros ni cercas).",
          },
          {
            title: "Calidad",
            text: "El motor de imagen de Vizai (Nano Banana Pro). Cada render cuesta 4 créditos.",
          },
          {
            title: "Estilo de clima",
            text: "Día, Atardecer, Noche o Nublado. Define el cielo, la temperatura de la luz y el clima general de la imagen.",
          },
          {
            title: "Luces",
            text: "Luces encendidas (interiores de noche o ambientes acogedores), apagadas, o Ninguno para que la IA decida lo natural.",
          },
          {
            title: "Detalles de la escena",
            text: "Campo libre opcional para orientar a la IA: materiales, vegetación, atmósfera. Se integra automáticamente al prompt.",
          },
        ],
      },
      { type: "h2", text: "El resultado" },
      {
        type: "compare",
        before: { src: "/compare2-before.jpg", label: "Modelo SketchUp" },
        after: { src: "/compare2-after.jpg", label: "Render Vizai" },
      },
      {
        type: "p",
        text: "El render aparece en el propio panel con el control **Antes/Después** para compararlo con el modelo original, incluso en pantalla completa. Desde ahí puedes **Descargar** la imagen, abrir el **Editor** para refinarla, o **Exportar en alta resolución**: la descarga estándar es gratis, y el upscale a **4K cuesta 5 créditos**.",
      },
      { type: "h2", text: "Escribiendo buenos detalles de escena" },
      {
        type: "p",
        text: "El campo de detalles no necesita frases elaboradas. Palabras clave separadas por comas funcionan mejor. Describe lo que la IA no puede adivinar del modelo:",
      },
      {
        type: "ul",
        items: [
          "**Materiales específicos**: “piso de porcelanato satinado, carpintería de madera clara, encimera de cuarzo blanco”.",
          "**Vegetación y entorno**: “vegetación tropical, césped recortado, calle arbolada”.",
          "**Atmósfera**: “luz suave de atardecer, ambiente acogedor”.",
        ],
      },
      {
        type: "tip",
        text: "Aplica texturas reales al modelo en vez de dejarlo todo blanco: la IA respeta los materiales que ve. Modelo texturizado + detalles cortos en el prompt = el resultado más fiel.",
      },
      {
        type: "warn",
        text: "Si el render sale oscuro o con zonas “inventadas”, vuelve a la pestaña Escenas y aclara la iluminación. Generalmente la IA no estaba viendo esa parte del modelo.",
      },
      { type: "cost", text: "4 créditos por render · upscale 4K opcional por 5 créditos" },
        { type: "p", text: "El render está listo, pero no tienes que quedarte con el primer resultado. La ventana Editar permite corregir un detalle, crear nuevas perspectivas y ajustar la imagen sin gastar otro render." },
{
        type: "p",
        text: "¿Generaste un buen render pero el sofá quedó raro? ¿Quieres el mismo ambiente desde otro ángulo, o un closeup de la encimera para la presentación? Para eso existe el **Editor**. Haz clic en **Editar** sobre cualquier render y se abre en una ventana dedicada con tres pestañas: **Edición con IA**, **Recorte** y **Ajustes**.",
      },
      {
        type: "img",
        src: "/treinamento/ui/editor-ia-{lang}.webp",
        alt: "Ventana Editar Render con la pestaña Edición con IA",
        caption: "El Editor: herramientas de máscara, prompt de edición e historial a la derecha.",
      },
      { type: "h2", text: "Edición con IA (inpaint)" },
      {
        type: "p",
        text: "El inpaint permite alterar **solo un área** de la imagen, manteniendo todo lo demás intacto. Pinta la región que quieres cambiar y describe la modificación:",
      },
      {
        type: "steps",
        items: [
          {
            title: "Marca el área",
            text: "Usa el Pincel (con control de grosor), el Rectángulo o el Círculo para crear la máscara. ¿Te equivocaste? Borrador, Deshacer trazo o Limpiar máscara.",
          },
          {
            title: "Describe el cambio",
            text: "“Cambiar el sofá por uno de lino beige”, “quitar el coche”, “agregar cuadros en la pared”… La IA edita solo el área marcada.",
          },
          {
            title: "Aplica y compara",
            text: "Cada edición cuesta 4 créditos y entra al historial lateral. Navega entre versiones y mantén presionado el botón Antes/Después para comparar con el original.",
          },
        ],
      },
      {
        type: "video",
        src: "/tools/tool-edit.mp4",
        caption: "Inpaint en acción: marca, describe y la IA cambia solo esa área.",
      },
      {
        type: "tip",
        text: "Sin ninguna máscara, el comando vale para toda la imagen, útil para cambios globales como “hacerlo nocturno” o “cambiar el color de las paredes”.",
      },
      { type: "h2", text: "Nuevas perspectivas: varias escenas desde un render" },
      {
        type: "p",
        text: "Este es uno de los recursos más potentes del Editor: pide **otro ángulo** del mismo ambiente directamente en el campo de texto, sin mover la cámara en SketchUp y sin gastar un render nuevo desde cero. La IA entiende la intención de tu comando:",
      },
      {
        type: "ul",
        items: [
          "**“Closeup del sillón”**: marca el sillón (o solo escríbelo) y recibe un detalle aproximado, con materiales e iluminación preservados.",
          "**“Vista lateral del ambiente”** o **“nueva perspectiva mostrando la cocina desde la derecha”**. Genera el mismo espacio visto desde otro punto.",
          "**“Vista de dron”**: aleja y eleva la cámara para una toma aérea.",
        ],
      },
      {
        type: "img",
        src: "/tools/tool-02.jpg",
        alt: "Nuevas perspectivas generadas desde un render",
        caption: "Un render base puede convertirse en una serie completa de imágenes del proyecto.",
      },
      {
        type: "p",
        text: "En la práctica, un único render de 4 créditos se vuelve la base de una **presentación completa**: genera la vista general, luego pide closeups de los detalles y ángulos alternativos por 4 créditos cada uno. Mucho más rápido que reposicionar la cámara y re-renderizar cada vista.",
      },
      { type: "h2", text: "Recorte y Ajustes (gratis)" },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/editor-crop-{lang}.webp",
            alt: "Pestaña Recorte del Editor",
            caption: "Recorte con proporciones listas o libre.",
          },
          {
            src: "/treinamento/ui/editor-adjust-{lang}.webp",
            alt: "Pestaña Ajustes del Editor",
            caption: "Ajustes finos de foto, sin costo.",
          },
        ],
      },
      {
        type: "p",
        text: "La pestaña **Recorte** reencuadra la imagen en las proporciones del plugin (Paisaje, Cuadrado, Feed, Retrato, Clásico, Foto) o en recorte libre/personalizado. La pestaña **Ajustes** la termina como en un editor de fotos: **brillo, contraste, saturación, exposición y temperatura**. Las dos son totalmente gratuitas, igual que la descarga en 2K.",
      },
      {
        type: "p",
        text: "Al hacer clic en **Finalizar Edición**, la versión final vuelve al panel principal, lista para convertirse en video, 360 o upscale 4K.",
      },
      { type: "cost", text: "Edición con IA y nuevas perspectivas: 4 créditos cada una · Recorte, Ajustes y descarga 2K: gratis" },
    ],
  },
  "reflexo-espelho": {
    title: "Reflejo de espejo y Luz Fake en SketchUp",
    excerpt:
      "Cómo atar el reflejo en espejos, vidrios y piso pulido a tu escena, y cómo poner tiras de LED y spots directo en el modelo.",
    blocks: [
{
        type: "p",
        text: "Una superficie que refleja es un problema clásico: SketchUp muestra una cara plana y la IA, sin referencia, se inventa un reflejo cualquiera. La herramienta **Reflejo del Espejo** (en la pestaña Escenas) proyecta en la cara lo que **realmente reflejaría**, y entonces sí renderizas, con el reflejo coherente con el ambiente.",
      },
      {
        type: "video",
        src: "/treinamento/ui/reflexo-espelho.mp4",
        caption: "Reflejo aplicado directamente en la pestaña Escenas, sin coste de créditos.",
      },
      { type: "h2", text: "Seis tipos de superficie" },
      {
        type: "p",
        text: "La captura es la misma para todos; lo que cambia es el acabado. Elige el tipo **antes** de hacer clic en la cara:",
      },
      {
        type: "ul",
        items: [
          "**Espejo**: opaco, reflejo pleno. El comportamiento clásico de la herramienta.",
          "**Suelo**: porcelánico pulido, encimera de mármol, mesa lacada. Reflejo suave por encima: el material del suelo sigue mandando en el aspecto.",
          "**TV**: pantalla apagada. Opaca y bien oscura, con el ambiente apenas insinuado, como una pantalla apagada de verdad.",
          "**Vidrio**: vidrio incoloro de mampara o puerta. Refleja menos y deja ver a través, sin alterar el color de lo que refleja.",
          "**Bronce** y **Ahumado**: los vidrios tintados de puerta de armario. Semitransparentes: el reflejo aparece encima y el interior del armario por debajo.",
        ],
      },
      { type: "h2", text: "Cómo usarlo" },
      {
        type: "steps",
        items: [
          {
            title: "Guarda la escena",
            text: "Deja la vista que vas a renderizar y guárdala como escena. El reflejo queda atado a esa escena.",
          },
          {
            title: "Elige el tipo y haz clic en la cara",
            text: "Selecciona el tipo de superficie, haz clic en **Generar Reflejo en la Escena** y luego en la cara. Se ilumina en azul. No hace falta entrar en el grupo. Las pantallas de TV y los suelos importados suelen venir divididos en varios trozos: el plugin une los trozos vecinos solo y se ilumina la superficie entera.",
          },
          {
            title: "¿Superficie en partes separadas? Usa Shift",
            text: "Espejo en paneles o vidrio en hojas: mantén **Shift** y haz clic en las otras caras, luego **Enter**. Sale un reflejo continuo, sin junta entre las partes.",
          },
          {
            title: "Ajusta sin rehacer",
            text: "Suelo y TV tienen un slider; vidrio, bronce y ahumado tienen dos. **Brillo** y **transparencia**. Suelta el slider y el reflejo que ya está en la escena cambia al instante, sin generarlo otra vez. Cada slider tiene un botón para volver al valor por defecto.",
          },
        ],
      },
      {
        type: "p",
        text: "El plugin refleja la cámara de la escena por el plano de la superficie, captura el ambiente que realmente reflejaría y lo proyecta en la cara, en segundos, **sin coste de créditos**, porque todo ocurre localmente en tu SketchUp.",
      },
      {
        type: "warn",
        text: "El reflejo queda **guardado en la escena** y desaparece al cambiar de escena. Genera uno para cada una. Si cambias la vista de la escena después, rehaz el reflejo antes de renderizar. El botón **Borrar todos los reflejos** limpia de una vez todo lo que la herramienta creó en el modelo.",
      },
      {
        type: "tip",
        text: "En el vidrio tintado, el interior del armario solo aparece si el material de la puerta está transparente en SketchUp. Y conviene combinarlos: espejo en el baño, ahumado en las puertas del vestidor, suelo pulido en el salón. Es el conjunto lo que hace que el render parezca una fotografía.",
      },
      { type: "cost", text: "Gratis: procesado localmente, sin créditos" },
        { type: "p", text: "El reflejo ya está en la escena. Ahora vamos a la segunda herramienta de esta clase, la Luz Fake, que resuelve la iluminación del ambiente sin modelar ninguna luminaria." },
{
        type: "p",
        text: "SketchUp no muestra luz. Dibujas la cornisa, el nicho, el espejo, y la escena sigue plana, sin ninguna pista de lo que debe encender en el render. La **Luz Falsa** (en la pestaña Escenas, justo debajo del Reflejo de Espejo) lo resuelve dibujando la luz: una tira de LED que corre por el borde, o un spot con el haz visible. No es iluminación real. Es una referencia clara para que la IA sepa dónde hay luz y de qué color es.",
      },
      {
        type: "video",
        src: "/treinamento/ui/luz-fake.mp4",
        caption: "Tira de LED detrás del espejo, en la carpintería y spots en el techo, todo local, sin costo de créditos.",
      },
      { type: "h2", text: "Tira de LED o Spot" },
      {
        type: "ul",
        items: [
          "**Tira de LED**: corre a lo largo de una línea (cornisa, nicho, zócalo) o contornea el borde entero de un espejo. En **Tipo de objeto** eliges entre **Carpintería** y **Espejo**.",
          "**Spot**: el haz cónico de una luminaria. Haces clic en la cara de la luminaria y el haz sale de ella.",
        ],
      },
      { type: "h2", text: "Cómo usarla" },
      {
        type: "steps",
        items: [
          {
            title: "Elige el modo y ajusta la luz",
            text: "Selecciona **Tira de LED** o **Spot**, el color (por defecto un blanco cálido, #ffe76e), la dirección del haz y los sliders de **Alcance**, **Intensidad** y **Apertura**. Cada modo guarda sus propios valores.",
          },
          {
            title: "Haz clic en Generar y luego en el lugar de la luz",
            text: "Para tira en carpintería, haz clic en la **línea** por donde va a correr. Mantén **Shift** para sumar varias líneas de una vez. Para tira en espejo, haz clic en la **cara del espejo** y contornea todo el borde. Para spot, haz clic en la **cara de la luminaria**. **ESC** sale de la herramienta.",
          },
          {
            title: "Ajusta sin rehacer",
            text: "Con una luz seleccionada en SketchUp, los sliders pasan a editar esa luz. Suelta el slider y se reconstruye al instante. También puedes mover la luz a mano y el siguiente ajuste respeta la nueva posición.",
          },
        ],
      },
      {
        type: "p",
        text: "La tira es una franja continua: las esquinas se encuentran sin rasgarse, y en un contorno vertical (el espejo) el brillo sale hacia afuera siguiendo la forma, mientras que en uno horizontal (la cornisa) baja o sube. Todo se genera en tu computadora, en segundos, **sin consumir créditos**.",
      },
      {
        type: "warn",
        text: "Es luz **falsa**: no ilumina la escena de SketchUp, sirve como referencia visual para el render. El botón **Apagar todas las luces** elimina de una vez todo lo que la herramienta creó en el modelo.",
      },
      {
        type: "tip",
        text: "El uso que más rinde es la tira detrás del espejo. Ese brillo contorneando el borde es lo que hace que la IA entregue el espejo retroiluminado que imaginaste. Combínala con el **Reflejo de Espejo** en la misma escena: uno da el reflejo, la otra da la luz.",
      },
      { type: "cost", text: "Gratis: procesado localmente, sin créditos" },
    ],
  },
  "primeiros-passos": {
    title: "Primeros pasos: instala el plugin e inicia sesión por primera vez",
    excerpt:
      "Cómo instalar Vizai Render en SketchUp, entrar con tu cuenta de Google, activar los 8 créditos gratis y entender cuánto cuesta cada herramienta.",
    blocks: [
      {
        type: "p",
        text: "Vizai Render es un plugin de renderizado con IA que funciona dentro de SketchUp. Configuras la escena, eliges el estilo y recibes un render fotorrealista en segundos, sin exportar nada, sin programas externos y sin tarjeta gráfica potente. Esta guía deja todo funcionando.",
      },
      { type: "h2", text: "Instalación" },
      {
        type: "steps",
        items: [
          {
            title: "Descarga el archivo .rbz",
            text: "En la página de descarga del sitio, baja la versión más reciente del plugin (compatible con SketchUp 2017 o superior, Windows y Mac).",
          },
          {
            title: "Instálalo desde SketchUp",
            text: "Abre SketchUp y ve a Extensiones → Administrador de Extensiones → Instalar Extensión, selecciona el archivo .rbz descargado y confirma.",
          },
          {
            title: "Abre Vizai Render",
            text: "El panel aparece en el menú Extensiones → Vizai Render, o por el ícono de la barra de herramientas.",
          },
        ],
      },
      {
        type: "video",
        src: "/tutorial-sketchup.mp4",
        caption: "Instalación del plugin con el Administrador de Extensiones de SketchUp.",
      },
      { type: "h2", text: "Inicio de sesión y créditos de bienvenida" },
      {
        type: "p",
        text: "El inicio de sesión es con tu cuenta de Google, en un clic, sin crear contraseña nueva. En tu **primer inicio de sesión desde el plugin** recibes **8 créditos gratis** para probar las herramientas. El saldo aparece en la esquina superior derecha del panel, junto a tu perfil.",
      },
      {
        type: "tip",
        text: "¿Creaste la cuenta en el sitio web? Los 8 créditos gratis se activan cuando inicias sesión por primera vez dentro del plugin. Ahí es donde aparecen.",
      },
      { type: "h2", text: "Cómo funcionan los créditos, planes y costos de cada herramienta" },
      {
        type: "p",
        text: "Todo en Vizai Render funciona con **créditos**: cada generación con IA consume una cantidad fija, descontada de tu saldo. Las herramientas locales (la ventana Tools, los ajustes de foto del Editor y el Reflejo de Espejo) son **gratuitas**. Solo pagas por lo que la IA genera.",
      },
      { type: "h2", text: "Costo de cada herramienta" },
      {
        type: "table",
        head: ["Herramienta", "Costo"],
        rows: [
          ["Render (Estudio)", "4 créditos"],
          ["IA Creativa (Moodboard, Decorar, Planta, Diagrama)", "3 créditos"],
          ["Edición con IA (inpaint, nuevas perspectivas)", "4 créditos"],
          ["Exportar en 4K (upscale)", "5 créditos"],
          ["Panorama 360°", "5 créditos"],
          ["Video con IA (4 a 15 segundos)", "22 a 83 créditos"],
          ["Bloque 3D desde foto", "28 créditos"],
          ["Herramientas Tools, ajustes de foto, recorte, descarga 2K", "Gratis"],
        ],
      },
      {
        type: "p",
        text: "El costo siempre se muestra **antes** de confirmar: el botón de generar muestra el valor (ej.: “Renderizar (4 créditos)”). Si el saldo no alcanza, el plugin te avisa y no se cobra nada.",
      },
      {
        type: "tip",
        text: "Si una generación falla por error del servidor, los créditos se devuelven automáticamente. Nunca pagas por un render que no llegó.",
      },
      { type: "h2", text: "Planes mensuales y paquetes únicos" },
      {
        type: "p",
        text: "Hay dos formas de adquirir créditos, y se complementan:",
      },
      {
        type: "ul",
        items: [
          "**Planes mensuales**: Starter (250 créditos/mes), Pro (600 créditos/mes) y Business (1.600 créditos/mes). Los créditos se renuevan cada mes y puedes cancelar cuando quieras.",
          "**Paquetes únicos**: de 50 a 1.750 créditos en compra única. **No expiran** y se consumen después de los créditos mensuales.",
        ],
      },
      {
        type: "p",
        text: "Puedes suscribirte y comprar tanto en el sitio web como desde el plugin: haz clic en tu perfil en la esquina superior derecha del panel y elige **Suscripción** o **+ Comprar créditos**. El pago lo procesa Stripe y el saldo llega a tu cuenta en segundos.",
      },
      { type: "h2", text: "Siguiendo el consumo" },
      {
        type: "img",
        src: "/treinamento/ui/assinatura-{lang}.webp",
        alt: "Panel Suscripción de Vizai Render",
        caption: "El panel Suscripción muestra todos tus créditos disponibles en un solo lugar.",
        ui: true,
      },
      {
        type: "p",
        text: "Para seguir tu consumo, haz clic en tu perfil en la esquina superior derecha y abre **Suscripción**. Allí ves todos tus créditos disponibles en un solo lugar: el saldo de tu plan mensual (con cuántos días faltan para renovar) y los créditos sueltos, que no caducan. Las barras muestran de un vistazo cuánto queda de cada uno.",
      },
    ],
  },






  "decorar-ambiente": {
    title: "Decorar Ambiente: muebles y decoración con IA en espacios vacíos",
    excerpt:
      "El virtual staging de Vizai: sube la foto o el render de un ambiente vacío, elige el tipo de espacio, el estilo y el horario, y la IA amuebla y decora manteniendo la arquitectura.",
    blocks: [
      { type: "p", text: "**Decorar Ambiente** amuebla y decora un ambiente vacío a partir de una foto o de un render, en menos de un minuto, por 3 créditos. La arquitectura, los acabados, las ventanas y el encuadre quedan como están: la IA solo agrega muebles y decoración del tipo de ambiente y del estilo que elijas. Sirve para mostrar el potencial de inmuebles vacíos, departamentos en preventa, reformas y anuncios de venta o alquiler." },
      {
        type: "compare",
        before: { src: "/tools/tool-07-empty.avif", label: "Ambiente vacío" },
        after: { src: "/tools/tool-07.jpg", label: "Decorado con IA" },
      },
      { type: "h2", text: "Paso a paso" },
      {
        type: "steps",
        items: [
          {
            title: "Activa la IA Creativa",
            text: "En la pestaña Estudio, cambia de Render a IA Creativa y elige Decorar Ambiente.",
          },
          {
            title: "Sube la imagen base",
            text: "Arrastra una foto o un render del ambiente vacío (JPG o PNG, hasta 5 MB) o captura la escena actual de SketchUp. El resultado sale en la misma proporción de la imagen.",
          },
          {
            title: "Elige el ambiente, el estilo y el horario",
            text: "Uno de los 13 tipos de ambiente, uno o más estilos de decoración, y día o noche.",
          },
          {
            title: "Genera",
            text: "3 créditos por imagen. El resultado llega con Antes y Después para comparar con la base.",
          },
        ],
      },
      {
        type: "img",
        src: "/treinamento/ui/modal-decorar-{lang}.webp",
        alt: "Modal de configuración de Decorar Ambiente",
        caption: "13 tipos de ambiente y 8 estilos de decoración combinables.",
        ui: true,
      },
      { type: "h2", text: "Tipos de ambiente" },
      { type: "p", text: "Sala, Dormitorio, Cocina, Baño, Oficina, Balcón, Garaje, Hall, Piscina, Bodega, Despensa, Comedor y Espacio Gourmet. Cada tipo tiene su propio programa, que define qué entra. En el Comedor, la IA arma una mesa para 6 a 8 personas; en la Oficina, escritorio, silla ergonómica y estantería. En la Cocina, ordena la encimera y agrega taburetes y lámparas colgantes sin tocar los muebles, la encimera ni los electrodomésticos. En el Baño, agrega toallas, accesorios y plantas sin tocar los sanitarios." },
      { type: "h2", text: "Estilos de decoración" },
      { type: "p", text: "Moderno, Minimalista, Clásico, Industrial, Escandinavo, Rústico, Contemporáneo y Tropical. Marca más de uno para mezclarlos, como Moderno con Escandinavo. Si no marcas ninguno, Vizai usa el Moderno." },
      { type: "h2", text: "Día o noche" },
      {
        type: "ul",
        items: [
          "**Día**: luz natural suave entrando por las ventanas, con sombras leves.",
          "**Noche**: cielo azul oscuro del otro lado y el ambiente iluminado por lámparas cálidas, como colgantes, apliques y lámparas de mesa.",
        ],
      },
      { type: "h2", text: "Para que el resultado salga bien" },
      {
        type: "ul",
        items: [
          "**Ambiente realmente vacío.** Con paredes, piso y estructura bien visibles, la IA ubica los muebles con mucha más precisión.",
          "**Imagen bien encuadrada.** La IA mantiene el encuadre de la imagen, así que corrige la inclinación y el recorte antes de subirla.",
          "**Tipo de ambiente igual al uso real.** El tipo es lo que define los muebles que entran.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Mueble fuera de escala o en un lugar raro**: genera de nuevo, porque cada generación sale distinta, o corrige solo esa parte con la edición con máscara.",
          "**Algo de la arquitectura cambió**: la IA tiene la orden de mantener paredes, piso, ventanas y acabados. Si algo cambia, genera de nuevo.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Funciona con foto real o solo con render?** Con los dos. Está pensado para fotos de ambientes vacíos y también funciona con renders de SketchUp.",
          "**¿Puedo usarlo en un anuncio inmobiliario?** Sí, la imagen es tuya. Es buena práctica avisar en el anuncio que la decoración es virtual.",
          "**¿Cuánto tarda?** Menos de un minuto.",
          "**¿Cuántos créditos?** 3 por imagen, como los otros modos de la IA Creativa.",
        ],
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },
  "planta-humanizada": {
    title: "Planta Renderizada: del dibujo técnico a la presentación",
    excerpt:
      "Convierte la planta de tu modelo (o un dibujo de tu computadora) en una planta renderizada, lista para presentar al cliente.",
    blocks: [
      { type: "p", text: "La **Planta Renderizada** (Planta Humanizada en el plugin) convierte un dibujo técnico (la vista superior de tu modelo o una planta que ya tienes en imagen) en una planta renderizada vista desde arriba, con pisos, muebles, vegetación y sombras suaves, al estilo de las presentaciones de lanzamientos inmobiliarios. Está lista en menos de un minuto, por 3 créditos." },
      {
        type: "compare",
        aspect: "4 / 5",
        before: { src: "/tools/tool-08-before.webp", label: "Planta técnica" },
        after: { src: "/tools/tool-08.jpg", label: "Planta humanizada" },
      },
      { type: "p", text: "La IA lee la planta antes de dibujar: identifica los ambientes, las puertas y ventanas, los muebles y los materiales que ya aparecen en el dibujo, y mantiene todo en su lugar. Los muros cortados salen en un gris oscuro sólido, como en la planta técnica, y la luz es difusa, de estudio, sin sol directo ni sombras duras." },
      { type: "h2", text: "Capturando la planta desde SketchUp" },
      {
        type: "steps",
        items: [
          {
            title: "Vista superior",
            text: "En SketchUp, pon la cámara en Cámara → Vistas Estándar → Superior.",
          },
          {
            title: "Proyección Paralela",
            text: "Activa Cámara → Proyección Paralela: elimina la perspectiva y deja la planta “recta”, como un dibujo técnico.",
          },
          {
            title: "Encuadra y captura",
            text: "Ajusta el zoom para que la planta llene la pantalla y haz clic en **Capturar Escena Actual** en el plugin.",
          },
          {
            title: "Escribe observaciones y genera",
            text: "Describe el estilo y los materiales (ver abajo) y genera. Son 3 créditos.",
          },
        ],
      },
      { type: "p", text: "También puedes saltarte la captura y **subir una imagen desde tu computadora** (JPG o PNG, hasta 5 MB). Funciona con plantas exportadas de AutoCAD, Revit o hasta una foto de un dibujo, siempre que las paredes sean legibles." },
      { type: "h2", text: "Observaciones que hacen la diferencia" },
      { type: "p", text: "En el campo de observaciones, describe estilo, materiales y paleta: “piso de porcelanato claro, sofá de lino, carpintería de madera natural, plantas decorativas”. La IA agrega lo que pidas sin mover las paredes. Si el dibujo ya tiene materiales (capturado de un modelo con texturas, por ejemplo), se quedan en su lugar, y las observaciones completan el resto. Sin observaciones, la planta sale en un estilo contemporáneo y neutro." },
      { type: "h2", text: "Para que la planta salga bien" },
      {
        type: "ul",
        items: [
          "**Siempre Proyección Paralela.** Con perspectiva, las paredes salen torcidas y la IA lee mal el dibujo.",
          "**Planta llenando la pantalla.** Cuanto más grande es la planta en la imagen, más detalle puede dibujar la IA.",
          "**Textos y cotas, tú decides.** Apaga los nombres de ambientes y las cotas para una planta limpia, o mantenlos si la presentación pide la planta anotada.",
          "**Dibujo legible.** En plantas escaneadas o fotografiadas, paredes nítidas y con contraste dan un resultado mucho mejor.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Mueble o material distinto al pedido**: sé más específico en las observaciones, nombrando el ambiente (“en el dormitorio, cama con cabecero de madera”), y genera de nuevo.",
          "**Un detalle mal en un punto de la planta**: corrige solo esa parte con la edición con máscara, sin rehacer todo.",
          "**Paredes deformadas**: revisa que la captura se haya hecho en la Vista superior y en Proyección Paralela.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Funciona con plantas de AutoCAD o Revit?** Sí. Exporta la planta como imagen (JPG o PNG, hasta 5 MB) y súbela al plugin.",
          "**¿Cuánto tarda?** Menos de un minuto.",
          "**¿Puedo usar la planta en material de venta?** Sí, la imagen es tuya.",
        ],
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },
  diagrama: {
    title: "Diagrama: vistas isométricas y axonométricas con 5 estilos",
    excerpt:
      "Genera diagramas conceptuales de tu proyecto (del isométrico técnico en B&N a la maqueta física en madera balsa) a partir de una captura de la viewport.",
    blocks: [
      { type: "p", text: "La herramienta **Diagrama** convierte una vista isométrica de tu modelo, o un render terminado, en diagramas conceptuales con lenguaje de estudio de arquitectura: línea técnica, proyecto destacado, acuarela o foto de maqueta física. Ideal para concursos, láminas de presentación y redes sociales. Cada diagrama cuesta 3 créditos y está listo en menos de un minuto." },
      {
        type: "img",
        src: "/tools/tool-09.webp",
        alt: "Diagrama generado por Vizai Render",
        caption: "Diagrama generado desde una captura isométrica del modelo.",
      },
      { type: "h2", text: "Capturando la base" },
      {
        type: "steps",
        items: [
          {
            title: "Vista isométrica",
            text: "Pon la cámara en un ángulo isométrico (Cámara → Vistas Estándar → Iso, o ajuste manual).",
          },
          {
            title: "Proyección Paralela",
            text: "Activa Cámara → Proyección Paralela para el efecto axonométrico correcto, sin fugas.",
          },
          {
            title: "Captura o sube",
            text: "Usa **Capturar Escena Actual**, o sube una imagen desde tu computadora. Un render de fachada terminado también sirve.",
          },
          {
            title: "Elige el contexto y el estilo, y genera",
            text: "Mira los estilos abajo. Son 3 créditos.",
          },
        ],
      },
      { type: "h2", text: "Los 5 estilos" },
      { type: "p", text: "Primero elige el contexto. En **Exterior**, con entorno, hay cuatro estilos: Isométrico Técnico, Diagrama con Destaque, Colorido con Contexto y Maqueta Física. En **Interiores**, con el ambiente aislado, el estilo es el Axonométrico." },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/diagrama-tecnico.webp",
            alt: "Diagrama isométrico técnico",
            caption: "Isométrico Técnico: líneas B&N con entorno urbano.",
          },
          {
            src: "/treinamento/ui/diagrama-destaque.webp",
            alt: "Diagrama con destaque",
            caption: "Con Destaque: proyecto en color, entorno en gris.",
          },
          {
            src: "/treinamento/ui/diagrama-colorido.webp",
            alt: "Diagrama colorido con contexto",
            caption: "Colorido: ilustración acuarelada con entorno.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/diagrama-maquete.webp",
            alt: "Diagrama estilo maqueta física",
            caption: "Maqueta Física: estilo madera balsa.",
          },
          {
            src: "/treinamento/ui/diagrama-int-axo.webp",
            alt: "Diagrama axonométrico de interiores",
            caption: "Axonométrico: corte isométrico del ambiente interno.",
          },
        ],
      },
      { type: "h2", text: "Para que el diagrama salga bien" },
      {
        type: "ul",
        items: [
          "**Proyección Paralela.** Es lo que da el efecto axonométrico correcto, sin puntos de fuga.",
          "**Pantalla limpia.** Oculta ejes, cotas y objetos de referencia antes de capturar: lo que esté en pantalla entra en el diagrama.",
          "**Con Destaque para concursos y posts.** La mirada va directo al proyecto, y el entorno en gris da contexto sin competir.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Volumetría distinta del modelo**: revisa que la captura se haya hecho en Proyección Paralela y con el proyecto entero visible, y genera de nuevo.",
          "**No te gustó el resultado**: genera de nuevo, porque cada generación sale distinta, o prueba otro estilo.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Puedo usar un render como base?** Sí, la captura de SketchUp o un render terminado.",
          "**¿Puedo escribir lo que quiero?** No. El Diagrama no tiene campo de texto: el resultado sale del contexto y del estilo elegidos.",
          "**¿Cuánto tarda?** Menos de un minuto.",
        ],
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },

  moodboard: {
    title: "Moodboard: paneles de materiales y concepto en un clic",
    excerpt:
      "Crea moodboards profesionales a partir de una imagen de referencia: 7 composiciones de escena y 5 proporciones, del flat lay al panel de presentación.",
    blocks: [
      { type: "p", text: "El **Moodboard** crea un panel de referencia visual (muestras de materiales, paleta de colores y objetos) a partir de un render de tu proyecto o de una imagen de referencia. Es la herramienta para el comienzo de la conversación con el cliente: presenta el concepto y los acabados antes incluso del render final. Está listo en menos de un minuto, por 3 créditos." },
      {
        type: "img",
        src: "/tools/tool-06.jpg",
        alt: "Moodboard generado por Vizai Render",
        caption: "Moodboard generado con muestras de materiales del proyecto.",
      },
      { type: "p", text: "La IA analiza la imagen que envías y extrae de ella la paleta principal (de 3 a 5 colores), los materiales que aparecen (maderas, piedras, telas, metales) y el clima de la escena. Después arma una foto de muestras de esos materiales, en la composición que elijas. El proyecto en sí no aparece en el panel: solo los materiales y objetos que cuentan su historia." },
      { type: "h2", text: "Paso a paso" },
      {
        type: "steps",
        items: [
          {
            title: "Elige Moodboard en la IA Creativa",
            text: "En la pestaña Estudio, cambia de Render a IA Creativa y elige Moodboard.",
          },
          {
            title: "Sube la imagen base",
            text: "Un render tuyo o un collage de referencias (JPG o PNG, hasta 5 MB).",
          },
          {
            title: "Elige la composición y la proporción",
            text: "En la configuración del Moodboard, elige una de las 7 composiciones y una de las 5 proporciones.",
          },
          {
            title: "Genera",
            text: "3 créditos por imagen.",
          },
        ],
      },
      { type: "h2", text: "Composiciones disponibles" },
      { type: "p", text: "Son **7 estilos de composición**, la “escena” donde se fotografían las muestras:" },
      {
        type: "ul",
        items: [
          "**Banco de Estudio**: superficie premium con fondo en degradado suave.",
          "**Mesa de Proyecto**: sobre mesa de comedor u oficina, con fondo semidesenfocado.",
          "**Vista Superior**: flat lay directo desde arriba, sin perspectiva.",
          "**Panel de Presentación**: muestras fijadas en un tablero vertical.",
          "**Suelo Iluminado**: flat lay en piso de madera con luz lateral.",
          "**Línea de Materiales**: muestras alineadas en fila horizontal.",
          "**Alfombra Decorada**: composición en tres cuartos sobre alfombra, con objetos.",
        ],
      },
      {
        type: "img",
        src: "/treinamento/ui/modal-moodboard-{lang}.webp",
        alt: "Modal de configuración del Moodboard",
        caption: "Elige la composición y la proporción en el modal de configuración.",
        ui: true,
      },
      { type: "h2", text: "Proporciones" },
      { type: "p", text: "El moodboard sale en el formato correcto para su destino: **1:1** (Instagram clásico), **4:3** (presentaciones), **16:9** (pantallas y portafolio), **4:5** (feed vertical) y **9:16** (Stories y Reels)." },
      { type: "h2", text: "Para que el moodboard salga bien" },
      {
        type: "ul",
        items: [
          "**Imagen con los materiales del proyecto.** Un render tuyo o un collage de referencias: la IA extrae de ahí la paleta y los materiales.",
          "**Una dirección a la vez.** Una imagen de estilo claro (madera clara y lino, por ejemplo) genera un panel más coherente que referencias que no combinan entre sí.",
          "**Composición según el destino.** Vista Superior y Línea de Materiales funcionan bien en láminas; Panel de Presentación recuerda una reunión con muestras físicas; Alfombra Decorada y Mesa de Proyecto dan clima para redes sociales.",
        ],
      },
      { type: "h2", text: "Si el resultado no sale como esperabas" },
      {
        type: "ul",
        items: [
          "**Un material que no estaba en el proyecto**: usa una imagen base donde los materiales se vean con claridad y buena luz, y genera de nuevo.",
          "**Colores distintos a los del proyecto**: las imágenes muy oscuras o con luz de color confunden la paleta. Prefiere un render de día, con luz neutra.",
        ],
      },
      { type: "h2", text: "Preguntas rápidas" },
      {
        type: "ul",
        items: [
          "**¿Mi proyecto aparece en el moodboard?** No. El panel muestra solo muestras y objetos con la paleta y los materiales del proyecto.",
          "**¿Funciona sin render?** Sí. Un collage de referencias también sirve de base.",
          "**¿Cuánto tarda?** Menos de un minuto.",
        ],
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },




};
