"use client";

import { useState } from "react";
import { Compare } from "./compare";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImagePair {
  before: string;
  after: string;
  label?: string;
}

interface CompareCarouselProps {
  pairs: ImagePair[];
  className?: string;
}

export function CompareCarousel({ pairs, className }: CompareCarouselProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + pairs.length) % pairs.length);
  const next = () => setIndex((i) => (i + 1) % pairs.length);

  const current = pairs[index];
  const height = className ?? "h-[400px] md:h-[560px]";

  return (
    <div className="relative flex items-center gap-4 w-full max-w-4xl">
      <button
        onClick={prev}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 shadow-md flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex-1 p-2 border rounded-3xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <Compare
          key={index}
          firstImage={current.before}
          secondImage={current.after}
          firstImageClassName="object-cover"
          secondImageClassname="object-cover"
          className={`w-full rounded-2xl ${height}`}
          slideMode="drag"
          autoplay
        />
        {current.label && (
          <p className="text-center text-sm mt-2 mb-1 opacity-50">{current.label}</p>
        )}
      </div>

      <button
        onClick={next}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 shadow-md flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Próximo"
      >
        <ChevronRight size={20} />
      </button>

      {pairs.length > 1 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === index ? "bg-black dark:bg-white w-4" : "bg-black/20 dark:bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
