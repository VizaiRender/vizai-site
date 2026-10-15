import { BlogIndexPage } from "@/components/pages/blog-index-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("pt", "blog", "/blog");

export default function Page() {
  return <BlogIndexPage lang="pt" />;
}
