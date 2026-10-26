/**
 * Refreshes releases.json — the release snapshot the page renders before
 * (and instead of, when GitHub's anonymous rate limit is exhausted) the
 * client-side fetch lands — and repo.json, the star count the page shows from
 * the build alone. Committed so builds work offline; run it before
 * `bun run build` to refresh (GITHUB_TOKEN optional, raises the rate limit).
 *
 *   bun run scripts/fetch-releases.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

interface Asset {
  name: string;
  browser_download_url: string;
  download_count: number;
}
interface Release {
  tag_name: string;
  prerelease: boolean;
  published_at: string | null;
  assets: Asset[];
}

const API = "https://api.github.com/repos/rokartur/BetterCmdTab";
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`fetch-releases: GitHub API ${res.status} ${await res.text()}`);
  return (await res.json()) as T;
}

const releases = await get<Release[]>(`${API}/releases?per_page=100`);
if (releases.length === 0) throw new Error("fetch-releases: no releases returned");

// Keep only the fields the page reads — the snapshot ships inside the JS bundle.
const trimmed = releases.map((r) => ({
  tag_name: r.tag_name,
  prerelease: r.prerelease,
  published_at: r.published_at,
  assets: r.assets.map((a) => ({
    name: a.name,
    browser_download_url: a.browser_download_url,
    download_count: a.download_count,
  })),
}));

const root = join(import.meta.dirname, "..");
writeFileSync(join(root, "releases.json"), `${JSON.stringify(trimmed, null, 2)}\n`);
console.log(`fetch-releases: wrote ${trimmed.length} releases (latest ${trimmed[0].tag_name})`);

const { stargazers_count: stars } = await get<{ stargazers_count: number }>(API);
writeFileSync(join(root, "repo.json"), `${JSON.stringify({ stars }, null, 2)}\n`);
console.log(`fetch-releases: wrote repo.json (${stars} stars)`);
