"use client";

import { validDomainRegex } from "@/lib/constants";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
import { useEffect } from "react";

export default function Track() {
  const pathname = usePathname();
  const params = useParams() as {
    domain: string;
    slug?: string;
  };
  const domain = decodeURIComponent(params.domain);
  const segment = useSelectedLayoutSegment();
  useEffect(() => {
    fetch("/api/analytics/track", {
      method: "POST",
      body: JSON.stringify({
        type:
          segment === "bookmarks"
            ? undefined
            : segment === "(home)"
              ? undefined
              : (segment ?? undefined),
        page: pathname,
        slug: params?.slug ?? undefined,
        domain: validDomainRegex.test(domain) ? domain : undefined,
        username: validDomainRegex.test(domain) ? undefined : domain,
      }),
    });
  }, [pathname, domain, params?.slug, segment]);

  return null;
}
