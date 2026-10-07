"use client";

import Image from "next/image";
import { useLang } from "@/app/components/LanguageProvider";
import { useT } from "@/lib/i18n";

// Foto do painel do plugin, uma por idioma. Até 07/10/2026 aqui morava a demo
// interativa, uma maquete do painel inteiro num iframe: 6,3 MB em public/demo,
// quase ninguém mexia nela e o arquivo pesava na home. A foto mostra a mesma
// tela parada.
//
// As fotos saíram da própria maquete, fotografada a 380x660 com densidade 2x,
// o que dá 760x1320. Para refazer, recuperar public/demo do git (commit
// anterior à remoção) e fotografar de novo. Trocar a arte exige nome novo,
// porque public/_headers marca /home/ como immutable.
const SRC: Record<string, string> = {
  pt: "/home/painel-plugin-pt.png",
  en: "/home/painel-plugin-en.png",
  es: "/home/painel-plugin-es.png",
};

// Mesmo tamanho que a maquete ocupava (380x660 reduzida a 82%), para a seção
// não mudar de altura nem de alinhamento.
const W = 312;
const H = 541;

export function PluginScreenshot() {
  const { lang } = useLang();
  const t = useT();

  return (
    <div
      style={{
        width: W,
        height: H,
        flexShrink: 0,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.10)",
      }}
    >
      <Image
        src={SRC[lang] ?? SRC.pt}
        alt={t.home.demoAlt}
        width={W}
        height={H}
        style={{ width: W, height: H, display: "block", objectFit: "cover", objectPosition: "top" }}
      />
    </div>
  );
}
