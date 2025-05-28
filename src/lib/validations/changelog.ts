import * as z from "zod";

export const changelogCreateSchema = z.object({
  title: z.string().min(1).max(70),
  content: z.string(),
});

export const changelogPatchSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1).max(70),
    content: z.string(),
    published: z.boolean(),
    publishedAt: z.string().date(),
  })
  .partial();
