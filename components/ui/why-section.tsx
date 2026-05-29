"use client";

import React from "react";
import { PlugZap, Building2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const icons = [PlugZap, Building2, Wallet];

const FeatureCard = React.forwardRef<
  HTMLDivElement,
  { Icon: React.ElementType; title: string; description: string; className?: string }
>(({ Icon, title, description, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-start gap-4 p-6 rounded-2xl border shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent-foreground/20",
      className
    )}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-secondary text-secondary-foreground">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-bold leading-none tracking-tight" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
        {description}
      </p>
    </div>
  </div>
));
FeatureCard.displayName = "FeatureCard";

export function WhySection() {
  const t = useT();
  return (
    <section className="w-full pt-24 pb-40 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: "var(--foreground-muted)" }}>
            {t.why.label}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
          >
            {t.why.title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.why.features.map((feature, i) => (
            <FeatureCard key={i} Icon={icons[i]} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
