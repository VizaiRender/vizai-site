"use client";

import { useLang } from "@/app/components/LanguageProvider";
import { privacyDoc, termsDoc, SUPPORT_EMAIL, type LegalBlock } from "@/lib/legal";

function renderText(text: string) {
  const parts = text.split("{email}");
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [
          part,
          <a
            key={i}
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-blue-500 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>,
        ]
      : [part],
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return (
      <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
        {block.text}
      </h3>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc pl-6 space-y-2 leading-relaxed">
        {block.items.map((item, i) => (
          <li key={i}>
            {item.lead ? <strong>{item.lead}</strong> : null}
            {item.lead ? " " : ""}
            {renderText(item.text)}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="leading-relaxed">
      {block.lead ? <strong>{block.lead}</strong> : null}
      {block.lead ? " " : ""}
      {renderText(block.text)}
    </p>
  );
}

export function LegalContent({ doc }: { doc: "privacy" | "terms" }) {
  const { lang } = useLang();
  const content = (doc === "privacy" ? privacyDoc : termsDoc)[lang];

  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-bold mb-8"
        style={{ color: "var(--foreground)" }}
      >
        {content.title}
      </h1>

      <div className="space-y-8" style={{ color: "var(--foreground-muted)" }}>
        <p className="text-sm">{content.lastUpdated}</p>

        {content.sections.map((section, i) => (
          <section key={i} className="space-y-4">
            <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
              {section.heading}
            </h2>
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
