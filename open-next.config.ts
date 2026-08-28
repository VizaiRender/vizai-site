import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

/**
 * Cache das paginas prontas.
 *
 * Sem isto, TODA visita a QUALQUER pagina fazia o servidor montar a pagina do
 * zero, mesmo as 71 que ja nascem prontas no build (home, Treinamento, termos,
 * privacidade). Dava pra ver pelo cabecalho `x-nextjs-cache: MISS`, que nunca
 * virava HIT. Medido em 2026-08-28, antes: mediana de 230 a 262 ms ate o
 * primeiro byte, com picos de ate 780 ms quando o servidor estava frio.
 *
 * Guardamos as paginas prontas num balde R2 SEPARADO (`vizai-site-cache`).
 * NUNCA usar o `vizai-downloads`: e la que mora o instalador do plugin.
 *
 * `withRegionalCache` poe uma segunda camada na frente, dentro do proprio
 * data center da Cloudflare, pra nem precisar ir no R2 nas visitas seguintes.
 * Conferido no log do servidor em producao: a primeira visita num data center
 * faz `R2IncrementalCache get` e depois `RegionalCache put to cache`; as
 * seguintes ja respondem `cached response` sem tocar no R2.
 *
 * ATENCAO ao conferir isso pelo terminal: `wrangler r2 bucket info` mostra
 * `object_count: 0` mesmo com objeto dentro (a metrica atrasa muito). Nao
 * confiar nela. O que vale e o log do Worker, com a variavel
 * NEXT_PRIVATE_DEBUG_CACHE=1 ligada temporariamente e `wrangler tail`.
 *
 * As chaves incluem o id do build, entao cada publicacao troca todas elas de
 * uma vez. Nao existe cache velho sobrevivendo a um deploy.
 *
 * O que NAO entra aqui: /app, /app/conta, /checkout, /obrigado e /auth/*. O
 * Next marca essas como dinamicas, entao elas continuam sendo montadas na hora,
 * por visita. Isso importa: sao as paginas que mostram dado de quem esta
 * logado, e guardar uma delas entregaria a conta de um cliente pra outro.
 */
export default defineCloudflareConfig({
	incrementalCache: withRegionalCache(r2IncrementalCache, {
		mode: "long-lived",
	}),
});
