import type { Metadata } from "next";
import { ConvitePage } from "@/components/pages/convite-page";
import { conviteMetadata } from "@/lib/convite-metadata";

// /convite/<código> chega aqui reescrito pelo middleware (ver middleware.ts).
export const metadata: Metadata = conviteMetadata("pt");

export default function Page() {
  return <ConvitePage />;
}
