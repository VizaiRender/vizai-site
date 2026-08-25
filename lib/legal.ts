import type { Lang } from "@/app/components/LanguageProvider";

export type LegalBlock =
  | { type: "p"; lead?: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: { lead?: string; text: string }[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDoc = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const SUPPORT_EMAIL = "suporte@vizairender.com";

// ---------------------------------------------------------------------------
// Privacy Policy
// ---------------------------------------------------------------------------

const privacyPt: LegalDoc = {
  title: "Política de Privacidade",
  lastUpdated: "Última atualização: 25 de agosto de 2026",
  sections: [
    {
      heading: "1. Introdução",
      blocks: [
        {
          type: "p",
          text: "Bem-vindo ao Vizai Render. Nós respeitamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e salvaguardamos suas informações quando você utiliza nosso plugin e nosso site.",
        },
      ],
    },
    {
      heading: "2. Dados que Coletamos",
      blocks: [
        {
          type: "p",
          text: "Para fornecer nossos serviços de renderização com Inteligência Artificial, podemos coletar as seguintes informações:",
        },
        {
          type: "ul",
          items: [
            { lead: "Dados de Conta:", text: "Nome e endereço de e-mail obtidos via autenticação Google OAuth no momento do cadastro." },
            { lead: "Dados de Uso e Imagens:", text: "Capturas de tela das suas cenas 3D no SketchUp e configurações de renderização (estilo, qualidade, formato) que você envia para processamento pela nossa IA. Essas imagens são transmitidas para provedores de IA terceiros (Google Cloud e Fal.ai) exclusivamente para processar sua solicitação e não são armazenadas permanentemente após a conclusão da renderização." },
            { lead: "Dados Técnicos:", text: "Endereço IP, versão do SketchUp e identificador de dispositivo. O identificador de dispositivo é utilizado exclusivamente para concessão única dos créditos gratuitos de boas-vindas e prevenção de abuso. Não é usado para rastreamento ou publicidade." },
            { lead: "Dados de Sessão Local:", text: "O plugin armazena seu token de autenticação nas preferências locais do SketchUp no seu computador, para manter você conectado entre sessões. Esse dado permanece no seu dispositivo e não é compartilhado." },
            { lead: "Dados de Pagamento:", text: "Processamos transações financeiras exclusivamente através do Stripe. Não armazenamos dados de cartão de crédito em nossos servidores." },
            { lead: "Dados de Navegação e Publicidade:", text: "Quando você visita nosso site, coletamos endereço IP, informações do navegador e do dispositivo, páginas visitadas, cliques e rolagem, além de identificadores gravados em cookies. Se você já estiver conectado à sua conta e iniciar uma compra, geramos também um código derivado do seu e-mail para medir a eficácia dos nossos anúncios. A seção 5 detalha essas ferramentas e como recusá-las." },
          ],
        },
      ],
    },
    {
      heading: "3. Como Usamos Seus Dados",
      blocks: [
        { type: "p", text: "Utilizamos as informações coletadas para as seguintes finalidades:" },
        {
          type: "ul",
          items: [
            { text: "Processar suas cenas 3D através de modelos de IA (Google Gemini para análise e enriquecimento de cena; Google Imagen / Vertex AI para geração de imagem; Fal.ai / Kling para geração de vídeo) e entregar o resultado final no plugin." },
            { text: "Gerenciar sua conta, autenticar seu acesso, processar pagamentos e administrar seu saldo de créditos." },
            { text: "Detectar e prevenir uso abusivo (ex.: criação de múltiplas contas para acumular créditos gratuitos) por meio de identificadores de dispositivo." },
            { text: "Enviar comunicados administrativos e fornecer suporte técnico." },
            { text: "Medir o desempenho dos nossos anúncios e exibir anúncios a quem já visitou o site, conforme detalhado na seção 5." },
            { text: "Melhorar a qualidade dos resultados gerados e a experiência geral do serviço." },
          ],
        },
      ],
    },
    {
      heading: "4. Compartilhamento de Dados",
      blocks: [
        { type: "p", text: "Nós não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações apenas nas seguintes situações:" },
        {
          type: "ul",
          items: [
            { lead: "Provedores de IA:", text: "Google Cloud (Vertex AI / Gemini / Imagen) para processamento de imagens e Fal.ai (Kling) para geração de vídeo. Suas imagens são enviadas a esses provedores somente para executar a renderização solicitada, conforme suas respectivas políticas de privacidade." },
            { lead: "Infraestrutura:", text: "Google Cloud Run (hospedagem do servidor), Supabase (banco de dados e autenticação) e Stripe (pagamentos), todos obrigados por contrato a proteger seus dados." },
            { lead: "Medição e Publicidade:", text: "Meta Platforms (Pixel e Conversions API), Google (Google Analytics 4 e Google Tag Manager), e Stape (servidor de etiquetas que intermedia esses envios). Compartilhamos com essas empresas dados de navegação e identificadores. Nunca compartilhamos o conteúdo das suas cenas 3D ou das imagens geradas. A seção 5 explica em detalhe o que é enviado e como recusar." },
            { lead: "Obrigação Legal:", text: "Se exigido por lei, regulação ou em resposta a processos legais válidos." },
          ],
        },
      ],
    },
    {
      heading: "5. Cookies, Medição e Publicidade",
      blocks: [
        { type: "p", text: "Nosso site usa cookies e tecnologias semelhantes para funcionar, para entender como as pessoas navegam e para medir o resultado dos nossos anúncios. O plugin dentro do SketchUp não faz nada disso. Tudo o que esta seção descreve acontece somente no site." },
        { type: "h3", text: "Ferramentas que utilizamos" },
        {
          type: "ul",
          items: [
            { lead: "Google Tag Manager:", text: "Organiza o carregamento das demais ferramentas. É carregado através do endereço sst.vizairender.com, que é nosso e é operado pela Stape." },
            { lead: "Google Analytics 4:", text: "Estatísticas de audiência: páginas visitadas, origem da visita, tempo de permanência e interações de interesse, como o clique em um plano. Não enviamos seu nome nem seu e-mail para o Google Analytics." },
            { lead: "Meta Pixel e Conversions API:", text: "Medem quantas pessoas que viram nossos anúncios no Facebook e no Instagram visitaram o site, iniciaram uma compra ou compraram, e permitem exibir anúncios para quem já nos visitou. São enviados endereço IP, informações do navegador, identificadores gravados em cookies, o identificador do clique no anúncio e, quando você está conectado à sua conta, um código derivado do seu e-mail (hash SHA-256). Enviamos esse código, e não o seu e-mail em texto legível." },
          ],
        },
        { type: "h3", text: "Cookies que utilizamos" },
        {
          type: "ul",
          items: [
            { lead: "Necessários:", text: "Mantêm você conectado à sua conta e preservam preferências como idioma e tema. Sem eles o site não funciona corretamente." },
            { lead: "Medição e publicidade:", text: "Guardam identificadores do navegador e o identificador do clique no anúncio que trouxe você até aqui. O identificador do clique dura 90 dias. Os demais variam conforme a ferramenta." },
          ],
        },
        { type: "p", text: "Você pode limitar ou bloquear esses cookies a qualquer momento nas configurações de privacidade e rastreamento do seu navegador, e ajustar as preferências de anúncios diretamente na sua conta do Facebook e do Instagram. Meta, Google e Stape são empresas estrangeiras, portanto os dados descritos nesta seção são tratados fora do Brasil." },
      ],
    },
    {
      heading: "6. Segurança e Retenção dos Dados",
      blocks: [
        {
          type: "p",
          text: "Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados, incluindo comunicação exclusivamente via HTTPS, autenticação por JWT e controle de acesso por função (RLS) no banco de dados. As cenas 3D e imagens enviadas para processamento são tratadas de forma transitória. Não são armazenadas permanentemente em nossos servidores após a conclusão da renderização. Dados de conta (nome, e-mail, saldo de créditos) são retidos enquanto sua conta estiver ativa. Ao solicitar a exclusão da conta, removemos seus dados pessoais em até 30 dias.",
        },
      ],
    },
    {
      heading: "7. Seus Direitos",
      blocks: [
        {
          type: "p",
          text: "Você tem o direito de solicitar acesso, correção ou exclusão de suas informações pessoais armazenadas conosco. Se você estiver no Brasil, a Lei Geral de Proteção de Dados também lhe garante o direito de confirmar a existência do tratamento, solicitar a portabilidade dos seus dados e se opor às atividades de medição e publicidade descritas na seção 5. Para solicitar a exclusão da sua conta ou exercer qualquer outro direito de privacidade, entre em contato através dos nossos canais de suporte.",
        },
      ],
    },
    {
      heading: "8. Contato",
      blocks: [
        {
          type: "p",
          text: "Para qualquer dúvida, comentário ou solicitação relacionada a esta Política de Privacidade, entre em contato via WhatsApp através do link em nosso rodapé ou envie um e-mail para {email}.",
        },
      ],
    },
  ],
};

const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: August 25, 2026",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        {
          type: "p",
          text: "Welcome to Vizai Render. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you use our plugin and our website.",
        },
      ],
    },
    {
      heading: "2. Data We Collect",
      blocks: [
        {
          type: "p",
          text: "To provide our AI-powered rendering services, we may collect the following information:",
        },
        {
          type: "ul",
          items: [
            { lead: "Account Data:", text: "Name and email address obtained via Google OAuth authentication at sign-up." },
            { lead: "Usage and Image Data:", text: "Screenshots of your 3D scenes in SketchUp and rendering settings (style, quality, format) that you send for processing by our AI. These images are transmitted to third-party AI providers (Google Cloud and Fal.ai) solely to process your request and are not stored permanently after the rendering is completed." },
            { lead: "Technical Data:", text: "IP address, SketchUp version and device identifier. The device identifier is used solely to grant the one-time welcome free credits and to prevent abuse. It is not used for tracking or advertising." },
            { lead: "Local Session Data:", text: "The plugin stores your authentication token in SketchUp's local preferences on your computer, to keep you logged in between sessions. This data remains on your device and is not shared." },
            { lead: "Payment Data:", text: "We process financial transactions exclusively through Stripe. We do not store credit card data on our servers." },
            { lead: "Browsing and Advertising Data:", text: "When you visit our website we collect IP address, browser and device information, pages visited, clicks and scrolling, as well as identifiers stored in cookies. If you are already signed in to your account and start a purchase, we also generate a code derived from your email address in order to measure the effectiveness of our ads. Section 5 details these tools and how to opt out." },
          ],
        },
      ],
    },
    {
      heading: "3. How We Use Your Data",
      blocks: [
        { type: "p", text: "We use the collected information for the following purposes:" },
        {
          type: "ul",
          items: [
            { text: "Process your 3D scenes through AI models (Google Gemini for scene analysis and enrichment; Google Imagen / Vertex AI for image generation; Fal.ai / Kling for video generation) and deliver the final result in the plugin." },
            { text: "Manage your account, authenticate your access, process payments and administer your credit balance." },
            { text: "Detect and prevent abusive use (e.g., creating multiple accounts to accumulate free credits) by means of device identifiers." },
            { text: "Send administrative communications and provide technical support." },
            { text: "Measure the performance of our ads and show ads to people who have already visited the website, as detailed in section 5." },
            { text: "Improve the quality of generated results and the overall service experience." },
          ],
        },
      ],
    },
    {
      heading: "4. Data Sharing",
      blocks: [
        { type: "p", text: "We do not sell your personal data to third parties. We may share information only in the following situations:" },
        {
          type: "ul",
          items: [
            { lead: "AI Providers:", text: "Google Cloud (Vertex AI / Gemini / Imagen) for image processing and Fal.ai (Kling) for video generation. Your images are sent to these providers only to perform the requested rendering, in accordance with their respective privacy policies." },
            { lead: "Infrastructure:", text: "Google Cloud Run (server hosting), Supabase (database and authentication) and Stripe (payments), all contractually obligated to protect your data." },
            { lead: "Measurement and Advertising:", text: "Meta Platforms (Pixel and Conversions API), Google (Google Analytics 4 and Google Tag Manager), and Stape (the tagging server that relays these transmissions). We share browsing data and identifiers with these companies. We never share the content of your 3D scenes or generated images. Section 5 explains in detail what is sent and how to opt out." },
            { lead: "Legal Obligation:", text: "If required by law, regulation or in response to valid legal proceedings." },
          ],
        },
      ],
    },
    {
      heading: "5. Cookies, Measurement and Advertising",
      blocks: [
        { type: "p", text: "Our website uses cookies and similar technologies to work properly, to understand how people browse and to measure the results of our ads. The plugin inside SketchUp does none of this. Everything described in this section happens on the website only." },
        { type: "h3", text: "Tools we use" },
        {
          type: "ul",
          items: [
            { lead: "Google Tag Manager:", text: "Orchestrates the loading of the other tools. It is loaded through the address sst.vizairender.com, which is ours and is operated by Stape." },
            { lead: "Google Analytics 4:", text: "Audience statistics: pages visited, traffic source, time on site and interactions of interest, such as clicking a plan. We do not send your name or your email address to Google Analytics." },
            { lead: "Meta Pixel and Conversions API:", text: "Measure how many people who saw our ads on Facebook and Instagram visited the site, started a purchase or bought, and allow us to show ads to people who have already visited us. We send IP address, browser information, identifiers stored in cookies, the ad click identifier and, when you are signed in to your account, a code derived from your email address (SHA-256 hash). We send that code, not your email address in readable form." },
          ],
        },
        { type: "h3", text: "Cookies we use" },
        {
          type: "ul",
          items: [
            { lead: "Necessary:", text: "Keep you signed in to your account and preserve preferences such as language and theme. Without them the site does not work properly." },
            { lead: "Measurement and advertising:", text: "Store browser identifiers and the identifier of the ad click that brought you here. The ad click identifier lasts 90 days. The others vary by tool." },
          ],
        },
        { type: "p", text: "You can limit or block these cookies at any time in your browser\u2019s privacy and tracking settings, and adjust ad preferences directly in your Facebook and Instagram account. Meta, Google and Stape are companies based outside Brazil, so the data described in this section is processed abroad." },
      ],
    },
    {
      heading: "6. Data Security and Retention",
      blocks: [
        {
          type: "p",
          text: "We implement technical and organizational security measures to protect your data, including communication exclusively over HTTPS, JWT authentication and role-based access control (RLS) in the database. The 3D scenes and images sent for processing are handled transiently. They are not stored permanently on our servers after the rendering is completed. Account data (name, email, credit balance) is retained while your account is active. Upon requesting account deletion, we remove your personal data within 30 days.",
        },
      ],
    },
    {
      heading: "7. Your Rights",
      blocks: [
        {
          type: "p",
          text: "You have the right to request access to, correction of or deletion of your personal information stored with us. If you are in Brazil, the General Data Protection Law (LGPD) also grants you the right to confirm the existence of processing, request portability of your data and object to the measurement and advertising activities described in section 5. To request deletion of your account or exercise any other privacy right, contact us through our support channels.",
        },
      ],
    },
    {
      heading: "8. Contact",
      blocks: [
        {
          type: "p",
          text: "For any question, comment or request related to this Privacy Policy, contact us via WhatsApp through the link in our footer or send an email to {email}.",
        },
      ],
    },
  ],
};

