import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const filterSearchParams = {
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("recent"),
  category: parseAsArrayOf(parseAsString, ",").withDefault([]),
  location: parseAsArrayOf(parseAsString, ",").withDefault([]),
  page: parseAsInteger.withDefault(0),
};

export const loadSearchParams = createLoader(filterSearchParams);
