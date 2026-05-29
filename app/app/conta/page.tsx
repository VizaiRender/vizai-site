import { createClient } from "@/lib/supabase/server";
import { Footer } from "@/components/ui/footer";
import { AccountContent } from "@/components/ui/account-content";
import { fetchSubscription } from "@/lib/vizai-api";

export const metadata = {
  title: "Minha conta | Vizai Render",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ portal_error?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const portalError = params?.portal_error || null;
  const notice = params?.notice || null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const subscription = session
    ? await fetchSubscription(session.access_token)
    : null;

  const name = user?.user_metadata?.full_name
    ? String(user.user_metadata.full_name)
    : null;

  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex-1 max-w-3xl mx-auto px-6 pb-16 w-full"
        style={{ paddingTop: "140px" }}
      >
        <AccountContent
          email={user?.email}
          name={name}
          plan={subscription?.plan}
          periodEnd={subscription?.current_period_end ?? null}
          cancelScheduled={subscription?.cancel_at_period_end ?? false}
          notice={notice}
          portalError={portalError}
        />
      </section>

      <Footer />
    </main>
  );
}
