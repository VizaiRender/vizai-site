// Entrada do Worker: repassa tudo ao Worker gerado pelo OpenNext, põe um cache
// de borda na frente do otimizador de imagem (/_next/image) e corrige o idioma
// do <html> nas páginas /en e /es (ver "Segunda tarefa", mais abaixo).
//
// Por que existe: o OpenNext converte a imagem de novo a CADA pedido que chega ao
// Worker. O navegador guarda o resultado por anos, mas a borda da Cloudflare não
// guardava nada, então toda primeira visita de cada pessoa (e todo navegador com
// cache desligado) refazia a conversão. Medido em 10/09/2026: /_next/image era 57%
// das invocações do Worker, e as duas rajadas que estouraram o limite de 10 ms de
// CPU do plano Free (06/09 e 10/09) foram inteiras nessa rota.
//
// O que entra no cache: só resposta 200 marcada `immutable`. O OpenNext só põe essa
// marca quando o arquivo de ORIGEM é imutável: public/_headers para os locais e o
// próprio downloads.vizairender.com para os remotos (conferido nos dois em 10/09).
// No navegador continua valendo a regra de sempre: TROCAR UMA ARTE EXIGE NOME NOVO
// OU `?v=N`.
//
// A chave leva o id da versão publicada, e isso não é detalhe: cada deploy começa
// com a borda vazia, igual ao cache de páginas do open-next.config.ts. Sem o id,
// arquivo apagado do public/, origem tirada do remotePatterns ou arte retirada a
// pedido de cliente continuariam saindo da borda por até 10 anos (achado da
// auditoria de 10/09). O preço é reconverter cada imagem uma vez por data center
// depois de cada deploy. Rollback volta a usar as entradas daquela versão, que são
// o conteúdo certo pra ela. Imagem apagada só no downloads.vizairender.com, sem
// deploy do site, segue na borda até o próximo deploy: pra tirar na hora,
// Caching > Purge Everything, no painel da zona.
//
// Fora a versão, a chave leva só url, w, q e os formatos que o navegador aceita.
// Parâmetro extra na URL não cria entrada nova (nem conversão nova), e o formato
// entra porque a mesma URL devolve WebP pra quem aceita e o original pra quem não.
//
// Falha do cache nunca derruba imagem: leitura ou gravação com erro vai pro log e
// o pedido segue pelo caminho normal.
//
// O cabeçalho `x-vizai-img-cache` (HIT ou MISS) existe pra conferir pelo curl, em
// produção, que o cache está de fato guardando.
//
// Segunda tarefa: o `<html lang>` das páginas em inglês e espanhol.
//
// O layout raiz do Next é um só para os três idiomas e escreve `lang="pt-BR"`
// fixo. No navegador o LanguageProvider troca para "en" ou "es" depois que a
// página carrega, mas o HTML que sai do servidor dizia português em /en e /es.
// Robô que não roda JavaScript (vários de IA) lia uma página em inglês marcada
// como português. Achado em 12/10/2026.
//
// Por que aqui e não no Next: o layout raiz não recebe o idioma da rota. Ler o
// idioma de um cabeçalho no layout tornaria todas as páginas dinâmicas (fim do
// cache de páginas prontas, e mais CPU por visita), e dar um layout raiz por
// idioma exige reorganizar todas as pastas (tentativa já descartada em 21/08).
// O HTMLRewriter da Cloudflare troca o atributo enquanto o HTML passa, sem
// guardar a página inteira na memória, a custo de cerca de 1 ms.
//
// O React não briga com a troca: o <html> tem suppressHydrationWarning, e o
// LanguageProvider grava o mesmo valor ("en", "es") ao hidratar.
//
// É .mjs de propósito: o tsconfig inclui todo .ts, e um .ts importando o Worker
// gerado faria o TypeScript do `next build` ler o bundle inteiro do servidor.

import openNextWorker from "./.open-next/worker.js";

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";

const ROTA_IMAGEM = "/_next/image";
const MARCADOR = "x-vizai-img-cache";

function chaveDaImagem(url, accept, versao) {
  const [urls, larguras, qualidades] = ["url", "w", "q"].map((nome) => url.searchParams.getAll(nome));
  // Parâmetro faltando ou repetido: o otimizador responde 400, não há o que guardar.
  if (urls.length !== 1 || larguras.length !== 1 || qualidades.length !== 1) return null;

  const chave = new URL(ROTA_IMAGEM, url.origin);
  chave.searchParams.set("versao", versao);
  chave.searchParams.set("url", urls[0]);
  chave.searchParams.set("w", larguras[0]);
  chave.searchParams.set("q", qualidades[0]);
  // O OpenNext escolhe o formato de saída olhando se o `Accept` contém o tipo.
  const formatos = ["image/avif", "image/webp"].filter((tipo) => accept.includes(tipo));
  chave.searchParams.set("formato", formatos.join(",") || "original");
  return new Request(chave.toString());
}

// Mesmo esquema de lib/routes.ts: português na raiz, inglês e espanhol com
// prefixo. Os valores são os do HREFLANG de lá, que o LanguageProvider também usa.
const IDIOMA_DO_PREFIXO = { en: "en", es: "es" };

function comIdiomaCerto(request, url, response) {
  if (request.method !== "GET") return response;
  const idioma = IDIOMA_DO_PREFIXO[url.pathname.split("/")[1]];
  if (!idioma) return response;
  // Só HTML: a navegação interna do Next pede a mesma URL e recebe text/x-component.
  if (!(response.headers.get("Content-Type") ?? "").includes("text/html")) return response;
  try {
    return new HTMLRewriter()
      .on("html", {
        element(el) {
          el.setAttribute("lang", idioma);
        },
      })
      .transform(response);
  } catch (erro) {
    // Página com o idioma errado é melhor que página fora do ar.
    console.error("idioma do <html>: troca falhou, seguindo com o original", erro);
    return response;
  }
}

function marcar(response, estado) {
  const copia = new Response(response.body, response);
  copia.headers.set(MARCADOR, estado);
  return copia;
}

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== "GET" || url.pathname !== ROTA_IMAGEM) {
      const response = await openNextWorker.fetch(request, env, ctx);
      return comIdiomaCerto(request, url, response);
    }

    // Sem o id da versão não dá pra garantir que nada sobreviva a um deploy, então
    // não guarda nada. O log avisa, porque perder o cache em silêncio é pior.
    const versao = env.CF_VERSION_METADATA?.id;
    if (!versao) {
      console.error("cache de imagem: binding CF_VERSION_METADATA ausente, seguindo sem cache");
      return openNextWorker.fetch(request, env, ctx);
    }

    const chave = chaveDaImagem(url, request.headers.get("Accept") ?? "", versao);
    if (!chave) return openNextWorker.fetch(request, env, ctx);

    const cache = caches.default;
    try {
      const guardada = await cache.match(chave);
      if (guardada) return marcar(guardada, "HIT");
    } catch (erro) {
      console.error("cache de imagem: leitura falhou", erro);
    }

    const response = await openNextWorker.fetch(request, env, ctx);
    const cacheControl = response.headers.get("Cache-Control") ?? "";
    if (response.status !== 200 || !cacheControl.includes("immutable")) {
      return response;
    }

    ctx.waitUntil(
      cache.put(chave, response.clone()).catch((erro) => {
        console.error("cache de imagem: gravação falhou", erro);
      }),
    );
    return marcar(response, "MISS");
  },
};

export default worker;
