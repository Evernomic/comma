import { guard } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { configSchema } from "@/lib/validations/admin";

export const PATCH = guard(
  async ({ body }) => {
    await redis.json.set("config", "$", body);

    return new Response(null, { status: 200 });
  },
  {
    admin: true,
    schemas: {
      bodySchema: configSchema,
    },
  },
);
