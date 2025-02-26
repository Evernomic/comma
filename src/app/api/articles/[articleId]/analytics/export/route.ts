import { verifyArticleAccess } from "@/lib/actions/articles";
import {
  analyticsProperties,
  analyticsSearchParamsSchema,
  getAnalytics,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { getArticleByAuthor } from "@/lib/fetchers/articles";
import { json2csv } from "json-2-csv";
import JSZip from "jszip";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    articleId: z.string().min(1),
  }),
});

export const GET = guard(
  async ({ user, ctx, searchParams: { interval } }) => {
    try {
      const { articleId } = ctx.params;

      const article = await getArticleByAuthor(articleId, user.id);

      if (!article) {
        return new Response("Article not found", {
          status: 404,
        });
      }
      if (!(await verifyArticleAccess(article.id, user.id))) {
        return new Response(null, { status: 403 });
      }

      const filteredProperties = analyticsProperties.filter(p => p !== "page")

      const allData = await Promise.all(
        filteredProperties.map((property) =>
          getAnalytics({
            property,
            interval,
            page: `/articles/${article.slug}`,
            userId: user.id,
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
          "Content-Disposition": `attachment; filename=comma_article_analytics_export.zip`,
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
