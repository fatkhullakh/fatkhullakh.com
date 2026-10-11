// Edit this file to change your name, bio and links everywhere on the site.

export const SITE = {
  name: "Fatih",
  fullName: "Fatih", // TODO: add your surname exactly as you want it shown
  url: "https://fatkhullakh.com",
  title: "Fatih",
  description:
    "Data engineer in Gdańsk. Notes on what I learn, and honest write-ups of the interviews I go through.",
  location: "Gdańsk, sometimes Tashkent",
  email: "", // TODO: public contact email, leave empty to hide
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
