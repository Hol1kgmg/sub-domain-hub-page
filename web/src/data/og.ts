const OG_IMAGE_RE = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i;
// content 属性が property より前に来るサイトもあるため逆順も見る
const OG_IMAGE_RE_REVERSED = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i;

export function parseOgImage(html: string, baseUrl: string): string | undefined {
  const raw = OG_IMAGE_RE.exec(html)?.[1] ?? OG_IMAGE_RE_REVERSED.exec(html)?.[1];
  if (!raw) return undefined;
  try {
    return new URL(raw, baseUrl).href;
  } catch {
    return undefined;
  }
}

// 1 サイト落ちているだけでビルド全体を失敗させないため、失敗は undefined に潰す
export async function fetchOgImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return undefined;
    return parseOgImage(await res.text(), url);
  } catch {
    return undefined;
  }
}
