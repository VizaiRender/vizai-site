"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 355, 1220);

    // O fundo é decoração. Se o navegador não conseguir dar um contexto
    // gráfico (máquina fraca, driver velho, contextos WebGL demais na aba), o
    // three.js LANÇA "Error creating WebGL context". Sem este try, a exceção
    // sobe pelo efeito e, como o site não tinha rede de segurança, derrubava a
    // PÁGINA INTEIRA — o visitante via tela preta em vez de perder só o fundo.
    // Apareceu em 1,09% das sessões no Clarity.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    // Limita a densidade de pixels a 2x: em telas 3x (celulares) renderiza
    // ~metade dos pixels, sem diferença visível num fundo de pontos. Grande
    // economia de GPU/CPU no celular fraco.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);
    container.appendChild(renderer.domElement);

    const positions: number[] = [];
    const colors: number[] = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(ix * SEPARATION - (AMOUNTX * SEPARATION) / 2, 0, iy * SEPARATION - (AMOUNTY * SEPARATION) / 2);
        theme === "dark" ? colors.push(200, 200, 200) : colors.push(0, 0, 0);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 8, vertexColors: true, transparent: true, opacity: 0.8, sizeAttenuation: true });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animId = 0;
    let running = false;
    let onScreen = true;

    const renderFrame = () => {
      animId = requestAnimationFrame(renderFrame);
      const posAttr = geometry.attributes.position;
      const pos = posAttr.array as Float32Array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          pos[i * 3 + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    };

    // Só anima quando o hero está visível E a aba está em foco — para de gastar
    // CPU assim que o usuário rola pra baixo ou troca de aba. Retoma sozinho.
    const start = () => {
      if (!running) {
        running = true;
        renderFrame();
      }
    };
    const stop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(animId);
      }
    };
    const update = () => (onScreen && !document.hidden ? start() : stop());

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Perder o contexto no meio da sessão (a GPU reinicia, a aba fica muito
    // tempo em segundo plano) faria o `render` estourar a cada quadro. Para o
    // laço e não volta: sem contexto não há o que desenhar.
    const contextoPerdido = (e: Event) => {
      e.preventDefault();
      stop();
      onScreen = false;
    };
    renderer.domElement.addEventListener("webglcontextlost", contextoPerdido);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      stop();
      io.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", contextoPerdido);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", update);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 -z-10", className)}
      {...props}
    />
  );
}
