"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

const avatars = [
  "https://i.pravatar.cc/150?img=47",
  "https://i.pravatar.cc/150?img=57",
  "https://i.pravatar.cc/150?img=52",
  "https://i.pravatar.cc/150?img=44",
  "https://i.pravatar.cc/150?img=68",
  "https://i.pravatar.cc/150?img=16",
];

export function TestimonialsSection() {
  const t = useT();
  return (
    <section className="w-full max-w-6xl mx-auto pt-8 pb-24 sm:py-24 px-6">
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
        {t.testimonials.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-16">
        {t.testimonials.subtitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.testimonials.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6"
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              "{item.quote}"
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Image
                src={avatars[i]}
                alt={item.name}
                width={36}
                height={36}
                className="rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
