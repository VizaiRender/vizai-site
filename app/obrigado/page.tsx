import { cookies } from "next/headers";
import { Confetti } from "@/components/ui/confetti";
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
): Promise<{ paid?: boolean; created?: number; em?: string; ph?: string }> {
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
  const { paid, created, em, ph } = await fetchCheckoutStatus(sid);

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
  // ...e desde que o link não seja velho. Esta página dispara o pixel pra QUALQUER
  // um que abra a URL com valor na query, então o cliente que reabre o
  // agradecimento pelo histórico (ou cujo navegador restaura as abas) virava uma
  // venda que nunca existiu. Na prática a Stripe redireciona em minutos; 6h é
  // folga larga pro fluxo real. Boleto pago depois cai fora dessa janela de
  // propósito — quem reporta esse é o servidor, pela Conversions API.
  // `created` ausente (verificação falhou) não bloqueia: mesma regra do `paid`,
  // erro de rede não pode custar uma venda de cartão.
  const SIX_HOURS = 6 * 60 * 60;
  const isStaleLink =
    typeof created === "number" && Date.now() / 1000 - created > SIX_HOURS;

  const shouldTrackPurchase = paid !== false && !isStaleLink;

  // A tela de "boleto gerado" saiu em 10/2026: o boleto foi desligado em 30/09
  // e o Pix confirma na hora. Se um Pix ainda chegar aqui sem confirmação
  // (raro, a Stripe permite), a pessoa vê a tela normal e o crédito entra
  // segundos depois pelo async_payment_succeeded. A trava acima é que NÃO pode
  // sair: sem ela, uma venda não paga vai pra Meta como Purchase.

  return (
    <div className="obrigado-pagina">
      {/* Sem menu e sem rolagem no computador, a pedido do Ramon: a página é
          um fim de caminho, só a confirmação e a oferta do Arcture. A trava
          só vale com tela de pelo menos 768 x 700. No celular, ou numa janela
          baixa, o cartão não cabe inteiro, e travar esconderia o botão do
          Arcture; ali a rolagem continua. */}
      <style>{`
        .obrigado-pagina {
          position: relative;
          min-height: 100dvh;
          background: #f9f8f5; /* quase branco, levemente quente: não branco puro */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          overflow: hidden;
        }
        @media (min-width: 768px) and (min-height: 700px) {
          .obrigado-pagina { height: 100dvh; padding: 24px; }
          html:has(.obrigado-pagina), body:has(.obrigado-pagina) { overflow: hidden; }
        }
      `}</style>
      <Confetti />
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

      <SucessoContent plan={plan} />
    </div>
  );
}
