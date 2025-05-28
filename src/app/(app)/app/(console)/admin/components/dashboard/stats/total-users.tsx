import KPICard from "@/components/analytics/kpi-card";
import { getTotalUsersCount } from "@/lib/fetchers/admin";

export default async function TotalUsers() {
  const count = await getTotalUsersCount();
  return <KPICard title="Total users" value={count} />;
}
