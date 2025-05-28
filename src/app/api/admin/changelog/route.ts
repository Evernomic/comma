import { createLog } from "@/lib/actions/admin";
import { guard } from "@/lib/auth";
import { changelogCreateSchema } from "@/lib/validations/changelog";

export const POST = guard(
  async ({ body }) => {
    try {
      const changelog = await createLog(body);

      return new Response(JSON.stringify({ id: changelog.id }), {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    admin: true,
    schemas: {
      bodySchema: changelogCreateSchema,
    },
  },
);
