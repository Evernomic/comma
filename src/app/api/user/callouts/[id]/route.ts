import { deleteCallout, updateCallout } from "@/lib/actions/users";
import { guard } from "@/lib/auth";
import { calloutPatchSchema } from "@/lib/validations/callout";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const PATCH = guard(
  async ({ user, body, ctx }) => {
    try {
      const { params } = ctx;

      await updateCallout(params.id, user, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      contextSchema: routeContextSchema,
      bodySchema: calloutPatchSchema,
    },
  },
);

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      const { params } = ctx;

      await deleteCallout(params.id, user.id);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      contextSchema: routeContextSchema,
    },
  },
);
