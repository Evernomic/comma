import * as z from "zod";

export const articleCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
});

export const articlePatchSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1).max(70),
    subTitle: z.string().max(150).nullable(),
    content: z.string(),
    seoTitle: z.string().max(60).nullable(),
    seoDescription: z.string().max(160).nullable(),
    ogImage: z.string().url().nullable(),
    image: z.string().url().nullable(),
    published: z.boolean(),
    isPinned: z.boolean(),
    publishedAt: z.string().date(),
    canonicalURL: z.string().url().nullable(),
    tags: z
      .array(z.string().min(1))
      .superRefine((tags, ctx) => {
        const uniqueTags = new Set(tags);

        if (tags.length !== uniqueTags.size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Tags must be unique.",
          });
        }
      })
      .or(
        z
          .string()
          .nullable()
          .transform(() => []),
      ),
  })
  .partial();
