"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Pointer, Layout } from "lucide-react";
import { useTheme } from "next-themes";

type TabContent = {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
};

type Tab = {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
};

const defaultTabs: Tab[] = [
  {
    value: "tab-1",
    icon: <Zap className="h-4 w-4 shrink-0" />,
    label: "Configurar cena",
    content: {
      badge: "Em breve",
      title: "Conteúdo da tab 1",
      description:
        "Descrição placeholder. Substitua depois com o conteúdo final.",
      buttonText: "Saiba mais",
      imageSrc: "",
      imageAlt: "placeholder",
    },
  },
  {
    value: "tab-2",
    icon: <Pointer className="h-4 w-4 shrink-0" />,
    label: "Configurar render",
    content: {
      badge: "Em breve",
      title: "Conteúdo da tab 2",
      description:
        "Descrição placeholder. Substitua depois com o conteúdo final.",
      buttonText: "Saiba mais",
      imageSrc: "",
      imageAlt: "placeholder",
    },
  },
  {
    value: "tab-3",
    icon: <Layout className="h-4 w-4 shrink-0" />,
    label: "Renderizar",
    content: {
      badge: "Em breve",
      title: "Conteúdo da tab 3",
      description:
        "Descrição placeholder. Substitua depois com o conteúdo final.",
      buttonText: "Saiba mais",
      imageSrc: "",
      imageAlt: "placeholder",
    },
  },
];

type FeatureTabsProps = {
  heading: string;
  description: string;
  tabs?: Tab[];
};

export function FeatureTabs({ heading, description, tabs = defaultTabs }: FeatureTabsProps) {
  const [active, setActive] = useState(tabs[0].value);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && theme === "dark";

  const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];

  useEffect(() => {
    const id = setTimeout(() => {
      const currentIndex = tabs.findIndex((t) => t.value === active);
      const next = tabs[(currentIndex + 1) % tabs.length];
      setActive(next.value);
    }, 7000);
    return () => clearTimeout(id);
  }, [active, tabs]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {heading}
        </h2>
        <p className="text-lg max-w-2xl" style={{ color: "var(--foreground-muted)" }}>
          {description}
        </p>
      </div>

      {/* Tabs list */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className="relative flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
              style={{
                color: isActive ? "#fff" : "var(--foreground-muted)",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="feature-tabs-active-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: "#0940D2" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        className="mx-auto mt-8 max-w-7xl rounded-2xl p-6 lg:p-12"
        style={{
          backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid place-items-center gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12"
          >
            <div className="flex flex-col gap-5">
              <span
                className="inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
              >
                {activeTab.content.badge}
              </span>
              <h3
                className="text-3xl font-semibold lg:text-5xl tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                {activeTab.content.title}
              </h3>
              <p className="text-base lg:text-lg" style={{ color: "var(--foreground-muted)" }}>
                {activeTab.content.description}
              </p>
              <button
                className="mt-2.5 w-fit rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#0940D2",
                  color: "#fff",
                }}
              >
                {activeTab.content.buttonText}
              </button>
            </div>
            <div
              className="w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}
            >
              {activeTab.content.imageSrc ? (
                <img
                  src={activeTab.content.imageSrc}
                  alt={activeTab.content.imageAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-sm opacity-40">Imagem em breve</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
