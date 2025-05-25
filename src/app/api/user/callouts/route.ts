import { createCallout } from "@/lib/actions/users";
import { guard } from "@/lib/auth";
import { calloutSchema } from "@/lib/validations/callout";

export const POST = guard(
  async ({ user, body }) => {
    try {
      await createCallout(user, body);

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      bodySchema: calloutSchema,
    },
  },
);
