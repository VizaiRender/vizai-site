"use client";

import { useT } from "@/lib/i18n";
import { Camera, SlidersHorizontal, Zap, Sparkles } from "lucide-react";

// Ícones por passo (mesma ordem do array de steps): cena/câmera, configuração,
// velocidade, resultado pronto pra apresentar.
const stepIcons = [Camera, SlidersHorizontal, Zap, Sparkles];

export function HowItWorksSection() {
  const t = useT();
  return (
    <section className="w-full pt-8 pb-32 md:pb-24 px-6" data-track-section="como-funciona">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
          {t.howItWorks.label}
        </p>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight max-w-xl mb-4">
          {t.howItWorks.title}
        </h2>

        {/* Description */}
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg mb-8">
          {t.howItWorks.description}
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8 pt-4">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Camera;
            return (
            <div
              key={i}
              className="py-3 sm:py-8"
            >
              <Icon size={26} strokeWidth={1.75} className="text-[#0940D2] dark:text-[#4d7fff] mb-4" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
