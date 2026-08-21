import { TreinamentoPage } from "@/components/pages/treinamento-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "treinamento", "/treinamento");

export default function Page() {
  return <TreinamentoPage />;
}
