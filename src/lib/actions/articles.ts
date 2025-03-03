"use server";
import { siteConfig } from "@/config/site";
import Newsletter from "@/emails/newsletter";
import type { NewsletterProps } from "@/types";
import type { Article, User } from "@prisma/client";
import { nanoid } from "nanoid";
import type * as z from "zod";
import { db } from "../db";
import { getSubscribersByUserId } from "../fetchers/subscribers";
import { rateLimit } from "../ratelimit";
import { resend } from "../resend";
import { formatDate, getPostPageURL, slugify } from "../utils";
import type {
  articleCreateSchema,
  articlePatchSchema,
} from "../validations/article";

type ArticleCreateSchema = z.infer<typeof articleCreateSchema>;
type ArticlePatchSchema = z.infer<typeof articlePatchSchema>;

export async function createArticle(
  authorId: string,
  data: ArticleCreateSchema,
) {
  return await db.article.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function updateArticle(
  articleId: string,
  user: User,
  data: ArticlePatchSchema,
) {
  const { slug, publishedAt, ...rest } = data;

  return await db.article.update({
    where: {
      id: articleId,
      authorId: user.id,
    },
    data: {
      ...rest,
      slug: slug || slugify(data.title),
      publishedAt: publishedAt
        ? new Date(publishedAt).toISOString()
        : undefined,
    },
  });
}

export async function deleteArticle(articleId: string, authorId: string) {
  const article = await db.article.delete({
    where: {
      id: articleId,
      authorId,
    },
  });

  return article.id;
}

export async function verifyArticleAccess(articleId: string, authorId: string) {
  const isExist = await db.article.count({
    where: {
      id: articleId,
      authorId,
    },
  });

  return isExist > 0;
}

export async function sendNewsletter(
  article: Article,
  user: Pick<User, "id" | "username" | "domain" | "name" | "newsletter">,
) {
  const { success } = await rateLimit.newsletter.limit(
    `newsletter:${user.id}:${article.id}`,
  );

  if (!success) {
    return new Response(
      "You can send newsletters a maximum of 2 times a day.",
      { status: 429 },
    );
  }

  const emails = await getSubscribersByUserId(user.id);

  if (emails.length) {
    await Promise.all([
      ...emails.map((e) => {
        sendNewsletterEmail({
          from: `${user?.name} from Comma <notify@${siteConfig.mailDomain}>`,
          to: e.email,
          subject: "I shared a new article.",
          newsletter: {
            title: article.title,
            author: user.name || user.username,
            articleURL: getPostPageURL("articles", article.slug, user),
            published: formatDate(article.publishedAt),
            subId: e.id,
          },
        });
      }),
      db.article.update({
        where: {
          id: article.id,
        },
        data: {
          lastNewsletterSentAt: new Date(),
        },
      }),
    ]);

    return new Response(null, { status: 200 });
  }
  return new Response("You don't have any subscribers", { status: 400 });
}

export async function sendNewsletterEmail({
  from,
  to,
  subject,
  newsletter,
}: {
  from: string;
  to: string;
  subject: string;
  newsletter: NewsletterProps;
}) {
  return await resend.emails.send({
    from,
    to,
    subject,
    react: Newsletter(newsletter),
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  });
}
