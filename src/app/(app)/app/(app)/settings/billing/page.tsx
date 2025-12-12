import BillingForm from "@/components/forms/billing-form";
import AppShell from "@/components/layout/app-shell";
import { getUser } from "@/lib/fetchers/users";
import { getUserSubscription } from "@/lib/subscription";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Billing",
};
export default async function BillingPage() {
  const [subscription, user] = await Promise.all([
    getUserSubscription(),
    getUser(),
  ]);

  if (!user) {
    return notFound();
  }

  return (
    <AppShell>
      <BillingForm subscriptionPlan={subscription} user={user} />
    </AppShell>
  );
}
