import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Footer } from "@/components/ui/footer";
import { DashboardContent } from "@/components/ui/dashboard-content";
import { fetchCreditsBalance, fetchSubscription } from "@/lib/vizai-api";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string; notice?: string }>;
}) {
  const params = await searchParams;
  if (params.checkout === "success") redirect("/sucesso");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "";
  const firstName = fullName.split(" ")[0];

  const [balance, subscription] = session
    ? await Promise.all([
        fetchCreditsBalance(session.access_token),
        fetchSubscription(session.access_token),
      ])
    : [null, null];

  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex-1 max-w-5xl mx-auto px-6 pb-16 w-full"
        style={{ paddingTop: "140px" }}
      >
        <DashboardContent
          firstName={firstName}
          balance={balance}
          plan={subscription?.plan}
          periodEnd={subscription?.current_period_end ?? null}
          cancelScheduled={subscription?.cancel_at_period_end ?? false}
        />
      </section>

      <Footer />
    </main>
  );
}
