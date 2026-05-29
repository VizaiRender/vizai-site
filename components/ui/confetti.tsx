"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#ec4899", "#f97316", "#fff"];

interface Piece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  round: boolean;
}

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 5,
        delay: Math.random() * 2.5,
        duration: Math.random() * 2 + 2.5,
        rotate: Math.random() * 360,
        round: Math.random() > 0.5,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "105vh", opacity: [1, 1, 0.2, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
