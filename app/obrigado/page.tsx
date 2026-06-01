import { Confetti } from "@/components/ui/confetti";
import Navbar from "@/app/components/Navbar";
import { SucessoContent } from "@/components/ui/sucesso-content";
import { PurchaseTracker } from "@/components/ui/purchase-tracker";

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
      <PurchaseTracker value={val} currency={cur} transactionId={sid} />

      <SucessoContent plan={plan} />
    </div>
  );
}
