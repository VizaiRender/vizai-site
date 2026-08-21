import type { Metadata } from "next";

// Tela de cadastro não tem o que fazer no Google. O noindex mora aqui, e não na
// página, porque page.tsx é componente de cliente ("use client") e componente
// de cliente não exporta metadata.
//
// De propósito NÃO bloqueamos /signup no robots.txt: o Google precisa rastrear a
// página pra conseguir ler esta tag. Bloquear no robots é o que mantém uma URL
// presa no índice — foi assim que www.vizairender.com/login virou a 2ª URL mais
// exibida do site.
export const metadata: Metadata = {
  title: "Criar conta",
  robots: { index: false, follow: false },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
