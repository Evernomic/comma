import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { generateSEO } from "@/lib/utils";
import { Suspense } from "react";
import QueryProvider from "../query-provider";
import Client from "./client";

export const metadata = generateSEO({
  title: "Callouts",
});

export default function CalloutsPage() {
  return (
    <AppShell className="pt-20 gap-5 min-h-screen">
      <AppHeader
        title="Callouts"
        description="You can follow the calls of Comma users here."
        className="[&_.title]:multi-[text-3xl;font-semibold] [&_.description]:text-base max-md:multi-[flex-col;items-start;gap-5]"
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
          <Client />
        </Suspense>
      </QueryProvider>
    </AppShell>
  );
}
