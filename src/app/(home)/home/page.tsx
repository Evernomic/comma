import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import CTA from "../components/cta";
import Features from "../components/features";
import Hero from "../components/hero";
import Pricing from "../components/pricing";

export const metadata = generateSEO({
  title: `${siteConfig.name} - Open source minimal blogging platform`,
});

export default function Home() {
  return (
    <div className="flex flex-col gap-60 py-30 ">
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
