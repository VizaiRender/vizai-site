// Blog posts in English. Same rules as pt.ts: the search term in the title, a
// direct answer in the first sentence of each section, concrete numbers, and
// paragraphs that still make sense when quoted on their own. Credit numbers
// come from lib/prices.ts; facts about other tools are the ones in lib/faq.ts.

import type { BlogUi, PostContent } from "./types";
import { OPERATION_CREDITS as C, REFERRAL, VIDEO_CREDITS, WELCOME_CREDITS } from "@/lib/prices";

const FREE_RENDERS = Math.floor(WELCOME_CREDITS / C.render);
const VIDEO_MIN = VIDEO_CREDITS[0];
const VIDEO_MAX = VIDEO_CREDITS[VIDEO_CREDITS.length - 1];
const IG = (handle: string) => `[@${handle}](https://www.instagram.com/${handle}/)`;

export const enUi: BlogUi = {
  badge: "Vizai Blog",
  title: "AI rendering for SketchUp users",
  subtitle:
    "Comparisons between rendering tools, real projects made with Vizai and everything that changes in the plugin with each version.",
  readMore: "Read article",
  minRead: "min read",
  backToIndex: "All articles",
  updatedOn: "Updated on",
  faqTitle: "Frequently asked questions",
  ctaTitle: "Try it on your own project",
  ctaSubtitle: `Install the plugin and get ${WELCOME_CREDITS} free credits on your first login, enough for ${FREE_RENDERS} renders.`,
  ctaDownload: "Download plugin",
  ctaSignup: "Create free account",
  categories: {
    comparacao: "Comparison",
    casos: "Real renders",
    novidades: "What's new",
  },
};

