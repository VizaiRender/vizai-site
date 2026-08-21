import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/treinamento'
import { HREFLANG, LANGS, absoluteUrl } from '@/lib/routes'

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

type Entry = {
  path: string
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

// Um único caminho canônico (o do português) por página; os três idiomas saem
// daqui embaixo. Assim não dá pra esquecer de listar uma tradução.
const PAGES: Entry[] = [
  { path: '/', lastModified: UPDATED.home, changeFrequency: 'weekly', priority: 1 },
  { path: '/download', lastModified: UPDATED.download, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/treinamento', lastModified: UPDATED.treinamento, changeFrequency: 'weekly', priority: 0.8 },
  ...ARTICLES.map((a) => ({
    path: `/treinamento/${a.slug}`,
    lastModified: UPDATED.treinamento,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })),
  // Indexáveis e linkadas no rodapé; estavam fora do sitemap sem motivo.
  { path: '/privacy', lastModified: UPDATED.legal, changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', lastModified: UPDATED.legal, changeFrequency: 'yearly', priority: 0.3 },
]

// O bloco de alternates repete, em cada entrada, o endereço das três versões.
// É o que faz o Google entender que /en/download e /download são a MESMA
// página em idiomas diferentes, em vez de conteúdo duplicado.
function languagesFor(path: string) {
  const languages: Record<string, string> = {}
  for (const l of LANGS) languages[HREFLANG[l]] = absoluteUrl(l, path)
  languages['x-default'] = absoluteUrl('pt', path)
  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(lang, page.path),
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      // As traduções entram um degrau abaixo do português: é a versão com
      // histórico e a que o Google já sabe ranquear.
      priority: lang === 'pt' ? page.priority : Math.max(0.1, page.priority - 0.1),
      alternates: { languages: languagesFor(page.path) },
    })),
  )
}
