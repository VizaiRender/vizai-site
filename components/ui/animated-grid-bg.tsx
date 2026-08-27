"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useOnScreen } from "@/components/ui/use-on-screen";

const GridPattern = ({ id, offsetX, offsetY }: { id: string, offsetX: any, offsetY: any }) => {
  return (
    <svg className="w-full h-full" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-black/40 dark:text-white/40" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export function AnimatedGridBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Animar o deslocamento de um `<pattern>` SVG re-rasteriza a seção inteira a
  // cada quadro (pattern não é composto na GPU). Fora da tela isso é gasto puro.
  const naTela = useOnScreen(containerRef);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // `getBoundingClientRect` força cálculo de layout; com a seção longe da
      // tela o holofote nem aparece, então nem medimos.
      if (!naTela.current) return;
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, naTela]);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  // A grade fica PARADA de propósito. Antes ela deslizava na diagonal, e animar
  // o deslocamento de um `<pattern>` SVG re-rasteriza a seção inteira a cada
  // quadro (pattern não é composto na GPU) — 60 repintes por segundo justamente
  // na tela onde a pessoa decide comprar. O deslizamento era lento demais pra
  // alguém notar. O holofote que segue o mouse continua: ele repinta só quando
  // o mouse se move, não o tempo todo.

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.02 }}>
        <GridPattern id="static-grid-bg" offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div 
        className="absolute inset-0 z-0 opacity-100"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern id="masked-grid-bg" offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Blurred blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-[#0940D2]/40 dark:bg-[#0940D2]/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-[#0940D2]/40 dark:bg-[#0940D2]/20 blur-[120px]" />
      </div>

      {/* Fade top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to bottom,var(--background),transparent)" }} />
      {/* Fade bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to top,var(--background),transparent)" }} />
    </div>
  );
}
