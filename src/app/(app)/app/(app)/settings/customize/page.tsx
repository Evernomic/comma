import ReorderSections from "@/components/customize/reorder-sections";
import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import { getUser } from "@/lib/fetchers/users";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize",
};

export default async function CustomizePage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      <Form endpoint="/" title="Reorder sections" asChild>
        <ReorderSections defaultOrder={user.sectionsOrder} />
      </Form>
    </AppShell>
  );
}
