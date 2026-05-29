"use client";

import dynamic from "next/dynamic";
import React from "react";

const DottedSurface = dynamic(
  () => import("./dotted-surface").then((m) => m.DottedSurface),
  { ssr: false }
);

type Props = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurfaceLazy(props: Props) {
  return <DottedSurface {...props} />;
}
