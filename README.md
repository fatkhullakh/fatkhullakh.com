# fatkhullakh.com

Personal site and blog. Built with Astro, dark theme, no database. Every post is a markdown file.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:4321. Drafts (`draft: true`) show here with a "draft" label but never on the live site.

## Write a post

1. Copy `src/content/writing/interview-template.md` (or `note-template.md`).
2. Rename it. The file name becomes the URL: `fresha-analytics-engineer.md` becomes `/writing/fresha-analytics-engineer`.
3. Fill in the top block:
   - `tag`: `interviews`, `notes` or `projects`
   - `company`, `role`, `outcome`: only for interview posts, shown as a small box under the title
   - `draft: false` when it's ready to go live
4. Push to GitHub. The site rebuilds by itself.

Images: put them in `public/images/` and use `![alt text](/images/file.png)`.

## Things to edit once

- `src/config.ts`: your surname, LinkedIn, email, resume link
- `src/data/projects.ts`: project list and links
- `src/pages/about.astro`: rewrite the about text in your own words
- Put your CV in `public/resume.pdf`, or set `resume: ""` in the config to hide the link

## Put it online (free)

1. Create a GitHub repo and push this folder:
   ```bash
   git remote add origin https://github.com/fatkhullakh/fatkhullakh.com.git
   git push -u origin main
   ```
2. Go to vercel.com, sign in with GitHub, "Add New Project", pick the repo. It detects Astro on its own. Click Deploy.
3. In the Vercel project: Settings > Domains > add `fatkhullakh.com` and `www.fatkhullakh.com`. Vercel shows the DNS records to add at the place you bought the domain. Usually an `A` record for `@` and a `CNAME` for `www`.

Cloudflare Pages or Netlify work the same way if you prefer them.

## Structure

```
src/
  config.ts            name, bio, links
  content/writing/     all posts (markdown)
  data/projects.ts     project list
  pages/               home, writing, projects, about, RSS
  components/          header, footer, lists
  styles/global.css    colors and fonts
```

You also get `/rss.xml` and a sitemap automatically.
