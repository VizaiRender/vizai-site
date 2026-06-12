import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/ui/legal-content";

export const metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do Vizai Render.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
        <LegalContent doc="privacy" />
      </div>
      <Footer />
    </main>
  );
}
