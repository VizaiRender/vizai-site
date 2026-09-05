@AGENTS.md

# Vizai (site)

Contexto completo do site, para qualquer agente de IA que trabalhe aqui.
Última verificação contra o código: **2026-09-05**.

O produto inteiro (plugin de SketchUp, servidor de API, créditos, planos,
Supabase, Stripe) está descrito no `CLAUDE.md` do repositório
`VizaiRender/vizai-plugin`. Leia aquele para entender o negócio; este cobre a
parte web.

---

## 1. O que é

Site do Vizai, um plugin de SketchUp que renderiza o modelo 3D com IA. Aqui
moram: a landing, o checkout, a página de download do plugin, a área do
assinante e a seção de Treinamento com 15 guias.

**O que este repositório NÃO faz:** não debita crédito, não concede crédito de
boas-vindas e não fala com Vertex nem com a Fal. Ele consome a mesma API do
plugin (`api.vizairender.com`) e o mesmo Supabase.

Os 8 créditos de boas-vindas são exclusivos do primeiro login **no plugin**.
Isso é decisão de anti-abuso: a concessão é amarrada ao device fingerprint da
máquina, que o navegador não fornece.

---

## 2. Stack e deploy

Next.js 16.3 (App Router), React, Tailwind, TypeScript. Supabase para
autenticação, Stripe para pagamento.

**O deploy é Cloudflare Workers via OpenNext, não Vercel.**

```bash
npm run dev       # localhost:3000, mata o processo da porta antes de subir
npm run deploy    # opennextjs-cloudflare build && deploy
npm run preview   # build de produção rodando local
```

**O build automático foi desconectado em 31/08/2026.** Push no GitHub é só
versionamento. Publicar é passo manual, com `npm run deploy`. Quem esquece
disso acha que subiu e não subiu.

**Bindings do Worker** (`wrangler.jsonc`): assets estáticos, `IMAGES` para o
otimizador de imagem, `WORKER_SELF_REFERENCE`, e o balde R2
`vizai-site-cache` para as páginas prontas. **Nunca** usar o balde
`vizai-downloads` para cache: é lá que mora o instalador do plugin.

---

## 3. Mapa do repositório

```
app/
  (site)/                    páginas públicas, em português na raiz
    page.tsx                 home
    download/                página de download do plugin
    treinamento/[slug]/      os 18 guias
    privacy/  terms/
    [lang]/                  as mesmas páginas em /en e /es
  app/                       área logada
    page.tsx                 dashboard: saldo, plano, atalhos
    conta/                   dados da conta
    portal/route.ts          [API] abre o Customer Portal da Stripe
  auth/
    callback/route.ts        [API] troca o code do OAuth por sessão
    signout/route.ts         [API] encerra a sessão
  checkout/                  ponte para o Checkout hospedado da Stripe
  login/  signup/  obrigado/
  sitemap.ts  robots.ts
components/
  pages/home-page.tsx        a home inteira
  ui/                        seções e blocos reutilizáveis
lib/
  routes.ts                  ÚNICA fonte da verdade de idioma na URL
  i18n.tsx                   textos das três línguas
  supabase/                  client (browser), server (RSC), middleware (cookies)
  vizai-api.ts               chamadas à API do Vizai (saldo, assinatura)
  download-manifest.ts       lê o manifest.json do R2
  analytics.ts               GA4 e Clarity, comportamento no site
  fbc.ts                     captura e persistência do clique de anúncio
  seo.ts                     títulos, descrições e metadata por idioma
  treinamento/               conteúdo dos guias em pt, en e es
  legal.ts  lang-param.ts  utils.ts
middleware.ts                idioma, sessão e clique de anúncio
next.config.ts               redirects, headers, imagens
open-next.config.ts          cache das páginas no R2
public/_headers              cache dos estáticos
```

---

## 4. Idioma na URL

`lib/routes.ts` é a única fonte da verdade, e **não** é `"use client"` de
propósito: layout, sitemap e metadata rodam no servidor e precisam das mesmas
regras que os links do navegador.

- Português na **raiz** (`/`, `/download`), inglês em `/en`, espanhol em `/es`.
- As URLs que o Google já indexou continuam valendo iguais, sem redirect na
  frente do que ranqueia.
- `HREFLANG` mapeia para `pt-BR`, `en` e `es`, usado no `<link rel="alternate">`
  e no `og:locale`.

O `middleware.ts` faz três coisas: canonicaliza o host, sugere idioma e mantém
a sessão viva. A sugestão de idioma só dispara para quem pede **exclusivamente**
idiomas que não temos, olhando apenas o primeiro da lista. Sem cabeçalho de
idioma, não faz nada: esse é o caso do Googlebot, e empurrar o buscador para
`/en` poderia tirar o português do índice.

