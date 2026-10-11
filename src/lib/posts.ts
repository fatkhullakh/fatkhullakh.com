import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"writing">;

// Drafts show up while you run `npm run dev`, never on the live site.
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "writing",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function groupByYear(posts: Post[]): [number, Post[]][] {
  const map = new Map<number, Post[]>();
  for (const p of posts) {
    const y = p.data.date.getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export function formatDate(d: Date, withYear = true): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

export function readingTime(body = ""): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 230));
}

export function tagCounts(posts: Post[]): Record<string, number> {
  const counts: Record<string, number> = { all: posts.length };
  for (const p of posts) counts[p.data.tag] = (counts[p.data.tag] ?? 0) + 1;
  return counts;
}
