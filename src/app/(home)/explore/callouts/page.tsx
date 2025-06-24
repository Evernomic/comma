import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { getAdminConfig } from "@/lib/fetchers/admin";
import { generateSEO } from "@/lib/utils";
import { Suspense } from "react";
import QueryProvider from "../query-provider";
import Client from "./client";

export const metadata = generateSEO({
  title: "Callouts",
});

export default async function CalloutsPage() {
  const config = await getAdminConfig();
  const adspots =
    config?.adspots?.filter((ad) => ad.place === "callouts") ?? [];

  return (
    <AppShell className="pt-10 gap-5 min-h-screen w-[900px] max-[960px]:w-full mx-auto">
      <AppHeader
        title="Callouts"
        description="You can follow the calls of Comma users here."
        className="[&_.title]:multi-['text-3xl;font-semibold'] [&_.description]:text-base max-md:multi-['flex-col;items-start;gap-5']"
      >
        <div className="flex gap-2">
          <NavButton
            href="/explore"
            icon="arrowLeft"
            direction="ltr"
            buttonVariant="ghost"
            buttonClassname="gap-2"
            aria-label="Back to explore"
          >
            Back to explore
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
