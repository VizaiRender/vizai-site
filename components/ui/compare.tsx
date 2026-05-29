"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CompareProps {
  firstImage: string;
  secondImage: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  className?: string;
  slideMode?: "hover" | "drag";
  autoplay?: boolean;
}

export function Compare({
  firstImage,
  secondImage,
  firstImageClassName,
  secondImageClassname,
  className,
  slideMode = "hover",
  autoplay = false,
}: CompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (slideMode === "hover") updatePosition(e.clientX);
      if (slideMode === "drag" && dragging.current) updatePosition(e.clientX);
    },
    [slideMode, updatePosition]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (slideMode === "drag") {
        dragging.current = true;
        updatePosition(e.clientX);
      }
    },
    [slideMode, updatePosition]
  );

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    if (!autoplay) return;
    let dir = 1;
    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev + dir * 0.4;
        if (next >= 95) dir = -1;
        if (next <= 5) dir = 1;
        return next;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none", className)}
      style={{ cursor: slideMode === "drag" ? "col-resize" : "default" }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* imagem de baixo (depois) — ocupa todo o container */}
      <Image
        src={secondImage}
        alt="depois"
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className={cn("object-cover", secondImageClassname)}
        draggable={false}
      />

      {/* imagem de cima (antes) — fixada no tamanho total, recortada por clip-path */}
      <Image
        src={firstImage}
        alt="antes"
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className={cn("object-cover", firstImageClassName)}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* linha divisória */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12H16M8 12L11 9M8 12L11 15M16 12L13 9M16 12L13 15" />
          </svg>
        </div>
      </div>
    </div>
  );
}
