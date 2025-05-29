import Card from "@/components/analytics/card";
import AreaChart from "@/components/analytics/charts/area";
import { getUserTimeseries } from "@/lib/fetchers/admin";

export default async function Timeseries() {
  const res = await getUserTimeseries();
  return (
    <Card title="User signups" className="h-auto col-span-2">
      <AreaChart
        data={
          res?.some((d) => d.value > 0)
            ? res.map((d) => {
                return {
                  start: new Date(d.start).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "2-digit",
                  }),
                  value: d.value,
                };
              })
            : []
        }
        index="users"
      />
    </Card>
  );
}