const privacyEs: LegalDoc = {
  title: "Política de Privacidad",
  lastUpdated: "Última actualización: 25 de agosto de 2026",
  sections: [
    {
      heading: "1. Introducción",
      blocks: [
        {
          type: "p",
          text: "Bienvenido a Vizai Render. Respetamos tu privacidad y estamos comprometidos con proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y resguardamos tu información cuando utilizas nuestro plugin y nuestro sitio.",
        },
      ],
    },
    {
      heading: "2. Datos que Recopilamos",
      blocks: [
        {
          type: "p",
          text: "Para brindar nuestros servicios de renderizado con Inteligencia Artificial, podemos recopilar la siguiente información:",
        },
        {
          type: "ul",
          items: [
            { lead: "Datos de Cuenta:", text: "Nombre y dirección de correo obtenidos mediante autenticación Google OAuth al momento del registro." },
            { lead: "Datos de Uso e Imágenes:", text: "Capturas de pantalla de tus escenas 3D en SketchUp y configuraciones de renderizado (estilo, calidad, formato) que envías para su procesamiento por nuestra IA. Esas imágenes se transmiten a proveedores de IA externos (Google Cloud y Fal.ai) exclusivamente para procesar tu solicitud y no se almacenan permanentemente tras finalizar el renderizado." },
            { lead: "Datos Técnicos:", text: "Dirección IP, versión de SketchUp e identificador de dispositivo. El identificador de dispositivo se utiliza exclusivamente para la concesión única de los créditos gratuitos de bienvenida y la prevención de abuso. No se usa para rastreo ni publicidad." },
            { lead: "Datos de Sesión Local:", text: "El plugin almacena tu token de autenticación en las preferencias locales de SketchUp en tu computadora, para mantenerte conectado entre sesiones. Ese dato permanece en tu dispositivo y no se comparte." },
            { lead: "Datos de Pago:", text: "Procesamos transacciones financieras exclusivamente a través de Stripe. No almacenamos datos de tarjeta de crédito en nuestros servidores." },
            { lead: "Datos de Navegación y Publicidad:", text: "Cuando visitas nuestro sitio recopilamos dirección IP, información del navegador y del dispositivo, páginas visitadas, clics y desplazamiento, además de identificadores guardados en cookies. Si ya has iniciado sesión en tu cuenta e inicias una compra, generamos también un código derivado de tu correo electrónico para medir la eficacia de nuestros anuncios. La sección 5 detalla estas herramientas y cómo rechazarlas." },
          ],
        },
      ],
    },
    {
      heading: "3. Cómo Usamos Tus Datos",
      blocks: [
        { type: "p", text: "Utilizamos la información recopilada para los siguientes fines:" },
        {
          type: "ul",
          items: [
            { text: "Procesar tus escenas 3D mediante modelos de IA (Google Gemini para análisis y enriquecimiento de escena; Google Imagen / Vertex AI para generación de imagen; Fal.ai / Kling para generación de video) y entregar el resultado final en el plugin." },
            { text: "Gestionar tu cuenta, autenticar tu acceso, procesar pagos y administrar tu saldo de créditos." },
            { text: "Detectar y prevenir uso abusivo (p. ej.: creación de múltiples cuentas para acumular créditos gratuitos) mediante identificadores de dispositivo." },
            { text: "Enviar comunicados administrativos y brindar soporte técnico." },
            { text: "Medir el rendimiento de nuestros anuncios y mostrar anuncios a quienes ya visitaron el sitio, según se detalla en la sección 5." },
            { text: "Mejorar la calidad de los resultados generados y la experiencia general del servicio." },
          ],
        },
      ],
    },
    {
      heading: "4. Compartición de Datos",
      blocks: [
        { type: "p", text: "No vendemos tus datos personales a terceros. Podemos compartir información solo en las siguientes situaciones:" },
        {
          type: "ul",
          items: [
            { lead: "Proveedores de IA:", text: "Google Cloud (Vertex AI / Gemini / Imagen) para procesamiento de imágenes y Fal.ai (Kling) para generación de video. Tus imágenes se envían a estos proveedores únicamente para ejecutar el renderizado solicitado, conforme a sus respectivas políticas de privacidad." },
            { lead: "Infraestructura:", text: "Google Cloud Run (alojamiento del servidor), Supabase (base de datos y autenticación) y Stripe (pagos), todos obligados por contrato a proteger tus datos." },
            { lead: "Medición y Publicidad:", text: "Meta Platforms (Pixel y Conversions API), Google (Google Analytics 4 y Google Tag Manager), y Stape (servidor de etiquetas que intermedia estos envíos). Compartimos con estas empresas datos de navegación e identificadores. Nunca compartimos el contenido de tus escenas 3D ni de las imágenes generadas. La sección 5 explica en detalle qué se envía y cómo rechazarlo." },
            { lead: "Obligación Legal:", text: "Si lo exige la ley, una regulación o en respuesta a procesos legales válidos." },
          ],
        },
      ],
    },
    {
      heading: "5. Cookies, Medición y Publicidad",
      blocks: [
        { type: "p", text: "Nuestro sitio usa cookies y tecnologías similares para funcionar, para entender cómo navegan las personas y para medir el resultado de nuestros anuncios. El plugin dentro de SketchUp no hace nada de esto. Todo lo que describe esta sección ocurre únicamente en el sitio." },
        { type: "h3", text: "Herramientas que utilizamos" },
        {
          type: "ul",
          items: [
            { lead: "Google Tag Manager:", text: "Organiza la carga de las demás herramientas. Se carga a través de la dirección sst.vizairender.com, que es nuestra y está operada por Stape." },
            { lead: "Google Analytics 4:", text: "Estadísticas de audiencia: páginas visitadas, origen de la visita, tiempo de permanencia e interacciones de interés, como el clic en un plan. No enviamos tu nombre ni tu correo electrónico a Google Analytics." },
            { lead: "Meta Pixel y Conversions API:", text: "Miden cuántas personas que vieron nuestros anuncios en Facebook e Instagram visitaron el sitio, iniciaron una compra o compraron, y permiten mostrar anuncios a quienes ya nos visitaron. Se envían dirección IP, información del navegador, identificadores guardados en cookies, el identificador del clic en el anuncio y, cuando has iniciado sesión en tu cuenta, un código derivado de tu correo electrónico (hash SHA-256). Enviamos ese código, no tu correo en texto legible." },
          ],
        },
        { type: "h3", text: "Cookies que utilizamos" },
        {
          type: "ul",
          items: [
            { lead: "Necesarias:", text: "Te mantienen conectado a tu cuenta y conservan preferencias como idioma y tema. Sin ellas el sitio no funciona correctamente." },
            { lead: "Medición y publicidad:", text: "Guardan identificadores del navegador y el identificador del clic en el anuncio que te trajo hasta aquí. El identificador del clic dura 90 días. Los demás varían según la herramienta." },
          ],
        },
        { type: "p", text: "Puedes limitar o bloquear estas cookies en cualquier momento en la configuración de privacidad y rastreo de tu navegador, y ajustar las preferencias de anuncios directamente en tu cuenta de Facebook e Instagram. Meta, Google y Stape son empresas extranjeras, por lo que los datos descritos en esta sección se tratan fuera de Brasil." },
      ],
    },
    {
      heading: "6. Seguridad y Retención de Datos",
      blocks: [
        {
          type: "p",
          text: "Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos, incluyendo comunicación exclusivamente vía HTTPS, autenticación por JWT y control de acceso por rol (RLS) en la base de datos. Las escenas 3D e imágenes enviadas para su procesamiento se tratan de forma transitoria. No se almacenan permanentemente en nuestros servidores tras finalizar el renderizado. Los datos de cuenta (nombre, correo, saldo de créditos) se conservan mientras tu cuenta esté activa. Al solicitar la eliminación de la cuenta, eliminamos tus datos personales en un plazo de 30 días.",
        },
      ],
    },
    {
      heading: "7. Tus Derechos",
      blocks: [
        {
          type: "p",
          text: "Tienes derecho a solicitar acceso, corrección o eliminación de tu información personal almacenada con nosotros. Si te encuentras en Brasil, la Ley General de Protección de Datos (LGPD) también te garantiza el derecho a confirmar la existencia del tratamiento, solicitar la portabilidad de tus datos y oponerte a las actividades de medición y publicidad descritas en la sección 5. Para solicitar la eliminación de tu cuenta o ejercer cualquier otro derecho de privacidad, contáctanos a través de nuestros canales de soporte.",
        },
      ],
    },
    {
      heading: "8. Contacto",
      blocks: [
        {
          type: "p",
          text: "Para cualquier duda, comentario o solicitud relacionada con esta Política de Privacidad, contáctanos vía WhatsApp a través del enlace en nuestro pie de página o envía un correo a {email}.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Terms of Service
// ---------------------------------------------------------------------------

const termsPt: LegalDoc = {
  title: "Termos de Serviço",
  lastUpdated: "Última atualização: 28 de maio de 2026",
  sections: [
    {
      heading: "1. Aceitação dos Termos",
      blocks: [
        {
          type: "p",
          text: "Ao acessar, instalar e utilizar o plugin e o site Vizai Render, você concorda em cumprir e ficar integralmente vinculado a estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, não deverá utilizar nossos serviços.",
        },
      ],
    },
    {
      heading: "2. Descrição do Serviço",
      blocks: [
        {
          type: "p",
          text: "O Vizai Render é uma solução de Inteligência Artificial para renderização arquitetônica. Fornecemos um plugin que se conecta aos nossos servidores na nuvem para transformar cenas brutas em imagens fotorrealistas e vídeos animados em questão de segundos. Atualmente disponível para SketchUp, com versões para Revit e Archicad em desenvolvimento. O serviço opera sob um sistema de créditos ou planos de assinatura.",
        },
      ],
    },
    {
      heading: "3. Contas de Usuário",
      blocks: [
        {
          type: "p",
          text: "Para utilizar as funcionalidades do Vizai Render, você precisará criar uma conta via Google. Você é responsável por todas as atividades que ocorram através dela. Notifique-nos imediatamente sobre qualquer uso não autorizado ou suspeita de violação de segurança. Reservamo-nos o direito de encerrar contas que violem nossas políticas.",
        },
        {
          type: "p",
          lead: "Uso justo e anti-abuso:",
          text: "Os 8 créditos gratuitos de boas-vindas são concedidos uma única vez por dispositivo físico, no primeiro login pelo plugin. A criação de múltiplas contas com o objetivo de acumular créditos gratuitos é estritamente proibida e pode resultar no cancelamento das contas envolvidas. O Vizai Render utiliza identificadores de dispositivo para detectar e prevenir esse tipo de abuso.",
        },
      ],
    },
    {
      heading: "4. Propriedade Intelectual",
      blocks: [
        {
          type: "p",
          lead: "Seu Conteúdo e Modelos 3D:",
          text: "Você mantém todos os direitos, títulos e interesses sobre os modelos 3D originais que você envia. Ao submetê-los ao nosso serviço, você nos concede estritamente uma licença temporária para processá-los com o fim exclusivo de gerar as renderizações solicitadas por você.",
        },
        {
          type: "p",
          lead: "Imagens Geradas:",
          text: "Você detém a propriedade intelectual completa das imagens finais geradas pela nossa IA através da sua conta e pode utilizá-las livremente para quaisquer fins comerciais, portfólios ou pessoais.",
        },
        {
          type: "p",
          lead: "O Software Vizai Render:",
          text: "O código do plugin, a infraestrutura do site, o design, as marcas registradas, o logotipo e a tecnologia subjacente são de propriedade exclusiva do Vizai Render e são protegidos por leis de direitos autorais e de propriedade intelectual. Você não tem permissão para copiar, modificar, distribuir, vender ou alugar qualquer parte do nosso software.",
        },
      ],
    },
    {
      heading: "5. Pagamentos, Créditos e Assinaturas",
      blocks: [
        {
          type: "p",
          text: "Os serviços do Vizai Render operam sob um sistema de créditos ou planos de assinatura mensal/anual, processados pela plataforma Stripe.",
        },
        { type: "h3", text: "Créditos" },
        {
          type: "ul",
          items: [
            { text: "Novos usuários recebem 8 créditos gratuitos ao realizar o primeiro login pelo plugin." },
            { text: "Créditos mensais de assinaturas são renovados automaticamente a cada ciclo de cobrança." },
            { text: "Créditos de pacotes avulsos são permanentes e não expiram." },
            { text: "Reservamo-nos o direito de alterar os preços a qualquer momento, sem afetar créditos já adquiridos." },
          ],
        },
        { type: "h3", text: "Política de Reembolso: Pacotes Avulsos" },
        {
          type: "ul",
          items: [
            { lead: "Créditos não utilizados:", text: "reembolso pode ser solicitado em até 7 dias corridos após a compra, desde que nenhum crédito do pacote tenha sido utilizado. Entre em contato pelo suporte." },
            { lead: "Créditos já utilizados:", text: "não há reembolso, total ou parcial, uma vez que qualquer crédito do pacote tenha sido consumido em uma renderização. O processamento em nuvem consome recursos imediatos e não é reversível." },
            { text: "Ao aprovar um reembolso, os créditos correspondentes são removidos automaticamente da conta." },
          ],
        },
        { type: "h3", text: "Política de Cancelamento: Assinaturas" },
        {
          type: "ul",
          items: [
            { text: "Assinaturas podem ser canceladas a qualquer momento pelo Portal do Cliente, acessível no painel da sua conta." },
            { text: "Após o cancelamento, o acesso ao plano permanece ativo até o fim do período já pago." },
            { text: "Os créditos mensais creditados no ciclo atual permanecem disponíveis para uso até o encerramento do período." },
            { text: "Não há reembolso proporcional por períodos não utilizados de assinatura." },
          ],
        },
      ],
    },
    {
      heading: "6. Limitação de Responsabilidade",
      blocks: [
        {
          type: "p",
          text: 'O serviço Vizai Render é fornecido "como está" e "conforme disponível". Embora envidemos nossos melhores esforços para garantir a qualidade, não garantimos que as imagens geradas por IA reflitam precisão arquitetônica ou técnica absoluta, visto que a inteligência artificial possui um caráter interpretativo e criativo. Ocasionalmente, imperfeições ou anomalias gráficas (hallucinations) podem ocorrer.',
        },
        {
          type: "p",
          text: "Em nenhuma circunstância o Vizai Render, seus diretores ou funcionários, serão responsáveis por lucros cessantes, perda de dados ou danos indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de uso do nosso serviço.",
        },
      ],
    },
    {
      heading: "7. Disponibilidade do Serviço",
      blocks: [
        {
          type: "p",
          text: "O Vizai Render se esforça para manter o serviço sempre online, mas não garante disponibilidade 100% livre de interrupções. Manutenções programadas, atualizações de servidores e picos de tráfego podem ocasionalmente afetar a velocidade de geração ou a disponibilidade do serviço.",
        },
      ],
    },
    {
      heading: "8. Modificações nos Termos",
      blocks: [
        {
          type: "p",
          text: "Podemos revisar estes Termos de Serviço periodicamente sem aviso prévio obrigatório. O uso contínuo do plugin ou site após tais modificações constituirá o seu reconhecimento e a sua aceitação dos novos termos.",
        },
      ],
    },
    {
      heading: "9. Contato",
      blocks: [
        {
          type: "p",
          text: "Se você tiver dúvidas, perguntas ou comentários sobre estes Termos de Serviço, por favor, envie um e-mail para {email} ou entre em contato pelo nosso WhatsApp de suporte.",
        },
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  title: "Terms of Service",
  lastUpdated: "Last updated: May 28, 2026",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      blocks: [
        {
          type: "p",
          text: "By accessing, installing and using the Vizai Render plugin and website, you agree to comply with and be fully bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.",
        },
      ],
    },
    {
      heading: "2. Service Description",
      blocks: [
        {
          type: "p",
          text: "Vizai Render is an Artificial Intelligence solution for architectural rendering. We provide a plugin that connects to our cloud servers to transform raw scenes into photorealistic images and animated videos within seconds. Currently available for SketchUp, with versions for Revit and Archicad in development. The service operates under a credit system or subscription plans.",
        },
      ],
    },
    {
      heading: "3. User Accounts",
      blocks: [
        {
          type: "p",
          text: "To use Vizai Render's features, you will need to create an account via Google. You are responsible for all activities that occur through it. Notify us immediately of any unauthorized use or suspected security breach. We reserve the right to terminate accounts that violate our policies.",
        },
        {
          type: "p",
          lead: "Fair use and anti-abuse:",
          text: "The 8 welcome free credits are granted only once per physical device, on the first login through the plugin. Creating multiple accounts in order to accumulate free credits is strictly prohibited and may result in the cancellation of the accounts involved. Vizai Render uses device identifiers to detect and prevent this type of abuse.",
        },
      ],
    },
    {
      heading: "4. Intellectual Property",
      blocks: [
        {
          type: "p",
          lead: "Your Content and 3D Models:",
          text: "You retain all rights, title and interest in the original 3D models you submit. By submitting them to our service, you grant us strictly a temporary license to process them for the sole purpose of generating the renderings you request.",
        },
        {
          type: "p",
          lead: "Generated Images:",
          text: "You hold full intellectual property of the final images generated by our AI through your account and may use them freely for any commercial, portfolio or personal purposes.",
        },
        {
          type: "p",
          lead: "The Vizai Render Software:",
          text: "The plugin code, the website infrastructure, the design, the trademarks, the logo and the underlying technology are the exclusive property of Vizai Render and are protected by copyright and intellectual property laws. You are not permitted to copy, modify, distribute, sell or rent any part of our software.",
        },
      ],
    },
    {
      heading: "5. Payments, Credits and Subscriptions",
      blocks: [
        {
          type: "p",
          text: "Vizai Render's services operate under a credit system or monthly/annual subscription plans, processed by the Stripe platform.",
        },
        { type: "h3", text: "Credits" },
        {
          type: "ul",
          items: [
            { text: "New users receive 8 free credits upon their first login through the plugin." },
            { text: "Monthly subscription credits are renewed automatically each billing cycle." },
            { text: "One-off pack credits are permanent and do not expire." },
            { text: "We reserve the right to change prices at any time, without affecting credits already purchased." },
          ],
        },
        { type: "h3", text: "Refund Policy: One-off Packs" },
        {
          type: "ul",
          items: [
            { lead: "Unused credits:", text: "a refund may be requested within 7 calendar days of purchase, provided no credit from the pack has been used. Contact support." },
            { lead: "Credits already used:", text: "there is no refund, full or partial, once any credit from the pack has been consumed in a rendering. Cloud processing consumes immediate resources and is not reversible." },
            { text: "Upon approving a refund, the corresponding credits are automatically removed from the account." },
          ],
        },
        { type: "h3", text: "Cancellation Policy: Subscriptions" },
        {
          type: "ul",
          items: [
            { text: "Subscriptions may be canceled at any time through the Customer Portal, accessible from your account dashboard." },
            { text: "After cancellation, access to the plan remains active until the end of the already-paid period." },
            { text: "Monthly credits granted in the current cycle remain available for use until the period ends." },
            { text: "There is no prorated refund for unused subscription periods." },
          ],
        },
      ],
    },
    {
      heading: "6. Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: 'The Vizai Render service is provided "as is" and "as available". Although we make our best efforts to ensure quality, we do not guarantee that AI-generated images reflect absolute architectural or technical accuracy, since artificial intelligence has an interpretive and creative nature. Occasionally, imperfections or graphic anomalies (hallucinations) may occur.',
        },
        {
          type: "p",
          text: "Under no circumstances shall Vizai Render, its directors or employees be liable for lost profits, data loss or indirect, incidental or consequential damages resulting from the use of or inability to use our service.",
        },
      ],
    },
    {
      heading: "7. Service Availability",
      blocks: [
        {
          type: "p",
          text: "Vizai Render strives to keep the service always online, but does not guarantee 100% interruption-free availability. Scheduled maintenance, server updates and traffic spikes may occasionally affect generation speed or service availability.",
        },
      ],
    },
    {
      heading: "8. Changes to the Terms",
      blocks: [
        {
          type: "p",
          text: "We may revise these Terms of Service periodically without mandatory prior notice. Continued use of the plugin or website after such changes will constitute your acknowledgment and acceptance of the new terms.",
        },
      ],
    },
    {
      heading: "9. Contact",
      blocks: [
        {
          type: "p",
          text: "If you have questions, queries or comments about these Terms of Service, please send an email to {email} or contact us through our support WhatsApp.",
        },
      ],
    },
  ],
};

const termsEs: LegalDoc = {
  title: "Términos de Servicio",
  lastUpdated: "Última actualización: 28 de mayo de 2026",
  sections: [
    {
      heading: "1. Aceptación de los Términos",
      blocks: [
        {
          type: "p",
          text: "Al acceder, instalar y utilizar el plugin y el sitio de Vizai Render, aceptas cumplir y quedar íntegramente vinculado a estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no deberás utilizar nuestros servicios.",
        },
      ],
    },
    {
      heading: "2. Descripción del Servicio",
      blocks: [
        {
          type: "p",
          text: "Vizai Render es una solución de Inteligencia Artificial para renderizado arquitectónico. Ofrecemos un plugin que se conecta a nuestros servidores en la nube para transformar escenas crudas en imágenes fotorrealistas y videos animados en cuestión de segundos. Actualmente disponible para SketchUp, con versiones para Revit y Archicad en desarrollo. El servicio opera bajo un sistema de créditos o planes de suscripción.",
        },
      ],
    },
    {
      heading: "3. Cuentas de Usuario",
      blocks: [
        {
          type: "p",
          text: "Para utilizar las funciones de Vizai Render, deberás crear una cuenta vía Google. Eres responsable de todas las actividades que ocurran a través de ella. Notifícanos de inmediato sobre cualquier uso no autorizado o sospecha de violación de seguridad. Nos reservamos el derecho de cancelar cuentas que violen nuestras políticas.",
        },
        {
          type: "p",
          lead: "Uso justo y anti-abuso:",
          text: "Los 8 créditos gratuitos de bienvenida se conceden una única vez por dispositivo físico, en el primer inicio de sesión por el plugin. La creación de múltiples cuentas con el objetivo de acumular créditos gratuitos está estrictamente prohibida y puede resultar en la cancelación de las cuentas involucradas. Vizai Render utiliza identificadores de dispositivo para detectar y prevenir este tipo de abuso.",
        },
      ],
    },
    {
      heading: "4. Propiedad Intelectual",
      blocks: [
        {
          type: "p",
          lead: "Tu Contenido y Modelos 3D:",
          text: "Conservas todos los derechos, títulos e intereses sobre los modelos 3D originales que envías. Al enviarlos a nuestro servicio, nos concedes estrictamente una licencia temporal para procesarlos con el fin exclusivo de generar los renderizados que solicitas.",
        },
        {
          type: "p",
          lead: "Imágenes Generadas:",
          text: "Posees la propiedad intelectual completa de las imágenes finales generadas por nuestra IA a través de tu cuenta y puedes utilizarlas libremente para cualquier fin comercial, de portafolio o personal.",
        },
        {
          type: "p",
          lead: "El Software Vizai Render:",
          text: "El código del plugin, la infraestructura del sitio, el diseño, las marcas registradas, el logotipo y la tecnología subyacente son propiedad exclusiva de Vizai Render y están protegidos por leyes de derechos de autor y de propiedad intelectual. No tienes permiso para copiar, modificar, distribuir, vender o alquilar ninguna parte de nuestro software.",
        },
      ],
    },
    {
      heading: "5. Pagos, Créditos y Suscripciones",
      blocks: [
        {
          type: "p",
          text: "Los servicios de Vizai Render operan bajo un sistema de créditos o planes de suscripción mensual/anual, procesados por la plataforma Stripe.",
        },
        { type: "h3", text: "Créditos" },
        {
          type: "ul",
          items: [
            { text: "Los nuevos usuarios reciben 8 créditos gratuitos al realizar el primer inicio de sesión por el plugin." },
            { text: "Los créditos mensuales de suscripciones se renuevan automáticamente en cada ciclo de facturación." },
            { text: "Los créditos de paquetes sueltos son permanentes y no caducan." },
            { text: "Nos reservamos el derecho de cambiar los precios en cualquier momento, sin afectar créditos ya adquiridos." },
          ],
        },
        { type: "h3", text: "Política de Reembolso: Paquetes Sueltos" },
        {
          type: "ul",
          items: [
            { lead: "Créditos no utilizados:", text: "se puede solicitar reembolso dentro de los 7 días corridos posteriores a la compra, siempre que no se haya utilizado ningún crédito del paquete. Contacta con soporte." },
            { lead: "Créditos ya utilizados:", text: "no hay reembolso, total ni parcial, una vez que cualquier crédito del paquete haya sido consumido en un renderizado. El procesamiento en la nube consume recursos inmediatos y no es reversible." },
            { text: "Al aprobar un reembolso, los créditos correspondientes se eliminan automáticamente de la cuenta." },
          ],
        },
        { type: "h3", text: "Política de Cancelación: Suscripciones" },
        {
          type: "ul",
          items: [
            { text: "Las suscripciones pueden cancelarse en cualquier momento desde el Portal del Cliente, accesible en el panel de tu cuenta." },
            { text: "Tras la cancelación, el acceso al plan permanece activo hasta el fin del período ya pagado." },
            { text: "Los créditos mensuales acreditados en el ciclo actual permanecen disponibles para su uso hasta el cierre del período." },
            { text: "No hay reembolso proporcional por períodos no utilizados de suscripción." },
          ],
        },
      ],
    },
    {
      heading: "6. Limitación de Responsabilidad",
      blocks: [
        {
          type: "p",
          text: 'El servicio Vizai Render se ofrece "tal cual" y "según disponibilidad". Aunque hacemos nuestro mejor esfuerzo para garantizar la calidad, no garantizamos que las imágenes generadas por IA reflejen precisión arquitectónica o técnica absoluta, dado que la inteligencia artificial tiene un carácter interpretativo y creativo. Ocasionalmente pueden ocurrir imperfecciones o anomalías gráficas (hallucinations).',
        },
        {
          type: "p",
          text: "En ninguna circunstancia Vizai Render, sus directores o empleados serán responsables por lucro cesante, pérdida de datos o daños indirectos, incidentales o consecuentes resultantes del uso o de la incapacidad de uso de nuestro servicio.",
        },
      ],
    },
    {
      heading: "7. Disponibilidad del Servicio",
      blocks: [
        {
          type: "p",
          text: "Vizai Render se esfuerza por mantener el servicio siempre en línea, pero no garantiza una disponibilidad 100% libre de interrupciones. Mantenimientos programados, actualizaciones de servidores y picos de tráfico pueden afectar ocasionalmente la velocidad de generación o la disponibilidad del servicio.",
        },
      ],
    },
    {
      heading: "8. Modificaciones de los Términos",
      blocks: [
        {
          type: "p",
          text: "Podemos revisar estos Términos de Servicio periódicamente sin aviso previo obligatorio. El uso continuado del plugin o del sitio tras dichas modificaciones constituirá tu reconocimiento y aceptación de los nuevos términos.",
        },
      ],
    },
    {
      heading: "9. Contacto",
      blocks: [
        {
          type: "p",
          text: "Si tienes dudas, preguntas o comentarios sobre estos Términos de Servicio, por favor envía un correo a {email} o contáctanos por nuestro WhatsApp de soporte.",
        },
      ],
    },
  ],
};

export const privacyDoc: Record<Lang, LegalDoc> = {
  pt: privacyPt,
  en: privacyEn,
  es: privacyEs,
};

export const termsDoc: Record<Lang, LegalDoc> = {
  pt: termsPt,
  en: termsEn,
  es: termsEs,
};
