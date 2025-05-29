import * as z from "zod";

export const configSchema = z
  .object({
    announcementText: z.string().nullable(),
  })
  .partial();

export type AdminConfig = z.infer<typeof configSchema>;
