import { readFileSync } from "node:fs";
import { SITE } from "../config";

export interface Repo {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
  pushedAt: Date;
}

// Runs at build time, so the list refreshes every time the site deploys.
// If GitHub can't be reached, the page still builds and just skips the list.
// Optional: set GITHUB_TOKEN in Cloudflare's environment variables to avoid rate limits.
export async function getRepos(): Promise<Repo[]> {
  let raw: any[] = [];
  try {
    if (process.env.MOCK_REPOS) {
      raw = JSON.parse(readFileSync(process.env.MOCK_REPOS, "utf8"));
    } else {
      const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
      if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      const res = await fetch(
        `https://api.github.com/users/${SITE.github}/repos?per_page=100&sort=pushed`,
        { headers },
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      raw = await res.json();
    }
  } catch (err) {
    console.warn(`[projects] Could not load GitHub repos: ${err}`);
    return [];
  }

  return raw
    .filter((r) => !r.fork && !r.archived && !r.private && !SITE.hiddenRepos.includes(r.name))
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      url: r.html_url,
      homepage: r.homepage ?? "",
      language: r.language ?? "",
      stars: r.stargazers_count ?? 0,
      pushedAt: new Date(r.pushed_at),
    }))
    .sort((a, b) => b.pushedAt.valueOf() - a.pushedAt.valueOf());
}
