import * as z from "zod";

export const projectCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  year: z
    .number()
    .min(2000)
    .max(new Date().getFullYear() + 20),
  description: z.string().min(10).max(30),
});

export const projectPatchSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1).max(70),
    content: z.string(),
    year: z
      .number()
      .min(2000)
      .max(new Date().getFullYear() + 20),
    description: z.string().max(60).nullable(),
    seoTitle: z.string().max(60).nullable(),
    seoDescription: z.string().max(160).nullable(),
    url: z.string().url().nullable(),
    ogImage: z.string().url().nullable(),
    image: z.string().url().nullable(),
    published: z.boolean(),
    isPinned: z.boolean(),
    password: z.string().nullable(),
  })
  .partial();
