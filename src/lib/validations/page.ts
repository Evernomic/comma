import * as z from "zod";

export const pageCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
});

export const pagePatchSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1).max(70),
    subTitle: z.string().max(150).nullable(),
    content: z.string(),
    visibility: z.enum(["visible", "unlisted"]),
    seoTitle: z.string().max(60).nullable(),
    seoDescription: z.string().max(160).nullable(),
    ogImage: z.string().url().nullable(),
    published: z.boolean(),
    password: z.string().nullable(),
  })
  .partial();
