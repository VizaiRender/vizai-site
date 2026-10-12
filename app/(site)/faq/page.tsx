import { FaqPage } from "@/components/pages/faq-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "faq", "/faq");

export default function Page() {
  return <FaqPage lang="pt" />;
}
