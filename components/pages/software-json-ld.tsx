import { softwareApplicationJsonLd } from "@/lib/structured-data";
import type { Lang } from "@/lib/routes";

// Bloco do produto para o Google e as IAs, no idioma e na moeda da página.
// Vai nas páginas de produto (home e download); ver lib/structured-data.ts.
export function SoftwareJsonLd({ lang }: { lang: Lang }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd(lang)) }}
    />
  );
}
