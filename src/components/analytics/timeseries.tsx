import { swrOptions } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { use, useCallback } from "react";
import useSWR from "swr";
import { AnalyticsContext } from ".";
import { Icons } from "../shared/icons";
import Card from "./card";
import AreaChart from "./charts/area";

export default function Timeseries() {
  const { interval, basePath, index } = use(AnalyticsContext);

  const { data: total, isLoading } = useSWR<any>(
    `${basePath}/analytics/total?interval=${interval}`,
    fetcher,
    swrOptions,
  );
  const { data: timeseries, isLoading: isTimeseriesLoading } = useSWR<
    { start: string; value: number }[]
  >(
    `${basePath}/analytics/timeseries?interval=${interval}`,
    fetcher,
    swrOptions,
  );

  const formatDate = useCallback(
    (date: Date) => {
      switch (interval) {
        case "1h":
        case "24h":
          return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          });
        case "all":
          return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
        case "7d":
          return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
        default:
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
      }
    },
    [interval],
  );

  return (
    <Card
      title={`${total?.[0].value} Unique ${index}`}
      loading={isLoading}
      className="h-auto"
    >
      {isTimeseriesLoading ? (
        <div className="h-72 flex justify-center items-center">
          <Icons.spinner className="animate-spin text-gray-1" size={18} />
        </div>
      ) : (
        <AreaChart
          data={
            timeseries?.some((d) => d.value > 0)
              ? timeseries.map((d) => {
                  return {
                    start: formatDate(new Date(d.start)),
                    value: d.value,
                  };
                })
              : []
          }
          index={index}
        />
      )}
    </Card>
  );
}
