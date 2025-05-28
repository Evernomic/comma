import KPICard from "@/components/analytics/kpi-card";
import { getActiveSubscriptionsCount } from "@/lib/fetchers/admin";

export default async function ActiveSubs() {
  const count = await getActiveSubscriptionsCount();
  return <KPICard title="Active subscriptions" value={count ?? 0} />;
}
