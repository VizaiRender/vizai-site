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
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
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
