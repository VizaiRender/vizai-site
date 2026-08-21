import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/treinamento'

const base = 'https://vizairender.com'

// Datas reais da última alteração de cada seção, escritas à mão de propósito.
// Isto aqui era `new Date()`: o lastmod saía como o instante da requisição, ou
// seja, "modificado agora" em toda página, todo dia. Quando o Google percebe
// que a data é sempre a atual, ele para de confiar no campo e passa a ignorar
// o lastmod do site inteiro — justo o sinal que serve pra pedir rastreio de
// novo quando algo muda de verdade.
//
// Ao mexer no conteúdo de uma seção, atualize a data correspondente abaixo.
const UPDATED = {
  home: '2026-08-19',
  download: '2026-06-11',
  treinamento: '2026-08-20',
  legal: '2026-08-16',
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${base}/treinamento/${a.slug}`,
    lastModified: UPDATED.treinamento,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: base,
      lastModified: UPDATED.home,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/download`,
      lastModified: UPDATED.download,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/treinamento`,
      lastModified: UPDATED.treinamento,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles,
    // Indexáveis e linkadas no rodapé; estavam fora do sitemap sem motivo.
    {
      url: `${base}/privacy`,
      lastModified: UPDATED.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: UPDATED.legal,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
