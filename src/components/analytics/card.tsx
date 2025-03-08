import { cn } from "@/lib/utils";
import type React from "react";
import type { SetStateAction } from "react";
import Button from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface Props {
  children: React.ReactNode;
  title: string;
  tabs?: string[];
  loading?: boolean;
  setTab?: React.Dispatch<SetStateAction<any>>;
  activeTab?: string;
  className?: string;
}

export default function Card({
  children,
  title,
  tabs,
  setTab,
  activeTab,
  className,
  loading,
}: Props) {
  return (
    <div
      className={cn(
        "h-[200px] flex flex-col  rounded-md border overflow-hidden border-gray-2 dark:border-gray-3",
        className,
      )}
    >
      <header className="rounded-se-md rounded-t-md h-5  flex items-center justify-between  border-b border-gray-2 dark:border-gray-3 p-2 backdrop-blur-md">
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          <h3 className="text-sm font-medium">{title}</h3>
        )}
        {tabs && (
          <div className="flex gap-1">
            {tabs.map((tab, i) => (
              <Button
                title={tab}
                variant="ghost"
                className={cn(
                  "h-4.4 text-xs",
                  tab.toLowerCase() === activeTab
                    ? "bg-gray-3 text-secondary"
                    : "",
                )}
                onClick={() => setTab?.(tab.toLowerCase())}
                key={i}
              />
            ))}
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
