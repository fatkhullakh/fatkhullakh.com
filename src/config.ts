// Edit this file to change your name, bio and links everywhere on the site.

export const SITE = {
  name: "Fatz",
  fullName: "Fatkhullakh Turakhonov",
  url: "https://fatkhullakh.com",
  title: "Fatkhullakh Turakhonov",
  description:
    "Data engineer in Gdańsk. Notes on what I learn, and honest write-ups of the interviews I go through.",
  location: "Based in Gdańsk, Poland. Originally from Uzbekistan.",
  email: "hello@fatkhullakh.com", // turn on Cloudflare Email Routing so this forwards to your inbox
  links: {
    github: "https://github.com/fatkhullakh",
    linkedin: "", // TODO: your LinkedIn URL
    telegram: "", // optional, for later
  },
  resume: "/resume.pdf", // put resume.pdf in /public, or set to "" to hide
};

export const TAGS = {
  interviews: "Interviews",
  notes: "Notes",
  projects: "Projects",
} as const;

export type Tag = keyof typeof TAGS;
