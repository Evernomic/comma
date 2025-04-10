import { createPage } from "@/lib/actions/pages";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPageHref, updateNavLinks } from "@/lib/utils";
import { pageCreateSchema } from "@/lib/validations/page";
import type { CustomNavItem } from "@/types";

export const POST = guard(
  async ({ user, plan, body }) => {
    try {
      const pagesCount = await db.page.count({
        where: {
          authorId: user.id,
        },
      });

      if (
        typeof plan.maxPostLimit === "number" &&
        pagesCount >= plan.maxPostLimit &&
        !plan.isPro
      ) {
        return new Response(
          `If you want to share more than ${plan.maxPostLimit} page(s), upgrade the plan to Pro`,
          { status: 403 },
        );
      }
      const page = await createPage(user.id, body);

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          navLinks: updateNavLinks(user.navLinks as CustomNavItem[], {
            title: page.title,
            href: getPageHref(page),
            pageId: page.id,
          }),
        },
      });

      return new Response(JSON.stringify({ id: page.id }), {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: pageCreateSchema,
    },
  },
);
