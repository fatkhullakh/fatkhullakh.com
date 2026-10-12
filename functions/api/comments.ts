// GET    /api/comments?slug=...                         -> { comments: [...] }
// POST   /api/comments { slug, name, body, parentId? }  -> { comment }
// DELETE /api/comments?id=...   (admin only)            -> { ok: true }
import { type Env, SLUG, json, bad, visitorId, isAdmin, readJson } from "../../server/shared";

const MAX_NAME = 40;
const MAX_BODY = 2000;
const RATE_LIMIT = 5; // comments per visitor per 10 minutes

function shape(r: any) {
  return {
    id: r.id,
    parentId: r.parent_id,
    name: r.name,
    body: r.body,
    isAuthor: Boolean(r.is_author),
    createdAt: String(r.created_at).replace(" ", "T") + "Z",
  };
}

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!SLUG.test(slug)) return bad("Unknown post.");
  const { results } = await env.DB.prepare(
    "SELECT id, parent_id, name, body, is_author, created_at FROM comments WHERE slug = ? ORDER BY created_at ASC, id ASC",
  ).bind(slug).all();
  return json({ comments: (results ?? []).map(shape) });
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const b = await readJson(request);
  if (!b) return bad("Invalid request.");
  // honeypot: real people never fill the hidden "website" field
  if (b.website) return json({ comment: null });

  const slug = String(b.slug ?? "");
  const name = String(b.name ?? "").trim().replace(/\s+/g, " ");
  const body = String(b.body ?? "").trim().replace(/\n{3,}/g, "\n\n");
  let parentId: number | null = b.parentId ? Number(b.parentId) : null;

  if (!SLUG.test(slug)) return bad("Unknown post.");
  if (!name) return bad("Add a name, any name works.");
  if (name.length > MAX_NAME) return bad(`Keep the name under ${MAX_NAME} characters.`);
  if (!body) return bad("The comment is empty.");
  if (body.length > MAX_BODY) return bad(`Keep comments under ${MAX_BODY} characters.`);

  const voter = await visitorId(request, env);
  const admin = isAdmin(request, env);

  if (!admin) {
    const recent = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM comments WHERE voter = ? AND created_at > datetime('now', '-10 minutes')",
    ).bind(voter).first();
    if ((recent?.n ?? 0) >= RATE_LIMIT) return bad("Too many comments in a row. Try again in a few minutes.", 429);
  }

  if (parentId !== null) {
    const parent = await env.DB.prepare("SELECT id, parent_id, slug FROM comments WHERE id = ?").bind(parentId).first();
    if (!parent || parent.slug !== slug) return bad("The comment you replied to was removed.");
    // keep threads one level deep: a reply to a reply joins the same thread
    parentId = parent.parent_id ?? parent.id;
  }

  const row = await env.DB.prepare(
    "INSERT INTO comments (slug, parent_id, name, body, is_author, voter) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, parent_id, name, body, is_author, created_at",
  ).bind(slug, parentId, name, body, admin ? 1 : 0, voter).first();
  return json({ comment: shape(row) }, 201);
};

export const onRequestDelete = async ({ request, env }: { request: Request; env: Env }) => {
  if (!isAdmin(request, env)) return bad("Not allowed.", 403);
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return bad("Missing id.");
  await env.DB.prepare("DELETE FROM comments WHERE id = ? OR parent_id = ?").bind(id, id).run();
  return json({ ok: true });
};
