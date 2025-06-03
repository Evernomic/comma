import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import CTA from "../components/cta";
import Features from "../components/features";
import Hero from "../components/hero";
import HighlightText from "../components/highlight-text";
import PopularUsers from "../components/popular-users";
import Pricing from "../components/pricing";
import type { ExplorePageUser } from "../explore/client";

export const metadata = generateSEO({
  title: `${siteConfig.name} - Open source minimal blogging platform`,
});

async function getPopularUsers(): Promise<Array<ExplorePageUser> | null> {
  const res = await fetch(`${siteConfig.url}/api/explore?page=1&sort=popular`);
  const data = (await res.json()) as { data: Array<ExplorePageUser> };
  return !data.data.length ? null : data.data;
}

export default async function Home() {
  const users = await getPopularUsers();
  return (
    <div className="flex flex-col gap-60 py-30 *:py-10">
      <Hero />
      <HighlightText />
      <Features />
      <Pricing />
      <PopularUsers users={users} />
      <CTA />
    </div>
  );
}
