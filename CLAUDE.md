@AGENTS.md

# Vizai (site)

Contexto do projeto para qualquer agente de IA que trabalhe neste repositório.
Última verificação contra o código: **2026-09-05**.

## O que é

Site do Vizai, um plugin de SketchUp que renderiza o modelo 3D com IA. Este repo
é só a parte web: landing, checkout, download do plugin, área do assinante e a
seção de Treinamento. O plugin e o servidor de API vivem no repo
`VizaiRender/vizai-plugin`, e o `CLAUDE.md` de lá descreve o produto inteiro,
créditos e planos.

O site **não** debita crédito nem concede crédito de boas-vindas. Isso é
exclusivo do plugin, por decisão de anti-abuso.

## Stack e deploy

Next.js 16.3 (App Router), Tailwind, Supabase para autenticação, Stripe para
pagamento.

**O deploy é Cloudflare Workers via OpenNext, não Vercel.** O README na raiz é o
boilerplate do create-next-app e está errado nesse ponto. O comando é:

```bash
npm run deploy    # opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

**O build automático foi desconectado em 31/08/2026.** Push no GitHub é só
versionamento: publicar é passo manual, com o comando acima.

Bindings do Worker (`wrangler.jsonc`): assets estáticos, `IMAGES` para o
otimizador, e o balde R2 `vizai-site-cache` para as páginas prontas. Nunca usar o
balde `vizai-downloads` para cache: é lá que mora o instalador do plugin.

## Idioma nas URLs

`lib/routes.ts` é a única fonte da verdade. Português na raiz, inglês em `/en`,
espanhol em `/es`. Layout, sitemap, metadata e os links do navegador precisam
seguir as mesmas regras, por isso o arquivo não é `"use client"`.

O `middleware.ts` só sugere idioma para quem pede exclusivamente um idioma que o
site não tem, e nunca redireciona o Googlebot (que rastreia sem cabeçalho de
idioma). Empurrar o buscador para `/en` tiraria o português do índice.

Moeda hoje é escolhida pelo idioma, não pelo país. Quem fala português vê preço
em real, more onde morar. É regra escolhida, não bug.

## Autenticação

Supabase com Google OAuth (`lib/supabase/`, `app/auth/callback/route.ts`).

Duas armadilhas que já custaram sessão de usuário:

- O cookie do Supabase é **host-only**. `www.vizairender.com` e
  `vizairender.com` são hosts diferentes, então a sessão some ao trocar de um
  para o outro. A canonicalização para o apex é o que segura isso, e o Safari
  esconde o `www` na barra, o que torna o sintoma confuso de reproduzir.
- A allowlist de Redirect URLs do Supabase é comparada **com** a query string
  `?next=`. Entrada exata sem curinga mata o redirect e o login cai na home.

## Download do plugin

`lib/download-manifest.ts` lê o `manifest.json` do R2 em runtime, com ISR. Por
isso publicar versão nova do plugin **não exige deploy do site**: subir o `.rbz`,
conferir o hash servido pelo CDN e só então apontar o manifest.

## Tracking

GTM no navegador mais Stape (plano PRO) mais a CAPI da Meta pelo lado servidor.
`lib/analytics.ts` e `lib/fbc.ts` têm o histórico completo em comentário, e
valem mais do que qualquer resumo aqui. O essencial:

- Este arquivo **não** carrega mais a biblioteca do GA4. Dois `gtag` do mesmo ID
  brigam pelo `server_container_url` e isso derrubou o lado servidor da CAPI em
  23/08/2026.
- O `_fbc` (clique do anúncio) é gravado pelo middleware. Um laço que apagava o
  cookie já zerou o parâmetro no Purchase, e o PageView disfarça o problema
  porque lê o `fbclid` direto da URL.
- O servidor **não** envia Purchase de cartão de propósito, para não contar duas
  vezes. Boleto sim, porque no boleto o navegador não está lá na hora do pagamento.
- Os números do painel da Meta não batem entre si. Cruze sempre com o log do
  Cloud Run.

## Armadilhas conhecidas

- **Safari com build de produção em localhost quebra o CSS.** Confira pelo
  `npm run dev`, não pelo preview.
- **Turbopack entrega CSS velho** ao recarregar. O sintoma é "o CSS sumiu".
  Confira pelo `curl` e, se preciso, `rm -rf .next`.
- **`immutable` no `public/_headers` é o que dá cache.** Tirar quebra a
  performance em silêncio. As regras do arquivo se somam, então nada de curinga
  por extensão: só pasta ou caminho exato.
- **`wrangler r2 bucket info` mente**, mostra `object_count: 0` com objeto
  dentro. O que vale é o log do Worker.
- **As imagens dentro do iframe da demo ficam fora do otimizador** e já foram
  1 MB escondido na home.
- **O otimizador devolve 400 para SVG** e some com o logo.
- Números de crédito de plano aparecem em `lib/i18n.tsx`, no conteúdo de
  sucesso, no Treinamento e na demo. Mudar plano exige mexer nos cinco lugares
  listados no `CLAUDE.md` do repo do plugin, incluindo a descrição dos produtos
  na Stripe.

## Convenções

- Commits em português, com prefixo (`feat:`, `fix:`, `chore:`) e escopo quando
  ajuda: `fix(site):`, `feat(tracking):`.
- Copy **sem travessão**. Use vírgula, parênteses ou dois pontos.
- Comentário no código explica o porquê e o que já deu errado. Este repo usa isso
  bastante e é a melhor documentação que existe aqui: leia o comentário antes de
  "simplificar" algo que parece estranho.
