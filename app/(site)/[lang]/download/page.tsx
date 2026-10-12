import { DownloadPage } from "@/components/pages/download-page";
import { SoftwareJsonLd } from "@/components/pages/software-json-ld";
import { buildMetadata } from "@/lib/seo";
import { PREFIXED_LANGS } from "@/lib/routes";
import { langParam } from "@/lib/lang-param";

export function generateStaticParams() {
  return PREFIXED_LANGS.map((lang) => ({ lang }));
}

// Idioma fora da lista vira 404 pronta. Ver o comentário em [lang]/layout.tsx.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = await langParam(params);
  return buildMetadata(lang, "download", "/download");
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = await langParam(params);
  return (
    <>
      <SoftwareJsonLd lang={lang} />
      <DownloadPage />
    </>
  );
}
