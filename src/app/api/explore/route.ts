import { loadSearchParams } from "@/app/(home)/explore/searchParams";
import { db } from "@/lib/db";
import { categoryValues, locationValues } from "@/lib/validations/user";
import { UserCategory } from "@prisma/client";
import { NextResponse } from "next/server";
import * as z from "zod";

const bodySchema = z.object({
  search: z.string().optional(),
  sort: z.enum(["popular", "recent", "oldest"]).optional(),
  category: z.array(z.enum(categoryValues)).optional(),
  location: z.array(z.enum(locationValues)).optional(),
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

    const { search, category, location, page, sort } = parsed.data;

    const allUsers = await db.user.findMany({
      where: {
        ...(search?.length && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              username: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              contactEmail: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
        ...(category &&
          category?.length > 0 && {
            category: {
              in: category as UserCategory[],
            },
          }),
        ...(location &&
          location?.length > 0 && {
            location: {
              in: location,
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
        showOnExplore: true,
        name: true,
        title: true,
        username: true,
        category: true,
        location: true,
        image: true,
        domain: true,
        articles: {
          select: {
            views: true,
          },
        },
        projects: {
          select: {
            views: true,
          },
        },
        bookmarks: {
          select: {
            clicks: true,
          },
        },
      },
    });

    const take = page === 1 ? 0 : page * 40;
    const users = allUsers
      .filter((u) => u.showOnExplore)
      .slice(take, take + 40);
    let usersWithPopularity = allUsers.map((user) => {
      const articleViews = user.articles.reduce(
        (sum, article) => sum + article.views,
        0,
      );
      const projectViews = user.projects.reduce(
        (sum, project) => sum + project.views,
        0,
      );
      const bookmarkClicks = user.bookmarks.reduce(
        (sum, bookmark) => sum + bookmark.clicks,
        0,
      );

      const popularityScore = Math.floor(
        (articleViews + projectViews + bookmarkClicks) / 3,
      );
      const { articles, projects, bookmarks, ...rest } = user;
      return {
        ...rest,
        popularityScore,
      };
    });

    const mergedPopularityUsers = process.env.MERGED_POPULARITY_USERS!;

    if (
      mergedPopularityUsers &&
      Array.isArray(JSON.parse(mergedPopularityUsers))
    ) {
      const pairs = JSON.parse(mergedPopularityUsers) as Array<{
        from: string;
        to: string;
      }>;

      pairs.forEach((pair) => {
        const from = usersWithPopularity.find((u) => u.username === pair.from);
        const to = usersWithPopularity.find((u) => u.username === pair.to);

        if (from && to) {
          const mergedScore = from.popularityScore + to.popularityScore;
          usersWithPopularity = usersWithPopularity.map((u) =>
            u.username === to.username
              ? { ...u, popularityScore: mergedScore }
              : u,
          );
        }
      });
    }

    const sortUsersByPopularity = usersWithPopularity
      .filter((u) => u.showOnExplore)
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(take, take + 40);

    return NextResponse.json({
      data: sort === "popular" ? sortUsersByPopularity : users,
      previousId: page - 1,
      nextId: users.length < 40 ? null : page + 1,
    });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify(err.message), { status: 500 });
    }

    return new Response(JSON.stringify(err), { status: 500 });
  }
}
