"use client";
import {
  Area,
  AreaChart as RechartsChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { IndexProps } from "..";

export default function AreaChart({
  data,
  index = "visitors",
}: {
  data: { start: string; value: number }[];
  index?: IndexProps;
}) {
  if (data.every((d) => d.value === 0)) {
    return (
      <div className="h-72 grid place-items-center text-sm text-gray-4">
        No data yet
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={288} className="text-xs">
      <RechartsChart
        data={data.map((d) => {
          return {
            start: d.start,
            [index as string]: d.value || 0,
          };
        })}
        margin={{
          top: 20,
          right: 40,
          left: -20,
          bottom: 15,
        }}
      >
        <XAxis
          dataKey="start"
          dy={15}
          axisLine={false}
          stroke="var(--gray-4)"
          tickLine={false}
        />
        <YAxis
          dataKey={index}
          axisLine={false}
          allowDecimals={false}
          tickLine={false}
          stroke="var(--gray-4)"
        />
        <RechartsTooltip
          content={<Tooltip />}
          cursor={{ stroke: "var(--gray-2)" }}
        />
        <Area
          type="monotone"
          dataKey={index}
          stroke="var(--gray-2)"
          fill="var(--gray-3)"
          activeDot={{ stroke: "var(--gray-1)", fill: "var(--gray-1)" }}
        />
      </RechartsChart>
    </ResponsiveContainer>
  );
}

function Tooltip({ payload, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="flex min-w-20 flex-col  gap-1 rounded-md border   bg-gray-3 px-3 py-2">
        <b className="text-gray-4">{payload[0].payload.start}</b>
        <p className="text-secondary">
          <b>{payload?.[0]?.value}</b> {payload?.[0]?.name}
        </p>
      </div>
    );
  }
  return null;
}
