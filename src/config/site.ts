import type { SiteConfig } from "@/types";

const [domain, userDomain] = [
  process.env.NEXT_PUBLIC_APP_DOMAIN!,
  process.env.NEXT_PUBLIC_USER_DOMAIN!,
];
export const siteConfig: SiteConfig = {
  name: "Comma",
  description:
    "Comma.to is a free site creator and homepage builder that lets you launch your personal website in minutes. Clean, fast and open source.",
  url: "https://comma.to",
  domain,
  userDomain,
  mailDomain: `mail.${domain}`,
  ogImage: "https://comma.to/_static/og.png",
  gtmId: "AW-17396745022",
  supportEmail: "hi@comma.to",
  links: {
    home: "https://comma.to/home",
    app: "https://app.comma.to",
    signup: "https://app.comma.to/signup",
    login: "https://app.comma.to/login",
    twitter: "https://x.com/arianadeliii",
    github: "https://github.com/Evernomic/comma",
    help: "mailto:hi@comma.to",
    demo: "https://arian.comma.to",
    affiliates: "https://billing.comma.to/affiliates",
  },
} as const;
