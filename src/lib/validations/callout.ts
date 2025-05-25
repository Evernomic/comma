import * as z from "zod";
import { calloutCategories } from "../constants";

export const calloutsCategoryValues = calloutCategories.map((c) => c.value) as [
  string,
  ...string[],
];
export const calloutSchema = z.object({
  title: z.string().min(1),
  url: z.string().url().or(z.string().optional()),
  description: z.string().max(250),
  category: z.enum(calloutsCategoryValues),
  postId: z.string().nullable().optional(),
  postType: z.enum(["article", "project"]).nullable().optional(),
});

export const calloutPatchSchema = calloutSchema.partial();
