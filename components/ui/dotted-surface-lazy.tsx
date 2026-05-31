"use client";

import dynamic from "next/dynamic";
import React from "react";

const DottedSurface = dynamic(
  () => import("./dotted-surface").then((m) => m.DottedSurface),
  { ssr: false }
);

type Props = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurfaceLazy(props: Props) {
  // Adia o three.js pra depois da 1ª pintura/idle, pra não competir com o LCP
  // do hero no celular fraco. O fundo de pontos surge logo em seguida.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      : window.setTimeout(() => setReady(true), 300);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  if (!ready) return null;
  return <DottedSurface {...props} />;
}
