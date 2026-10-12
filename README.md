# fatkhullakh.com

My site: writing, projects, about. Built with Astro and hosted free on Cloudflare.
Posts are markdown files. Reads, likes and comments live in a small free Cloudflare database (D1).

---

## 1. Run it on your laptop

One time: install **Node.js 22 LTS** (nodejs.org) and **Git** (git-scm.com). Then, in a terminal inside this folder:

```bash
npm install
```

**For writing and design** (fast, refreshes as you type):
```bash
npm run dev
```
Open http://localhost:4321. Drafts show here with a "draft" label. Likes and comments don't load in this mode.

**To test likes and comments too** (one time setup, then just `npm run preview`):
```bash
copy .dev.vars.example .dev.vars      # Mac/Linux: cp .dev.vars.example .dev.vars
npm run db:setup:local
npm run preview
```
Open http://localhost:8788. This is a full copy of the live site with its own local database.

---

## 2. Put it online (one time, about 20 minutes)

**a. GitHub**
1. On github.com create an empty repo `fatkhullakh.com` (no README).
2. In this folder:
   ```bash
   git remote add origin https://github.com/fatkhullakh/fatkhullakh.com.git
   git branch -M main
   git push -u origin main
   ```

**b. The database**
```bash
npx wrangler login                        # opens the browser, log in to Cloudflare
npx wrangler d1 create fatkhullakh-db     # prints a database_id
```
Paste that `database_id` into `wrangler.toml` (replace `REPLACE_WITH_YOUR_DATABASE_ID`), then:
```bash
npm run db:setup:live
git add . && git commit -m "Add database id" && git push
```

**c. Cloudflare Pages**
1. Cloudflare dashboard > **Workers & Pages** > **Create application** > **Pages** tab > **Import an existing Git repository** > pick `fatkhullakh.com`.
2. Build settings: branch `main`, build command `npm run build`, output directory `dist`. **Save and Deploy**.
3. In the project: **Settings** > **Variables and Secrets** > add two, type **Secret**:
   - `ADMIN_KEY`: a long password only you know. It lets you reply as the author and delete comments.
   - `HASH_SALT`: any random text. It keeps reader ids anonymous.
4. **Deployments** > the latest one > **Retry deployment**, so the secrets apply.

**d. Your domain**
In the Pages project: **Custom domains** > **Set up a custom domain** > `fatkhullakh.com`, then again for `www.fatkhullakh.com`.

From now on, every `git push` updates the live site in about a minute.

---

## 3. Publish a new post

1. Copy `src/content/writing/interview-template.md` (or `note-template.md` for a learning note).
2. Rename it. The file name becomes the address:
   `fresha-analytics-engineer.md` becomes `fatkhullakh.com/writing/fresha-analytics-engineer`.
   Use lowercase and dashes. **Don't rename a post after publishing**, its reads, likes and comments are tied to the name.
3. Fill in the top block:
   ```yaml
   title: "Fresha, Analytics Engineer: where my SQL broke"
   description: "One sentence on what the reader learns."
   date: 2026-10-12
   tag: interviews        # interviews, notes or projects
   draft: false           # true = only visible on your laptop
   company: "Fresha"      # interview posts only, shown in a box under the title
   role: "Analytics Engineer"
   outcome: "Rejected after the SQL round"
   ```
4. Write below it in markdown, check it with `npm run dev`, then:
   ```bash
   git add .
   git commit -m "New post: Fresha interview"
   git push
   ```

No laptop? On github.com open `src/content/writing` > **Add file** > **Create new file**, paste the post, **Commit changes**.

**Images and diagrams:** draw in excalidraw.com, export PNG into `public/images/`, then in the post: `![What it shows](/images/my-diagram.png)`

**Markdown basics:** `## Heading`, `**bold**`, `*italic*`, `- list item`, `[link text](https://...)`, code blocks with three backticks and the language (` ```sql `).

---

## 4. Edit the other pages

| What | Where |
|---|---|
| Projects (which ones, in what order) | `src/data/projects.ts` |
| About page text | `src/pages/about.astro` |
| Home page text under your name | `src/pages/index.astro` |
| The rotating "I write about..." lines, email, LinkedIn, city | `src/config.ts` |
| Colors and fonts | `src/styles/global.css` |

**Projects:** only what's listed in `src/data/projects.ts` shows. For a GitHub repo one line is enough:
```ts
{ repo: "cdc-correctness-lab", kind: "open source" },
```
Name, description, language and stars come from GitHub at build time, so write a good description in the repo's "About" box on GitHub. For anything else give `name`, `kind`, `summary` and optionally `url` and `tags`. A listed repo that's private or misspelled is skipped.

**Text with a link in it:** in `.astro` files, keep the text and the link on the same line, or add `{" "}` before the link. Otherwise the space disappears and you get "contact me attfatkh@gmail.com".

---

## 5. Likes, reads and comments

- **Reads:** shown next to the date. One read per reader per post every 12 hours.
- **Like:** one per reader, tap again to undo.
- **Comments:** any name, no login. Replies are one level deep, so threads stay simple.
- **Spam protection:** a hidden trap field for bots, max 5 comments per person per 10 minutes, 2000 characters max.

**Reply as the author and moderate:** open any post once with your key in the address:
`fatkhullakh.com/writing/some-post?admin=YOUR_ADMIN_KEY`
Your browser remembers it. From then on your comments get an "author" badge and every comment shows a **delete** button (only to you). Do this only on your own devices.

**See everything in the database:** Cloudflare dashboard > **Storage & Databases** > **D1** > `fatkhullakh-db` > **Console**, for example:
```sql
SELECT slug, views FROM post_views ORDER BY views DESC;
SELECT * FROM comments ORDER BY created_at DESC LIMIT 20;
```

All of this fits in Cloudflare's free tier by a wide margin.

---

## 6. RSS

`/rss.xml` is a feed of your posts. People using a feed reader (Feedly, Inoreader) get new posts automatically. It's linked in the footer.

---

## Where things live

```
src/
  config.ts             name, links, rotating lines
  content/writing/      all posts (markdown)
  data/projects.ts      project list
  pages/                home, writing, projects, about, rss
  components/           sidebar, background, like/comments, share
  styles/global.css     colors and fonts
functions/api/          the backend: stats.ts (reads, likes), comments.ts
server/shared.ts        helpers for the backend
migrations/             database tables
wrangler.toml           Cloudflare settings and database id
```
