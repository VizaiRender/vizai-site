import Link from "next/link";
import { Footer } from "@/components/ui/footer";
import { answerText, getFaq } from "@/lib/faq";
import { absoluteUrl, HREFLANG, localePath, type Lang } from "@/lib/routes";

// Página /faq. Ver o comentário no topo de lib/faq.ts: ela é feita para as IAs e
// para buscas específicas, e por isso não tem link no menu, na home nem no rodapé.
//
// As perguntas abrem e fecham como o FAQ da home, mas com <details> nativo em vez
// do Accordion do Radix: o Radix só coloca a resposta no HTML quando alguém clica,
// e aí os robôs (que não clicam) liam só as perguntas. Com <details>, a resposta
// já vem no HTML e o robô lê tudo; quem visita vê a lista fechada.
export function FaqPage({ lang }: { lang: Lang }) {
  const doc = getFaq(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(lang, "/faq")}#faq`,
    url: absoluteUrl(lang, "/faq"),
    inLanguage: HREFLANG[lang],
    mainEntity: doc.groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: answerText(item) },
      })),
    ),
  };

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex-1 max-w-3xl mx-auto px-6 py-24 w-full">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          {doc.title}
        </h1>
        <p className="text-lg leading-relaxed mb-14" style={{ color: "var(--foreground-muted)" }}>
          {doc.intro}
        </p>

        <div className="space-y-14">
          {doc.groups.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-titulo`}>
              <h2
                id={`${group.id}-titulo`}
                className="text-2xl font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {group.title}
              </h2>

              {group.items.map((item) => (
                <details
                  key={item.id}
                  id={item.id}
                  className="group border-b scroll-mt-28"
                  style={{ borderColor: "var(--foreground-muted)" }}
                >
                  <summary
                    className="flex items-center gap-4 py-5 text-left font-semibold cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                    style={{ color: "var(--foreground)" }}
                  >
                    {/* O sinal vem do CSS, não do texto: escrito no HTML, ele
                        entrava em tudo que um robô lê ("+ − Quanto custa..."). */}
                    <span
                      className="shrink-0 w-3 text-xl leading-none select-none before:content-['+'] group-open:before:content-['−']"
                      style={{ color: "var(--foreground-muted)" }}
                      aria-hidden="true"
                    />
                    <h3 className="text-base font-semibold">{item.q}</h3>
                  </summary>

                  <div
                    className="pl-8 pb-5 text-sm leading-relaxed space-y-3"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <p>{item.a}</p>
                    {item.list && (
                      <ul className="list-disc pl-5 space-y-1">
                        {item.list.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    )}
                    {item.links && (
                      <p>
                        {doc.moreLabel}{" "}
                        {item.links.map((link, i) => (
                          <span key={link.path}>
                            {i > 0 && ", "}
                            <Link
                              href={localePath(lang, link.path)}
                              className="text-blue-500 hover:underline"
                            >
                              {link.label}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
