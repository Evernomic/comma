import Form from "@/components/forms/form";
import AppShell from "@/components/layout/app-shell";
import Upgrade from "@/components/shared/upgrade";
import { decrypt } from "@/lib/encryption";
import { getUser } from "@/lib/fetchers/users";
import { getUserSubscription } from "@/lib/subscription";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Beehiiv integration",
};

export default async function Subscribers() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }
  const plan = await getUserSubscription();

  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }

  const endpoint = "user";

  const { beehiivKey, beehiivPublicationId } = user;

  const [key, id] = [
    beehiivKey ? decrypt(beehiivKey) : beehiivKey,
    beehiivPublicationId ? decrypt(beehiivPublicationId) : beehiivPublicationId,
  ];
  return (
    <AppShell>
      <Form
        endpoint={endpoint}
        required={false}
        title="Beehiiv API key"
        description="This key will be used to create the subscription."
        helpText="It will be stored encrypted in the database."
        inputData={{
          name: "beehiivKey",
          placeholder: "Your API key",
          defaultValue: key ?? "",
        }}
      />
      <Form
        endpoint={endpoint}
        required={false}
        title="Beehiiv Publication ID"
        description="This ID will be used to identify your publication when we use the API."
        helpText="It will be stored encrypted in the database."
        inputData={{
          name: "beehiivPublicationId",
          placeholder: "Publication ID",
          defaultValue: id ?? "",
        }}
      />
    </AppShell>
  );
}
