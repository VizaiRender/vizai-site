import { HomePage } from "@/components/pages/home-page";
import { SoftwareJsonLd } from "@/components/pages/software-json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "home", "/");

export default function Page() {
  return (
    <>
      <SoftwareJsonLd lang="pt" />
      <HomePage />
    </>
  );
}
