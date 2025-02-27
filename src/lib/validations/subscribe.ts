import * as z from "zod";

export const subscribeSchema = z.object({
  email: z.string().email(),
});
