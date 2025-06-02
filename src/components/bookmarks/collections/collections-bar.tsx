"use client";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Collection } from "@prisma/client";
import { useQueryState } from "nuqs";

export default function CollectionBar({
  collections,
}: {
  collections: Collection[];
}) {
  const [collection, setCollection] = useQueryState("collection", {
    history: "push",
  });
  return (
    <div className="flex flex-row flex-wrap gap-2 mb-2">
      <Button
        onClick={() => setCollection(null)}
        className={cn(
          "rounded-md cursor-pointer h-4 hover:bg-gray-3 transition-colors  border w-max   px-1.5 text-xs text-gray-4",
          !collection ? "bg-gray-2 font-medium text-secondary" : "",
        )}
        size="sm"
      >
        All
      </Button>
      {collections.map((item) => (
        <Button
          onClick={() => setCollection(item.name)}
          className={cn(
            "rounded-md cursor-pointer h-4 hover:bg-gray-3 transition-colors border w-max   px-1 text-xs text-gray-4",
            collection === item.name
              ? "bg-gray-2 text-secondary font-medium"
              : "",
          )}
          key={item.id}
          size="sm"
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}
