import {
  deleteWorkExperience,
  updateWorkExperience,
} from "@/lib/actions/users";
import { guard } from "@/lib/auth";
import { workExperiencePatchSchema } from "@/lib/validations/work-experience";
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

      await updateWorkExperience(params.id, user.id, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
      bodySchema: workExperiencePatchSchema,
    },
  },
);

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      const { params } = ctx;

      await deleteWorkExperience(params.id, user.id);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
    },
  },
);
