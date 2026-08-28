// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// Sobre o `incrementalCache: r2IncrementalCache` do comentario acima:
	// foi tentado em 2026-08-27 e revertido, mas SEM CONCLUSAO — o teste era
	// invalido (subi a versao com `wrangler versions upload`, que NAO
	// reconstroi o projeto, entao a configuracao nova nunca chegou a rodar).
	// Ou seja: nao se sabe se ajuda ou nao. Se for tentar, use `npm run
	// deploy` ou `npm run preview`, que constroem de verdade.
	// O que RESOLVEU o problema que motivou aquilo (a /download perdia ~170 ms
	// buscando o manifesto do plugin no servidor) foi `cf: { cacheTtl }` na
	// propria chamada fetch, em lib/download-manifest.ts. Medido em producao,
	// antes e depois do deploy: 172 ms -> 18 ms.
});
