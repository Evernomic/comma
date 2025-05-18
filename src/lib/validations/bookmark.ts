import * as z from "zod";
import { URLRegex, validDomainRegex } from "../constants";

export const collectionSchema = z.object({
  name: z.string().min(1).max(30),
});

export const bookmarkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  collection: z.string().min(1).nullable().optional(),
  isPinned: z.boolean().optional(),
});

export const bookmarkFormSchema = z.object({
  title: z.string().min(1),
  domain: z
    .string()
    .refine(
      (value) => validDomainRegex.test(value) || URLRegex.test(value),
      "Enter valid domain or URL",
    ),
  collection: z.string().min(1).nullable().optional(),
});
