import { cookies } from "next/headers";
import { Confetti } from "@/components/ui/confetti";
import Navbar from "@/app/components/Navbar";
import { SucessoContent } from "@/components/ui/sucesso-content";
import { PurchaseTracker } from "@/components/ui/purchase-tracker";
import { FBC_COOKIE } from "@/lib/fbc";

// Confirmação de compra: não deve aparecer no Google
export const metadata = {
  title: "Compra confirmada",
  robots: { index: false, follow: false },
};

const API_BASE =
  process.env.NEXT_PUBLIC_VIZAI_API_URL || "https://api.vizairender.com";

// Confirma o pagamento e busca hashes SHA-256 de email/telefone do comprador
// (advanced matching do Meta). O servidor só devolve hashes — o dado em claro
// nunca chega ao browser. Falha silenciosa: em/ph são opcionais no Purchase.
//
// `paid` é o campo que importa: boleto/Pix caem aqui com o pagamento AINDA em
// aberto, porque a Stripe redireciona quando EMITE o boleto, não quando ele é
// pago. Sem essa checagem a página reportava pro Meta uma venda inexistente.
// Quando a verificação falha (rede/timeout) devolvemos {} e `paid` fica
// undefined de propósito — ver a regra de disparo abaixo.
async function fetchCheckoutStatus(
  sid?: string
): Promise<{ paid?: boolean; em?: string; ph?: string }> {
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
  const { paid, em, ph } = await fetchCheckoutStatus(sid);

  // Id do clique no anúncio, guardado na chegada ao site (ver lib/fbc.ts). É
  // lido AQUI no servidor porque o cookie é httpOnly — o browser não alcança.
  // Sem isso o Purchase chegava na Meta sem clique nenhum (fbc em 0%), e a
  // venda não voltava pro anúncio que a originou.
  const fbc = (await cookies()).get(FBC_COOKIE)?.value;

  // Dispara o pixel a menos que o pagamento seja SABIDAMENTE não confirmado.
  // `paid === false` (boleto emitido e não pago) → não dispara.
  // `paid === true` (cartão, ou boleto já pago) → dispara.
  // `paid === undefined` (não deu pra verificar) → dispara, preservando o
  // comportamento atual: um erro de rede não pode custar uma venda real de
  // cartão, que é a esmagadora maioria. O boleto pago depois é reportado pelo
  // SERVIDOR via Conversions API, então não fica descoberto.
  const shouldTrackPurchase = paid !== false;

  // Só tratamos como pendente o que o servidor CONFIRMOU estar em aberto. Se a
  // verificação falhou (paid undefined), mostramos a tela normal de sucesso —
  // errar pro lado de "parabéns" é melhor que dizer "aguarde o boleto" pra quem
  // pagou no cartão e já tem o crédito na conta.
  const isPending = paid === false;

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
      {/* Sem confete enquanto o boleto não é pago — comemorar aqui foi o que
          fez cliente achar que a compra estava concluída e abrir suporte. */}
      {!isPending && <Confetti />}
      {shouldTrackPurchase && (
        <PurchaseTracker
          value={val}
          currency={cur}
          transactionId={sid}
          em={em}
          ph={ph}
          fbc={fbc}
        />
      )}

      <SucessoContent plan={plan} pending={isPending} />
    </div>
  );
}
