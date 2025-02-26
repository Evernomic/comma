import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Comma",
  description:
    "Comma is an open source blogging platform with a minimal and beautiful page.",
  url: "https://comma.to",
  ogImage: "https://comma.to/_static/og.png",
  links: {
    home: "https://comma.to/home",
    app: "https://app.comma.to",
    signup: "https://app.comma.to/signup",
    login: "https://app.comma.to/login",
    twitter: "https://x.com/arianadeliii",
    github: "https://github.com/ArianAdeli/comma",
    help: "mailto:help@comma.to",
    demo: "https://arian.comma.to",
  },
} as const;
