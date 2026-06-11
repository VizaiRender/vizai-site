import { Footer } from "@/components/ui/footer";
import { TreinamentoContent } from "@/components/ui/treinamento-content";

export const metadata = {
  title: "Treinamento | Vizai Render",
  description:
    "Guias completos de todas as ferramentas do Vizai Render: render com IA, edição, vídeo, panorama 360°, blocos 3D, IA criativa e ferramentas gratuitas — passo a passo com imagens reais.",
};

export default function TreinamentoPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex-1 max-w-5xl mx-auto px-6 pb-16 w-full"
        style={{ paddingTop: "180px" }}
      >
        <TreinamentoContent />
      </section>

      <Footer />
    </main>
  );
}
