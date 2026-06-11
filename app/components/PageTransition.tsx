"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Na 1ª carga a página renderiza JÁ visível (initial=false). Antes o motion.div
  // saía em opacity:0 e segurava a pintura de TODO o conteúdo (inclusive o H1 =
  // elemento LCP) até o JS hidratar — era a causa do "render delay" de ~18s no
  // mobile. O fade segue normal nas navegações seguintes entre páginas.
  // A ref só pode virar false DEPOIS da montagem (não durante o render): mutar
  // durante o render fazia o 2º render do StrictMode divergir do HTML do servidor
  // (hydration mismatch no style do motion.div).
  const isFirst = useRef(true);
  const firstLoad = isFirst.current;
  useEffect(() => {
    isFirst.current = false;
  }, []);

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
