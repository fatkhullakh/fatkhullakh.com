import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://fatkhullakh.com",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark-dimmed", wrap: false },
  },
});
