import NavButton from "@/components/layout/nav-button";
import AnimatedLogo from "@/components/shared/animated-logo";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <section className="section-container pt-40 pb-20">
      <div className="flex flex-col items-center gap-2">
        <AnimatedLogo size={70} />
        <h3 className="font-medium text-2xl section-title mt-3">Comma</h3>
        <p className="text-gray-4 text-center">
          <Balancer>{marketingConfig.headline}</Balancer>
        </p>
        <div className="grid grid-cols-2 *:w-full mt-5 mb-2 gap-3 max-md:grid-cols-1 ">
          <NavButton
            href={siteConfig.links.login}
            buttonVariant="secondary"
            size="wide"
            aria-label="Log in"
          >
            Log in
          </NavButton>
          <NavButton
            href={siteConfig.links.signup}
            size="wide"
            buttonVariant="primary"
            aria-label="Create your website"
          >
            Create your website
          </NavButton>
        </div>
        <NavButton
          href={siteConfig.links.demo}
          size="wide"
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
