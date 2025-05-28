import { deleteUser } from "@/lib/actions/admin";
import { guard } from "@/lib/auth";
import log from "@/lib/log";
import * as z from "zod";

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      await Promise.allSettled([
        deleteUser(ctx.params.id),
        log("User deleted by Admin", `${user.email}`, user.id),
      ]);
      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    admin: true,
    schemas: {
      contextSchema: z.object({
        params: z.object({
          id: z.string().min(1),
        }),
      }),
    },
  },
);
