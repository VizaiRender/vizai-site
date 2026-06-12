import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/ui/legal-content";

export const metadata = {
  title: "Termos de Serviço",
  description: "Termos de Serviço do Vizai Render.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
        <LegalContent doc="terms" />
      </div>
      <Footer />
    </main>
  );
}
