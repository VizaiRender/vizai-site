"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs } from "@ark-ui/react/tabs";
import { Download, Monitor, Package, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import type { DownloadManifest } from "@/lib/download-manifest";
import { formatSize } from "@/lib/download-manifest";
import { useT } from "@/lib/i18n";

type SoftwareValue = "sketchup" | "archicad" | "revit";

type SoftwareTab = {
  value: SoftwareValue;
  label: string;
  available: boolean;
};

const tabs: SoftwareTab[] = [
  { value: "sketchup", label: "SketchUp", available: true },
  { value: "archicad", label: "ArchiCAD", available: false },
  { value: "revit", label: "Revit", available: false },
];

function DownloadButton({ manifest }: { manifest: DownloadManifest | null }) {
  const t = useT();
  if (!manifest) {
    return (
      <div className="flex flex-col items-center gap-3">
        <button
          disabled
          className="inline-flex items-center gap-2 bg-[#0940D2] text-white text-base font-semibold px-6 py-3 rounded-full cursor-not-allowed opacity-70"
        >
          <Download size={20} />
          {t.download.tabs.comingSoonBtn}
        </button>
        <p className="text-sm text-center" style={{ color: "var(--foreground-muted)" }}>
          {t.download.tabs.finalizing}
        </p>
      </div>
    );
  }

  const sizeLabel = formatSize(manifest.sizeBytes);

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={manifest.url}
        download
        rel="noopener"
        // ~7% maior que o original (text-lg / py-4), com folga extra nas
        // laterais: é o único caminho de verdade da página e ele precisa ganhar
        // do resto da tela sem parecer um banner.
        // O brilho no hover troca o degradê inteiro de uma vez. Fazer isso
        // pelas paradas de cor não funciona: gradiente é background-image, e
        // background-image não faz transição, então o efeito apareceria seco.
        className="inline-flex items-center gap-3 border-2 border-[#FF4D4F] bg-[linear-gradient(135deg,#2B6BFF_0%,#0940D2_52%,#0A2E9E_100%)] text-white text-[1.3rem] font-semibold px-12 py-[1.25rem] rounded-full shadow-lg shadow-[#0940D2]/25 transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-[#0940D2]/40"
      >
        <Download size={22} />
        {t.download.tabs.downloadBtn}
      </a>
      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
        {t.download.tabs.version} {manifest.latest}
        {sizeLabel ? ` · ${sizeLabel}` : ""}
        {manifest.releasedAt ? ` · ${manifest.releasedAt}` : ""}
      </p>
    </div>
  );
}

function SketchupContent({ manifest }: { manifest: DownloadManifest | null }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-12">
        <DownloadButton manifest={manifest} />
      </div>

      {/* GIF tutorial de instalação */}
      <div className="w-full mb-16 max-w-3xl mx-auto">
        <div
          className="w-full rounded-2xl border bg-white dark:bg-[#111111] shadow-sm overflow-hidden"
          style={{ borderColor: "rgba(127,127,127,0.15)" }}
        >
          <video
            src="/tutorial-sketchup.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Tutorial de instalação do plugin no SketchUp"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Passo a passo */}
      <section className="w-full mb-16">
        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center"
          style={{ color: "var(--foreground)" }}
        >
          {t.download.tabs.howToInstall}
        </h3>
        <ol className="space-y-6 max-w-2xl mx-auto">
          {t.download.tabs.steps.map((step, idx) => (
            <li key={idx} className="flex gap-5">
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
                style={{ backgroundColor: "#0940D2", color: "white" }}
              >
                {idx + 1}
              </div>
              <div className="pt-1">
                <h4
                  className="text-lg font-semibold mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {step.title}
                </h4>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Requisitos */}
      <section className="w-full mb-12">
        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center"
          style={{ color: "var(--foreground)" }}
        >
          {t.download.tabs.requirements}
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          <div
            className="rounded-2xl border p-6 bg-white dark:bg-[#111111] shadow-sm"
            style={{ borderColor: "rgba(127,127,127,0.18)" }}
          >
            <Monitor size={22} className="mb-3" style={{ color: "#0940D2" }} />
            <h4 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
              {t.download.tabs.reqSystemTitle}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t.download.tabs.reqSystemBody}
            </p>
          </div>
          <div
            className="rounded-2xl border p-6 bg-white dark:bg-[#111111] shadow-sm"
            style={{ borderColor: "rgba(127,127,127,0.18)" }}
          >
            <Package size={22} className="mb-3" style={{ color: "#0940D2" }} />
            <h4 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
              {t.download.tabs.reqSketchupTitle}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t.download.tabs.reqSketchupBody}
            </p>
          </div>
          <div
            className="rounded-2xl border p-6 bg-white dark:bg-[#111111] shadow-sm"
            style={{ borderColor: "rgba(127,127,127,0.18)" }}
          >
            <Sparkles size={22} className="mb-3" style={{ color: "#0940D2" }} />
            <h4 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
              {t.download.tabs.reqAccountTitle}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              {t.download.tabs.reqAccountBody}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ComingSoonContent({ software }: { software: string }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center text-center py-12">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "rgba(9, 64, 210, 0.1)" }}
      >
        <Clock size={28} style={{ color: "#0940D2" }} />
      </div>
      <h3
        className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
        style={{ color: "var(--foreground)" }}
      >
        {t.download.tabs.comingSoonTitle.replace("{software}", software)}
      </h3>
      <p
        className="text-base md:text-lg max-w-md mb-8 leading-relaxed"
        style={{ color: "var(--foreground-muted)" }}
      >
        {t.download.tabs.comingSoonBody.replace(/\{software\}/g, software)}
      </p>
      <Link
        href="/signup"
        className="inline-flex items-center gap-2 bg-[#0940D2] hover:bg-[#0730b0] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
      >
        {t.download.tabs.notifyMe}
      </Link>
    </div>
  );
}

export function DownloadTabs({ manifest }: { manifest: DownloadManifest | null }) {
  const [active, setActive] = useState<SoftwareValue>("sketchup");
  const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <Tabs.Root
        defaultValue="sketchup"
        onValueChange={(details) => setActive(details.value as SoftwareValue)}
        className="flex flex-col items-center mb-10"
      >
        <Tabs.List className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit mx-4">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-5 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 rounded-lg transition-all cursor-pointer data-selected:bg-[#0940D2] data-selected:text-white data-selected:shadow-sm"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {activeTab.value === "sketchup" ? (
            <SketchupContent manifest={manifest} />
          ) : (
            <ComingSoonContent software={activeTab.label} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
