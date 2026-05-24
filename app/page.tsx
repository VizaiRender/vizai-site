import Link from "next/link";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { CompareCarousel } from "@/components/ui/compare-carousel";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="hero-section isolate relative flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-6 overflow-hidden">
        <DottedSurface className="absolute inset-0 z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <a
            href="#download"
            className="mb-8 flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-1.5 text-sm shadow-sm hover:border-black/20 dark:hover:border-white/20 transition-colors"
            style={{ color: "var(--foreground-muted)" }}
          >
            Vizai Render dentro do seu software preferido
            <span style={{ opacity: 0.5 }}>›</span>
          </a>

          <h1
            className="max-w-4xl text-center text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Renders fotorrealistas com IA direto do SketchUp
          </h1>

          <p
            className="max-w-xl text-center text-lg leading-relaxed mb-10"
            style={{ color: "var(--foreground-muted)" }}
          >
            Instale o plugin, configure a cena e faça um render
            fotorrealista com IA em poucos segundos.
          </p>

          <div className="flex items-center justify-center">
            <Link
              href="/signup"
              className="bg-black dark:bg-white text-white dark:text-black text-lg font-semibold px-6 py-3 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-colors"
            >
              Teste agora
            </Link>
          </div>
        </div>
      </section>

      {/* Seção GIF — plugin em ação */}
      <section className="py-24 px-6 flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Veja como é simples
          </h2>
          <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
            Três cliques dentro do SketchUp e o render está pronto.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full max-w-4xl">
          <div className="flex-shrink-0 w-10" />
          <div className="flex-1 p-2 border rounded-3xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            {/* substitua o conteúdo abaixo pelo <img src="url-do-gif" /> quando estiver pronto */}
            <div className="w-full h-[400px] md:h-[560px] rounded-2xl bg-black/10 dark:bg-white/10 flex items-center justify-center">
              <p className="text-sm opacity-40">GIF do plugin em breve</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-10" />
        </div>
      </section>

      {/* Seção Antes / Depois */}
      <section className="pb-24 px-6 flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Do print ao render em segundos
          </h2>
          <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
            Arraste para comparar o modelo bruto com o render gerado pela IA.
          </p>
        </div>

        <CompareCarousel
          pairs={[
            {
              before: "https://i.ibb.co/CK920X39/01.jpg",
              after: "https://i.ibb.co/ZRT4hzw9/01-1111.jpg",
            },
            {
              before: "https://i.ibb.co/21jMxgV1/01.jpg",
              after: "https://i.ibb.co/ynrgCwS2/02.jpg",
            },
          ]}
        />
      </section>
    </main>
  );
}
