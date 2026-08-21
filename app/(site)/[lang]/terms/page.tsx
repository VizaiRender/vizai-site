import { LegalPage } from "@/components/pages/legal-page";
import { buildMetadata } from "@/lib/seo";
import { PREFIXED_LANGS } from "@/lib/routes";
import { langParam } from "@/lib/lang-param";

export function generateStaticParams() {
  return PREFIXED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = await langParam(params);
  return buildMetadata(lang, "terms", "/terms");
}

export default function Page() {
  return <LegalPage doc="terms" />;
}
