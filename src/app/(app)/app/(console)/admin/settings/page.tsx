import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { redis } from "@/lib/redis";
import { AdminConfig } from "@/lib/validations/admin";

import type { Metadata } from "next";
import AdSpots from "./components/ad-spots";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
  const config = await redis.json.get<AdminConfig>("config");
  return (
    <AppShell>
      <AppHeader title="Settings" />
      <div className="flex flex-col gap-2">
        <Form
          type="textarea"
          endpoint="admin"
          title="Announcement"
          description="This text will be displayed publicly on the app."
          helpText="Markdown is supported."
          textareaData={{
            name: "announcementText",
            placeholder: "Announcement",
            defaultValue: config?.announcementText ?? "",
          }}
          required={false}
        />
        <Form endpoint="/" title="Ad spots" asChild>
          <AdSpots initialAdSpots={config?.adspots ?? []} />
        </Form>
      </div>
    </AppShell>
  );
}
