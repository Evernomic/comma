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
      name: "Max 1 article, project, and bookmark",
      icon: "check",
    },
    {
      name: "Get featured on our Explore page",
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
      name: "SEO",
      icon: "check",
    },
    {
      name: "Password protection",
      icon: "check",
    },

    {
      name: "Advanced analytics",
      icon: "x",
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
    monthly: 4,
    yearly: 40,
  },
  maxPostLimit: "∞",
  features: [
    {
      name: "Unlimited articles, projects, and bookmarks",
      icon: "check",
    },
    {
      name: "Get featured on our Explore page",
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
      name: "SEO",
      icon: "check",
    },
    {
      name: "Password protection",
      icon: "check",
    },
    {
      name: "Advanced analytics",
      icon: "check",
    },
  ],
  action: {
    text: "Get started",
    link: "https://app.comma.to/signup",
  },
} as const;
