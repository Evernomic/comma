import * as z from "zod";

const workExperienceSchema = z.object({
  from: z.number().min(1991).max(new Date().getFullYear()),
  to: z
    .union([z.literal("present"), z.string().length(4)])
    .refine(
      (val) =>
        val === "present" || (!isNaN(Number(val)) && Number(val) >= 1991),
      {
        message: "If 'end year' is not 'present', it must be a valid year.",
      },
    ),
  title: z.string().min(1),
  company: z.string().min(1).or(z.string().optional()),
  location: z.string().min(1).or(z.string().optional()),
  url: z.string().url().or(z.string().optional()),
  description: z.string().max(250),
});

export const workExperienceFormSchema = workExperienceSchema.refine(
  (data) => data.to === "present" || Number(data.to) >= data.from,
  {
    message: "'End year' cannot be earlier than 'start year'.",
    path: ["to"],
  },
);

export const workExperiencePatchSchema = workExperienceSchema.partial().refine(
  (data) => {
    if (data.to === undefined || data.from === undefined) {
      return true;
    }
    return data.to === "present" || Number(data.to) >= data.from;
  },
  {
    message: "'End year' cannot be earlier than 'start year'.",
    path: ["to"],
  },
);
