import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/login/', '/signup/', '/sucesso/', '/checkout/'],
    },
    sitemap: 'https://vizairender.com/sitemap.xml',
  }
}
