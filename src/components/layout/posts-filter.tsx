import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PostsFilter({
  segment,
  current,
}: {
  segment: string;
  current?: string;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-2 mb-2">
      {appConfig.filters.postsFilter.map((filter) => (
        <Link
          href={filter.href === "/" ? `/${segment}` : filter.href}
          className={cn(
            "rounded-md cursor-pointer  border w-max  h-4 flex items-center justify-center px-1 text-xs text-gray-4",
            current === filter.value ? "bg-gray-2 text-secondary " : "",
          )}
          key={filter.title}
        >
          {filter.title}
        </Link>
      ))}
    </div>
  );
}
