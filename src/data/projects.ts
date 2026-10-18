// The projects shown on the site, in this order. Only what's listed here appears.
//
// Two kinds of entries:
//   1. A GitHub repo: just give `repo`. Name, description, language, stars and link
//      come from GitHub automatically. Add `summary` to override the description.
//   Add `slug` to give a project its own page (see src/content/projects/).
//   2. Anything else (a product, a client project): give name, summary and optionally url.
//
// `kind` is the small label above the name.

export interface Project {
  repo?: string;
  name?: string;
  kind: string;
  summary?: string;
  url?: string;
  tags?: string[];
  slug?: string; // opens a page written in src/content/projects/<slug>.md
}

export const projects: Project[] = [
  { repo: "cdc-streaming-lakehouse", kind: "open source", slug: "cdc-streaming-lakehouse" },
  { repo: "cdc-correctness-lab", kind: "open source", slug: "cdc-correctness-lab" },
  { name: "Saqla", kind: "product", slug: "saqla" },
  { name: "NavbatUz", kind: "product", slug: "navbatuz" },
];
