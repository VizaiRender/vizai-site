import { Footer } from "@/components/ui/footer";
import { TreinamentoContent } from "@/components/ui/treinamento-content";

export const metadata = {
  title: "Treinamento | Vizai Render",
  description:
    "Treinamento oficial do Vizai Render em breve. Cadastre-se para ser avisado assim que estiver disponível.",
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
