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
import { userCategories, userLocations } from "@/lib/constants";
import { SelectValue } from "@radix-ui/react-select";
import { useQueryStates } from "nuqs";
import { filterSearchParams } from "./searchParams";

export default function ExplorePageFilters() {
  const [filters, setFilters] = useQueryStates(filterSearchParams, {
    history: "push",
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-between max-md:flex-col">
        <Input
          placeholder="Search people..."
          className="h-4.5  w-[250px] max-md:w-full bg-gray-3"
          defaultValue={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
        <div className="flex gap-2 ">
          <Select
            defaultValue={filters.sort}
            onValueChange={(val) => setFilters({ sort: val })}
            key={filters.sort}
          >
            <SelectTrigger className="h-4.5 w-max bg-gray-3 !text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          <Filter
            name="Category"
            options={userCategories}
            onValueChange={(values) => setFilters({ category: values })}
            defaultValue={filters.category}
            key={`category--${filters.category.length}`}
          />
          <Filter
            name="Location"
            options={userLocations}
            onValueChange={(values) => setFilters({ location: values })}
            defaultValue={filters.location}
            key={`location--${filters.location.length}`}
          />
          {filters.category.length || filters.location.length ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFilters(null)}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
