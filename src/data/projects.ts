// The projects shown on the site, in this order. Only what's listed here appears.
//
// Two kinds of entries:
//   1. A GitHub repo: just give `repo`. Name, description, language, stars and link
//      come from GitHub automatically. Add `summary` to override the description.
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
}

export const projects: Project[] = [
  { repo: "cdc-correctness-lab", kind: "open source" },
  {
    name: "Saqla",
    kind: "product, co-founded",
    summary: "A food rescue marketplace connecting shops with leftover food to people who buy it at a discount.",
    tags: ["AWS", "Payme", "Click"],
  },
  {
    name: "NavbatUz",
    kind: "product, co-founded",
    summary: "A booking platform for local services.",
  },
];
