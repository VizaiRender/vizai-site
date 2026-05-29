"use client";

import { useLang } from "@/app/components/LanguageProvider";

const langMap: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function PluginDemo() {
  const { lang } = useLang();
  const pluginLang = langMap[lang] ?? "pt-BR";

  const scale = 0.82;
  const w = 380, h = 660;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: Math.round(h * scale),
    }}>
      <div style={{
        width: Math.round(w * scale),
        height: Math.round(h * scale),
        overflow: "visible",
        flexShrink: 0,
        borderRadius: 16,
        boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.10)",
      }}>
        <div style={{
          width: w,
          height: h,
          borderRadius: 16,
          overflow: "hidden",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}>
          <iframe
            key={pluginLang}
            src={`/demo/index.html?lang=${pluginLang}`}
            title="Vizai Render Demo"
            loading="lazy"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
