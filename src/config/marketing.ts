import type { MarketingConfig } from "@/types";
import { siteConfig } from "./site";
import { freePlan, proPlan } from "./subscriptions";

export const marketingConfig: MarketingConfig = {
  headline: `Create a personal website to showcase\nwho you are in 5 minutes.`,
  cta: "Show the world who you are\nin just 5 minutes.",
  features: [
    {
      title: "Content editor",
      description:
        "Leverage a rich text editor like Notion for a streamlined blogging experience.",
      icon: "squarePen",
      image: "/_static/previews/editor",
    },
    {
      title: "Collect emails",
      description:
        "Build your email list by collecting subscriber emails for newsletters.",
      icon: "mail",
      image: "/_static/previews/newsletter",
    },
    {
      title: "Themes",
      description:
        "Pick a theme you love and give your profile a fresh, beautiful new look!",
      icon: "swatchBook",
      image: "/_static/previews/themes",
    },
    {
      title: "Custom domain",
      description: "Connect your own domain or subdomain to your webste.",
      icon: "globe",
      image: "/_static/previews/domain",
    },
    {
      title: "Work experience",
      description:
        "Showcase your past roles, responsibilities, and achievements to highlight your professional journey.",
      icon: "briefCase",
      image: "/_static/previews/work",
    },
    {
      title: "Analytics",
      description: "Understand your audience better with detailed analytics.",
      icon: "areaChart",
      image: "/_static/previews/analytics",
    },
    {
      title: "SEO",
      description: "Optimize your page with customizable Open Graph settings.",
      icon: "search",
      image: "/_static/previews/seo",
    },
    {
      title: "Explore",
      description:
        "Want to get noticed? Show off your profile on the Explore page and reach more people!",
      icon: "search",
      image: "/_static/previews/explore",
    },
    {
      title: "Callouts",
      description:
        "Create and share your callout to connect with the right people — whether you're hiring, job hunting, seeking partners, or more.",
      icon: "megaPhone",
      image: "/_static/previews/callouts",
    },
  ],
  previews: [
    {
      title: "Resume",
      description:
        "A minimal LinkedIn alternative to showcase your work, projects, articles and more.",
      src: "/_static/previews/resume",
    },
    {
      title: "Link in bio",
      description:
        "A place to showcase all your important links in style. Your bio deserves better.",
      src: "/_static/previews/link-in-bio",
    },
    {
      title: "Freestyle",
      description:
        "Feeling creative? Use our editor and widgets to craft your own way to showcase who you are.",
      src: "/_static/previews/freestyle",
    },
  ],
  plans: [freePlan, proPlan],
  footerSections: [
    {
      name: "Product",
      links: [
        {
          name: "Themes",
          href: "/home#themes",
        },
        {
          name: "Features",
          href: "/home#features",
        },
        {
          name: "Pricing",
          href: "/home#pricing",
        },
        {
          name: "Changelog",
          href: "/changelog",
        },
      ],
    },
    {
      name: "Legal",
      links: [
        {
          name: "Privacy Policy",
          href: "/privacy",
        },
        {
          name: "Terms of Service",
          href: "/terms",
        },
      ],
    },
    {
      name: "Connect",
      links: [
        {
          name: "Affiliates",
          href: siteConfig.links.affiliates,
        },
        {
          name: "Support",
          href: siteConfig.links.help,
        },

        {
          name: "Github",
          href: siteConfig.links.github,
        },
        {
          name: "Twitter",
          href: siteConfig.links.twitter,
        },
      ],
    },
  ],
} as const;
