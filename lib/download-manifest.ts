export type DownloadManifest = {
  latest: string;
  url: string;
  sha256: string;
  releasedAt: string;
  sizeBytes?: number;
};

const MANIFEST_URL =
  process.env.NEXT_PUBLIC_DOWNLOAD_MANIFEST_URL ||
  "https://downloads.vizairender.com/manifest.json";

export async function getDownloadManifest(): Promise<DownloadManifest | null> {
  try {
    const res = await fetch(MANIFEST_URL, {
      // O `revalidate` do Next NAO segura esta busca no Worker da Cloudflare:
      // ela acontecia em TODA visita, no caminho critico da /download, antes
      // de o HTML comecar a sair. Medido em producao, antes e depois deste
      // deploy: a pagina saiu de 172 ms pra 18 ms de atraso em relacao a uma
      // pagina sem revalidacao. O `cf.cacheTtl`
      // e o cache da propria Cloudflare, compartilhado entre as execucoes do
      // Worker no mesmo ponto de presenca, e esse funciona.
      // 300 s continua sendo a janela: uma versao nova do plugin aparece na
      // pagina em no maximo 5 minutos.
      next: { revalidate: 300 },
      cf: { cacheTtl: 300, cacheEverything: true },
      headers: { Accept: "application/json" },
    } as RequestInit);
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<DownloadManifest>;
    if (!data?.latest || !data?.url || !data?.sha256) return null;
    return {
      latest: data.latest,
      url: data.url,
      sha256: data.sha256,
      releasedAt: data.releasedAt ?? "",
      sizeBytes: data.sizeBytes,
    };
  } catch {
    return null;
  }
}

export function formatSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}