**Moeda é escolhida pelo idioma, não pelo país.** Quem fala português vê preço
em real, more onde morar. É regra escolhida, com contrapartida conhecida, não
bug.

---

## 5. Autenticação

Supabase com Google OAuth. Três clientes em `lib/supabase/`, um para cada
contexto: browser, componentes de servidor e middleware (que renova o cookie).

Duas armadilhas que já custaram sessão de usuário:

- **O cookie do Supabase é host-only.** `www.vizairender.com` e
  `vizairender.com` são hosts diferentes, então a sessão some ao trocar de um
  para o outro. A canonicalização para o apex, no middleware, é o que segura
  isso. O Safari esconde o `www` na barra, o que torna o sintoma confuso de
  reproduzir.
- **A allowlist de Redirect URLs do Supabase é comparada com a query string
  `?next=`.** Entrada exata sem curinga mata o redirect e o login cai na home.

---

## 6. Área logada, checkout e créditos

`app/app/` mostra saldo, plano e período, lendo de `lib/vizai-api.ts`, que chama
`api.vizairender.com` com o JWT da sessão. O saldo tem duas partes: mensal (que
expira na renovação) e perpétuo (que não expira).

`app/app/portal/route.ts` abre o Customer Portal da Stripe para o usuário
trocar cartão, ver faturas ou cancelar.

`app/checkout/` valida o plano pedido contra uma lista fechada antes de
encaminhar: `starter_monthly`, `pro_monthly`, `business_monthly`, os três
`_annual`, e os pacotes `pack_mini`, `pack_basico`, `pack_pro`, `pack_empresa`.
Quem cria a sessão de checkout é o servidor, não o site.

**O número de créditos de cada plano aparece em quatro lugares deste repo**
(`lib/i18n.tsx`, `sucesso-content.tsx`, `treinamento/*.ts` e `demo/index.html`)
e em mais dois fora dele. A lista completa dos cinco pontos de atualização está
no `CLAUDE.md` do repo do plugin. Esquecer um faz o cliente ver um número no
site e receber outro.

---

## 7. Download do plugin

`lib/download-manifest.ts` lê o `manifest.json` do R2 em runtime, com ISR. Por
isso **publicar versão nova do plugin não exige deploy do site**: sobe o `.rbz`,
confere o hash servido pelo CDN e aponta o manifest. A página pega sozinha em
uns 5 minutos.

O manifest traz `latest`, `url`, `sha256`, `releasedAt` e `sizeBytes`.

---

## 8. Treinamento

15 guias em `lib/treinamento/`, com o conteúdo separado por idioma (`pt.ts`,
`en.ts`, `es.ts`) e o índice em `index.ts`. Cinco categorias: `start` (1),
`render` (5), `creative` (4), `present` (3) e `free` (2).

A ordem em `ARTICLES` define a navegação anterior/próximo e a listagem dentro
da categoria. Os guias entram no sitemap automaticamente.

**Ao remover ou fundir um guia, o redirect 301 é obrigatório**, nos três
idiomas, em `next.config.ts`. Essas URLs estão indexadas: sem o redirect, viram
404 e o Google reclama.

---

## 9. Cache e performance

Três camadas, e cada uma já foi motivo de bug:

1. **Páginas prontas no R2** (`open-next.config.ts`). Sem isso toda visita
   remontava a página, mesmo as 71 que nascem prontas no build. Levou o tempo
   até o primeiro byte de 230-260 ms para perto de 155 ms. Uma segunda camada
   regional evita ir ao R2 nas visitas seguintes.
2. **Estáticos** (`public/_headers`). As regras **se somam**: um arquivo que
   casa com dois padrões recebe os dois valores no mesmo cabeçalho. Por isso
   nada de curinga por extensão, só pasta ou caminho exato. O `immutable` é o
   que de fato dá cache: tirar quebra a performance em silêncio.
3. **Otimizador de imagem** do Worker.

Armadilhas medidas:

- **`wrangler r2 bucket info` mente**, mostra `object_count: 0` com objeto
  dentro. O que vale é o log do Worker.
- **O otimizador devolve 400 para SVG** e some com o logo.
- **As imagens dentro do iframe da demo ficam fora do otimizador** e já foram
  1 MB escondido na home.
- A home já pesou 9,22 MB de imagem e hoje pesa cerca de 1,20 MB.

---

## 10. Tracking

GTM no navegador, Stape como container de servidor (plano PRO), e a CAPI da
Meta pelo lado servidor. `lib/analytics.ts` e `lib/fbc.ts` carregam o histórico
completo em comentário e valem mais que qualquer resumo. O essencial:

- **Este repo não carrega mais a biblioteca do GA4.** Dois `gtag` do mesmo ID
  brigam pelo `server_container_url`, e foi assim que o lado servidor da CAPI
  caiu em 23/08/2026. O GA4 vem pelo GTM; o código daqui só manda `page_view`
  em navegação interna.
