// Edit this file to change your name, bio and links everywhere on the site.

export const SITE = {
  brand: "fatkhullakh", // shown top left, lowercase on purpose
  name: "Fatkhullakh",
  nickname: "Fatz",
  fullName: "Fatkhullakh Turakhonov",
  url: "https://fatkhullakh.com",
  title: "Fatkhullakh Turakhonov",
  description:
    "Data engineer in Gdańsk. Notes on what I learn, and honest write-ups of the interviews I go through.",
  city: "Gdańsk",
  country: "Poland",
  timezone: "Europe/Warsaw",
  email: "hello@fatkhullakh.com", // turn on Cloudflare Email Routing so this forwards to your inbox
  links: {
    github: "https://github.com/fatkhullakh",
    linkedin: "", // TODO: your LinkedIn URL, leave empty to hide
  },
  resume: "/resume.pdf", // put resume.pdf in /public, or set to "" to hide
  // The rotating line on the home page: "I write about ..."
  typing: [
    "every interview I go through.",
    "what I learn about data engineering.",
    "pipelines that break, and why.",
  ],
};

export const TAGS = {
  interviews: "Interviews",
  notes: "Notes",
  projects: "Projects",
} as const;

export type Tag = keyof typeof TAGS;
