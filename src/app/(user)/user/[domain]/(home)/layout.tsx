import { userPageConfig } from "@/config/user-page";
import { getUserByDomain } from "@/lib/fetchers/users";
import { getJSONLDScript } from "@/lib/json-ld";
import { getJSONLD, getPersonSchema, getUserPageURL } from "@/lib/utils";
import type { NavItem } from "@/types";
import { notFound } from "next/navigation";
import type React from "react";
import type { Thing } from "schema-dts";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

export default async function UserHomePageLayout({
  children,
  params,
}: LayoutProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }

  const jsonLD = [
    ...userPageConfig.pages,
    ...((user.navLinks as Array<NavItem>) ?? []),
  ]
    .filter((p) => p.isVisible)
    ?.map((page) => {
      const userPageURL = getUserPageURL(user);
      const url = `${userPageURL}${page.href}`;
      return {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.title,
        ...(page.href !== "/"
          ? {
              isPartOf: {
                "@id": userPageURL,
              },
            }
          : {}),
      };
    }) as Array<Thing>;
  return (
    <div>
      {children}
      {getJSONLDScript(
        getJSONLD({
          type: "graph",
          data: {
            "@context": "https://schema.org",
            "@graph": [getPersonSchema(user), ...jsonLD],
          },
        }),
      )}
    </div>
  );
}
