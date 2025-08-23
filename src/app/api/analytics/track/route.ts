import { track } from "@/lib/tinybird";
import type { NextRequest } from "next/server";
import * as z from "zod";

export const runtime = "edge";

const eventSchema = z.object({
  page: z.string().min(1).startsWith("/"),
  slug: z.string().min(1).optional(),
  type: z.enum(["articles", "projects"]).optional(),
  domain: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const body = eventSchema.safeParse(data);
    if (!body.success) {
      return new Response(`Invalid body: ${body.error.message}`, {
        status: 422,
      });
    }

    const { page, type, slug, domain, username } = body.data;

    return await track({
      req,
      page,
      type,
      slug,
      domain,
      username,
    });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
