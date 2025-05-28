import DeleteForm from "@/components/forms/delete-form";
import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { getLogById } from "@/lib/fetchers/admin";
import { formatCustomDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface LogSettingsProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Settings",
};

export default async function ArticleSettings({ params }: LogSettingsProps) {
  const log = await getLogById((await params).id);

  if (!log) {
    return notFound();
  }
  const endpoint = `admin/changelog/${log.id}`;
  return (
    <AppShell>
      <AppHeader asChild className="justify-start text-lg font-medium">
        <NavButton
          href={`/${endpoint}`}
          icon="arrowLeft"
          className="mr-2"
          size="icon"
          aria-label="Back to log"
        />
        Log settings
      </AppHeader>
      <div className="flex flex-col gap-2">
        <Form
          title="Log slug"
          description="This is the URL slug for this log."
          endpoint={endpoint}
          inputData={{
            name: "slug",
            placeholder: "my-article",
            defaultValue: log.slug,
          }}
        />
        <Form
          title="Publish time"
          endpoint={endpoint}
          inputData={{
            name: "publishedAt",
            type: "date",
            "aria-label": "Log published time",
            defaultValue: formatCustomDate(log.publishedAt),
          }}
        />
        <DeleteForm
          title="Delete log"
          description="Enter your log slug"
          keyword={log.slug}
          endpoint={`/${endpoint}`}
          redirectPath="/admin/changelog"
        />
      </div>
    </AppShell>
  );
}
