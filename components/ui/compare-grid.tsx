"use client";

import { Compare } from "./compare";

interface ImagePair {
  before: string;
  after: string;
  label?: string;
}

interface CompareGridProps {
  pairs: ImagePair[];
}

export function CompareGrid({ pairs }: CompareGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
      {pairs.map((pair, i) => (
        <div
          key={i}
          className="p-2 border rounded-3xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
        >
          <Compare
            firstImage={pair.before}
            secondImage={pair.after}
            firstImageClassName="object-cover"
            secondImageClassname="object-cover"
            className="w-full rounded-2xl h-[280px] md:h-[320px]"
            slideMode="drag"
            autoplay
          />
          {pair.label && (
            <p className="text-center text-sm mt-2 mb-1 opacity-50">{pair.label}</p>
          )}
        </div>
      ))}
    </div>
  );
}
