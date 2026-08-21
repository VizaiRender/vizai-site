import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/ui/legal-content";

export function LegalPage({ doc }: { doc: "privacy" | "terms" }) {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
        <LegalContent doc={doc} />
      </div>
      <Footer />
    </main>
  );
}
