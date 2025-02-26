import {
  analyticsProperties,
  analyticsSearchParamsSchema,
  getAnalytics,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { json2csv } from "json-2-csv";
import JSZip from "jszip";

export const GET = guard(
  async ({ user, searchParams: { interval } }) => {
    try {
      const allData = await Promise.all(
        analyticsProperties.map((property) =>
          getAnalytics({ property, interval, userId: user.id }),
        ),
      );

      const zip = new JSZip();

      analyticsProperties.map((property, i) => {
        zip.file(`${property}.csv`, json2csv(allData[i]));
      });

      const buffer = await zip.generateAsync({ type: "nodebuffer" });

      return new Response(buffer, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename=comma_analytics_export.zip`,
        },
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      searchParamsSchema: analyticsSearchParamsSchema,
    },
  },
);
