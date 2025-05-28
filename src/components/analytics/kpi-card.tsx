import { cn } from "@/lib/utils";
import React from "react";

interface KPICardProps extends React.ComponentProps<"div"> {
  title: string;
  value: number;
}

export default function KPICard({ title, value, className }: KPICardProps) {
  return (
    <div
      className={cn(
        "bg-gray-3 border flex flex-col gap-1 p-3 rounded-md border-gray-2",
        className,
      )}
    >
      <p className="text-gray-4 text-sm">{title}</p>
      <div className="text-2xl font-medium">{value}</div>
    </div>
  );
}
