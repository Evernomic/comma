import { verifyBookmarkAccess } from "@/lib/actions/bookmarks";
import {
  analyticsProperties,
  analyticsSearchParamsSchema,
  getBookmarkAnalytics,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { getBookmarkByAuthor } from "@/lib/fetchers/bookmarks";
import { json2csv } from "json-2-csv";
import JSZip from "jszip";
import * as z from "zod";
const routeContextSchema = z.object({
  params: z.object({
    bookmarkId: z.string().min(1),
  }),
});
export const GET = guard(
  async ({ user, ctx, searchParams: { interval } }) => {
    try {
      const { bookmarkId } = ctx.params;

      const bookmark = await getBookmarkByAuthor(bookmarkId, user.id);

      if (!bookmark) {
        return new Response("Bookmark not found", {
          status: 404,
        });
      }

      if (!(await verifyBookmarkAccess(bookmark.id, user.id))) {
        return new Response(null, { status: 403 });
      }

      const filteredProperties = analyticsProperties.filter(
        (p) => p !== "page",
      );

      const allData = await Promise.all(
        filteredProperties.map((property) =>
          getBookmarkAnalytics({
            id: bookmarkId,
            property,
            interval,
          }),
        ),
      );

      const zip = new JSZip();

      filteredProperties.map((property, i) => {
        zip.file(`${property}.csv`, json2csv(allData[i]));
      });

      const buffer = await zip.generateAsync({ type: "nodebuffer" });

      return new Response(buffer, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename=comma_bookmark_analytics_export.zip`,
        },
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      contextSchema: routeContextSchema,
      searchParamsSchema: analyticsSearchParamsSchema,
    },
  },
);
