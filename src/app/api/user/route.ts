import { deleteUser, updateUser } from "@/lib/actions/users";
import { guard } from "@/lib/auth";
import log from "@/lib/log";
import { updateUserSchema } from "@/lib/validations/user";

export const PATCH = guard(
  async ({ user, body }) => {
    try {
      await updateUser(user.id, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: updateUserSchema,
    },
  },
);

export const DELETE = guard(async ({ user }) => {
  try {
    await Promise.allSettled([
      deleteUser(user.id, user.lsId),
      log("User deleted", `${user.email}`, user.id),
    ]);
    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(
      "Make sure you delete all your posts (collections, articles, etc.)",
      { status: 500 },
    );
  }
});
