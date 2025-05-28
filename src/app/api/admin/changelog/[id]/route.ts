import { deleteLog, updateLog } from "@/lib/actions/admin";
import { guard } from "@/lib/auth";
import { changelogPatchSchema } from "@/lib/validations/changelog";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const PATCH = guard(
  async ({ body, ctx }) => {
    try {
      const { params } = ctx;
      await updateLog(params.id, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    admin: true,
    schemas: {
      contextSchema: routeContextSchema,
      bodySchema: changelogPatchSchema,
    },
  },
);

export const DELETE = guard(
  async ({ ctx }) => {
    try {
      const { params } = ctx;

      await deleteLog(params.id);

      return new Response(null, { status: 204 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    admin: true,
    schemas: {
      contextSchema: routeContextSchema,
    },
  },
);
