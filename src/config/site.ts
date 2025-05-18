import type { SiteConfig } from "@/types";

const [domain, userDomain] = [
  process.env.NEXT_PUBLIC_APP_DOMAIN!,
  process.env.NEXT_PUBLIC_USER_DOMAIN!,
];
export const siteConfig: SiteConfig = {
  name: "Comma",
  description:
    "Comma is an open source blogging platform with a minimal and beautiful page.",
  url: "https://comma.to",
  domain,
  userDomain,
  mailDomain: `mail.${domain}`,
  ogImage: "https://comma.to/_static/og.svg",
  links: {
    home: "https://comma.to/home",
    app: "https://app.comma.to",
    signup: "https://app.comma.to/signup",
    login: "https://app.comma.to/login",
    twitter: "https://x.com/arianadeliii",
    github: "https://github.com/Evernomic/comma",
    help: "mailto:hi@comma.to",
    demo: "https://arian.comma.to",
  },
} as const;
