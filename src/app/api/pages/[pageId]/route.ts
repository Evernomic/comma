import { deletePage, updatePage } from "@/lib/actions/pages";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPageHref, updateNavLinks } from "@/lib/utils";
import { pagePatchSchema } from "@/lib/validations/page";
import type { CustomNavItem } from "@/types";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    pageId: z.string(),
  }),
});

export const PATCH = guard(
  async ({ user, body, ctx }) => {
    try {
      const { params } = ctx;
      const page = await updatePage(params.pageId, user, body);

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          navLinks: updateNavLinks(user.navLinks as CustomNavItem[], {
            title: page.title,
            href: getPageHref(page),
            isVisible: page.visibility === "visible",
            pageId: page.id,
          }),
        },
      });

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
      bodySchema: pagePatchSchema,
    },
  },
);

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      const { params } = ctx;

      const page = await deletePage(params.pageId, user.id);

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          navLinks: [
            ...(user.navLinks as CustomNavItem[]).filter(
              (p) => p.pageId !== page.id,
            ),
          ],
        },
      });

      return new Response(null, { status: 204 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
    },
  },
);
