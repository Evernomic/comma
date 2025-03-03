import { createWorkExperience } from "@/lib/actions/users";
import { guard } from "@/lib/auth";
import { workExperienceFormSchema } from "@/lib/validations/work-experience";

export const POST = guard(
  async ({ user, body }) => {
    try {
      await createWorkExperience(user.id, body);

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: workExperienceFormSchema,
    },
  },
);
