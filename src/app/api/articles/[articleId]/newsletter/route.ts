import { guard } from "@/lib/auth";
import * as z from "zod";

const contextSchema = z.object({
  params: z.object({
    articleId: z.string().min(1),
  }),
});

export const POST = guard(
  async () => {
    try {

      return new Response("Newsletter function is not active", {status: 400})
      // const article = await getArticleByAuthor(ctx.params.articleId, user.id);

      // if (!article) {
      //   return new Response(null, { status: 404 });
      // }

      // if (!article.published) {
      //   return new Response(
      //     "You must publish this article to send newsletter",
      //     { status: 400 },
      //   );
      // }

      // if (!user.newsletter) {
      //   return new Response("Newsletter function is not active", {
      //     status: 400,
      //   });
      // }

      // return await sendNewsletter(article, user);
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      contextSchema,
    },
  },
);
