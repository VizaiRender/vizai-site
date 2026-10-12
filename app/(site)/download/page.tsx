import { DownloadPage } from "@/components/pages/download-page";
import { SoftwareJsonLd } from "@/components/pages/software-json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "download", "/download");

export default function Page() {
  return (
    <>
      <SoftwareJsonLd lang="pt" />
      <DownloadPage />
    </>
  );
}
