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
      "El virtual staging de Vizai: sube un ambiente vacío, elige el tipo de espacio y los estilos de decoración, y la IA crea un layout completo.",
    blocks: [
      {
        type: "p",
        text: "**Decorar Ambiente** es la herramienta de virtual staging de la IA Creativa: amuebla y decora un espacio a partir de una imagen base. Perfecta para mostrar el potencial de espacios vacíos. Inmuebles en plano, reformas, home staging para venta.",
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
        text: "Son **13 tipos de ambiente** (Sala, Dormitorio, Cocina, Baño, Oficina, Balcón, Garaje, Hall, Piscina, Cava, Despensa, Comedor y Espacio Gourmet) y **8 estilos de decoración** que puedes combinar: Moderno, Minimalista, Clásico, Industrial, Escandinavo, Rústico, Contemporáneo y Tropical. Activa más de uno para un mix (ej.: Moderno + Escandinavo), o ninguno para dejar a la IA libre.",
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
        text: "La **Planta Renderizada** convierte un dibujo técnico (la vista superior de tu modelo o una planta que ya tienes en imagen) en una planta renderizada con pisos, muebles, vegetación y sombras, al estilo de las presentaciones de lanzamientos inmobiliarios.",
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
            text: "Activa Cámara → Proyección Paralela: elimina la perspectiva y deja la planta “recta”, como un dibujo técnico.",
          },
          {
            title: "Encuadra y captura",
            text: "Ajusta el zoom para que la planta llene la viewport y haz clic en Capturar Escena Actual en el plugin.",
          },
        ],
      },
      {
        type: "p",
        text: "También puedes saltarte la captura y **subir una imagen desde tu PC**. Funciona con plantas exportadas de AutoCAD, Revit o hasta una foto de un dibujo, siempre que las paredes sean legibles.",
      },
      { type: "h2", text: "Observaciones que hacen la diferencia" },
      {
        type: "p",
        text: "En el campo de observaciones, describe materiales y paleta: “piso de porcelanato claro, sofá de lino, carpintería de madera natural, plantas decorativas”. La IA mantiene el trazado de las paredes y aplica los acabados descritos.",
      },
      {
        type: "tip",
        text: "Captura con los nombres de ambientes y cotas apagados si quieres una planta limpia, o mantén los textos si la presentación pide la planta anotada.",
      },
      { type: "cost", text: "3 créditos por generación" },
    ],
  },

  diagrama: {
    title: "Diagrama: vistas isométricas y axonométricas con 5 estilos",
    excerpt:
      "Genera diagramas conceptuales de tu proyecto (del isométrico técnico en B&N a la maqueta física en madera balsa) desde una captura de la viewport.",
    blocks: [
      {
        type: "p",
        text: "La herramienta **Diagrama** convierte una vista isométrica de tu modelo en láminas conceptuales con lenguaje de estudio de arquitectura. Ideales para concursos, láminas de presentación y redes sociales.",
      },
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
        text: "Primero elige el contexto: **Exterior** (con entorno) o **Interiores** (ambientes aislados). Después el estilo:",
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/tecnico.webp",
            alt: "Diagrama isométrico técnico",
            caption: "Isométrico Técnico: líneas B&N con entorno urbano.",
          },
          {
            src: "/demo/assets/diag/destaque.webp",
            alt: "Diagrama con destaque",
            caption: "Con Destaque: proyecto en color, entorno en gris.",
          },
          {
            src: "/demo/assets/diag/colorido.webp",
            alt: "Diagrama colorido con contexto",
            caption: "Colorido: ilustración acuarelada con entorno.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/maquete.webp",
            alt: "Diagrama estilo maqueta física",
            caption: "Maqueta Física: estilo madera balsa.",
          },
          {
            src: "/demo/assets/diag/int_axo.webp",
            alt: "Diagrama axonométrico de interiores",
            caption: "Axonométrico: corte isométrico del ambiente interno.",
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
      "Crea moodboards profesionales desde una imagen de referencia: 7 composiciones de escena y 5 proporciones, del flat lay al panel de presentación.",
    blocks: [
      {
        type: "p",
        text: "El **Moodboard** genera paneles de referencia visual (muestras de materiales, paleta y objetos) a partir de una imagen base de tu proyecto o de referencias. Es la herramienta para el inicio de la conversación con el cliente: presenta el concepto antes incluso del primer render.",
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
        text: "Son **7 estilos de composición**: la “escena” donde se fotografían las muestras:",
      },
      {
        type: "ul",
        items: [
          "**Banco Studio**: superficie premium con fondo en degradado suave.",
          "**Mesa de Proyecto**: sobre mesa de trabajo, fondo semidesenfocado.",
          "**Vista Superior**: flat lay directo desde arriba, sin perspectiva.",
          "**Panel de Presentación**: muestras fijadas en un tablero vertical.",
          "**Suelo Iluminado**: flat lay en piso de madera con luz lateral.",
          "**Línea de Materiales**: muestras alineadas en fila horizontal.",
          "**Alfombra Decorada**: composición 3/4 sobre alfombra con objetos.",
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




};