- **Microsoft Clarity** responde o "onde" (mapa de clique e rolagem, gravação),
  **GA4** responde o "quantos" e em que ordem, e é o único que fecha o ciclo com
  `begin_checkout` e `purchase`.
- **O `_fbc` (clique do anúncio) é gravado pelo middleware.** Um laço que
  apagava o cookie já zerou o parâmetro no Purchase, e o PageView disfarça o
  problema porque lê o `fbclid` direto da URL.
- **O servidor não envia Purchase de cartão, de propósito**, para não contar
  duas vezes. Boleto sim, porque ali o navegador não está presente na hora do
  pagamento.
- **Os números do painel da Meta não batem entre si.** Cruze sempre com o log do
  Cloud Run.
- A medição de comportamento já travou a rolagem uma vez (1032 leituras de
  layout por interação). Hoje são 6.

---

## 11. SEO

`lib/seo.ts` guarda título e descrição por idioma e por página, e monta a
metadata. `app/sitemap.ts` gera as URLs a partir de `LANGS` e `ARTICLES`, com
`lastModified`, `changeFrequency` e `priority` por tipo de página. `robots.ts`
completa.

O total sai de uma conta simples: 5 páginas fixas mais os guias, vezes 3
idiomas. Com 15 guias, são **60 URLs**. Auditado em produção com hreflang
correto entre as três línguas. O tráfego é predominantemente de marca.

Bots inflaram as métricas até 02/09/2026, quando o Bot Fight Mode foi ligado.
`curl` chegou a ser o "navegador" número 1 no GA4. **Números anteriores a essa
data estão inflados.**

---

## 12. Variáveis de ambiente

Todas públicas por natureza (prefixo `NEXT_PUBLIC_`), porque este repo não
guarda segredo nenhum:

| Variável | Para que |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` e `..._ANON_KEY` | sessão e login |
| `NEXT_PUBLIC_VIZAI_API_URL` | API do Vizai, padrão `https://api.vizairender.com` |
| `NEXT_PUBLIC_DOWNLOAD_MANIFEST_URL` | manifest do plugin no R2 |
| `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_CLARITY_ID` | medição |
| `NEXT_PUBLIC_MEASURE_LOCAL` | liga a medição em desenvolvimento |

Chave secreta da Stripe, service_role do Supabase e token da CAPI **não vivem
aqui**: são do servidor, no Secret Manager do GCP.

---

## 13. Sistemas externos

| Sistema | Papel no site |
|---|---|
| **Cloudflare Workers** | hospedagem, via OpenNext |
| **Cloudflare R2** | `vizai-site-cache` (páginas) e `vizai-downloads` (instalador) |
| **Supabase** | login com Google e sessão |
| **Stripe** | checkout hospedado e Customer Portal |
| **API do Vizai** | saldo, assinatura, criação de checkout |
| **GTM + Stape + Meta CAPI** | conversão |
| **GA4 + Clarity** | comportamento |

---

## 14. Armadilhas conhecidas

- **Safari com build de produção em localhost quebra o CSS.** Confira pelo
  `npm run dev`, não pelo preview.
- **Turbopack entrega CSS velho** ao recarregar. O sintoma é "o CSS sumiu".
  Confira pelo `curl` e, se preciso, `rm -rf .next`.
- **Push não publica.** O build automático está desconectado desde 31/08.
- **Não redirecione o Googlebot por idioma.** Ver a seção 4.
- **Guia removido precisa de 301** nos três idiomas.
- **A galeria antes/depois precisa de número par de cards**, e a IA reenquadra a
  imagem, então todo par tem que ser alinhado antes de entrar.
- **Os depoimentos da home não são de clientes reais.**
- **O iframe da demo é mock estático**: o download do bloco ali é encenação.

---

## 15. Convenções

- Commits em português, prefixo convencional (`feat:`, `fix:`, `chore:`) e
  escopo quando ajuda: `fix(site):`, `feat(tracking):`.
- Copy **sem travessão**. Vírgula, parênteses ou dois pontos.
- Comentário no código explica o porquê e o que já deu errado. Este repo usa
  isso bastante e é a melhor documentação que existe aqui: leia o comentário
  antes de "simplificar" algo que parece estranho.

---

## 16. Estado em 2026-09-05

- Site no ar na Cloudflare, com i18n nas três línguas auditado em produção.
- Página de download servindo o plugin **1.0.32**.
- **Não publicado ainda:** a fusão do guia de créditos dentro do
  primeiros-passos, com os 301 nos três idiomas. Está versionado, aguardando o
  `npm run deploy`, que sai junto com a gravação das aulas em vídeo.
- **Banner de cookies: fica como está, por decisão de 05/09.** Ele desliga o
  Clarity e os eventos de comportamento, mas não o GTM nem o Pixel. A Política
  de Privacidade descreve isso com precisão. Não tratar como pendência.
