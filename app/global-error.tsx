"use client";

/**
 * Último recurso: só entra em cena quando nem o layout raiz consegue subir.
 * Por isso ele mesmo precisa desenhar <html> e <body>, e não pode contar com
 * tema, provedor de idioma nem as fontes do site. Tudo aqui é escrito à mão,
 * de propósito, para não depender de nada que possa estar quebrado.
 *
 * Sem idioma disponível, o texto sai em português com uma linha em inglês.
 */

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          background: "#fafafa",
          color: "#0a0a0a",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 16px",
          }}
        >
          Algo deu errado
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(10, 10, 10, 0.55)",
            maxWidth: 440,
            margin: "0 0 8px",
          }}
        >
          Tivemos um problema ao carregar o site. Tentar de novo costuma
          resolver.
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(10, 10, 10, 0.4)",
            maxWidth: 440,
            margin: "0 0 40px",
          }}
        >
          Something went wrong. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          style={{
            background: "#0940D2",
            color: "#fff",
            border: "none",
            borderRadius: 9999,
            padding: "0 32px",
            height: 48,
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Tentar de novo
        </button>

        {/*
          `<a>` comum, e não `<Link>`, de propósito: se chegamos aqui o layout
          raiz não subiu, e o roteador do Next pode ser justamente a peça
          quebrada. Um link comum recarrega a página do zero, que é o
          comportamento que a gente quer nesta tela.
        */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          style={{
            marginTop: 16,
            color: "#0940D2",
            fontSize: "0.9375rem",
            textDecoration: "none",
          }}
        >
          Ir para a página inicial
        </a>
      </body>
    </html>
  );
}
