import ReorderSections from "@/components/customize/reorder-sections";
import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import NavButton from "@/components/layout/nav-button";
import { getUser } from "@/lib/fetchers/users";
import { UserPageSection } from "@/types";
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
        <ReorderSections defaultOrder={user.sections as UserPageSection[]} />
      </Form>
      <Form
        title="Custom home page"
        description="Edit your homepage with the editor."
        endpoint="user"
        required={false}
        inputData={{
          type: "checkbox",
          name: "showCustomHomePage",
          defaultChecked: user.showCustomHomePage,
        }}
        toggle
        suffix={
          <NavButton
            href="/settings/customize/home"
            icon="edit"
            className="ml-2"
            direction="ltr"
            buttonVariant="secondary"
          >
            Edit home page
          </NavButton>
        }
      />
    </AppShell>
  );
}
