import { HomePage } from "@/components/pages/home-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "home", "/");

export default function Page() {
  return <HomePage />;
}
