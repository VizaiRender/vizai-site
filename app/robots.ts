import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /obrigado fica de fora de propósito: ela usa noindex na meta tag,
      // e o Google precisa conseguir rastrear a página pra ler a tag.
      disallow: ['/api/', '/auth/', '/login/', '/signup/', '/checkout/', '/app/'],
    },
    sitemap: 'https://vizairender.com/sitemap.xml',
  }
}
