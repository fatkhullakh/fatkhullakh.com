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

## Put it online (free, Cloudflare Pages)

No backend, no database, no server to pay for. The site is plain HTML files built from your markdown.

1. Create an empty GitHub repo (for example `fatkhullakh/fatkhullakh.com`) and push this folder:
   ```bash
   git remote add origin https://github.com/fatkhullakh/fatkhullakh.com.git
   git push -u origin main
   ```
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git. Pick the repo.
3. Build settings: framework preset `Astro`, build command `npm run build`, output directory `dist`. Deploy.
4. In the Pages project: Custom domains > add `fatkhullakh.com`, then `www.fatkhullakh.com`. The domain is already on Cloudflare, so DNS is set up for you.
5. Email: your domain > Email > Email Routing. Create `hello@fatkhullakh.com` and forward it to your Gmail. Free.

After that, every `git push` rebuilds the site in about a minute.

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
