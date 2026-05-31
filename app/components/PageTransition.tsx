"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Na 1ª carga a página renderiza JÁ visível (initial=false). Antes o motion.div
  // saía em opacity:0 e segurava a pintura de TODO o conteúdo (inclusive o H1 =
  // elemento LCP) até o JS hidratar — era a causa do "render delay" de ~18s no
  // mobile. O fade segue normal nas navegações seguintes entre páginas.
  const isFirst = useRef(true);
  const firstLoad = isFirst.current;
  isFirst.current = false;

  return (
    <motion.div
      key={pathname}
      initial={firstLoad ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
