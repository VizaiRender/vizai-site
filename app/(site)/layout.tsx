import Navbar from "@/app/components/Navbar";

// Canonical da home (as demais páginas sobrescrevem com a própria URL)
export const metadata = {
  alternates: { canonical: "/" },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
