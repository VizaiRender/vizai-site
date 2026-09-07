import type { ArticleContent, TreinoUiStrings } from "./types";

export const enUi: TreinoUiStrings = {
  badge: "Official Vizai Render training",
  title: "Vizai Render Training",
  subtitle:
    "Complete guides to every tool in the plugin, from your first render to video and 360° presentations. Everything explained step by step, with real images of the interface and the results.",
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
    aulas: "Video lesson",
    start: "Start here",
    render: "Render",
    creative: "Creative AI",
    present: "Presentation",
    free: "Free tools",
  },
};

export const enArticles: Record<string, ArticleContent> = {
  "primeiro-render": {
    title: "Your first photorealistic render in SketchUp, from framing to final image",
    excerpt:
      "The full lesson: set the scene in the Scenes tab, generate the render in Studio and refine the image in the editor, without leaving SketchUp.",
    blocks: [
{
        type: "p",
        text: "The AI renders exactly what it sees in your viewport. That's why the step that most influences quality isn't the prompt. It's **scene preparation**. The Scenes tab gathers every control for it, without touching SketchUp's settings.",
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
        text: "The **Light** and **Dark** controls adjust SketchUp's shadows. Raise both together to brighten the scene and reveal more detail. The more the AI sees of your model, the more faithful the render. The **Use sun for shading** toggle improves how volumes read.",
      },
      {
        type: "p",
        text: "Don't want to think about it? Use the presets: **Exterior** for facades and open areas, **Interior** for indoor spaces. One click applies the recommended setup, and the plugin restores your file's original shadow settings when you close the panel.",
      },
      { type: "h2", text: "Output format" },
      {
        type: "p",
        text: "Choose the final aspect ratio before rendering: **Landscape 16:9** (presentations), **Square 1:1**, **Feed 4:5** and **Portrait 9:16** (social media), plus 5:4, **Classic 4:3**, **Photo 3:2** and 7:5. The viewport shows the crop mask in real time. What's inside is what gets rendered.",
      },
      { type: "h2", text: "Focal length" },
      {
        type: "p",
        text: "Focal length completely changes how the space reads: **24mm (wide angle)** embraces small interiors, **35–55mm** are neutral and realistic, **70–85mm** compress the perspective like a professional detail shot. There's also a **Custom** mode to set the value manually.",
      },
      {
        type: "tip",
        text: "For residential interiors, 24mm to 35mm is the architecture photography standard. For facades, try 35mm to 55mm from further away. It distorts verticals less.",
      },
      { type: "h2", text: "Composition guides" },
      {
        type: "ul",
        items: [
          "**Rule of thirds**: overlays photography's classic guide lines on the viewport, so you can place points of interest on the strong spots of the frame.",
          "**2-point perspective**: activates SketchUp's architectural perspective: every vertical stays perfectly straight, the standard in professional architecture photos.",
        ],
      },
      { type: "h2", text: "Saving scenes" },
      {
        type: "p",
        text: "Found the perfect angle? Name it and click **Save**. The scene is created in SketchUp so you can return to it anytime. Save your 3 or 4 main angles before rendering: it makes generating the project's full image series (and redoing tweaks later) much easier.",
      },
        { type: "p", text: "With the scene saved, it is time to generate the first image. Everything happens in the Studio tab, and it takes less than a minute." },
{
        type: "p",
        text: "With the scene prepared, rendering is just following the 5 numbered steps in the **Studio** tab, in **Render** mode. In seconds the AI returns a photorealistic image of your exact viewport angle, preserving your design. Geometry, materials and composition.",
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
            text: "Tells the AI what it's looking at: Interiors, Exterior Facade, Set in Nature (landscape integration), Commercial (store, office) or Building. Each type gets specific lighting and context treatment. Picking **Exterior Facade** reveals a second choice, the plot surroundings: **Neighboring houses** (the default — one house on each side, matching your project's standard), **Walled empty lots** (vacant plots with a boundary wall or fence) or **Open bare land** (open ground, no walls or fences).",
          },
          {
            title: "Quality",
            text: "Vizai's image engine (Nano Banana Pro): each render costs 4 credits.",
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
        text: "The render appears right in the panel with the **Before/After** control to compare against the original model. Full screen included. From there you can **Download** the image, open the **Editor** to refine it, or **Export in high resolution**: the standard download is free, and the **4K upscale costs 5 credits**.",
      },
      { type: "h2", text: "Writing good scene details" },
      {
        type: "p",
        text: "The details field doesn't need elaborate sentences. Comma-separated keywords work best. Describe what the AI can't guess from the model:",
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
        text: "If the render comes out dark or with “invented” areas, go back to the Scenes tab and brighten the lighting. The AI usually just couldn't see that part of the model.",
      },
      { type: "cost", text: "4 credits per render · optional 4K upscale for 5 credits" },
        { type: "p", text: "The render is done, but you do not have to settle for the first result. The Edit window lets you fix a detail, create new perspectives and adjust the image without spending another render." },
{
        type: "p",
        text: "Got a good render, but the sofa looks off? Want the same room from another angle, or a close-up of the countertop for a presentation? That's what the **Editor** is for. Click **Edit** on any render and it opens in a dedicated window with three tabs: **AI Editing**, **Crop** and **Adjustments**.",
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
            text: "Each edit costs 4 credits and joins the side history. Navigate between versions and hold the Before/After button to compare with the original.",
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
        text: "With no mask at all, your command applies to the whole image. Handy for global changes like “make it nighttime” or “change the wall color”.",
      },
      { type: "h2", text: "New perspectives: several scenes from one render" },
      {
        type: "p",
        text: "This is one of the Editor's most powerful features: ask for **another angle** of the same space right in the text field, without moving the camera in SketchUp and without spending a brand-new render. The AI understands the intent of your command:",
      },
      {
        type: "ul",
        items: [
          "**“Close-up of the armchair”**: mark the armchair (or just type it) and get a tight detail shot, with materials and lighting preserved.",
          "**“Side view of the room”** or **“new perspective showing the kitchen from the right”**. Generates the same space seen from another point.",
          "**“Drone view”**: pulls the camera up and away for an aerial shot.",
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
        text: "In practice, a single 4-credit render becomes the basis of a **complete presentation**: generate the overview, then ask for detail close-ups and alternative angles at 4 credits each, much faster than repositioning the camera and re-rendering every view.",
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
        text: "Clicking **Finish Editing** sends the final version back to the main panel, ready to become a video, a 360 or a 4K upscale.",
      },
      { type: "cost", text: "AI editing and new perspectives: 4 credits each · Crop, Adjustments and 2K download: free" },
    ],
  },
  "reflexo-espelho": {
    title: "Mirror reflections and Fake Light in SketchUp",
    excerpt:
      "How to tie reflections on mirrors, glass and polished floors to your scene, and how to place LED strips and spots right in the model.",
    blocks: [
{
        type: "p",
        text: "A reflective surface is a classic problem: SketchUp shows a flat face, and the AI, with no reference, invents a random reflection. The **Mirror Reflection** tool (in the Scenes tab) projects onto the face what it would **really reflect**, and then you render, with the reflection consistent with the room.",
      },
      {
        type: "video",
        src: "/treinamento/ui/reflexo-espelho.mp4",
        caption: "Reflection applied right in the Scenes tab, with no credit cost.",
      },
      { type: "h2", text: "Six surface types" },
      {
        type: "p",
        text: "The capture is the same for all of them; what changes is the finish. Pick the type **before** clicking the face:",
      },
      {
        type: "ul",
        items: [
          "**Mirror**: opaque, full reflection. The tool's classic behaviour.",
          "**Floor**: polished porcelain, marble countertops, lacquered tables. A faint reflection on top: the floor material still drives the look.",
          "**TV**: a switched-off screen. Opaque and very dark, with the room only hinted at, like a real dark panel.",
          "**Clear**: clear glass on a shower or a door. Reflects less and lets you see through, without shifting the colour of what it reflects.",
          "**Bronze** and **Smoked**: the tinted glass of cabinet doors. Semi-transparent: the reflection sits on top and the cabinet interior shows underneath.",
        ],
      },
      { type: "h2", text: "How to use it" },
      {
        type: "steps",
        items: [
          {
            title: "Save the scene",
            text: "Set the viewport to the view you'll render and save it as a scene. The reflection is tied to that scene.",
          },
          {
            title: "Pick the type and click the face",
            text: "Select the surface type, click **Generate Reflection in Scene** and then the face. It lights up blue. No need to enter the group. Imported TV screens and floors often come split into many pieces: the plugin joins the neighbouring pieces on its own and the whole surface lights up.",
          },
          {
            title: "Surface in separate parts? Use Shift",
            text: "Panelled mirrors or glass in sheets: hold **Shift** and click the other faces, then press **Enter**. You get one continuous reflection, with no seam between the parts.",
          },
          {
            title: "Tune it without redoing it",
            text: "Floor and TV have one slider; clear, bronze and smoked have two. **Brightness** and **transparency**. Release the slider and the reflection already in the scene updates instantly, with no need to generate again. Each slider has a reset button.",
          },
        ],
      },
      {
        type: "p",
        text: "The plugin reflects the scene camera across the surface plane, captures what it would really reflect and projects it onto the face, in seconds, **at no credit cost**, since everything happens locally in your SketchUp.",
      },
      {
        type: "warn",
        text: "The reflection is **saved in the scene** and disappears when you switch scenes. Generate one per scene. If you change the scene's view later, redo the reflection before rendering. The **Delete all reflections** button clears everything the tool created in the model at once.",
      },
      {
        type: "tip",
        text: "With tinted glass, the cabinet interior only shows if the door material is transparent in SketchUp. And do combine them: a mirror in the bathroom, smoked glass on the closet doors, a polished floor in the living room. The set is what makes the render look like a photograph.",
      },
      { type: "cost", text: "Free: processed locally, no credits" },
        { type: "p", text: "The reflection is in the scene. Now to the second tool in this lesson, Fake Light, which solves room lighting without modeling a single fixture." },
{
        type: "p",
        text: "SketchUp doesn't show light. You model the cove, the niche, the mirror, and the scene stays flat, with no hint of what should glow in the render. **Fake Light** (in the Scenes tab, right below Mirror Reflection) solves that by drawing the light: an LED strip running along an edge, or a spot with a visible beam. It isn't real lighting. It's a clear reference so the AI knows where the light is and what color it is.",
      },
      {
        type: "video",
        src: "/treinamento/ui/luz-fake.mp4",
        caption: "LED strip behind the mirror, in the millwork and spots on the ceiling, all local, with no credit cost.",
      },
      { type: "h2", text: "LED Strip or Spot" },
      {
        type: "ul",
        items: [
          "**LED Strip**: runs along a line (cove, niche, baseboard) or traces the entire edge of a mirror. Under **Object type** you pick between **Millwork** and **Mirror**.",
          "**Spot**: the cone of light from a fixture. You click the fixture face and the beam comes out of it.",
        ],
      },
      { type: "h2", text: "How to use it" },
      {
        type: "steps",
        items: [
          {
            title: "Pick the mode and set the light",
            text: "Choose **LED Strip** or **Spot**, the color (the default is a warm white, #ffe76e), the beam direction and the **Reach**, **Intensity** and **Spread** sliders. Each mode keeps its own values.",
          },
          {
            title: "Click Create, then click where the light goes",
            text: "For a strip on millwork, click the **line** it should run along. Hold **Shift** to add several lines at once. For a strip on a mirror, click the **mirror face** and it traces the whole edge. For a spot, click the **fixture face**. **ESC** exits the tool.",
          },
          {
            title: "Fine-tune without redoing it",
            text: "With a light selected in SketchUp, the sliders start editing that light. Release the slider and it rebuilds instantly. You can also move the light by hand and the next adjustment respects the new position.",
          },
        ],
      },
      {
        type: "p",
        text: "The strip is one continuous band: corners meet without tearing, and on an upright outline (the mirror) the glow spreads outward following the shape, while on a horizontal one (the cove) it goes down or up. Everything is generated on your computer, in seconds, **with no credits used**.",
      },
      {
        type: "warn",
        text: "It's **fake** light: it doesn't illuminate the SketchUp scene, it works as a visual reference for the render. The **Clear all lights** button removes everything the tool created in the model at once.",
      },
      {
        type: "tip",
        text: "The highest-payoff use is the strip behind a mirror. That glow tracing the edge is what makes the AI deliver the backlit mirror you had in mind. Combine it with **Mirror Reflection** in the same scene: one gives you the reflection, the other gives you the light.",
      },
      { type: "cost", text: "Free: processed locally, no credits" },
    ],
  },
  "primeiros-passos": {
    title: "Getting started: install the plugin and sign in for the first time",
    excerpt:
      "How to install Vizai Render in SketchUp, sign in with your Google account, activate your 8 free credits and understand what each tool costs.",
    blocks: [
      {
        type: "p",
        text: "Vizai Render is an AI rendering plugin that runs inside SketchUp. You set up the scene, pick a style and get a photorealistic render in seconds, no exporting, no external software and no powerful graphics card required. This guide gets everything up and running.",
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
        text: "You sign in with your Google account, in one click, no new password needed. On your **first login from the plugin** you receive **8 free credits** to try the tools. Your balance shows in the top-right corner of the panel, next to your profile.",
      },
      {
        type: "tip",
        text: "Created your account on the website? The 8 free credits are activated when you first sign in inside the plugin. That's where they show up.",
      },
      { type: "h2", text: "How credits, plans and per-tool costs work" },
      {
        type: "p",
        text: "Everything in Vizai Render runs on **credits**: each AI generation consumes a fixed amount, deducted from your balance. Local tools (like the Tools window, the Editor's photo adjustments and Mirror Reflection) are **free**. You only pay for what the AI generates.",
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
          "**Monthly plans**: Starter (250 credits/month), Pro (600 credits/month) and Business (1,600 credits/month). Credits renew every month and you can cancel anytime.",
          "**One-time packs**: from 50 to 1,750 credits in a single purchase. They **never expire** and are consumed after your monthly credits.",
        ],
      },
      {
        type: "p",
        text: "You can subscribe and buy both on the website and from inside the plugin: click your profile in the top-right corner of the panel and choose **Subscription** or **+ Buy credits**. Payment is processed by Stripe and the balance lands in your account within seconds.",
      },
      { type: "h2", text: "Tracking your usage" },
      {
        type: "img",
        src: "/treinamento/ui/assinatura-{lang}.webp",
        alt: "Vizai Render Subscription panel",
        caption: "The Subscription panel shows all your available credits in one place.",
        ui: true,
      },
      {
        type: "p",
        text: "To keep track of your usage, click your profile in the top-right corner and open **Subscription**. There you'll see all your available credits in one place: your monthly plan balance (with how many days until it renews) and your one-off credits, which never expire. The bars show at a glance how much of each you have left.",
      },
    ],
  },






  "decorar-ambiente": {
    title: "Stage Room: AI furniture and decor for empty spaces",
    excerpt:
      "Vizai's virtual staging: upload an empty room, pick the space type and decor styles, and the AI creates a complete layout.",
    blocks: [
      {
        type: "p",
        text: "**Stage Room** is Creative AI's virtual staging tool: it furnishes and decorates a space from a base image. Perfect for showing the potential of empty spaces. Off-plan properties, renovations, home staging for sale.",
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
        text: "There are **13 room types** (Living Room, Bedroom, Kitchen, Bathroom, Office, Balcony, Garage, Hall, Pool, Wine Cellar, Pantry, Dining Room and Gourmet Area) and **8 decor styles** you can combine: Modern, Minimalist, Classic, Industrial, Scandinavian, Rustic, Contemporary and Tropical. Enable more than one for a mix (e.g. Modern + Scandinavian), or none to let the AI roam free.",
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
        text: "**Rendered Floor Plan** converts a technical drawing (your model's top view or a plan you already have as an image) into a rendered plan with floors, furniture, vegetation and shadows, in the style of real-estate launch presentations.",
      },
      {
        type: "compare",
        aspect: "4 / 5",
        before: { src: "/tools/tool-08-before.webp", label: "Technical plan" },
        after: { src: "/tools/tool-08.jpg", label: "Rendered plan" },
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
            text: "Enable Camera → Parallel Projection: this removes perspective and keeps the plan “flat”, like a technical drawing.",
          },
          {
            title: "Frame and capture",
            text: "Zoom so the plan fills the viewport and click Capture Current Scene in the plugin.",
          },
        ],
      },
      {
        type: "p",
        text: "You can also skip the capture and **upload an image from your PC**. It works with plans exported from AutoCAD, Revit or even a photo of a drawing, as long as the walls are legible.",
      },
      { type: "h2", text: "Notes that make a difference" },
      {
        type: "p",
        text: "In the notes field, describe materials and palette: “light porcelain floor, linen sofa, natural wood joinery, decorative plants”. The AI keeps the wall layout and applies the finishes you describe.",
      },
      {
        type: "tip",
        text: "Capture with room labels and dimensions turned off for a clean plan, or keep the text if the presentation calls for an annotated plan.",
      },
      { type: "cost", text: "3 credits per generation" },
    ],
  },

  diagrama: {
    title: "Diagram: isometric and axonometric views in 5 styles",
    excerpt:
      "Generate conceptual diagrams of your project (from technical B&W isometrics to a balsa-wood physical model look) from a viewport capture.",
    blocks: [
      {
        type: "p",
        text: "The **Diagram** tool turns an isometric view of your model into conceptual boards with an architecture-office visual language. Great for competitions, presentation boards and social media.",
      },
      {
        type: "img",
        src: "/tools/tool-09.webp",
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
        text: "First pick the context: **Exterior** (with surroundings) or **Interiors** (isolated rooms). Then the style:",
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/tecnico.webp",
            alt: "Technical isometric diagram",
            caption: "Technical Isometric: B&W lines with detailed urban context.",
          },
          {
            src: "/demo/assets/diag/destaque.webp",
            alt: "Highlight diagram",
            caption: "Highlight: project in color, surroundings in gray.",
          },
          {
            src: "/demo/assets/diag/colorido.webp",
            alt: "Colored diagram with context",
            caption: "Colored: watercolor illustration with surroundings.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/demo/assets/diag/maquete.webp",
            alt: "Physical model style diagram",
            caption: "Physical Model: balsa-wood model style.",
          },
          {
            src: "/demo/assets/diag/int_axo.webp",
            alt: "Interior axonometric diagram",
            caption: "Axonometric: isometric cutaway of the interior space.",
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
      "Create professional moodboards from a reference image: 7 scene compositions and 5 aspect ratios, from flat lays to presentation boards.",
    blocks: [
      {
        type: "p",
        text: "**Moodboard** generates visual reference boards (material samples, palette and objects) from a base image of your project or your references. It's the tool for the start of the client conversation: it presents the concept before the first render even exists.",
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
        text: "There are **7 composition styles**: the “scene” where the samples are photographed:",
      },
      {
        type: "ul",
        items: [
          "**Studio Bench**: premium surface with a soft gradient background.",
          "**Project Table**: on a work table, semi-blurred background.",
          "**Top View**: flat lay straight from above, no perspective.",
          "**Presentation Board**: samples pinned to a vertical board.",
          "**Lit Floor**: flat lay on a wooden floor with side light.",
          "**Material Line**: samples aligned in a horizontal row.",
          "**Decorated Rug**: 3/4 composition over a rug with objects.",
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




};
