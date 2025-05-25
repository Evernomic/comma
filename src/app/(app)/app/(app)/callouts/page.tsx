import AddEditCalloutModal from "@/components/callouts/add-edit-callout";
import Callout from "@/components/callouts/callout";
import NoCalloutsPlaceholder from "@/components/callouts/no-callouts-placeholder";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getArticles } from "@/lib/fetchers/articles";
import { getProjects } from "@/lib/fetchers/projects";
import { getCallouts } from "@/lib/fetchers/users";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Callouts",
};

export default async function Callouts() {
  const [callouts, articles, projects] = await Promise.all([
    getCallouts(),
    getArticles({ published: true }),
    getProjects({ published: true }),
  ]);
  return (
    <AppShell>
      <AppHeader title="Callouts">
        <div className="flex gap-2">
          <Link href={`${siteConfig.url}/explore/callouts`} target="_blank">
            <Button variant="ghost" size="sm" className="justify-start gap-2">
              Callouts <Icons.arrowUpRight size={15} />
            </Button>
          </Link>
          <AddEditCalloutModal articles={articles} projects={projects} />
        </div>
      </AppHeader>
      <div>
        {callouts.map((callout) => (
          <Callout
            callout={callout}
            key={callout.id}
            articles={articles}
            projects={projects}
            admin
          />
        ))}
        {!callouts.length && <NoCalloutsPlaceholder />}
      </div>
    </AppShell>
  );
}
