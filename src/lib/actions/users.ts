"use server";
import { UserSubscriptionPlan } from "@/types";
import { cancelSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import type {
  CalloutCategory,
  User,
  UserCategory,
  UserPageTheme,
} from "@prisma/client";
import type * as z from "zod";
import { db } from "../db";
import { addDomain, removeDomain } from "../domains";
import { encrypt } from "../encryption";
import { addContact } from "../resend";
import { getPostPageURL } from "../utils";
import { calloutPatchSchema, calloutSchema } from "../validations/callout";
import type { updateUserSchema } from "../validations/user";
import {
  workExperienceFormSchema,
  workExperiencePatchSchema,
} from "../validations/work-experience";

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export async function updateUser(
  userId: string,
  data: UpdateUserSchema,
  plan: UserSubscriptionPlan,
) {
  const {
    showBranding,
    category,
    beehiivKey,
    theme,
    beehiivPublicationId,
    ...rest
  } = data;

  if (theme && !plan.isPro && theme !== "default") {
    return new Response("Upgrade plan to Pro to use themes feature", {
      status: 403,
    });
  }

  const encryptedBeehiivKey =
    beehiivKey && beehiivKey !== null ? encrypt(beehiivKey) : beehiivKey;
  const encryptedPublicationId =
    beehiivPublicationId && beehiivPublicationId !== null
      ? encrypt(beehiivPublicationId)
      : beehiivPublicationId;

  const updated = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      ...rest,
      ...(showBranding !== undefined && {
        showBranding: plan.isPro ? showBranding : true,
      }),
      theme: theme as UserPageTheme,
      ...(category && { category: category as UserCategory }),
      beehiivKey: encryptedBeehiivKey,
      beehiivPublicationId: encryptedPublicationId,
    },
  });

  if (data.email) {
    await addContact(updated.email, updated.name ?? updated.username);
  }

  return new Response(null, { status: 200 });
}

export async function updateDomain(
  user: Pick<User, "id" | "domain">,
  domain?: string | null,
) {
  if (domain === null) {
    await Promise.all([
      db.user.update({
        where: {
          id: user.id,
        },
        data: {
          domain: null,
        },
      }),
      removeDomain(user.domain as string),
    ]);

    return new Response(null, { status: 200 });
  }

  if (domain) {
    if (domain !== user.domain) {
      await removeDomain(user.domain as string);
    }
    await Promise.all([
      db.user.update({
        where: {
          id: user.id,
        },
        data: {
          domain,
        },
      }),
      addDomain(domain),
    ]);

    return new Response(null, { status: 200 });
  }
}

export async function deleteUser(userId: string, lsId: string | null) {
  await Promise.all([
    lsId ? cancelSubscription(lsId) : null,
    db.user.delete({
      where: {
        id: userId,
      },
    }),
  ]);
}

type CreateWorkExperienceSchema = z.infer<typeof workExperienceFormSchema>;
type UpdateWorkExperienceSchema = z.infer<typeof workExperiencePatchSchema>;

export async function createWorkExperience(
  userId: string,
  data: CreateWorkExperienceSchema,
) {
  return await db.workExperience.create({
    data: {
      userId,
      ...data,
    },
  });
}

export async function updateWorkExperience(
  workExperienceId: string,
  userId: string,
  data: UpdateWorkExperienceSchema,
) {
  return await db.workExperience.update({
    where: {
      id: workExperienceId,
      userId,
    },
    data,
  });
}

export async function deleteWorkExperience(
  workExperienceId: string,
  userId: string,
) {
  return await db.workExperience.delete({
    where: {
      id: workExperienceId,
      userId,
    },
  });
}

type CreateCalloutSchema = z.infer<typeof calloutSchema>;
type UpdateCalloutSchema = z.infer<typeof calloutPatchSchema>;

export async function createCallout(
  user: Pick<User, "id" | "username" | "domain">,
  data: CreateCalloutSchema,
) {
  const { postId, postType, category, ...rest } = data;
  let relatedPostURL = undefined;
  if (postId && postType) {
    if (postType === "article") {
      const article = await db.article.findUnique({
        where: {
          id: postId,
        },
      });

      if (article) {
        relatedPostURL = getPostPageURL("articles", article.slug, user);
      }
    } else {
      const project = await db.project.findUnique({
        where: {
          id: postId,
        },
      });

      if (project) {
        relatedPostURL = getPostPageURL("projects", project.slug, user);
      }
    }
  }

  return await db.callout.create({
    data: {
      ...rest,
      userId: user.id,
      category: category as CalloutCategory,
      relatedPostURL,
      postId,
    },
  });
}

export async function updateCallout(
  calloutId: string,
  user: Pick<User, "id" | "username" | "domain">,
  data: UpdateCalloutSchema,
) {
  const { postId, postType, category, ...rest } = data;
  let relatedPostURL = undefined;
  if (postId && postType) {
    if (postType === "article") {
      const article = await db.article.findUnique({
        where: {
          id: postId,
        },
      });

      if (article) {
        relatedPostURL = getPostPageURL("articles", article.slug, user);
      }
    } else {
      const project = await db.project.findUnique({
        where: {
          id: postId,
        },
      });

      if (project) {
        relatedPostURL = getPostPageURL("projects", project.slug, user);
      }
    }
  }

  return await db.callout.update({
    where: {
      id: calloutId,
      userId: user.id,
    },
    data: {
      ...rest,
      postId,
      category: category as CalloutCategory,
      relatedPostURL,
    },
  });
}

export async function deleteCallout(calloutId: string, userId: string) {
  return await db.callout.delete({
    where: {
      id: calloutId,
      userId,
    },
  });
}
