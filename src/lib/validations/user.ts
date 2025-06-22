import * as z from "zod";
import {
  linkInBioLinkTypes,
  themeStyles,
  userCategories,
  validUsernameRegex,
} from "../constants";
import { countries } from "../constants/countries";
export const notAllowedUsernames = ["app", "go", "www", "demo"];
export const categoryValues = userCategories.map((c) => c.value) as [
  string,
  ...string[],
];
const themeValues = themeStyles.map((t) => t.value) as [string, ...string[]];
export const locationValues = Object.keys(countries) as [string, ...string[]];

export const socialLinkSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(40, { message: "Title can be up to max 40 characters" }),
  url: z.string().url(),
  username: z.string().optional().nullable(),
});

export const linkInBioLinkSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(60, { message: "Title can be up to max 60 characters" }),
  url: z.string().url(),
  image: z.string().url().or(z.null()).default(null),
  contentTitle: z
    .string()
    .min(1)
    .max(60, { message: "Content title can be up to max 60 characters" }),
  description: z
    .string()
    .min(1)
    .max(120, { message: "Description can be up to max 120 characters" }),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1).max(48),
    username: z
      .string()
      .toLowerCase()
      .regex(validUsernameRegex, "You can only use letters and numbers")
      .min(1)
      .max(20)
      .refine(
        (value) => !notAllowedUsernames.includes(value),
        "Username is not available",
      ),
    title: z.string().max(32).nullable(),
    about: z.string().nullable(),
    image: z.string().url().nullable(),
    email: z.string().email(),
    seoTitle: z.string().max(60).nullable(),
    seoDescription: z.string().max(160).nullable(),
    ogImage: z.string().url().nullable(),
    twitter: z.string().trim().nullable(),
    dribbble: z.string().trim().nullable(),
    github: z.string().trim().nullable(),
    linkedin: z.string().trim().nullable(),
    contactEmail: z.string().trim().nullable(),
    password: z.string().nullable(),
    showBranding: z.boolean(),
    showOnExplore: z.boolean(),
    showBottomNav: z.boolean(),
    showCustomHomePage: z.boolean(),
    customHomePageContent: z.string(),
    userDefaultTheme: z.enum(["dark", "light"]),
    category: z.enum(categoryValues),
    location: z.enum(locationValues),
    newsletterCta: z.string().max(300),
    announcementText: z.string().nullable(),
    beehiivKey: z.string().nullable(),
    beehiivPublicationId: z.string().nullable(),
    theme: z.enum(themeValues),
    sections: z
      .array(
        z.object({
          title: z
            .string()
            .min(1)
            .max(60, { message: "Title can be up to max 60 characters" }),
          subTitle: z
            .string()
            .max(240, { message: "Subtitle can be up to max 240 characters" })
            .optional()
            .nullable(),
          position: z.number().min(0).max(8),
        }),
      )
      .superRefine((sections, ctx) => {
        const positions = sections.map((s) => s.position);
        const uniquePositions = new Set(positions);

        if (positions.length !== uniquePositions.size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Position values must be unique.",
          });
        }
      }),
    navLinks: z
      .array(
        z.object({
          title: z
            .string()
            .min(1)
            .max(25, { message: "Title can be up to max 25 characters" }),
          href: z
            .string()
            .or(z.string().min(1).startsWith("/"))
            .or(z.string().url()),
          isVisible: z.boolean().optional(),
          isExternal: z.boolean().optional(),
          pageId: z.string().min(1).optional(),
        }),
      )
      .superRefine((links, ctx) => {
        const positions = links.map((s) => s.href);
        const uniquePositions = new Set(positions);

        if (positions.length !== uniquePositions.size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Hrefs must be unique.",
          });
        }
      }),
    links: z
      .array(
        socialLinkSchema.extend({
          id: z.string().min(1),
        }),
      )
      .superRefine((links, ctx) => {
        const positions = links.map((s) => s.id);
        const uniquePositions = new Set(positions);

        if (positions.length !== uniquePositions.size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "IDs must be unique.",
          });
        }
      }),

    linkInBioLinks: z
      .array(
        linkInBioLinkSchema.extend({
          id: z.string().min(1),
        }),
      )
      .superRefine((links, ctx) => {
        const positions = links.map((s) => s.id);
        const uniquePositions = new Set(positions);

        if (positions.length !== uniquePositions.size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "IDs must be unique.",
          });
        }
      }),
    linkInBioLinksViewType: z.enum(
      linkInBioLinkTypes.map((l) => l.value) as [string, ...string[]],
    ),
  })
  .partial();
