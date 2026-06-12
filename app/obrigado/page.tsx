import { Confetti } from "@/components/ui/confetti";
import Navbar from "@/app/components/Navbar";
import { SucessoContent } from "@/components/ui/sucesso-content";
import { PurchaseTracker } from "@/components/ui/purchase-tracker";

// Confirmação de compra: não deve aparecer no Google
export const metadata = {
  title: "Compra confirmada",
  robots: { index: false, follow: false },
};

const API_BASE =
  process.env.NEXT_PUBLIC_VIZAI_API_URL || "https://api.vizairender.com";

// Busca hashes SHA-256 de email/telefone do comprador (advanced matching do
// Meta). O servidor só devolve hashes — o dado em claro nunca chega ao browser.
// Falha silenciosa: em/ph são opcionais no evento Purchase.
async function fetchContactHashes(
  sid?: string
): Promise<{ em?: string; ph?: string }> {
  if (!sid) return {};
  try {
    const r = await fetch(
      `${API_BASE}/api/checkout-contact?sid=${encodeURIComponent(sid)}`,
      { signal: AbortSignal.timeout(4000), cache: "no-store" }
    );
    if (!r.ok) return {};
    return await r.json();
  } catch {
    return {};
  }
}

// Página de obrigado PÚBLICA e leve — sem login, sem busca de dados, sem fundo
// animado (WebGL). O plano vem pela URL (o servidor já sabe no checkout), então
// mostramos nome do plano + créditos sem precisar autenticar. O pagamento e os
// créditos já processam pelo webhook do Stripe; esta página é só confirmação +
// disparo do pixel de compra. Por ser pública e leve, é à prova de 1102/logout.
export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ sid?: string; val?: string; cur?: string; plan?: string }>;
}) {
  const { sid, val, cur, plan } = await searchParams;
  const { em, ph } = await fetchContactHashes(sid);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        overflow: "hidden",
      }}
    >
      <Navbar forceDark />
      <Confetti />
      <PurchaseTracker value={val} currency={cur} transactionId={sid} em={em} ph={ph} />

      <SucessoContent plan={plan} />
    </div>
  );
}
