// GET  /api/stats?slug=...           -> { views, likes, liked }
// POST /api/stats { slug, action }   -> action: "view" | "like" | "unlike"
import { type Env, SLUG, json, bad, visitorId, readJson } from "../../server/shared";

async function stats(env: Env, slug: string, voter: string) {
  const v = await env.DB.prepare("SELECT views FROM post_views WHERE slug = ?").bind(slug).first();
  const l = await env.DB.prepare("SELECT COUNT(*) AS n FROM post_likes WHERE slug = ?").bind(slug).first();
  const mine = await env.DB.prepare("SELECT 1 AS x FROM post_likes WHERE slug = ? AND voter = ?").bind(slug, voter).first();
  return { views: v?.views ?? 0, likes: l?.n ?? 0, liked: Boolean(mine) };
}

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!SLUG.test(slug)) return bad("Unknown post.");
  return json(await stats(env, slug, await visitorId(request, env)));
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const body = await readJson(request);
  const slug = String(body?.slug ?? "");
  const action = String(body?.action ?? "");
  if (!SLUG.test(slug)) return bad("Unknown post.");
  const voter = await visitorId(request, env);

  if (action === "view") {
    await env.DB.prepare(
      "INSERT INTO post_views (slug, views) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET views = views + 1",
    ).bind(slug).run();
  } else if (action === "like") {
    await env.DB.prepare("INSERT OR IGNORE INTO post_likes (slug, voter) VALUES (?, ?)").bind(slug, voter).run();
  } else if (action === "unlike") {
    await env.DB.prepare("DELETE FROM post_likes WHERE slug = ? AND voter = ?").bind(slug, voter).run();
  } else {
    return bad("Unknown action.");
  }
  return json(await stats(env, slug, voter));
};
