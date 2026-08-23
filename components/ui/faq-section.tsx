"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/lib/i18n";

export function FaqSection() {
  const t = useT();
  return (
    <section className="pt-8 sm:pt-24 pb-10 px-6" data-track-section="faq">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-12"
          style={{ color: "var(--foreground)" }}
        >
          {t.faq.title}
        </h2>

        <Accordion type="single" collapsible>
          {t.faq.items.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger style={{ color: "var(--foreground)" }}>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
