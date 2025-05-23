import CustomizeNavigation from "@/components/customize/customize-navigation";
import ReorderSections from "@/components/customize/reorder-sections";
import SelectThemeStyle from "@/components/customize/select-theme-style";
import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import { defaultThemeOptions } from "@/lib/constants";
import { getUser } from "@/lib/fetchers/users";
import { getUserSubscription } from "@/lib/subscription";
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

  const endpoint = "user";

  const plan = await getUserSubscription(user.id);

  return (
    <AppShell>
      <Form endpoint="/" title="Theme style" asChild>
        <SelectThemeStyle defaultTheme={user.theme} />
      </Form>
      <Form endpoint="/" title="Navigation" asChild>
        <CustomizeNavigation defaultLinks={user.navLinks as CustomNavItem[]} />
      </Form>
      <Form endpoint="/" title="Reorder sections" asChild>
        <ReorderSections defaultOrder={user.sections as UserPageSection[]} />
      </Form>
      <Form
        endpoint={endpoint}
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
        title="Bottom navigation"
        description="Show or hide bottom navigation"
        endpoint={endpoint}
        required={false}
        inputData={{
          type: "checkbox",
          name: "showBottomNav",
          defaultChecked: user.showBottomNav,
        }}
        toggle
      />
      <Form
        title="Branding"
        description="Show or hide branding"
        endpoint={endpoint}
        required={false}
        inputData={{
          type: "checkbox",
          name: "showBranding",
          defaultChecked: user.showBranding,
        }}
        toggle
        proFeature={!plan.isPro}
      />
    </AppShell>
  );
}
