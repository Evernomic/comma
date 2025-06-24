import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import CTA from "../components/cta";
import Features from "../components/features";
import Hero from "../components/hero";
import HighlightText from "../components/highlight-text";
import Previews from "../components/previews";
import Pricing from "../components/pricing";

export const metadata = generateSEO({
  title: `${siteConfig.name} - Open source minimal blogging platform`,
});

export default async function Home() {
  return (
    <div className="flex flex-col gap-60 pb-30  *:pb-10">
      <Hero />
      <HighlightText />
      <Previews />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
