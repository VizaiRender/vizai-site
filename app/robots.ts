import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Só entram aqui caminhos que o Google nunca deve buscar. Página que
      // precisa SAIR do índice (login, cadastro, checkout, obrigado) fica de
      // fora de propósito: ela usa noindex na meta tag, e o Google só lê essa
      // tag se conseguir rastrear a página. Bloquear aqui deixaria a URL presa
      // no índice, sem título nem descrição.
      //
      // Cuidado com a barra final: o casamento do Google é por prefixo literal,
      // então '/login/' NÃO cobre '/login'. As regras '/login/', '/signup/' e
      // '/checkout/' que existiam aqui não casavam com nada, e a tela de login
      // acabou indexada (no host www chegou a ser a 2ª URL mais exibida do
      // site). Se um dia for bloquear uma rota de página, escreva sem a barra.
      //
      // '/app/' segue valendo porque tudo que existe embaixo dele tem barra
      // ('/app/conta', '/app/portal') e já nasce noindex pelo layout.
      disallow: ['/api/', '/auth/', '/app/'],
    },
    sitemap: 'https://vizairender.com/sitemap.xml',
  }
}
