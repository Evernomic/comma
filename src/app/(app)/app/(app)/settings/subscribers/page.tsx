import ExportButton from "@/components/forms/export-button";
import AppShell from "@/components/layout/app-shell";
import NavButton from "@/components/layout/nav-button";
import Upgrade from "@/components/shared/upgrade";
import { getSubscribersByUserId } from "@/lib/fetchers/subscribers";
import { getUser } from "@/lib/fetchers/users";
import { getUserSubscription } from "@/lib/subscription";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import EditNewsletterCTA from "./edit-newsletter-cta";
import Newsletter from "./newsletter";

export const metadata: Metadata = {
  title: "Subscribers",
};

export default async function Subscribers() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }
  const [subscribers, plan] = await Promise.all([
    getSubscribersByUserId(user.id),
    getUserSubscription(),
  ]);

  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }

  const isBeehiivCredentialsAdded =
    user.beehiivKey && user.beehiivPublicationId;
  return (
    <AppShell>
      {user.newsletter ? (
        <>
          <div className="w-full flex max-md:multi-[flex-col;gap-4;items-start] justify-between items-center mb-3">
            <div className="flex gap-2 max-md:flex-col">
              <EditNewsletterCTA defaultNewsletterCta={user.newsletterCta} />
              <ExportButton
                text="Export subscribers"
                icon="download"
                endpoint="subscribers/export"
              />
              <NavButton
                href="/settings/subscribers/beehiiv"
                icon={isBeehiivCredentialsAdded ? "settings" : "plug"}
                buttonVariant="secondary"
                direction="ltr"
              >
                {isBeehiivCredentialsAdded
                  ? "Manage Beehiiv"
                  : "Connect to Beehiiv"}
              </NavButton>
            </div>
            <Newsletter checked={user.newsletter} />
          </div>
          <DataTable
            columns={columns}
            data={subscribers}
            isConnectedToBeehiiv={!!isBeehiivCredentialsAdded}
          />
        </>
      ) : (
        <div className=" flex flex-col gap-2 items-center justify-center border p-3 border-gray-2 text-center text-gray-4 font-me rounded-md text-sm">
          Your newsletter function is not active, you can activate it whenever
          you want.
          <Newsletter checked={user.newsletter} />
        </div>
      )}
    </AppShell>
  );
}
