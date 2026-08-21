import { DownloadPage } from "@/components/pages/download-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "download", "/download");

export default function Page() {
  return <DownloadPage />;
}
