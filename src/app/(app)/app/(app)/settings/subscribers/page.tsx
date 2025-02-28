import ExportButton from "@/components/forms/export-button";
import Upgrade from "@/components/shared/upgrade";
import { Badge } from "@/components/ui/badge";
import { getSubscribersByUserId } from "@/lib/fetchers/subscribers";
import { getUser } from "@/lib/fetchers/users";
import { getUserSubscription } from "@/lib/subscription";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Newsletter from "./newsletter";
import EditNewsletterCTA from "./edit-newsletter-cta";

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
  return (
    <div className="flex flex-col gap-2 ">
      {user.newsletter ? (
        <>
          <div className="w-full flex justify-between items-center mb-3">
            <div className="flex gap-2">
              <Badge>{subscribers.length} Subscribers</Badge>
              <EditNewsletterCTA defaultNewsletterCta={user.newsletterCta} />
              <ExportButton
                text="Export subscribers"
                icon="download"
                endpoint="subscribers/export"
              />
            </div>
            <Newsletter checked={user.newsletter} />
          </div>
          <DataTable columns={columns} data={subscribers} />
        </>
      ) : (
        <div className=" flex flex-col gap-2 items-center justify-center border p-3 border-gray-2 text-center text-gray-1 rounded-md text-sm">
          Your newsletter function is not active, you can activate it whenever
          you want.
          <Newsletter checked={user.newsletter} />
        </div>
      )}
    </div>
  );
}
