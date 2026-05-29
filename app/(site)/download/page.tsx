import { Footer } from "@/components/ui/footer";
import { DownloadTabs } from "@/components/ui/download-tabs";
import { DownloadHero } from "@/components/ui/download-hero";
import { getDownloadManifest } from "@/lib/download-manifest";

export const metadata = {
  title: "Baixar plugin | Vizai Render",
  description:
    "Baixe o plugin Vizai Render para SketchUp. Instalação em menos de 1 minuto.",
};

export default async function DownloadPage() {
  const manifest = await getDownloadManifest();

  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex-1 max-w-5xl mx-auto px-6 pb-16 w-full"
        style={{ paddingTop: "180px" }}
      >
        <DownloadHero />

        <DownloadTabs manifest={manifest} />
      </section>

      <Footer />
    </main>
  );
}
