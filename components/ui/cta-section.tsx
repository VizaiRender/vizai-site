"use client";

import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import { useT } from "@/lib/i18n";
import { useHref } from "@/app/components/LanguageProvider";
import { GoogleMark } from "@/components/ui/google-mark";

export function CtaSection() {
  const t = useT();
  const href = useHref();
  const words = [
    { text: "Vizai", className: "text-[#0940D2] dark:text-[#4d7fff]" },
    { text: "Render.", className: "text-[#0940D2] dark:text-[#4d7fff]" },
  ];
  return (
    <section className="relative py-16 md:py-32 overflow-hidden">

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-400 text-[16px] mb-4">
            {t.cta.eyebrow}
          </p>

          <h2 className="text-3xl font-bold lg:text-5xl text-black dark:text-white">
            {t.cta.title} {t.cta.connector}
          </h2>

          <TypewriterEffectSmooth
            words={words}
            className="justify-center text-4xl font-bold lg:text-5xl"
            cursorClassName="bg-[#0940D2]"
          />

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-[#0940D2] text-white hover:bg-[#0730b0] rounded-full px-5 md:px-6 h-12 text-base font-semibold transition-colors w-full sm:w-auto"
            >
              <Link href="/signup" className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap">
                <GoogleMark />
                {t.cta.primary}
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-transparent border border-gray-300 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 rounded-full px-10 h-12 text-base transition-colors w-full sm:w-auto"
            >
              <Link href={href("/download")}>{t.cta.secondary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

  );
}
