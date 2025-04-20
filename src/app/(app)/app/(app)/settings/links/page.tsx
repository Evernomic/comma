import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import { getUser } from "@/lib/fetchers/users";
import type { Social } from "@/types";
import type { Metadata } from "next";
import SocialLinks from "./components/links";

export const metadata: Metadata = {
  title: "Links",
};
export default async function Links() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      <Form endpoint="/" title="Social links" asChild>
        <SocialLinks initialLinks={user.links as Social[]} />
      </Form>
    </AppShell>
  );
}
