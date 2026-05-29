import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchSubscription } from "@/lib/vizai-api";
import { Confetti } from "@/components/ui/confetti";
import WavyBackground from "@/components/ui/wavy-background";
import Navbar from "@/app/components/Navbar";
import { SucessoContent } from "@/components/ui/sucesso-content";

export default async function SucessoPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login?next=/sucesso");

  const subscription = await fetchSubscription(session.access_token);

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
      <WavyBackground className="absolute inset-0 z-0" />
      <Confetti />

      <SucessoContent plan={subscription?.plan} />
    </div>
  );
}
