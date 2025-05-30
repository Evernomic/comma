import * as z from "zod";

export const adSpotSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(25),
  description: z.string().min(1).max(120),
  image: z.string().url().or(z.null()).default(null),
  url: z.string().url(),
  place: z.enum(["explore", "callouts"]),
});

export const configSchema = z
  .object({
    announcementText: z.string().nullable(),
    adspots: z.array(adSpotSchema).superRefine((adspots, ctx) => {
      const positions = adspots.map((s) => s.id);
      const uniquePositions = new Set(positions);

      if (positions.length !== uniquePositions.size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "IDs must be unique.",
        });
      }
    }),
  })
  .partial();

export type AdminConfig = z.infer<typeof configSchema>;
export type AdSpot = z.infer<typeof adSpotSchema>;
