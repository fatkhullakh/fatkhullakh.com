# fatkhullakh.com

My personal site: writing, projects, about. Built with Astro. No backend, no database. Every post is one markdown file.

## 1. Run it on your laptop (one time setup)

1. Install **Node.js 22 LTS** from nodejs.org and **Git** from git-scm.com.
2. Unzip this folder, open a terminal inside it, and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:4321. Every time you save a file, the page refreshes by itself.

Drafts (`draft: true`) show up here with a "draft" label. They never appear on the live site.

## 2. Put it online (one time setup, about 15 minutes)

**GitHub**
1. On github.com, create a new empty repository called `fatkhullakh.com`. No README, no .gitignore.
2. In the terminal, inside this folder:
   ```bash
   git remote add origin https://github.com/fatkhullakh/fatkhullakh.com.git
   git branch -M main
   git push -u origin main
   ```

**Cloudflare Pages**
3. Cloudflare dashboard > **Workers & Pages** > **Create application** > **Pages** tab > **Import an existing Git repository**.
4. Connect GitHub, pick the `fatkhullakh.com` repo.
5. Build settings: production branch `main`, build command `npm run build`, build output directory `dist`.
6. **Save and Deploy**. After a minute it's live at `something.pages.dev`.

**Your domain**
7. In the Pages project: **Custom domains** > **Set up a custom domain** > `fatkhullakh.com`. Repeat for `www.fatkhullakh.com`. The domain is already on Cloudflare, so it configures DNS for you.

From now on, every push to `main` updates the live site automatically.

## 3. Publish a new post

**Option A, from your laptop**
1. Copy `src/content/writing/interview-template.md` (or `note-template.md`).
2. Rename it. The file name becomes the URL:
   `fresha-analytics-engineer.md` becomes `fatkhullakh.com/writing/fresha-analytics-engineer`.
   Lowercase, words joined with `-`.
3. Edit the top block:
   ```yaml
   title: "Fresha, Analytics Engineer: where my SQL broke"
   description: "One sentence on what the reader learns."
   date: 2026-10-12
   tag: interviews        # interviews, notes or projects
   draft: false           # true = only visible on your laptop
   company: "Fresha"      # interview posts only
   role: "Analytics Engineer"
   outcome: "Rejected after the SQL round"
   ```
4. Write the post below it in markdown. Check it at localhost:4321.
5. Publish:
   ```bash
   git add .
   git commit -m "New post: Fresha interview"
   git push
   ```

**Option B, no laptop setup needed**
Go to the repo on github.com > `src/content/writing` > **Add file** > **Create new file**. Paste the post, click **Commit changes**. The site updates in about a minute.

**Images and diagrams**
Draw in excalidraw.com, export as PNG, put it in `public/images/`, then in the post:
`![What the diagram shows](/images/my-diagram.png)`

**Markdown basics**
`## Heading`, `**bold**`, `*italic*`, `- list item`, `[link text](https://...)`, and code blocks with three backticks plus the language (` ```sql `).

## Things to edit once

- `src/config.ts`: LinkedIn link, the rotating "I write about..." lines, giscus IDs
- `src/data/projects.ts`: which projects show, in which order
- `src/pages/about.astro`: the about text

## Projects

Only what's listed in `src/data/projects.ts` appears, in that order.
For a GitHub repo, one line is enough: `{ repo: "cdc-correctness-lab", kind: "open source" }`.
The name, description, language, stars and link come from GitHub when the site builds, so give the repo a good description on GitHub (the "About" box on the repo page).
If a listed repo is private or misspelled, it's skipped and the build tells you.
If builds ever fail to reach GitHub, add a `GITHUB_TOKEN` environment variable in the Cloudflare Pages settings.

## Likes and comments (giscus)

Likes and comments under each post are stored as GitHub Discussions in your site repo, for free. Readers sign in with GitHub to react or comment, which suits a developer audience and keeps spam away.

1. The `fatkhullakh.com` repo must be public. Repo > Settings > General > Features: tick **Discussions**.
2. Install the giscus app on that repo: github.com/apps/giscus > Install > only select repositories > `fatkhullakh.com`.
3. Repo > Discussions > categories (pencil icon) > new category called `Comments`, format **Announcement** (so only giscus can start threads).
4. Open giscus.app, type `fatkhullakh/fatkhullakh.com` in the repository box, pick the `Comments` category.
5. In the script it generates, copy `data-repo-id` and `data-category-id` into `giscus` in `src/config.ts`. Push.

Each post then shows reactions (the likes) and a comment box. Until the IDs are filled in, that section stays hidden.

## RSS

`/rss.xml` is a feed of your posts. People who use a feed reader (Feedly, Inoreader) can follow the blog and get new posts automatically. It's linked quietly in the footer.

## Where things live

```
src/
  config.ts            name, links, rotating lines
  content/writing/     all posts (markdown)
  data/projects.ts     project list
  pages/               home, writing, projects, about, rss
  components/          sidebar, theme switch, lists
  styles/global.css    colors (dark and light) and fonts
```

You also get `/rss.xml` and a sitemap for Google automatically.
