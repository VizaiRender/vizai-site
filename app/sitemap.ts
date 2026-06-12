import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/treinamento'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://vizairender.com'

  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${base}/treinamento/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/download`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/treinamento`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles,
  ]
}
