import { LegalPage } from "@/components/pages/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "privacy", "/privacy");

export default function Page() {
  return <LegalPage doc="privacy" />;
}
