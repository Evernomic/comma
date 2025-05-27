import type { Plan } from "@/types";

export const freePlan: Plan = {
  title: "Free",
  description: "Limited Plan",
  price: {
    monthly: 0,
    yearly: 0,
  },
  maxPostLimit: 1,
  features: [
    {
      name: "Max 1 article, project, bookmark and page",
      icon: "check",
    },
    {
      name: "Custom themes",
      icon: "x",
    },
    {
      name: "Explore page feature",
      icon: "check",
    },
    {
      name: "Put out open calls",
      icon: "x",
    },
    {
      name: "Collect emails",
      icon: "x",
    },
    {
      name: "Custom domain",
      icon: "x",
    },
    {
      name: "Remove watermark",
      icon: "x",
    },
    {
      name: "Advanced analytics",
      icon: "x",
    },
    {
      name: "SEO",
      icon: "check",
    },
  ],
  action: {
    text: "Get started",
    link: "https://app.comma.to/signup",
  },
} as const;

export const proPlan: Plan = {
  title: "Pro",
  description: "Unlimited Plan",
  price: {
    monthly: 6,
    yearly: 60,
  },
  maxPostLimit: "∞",
  features: [
    {
      name: "Unlimited articles, projects, bookmarks and pages",
      icon: "check",
    },
    {
      name: "Custom themes",
      icon: "check",
    },
    {
      name: "Explore page feature",
      icon: "check",
    },
    {
      name: "Put out open calls",
      icon: "check",
    },
    {
      name: "Collect emails",
      icon: "check",
    },
    {
      name: "Custom domain",
      icon: "check",
    },
    {
      name: "Remove watermark",
      icon: "check",
    },
    {
      name: "Advanced analytics",
      icon: "check",
    },
    {
      name: "SEO",
      icon: "check",
    },
  ],
  action: {
    text: "Get started",
    link: "https://app.comma.to/signup",
  },
} as const;
