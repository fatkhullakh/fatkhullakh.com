import { readFileSync } from "node:fs";
import { getEntry } from "astro:content";
import { SITE } from "../config";
import { projects, type Project } from "../data/projects";

interface Repo {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
}

export interface ResolvedProject {
  name: string;
  kind: string;
  summary: string;
  url: string;
  tags: string[];
  stars: number;
  detail: boolean; // true when the card opens its own page
}

// Runs at build time, so GitHub details refresh every time the site deploys.
// Optional: set GITHUB_TOKEN in Cloudflare's environment variables to avoid rate limits.
async function fetchRepos(): Promise<Map<string, Repo> | null> {
  try {
    let raw: any[];
    if (process.env.MOCK_REPOS) {
      raw = JSON.parse(readFileSync(process.env.MOCK_REPOS, "utf8"));
    } else {
      const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
      if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      const res = await fetch(`https://api.github.com/users/${SITE.github}/repos?per_page=100`, { headers });
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      raw = await res.json();
    }
    return new Map(
      raw.map((r) => [
        r.name.toLowerCase(),
        {
          name: r.name,
          description: r.description ?? "",
          url: r.html_url,
          homepage: r.homepage ?? "",
          language: r.language ?? "",
          stars: r.stargazers_count ?? 0,
        },
      ]),
    );
  } catch (err) {
    console.warn(`[projects] Could not load GitHub repos, using what's in projects.ts: ${err}`);
    return null;
  }
}

let cache: Promise<ResolvedProject[]> | undefined;

export function getProjects(): Promise<ResolvedProject[]> {
  cache ??= resolve(projects);
  return cache;
}

async function resolve(list: Project[]): Promise<ResolvedProject[]> {
  const needsGithub = list.some((p) => p.repo);
  const repos = needsGithub ? await fetchRepos() : null;
  const out: ResolvedProject[] = [];
  for (const p of list) {
    // A project with a `slug` has its own page, written in src/content/projects/<slug>.md
    const md = p.slug ? await getEntry("projects", p.slug) : undefined;
    const page = md ? `/projects/${p.slug}` : "";
    if (!p.repo) {
      out.push({
        name: p.name ?? md?.data.title ?? "",
        kind: p.kind,
        summary: p.summary ?? md?.data.summary ?? "",
        url: page || p.url || "",
        tags: p.tags ?? md?.data.stack.slice(0, 3) ?? [],
        stars: 0,
        detail: Boolean(md),
      });
      continue;
    }
    const r = repos?.get(p.repo.toLowerCase());
    if (repos && !r && !md) {
      console.warn(`[projects] Repo "${p.repo}" not found on GitHub (private or misspelled), skipping it.`);
      continue;
    }
    out.push({
      name: p.name ?? md?.data.title ?? r?.name ?? p.repo,
      kind: p.kind,
      summary: p.summary ?? md?.data.summary ?? r?.description ?? "",
      url: page || p.url || r?.url || `https://github.com/${SITE.github}/${p.repo}`,
      tags: p.tags ?? md?.data.stack.slice(0, 3) ?? (r?.language ? [r.language] : []),
      stars: r?.stars ?? 0,
      detail: Boolean(md),
    });
  }
  return out;
}
