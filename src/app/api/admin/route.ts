import { guard } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { type AdminConfig, configSchema } from "@/lib/validations/admin";

export const PATCH = guard(
  async ({ body }) => {
    const currentConfig = await redis.json.get<AdminConfig>("config");

    await redis.json.set("config", "$", { ...currentConfig, ...body });

    return new Response(null, { status: 200 });
  },
  {
    admin: true,
    schemas: {
      bodySchema: configSchema,
    },
  },
);
