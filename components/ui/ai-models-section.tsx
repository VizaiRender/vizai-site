"use client";

import { Banana, Clapperboard, Box, Orbit } from "lucide-react";
import { useT } from "@/lib/i18n";

// Silhueta oficial do Gemini (monocromática, herda a cor do texto)
function GeminiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 296 298" className={className} fill="currentColor" aria-hidden>
      <path d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z" />
    </svg>
  );
}

// Marca oficial do OpenAI (monocromática)
function OpenAiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 260" className={className} fill="currentColor" aria-hidden>
      <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
    </svg>
  );
}

// Ordem casa com t.aiModels.roles. Nomes exatos dos modelos (não traduzem).
const models = [
  { name: "Gemini", Icon: (p: { className?: string }) => <GeminiMark {...p} /> },
  { name: "Nano Banana Pro", Icon: (p: { className?: string }) => <Banana strokeWidth={1.6} {...p} /> },
  { name: "ChatGPT Image 2.0", Icon: (p: { className?: string }) => <OpenAiMark {...p} /> },
  { name: "Kling 3.0", Icon: (p: { className?: string }) => <Clapperboard strokeWidth={1.6} {...p} /> },
  { name: "Meshy.ai", Icon: (p: { className?: string }) => <Box strokeWidth={1.6} {...p} /> },
  { name: "Pannellum", Icon: (p: { className?: string }) => <Orbit strokeWidth={1.6} {...p} /> },
];

export function AiModelsSection() {
  const t = useT();

  return (
    <section className="pt-12 sm:pt-24 pb-28 sm:pb-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            {t.aiModels.title}
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            {t.aiModels.subtitle}
          </p>
        </div>

        {/* Grid: 2 col no mobile, 3 col no desktop → 6 modelos em 2 linhas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {models.map(({ name, Icon }) => (
            <div
              key={name}
              className="group flex flex-col md:flex-row items-center justify-center gap-2 md:gap-2.5 px-4 py-5 md:py-6 text-center rounded-2xl border border-[color:var(--glass-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0940D2]"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "var(--glass-shadow)",
                opacity: "var(--glass-opacity)",
              }}
            >
              <Icon className="h-5 w-auto shrink-0 text-[color:var(--foreground)] transition-colors duration-200 group-hover:text-[#0940D2]" />
              <span
                className="text-sm md:text-base font-semibold tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
