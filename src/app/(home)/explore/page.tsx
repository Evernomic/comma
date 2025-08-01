import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { siteConfig } from "@/config/site";
import { getAdminConfig } from "@/lib/fetchers/admin";
import { generateSEO } from "@/lib/utils";
import { Suspense } from "react";
import Client from "./client";
import QueryProvider from "./query-provider";

export const metadata = generateSEO({
  title: "Explore",
});

export default async function ExplorePage() {
  const config = await getAdminConfig();
  const adspots = config?.adspots?.filter((ad) => ad.place === "explore") ?? [];
  return (
    <AppShell className="pt-10 gap-5 min-h-screen w-[900px] max-[960px]:w-full mx-auto">
      <AppHeader
        title="Explore"
        description="You can search for Comma writers here."
        className="[&_.title]:multi-['text-3xl;font-semibold'] [&_.description]:text-base max-md:multi-['flex-col;items-start;gap-5']"
      >
        <div className="flex gap-2">
          <NavButton
            href={siteConfig.links.app}
            icon="logo"
            direction="ltr"
            buttonVariant="ghost"
            buttonClassname="gap-2"
            aria-label="Go to App"
            prefetch={false}
          >
            Go to App
          </NavButton>
          <NavButton
            href="/explore/callouts"
            icon="megaPhone"
            direction="ltr"
            buttonVariant="primary"
            buttonClassname="gap-2"
            aria-label="View callouts"
          >
            View callouts
          </NavButton>
        </div>
      </AppHeader>
      <QueryProvider>
        <Suspense>
          <Client adspots={adspots} />
        </Suspense>
      </QueryProvider>
    </AppShell>
  );
}
