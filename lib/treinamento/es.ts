import type { ArticleContent, TreinoUiStrings } from "./types";

export const esUi: TreinoUiStrings = {
  badge: "Capacitación oficial Vizai Render",
  title: "Aprende a dominar Vizai Render",
  subtitle:
    "Guías completas de todas las herramientas del plugin — desde tu primer render hasta presentaciones en video y 360°. Todo explicado paso a paso, con imágenes reales de la interfaz y de los resultados.",
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
    start: "Empieza aquí",
    render: "Render",
    creative: "IA Creativa",
    present: "Presentación",
    free: "Herramientas gratis",
  },
};

export const esArticles: Record<string, ArticleContent> = {
  "primeiros-passos": {
    title: "Primeros pasos: instala el plugin e inicia sesión por primera vez",
    excerpt:
      "Cómo instalar Vizai Render en SketchUp, entrar con tu cuenta de Google, activar los 8 créditos gratis y entender el panel en pocos minutos.",
    blocks: [
      {
        type: "p",
        text: "Vizai Render es un plugin de renderizado con IA que funciona dentro de SketchUp. Configuras la escena, eliges el estilo y recibes un render fotorrealista en segundos — sin exportar nada, sin programas externos y sin tarjeta gráfica potente. Esta guía deja todo funcionando.",
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
        text: "El inicio de sesión es con tu cuenta de Google, en un clic — sin crear contraseña nueva. En tu **primer inicio de sesión desde el plugin** recibes **8 créditos gratis** para probar las herramientas. El saldo aparece en la esquina superior derecha del panel, junto a tu perfil.",
      },
      {
        type: "tip",
        text: "¿Creaste la cuenta en el sitio web? Los 8 créditos gratis se activan cuando inicias sesión por primera vez dentro del plugin — ahí es donde aparecen.",
      },
      { type: "h2", text: "Conociendo el panel" },
      {
        type: "img",
        src: "/treinamento/ui/cenas-{lang}.webp",
        alt: "Panel principal de Vizai Render",
        caption: "El panel de Vizai Render dentro de SketchUp.",
        ui: true,
      },
      {
        type: "p",
        text: "El panel se organiza en 6 pestañas que siguen el flujo natural de un proyecto:",
      },
      {
        type: "ul",
        items: [
          "**Escenas** — prepara la captura: iluminación, formato de imagen, distancia focal y composición.",
          "**Estudio** — el corazón del plugin: genera el render fotorrealista o usa las herramientas de IA Creativa (moodboard, decoración, planta renderizada y diagrama).",
          "**Video** — anima tus renders en videos cinematográficos con movimiento de cámara y sonido ambiente.",
          "**360** — genera panoramas esféricos interactivos para que el cliente los explore en el navegador.",
          "**Bloques** — convierte una foto de referencia en un modelo 3D para usar en la escena.",
          "**Historial** — todo lo que generaste en el proyecto, con filtros y conteo de créditos.",
        ],
      },
      {
        type: "p",
        text: "Además de las pestañas está la ventana **Tools** (pestaña lateral verde), con herramientas locales y gratuitas para optimizar el archivo y crear pisos seamless — y el **Editor**, que se abre cada vez que haces clic en Editar sobre un render.",
      },
      {
        type: "tip",
        text: "Sigue el orden de las pestañas: prepara la escena en Escenas, renderiza en Estudio y solo después pasa a video, 360 o ediciones. Escena bien preparada = mejor render y menos créditos gastados en intentos.",
      },
    ],
  },

  "como-funciona-creditos": {
    title: "Cómo funcionan los créditos, planes y costos de cada herramienta",
    excerpt:
      "Entiende el sistema de créditos de Vizai Render: cuánto cuesta cada operación, la diferencia entre planes mensuales y paquetes únicos, y cómo seguir tu saldo.",
    blocks: [
      {
        type: "p",
        text: "Todo en Vizai Render funciona con **créditos**: cada generación con IA consume una cantidad fija, descontada de tu saldo. Las herramientas locales (la ventana Tools, los ajustes de foto del Editor y el Reflejo de Espejo) son **gratuitas** — solo pagas por lo que la IA genera.",
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
          "**Planes mensuales** — Starter (300 créditos/mes), Pro (750 créditos/mes) y Business (2.000 créditos/mes). Los créditos se renuevan cada mes y puedes cancelar cuando quieras.",
          "**Paquetes únicos** — de 50 a 1.850 créditos en compra única. **No expiran** y se consumen después de los créditos mensuales.",
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

  "preparando-a-cena": {
    title: "Pestaña Escenas: prepara el encuadre perfecto antes de renderizar",
    excerpt:
      "Iluminación de la escena, formato de salida, distancia focal, regla de los tercios y 2 puntos de fuga — todo lo que define la calidad de tu render empieza aquí.",
    blocks: [
      {
        type: "p",
        text: "La IA renderiza exactamente lo que ve en tu viewport. Por eso, el paso que más influye en la calidad del resultado no es el prompt — es la **preparación de la escena**. La pestaña Escenas reúne todos los controles para eso, sin tocar las configuraciones de SketchUp.",
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
        text: "Los controles **Claro** y **Oscuro** ajustan las sombras de SketchUp. Súbelos juntos para aclarar la escena y revelar más detalles — cuanto más vea la IA de tu modelo, más fiel es el render. El botón **Usar sol para sombreado** mejora la lectura de los volúmenes.",
      },
      {
        type: "p",
        text: "¿No quieres pensar en eso? Usa los presets: **Exterior** para fachadas y áreas abiertas, **Interior** para ambientes internos. Aplican la configuración recomendada en un clic, y el plugin restaura las sombras originales de tu archivo al cerrar el panel.",
      },
      { type: "h2", text: "Formato de salida" },
      {
        type: "p",
        text: "Elige la proporción de la imagen final antes de renderizar: **Paisaje 16:9** (presentaciones), **Cuadrado 1:1**, **Feed 4:5** y **Retrato 9:16** (redes sociales), además de 5:4, **Clásico 4:3**, **Foto 3:2** y 7:5. La viewport muestra la máscara de recorte en tiempo real — lo que está dentro es lo que se renderiza.",
      },
      { type: "h2", text: "Distancia focal" },
      {
        type: "p",
        text: "La distancia focal cambia por completo la lectura del espacio: **24mm (gran angular)** abraza interiores pequeños, **35–55mm** son neutras y realistas, **70–85mm** comprimen la perspectiva como una foto profesional de detalle. También hay un modo **Custom** para definir el valor manualmente.",
      },
      {
        type: "tip",
        text: "Para interiores residenciales, 24mm a 35mm es el estándar de la fotografía de arquitectura. Para fachadas, prueba 35mm a 55mm desde más lejos — distorsiona menos las verticales.",
      },
      { type: "h2", text: "Guías de composición" },
      {
        type: "ul",
        items: [
          "**Regla de los tercios** — superpone las líneas guía clásicas de fotografía en la viewport, para ubicar los puntos de interés en las zonas fuertes del cuadro.",
          "**2 puntos de fuga** — activa la perspectiva arquitectónica de SketchUp: todas las verticales quedan perfectamente rectas, el estándar de las fotos profesionales de arquitectura.",
        ],
      },
      { type: "h2", text: "Guardar escenas" },
      {
        type: "p",
        text: "¿Encontraste el ángulo perfecto? Ponle nombre y haz clic en **Guardar** — la escena se crea en SketchUp y vuelves a ella cuando quieras. Guarda tus 3 o 4 ángulos principales antes de empezar a renderizar: facilita generar la serie completa de imágenes del proyecto y rehacer ajustes después.",
      },
    ],
  },

  "primeiro-render": {
    title: "Tu primer render fotorrealista en el Estudio",
    excerpt:
      "El paso a paso completo del modo Render: tipo de proyecto, clima, luces y detalles de la escena — y cómo escribir descripciones que mejoran el resultado.",
    blocks: [
      {
        type: "p",
        text: "Con la escena preparada, renderizar es seguir los 5 pasos numerados de la pestaña **Estudio**, en modo **Render**. En segundos la IA devuelve una imagen fotorrealista del ángulo exacto de tu viewport, preservando tu proyecto — geometría, materiales y composición.",
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
            text: "Le dice a la IA qué está viendo: Interiores, Fachada Externa, En la Naturaleza (integración con paisaje), Comercial (tienda, oficina) o Edificio. Cada tipo recibe un tratamiento específico de iluminación y contexto.",
          },
          {
            title: "Calidad",
            text: "El motor de imagen de Vizai (Nano Banana Pro) — cada render cuesta 4 créditos.",
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
        text: "El render aparece en el propio panel con el control **Antes/Después** para compararlo con el modelo original — incluso en pantalla completa. Desde ahí puedes **Descargar** la imagen, abrir el **Editor** para refinarla, o **Exportar en alta resolución**: la descarga estándar es gratis, y el upscale a **4K cuesta 5 créditos**.",
      },
      { type: "h2", text: "Escribiendo buenos detalles de escena" },
      {
        type: "p",
        text: "El campo de detalles no necesita frases elaboradas — palabras clave separadas por comas funcionan mejor. Describe lo que la IA no puede adivinar del modelo:",
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
        text: "Si el render sale oscuro o con zonas “inventadas”, vuelve a la pestaña Escenas y aclara la iluminación — generalmente la IA no estaba viendo esa parte del modelo.",
      },
      { type: "cost", text: "4 créditos por render · upscale 4K opcional por 5 créditos" },
    ],
  },

  "editar-render": {
    title: "Editor: inpaint, nuevas perspectivas y ajustes profesionales",
    excerpt:
      "Todo de la ventana Editar Render: corrige áreas específicas con IA, genera nuevos ángulos y closeups desde un render listo, recorta y termina la foto — sin rehacer el render.",
    blocks: [
      {
        type: "p",
        text: "¿Generaste un buen render pero el sofá quedó raro? ¿Quieres el mismo ambiente desde otro ángulo, o un closeup de la encimera para la presentación? Para eso existe el **Editor** — haz clic en **Editar** sobre cualquier render y se abre en una ventana dedicada con tres pestañas: **Edición con IA**, **Recorte** y **Ajustes**.",
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
            text: "Cada edición cuesta 4 créditos y entra al historial lateral — navega entre versiones y mantén presionado el botón Antes/Después para comparar con el original.",
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
        text: "Sin ninguna máscara, el comando vale para toda la imagen — útil para cambios globales como “hacerlo nocturno” o “cambiar el color de las paredes”.",
      },
      { type: "h2", text: "Nuevas perspectivas: varias escenas desde un render" },
      {
        type: "p",
        text: "Este es uno de los recursos más potentes del Editor: pide **otro ángulo** del mismo ambiente directamente en el campo de texto, sin mover la cámara en SketchUp y sin gastar un render nuevo desde cero. La IA entiende la intención de tu comando:",
      },
      {
        type: "ul",
        items: [
          "**“Closeup del sillón”** — marca el sillón (o solo escríbelo) y recibe un detalle aproximado, con materiales e iluminación preservados.",
          "**“Vista lateral del ambiente”** o **“nueva perspectiva mostrando la cocina desde la derecha”** — genera el mismo espacio visto desde otro punto.",
          "**“Vista de dron”** — aleja y eleva la cámara para una toma aérea.",
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
        text: "En la práctica, un único render de 4 créditos se vuelve la base de una **presentación completa**: genera la vista general, luego pide closeups de los detalles y ángulos alternativos por 4 créditos cada uno — mucho más rápido que reposicionar la cámara y re-renderizar cada vista.",
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
        text: "Al hacer clic en **Finalizar Edición**, la versión final vuelve al panel principal — lista para convertirse en video, 360 o upscale 4K.",
      },
      { type: "cost", text: "Edición con IA y nuevas perspectivas: 4 créditos cada una · Recorte, Ajustes y descarga 2K: gratis" },
    ],
  },

  "reflexo-espelho": {
    title: "Reflejo de Espejo: espejos realistas en interiores",
    excerpt:
      "SketchUp no renderiza reflejos — Vizai lo resuelve generando el reflejo real del ambiente en la cara del espejo, gratis, antes del render.",
    blocks: [
      {
        type: "p",
        text: "Los espejos son un problema clásico: SketchUp muestra una cara gris, y la IA, sin referencia, inventa un reflejo cualquiera. La herramienta **Reflejo de Espejo** (en la pestaña Escenas) proyecta en la cara del espejo lo que **realmente reflejaría** — y entonces renderizas, con el espejo coherente con el ambiente.",
      },
      {
        type: "video",
        src: "/treinamento/ui/reflexo-espelho.mp4",
        caption: "Reflejo de Espejo aplicado directo en la pestaña Escenas, sin costo de créditos.",
      },
      { type: "h2", text: "Cómo usarla" },
      {
        type: "steps",
        items: [
          {
            title: "Guarda la escena",
            text: "Deja la viewport en la vista que vas a renderizar y guárdala como una escena. El reflejo queda vinculado a esa escena.",
          },
          {
            title: "Haz clic en el botón y en la cara del espejo",
            text: "Haz clic en **Generar Reflejo en la Escena** y luego en la cara que representa el vidrio del espejo — se ilumina en azul. No necesitas entrar al grupo, y funciona con espejos de varias caras coplanares.",
          },
          {
            title: "Repite en todos los espejos que quieras",
            text: "Puedes generar el reflejo en varios espejos en la misma escena. Pulsa **ESC** para salir de la herramienta cuando termines.",
          },
        ],
      },
      {
        type: "p",
        text: "El plugin refleja la cámara de la escena por el plano del espejo, captura lo que el espejo realmente reflejaría y lo proyecta en la cara — en segundos, **sin costo de créditos**, porque todo sucede localmente en tu SketchUp.",
      },
      {
        type: "warn",
        text: "El reflejo queda **guardado en la escena** y desaparece al cambiar de escena — genera uno por escena. Si cambias la vista de la escena después, rehaz el reflejo antes de renderizar.",
      },
      {
        type: "tip",
        text: "Úsalo en baños, vestidores, halls y gimnasios — ambientes donde el espejo domina la pared. La diferencia en el realismo del render final es enorme.",
      },
      { type: "cost", text: "Gratis — procesado localmente, sin créditos" },
    ],
  },

  "decorar-ambiente": {
    title: "Decorar Ambiente: muebles y decoración con IA en espacios vacíos",
    excerpt:
      "El virtual staging de Vizai: sube un ambiente vacío, elige el tipo de espacio y los estilos de decoración, y la IA crea un layout completo.",
    blocks: [
      {
        type: "p",
        text: "**Decorar Ambiente** es la herramienta de virtual staging de la IA Creativa: amuebla y decora un espacio a partir de una imagen base. Perfecta para mostrar el potencial de espacios vacíos — inmuebles en plano, reformas, home staging para venta.",
      },
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
            text: "Arrastra una foto o render del ambiente (JPG/PNG hasta 5MB), o captura directo desde la viewport.",
          },
          {
            title: "Configura el estilo",
            text: "Elige el tipo de ambiente, los estilos de decoración y el horario (día o noche).",
          },
          {
            title: "Genera",
            text: "3 créditos por imagen. El resultado llega con Antes/Después para comparar con la base.",
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
      { type: "h2", text: "Tipos de ambiente y estilos" },
      {
        type: "p",
        text: "Son **13 tipos de ambiente** — Sala, Dormitorio, Cocina, Baño, Oficina, Balcón, Garaje, Hall, Piscina, Cava, Despensa, Comedor y Espacio Gourmet — y **8 estilos de decoración** que puedes combinar: Moderno, Minimalista, Clásico, Industrial, Escandinavo, Rústico, Contemporáneo y Tropical. Activa más de uno para un mix (ej.: Moderno + Escandinavo), o ninguno para dejar a la IA libre.",
      },
      {
        type: "tip",
        text: "Para el mejor resultado, usa una imagen del ambiente **sin mobiliario**: con paredes, piso y estructura bien visibles, la IA ubica los muebles con mucha más precisión.",
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },

  "planta-humanizada": {
    title: "Planta Renderizada: del dibujo técnico a la presentación",
    excerpt:
      "Convierte la planta de tu modelo (o un dibujo de tu PC) en una planta renderizada, lista para presentar al cliente.",
    blocks: [
      {
        type: "p",
        text: "La **Planta Renderizada** convierte un dibujo técnico — la vista superior de tu modelo o una planta que ya tienes en imagen — en una planta renderizada con pisos, muebles, vegetación y sombras, al estilo de las presentaciones de lanzamientos inmobiliarios.",
      },
      {
        type: "compare",
        aspect: "4 / 5",
        before: { src: "/tools/tool-08-before.webp", label: "Planta técnica" },
        after: { src: "/tools/tool-08.jpg", label: "Planta humanizada" },
      },
      { type: "h2", text: "Capturando la planta desde la viewport" },
      {
        type: "steps",
        items: [
          {
            title: "Vista superior",
            text: "En SketchUp, pon la cámara en Cámara → Vistas Estándar → Superior.",
          },
          {
            title: "Proyección Paralela",
            text: "Activa Cámara → Proyección Paralela — elimina la perspectiva y deja la planta “recta”, como un dibujo técnico.",
          },
          {
            title: "Encuadra y captura",
            text: "Ajusta el zoom para que la planta llene la viewport y haz clic en Capturar Escena Actual en el plugin.",
          },
        ],
      },
      {
        type: "p",
        text: "También puedes saltarte la captura y **subir una imagen desde tu PC** — funciona con plantas exportadas de AutoCAD, Revit o hasta una foto de un dibujo, siempre que las paredes sean legibles.",
      },
      { type: "h2", text: "Observaciones que hacen la diferencia" },
      {
        type: "p",
        text: "En el campo de observaciones, describe materiales y paleta: “piso de porcelanato claro, sofá de lino, carpintería de madera natural, plantas decorativas”. La IA mantiene el trazado de las paredes y aplica los acabados descritos.",
      },
      {
        type: "tip",
        text: "Captura con los nombres de ambientes y cotas apagados si quieres una planta limpia — o mantén los textos si la presentación pide la planta anotada.",
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },

  diagrama: {
    title: "Diagrama: vistas isométricas y axonométricas con 5 estilos",
    excerpt:
      "Genera diagramas conceptuales de tu proyecto — del isométrico técnico en B&N a la maqueta física en madera balsa — desde una captura de la viewport.",
    blocks: [
      {
        type: "p",
        text: "La herramienta **Diagrama** convierte una vista isométrica de tu modelo en láminas conceptuales con lenguaje de estudio de arquitectura — ideales para concursos, láminas de presentación y redes sociales.",
      },
      {
        type: "img",
        src: "/tools/tool-09.png",
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
            text: "Activa Cámara → Proyección Paralela para el efecto axonométrico correcto, sin fuga.",
          },
          {
            title: "Captura o sube",
            text: "Usa Capturar Escena Actual, o sube una imagen desde tu PC.",
          },
        ],
      },
      { type: "h2", text: "Los 5 estilos" },
      {
        type: "p",
        text: "Primero elige el contexto — **Exterior** (con entorno) o **Interiores** (ambientes aislados) — y después el estilo:",
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/tecnico.webp",
            alt: "Diagrama isométrico técnico",
            caption: "Isométrico Técnico — líneas B&N con entorno urbano.",
          },
          {
            src: "/demo/assets/diag/destaque.webp",
            alt: "Diagrama con destaque",
            caption: "Con Destaque — proyecto en color, entorno en gris.",
          },
          {
            src: "/demo/assets/diag/colorido.webp",
            alt: "Diagrama colorido con contexto",
            caption: "Colorido — ilustración acuarelada con entorno.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/maquete.webp",
            alt: "Diagrama estilo maqueta física",
            caption: "Maqueta Física — estilo madera balsa.",
          },
          {
            src: "/demo/assets/diag/int_axo.webp",
            alt: "Diagrama axonométrico de interiores",
            caption: "Axonométrico — corte isométrico del ambiente interno.",
          },
        ],
      },
      {
        type: "tip",
        text: "El estilo Con Destaque es el favorito para concursos y posts: el ojo va directo al proyecto, y el entorno en gris da contexto sin competir.",
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },

  moodboard: {
    title: "Moodboard: paneles de materiales y concepto en un clic",
    excerpt:
      "Crea moodboards profesionales desde una imagen de referencia — 7 composiciones de escena y 5 proporciones, del flat lay al panel de presentación.",
    blocks: [
      {
        type: "p",
        text: "El **Moodboard** genera paneles de referencia visual — muestras de materiales, paleta y objetos — a partir de una imagen base de tu proyecto o de referencias. Es la herramienta para el inicio de la conversación con el cliente: presenta el concepto antes incluso del primer render.",
      },
      {
        type: "img",
        src: "/tools/tool-06.jpg",
        alt: "Moodboard generado por Vizai Render",
        caption: "Moodboard generado con muestras de materiales del proyecto.",
      },
      { type: "h2", text: "Composiciones disponibles" },
      {
        type: "p",
        text: "Son **7 estilos de composición** — la “escena” donde se fotografían las muestras:",
      },
      {
        type: "ul",
        items: [
          "**Banco Studio** — superficie premium con fondo en degradado suave.",
          "**Mesa de Proyecto** — sobre mesa de trabajo, fondo semidesenfocado.",
          "**Vista Superior** — flat lay directo desde arriba, sin perspectiva.",
          "**Panel de Presentación** — muestras fijadas en un tablero vertical.",
          "**Suelo Iluminado** — flat lay en piso de madera con luz lateral.",
          "**Línea de Materiales** — muestras alineadas en fila horizontal.",
          "**Alfombra Decorada** — composición 3/4 sobre alfombra con objetos.",
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
      {
        type: "p",
        text: "El moodboard sale en el formato correcto para su destino: **1:1** (Instagram clásico), **4:3** (presentaciones), **16:9** (pantallas y portafolio), **4:5** (feed vertical) y **9:16** (Stories y Reels).",
      },
      {
        type: "tip",
        text: "Usa como base una imagen que ya contenga los materiales del proyecto (un render tuyo, o un collage de referencias). La IA extrae la paleta y los materiales de ella.",
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },

  "video-com-ia": {
    title: "Video con IA: anima tus renders con cámara cinematográfica",
    excerpt:
      "Convierte un render en un video de 4 a 15 segundos con movimiento de cámara profesional y sonido ambiente generado por IA — directo desde el plugin.",
    blocks: [
      {
        type: "p",
        text: "La pestaña **Video** convierte cualquier render en un clip cinematográfico usando **Kling 3.0 Pro**, uno de los motores de video más avanzados del mundo. El resultado sale en **1080p**, con movimiento de cámara suave y, si quieres, sonido ambiente generado por IA.",
      },
      {
        type: "video",
        src: "/tools/tool-03.mp4",
        caption: "Video generado desde un render del plugin.",
      },
      { type: "h2", text: "Montando el video" },
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
            title: "Frame inicial",
            text: "El punto de partida del video: usa el último render, elige del historial o sube desde tu PC.",
          },
          {
            title: "Frame final (opcional)",
            text: "Define también la imagen de llegada y la IA crea la transición entre las dos — ideal para un “tour” entre dos ángulos del ambiente.",
          },
          {
            title: "Proporción",
            text: "16:9 paisaje, 1:1 cuadrado o 9:16 vertical para Reels y Stories.",
          },
          {
            title: "Cámara y audio",
            text: "Elige el movimiento y el sonido en el modal de configuración (detalles abajo).",
          },
          {
            title: "Duración",
            text: "4, 6, 8, 10 o 15 segundos — el costo aparece en el botón antes de generar.",
          },
        ],
      },
      { type: "h2", text: "Movimientos de cámara" },
      {
        type: "img",
        src: "/treinamento/ui/modal-camera-{lang}.webp",
        alt: "Modal de cámara y audio del video",
        caption: "8 movimientos listos + descripción libre del movimiento.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Automático** — movimiento natural elegido por la IA (recomendado).",
          "**Zoom In / Zoom Out** — acercamiento o alejamiento suave.",
          "**Panorámica izquierda / derecha** — deslizamiento lateral.",
          "**Tilt Up / Tilt Down** — inclinación hacia arriba o abajo.",
          "**Órbita (Dron)** — giro suave alrededor del proyecto.",
        ],
      },
      {
        type: "p",
        text: "¿Prefieres dirigir la escena? Describe el movimiento libremente (“la cámara avanza despacio por la sala revelando el balcón”) y usa las **Observaciones** para pedir foco en algún elemento. En el audio, elige **Sonido Ambiente por IA** — viento, pasos, sonidos urbanos, gratis — o video mudo para editar después.",
      },
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
      {
        type: "tip",
        text: "Los videos de 4–6 segundos con movimiento Automático o Zoom In son los que más convierten en redes sociales — y los más baratos. Empieza por ahí.",
      },
    ],
  },

  "panorama-360": {
    title: "Panorama 360°: presentaciones inmersivas que el cliente explora",
    excerpt:
      "Genera un panorama esférico del ambiente y envíalo por link o WhatsApp — el cliente gira, hace zoom y explora el espacio en el navegador, sin instalar nada.",
    blocks: [
      {
        type: "p",
        text: "La pestaña **360** cose vistas de tu ambiente en un **panorama esférico interactivo**. El cliente recibe un link, lo abre en el navegador (computadora o celular) y explora el espacio girando la imagen — la experiencia más cercana a “estar dentro” del proyecto.",
      },
      {
        type: "img",
        src: "/demo/360/pano-result.webp",
        alt: "Panorama 360 generado por Vizai Render",
        caption: "El panorama equirectangular generado — listo para el visor interactivo.",
      },
      { type: "h2", text: "Cómo generarlo" },
      {
        type: "img",
        src: "/treinamento/ui/pano-{lang}.webp",
        alt: "Pestaña 360 de Vizai Render",
        caption: "La pestaña 360: sube 4 renders desde el mismo punto central.",
        ui: true,
      },
      {
        type: "p",
        text: "Renderiza **4 vistas desde el mismo punto central** — frente, derecha, atrás e izquierda, en 16:9 o 1:1 — y carga cada una en su posición correspondiente. La IA cose las cuatro en un panorama esférico continuo del ambiente.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Pon la cámara en el centro del ambiente",
            text: "Altura de ojos (~1,60m) y el mismo punto para las 4 vistas.",
          },
          {
            title: "Renderiza y sube las 4 vistas",
            text: "Frente, derecha, atrás e izquierda (16:9 o 1:1), cada una en su posición correspondiente.",
          },
          {
            title: "Genera el 360",
            text: "5 créditos. La IA cose las 4 vistas en un panorama esférico continuo.",
          },
          {
            title: "Comparte",
            text: "Visualízalo en el plugin, descarga la imagen, copia el link o envíalo directo por WhatsApp.",
          },
        ],
      },
      {
        type: "tip",
        text: "Para el 360 fotorrealista: renderiza las 4 vistas con el mismo clima y estilo (misma configuración en el Estudio) — la costura se vuelve invisible cuando la iluminación coincide entre vistas.",
      },
      { type: "cost", text: "5 créditos por panorama · link para compartir gratis" },
    ],
  },

  "blocos-3d": {
    title: "Bloques 3D: convierte cualquier foto en un modelo para SketchUp",
    excerpt:
      "¿Viste la silla perfecta en una referencia? La pestaña Bloques convierte la foto en un modelo 3D texturizado y lo importa directo a tu escena.",
    blocks: [
      {
        type: "p",
        text: "La pestaña **Bloques** resuelve un clásico: el cliente quiere un mueble específico que no existe en el 3D Warehouse. Envía una foto de referencia y la IA reconstruye el objeto en 3D, con textura, listo para importar a la escena en la escala correcta.",
      },
      {
        type: "img",
        src: "/tools/tool-05.webp",
        alt: "Bloque 3D generado desde una foto",
        caption: "De la foto de referencia al bloque 3D en la escena.",
      },
      { type: "h2", text: "Cómo generarlo" },
      {
        type: "img",
        src: "/treinamento/ui/blocos-{lang}.webp",
        alt: "Pestaña Bloques de Vizai Render",
        caption: "La pestaña Bloques: foto, densidad de malla y textura.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Agrega la foto de referencia",
            text: "Arrastra o haz clic para subirla. Funciona mejor con el objeto completo visible, bien iluminado y con fondo limpio.",
          },
          {
            title: "Nombra el bloque",
            text: "El nombre organiza el componente en tu modelo (ej.: “Silla de Madera”).",
          },
          {
            title: "Elige la densidad de polígonos",
            text: "Ligero, Recomendado, Pesado o Ultra. Para SketchUp, Ligero o Recomendado mantienen el archivo ágil.",
          },
          {
            title: "Textura",
            text: "Con textura PBR (colores y materiales de la foto) o solo geometría, para aplicar tus propios materiales.",
          },
          {
            title: "Importa o descarga",
            text: "Importar en la escena coloca el bloque directo en el modelo; o descarga el .GLB para usarlo en cualquier software.",
          },
        ],
      },
      {
        type: "warn",
        text: "Los bloques con densidad Pesado/Ultra pueden hacer lento el archivo en modelos grandes. Si te pasas, la ventana Tools (Impacto de los Componentes) muestra qué bloques están pesando — y la guía de Optimizar Archivo lo resuelve.",
      },
      { type: "cost", text: "28 créditos por bloque generado" },
    ],
  },

  "otimizar-arquivo": {
    title: "Tools — Optimizar Archivo: deja tu .skp ligero gratis",
    excerpt:
      "Purge inteligente, materiales duplicados, reducción de texturas e informe de impacto de los componentes — la limpieza completa del archivo, 100% local y gratuita.",
    blocks: [
      {
        type: "p",
        text: "¿Archivo trabado, órbita entrecortada, .skp de cientos de MB? La ventana **Tools** (pestaña lateral verde del panel) incluye **Optimizar Archivo**: un conjunto de limpiezas que corre 100% en tu computadora, **sin costar créditos**. El tamaño del archivo aparece arriba, antes y después — ves el resultado al instante.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-otimizar-{lang}.webp",
        alt: "Ventana Tools con la pestaña Optimizar Archivo",
        caption: "Optimizar Archivo: Limpieza, Texturas e Impacto.",
        ui: true,
      },
      { type: "h2", text: "Limpieza" },
      {
        type: "ul",
        items: [
          "**Purge** — elimina materiales, componentes y estilos que no se usan en nada en el proyecto. Es la limpieza que más reduce archivos que pasaron por muchas versiones.",
          "**Materiales Duplicados** — une materiales que usan la misma textura con nombres distintos (Madera, Madera1, Madera-copy…), común en modelos armados con bloques de orígenes variados.",
        ],
      },
      { type: "h2", text: "Texturas" },
      {
        type: "p",
        text: "El **Gestor de Texturas** lista todas las imágenes del modelo con sus dimensiones. Texturas 4K en el tirador de un cajón son peso muerto: selecciona las exageradas y redúcelas a la resolución objetivo en un clic. El aspecto en la viewport casi no cambia — el tamaño del archivo, sí.",
      },
      { type: "h2", text: "Impacto" },
      {
        type: "p",
        text: "El informe de **Impacto de los Componentes** muestra qué bloques tienen más geometría (caras) y cuántas instancias existen de cada uno. Así descubres que un árbol bajado del Warehouse tiene 800 mil caras — y que está repetido 12 veces. El botón Ver localiza el componente en el modelo para que decidas qué hacer.",
      },
      {
        type: "tip",
        text: "Corre Optimizar Archivo antes de renderizar proyectos grandes: modelo ligero = viewport fluida = captura más rápida. Y haz respaldo la primera vez que corras limpiezas pesadas en un archivo importante.",
      },
      { type: "cost", text: "Gratis — procesado localmente, sin créditos" },
    ],
  },

  "pisos-seamless": {
    title: "Tools — Pisos Seamless: despiece de pisos profesional en segundos",
    excerpt:
      "Crea texturas de piso continuas desde cualquier imagen: porcelanato, madera con variaciones, junta configurable y aplicación directa en las caras.",
    blocks: [
      {
        type: "p",
        text: "La segunda herramienta de la ventana **Tools** arma **texturas de piso seamless** a partir de imágenes sueltas — esa foto de porcelanato del sitio del proveedor se convierte en un piso despiezado, con junta y en la dimensión real de la pieza. También es local y gratuita.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-pisos-{lang}.webp",
        alt: "Pestaña Pisos Seamless de la ventana Tools",
        caption: "Vista previa en vivo del despiece, con junta y dimensiones reales.",
        ui: true,
      },
      { type: "h2", text: "Armando el piso" },
      {
        type: "steps",
        items: [
          {
            title: "Textura base",
            text: "Sube la imagen de la pieza (foto del porcelanato, de la madera, del azulejo).",
          },
          {
            title: "Variaciones (opcional)",
            text: "Agrega hasta 3 imágenes alternativas de la misma línea — el plugin intercala las piezas y elimina el efecto de repetición, esencial en maderas.",
          },
          {
            title: "Despiece y rotación",
            text: "Cuadrícula Recta (alineada), Trabado 50% o Trabado 1/3 — y gira la pieza si lo necesitas (tablones en vertical, por ejemplo).",
          },
          {
            title: "Dimensiones reales",
            text: "Ancho y alto de la pieza en centímetros (90×90, 20×120…). La textura entra a SketchUp ya en la escala correcta.",
          },
          {
            title: "Junta",
            text: "Grosor en milímetros y color — gris, beige, negra o combinando con la pieza.",
          },
        ],
      },
      { type: "h2", text: "Aplicando al modelo" },
      {
        type: "p",
        text: "La vista previa muestra el despiece en tiempo real. Para aplicar: **selecciona las caras del piso** en SketchUp antes de hacer clic en Aplicar Textura — el material se crea y se mapea directo en ellas. Sin selección, el plugin activa el bote de pintura para que hagas clic donde quieras.",
      },
      {
        type: "tip",
        text: "Pisos con despiece y junta correctos elevan el realismo del render: la IA respeta el dibujo del piso que ve en la escena. Arma el piso aquí antes de renderizar en el Estudio.",
      },
      { type: "cost", text: "Gratis — procesado localmente, sin créditos" },
    ],
  },
};
