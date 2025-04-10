import CustomizeNavigation from "@/components/customize/customize-navigation";
import ReorderSections from "@/components/customize/reorder-sections";
import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import NavButton from "@/components/layout/nav-button";
import { defaultThemeOptions } from "@/lib/constants";
import { getUser } from "@/lib/fetchers/users";
import { CustomNavItem, UserPageSection } from "@/types";
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
      <Form endpoint="/" title="Navigation" asChild>
        <CustomizeNavigation defaultLinks={user.navLinks as CustomNavItem[]} />
      </Form>
      <Form endpoint="/" title="Reorder sections" asChild>
        <ReorderSections defaultOrder={user.sections as UserPageSection[]} />
      </Form>
      <Form
        endpoint="user"
        title="Default theme"
        description="Your page will open in your chosen theme by default."
        selectOptions={defaultThemeOptions}
        inputData={{
          placeholder: "Select theme",
          name: "userDefaultTheme",
          defaultValue: user.userDefaultTheme ?? "dark",
        }}
        required
      />
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
