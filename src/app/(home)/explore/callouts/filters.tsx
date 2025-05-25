"use client";
import Button from "@/components/ui/button";
import { Filter } from "@/components/ui/filter";
import Input from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { calloutCategories } from "@/lib/constants";
import { SelectValue } from "@radix-ui/react-select";
import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { filterSearchParams } from "./searchParams";

export default function ExplorePageFilters() {
  const [filters, setFilters] = useQueryStates(filterSearchParams, {
    history: "push",
  });

  const debouncedSearch = useDebouncedCallback(
    ({ search }: { search: string }) => setFilters({ search }),
    350,
  );

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-between max-md:flex-col">
        <div className="flex gap-2 flex-1 grow">
          <Input
            placeholder="Search callouts..."
            className="h-4.5  max-w-[300px]"
            defaultValue={filters.search}
            onChange={(e) => debouncedSearch({ search: e.target.value })}
          />
        </div>
        <div className="flex gap-2 max-md:*:max-w-full">
          <Select
            defaultValue={filters.sort}
            onValueChange={(val) => setFilters({ sort: val })}
            key={filters.sort}
          >
            <SelectTrigger className="h-4.5 w-max bg-gray-3 text-xs! cursor-pointer hover:bg-gray-2 transition-colors data-[state=open]:bg-gray-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          <Filter
            name="Category"
            options={calloutCategories}
            onValueChange={(values) => setFilters({ category: values })}
            defaultValue={filters.category}
            key={`category--${filters.category.length}`}
          />
        </div>
        {filters.category.length ? (
          <Button
            variant="secondary"
            size="sm"
            className="w-max max-md:w-full"
            onClick={() => setFilters(null)}
          >
            Clear filters
          </Button>
        ) : null}
      </div>
    </div>
  );
}
