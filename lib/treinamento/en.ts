import type { ArticleContent, TreinoUiStrings } from "./types";

export const enUi: TreinoUiStrings = {
  badge: "Official Vizai Render training",
  title: "Learn to master Vizai Render",
  subtitle:
    "Complete guides to every tool in the plugin — from your first render to video and 360° presentations. Everything explained step by step, with real images of the interface and the results.",
  featuredLabel: "Start here",
  readMore: "Read guide",
  minRead: "min read",
  backToIndex: "All guides",
  prevArticle: "Previous",
  nextArticle: "Next",
  ctaTitle: "Ready to try it yourself?",
  ctaSubtitle:
    "Create your account, install the plugin and get 8 free credits on your first login.",
  ctaDownload: "Download plugin",
  ctaSignup: "Create free account",
  categories: {
    start: "Start here",
    render: "Render",
    creative: "Creative AI",
    present: "Presentation",
    free: "Free tools",
  },
};

export const enArticles: Record<string, ArticleContent> = {
  "primeiros-passos": {
    title: "Getting started: install the plugin and sign in for the first time",
    excerpt:
      "How to install Vizai Render in SketchUp, sign in with your Google account, activate your 8 free credits and understand the panel in just a few minutes.",
    blocks: [
      {
        type: "p",
        text: "Vizai Render is an AI rendering plugin that runs inside SketchUp. You set up the scene, pick a style and get a photorealistic render in seconds — no exporting, no external software and no powerful graphics card required. This guide gets everything up and running.",
      },
      { type: "h2", text: "Installation" },
      {
        type: "steps",
        items: [
          {
            title: "Download the .rbz file",
            text: "On the website's download page, grab the latest version of the plugin (compatible with SketchUp 2017 or later, Windows and Mac).",
          },
          {
            title: "Install from inside SketchUp",
            text: "Open SketchUp and go to Extensions → Extension Manager → Install Extension, select the downloaded .rbz file and confirm.",
          },
          {
            title: "Open Vizai Render",
            text: "The panel lives under Extensions → Vizai Render, or via the toolbar icon.",
          },
        ],
      },
      {
        type: "video",
        src: "/tutorial-sketchup.mp4",
        caption: "Installing the plugin via SketchUp's Extension Manager.",
      },
      { type: "h2", text: "Sign-in and welcome credits" },
      {
        type: "p",
        text: "You sign in with your Google account, in one click — no new password needed. On your **first login from the plugin** you receive **8 free credits** to try the tools. Your balance shows in the top-right corner of the panel, next to your profile.",
      },
      {
        type: "tip",
        text: "Created your account on the website? The 8 free credits are activated when you first sign in inside the plugin — that's where they show up.",
      },
      { type: "h2", text: "Getting to know the panel" },
      {
        type: "img",
        src: "/treinamento/ui/cenas-{lang}.webp",
        alt: "Vizai Render main panel",
        caption: "The Vizai Render panel inside SketchUp.",
        ui: true,
      },
      {
        type: "p",
        text: "The panel is organized into 6 tabs that follow the natural flow of a project:",
      },
      {
        type: "ul",
        items: [
          "**Scenes** — prepares the capture: lighting, image format, focal length and composition.",
          "**Studio** — the heart of the plugin: generates the photorealistic render or runs the Creative AI tools (moodboard, staging, rendered floor plan and diagram).",
          "**Video** — animates your renders into cinematic clips with camera movement and ambient sound.",
          "**360** — generates interactive spherical panoramas for your client to explore in the browser.",
          "**Blocks** — turns a reference photo into a 3D model you can drop into the scene.",
          "**History** — everything you've generated in the project, with filters and credit tracking.",
        ],
      },
      {
        type: "p",
        text: "Beyond the tabs there's the **Tools** window (green side tab), with free local utilities to optimize your file and create seamless floors — and the **Editor**, which opens whenever you click Edit on a render.",
      },
      {
        type: "tip",
        text: "Follow the tab order: prepare the scene in Scenes, render in Studio, and only then move on to video, 360 or edits. A well-prepared scene means better renders and fewer credits spent on retries.",
      },
    ],
  },

  "como-funciona-creditos": {
    title: "How credits, plans and per-tool costs work",
    excerpt:
      "Understand Vizai Render's credit system: what each operation costs, the difference between monthly plans and one-time packs, and how to track your balance.",
    blocks: [
      {
        type: "p",
        text: "Everything in Vizai Render runs on **credits**: each AI generation consumes a fixed amount, deducted from your balance. Local tools (like the Tools window, the Editor's photo adjustments and Mirror Reflection) are **free** — you only pay for what the AI generates.",
      },
      { type: "h2", text: "Cost of each tool" },
      {
        type: "table",
        head: ["Tool", "Cost"],
        rows: [
          ["Render (Studio)", "4 credits"],
          ["Creative AI (Moodboard, Staging, Floor Plan, Diagram)", "3 credits"],
          ["AI Editing (inpaint, new perspectives)", "4 credits"],
          ["4K export (upscale)", "5 credits"],
          ["360° Panorama", "5 credits"],
          ["AI Video (4 to 15 seconds)", "22 to 83 credits"],
          ["3D Block from photo", "28 credits"],
          ["Tools window, photo adjustments, crop, 2K download", "Free"],
        ],
      },
      {
        type: "p",
        text: "The cost is always shown **before** you confirm: the generate button displays the amount (e.g. “Render (4 credits)”). If your balance is too low, the plugin warns you and nothing is charged.",
      },
      {
        type: "tip",
        text: "If a generation fails due to a server error, the credits are refunded automatically. You never pay for a render that didn't arrive.",
      },
      { type: "h2", text: "Monthly plans and one-time packs" },
      {
        type: "p",
        text: "There are two ways to get credits, and they complement each other:",
      },
      {
        type: "ul",
        items: [
          "**Monthly plans** — Starter (300 credits/month), Pro (750 credits/month) and Business (2,000 credits/month). Credits renew every month and you can cancel anytime.",
          "**One-time packs** — from 50 to 1,850 credits in a single purchase. They **never expire** and are consumed after your monthly credits.",
        ],
      },
      {
        type: "p",
        text: "You can subscribe and buy both on the website and from inside the plugin: click your profile in the top-right corner of the panel and choose **Subscription** or **+ Buy credits**. Payment is processed by Stripe and the balance lands in your account within seconds.",
      },
      { type: "h2", text: "Tracking your usage" },
      {
        type: "img",
        src: "/treinamento/ui/hist-{lang}.webp",
        alt: "Vizai Render History tab",
        caption: "The History tab shows everything generated and the credits used.",
        ui: true,
      },
      {
        type: "p",
        text: "The **History** tab lists every render, video and block generated in the project, with filters by type and the total credits used. The balance bar at the top of the panel shows what's left — and, if you're on a plan, how many days until it renews.",
      },
    ],
  },

  "preparando-a-cena": {
    title: "Scenes tab: set up the perfect framing before rendering",
    excerpt:
      "Scene lighting, output format, focal length, rule of thirds and 2-point perspective — everything that defines your render quality starts here.",
    blocks: [
      {
        type: "p",
        text: "The AI renders exactly what it sees in your viewport. That's why the step that most influences quality isn't the prompt — it's **scene preparation**. The Scenes tab gathers every control for it, without touching SketchUp's settings.",
      },
      {
        type: "img",
        src: "/treinamento/ui/cenas-full-{lang}.webp",
        alt: "Full Scenes tab of Vizai Render",
        caption: "The Scenes tab: lighting, format, focal length and composition guides.",
        ui: true,
      },
      { type: "h2", text: "Scene lighting" },
      {
        type: "p",
        text: "The **Light** and **Dark** controls adjust SketchUp's shadows. Raise both together to brighten the scene and reveal more detail — the more the AI sees of your model, the more faithful the render. The **Use sun for shading** toggle improves how volumes read.",
      },
      {
        type: "p",
        text: "Don't want to think about it? Use the presets: **Exterior** for facades and open areas, **Interior** for indoor spaces. One click applies the recommended setup, and the plugin restores your file's original shadow settings when you close the panel.",
      },
      { type: "h2", text: "Output format" },
      {
        type: "p",
        text: "Choose the final aspect ratio before rendering: **Landscape 16:9** (presentations), **Square 1:1**, **Feed 4:5** and **Portrait 9:16** (social media), plus 5:4, **Classic 4:3**, **Photo 3:2** and 7:5. The viewport shows the crop mask in real time — what's inside is what gets rendered.",
      },
      { type: "h2", text: "Focal length" },
      {
        type: "p",
        text: "Focal length completely changes how the space reads: **24mm (wide angle)** embraces small interiors, **35–55mm** are neutral and realistic, **70–85mm** compress the perspective like a professional detail shot. There's also a **Custom** mode to set the value manually.",
      },
      {
        type: "tip",
        text: "For residential interiors, 24mm to 35mm is the architecture photography standard. For facades, try 35mm to 55mm from further away — it distorts verticals less.",
      },
      { type: "h2", text: "Composition guides" },
      {
        type: "ul",
        items: [
          "**Rule of thirds** — overlays photography's classic guide lines on the viewport, so you can place points of interest on the strong spots of the frame.",
          "**2-point perspective** — activates SketchUp's architectural perspective: every vertical stays perfectly straight, the standard in professional architecture photos.",
        ],
      },
      { type: "h2", text: "Saving scenes" },
      {
        type: "p",
        text: "Found the perfect angle? Name it and click **Save** — the scene is created in SketchUp so you can return to it anytime. Save your 3 or 4 main angles before rendering: it makes generating the project's full image series (and redoing tweaks later) much easier.",
      },
    ],
  },

  "primeiro-render": {
    title: "Your first photorealistic render in the Studio",
    excerpt:
      "The complete walkthrough of Render mode: project type, weather, lights and scene details — plus how to write descriptions that improve the result.",
    blocks: [
      {
        type: "p",
        text: "With the scene prepared, rendering is just following the 5 numbered steps in the **Studio** tab, in **Render** mode. In seconds the AI returns a photorealistic image of your exact viewport angle, preserving your design — geometry, materials and composition.",
      },
      {
        type: "img",
        src: "/treinamento/ui/studio-render-{lang}.webp",
        alt: "Studio tab in Render mode",
        caption: "Studio's Render mode: 5 numbered steps down to the Render button.",
        ui: true,
      },
      { type: "h2", text: "The 5 steps" },
      {
        type: "steps",
        items: [
          {
            title: "Project type",
            text: "Tells the AI what it's looking at: Interiors, Exterior Facade, Set in Nature (landscape integration), Commercial (store, office) or Building. Each type gets specific lighting and context treatment.",
          },
          {
            title: "Quality",
            text: "Vizai's image engine (Nano Banana Pro) — each render costs 4 credits.",
          },
          {
            title: "Weather style",
            text: "Day, Sunset, Night or Cloudy. Sets the sky, light temperature and overall mood of the image.",
          },
          {
            title: "Lights",
            text: "Lights on (nighttime interiors or cozy spaces), lights off, or None to let the AI decide what's natural.",
          },
          {
            title: "Scene details",
            text: "Optional free-text field to guide the AI: materials, vegetation, atmosphere. It's automatically merged into the prompt.",
          },
        ],
      },
      { type: "h2", text: "The result" },
      {
        type: "compare",
        before: { src: "/compare2-before.jpg", label: "SketchUp model" },
        after: { src: "/compare2-after.jpg", label: "Vizai render" },
      },
      {
        type: "p",
        text: "The render appears right in the panel with the **Before/After** control to compare against the original model — full screen included. From there you can **Download** the image, open the **Editor** to refine it, or **Export in high resolution**: the standard download is free, and the **4K upscale costs 5 credits**.",
      },
      { type: "h2", text: "Writing good scene details" },
      {
        type: "p",
        text: "The details field doesn't need elaborate sentences — comma-separated keywords work best. Describe what the AI can't guess from the model:",
      },
      {
        type: "ul",
        items: [
          "**Specific materials**: “satin porcelain floor, freijó wood joinery, white quartz countertop”.",
          "**Vegetation and surroundings**: “tropical vegetation, trimmed lawn, tree-lined street”.",
          "**Atmosphere**: “soft late-afternoon light, cozy ambiance”.",
        ],
      },
      {
        type: "tip",
        text: "Apply real textures to the model instead of leaving it all white: the AI respects the materials it sees. Textured model + short prompt details = the most faithful result.",
      },
      {
        type: "warn",
        text: "If the render comes out dark or with “invented” areas, go back to the Scenes tab and brighten the lighting — the AI usually just couldn't see that part of the model.",
      },
      { type: "cost", text: "4 credits per render · optional 4K upscale for 5 credits" },
    ],
  },

  "editar-render": {
    title: "Editor: inpainting, new perspectives and professional adjustments",
    excerpt:
      "Everything in the Edit Render window: fix specific areas with AI, generate new angles and close-ups from a finished render, crop and finish the photo — without re-rendering.",
    blocks: [
      {
        type: "p",
        text: "Got a good render, but the sofa looks off? Want the same room from another angle, or a close-up of the countertop for a presentation? That's what the **Editor** is for — click **Edit** on any render and it opens in a dedicated window with three tabs: **AI Editing**, **Crop** and **Adjustments**.",
      },
      {
        type: "img",
        src: "/treinamento/ui/editor-ia-{lang}.webp",
        alt: "Edit Render window with the AI Editing tab",
        caption: "The Editor: mask tools, edit prompt and history on the right.",
      },
      { type: "h2", text: "AI Editing (inpainting)" },
      {
        type: "p",
        text: "Inpainting lets you change **just one area** of the image while keeping everything else intact. Paint the region you want to change and describe the edit:",
      },
      {
        type: "steps",
        items: [
          {
            title: "Mark the area",
            text: "Use the Brush (with thickness control), Rectangle or Circle to create the mask. Made a mistake? Eraser, Undo stroke or Clear mask.",
          },
          {
            title: "Describe the change",
            text: "“Replace the sofa with a beige linen one”, “remove the car”, “add framed art to the wall”… The AI edits only the marked area.",
          },
          {
            title: "Apply and compare",
            text: "Each edit costs 4 credits and joins the side history — navigate between versions and hold the Before/After button to compare with the original.",
          },
        ],
      },
      {
        type: "video",
        src: "/tools/tool-edit.mp4",
        caption: "Inpainting in action: mark, describe, and the AI changes only that area.",
      },
      {
        type: "tip",
        text: "With no mask at all, your command applies to the whole image — handy for global changes like “make it nighttime” or “change the wall color”.",
      },
      { type: "h2", text: "New perspectives: several scenes from one render" },
      {
        type: "p",
        text: "This is one of the Editor's most powerful features: ask for **another angle** of the same space right in the text field, without moving the camera in SketchUp and without spending a brand-new render. The AI understands the intent of your command:",
      },
      {
        type: "ul",
        items: [
          "**“Close-up of the armchair”** — mark the armchair (or just type it) and get a tight detail shot, with materials and lighting preserved.",
          "**“Side view of the room”** or **“new perspective showing the kitchen from the right”** — generates the same space seen from another point.",
          "**“Drone view”** — pulls the camera up and away for an aerial shot.",
        ],
      },
      {
        type: "img",
        src: "/tools/tool-02.jpg",
        alt: "New perspectives generated from one render",
        caption: "One base render can become a whole series of project images.",
      },
      {
        type: "p",
        text: "In practice, a single 4-credit render becomes the basis of a **complete presentation**: generate the overview, then ask for detail close-ups and alternative angles at 4 credits each — much faster than repositioning the camera and re-rendering every view.",
      },
      { type: "h2", text: "Crop and Adjustments (free)" },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/editor-crop-{lang}.webp",
            alt: "Editor Crop tab",
            caption: "Crop with preset ratios or freeform.",
          },
          {
            src: "/treinamento/ui/editor-adjust-{lang}.webp",
            alt: "Editor Adjustments tab",
            caption: "Fine photo adjustments, at no cost.",
          },
        ],
      },
      {
        type: "p",
        text: "The **Crop** tab reframes the image to the plugin's ratios (Landscape, Square, Feed, Portrait, Classic, Photo) or free/custom crops. The **Adjustments** tab finishes it like a photo editor: **brightness, contrast, saturation, exposure and temperature**. Both are completely free, as is the 2K download.",
      },
      {
        type: "p",
        text: "Clicking **Finish Editing** sends the final version back to the main panel — ready to become a video, a 360 or a 4K upscale.",
      },
      { type: "cost", text: "AI editing and new perspectives: 4 credits each · Crop, Adjustments and 2K download: free" },
    ],
  },

  "reflexo-espelho": {
    title: "Mirror Reflection: realistic mirrors in interiors",
    excerpt:
      "SketchUp doesn't render reflections — Vizai solves it by generating the room's real reflection on the mirror face, for free, before you render.",
    blocks: [
      {
        type: "p",
        text: "Mirrors are a classic problem: SketchUp shows a flat gray face, and the AI, with no reference, invents a random reflection. The **Mirror Reflection** tool (in the Scenes tab) projects onto the mirror face what it would **really reflect** — and then you render, with the mirror consistent with the room.",
      },
      { type: "h2", text: "How to use it" },
      {
        type: "steps",
        items: [
          {
            title: "Position the camera",
            text: "Set the viewport to the exact angle you'll render. The reflection is computed from that point of view.",
          },
          {
            title: "Select the mirror face",
            text: "In SketchUp, click the face that represents the mirror glass. It even works with mirrors made of several continuous coplanar faces.",
          },
          {
            title: "Choose the reflection direction",
            text: "Back reflection (what's behind you), Left or Right — whatever the mirror should show at that angle.",
          },
        ],
      },
      {
        type: "p",
        text: "The plugin photographs the room in the chosen direction, mirrors the image and applies it to the face — in seconds, **at no credit cost**, since everything happens locally in your SketchUp.",
      },
      {
        type: "warn",
        text: "The reflection is computed for the current camera angle. If you move the camera afterwards, redo the reflection before rendering.",
      },
      {
        type: "tip",
        text: "Use it in bathrooms, closets, halls and gyms — spaces where the mirror dominates the wall. The difference in the final render's realism is huge.",
      },
      { type: "cost", text: "Free — processed locally, no credits" },
    ],
  },

  "decorar-ambiente": {
    title: "Stage Room: AI furniture and decor for empty spaces",
    excerpt:
      "Vizai's virtual staging: upload an empty room, pick the space type and decor styles, and the AI creates a complete layout.",
    blocks: [
      {
        type: "p",
        text: "**Stage Room** is Creative AI's virtual staging tool: it furnishes and decorates a space from a base image. Perfect for showing the potential of empty spaces — off-plan properties, renovations, home staging for sale.",
      },
      {
        type: "compare",
        before: { src: "/tools/tool-07-empty.avif", label: "Empty room" },
        after: { src: "/tools/tool-07.jpg", label: "AI staged" },
      },
      { type: "h2", text: "Step by step" },
      {
        type: "steps",
        items: [
          {
            title: "Switch to Creative AI",
            text: "In the Studio tab, toggle from Render to Creative AI and choose Stage Room.",
          },
          {
            title: "Upload the base image",
            text: "Drag a photo or render of the space (JPG/PNG up to 5MB), or capture straight from the viewport.",
          },
          {
            title: "Configure the style",
            text: "Choose the room type, the decor styles and the time of day (day or night).",
          },
          {
            title: "Generate",
            text: "3 credits per image. The result arrives with Before/After to compare against the base.",
          },
        ],
      },
      {
        type: "img",
        src: "/treinamento/ui/modal-decorar-{lang}.webp",
        alt: "Stage Room configuration modal",
        caption: "13 room types and 8 combinable decor styles.",
        ui: true,
      },
      { type: "h2", text: "Room types and styles" },
      {
        type: "p",
        text: "There are **13 room types** — Living Room, Bedroom, Kitchen, Bathroom, Office, Balcony, Garage, Hall, Pool, Wine Cellar, Pantry, Dining Room and Gourmet Area — and **8 decor styles** you can combine: Modern, Minimalist, Classic, Industrial, Scandinavian, Rustic, Contemporary and Tropical. Enable more than one for a mix (e.g. Modern + Scandinavian), or none to let the AI roam free.",
      },
      {
        type: "tip",
        text: "For the best result, use an image of the room **without furniture**: with walls, floor and structure clearly visible, the AI places furniture far more accurately.",
      },
      { type: "cost", text: "3 credits per generation" },
    ],
  },

  "planta-humanizada": {
    title: "Rendered Floor Plan: from technical drawing to presentation",
    excerpt:
      "Turn your model's floor plan (or a drawing from your PC) into a rendered, presentation-ready floor plan for your client.",
    blocks: [
      {
        type: "p",
        text: "**Rendered Floor Plan** converts a technical drawing — your model's top view or a plan you already have as an image — into a rendered plan with floors, furniture, vegetation and shadows, in the style of real-estate launch presentations.",
      },
      {
        type: "img",
        src: "/tools/tool-08.jpg",
        alt: "Rendered floor plan generated by Vizai Render",
        caption: "Result: technical plan turned into a presentation.",
      },
      { type: "h2", text: "Capturing the plan from the viewport" },
      {
        type: "steps",
        items: [
          {
            title: "Top view",
            text: "In SketchUp, set the camera to Camera → Standard Views → Top.",
          },
          {
            title: "Parallel Projection",
            text: "Enable Camera → Parallel Projection — this removes perspective and keeps the plan “flat”, like a technical drawing.",
          },
          {
            title: "Frame and capture",
            text: "Zoom so the plan fills the viewport and click Capture Current Scene in the plugin.",
          },
        ],
      },
      {
        type: "p",
        text: "You can also skip the capture and **upload an image from your PC** — it works with plans exported from AutoCAD, Revit or even a photo of a drawing, as long as the walls are legible.",
      },
      { type: "h2", text: "Notes that make a difference" },
      {
        type: "p",
        text: "In the notes field, describe materials and palette: “light porcelain floor, linen sofa, natural wood joinery, decorative plants”. The AI keeps the wall layout and applies the finishes you describe.",
      },
      {
        type: "tip",
        text: "Capture with room labels and dimensions turned off for a clean plan — or keep the text if the presentation calls for an annotated plan.",
      },
      { type: "cost", text: "3 credits per generation" },
    ],
  },

  diagrama: {
    title: "Diagram: isometric and axonometric views in 5 styles",
    excerpt:
      "Generate conceptual diagrams of your project — from technical B&W isometrics to a balsa-wood physical model look — from a viewport capture.",
    blocks: [
      {
        type: "p",
        text: "The **Diagram** tool turns an isometric view of your model into conceptual boards with an architecture-office visual language — great for competitions, presentation boards and social media.",
      },
      {
        type: "img",
        src: "/tools/tool-09.png",
        alt: "Diagram generated by Vizai Render",
        caption: "Diagram generated from an isometric capture of the model.",
      },
      { type: "h2", text: "Capturing the base" },
      {
        type: "steps",
        items: [
          {
            title: "Isometric view",
            text: "Set the camera to an isometric angle (Camera → Standard Views → Iso, or adjust manually).",
          },
          {
            title: "Parallel Projection",
            text: "Enable Camera → Parallel Projection for the correct axonometric effect, with no vanishing points.",
          },
          {
            title: "Capture or upload",
            text: "Use Capture Current Scene, or upload an image from your PC.",
          },
        ],
      },
      { type: "h2", text: "The 5 styles" },
      {
        type: "p",
        text: "First pick the context — **Exterior** (with surroundings) or **Interiors** (isolated rooms) — then the style:",
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/tecnico.webp",
            alt: "Technical isometric diagram",
            caption: "Technical Isometric — B&W lines with detailed urban context.",
          },
          {
            src: "/demo/assets/diag/destaque.webp",
            alt: "Highlight diagram",
            caption: "Highlight — project in color, surroundings in gray.",
          },
          {
            src: "/demo/assets/diag/colorido.webp",
            alt: "Colored diagram with context",
            caption: "Colored — watercolor illustration with surroundings.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/maquete.webp",
            alt: "Physical model style diagram",
            caption: "Physical Model — balsa-wood model style.",
          },
          {
            src: "/demo/assets/diag/int_axo.webp",
            alt: "Interior axonometric diagram",
            caption: "Axonometric — isometric cutaway of the interior space.",
          },
        ],
      },
      {
        type: "tip",
        text: "The Highlight style is the favorite for competitions and posts: the eye goes straight to the project, and the gray surroundings provide context without competing.",
      },
      { type: "cost", text: "3 credits per generation" },
    ],
  },

  moodboard: {
    title: "Moodboard: material and concept boards in one click",
    excerpt:
      "Create professional moodboards from a reference image — 7 scene compositions and 5 aspect ratios, from flat lays to presentation boards.",
    blocks: [
      {
        type: "p",
        text: "**Moodboard** generates visual reference boards — material samples, palette and objects — from a base image of your project or your references. It's the tool for the start of the client conversation: it presents the concept before the first render even exists.",
      },
      {
        type: "img",
        src: "/tools/tool-06.jpg",
        alt: "Moodboard generated by Vizai Render",
        caption: "Moodboard generated with the project's material samples.",
      },
      { type: "h2", text: "Available compositions" },
      {
        type: "p",
        text: "There are **7 composition styles** — the “scene” where the samples are photographed:",
      },
      {
        type: "ul",
        items: [
          "**Studio Bench** — premium surface with a soft gradient background.",
          "**Project Table** — on a work table, semi-blurred background.",
          "**Top View** — flat lay straight from above, no perspective.",
          "**Presentation Board** — samples pinned to a vertical board.",
          "**Lit Floor** — flat lay on a wooden floor with side light.",
          "**Material Line** — samples aligned in a horizontal row.",
          "**Decorated Rug** — 3/4 composition over a rug with objects.",
        ],
      },
      {
        type: "img",
        src: "/treinamento/ui/modal-moodboard-{lang}.webp",
        alt: "Moodboard configuration modal",
        caption: "Pick the composition and aspect ratio in the configuration modal.",
        ui: true,
      },
      { type: "h2", text: "Aspect ratios" },
      {
        type: "p",
        text: "The moodboard comes out in the right format for its destination: **1:1** (classic Instagram), **4:3** (presentations), **16:9** (screens and portfolio), **4:5** (vertical feed) and **9:16** (Stories and Reels).",
      },
      {
        type: "tip",
        text: "Use a base image that already contains the project's materials (one of your renders, or a reference collage). The AI extracts the palette and materials from it.",
      },
      { type: "cost", text: "3 credits per generation" },
    ],
  },

  "video-com-ia": {
    title: "AI Video: animate your renders with cinematic camera work",
    excerpt:
      "Turn a render into a 4-to-15-second video with professional camera movement and AI-generated ambient sound — right from the plugin.",
    blocks: [
      {
        type: "p",
        text: "The **Video** tab turns any render into a cinematic clip using **Kling 3.0 Pro**, one of the most advanced video engines in the world. Output is **1080p**, with smooth camera movement and, if you want, AI-generated ambient sound.",
      },
      {
        type: "video",
        src: "/tools/tool-03.mp4",
        caption: "Video generated from a plugin render.",
      },
      { type: "h2", text: "Building the video" },
      {
        type: "img",
        src: "/treinamento/ui/video-{lang}.webp",
        alt: "Vizai Render Video tab",
        caption: "The Video tab: frames, aspect ratio, camera and duration.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Start frame",
            text: "The video's starting point: use your latest render, pick from history or upload from your PC.",
          },
          {
            title: "End frame (optional)",
            text: "Set an arrival image too and the AI creates the transition between them — great for a “tour” between two angles of the room.",
          },
          {
            title: "Aspect ratio",
            text: "16:9 landscape, 1:1 square or 9:16 vertical for Reels and Stories.",
          },
          {
            title: "Camera and audio",
            text: "Choose the movement and the sound in the configuration modal (details below).",
          },
          {
            title: "Duration",
            text: "4, 6, 8, 10 or 15 seconds — the cost shows on the button before you generate.",
          },
        ],
      },
      { type: "h2", text: "Camera movements" },
      {
        type: "img",
        src: "/treinamento/ui/modal-camera-{lang}.webp",
        alt: "Video camera and audio modal",
        caption: "8 preset movements + free-text movement description.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Automatic** — natural movement chosen by the AI (recommended).",
          "**Zoom In / Zoom Out** — smooth approach or pull-back.",
          "**Pan left / right** — lateral glide.",
          "**Tilt Up / Tilt Down** — upward or downward tilt.",
          "**Orbit (Drone)** — smooth sweep around the project.",
        ],
      },
      {
        type: "p",
        text: "Prefer to direct the scene? Describe the movement freely (“camera slowly moves through the living room revealing the balcony”) and use **Notes** to ask for focus on an element. For audio, choose **AI Ambient Sound** — wind, footsteps, urban sounds, free — or a silent video for later editing.",
      },
      {
        type: "table",
        head: ["Duration", "Cost"],
        rows: [
          ["4 seconds", "22 credits"],
          ["6 seconds", "33 credits"],
          ["8 seconds", "44 credits"],
          ["10 seconds", "55 credits"],
          ["15 seconds", "83 credits"],
        ],
      },
      {
        type: "tip",
        text: "4–6 second videos with Automatic or Zoom In movement convert best on social media — and they're the cheapest. Start there.",
      },
    ],
  },

  "panorama-360": {
    title: "360° Panorama: immersive presentations your client can explore",
    excerpt:
      "Generate a spherical panorama of the space and share it via link or WhatsApp — your client pans, zooms and explores in the browser, no installs.",
    blocks: [
      {
        type: "p",
        text: "The **360** tab stitches views of your space into an **interactive spherical panorama**. Your client receives a link, opens it in the browser (desktop or phone) and explores the space by panning around — the closest experience to “being inside” the project.",
      },
      {
        type: "img",
        src: "/demo/360/pano-result.webp",
        alt: "360 panorama generated by Vizai Render",
        caption: "The generated equirectangular panorama — ready for the interactive viewer.",
      },
      { type: "h2", text: "Two ways to generate" },
      {
        type: "img",
        src: "/treinamento/ui/pano-{lang}.webp",
        alt: "Vizai Render 360 tab",
        caption: "The 360 tab: automatic capture or render uploads.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Capture from SketchUp** — with the camera placed at the center of the room, the plugin captures **6 views automatically** (front, right, back, left, ceiling and floor) and the AI stitches them into a 360 of the model.",
          "**Upload 4 renders** — for a photorealistic 360: render 4 views from the same central point (front, right, back, left, in 16:9 or 1:1), load them into the matching slots and generate.",
        ],
      },
      {
        type: "steps",
        items: [
          {
            title: "Place the camera at the center of the room",
            text: "Eye height (~1.60m) and the same point for every view.",
          },
          {
            title: "Capture or upload the views",
            text: "Via the automatic capture button, or by uploading your finished renders.",
          },
          {
            title: "Generate the 360",
            text: "5 credits. The AI stitches the views into a continuous spherical panorama.",
          },
          {
            title: "Share",
            text: "View it in the plugin, download the image, copy the link or send it straight via WhatsApp.",
          },
        ],
      },
      {
        type: "tip",
        text: "For a photorealistic 360: render the 4 views with the same weather and style (same Studio settings) — the stitching becomes invisible when the lighting matches across views.",
      },
      { type: "cost", text: "5 credits per panorama · sharing link is free" },
    ],
  },

  "blocos-3d": {
    title: "3D Blocks: turn any photo into a SketchUp model",
    excerpt:
      "Found the perfect chair in a reference image? The Blocks tab converts the photo into a textured 3D model and imports it straight into your scene.",
    blocks: [
      {
        type: "p",
        text: "The **Blocks** tab solves a classic: the client wants a specific furniture piece that doesn't exist in the 3D Warehouse. Send a reference photo and the AI rebuilds the object in 3D, textured, ready to import into the scene at the right scale.",
      },
      {
        type: "img",
        src: "/tools/tool-05.webp",
        alt: "3D block generated from a photo",
        caption: "From reference photo to a 3D block in the scene.",
      },
      { type: "h2", text: "How to generate" },
      {
        type: "img",
        src: "/treinamento/ui/blocos-{lang}.webp",
        alt: "Vizai Render Blocks tab",
        caption: "The Blocks tab: photo, mesh density and texture.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Add the reference photo",
            text: "Drag or click to upload. Works best with the whole object visible, well lit and on a clean background.",
          },
          {
            title: "Name the block",
            text: "The name keeps the component organized in your model (e.g. “Wooden Chair”).",
          },
          {
            title: "Choose the polygon density",
            text: "Light, Recommended, Heavy or Ultra. For SketchUp, Light or Recommended keep the file snappy.",
          },
          {
            title: "Texture",
            text: "With PBR texture (the photo's colors and materials) or geometry only, to apply your own materials.",
          },
          {
            title: "Import or download",
            text: "Import into scene drops the block straight into the model; or download the .GLB to use in any software.",
          },
        ],
      },
      {
        type: "warn",
        text: "Heavy/Ultra density blocks can slow down large files. If you overdo it, the Tools window (Component Impact) shows which blocks are weighing things down — and the Optimize File guide fixes it.",
      },
      { type: "cost", text: "28 credits per generated block" },
    ],
  },

  "otimizar-arquivo": {
    title: "Tools — Optimize File: get your .skp lightweight for free",
    excerpt:
      "Smart purge, duplicate materials, texture downscaling and a component impact report — the full file cleanup, 100% local and free.",
    blocks: [
      {
        type: "p",
        text: "File lagging, choppy orbit, .skp in the hundreds of MB? The **Tools** window (green side tab on the panel) includes **Optimize File**: a set of cleanups that runs 100% on your computer, **at no credit cost**. The file size shows at the top, before and after — you see the result instantly.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-otimizar-{lang}.webp",
        alt: "Tools window with the Optimize File tab",
        caption: "Optimize File: Cleanup, Textures and Impact.",
        ui: true,
      },
      { type: "h2", text: "Cleanup" },
      {
        type: "ul",
        items: [
          "**Purge** — removes materials, components and styles that aren't used anywhere in the project. It's the cleanup that shrinks files that have been through many revisions the most.",
          "**Duplicate Materials** — merges materials that use the same texture under different names (Wood, Wood1, Wood-copy…), common in models assembled from blocks of mixed origins.",
        ],
      },
      { type: "h2", text: "Textures" },
      {
        type: "p",
        text: "The **Texture Manager** lists every image in the model with its dimensions. 4K textures on a drawer handle are dead weight: select the oversized ones and downscale them to a target resolution in one click. The viewport look barely changes — the file size does.",
      },
      { type: "h2", text: "Impact" },
      {
        type: "p",
        text: "The **Component Impact** report shows which blocks carry the most geometry (faces) and how many instances exist of each. It's how you find out that a tree downloaded from the Warehouse has 800k faces — and that it's repeated 12 times. The View button locates the component in the model so you can decide what to do.",
      },
      {
        type: "tip",
        text: "Run Optimize File before rendering big projects: a light model means a fluid viewport and faster captures. And back up the first time you run heavy cleanups on an important file.",
      },
      { type: "cost", text: "Free — processed locally, no credits" },
    ],
  },

  "pisos-seamless": {
    title: "Tools — Seamless Floors: professional floor tiling in seconds",
    excerpt:
      "Create tileable floor textures from any image: porcelain, wood with variations, configurable grout and direct application to faces.",
    blocks: [
      {
        type: "p",
        text: "The second tool in the **Tools** window builds **seamless floor textures** from standalone images — that porcelain photo from the supplier's website becomes a tiled floor, with grout and the tile's real dimensions. Also local and free.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-pisos-{lang}.webp",
        alt: "Seamless Floors tab in the Tools window",
        caption: "Live tiling preview, with grout and real dimensions.",
        ui: true,
      },
      { type: "h2", text: "Building the floor" },
      {
        type: "steps",
        items: [
          {
            title: "Base texture",
            text: "Upload the tile image (a photo of the porcelain, wood or tile).",
          },
          {
            title: "Variations (optional)",
            text: "Add up to 3 alternative images from the same line — the plugin alternates the pieces and kills the repetition effect, essential for wood.",
          },
          {
            title: "Layout and rotation",
            text: "Straight Grid (aligned), 50% Offset or 1/3 Offset — and rotate the tile if needed (vertical planks, for example).",
          },
          {
            title: "Real dimensions",
            text: "Tile width and height in centimeters (90×90, 20×120…). The texture lands in SketchUp already at the correct scale.",
          },
          {
            title: "Grout",
            text: "Thickness in millimeters and color — gray, beige, black or matching the tile.",
          },
        ],
      },
      { type: "h2", text: "Applying to the model" },
      {
        type: "p",
        text: "The preview shows the tiling in real time. To apply: **select the floor faces** in SketchUp before clicking Apply Texture — the material is created and mapped straight onto them. With nothing selected, the plugin activates the paint bucket so you click wherever you want.",
      },
      {
        type: "tip",
        text: "Floors with correct tiling and grout raise the render's realism: the AI respects the floor pattern it sees in the scene. Build the floor here before rendering in the Studio.",
      },
      { type: "cost", text: "Free — processed locally, no credits" },
    ],
  },
};
