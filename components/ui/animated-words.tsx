"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useT } from "@/lib/i18n";

export type AnimatedWordItem = {
  text: string;
  comingSoon?: boolean;
};

interface AnimatedWordsProps {
  words: (string | AnimatedWordItem)[];
  interval?: number;
}

export function AnimatedWords({ words, interval = 2500 }: AnimatedWordsProps) {
  const t = useT();
  const [index, setIndex] = useState(0);

  const normalizedWords: AnimatedWordItem[] = words.map((w) =>
    typeof w === "string" ? { text: w } : w
  );

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % normalizedWords.length), interval);
    return () => clearInterval(id);
  }, [normalizedWords.length, interval]);

  const longestItem = normalizedWords.reduce((a, b) => {
    return a.text.length >= b.text.length ? a : b;
  });

  const currentWord = normalizedWords[index];

  const Badge = () => (
    <span
      style={{
        position: "absolute",
        bottom: "-0.8em",
        right: "0",
        fontSize: "0.14em",
        fontWeight: 700,
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        padding: "0.25em 0.6em",
        borderRadius: "999px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {t.marquee.comingSoon}
    </span>
  );

  return (
    <span style={{ display: "inline-grid", alignItems: "center", justifyItems: "start", verticalAlign: "bottom" }}>
      {/* define a largura do container sem aparecer */}
      <span
        style={{
          gridArea: "1/1",
          visibility: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          display: "inline-block",
        }}
        aria-hidden
      >
        {longestItem.text}
        {longestItem.comingSoon && <Badge />}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord.text}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            gridArea: "1/1",
            color: "#0940D2",
            whiteSpace: "nowrap",
            position: "relative",
            display: "inline-block",
          }}
        >
          {currentWord.text}
          {currentWord.comingSoon && <Badge />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
