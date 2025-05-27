import NavButton from "@/components/layout/nav-button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <section className="section-container  min-h-1/2 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 ">
        <div className="min-w-1/2 max-md:w-full  text-3xl font-semibold text-center whitespace-pre-line">
          <Balancer>{marketingConfig.headline}</Balancer>
        </div>
        <div className="grid grid-cols-2 *:w-full mt-5 mb-2 gap-3 ">
          <NavButton
            href={siteConfig.links.signup}
            size="wide"
            buttonVariant="primary"
            icon="login"
            direction="ltr"
            buttonClassname="gap-2"
            aria-label="Sign up to Comma"
          >
            Sign up
          </NavButton>
          <NavButton
            href="/explore"
            size="wide"
            buttonClassname="gap-2"
            icon="search"
            direction="ltr"
            aria-label="Go Explore page"
          >
            Explore
          </NavButton>
        </div>
        <NavButton
          href={siteConfig.links.demo}
          size="wide"
          icon="arrowUpRight"
          buttonVariant="ghost"
          target="_blank"
          aria-label="See a sample website"
        >
          See a sample website
        </NavButton>
      </div>
    </section>
  );
}
