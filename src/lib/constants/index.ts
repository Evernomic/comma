import { siteConfig } from "@/config/site";
import type { LinkInBioLinkType, SelectOption } from "@/types";
import type {
  CalloutCategory,
  PageVisibility,
  UserPageTheme,
} from "@prisma/client";
import { HowTo, Organization } from "schema-dts";
import type { SWRConfiguration } from "swr";
import { countries } from "./countries";

export const swrOptions: SWRConfiguration = {
  revalidateOnFocus: false,
};

export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
);

export const URLRegex = new RegExp(/^https?:\/\/.*/);
export const DateRegex = new RegExp(
  /^(19\d{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
);
export const validUsernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
export const StorageFolders = [
  "avatars",
  "og-images",
  "editor-uploads",
] as const;

export const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
] as const;

export const analyticsEndpoint = {
  analytics: {
    primary: "nap",
    timeseries: "nat",
    total: "nav",
  },
  bookmarks: {
    primary: "nbp",
    timeseries: "nbt",
    total: "nbc",
  },
} as const;

export const analyticsSources = {
  analytics: "na",
  bookmarks: "nb",
} as const;

export const userCategories: SelectOption[] = [
  { title: "Investor", value: "Investor" },
  { title: "Developer", value: "Developer" },
  { title: "Designer", value: "Designer" },
  { title: "Founder", value: "Founder" },
  { title: "Freelancer", value: "Freelancer" },
  { title: "Writer", value: "Writer" },
  { title: "Other", value: "Other" },
] as const;

export const calloutCategories: SelectOption<CalloutCategory>[] = [
  { title: "Hiring", value: "hiring" },
  { title: "Open to work", value: "openToWork" },
  { title: "Partnerships", value: "partnerships" },
  { title: "Investment", value: "investment" },
  { title: "Feedback", value: "feedback" },
  { title: "Other", value: "other" },
] as const;

export const userLocations: SelectOption[] = Object.entries(countries).map(
  (c) => {
    return {
      title: c[1],
      value: c[0],
    };
  },
);

export const defaultThemeOptions: SelectOption[] = [
  { title: "Dark", value: "dark" },
  { title: "Light", value: "light" },
] as const;

export const pageVisibilityOptions: SelectOption<PageVisibility>[] = [
  { title: "Visible", value: "visible" },
  { title: "Unlisted", value: "unlisted" },
] as const;

export const themeStyles: SelectOption<UserPageTheme>[] = [
  {
    title: "Resume (default)",
    value: "default",
  },
  {
    title: "Link in bio",
    value: "linkInBio",
  },

  {
    title: "Freestyle",
    value: "freeStyle",
  },
] as const;

export const linkInBioLinkTypes: SelectOption<LinkInBioLinkType>[] = [
  {
    title: "Wide",
    value: "wide",
  },
  {
    title: "Compact",
    value: "compact",
  },
] as const;

export const JSONLDHomePage: Organization = {
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.domain,
  url: siteConfig.links.home,
  logo: "https://uh7iqgcm0yv1ea0w.public.blob.vercel-storage.com/commab-bZyY9Zhe8uiORgKORRq0e0sYQr6Rvk",
  sameAs: siteConfig.links.github,
};

export const JSONLDHowTo: HowTo = {
  "@type": "HowTo",
  "name": "How to Build Your Personal Website with Comma",
  "description": "Learn how to create a professional personal website using Comma's minimal website builder in just a few simple steps.",
  "totalTime": "PT10M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Computer or mobile device with internet connection"
    },
    {
      "@type": "HowToSupply",
      "name": "Email address for account creation"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Comma website builder platform"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Sign up for Comma",
      "text": "Visit comma.to and create your free account using your email address. No credit card required to get started.",
      "url": "https://app.comma.to/login",
      "image": "https://comma.to/_static/previews/explore-light.png"
    },
    {
      "@type": "HowToStep",
      "name": "Choose your template and customize",
      "text": "Select from our minimal, clean templates and customize the design to match your personal brand and style preferences.",
      "url": "https://app.comma.to/settings/customize",
      "image": "https://comma.to/_static/previews/themes-light.png"
    },
    {
      "@type": "HowToStep",
      "name": "Add your content",
      "text": "Use our Notion-like rich text editor to add your bio, projects, work experience, articles, and bookmarks. Drag and drop to organize sections as needed.",
      "url": "https://app.comma.to",
      "image": "https://comma.to/_static/previews/editor-light.png"
    },
    {
      "@type": "HowToStep",
      "name": "Set up your newsletter",
      "text": "Add newsletter signup forms to your website to collect email subscribers and start building your audience directly.",
      "url": "https://app.comma.to/settings/subscribers",
      "image": "https://comma.to/_static/previews/newsletter-light.png"
    },
    {
      "@type": "HowToStep",
      "name": "Connect your custom domain (optional)",
      "text": "Connect your own domain name to your Comma website for a professional, branded web presence.",
      "url": "https://app.comma.to/settings",
      "image": "https://comma.to/_static/previews/domain-light.png"
    },
    {
      "@type": "HowToStep",
      "name": "Publish and share",
      "text": "Publish your website and share it with the world. Use our Explore page to connect with other creators and grow your network."
    }
  ]
} 