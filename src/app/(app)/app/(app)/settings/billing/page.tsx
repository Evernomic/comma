import BillingForm from "@/components/forms/billing-form";
import AppShell from "@/components/layout/app-shell";
import { getUserSubscription } from "@/lib/subscription";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};
export default async function BillingPage() {
  const subscription = await getUserSubscription();

  return (
    <AppShell>
      <BillingForm subscriptionPlan={subscription} />
    </AppShell>
  );
}
