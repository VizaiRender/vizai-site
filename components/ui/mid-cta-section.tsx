"use client";

import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import { useT } from "@/lib/i18n";
import { useHref } from "@/app/components/LanguageProvider";
import { GoogleMark } from "@/components/ui/google-mark";

export function MidCtaSection() {
  const t = useT();
  const href = useHref();
  const words = [
    { text: "Vizai", className: "mid-cta-accent" },
    { text: "Render.", className: "mid-cta-accent" },
  ];
  return (
    <section className="px-4 md:px-6 py-10 md:py-16" data-track-section="cta-meio">
      <div className="mid-cta-frame mx-auto max-w-6xl">
        <div className="mid-cta-panel py-20 md:py-28">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="flex flex-col items-center text-center">
              <p className="text-[16px] mb-4 mid-cta-muted">
                {t.midCta.eyebrow}
              </p>

              <h2 className="text-3xl font-bold lg:text-5xl mid-cta-title">
                {t.midCta.title} {t.midCta.connector}
              </h2>

              <TypewriterEffectSmooth
                words={words}
                className="justify-center text-4xl font-bold lg:text-5xl"
                cursorClassName="bg-[#0940D2]"
              />

              <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-3 w-full sm:w-auto">
                <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="mid-cta-primary rounded-full px-6 h-12 text-base font-semibold transition-colors w-full sm:w-auto"
                  >
                    <Link href="/signup" className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap">
                      <GoogleMark />
                      {t.midCta.primary}
                    </Link>
                  </Button>
                  <p className="text-xs text-center mid-cta-muted">
                    {t.midCta.note}
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="mid-cta-secondary rounded-full px-6 h-12 text-base font-medium transition-colors w-full sm:w-auto"
                >
                  <Link href={href("/download")} className="whitespace-nowrap">
                    {t.cta.secondary}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
