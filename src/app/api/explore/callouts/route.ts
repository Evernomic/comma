import { loadSearchParams } from "@/app/(home)/explore/callouts/searchParams";
import { db } from "@/lib/db";
import { calloutsCategoryValues } from "@/lib/validations/callout";
import type { CalloutCategory } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import * as z from "zod";

const bodySchema = z.object({
  search: z.string().optional(),
  sort: z.enum(["recent", "oldest"]).default("recent").optional(),
  category: z.array(z.enum(calloutsCategoryValues)).optional(),
  page: z.number().default(1),
});

export async function GET(req: Request) {
  try {
    const searchParams = loadSearchParams(req.url);
    const parsed = bodySchema.safeParse(searchParams);

    if (!parsed.success) {
      return new Response(parsed.error.issues[0].message, {
        status: 422,
      });
    }

    const { search, category, page, sort } = parsed.data;

    const allCallouts = await db.callout.findMany({
      where: {
        ...(search?.length && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
        ...(category &&
          category?.length > 0 && {
            category: {
              in: category as CalloutCategory[],
            },
          }),
      },
      ...(sort === "recent" && {
        orderBy: {
          createdAt: "desc",
        },
      }),
      ...(sort === "oldest" && {
        orderBy: {
          createdAt: "asc",
        },
      }),
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        relatedPostURL: true,
        user: {
          select: {
            username: true,
            domain: true,
          },
        },
      },
    });

    const take = page === 1 ? 0 : page * 40;
    const callouts = allCallouts
      .map((c) => ({
        ...c,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: nanoid(),
      }))
      .slice(take, take + 40);

    return NextResponse.json({
      data: callouts,
      previousId: page - 1,
      nextId: callouts.length < 40 ? null : page + 1,
    });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify(err.message), { status: 500 });
    }

    return new Response(JSON.stringify(err), { status: 500 });
  }
}
