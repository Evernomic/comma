import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import { linkInBioLinkTypes } from "@/lib/constants";
import { getUser } from "@/lib/fetchers/users";
import type { LinkInBioLink } from "@/types";
import type { Metadata } from "next";
import LinkInBioLinks from "./components/links";

export const metadata: Metadata = {
  title: "Link in bio",
};

export default async function LinkInBioSettings() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      <Form
        endpoint="user"
        title="Title"
        description="This title will be displayed instead of the main title on your link in bio page."
        helpText="Please use 100 characters at maximum."
        inputData={{
          name: "linkInBioTitle",
          placeholder: "Title",
          defaultValue: user.linkInBioTitle ?? "",
          maxLength: 100,
        }}
        required={false}
      />
      <Form
        endpoint="user"
        title="Links view type"
        selectOptions={linkInBioLinkTypes}
        inputData={{
          placeholder: "Select type",
          name: "linkInBioLinksViewType",
          defaultValue: user.linkInBioLinksViewType ?? "wide",
        }}
        required
      />
      <Form endpoint="/" title="Link in bio links" asChild>
        <LinkInBioLinks initialLinks={user.linkInBioLinks as LinkInBioLink[]} />
      </Form>
    </AppShell>
  );
}
