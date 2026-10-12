// Helpers shared by the API endpoints in /functions (kept outside it so it is not a route).

export interface Env {
  DB: any; // Cloudflare D1 database binding
  ADMIN_KEY?: string; // secret: lets you reply as the author and delete comments
  HASH_SALT?: string; // secret: makes visitor hashes unguessable
}

export const SLUG = /^[a-z0-9][a-z0-9-]{0,119}$/;

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export function bad(message: string, status = 400): Response {
  return json({ error: message }, status);
}

// A stable, anonymous id for a visitor: hash of IP + browser + secret salt.
export async function visitorId(request: Request, env: Env): Promise<string> {
  const ip = request.headers.get("cf-connecting-ip") ?? "local";
  const ua = request.headers.get("user-agent") ?? "";
  const data = new TextEncoder().encode(`${env.HASH_SALT ?? "dev-salt"}|${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

export function isAdmin(request: Request, env: Env): boolean {
  const key = request.headers.get("x-admin-key");
  return Boolean(env.ADMIN_KEY && key && key === env.ADMIN_KEY);
}

export async function readJson(request: Request): Promise<any> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
