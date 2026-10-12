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
  "historico": {
    title: "History tab: get back what you forgot to save",
    excerpt:
      "The last 10 images and blocks you generated are kept on your computer, with the credit cost of each one. Here is how to download them again, and when clearing wipes them for good.",
    blocks: [
      { type: "p", text: "Every generation made in the plugin lands in History: renders, edits, closeups, 360 panoramas and 3D blocks. It is the safety net for the most common mistake of all, which is closing the window before saving the image to your computer." },
      { type: "h2", text: "What is kept" },
      { type: "p", text: "History keeps the 10 most recent items, from every project, not only from the file you have open. Each row shows the thumbnail, the type of generation, the date, the project it came from and how many credits that item cost." },
      { type: "p", text: "The list is shared on purpose: you switch SketchUp files and still see what you generated before. The footer shows the credit total for the items listed, a quick way to see your recent usage." },
      { type: "tip", text: "History is persistent: it survives closing and reopening SketchUp. What it does not survive is the limit, because the oldest item drops out when the eleventh comes in." },
      { type: "h2", text: "Download again" },
      { type: "p", text: "The download button on each row saves the full image to your computer again, at the original resolution. That is why History exists: it is not a pretty gallery, it is the chance to recover what went by." },
      { type: "warn", text: "3D blocks expire. The model file is hosted temporarily, so download the block the same day you generate it. Render images have no such limit." },
      { type: "h2", text: "Clear all, and why to think twice" },
      { type: "p", text: "The red button erases the whole list and also the images stored in the plugin folder on your computer. There is no undo, and the plugin warns you before doing it." },
      { type: "p", text: "Only use it when you really want to free up space. If you just want tidiness, you do not need to: History already caps itself at 10 items and 60 MB of images, dropping the oldest on its own." },
      { type: "cost", text: "History costs no credits. Viewing, downloading again and clearing are local operations, done on your computer." },
    ],
  },
  "otimizar-arquivo": {
    title: "Optimize File (Tools): get your .skp lightweight for free",
    excerpt:
      "Smart purge, duplicate materials, texture downscaling and a component impact report. The full file cleanup, 100% local and free.",
    blocks: [
      {
        type: "p",
        text: "File lagging, choppy orbit, .skp in the hundreds of MB? The **Tools** window (green side tab on the panel) includes **Optimize File**: a set of cleanups that runs 100% on your computer, **at no credit cost**. The file size shows at the top, before and after. You see the result instantly.",
      },
      {
        type: "img",
        src: "/treinamento/ui/tools-otimizar-{lang}.webp",
        alt: "Tools window with the Optimize File tab",
        caption: "Optimize File: Cleanup, Textures and Impact tabs.",
        ui: true,
      },
      { type: "h2", text: "Cleanup" },
      {
        type: "ul",
        items: [
          "**Purge**: removes materials, components and styles that aren't used anywhere in the project. It's the cleanup that shrinks files that have been through many revisions the most.",
          "**Duplicate Materials**: merges materials that use the same texture under different names (Wood, Wood1, Wood-copy…), common in models assembled from blocks of mixed origins.",
        ],
      },
      { type: "h2", text: "Textures" },
      {
        type: "p",
        text: "The **Texture Manager** lists every image in the model with its dimensions. 4K textures on a drawer handle are dead weight: select the oversized ones and downscale them to a target resolution in one click. The viewport look barely changes. The file size does.",
      },
      { type: "h2", text: "Impact" },
      {
        type: "p",
        text: "The **Component Impact** report shows which blocks carry the most geometry (faces) and how many instances exist of each. It's how you find out that a tree downloaded from the Warehouse has 800k faces, and that it's repeated 12 times. The View button locates the component in the model so you can decide what to do.",
      },
      {
        type: "tip",
        text: "Run Optimize File before rendering big projects: a light model means a fluid viewport and faster captures. And back up the first time you run heavy cleanups on an important file.",
      },
      { type: "cost", text: "Free: processed locally, no credits" },
    ],
  },
  "pisos-seamless": {
    title: "Seamless Floors (Tools): professional floor tiling in seconds",
    excerpt:
      "Create tileable floor textures from any image: porcelain, wood with variations, configurable grout and direct application to faces.",
    blocks: [
      { type: "p", text: "**Seamless Floors**, in the **Tools** window, turns a photo of a single tile or plank (porcelain, wood, ceramic) into a laid-out floor, with grout and at real size, applied straight to the model's faces. It runs on your computer and uses no credits." },
      {
        type: "img",
        src: "/treinamento/ui/tools-pisos-{lang}.webp",
        alt: "Seamless Floors tab in the Tools window",
        caption: "Live tiling preview, with grout and real dimensions.",
        ui: true,
      },
      { type: "p", text: "The plugin builds a texture with a 6 × 6 block of pieces already laid out with grout, at the real scale you enter, and creates a SketchUp material from it. With variations, it mixes the images inside that block, so the repetition is much less visible." },
      { type: "h2", text: "Building the floor" },
      {
        type: "steps",
        items: [
          {
            title: "Base Texture",
            text: "Load the image of one piece: the photo of the porcelain tile, wood plank or ceramic tile. Use a straight, front-on image, with no perspective and only the piece.",
          },
          {
            title: "Variations (optional)",
            text: "Add up to 3 images from the same line. The plugin alternates the pieces and breaks up the repetition, which is essential for wood and veined porcelain.",
          },
          {
            title: "Layout and rotation",
            text: "Straight Grid (aligned), Offset 50% or Offset 1/3. Use Rotate to set the planks in the right direction.",
          },
          {
            title: "Real dimensions",
            text: "Width and height of the piece in centimeters (it starts at 90 × 90; for planks, something like 20 × 120). The texture comes into SketchUp already at the right scale.",
          },
          {
            title: "Grout",
            text: "Thickness in millimeters (it starts at 2 mm) and color (it starts at dark gray). Grout matching the piece makes the floor look more continuous.",
          },
        ],
      },
      { type: "h2", text: "Applying to the model" },
      { type: "p", text: "The preview shows the layout in real time. To apply it, **select the floor faces** in SketchUp before clicking Apply Texture. The material is created and mapped right onto them. With nothing selected, the plugin activates the Paint Bucket so you can click wherever you want." },
      { type: "h2", text: "Getting a good floor" },
      {
        type: "ul",
        items: [
          "**A photo of the piece, not the room.** Crop just the piece, with no borders, strong reflections or perspective.",
          "**Variations for wood.** A single repeated plank gives the floor away; 3 variations solve it.",
          "**The right piece size.** It's what sets the scale. Check the supplier's spec sheet.",
          "**Build the floor before rendering.** The AI follows the layout and grout it sees in the scene, and the render looks more real.",
        ],
      },
      { type: "h2", text: "If the result isn't what you expected" },
      {
        type: "ul",
        items: [
          "**Visible repetition**: add variations from the same line, or use Offset to break the alignment.",
          "**Pieces too big or too small**: check the width and height in centimeters and apply again.",
          "**Planks in the wrong direction**: use Rotate and apply to the faces again.",
          "**Texture on the wrong face**: select the floor faces before clicking Apply Texture.",
        ],
      },
      { type: "h2", text: "Quick questions" },
      {
        type: "ul",
        items: [
          "**Does it use credits?** No. It's processed on your computer.",
          "**Can I use it for wall cladding?** Yes. The tool applies to whatever faces you select, floor or wall.",
          "**Does it work with a catalog photo?** Yes, as long as the piece is front-on with no perspective.",
        ],
      },
      { type: "cost", text: "Free: processed locally, no credits" },
    ],
  },
  "video-com-ia": {
    title: "AI Video: animate your renders with cinematic camera work",
    excerpt:
      "Turn a render into a 4 to 15 second video in 1080p, with camera movement and AI-generated ambient sound, right from the plugin.",
    blocks: [
      { type: "p", text: "With the **Video** tab in Vizai, a finished render becomes a **4 to 15 second clip in 1080p**, with camera movement and, if you want, AI-generated ambient sound. It's the fastest way to take a project to Reels, Stories or a client presentation, without building an animation in SketchUp or rendering frame by frame." },
      {
        type: "video",
        src: "/tools/tool-03.mp4",
        caption: "Video generated from a plugin render.",
      },
      { type: "p", text: "The image is animated by **Kling 3.0 Pro**, an AI video model. It starts from your render and creates the movement from it: what you see in the video is the project in the image, not the 3D model moving in real time. That's why the result depends so much on the starting render." },
      { type: "h2", text: "From render to video, step by step" },
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
            title: "Pick the start frame",
            text: "The image the video starts from. By default it's your latest render; you can also pick an image from History or upload one from your computer. The AI won't fix what's wrong in the image, so start from a render you'd already approve.",
          },
          {
            title: "Set an end frame, if you want",
            text: "Optional. With a second image, the AI creates the transition between the two. It works best with two renders of the same room, with the same light and close angles.",
          },
          {
            title: "Choose the aspect ratio",
            text: "Landscape (16:9) for presentations and YouTube, square (1:1) for the feed and portrait (9:16) for Reels and Stories. Use the same ratio as the render: if the video will be vertical, generate the render in 9:16 from the start.",
          },
          {
            title: "Set camera and audio",
            text: "In **Configure Camera & Audio**, pick one of the 8 movements and whether the video has sound.",
          },
          {
            title: "Write observations, if you want",
            text: "In the **Observations** field, ask the AI to pay attention to an element (“focus on the wooden chair”) or describe the movement in your own words (“camera slowly moves forward and reveals the balcony”). The text is added to the chosen movement.",
          },
          {
            title: "Pick the duration and generate",
            text: "4, 6, 8, 10 or 15 seconds. The cost shows on the button before you generate, and the video is ready in 2 to 5 minutes.",
          },
        ],
      },
      { type: "h2", text: "The 8 camera movements" },
      {
        type: "img",
        src: "/treinamento/ui/modal-camera-{lang}.webp",
        alt: "Video camera and audio modal",
        caption: "The 8 preset movements and the sound options.",
        ui: true,
      },
      {
        type: "ul",
        items: [
          "**Automatic (Recommended)**: the AI picks a natural movement for the scene. The best starting point.",
          "**Smooth Zoom In**: the camera moves into the scene. Highlights a room or a joinery detail.",
          "**Smooth Zoom Out**: the camera pulls back and reveals the whole space. Good for ending the video on the full view.",
          "**Pan Right or Pan Left**: the camera slides sideways. Works in wide living rooms, galley kitchens and long facades.",
          "**Tilt Up and Tilt Down**: the camera tilts up or down. Shows high ceilings, stairs and building facades.",
          "**Orbit (Drone)**: the camera circles the project like a drone. The most striking movement for facades and houses, and the most demanding for the AI.",
        ],
      },
      { type: "h2", text: "Video sound" },
      {
        type: "ul",
        items: [
          "**Ambient Sound (AI Generated)**: wind, footsteps and city noise, created to match the scene. It doesn't change the price.",
          "**No Sound**: a silent video, so you can add music or narration when editing.",
        ],
      },
      { type: "h2", text: "How much it costs" },
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
      { type: "h2", text: "Getting a good video" },
      {
        type: "ul",
        items: [
          "**Start short.** 4 to 6 second videos with Automatic or Zoom In are the most stable and the cheapest. Save 10 or 15 seconds for movements that need time, like an orbit.",
          "**Clean render, clean video.** Fix the render first with a masked edit, and only then animate it. The AI carries everything in the image into the video.",
          "**Right aspect ratio from the render.** For Reels, generate the render in 9:16 instead of using a horizontal one.",
        ],
      },
      { type: "h2", text: "If the result isn't what you expected" },
      {
        type: "ul",
        items: [
          "**Window frames, joinery or facade warping**: the more the camera travels, the more the AI has to invent what isn't in the render. Switch to a shorter movement (Zoom In or Automatic), reduce the duration or use an end frame to hold the arrival point.",
          "**Movement different from what you asked**: describe the movement in Observations in one simple, direct sentence, and keep the preset movement consistent with it.",
        ],
      },
      { type: "warn", text: "If the generation fails or the video doesn't reach the plugin, the credits go back to your account automatically." },
      { type: "h2", text: "Quick questions" },
      {
        type: "ul",
        items: [
          "**How long does it take?** 2 to 5 minutes, depending on the length.",
          "**What resolution?** 1080p, in the aspect ratio you choose.",
          "**Can I make a tour of the whole house?** Not in a single video: each video starts from one render and lasts up to 15 seconds. For a tour, generate one video per room and join them when editing.",
          "**Can I animate an image that didn't come from Vizai?** Yes. In the start frame, use Upload from PC.",
        ],
      },
      { type: "cost", text: "22 to 83 credits per video, depending on the length" },
    ],
  },
  "panorama-360": {
    title: "360° Panorama: immersive presentations your client can explore",
    excerpt:
      "Mark the wall and where you stand: SketchUp captures the whole room and the AI returns, in about 30 seconds, a spherical panorama your client explores through a link, with nothing to install.",
    blocks: [
      { type: "p", text: "The **360** tab turns a room in your model into a **photorealistic spherical panorama** that your client opens through a link on a computer or phone and explores by rotating the image. You don't need to render anything first: you mark the wall and where you stand, and the panorama is ready in about 30 seconds, for 5 credits." },
      {
        type: "img",
        src: "/treinamento/ui/pano-360-resultado.webp",
        alt: "360 panorama generated by Vizai Render",
        caption: "The generated panorama: ready for the interactive viewer.",
      },
      { type: "p", text: "It happens in two stages. First, SketchUp itself captures the room in every direction from the point you marked and builds a spherical preview, at no cost. Then the AI turns that preview into a photograph: it keeps the architecture, furniture and proportions, replaces the model's materials with real finishes and removes SketchUp's outline edges." },
      { type: "h2", text: "Step by step" },
      {
        type: "img",
        src: "/treinamento/ui/pano-{lang}.webp",
        alt: "Vizai Render 360 tab",
        caption: "The 360 tab: mark the wall, then where the viewer stands.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Pick the wall in front",
            text: "Click the wall that will sit at the center of the panorama. The image seam falls on the opposite wall, so put your best wall in front. If you click the floor or ceiling, the plugin uses the current camera direction.",
          },
          {
            title: "Mark where you stand",
            text: "Click the floor at the point your client will look from. Eye height defaults to 1.60 m, and you can change it.",
          },
          {
            title: "Check the preview",
            text: "The plugin captures the 6 views and stitches the 360 before spending any credit. If the viewer landed inside furniture or a wall, just redo it. The preview is free.",
          },
          {
            title: "Generate",
            text: "Click **Generate 360**. It costs 5 credits, and the panorama is ready in about 30 seconds.",
          },
          {
            title: "Share",
            text: "View it larger in the plugin, download the image, copy the link or send it straight through WhatsApp. Your client opens it in the browser and can rotate, zoom and go full screen.",
          },
        ],
      },
      { type: "h2", text: "What the panorama looks like" },
      {
        type: "ul",
        items: [
          "**Made for interiors.** The 360 treats the scene as an interior photographed for a magazine.",
          "**Natural daylight.** Artificial lights come out switched off: LED strips, spots and fixtures don't light up in the panorama. To show night lighting, use a render with the lighting style you want.",
          "**Architecture and furniture locked.** The AI doesn't add or remove objects and doesn't change the layout or proportions. What changes are the finishes, which go from model materials to real materials.",
          "**View through the window.** Beyond the glass, the AI creates a believable residential urban setting, so the window isn't left white or empty. The window itself doesn't change.",
        ],
      },
      { type: "h2", text: "Getting a good panorama" },
      {
        type: "ul",
        items: [
          "**From the middle of the room.** A viewer squeezed into a corner flattens the space; from the middle, the panorama breathes.",
          "**A clear wall in front.** For the center of the panorama, pick a wall without furniture pushed against it.",
          "**A closed room with materials.** Modeled walls, floor and ceiling with materials applied give the AI something to interpret. Where a wall or ceiling is missing, the AI has to guess what's there.",
        ],
      },
      { type: "h2", text: "If the result isn't what you expected" },
      {
        type: "ul",
        items: [
          "**Viewer inside furniture or a wall**: it shows in the preview, before any credit is spent. Mark the point again, a little further away.",
          "**Visible seam**: it always falls on the wall opposite the one you picked as the front. Make the most important wall the front, and the seam goes to the back.",
          "**Panorama facing the wrong way**: you clicked the floor or ceiling instead of a wall, so the plugin used the camera direction. Click a wall to choose the front.",
        ],
      },
      { type: "tip", text: "The link is for showing your client. To keep the panorama with the project, download the image too." },
      { type: "h2", text: "Quick questions" },
      {
        type: "ul",
        items: [
          "**How long does it take?** About 30 seconds after the preview.",
          "**How big is the image?** 2048 × 1024 pixels, in the spherical (equirectangular) format 360 viewers use.",
          "**Do I need to render first?** No. The 360 comes straight from the model.",
          "**Does my client need to install anything?** No. The link opens in the browser on a computer or phone.",
          "**Does it work outdoors?** The 360 was made for interiors, and that's where it works best.",
        ],
      },
      { type: "cost", text: "5 credits per panorama · free preview and share link" },
    ],
  },
  "blocos-3d": {
    title: "3D Blocks: turn any photo into a SketchUp model",
    excerpt:
      "Found the perfect chair in a reference image? The Blocks tab turns the photo into a textured 3D model and imports it straight into your scene.",
    blocks: [
      { type: "p", text: "The **Blocks** tab turns a photo of a piece of furniture or an object into a **textured 3D model** that goes into SketchUp as a component. It solves a classic problem: the client wants a specific piece that isn't in 3D Warehouse. Each block costs 28 credits and is ready in a few minutes." },
      {
        type: "img",
        src: "/tools/tool-05.webp",
        alt: "3D block generated from a photo",
        caption: "From reference photo to a 3D block in the scene.",
      },
      { type: "p", text: "The object is rebuilt by **Meshy**, an AI model that creates 3D from an image. It infers the parts the photo doesn't show, such as the back, and delivers a light mesh of about 10,000 polygons, made so it doesn't weigh SketchUp down." },
      { type: "h2", text: "How to generate" },
      {
        type: "img",
        src: "/treinamento/ui/blocos-{lang}.webp",
        alt: "Vizai Render Blocks tab",
        caption: "The Blocks tab: reference photo, name and generation.",
        ui: true,
      },
      {
        type: "steps",
        items: [
          {
            title: "Add the reference photo",
            text: "Drag it in or click to upload. It works best with the whole object visible, well lit and on a clean background.",
          },
          {
            title: "Name the block",
            text: "The name organizes the component in your model (for example, “Wooden Chair”).",
          },
          {
            title: "Generate",
            text: "It costs 28 credits. Most of the time it's ready in 3 to 5 minutes; at busy times it can go past 10.",
          },
          {
            title: "Import or download",
            text: "Import into scene places the block right in the model; or download the .GLB file to use in another program.",
          },
        ],
      },
      { type: "h2", text: "Adjust the size after importing" },
      { type: "p", text: "The block doesn't arrive at the piece's real size. After importing, check its size and use SketchUp's **Scale** tool to give the furniture the right dimensions." },
      { type: "h2", text: "Getting a good block" },
      {
        type: "ul",
        items: [
          "**The whole object, alone in the photo.** Well lit, on a clean background, with no other furniture touching it.",
          "**A three-quarter photo.** A photo taken slightly from the side shows the front and a side, and the AI gets the hidden parts wrong less often.",
          "**Pieces with a clear shape come out better.** Chairs, armchairs, tables, lamps and vases usually work well. Very open pieces or fine details, like cane weave and wire, tend to lose definition.",
        ],
      },
      { type: "warn", text: "Many blocks in a large model add up. The Tools window (Component Impact) shows which blocks are heavy, and the Optimize File lesson shows how to fix it." },
      { type: "h2", text: "If the result isn't what you expected" },
      {
        type: "ul",
        items: [
          "**Odd-looking back**: the AI infers what the photo doesn't show. Use a three-quarter photo, which shows more of the object.",
          "**Wrong size**: adjust it with the Scale tool after importing.",
          "**The block didn't arrive**: if the generation fails or the block doesn't reach the plugin, the credits go back to your account automatically.",
        ],
      },
      { type: "h2", text: "Quick questions" },
      {
        type: "ul",
        items: [
          "**How long does it take?** 3 to 5 minutes, most of the time.",
          "**How many polygons does a block have?** About 10,000: light enough to use several times in the same model.",
          "**What file do I get?** The plugin imports the block straight into the scene; the downloadable file is GLB, which most 3D programs open.",
        ],
      },
      { type: "cost", text: "28 credits per generated block" },
    ],
  },
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
      "Vizai's virtual staging: upload a photo or render of an empty room, pick the space type, style and time of day, and the AI furnishes and decorates it while keeping the architecture.",
    blocks: [
      { type: "p", text: "**Decorate Space** furnishes and decorates an empty room from a photo or a render, in under a minute, for 3 credits. The architecture, finishes, windows and framing stay as they are: the AI only adds furniture and decor for the room type and style you choose. Use it to show the potential of empty properties, off-plan apartments, renovations and sale or rental listings." },
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
            text: "In the Studio tab, switch from Render to Creative AI and choose Decorate Space.",
          },
          {
            title: "Upload the base image",
            text: "Drag in a photo or render of the empty room (JPG or PNG, up to 5 MB) or capture the current SketchUp scene. The result keeps the image's aspect ratio.",
          },
          {
            title: "Pick the room, style and time of day",
            text: "One of the 13 room types, one or more decor styles, and day or night.",
          },
          {
            title: "Generate",
            text: "3 credits per image. The result comes with a Before and After view to compare with the base.",
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
      { type: "h2", text: "Room types" },
      { type: "p", text: "Living Room, Bedroom, Kitchen, Bathroom, Office, Balcony, Garage, Hall, Pool, Wine Cellar, Pantry, Dining Room and Gourmet Space. Each type has its own program that defines what goes in. In the Dining Room, the AI sets a table for 6 to 8 people; in the Office, a work desk, an ergonomic chair and a bookshelf. In the Kitchen, it dresses the counter and adds stools and pendants without touching cabinets, countertop or appliances. In the Bathroom, it adds towels, accessories and plants without touching the fixtures." },
      { type: "h2", text: "Decor styles" },
      { type: "p", text: "Modern, Minimalist, Classic, Industrial, Scandinavian, Rustic, Contemporary and Tropical. Select more than one to mix them, such as Modern with Scandinavian. If none is selected, Vizai uses Modern." },
      { type: "h2", text: "Day or night" },
      {
        type: "ul",
        items: [
          "**Day**: soft natural light coming through the windows, with gentle shadows.",
          "**Night**: a deep blue sky outside and the room lit by warm fixtures such as pendants, wall sconces and table lamps.",
        ],
      },
      { type: "h2", text: "Getting a good result" },
      {
        type: "ul",
        items: [
          "**A truly empty room.** With walls, floor and structure clearly visible, the AI places furniture much more accurately.",
          "**A well-framed image.** The AI keeps the image's framing, so fix tilt and cropping before uploading.",
          "**The room type that matches the real use.** The type is what defines the furniture that goes in.",
        ],
      },
      { type: "h2", text: "If the result isn't what you expected" },
      {
        type: "ul",
        items: [
          "**Furniture out of scale or in an odd spot**: generate again, since every generation comes out different, or fix just that area with a masked edit.",
          "**Something in the architecture changed**: the AI is instructed to keep walls, floor, windows and finishes. If something changes, generate again.",
        ],
      },
      { type: "h2", text: "Quick questions" },
      {
        type: "ul",
        items: [
          "**Does it work with real photos or only renders?** Both. It was designed for photos of empty rooms and also works with SketchUp renders.",
          "**Can I use it in a property listing?** Yes, the image is yours. It's good practice to say in the listing that the furnishing is virtual.",
          "**How long does it take?** Under a minute.",
          "**How many credits?** 3 per image, like the other Creative AI modes.",
        ],
      },
      { type: "cost", text: "3 credits per generation" },
    ],
  },
  "planta-humanizada": {
    title: "Rendered Floor Plan: from technical drawing to presentation",
    excerpt:
      "Turn your model's floor plan (or a drawing from your computer) into a rendered, presentation-ready floor plan for your client.",
    blocks: [
      { type: "p", text: "**Rendered Floor Plan** (Humanized Floor Plan in the plugin) turns a technical drawing (your model's top view or a plan you already have as an image) into a rendered plan seen from above, with floors, furniture, vegetation and soft shadows, in the style of real-estate launch presentations. It's ready in under a minute, for 3 credits." },
      {
        type: "compare",
        aspect: "4 / 5",
        before: { src: "/tools/tool-08-before.webp", label: "Technical plan" },
        after: { src: "/tools/tool-08.jpg", label: "Rendered plan" },
      },
      { type: "p", text: "The AI reads the plan before drawing: it identifies the rooms, doors and windows, the furniture and the materials already shown in the drawing, and keeps everything in place. Cut walls come out in a solid dark gray, like a technical plan, and the light is soft studio light, with no direct sun or hard shadows." },
      { type: "h2", text: "Capturing the plan from SketchUp" },
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
            text: "Zoom so the plan fills the screen and click **Capture Current Scene** in the plugin.",
          },
          {
            title: "Write notes and generate",
            text: "Describe the style and materials (see below) and generate. It costs 3 credits.",
          },
        ],
      },
      { type: "p", text: "You can also skip the capture and **upload an image from your computer** (JPG or PNG, up to 5 MB). It works with plans exported from AutoCAD, Revit or even a photo of a drawing, as long as the walls are legible." },
      { type: "h2", text: "Notes that make a difference" },
      { type: "p", text: "In the notes field, describe style, materials and palette: “light porcelain floor, linen sofa, natural wood joinery, decorative plants”. The AI adds what you ask for without moving the walls. If the drawing already has materials (captured from a textured model, for example), they stay in place, and your notes fill in the rest. With no notes, the plan comes out in a neutral contemporary style." },
      { type: "h2", text: "Getting a good plan" },
      {
        type: "ul",
        items: [
          "**Always Parallel Projection.** With perspective, the walls come out crooked and the AI misreads the drawing.",
          "**Plan filling the screen.** The bigger the plan in the image, the more detail the AI can draw.",
          "**Labels and dimensions, your call.** Turn off room names and dimensions for a clean plan, or keep them if the presentation needs an annotated plan.",
          "**A legible drawing.** For scanned or photographed plans, sharp, high-contrast walls give a much better result.",
        ],
      },
      { type: "h2", text: "If the result isn't what you expected" },
      {
        type: "ul",
        items: [
          "**Furniture or material different from what you asked**: be more specific in the notes, naming the room (“in the bedroom, a bed with a wooden headboard”), and generate again.",
          "**A detail wrong in one spot of the plan**: fix just that area with a masked edit, without redoing everything.",
          "**Distorted walls**: check that the capture was taken from the Top view and in Parallel Projection.",
        ],
      },
      { type: "h2", text: "Quick questions" },
      {
        type: "ul",
        items: [
          "**Does it work with plans from AutoCAD or Revit?** Yes. Export the plan as an image (JPG or PNG, up to 5 MB) and upload it to the plugin.",
          "**How long does it take?** Under a minute.",
          "**Can I use the plan in sales material?** Yes, the image is yours.",
        ],
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
            src: "/treinamento/ui/diagrama-tecnico.webp",
            alt: "Technical isometric diagram",
            caption: "Technical Isometric: B&W lines with detailed urban context.",
          },
          {
            src: "/treinamento/ui/diagrama-destaque.webp",
            alt: "Highlight diagram",
            caption: "Highlight: project in color, surroundings in gray.",
          },
          {
            src: "/treinamento/ui/diagrama-colorido.webp",
            alt: "Colored diagram with context",
            caption: "Colored: watercolor illustration with surroundings.",
          },
        ],
      },
      {
        type: "imgrow",
        images: [
          {
            src: "/treinamento/ui/diagrama-maquete.webp",
            alt: "Physical model style diagram",
            caption: "Physical Model: balsa-wood model style.",
          },
          {
            src: "/treinamento/ui/diagrama-int-axo.webp",
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
