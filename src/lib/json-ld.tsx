import type { Article, Graph, Organization, Person, WebPage } from "schema-dts";

export function getJSONLDScript(
  data: Person | Organization | Article | Graph | WebPage,
) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