export const enPosts: Record<string, PostContent> = {
  "vray-enscape-lumion-ou-render-com-ia": {
    title: "V-Ray, Enscape, Lumion or AI rendering: which to use in SketchUp?",
    excerpt:
      "A traditional renderer calculates light from the 3D model; AI rendering starts from the view. Compare setup, hardware, Mac support, speed and when to use each.",
    blocks: [
      {
        type: "p",
        text: "**Short answer:** V-Ray, Enscape, Lumion and D5 calculate light from the 3D model and give you full technical control, but they need setup and a good graphics card. AI rendering, like Vizai, starts from the SketchUp view, is ready in 20 to 60 seconds and runs on any computer. Neither replaces the other everywhere: each one wins at a different stage of the project.",
      },
      { type: "h2", text: "What is the difference between a traditional renderer and AI rendering?" },
      {
        type: "p",
        text: "A **traditional renderer** (V-Ray, Enscape, Lumion, D5) simulates the physics of light over the 3D model. Every material has its own properties, every fixture actually emits light, and the result is technically accurate. The cost is setup, material by material and light by light, plus render times that depend on your graphics card.",
      },
      {
        type: "p",
        text: "**AI rendering** starts from the image of the view, exactly as the SketchUp camera shows it. In Vizai, you pick the project type, the lighting and the weather, and the AI fills in materials, lighting, sky and surroundings. There are no materials to set up, and the image is generated in the cloud: your computer doesn't affect the result.",
      },
      {
        type: "compare",
        before: { src: "/compare2-before.jpg", label: "SketchUp view" },
        after: { src: "/compare2-after.jpg", label: "Vizai render" },
        aspect: "1200 / 1491",
      },
      { type: "h2", text: "Side-by-side comparison" },
      {
        type: "table",
        align: "left",
        head: ["", "V-Ray, Enscape, Lumion and D5", "Vizai (AI rendering)"],
        rows: [
          ["How the image is made", "Calculates light from the 3D model", "AI from the SketchUp view"],
          ["What you set up", "Materials, lights, surroundings and camera", "Project type, lighting and weather"],
          ["Graphics card", "Enscape, Lumion and D5 rely on it; V-Ray can use CPU or GPU", "Not used: the image is generated in the cloud"],
          ["Mac", "Enscape only on Apple silicon Macs; Lumion has no official support; D5 Lite is Windows only", "Works on Mac and Windows"],
          ["Time per image", "Depends on the scene and the computer", "20 to 60 seconds"],
          ["Technical control", "Full, with real light and material values", "The AI interprets the scene on each generation"],
          ["Internet", "Not needed to render", "Needed, generation runs in the cloud"],
        ],
      },
      { type: "h2", text: "When is a traditional renderer the better choice?" },
      {
        type: "p",
        text: "A traditional renderer is the better choice when the project needs technical precision that AI does not guarantee. The most common cases:",
      },
      {
        type: "ul",
        items: [
          "**Lighting studies** with real fixture and sun values.",
          "**Manufacturer materials** that must match the catalog exactly.",
          "**Long walkthrough animations** of the project.",
          "**A series of identical views** of the same room, where no detail can change from one image to the next.",
        ],
      },
      {
        type: "p",
        text: "In those cases, the hours of setup pay off. The AI interprets the scene on each generation, so small details can vary between images, even from the same view.",
      },
      { type: "h2", text: "When does AI rendering work better?" },
      {
        type: "p",
        text: "AI rendering works better when speed and a steady flow of good-looking images matter more than exact light calculation. The most common cases:",
      },
      {
        type: "ul",
        items: [
          "**Design studies and client approval:** try day and night, sun and rain, decor styles, without redoing materials.",
          "**Tight deadlines:** several views in one day, with no render queue and no frozen computer.",
          "**A computer without a dedicated graphics card**, or a Mac.",
          "**Empty rooms, floor plans and moodboards:** in Vizai, virtual staging, rendered floor plans and moodboards live in the same panel, in the Creative AI tab.",
        ],
      },
      {
        type: "p",
        text: "When a detail comes out different from the design, Vizai's masked edit fixes just that area, without generating the whole image again. See the step by step in the [First render lesson](/en/treinamento/primeiro-render).",
      },
      { type: "h2", text: "Can I use both on the same project?" },
      {
        type: "p",
        text: "Yes, and it is a split that works well: AI rendering during design studies and presentations, while the client is still deciding, and a traditional renderer for final delivery, once every material is settled. Both start from the same SketchUp file, so there is no remodeling.",
      },
      {
        type: "tip",
        text: `Vizai gives you ${WELCOME_CREDITS} free credits on your first login, enough for ${FREE_RENDERS} renders. [Download the plugin](/en/download) and compare on your own project.`,
      },
    ],
    faq: [
      {
        q: "Does AI rendering replace V-Ray?",
        a: "Not in every case. For design studies, presentations and client approval, AI rendering delivers an image in under a minute with no material setup. For lighting studies with real values, catalog-exact materials or a series of identical views, V-Ray and other traditional renderers are still the right choice.",
      },
      {
        q: "Can I render SketchUp without a graphics card?",
        a: "Yes, with cloud rendering. Vizai generates the image on its servers, so it works on a regular laptop, on Windows or Mac, as long as it runs SketchUp 2023 or newer and is online.",
      },
      {
        q: "Which SketchUp renderer works on Mac?",
        a: "Vizai works on Mac without a dedicated graphics card, and V-Ray has a Mac version. Enscape runs only on Apple silicon Macs, Lumion has no official Mac support and D5 Lite runs only on Windows.",
      },
      {
        q: "How much does a render cost in Vizai?",
        a: `Each render costs ${C.render} credits (${C.creative} in the Creative AI modes). Credits come in monthly or yearly plans, or in packs that never expire, and your first login in the plugin gives you ${WELCOME_CREDITS} free credits.`,
      },
    ],
  },

  "render-com-ia-no-sketchup": {
    title: "AI rendering in SketchUp: ChatGPT, AI Render, Veras or Vizai?",
    excerpt:
      "Four ways to make AI renders from SketchUp: what each one asks of you, where it runs, how it charges and when each one makes sense.",
    blocks: [
      {
        type: "p",
        text: "**Short answer:** there are four ways to make an AI render of a SketchUp project: taking a screenshot into ChatGPT or Gemini, Trimble's SketchUp AI Render, Chaos's Veras, or a plugin built for architecture, like Vizai. A screenshot in a chat works for a quick idea; if you render every week, a tool that stays inside SketchUp and keeps the project's geometry is worth it.",
      },
      { type: "h2", text: "Can I use ChatGPT or Gemini to render SketchUp?" },
      {
        type: "p",
        text: "Yes, by exporting the view, uploading it to the chat and writing a prompt. It is the best-known route and works for a reference image. The limit is fidelity: ChatGPT and Gemini are general tools, and they tend to change the geometry, move windows and invent elements that are not in the design.",
      },
      {
        type: "p",
        text: "The prompt is also on you. A prompt that works for an exterior does not work for an interior, and getting night lighting or an overcast sky right becomes trial and error. Every attempt repeats the cycle of exporting, asking, downloading and going back to SketchUp.",
      },
      { type: "h2", text: "What is SketchUp AI Render?" },
      {
        type: "p",
        text: "SketchUp AI Render is Trimble's own AI tool, formerly called SketchUp Diffusion. It comes with the SketchUp Go, Pro and Studio subscriptions, with a monthly credit allowance, and the desktop extension works from SketchUp 2024. It makes sense if you already pay for a Trimble subscription and use SketchUp 2024 or newer.",
      },
      { type: "h2", text: "What is Veras?" },
      {
        type: "p",
        text: "Veras, by Chaos (the company behind V-Ray and Enscape), is an AI rendering tool that works inside several programs: Revit, SketchUp, Rhino, Archicad and others. It is billed as a credit-based subscription, with a 14-day trial. It makes sense if you switch between those programs day to day.",
      },
      { type: "h2", text: "How does Vizai work?" },
      {
        type: "p",
        text: "Vizai is an AI rendering plugin built for architecture that runs inside SketchUp 2023 or newer, on Windows and Mac. It captures the active view in the aspect ratio you choose and uses ready, tested instructions for each project type (exteriors, interiors, commercial, buildings and landscape), with rules to keep the framing and geometry of the view. Lighting and weather are picked with buttons: no prompt writing.",
      },
      {
        type: "compare",
        before: { src: "/compare3-before.jpg", label: "SketchUp view" },
        after: { src: "/compare3-after.jpg", label: "Vizai render" },
        aspect: "1 / 1",
      },
      {
        type: "p",
        text: `Besides rendering, the same panel makes ${VIDEO_MIN.seconds} to ${VIDEO_MAX.seconds} second videos, 360° panoramas, 3D blocks from a photo, 4K upscales and tools that use no credits, such as [Mirror Reflection](/en/treinamento/reflexo-espelho) and Fake Light. A render costs ${C.render} credits, and credits come in plans or in packs that never expire.`,
      },
      { type: "h2", text: "Side-by-side comparison" },
      {
        type: "table",
        align: "left",
        head: ["", "Where it runs", "How it charges"],
        rows: [
          ["Screenshot in ChatGPT or Gemini", "In the browser, outside SketchUp", "Chat plan, with limited free tiers"],
          ["SketchUp AI Render", "SketchUp 2024 or newer", "Monthly allowance in the Go, Pro and Studio subscriptions"],
          ["Veras", "Revit, SketchUp, Rhino, Archicad and others", "Credit-based subscription"],
          ["Vizai", "SketchUp 2023 or newer, Windows and Mac", "Plans or credit packs that never expire"],
        ],
      },
      { type: "h2", text: "Which one should I choose?" },
      {
        type: "ul",
        items: [
          "**A reference image every now and then:** a screenshot in ChatGPT or Gemini does the job.",
          "**You already pay for SketchUp and use version 2024 or newer:** try the AI Render that comes with it.",
          "**You work in Revit, Rhino or Archicad as well as SketchUp:** Veras covers all of them.",
          "**You render every week in SketchUp, including version 2023 or on a Mac:** a dedicated plugin like Vizai saves the export-and-prompt cycle and keeps the project's geometry.",
        ],
      },
      {
        type: "tip",
        text: `To compare on your own project, Vizai gives you ${WELCOME_CREDITS} free credits on your first login. [Download the plugin](/en/download) and run the same render in the tools you already use.`,
      },
    ],
    faq: [
      {
        q: "Can I use ChatGPT to render a SketchUp project?",
        a: "You can, by exporting the view and writing a prompt. The problem is fidelity: general tools like ChatGPT and Gemini tend to change the geometry, move windows and invent elements, and every attempt repeats the cycle of exporting, asking and downloading.",
      },
      {
        q: "What is the difference between SketchUp AI Render and Vizai?",
        a: "AI Render is Trimble's, comes with the SketchUp Go, Pro and Studio subscriptions with a monthly credit allowance and works from SketchUp 2024. Vizai works from SketchUp 2023, with credits on plans or in packs that never expire, has dedicated modes for each project type and also makes videos, 360° panoramas and 3D blocks.",
      },
      {
        q: "Does AI rendering stay true to the design?",
        a: "In structure, yes, when the tool is built for it. In Vizai, framing, geometry and the position of elements come from the SketchUp view, and the AI adds materials, light, sky and surroundings. Small details can vary, and a masked edit fixes just that area.",
      },
      {
        q: "Do I need to write prompts in Vizai?",
        a: "No. Project type, lighting and weather are picked with buttons, and Vizai builds the instructions for the AI from those choices.",
      },
    ],
  },

  "renders-reais-feitos-no-vizai": {
    title: "Real renders made with Vizai by architects",
    excerpt:
      "Exteriors, living rooms, kitchens and bedrooms rendered with Vizai by architects and designers, from real projects modeled in SketchUp.",
    blocks: [
      {
        type: "p",
        text: "Every image on this page was generated with Vizai by people who use the plugin, from real projects modeled in SketchUp. Each one credits the author's Instagram profile, where you can see more of their work.",
      },
      { type: "h2", text: "Exteriors" },
      {
        type: "p",
        text: "For exteriors, Vizai adds sky, vegetation, sidewalk and neighborhood based on the project type and the surroundings chosen in the panel. Massing, openings and cladding come from the model.",
      },
      {
        type: "imgrow",
        aspect: "1 / 1",
        images: [
          {
            src: "/blog/renders-reais/fachada-pedra-escura-isx-maquetes.jpg",
            alt: "Contemporary two-story house with dark stone cladding, wooden pivot door and garage, rendered with Vizai",
            caption: `Exterior by ${IG("isx.maquetes")}`,
          },
          {
            src: "/blog/renders-reais/fachada-tijolinho-matheus-oengenheiro.jpg",
            alt: "Two-story house with light brick, planter with trailing plants and entrance steps, rendered with Vizai",
            caption: `Exterior by ${IG("matheus.oengenheiro")}`,
          },
        ],
      },
      { type: "h2", text: "Living rooms, kitchens and social areas" },
      {
        type: "p",
        text: "In interiors, lighting is what changes the result the most. In Vizai, lighting and weather are picked in the panel, and the Fake Light tool helps when the model's fixtures are not enough.",
      },
      {
        type: "img",
        src: "/blog/renders-reais/cozinha-e-jantar-dafnefreitas-arq.jpg",
        alt: "Kitchen open to the dining room, with a lit glass cabinet, round wooden table and upholstered chairs, rendered with Vizai",
        caption: `Kitchen and dining by ${IG("dafnefreitas.arq")}`,
      },
      {
        type: "imgrow",
        aspect: "4 / 5",
        images: [
          {
            src: "/blog/renders-reais/sala-estante-madeira-debernardi-arq.jpg",
            alt: "Open living room with floor-to-ceiling wooden shelving, light sofa and large window, rendered with Vizai",
            caption: `Living room by ${IG("debernardi_arq")}`,
          },
          {
            src: "/blog/renders-reais/bar-marmore-studiowm-arq.jpg",
            alt: "Marble sideboard bar with lit bottles and glasses in front of a wooden panel, rendered with Vizai",
            caption: `Bar by ${IG("studiowm.arq")}`,
          },
        ],
      },
      { type: "h2", text: "Bedrooms" },
      {
        type: "img",
        src: "/blog/renders-reais/quarto-casal-arquitetamariajuliareis.jpg",
        alt: "Master bedroom with slatted wood panel, open closet and vanity with a lit mirror, rendered with Vizai",
        caption: `Master bedroom by ${IG("arquitetamariajuliareis")}`,
      },
      {
        type: "img",
        src: "/blog/renders-reais/quarto-bebe-elianayrafreitas.jpg",
        alt: "Nursery with a wooden crib and nursing chair, with a mother and baby, rendered with Vizai",
        caption: `Nursery by ${IG("elianayrafreitas")}`,
      },
      {
        type: "imgrow",
        aspect: "1 / 1",
        images: [
          {
            src: "/blog/renders-reais/quarto-bebe-dafnefreitas-arq.jpg",
            alt: "Nursery with jungle animal wallpaper, wooden crib and dresser, rendered with Vizai",
            caption: `Nursery by ${IG("dafnefreitas.arq")}`,
          },
          {
            src: "/blog/renders-reais/quarto-casal-thedouglaspaz.jpg",
            alt: "Master bedroom with navy tufted headboard, abstract painting and sculptural pendant, rendered with Vizai",
            caption: `Master bedroom by ${IG("thedouglaspaz")}`,
          },
        ],
      },
      { type: "h2", text: "How are these images made?" },
      {
        type: "steps",
        items: [
          {
            title: "Model and frame in SketchUp",
            text: "The framing of the view is the framing of the render. Vizai does not read the .skp file, only the image of the active view.",
          },
          {
            title: "Pick the project type, lighting and weather",
            text: "Exterior, interior, commercial, building or landscape. Choices are made with buttons, with no prompt writing.",
          },
          {
            title: "Generate and adjust",
            text: `The render is ready in 20 to 60 seconds and costs ${C.render} credits. If a detail comes out different from the design, a masked edit fixes just that area.`,
          },
        ],
      },
      {
        type: "tip",
        text: "Made a render with Vizai and want to see it here? Post it on Instagram and tag [@vizairender](https://www.instagram.com/vizairender/).",
      },
    ],
    faq: [
      {
        q: "Can I use Vizai images in paid work?",
        a: "Yes. Images generated in your account are yours, and you can use them in presentations, portfolios, proposals and any other commercial use.",
      },
      {
        q: "Does Vizai work for both exteriors and interiors?",
        a: "Yes. Vizai has dedicated modes for exteriors, interiors, commercial spaces, buildings and landscape, each with instructions made for that project type, plus Creative AI modes for virtual staging, rendered floor plans, diagrams and moodboards.",
      },
    ],
  },

  "novidades-do-vizai": {
    title: "What's new in Vizai: changes in every version",
    excerpt:
      "The history of the Vizai Render plugin for SketchUp, from the newest version back to launch: what was added and what was fixed in each one.",
    blocks: [
      {
        type: "p",
        text: "This page lists everything that changed in Vizai since launch in May 2026, from the newest version to the oldest. The current version is **1.0.38**, released on October 14, 2026. When a new version is out, the Vizai panel shows a notice at the top with a download button.",
      },
      { type: "h2", text: "What Vizai does today" },
      {
        type: "ul",
        items: [
          `**AI rendering** from the SketchUp view in 20 to 60 seconds, with modes for exteriors, interiors, commercial, buildings and landscape (${C.render} credits).`,
          `**Creative AI:** virtual staging of empty rooms, rendered floor plans, diagrams and moodboards (${C.creative} credits).`,
          `**Masked edits, 4K upscale** (${C.upscale} credits), **video** from ${VIDEO_MIN.seconds} to ${VIDEO_MAX.seconds} seconds in 1080p, **360° panoramas** (${C.panorama} credits) and **3D blocks** from a photo (${C.block} credits).`,
          "**Tools that use no credits:** Mirror Reflection, Fake Light, Optimize File and Seamless Floors.",
          "**Runs** on SketchUp 2023 or newer, on Windows and Mac, in English, Portuguese and Spanish.",
        ],
      },
      { type: "h2", text: "October 2026" },
      {
        type: "ul",
        items: [
          `**1.0.38 (Oct 14): Refer and earn.** Every account has a code to send to colleagues. You get ${REFERRAL.reward} credits for each friend who buys, and your friend gets ${REFERRAL.bonus} extra credits.`,
          "**1.0.37 (Oct 13):** on Windows set to Portuguese, network error messages show up again instead of leaving the panel loading.",
          "**1.0.36 (Oct 13):** new-version notice at the top of the panel; videos can take up to 20 minutes without the plugin giving up; the video No sound option now works; 360° panoramas stay in the History even after the original link expires; and a failed connection says that no credit was charged.",
          "**Oct 11:** when the main model refuses an image, Vizai tries again with another model before showing a warning.",
          "**Oct 7:** renders, edits and 4K move to Google's Nano Banana 2.1, and 360° panoramas to GPT Image 2.5, which delivers in about 20 seconds (more than a minute before).",
          "**1.0.35 (Oct 2):** 3D blocks wait up to 14 minutes and, if the result never arrives, the panel says the credits went back to your account. The same applies to videos.",
        ],
      },
      { type: "h2", text: "September 2026" },
      {
        type: "ul",
        items: [
          "**Sep 30:** credit packs accept Pix (Brazilian instant payment), with credits released right away.",
          "**1.0.34 (Sep 16):** clearer notices when changing plans, if the subscription card does not allow an instant upgrade.",
          "**1.0.33 (Sep 12):** the 3:4 aspect ratio replaces 7:5.",
          "**1.0.32 (Sep 5):** the History shows the real credit cost of each generation, and the panel no longer depends on files downloaded from elsewhere.",
          "**1.0.31 (Sep 1):** the panel opens one window at a time, and framing guides no longer show up in the image sent to the AI.",
        ],
      },
      { type: "h2", text: "August 2026" },
      {
        type: "ul",
        items: [
          "**1.0.30 (Aug 29):** the panel follows SketchUp's language and warns when a generation is taking longer than usual.",
          "**Aug 20:** surroundings buttons for exteriors, to choose what appears around the project.",
          "**Aug 19:** the plugin detects when the Windows firewall blocks SketchUp and offers to unblock it.",
          "**Aug 15:** the plugin checks the SketchUp version and warns when it is older than 2023, instead of opening a panel that does not work.",
          "**1.0.25 (Aug 13):** the History keeps renders between sessions, and Mirror Reflection gets 6 surface types and live adjustment.",
          "**Aug 10:** the 360 tab is rebuilt: you mark the viewpoint right in the model.",
          "**1.0.21 (Aug 6):** Mirror Reflection works on heavy files and accepts several faces at once, with Shift.",
          "**1.0.20 (Aug 3):** Fake Light, with LED strip and spotlight, in the Scenes tab.",
        ],
      },
      { type: "h2", text: "July 2026" },
      {
        type: "ul",
        items: [
          "**1.0.19 (Jul 30):** a notice in the panel when a plan renewal is declined.",
          "**1.0.18 (Jul 28):** the installer is digitally signed.",
          "**Jul 5:** instant plan changes: an upgrade applies right away, with the new plan's credits.",
        ],
      },
      { type: "h2", text: "June and May 2026" },
      {
        type: "ul",
        items: [
          "**1.0.14 (Jun 18):** the balance updates on its own when the welcome credits arrive.",
          "**1.0.13 (Jun 14):** Mirror Reflection per scene, with a mirrored camera.",
          "**Jun 11:** fix for connections on Windows (certificate error) and a balance that shows up even when SketchUp's built-in browser fails.",
          "**1.0.9 (Jun 7):** Tools tab, with Optimize File and Seamless Floors, using no credits.",
          "**1.0.5 (Jun 2):** first version of Mirror Reflection.",
          "**Jun 1:** update notice inside the plugin.",
          "**May 31:** full-screen Before and After comparison.",
          "**Late May:** launch of Vizai, the AI rendering plugin for SketchUp.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the latest version of Vizai?",
        a: "Version 1.0.38, released on October 14, 2026, which added Refer and earn. This page is updated with every new version.",
      },
      {
        q: "How do I update Vizai?",
        a: "When a new version is out, the Vizai panel shows a notice at the top with a download button. Then install the .rbz file through SketchUp's Extension Manager, just like the first installation.",
      },
    ],
  },
};
