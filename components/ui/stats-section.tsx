"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";

const StatsChart = dynamic(() => import("./stats-chart"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const display = target >= 1000 ? value.toLocaleString("pt-BR") : String(value);

  return (
    <span ref={ref} className="text-3xl font-medium text-gray-900 dark:text-white">
      {prefix}{display}{suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useT();
  return (
    <section className="w-full max-w-6xl mx-auto text-left py-24 px-6" data-track-section="stats">
      {/* h2, nao h3: a home ia do h1 direto pro h3 aqui, pulando um nivel. E
          a unica secao da pagina que fazia isso, todas as outras usam h2. O
          tamanho e o peso vem das classes, nao da tag. */}
      <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
        {t.stats.title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-6 sm:mb-16">
        {t.stats.subtitle}
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-8 w-full sm:flex sm:flex-wrap sm:gap-x-20 sm:justify-between">
        <div>
          <CountUp target={7530} prefix="+" />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.stats.renders}</p>
        </div>
        <div>
          <CountUp target={585} prefix="+" />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.stats.users}</p>
        </div>
        <div>
          <CountUp target={7} />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.stats.countries}</p>
        </div>
        <div>
          <CountUp target={45} prefix="~" suffix={t.stats.seconds} />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.stats.avgTime}</p>
        </div>
      </div>

      <div className="w-full h-48 mt-4 sm:mt-10" style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}>
        <StatsChart />
      </div>
    </section>
  );
}
