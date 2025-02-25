import * as z from "zod";
import { validUsernameRegex } from "../constants";

const notAllowedUsernames = ["app", "go", "www"];

export const updateUserSchema = z
  .object({
    name: z.string().min(1).max(48),
    username: z
      .string()
      .toLowerCase()
      .regex(validUsernameRegex, "You can only use letters and numbers")
      .min(1)
      .max(36)
      .refine(
        (value) => !notAllowedUsernames.includes(value),
        "Username is not available",
      ),
    title: z.string().max(32).nullable(),
    about: z.string().max(400).nullable(),
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
  })
  .partial();
