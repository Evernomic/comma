import NavButton from "@/components/layout/nav-button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Balancer from "react-wrap-balancer";

export default function CTA() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center text-center justify-center gap-12">
        <div className="text-5xl  w-[900px] max-[1000px]:w-full max-md:leading-12  max-md:text-3xl leading-14 font-medium whitespace-pre-line">
          <Balancer>{marketingConfig.cta}</Balancer>
        </div>
        <NavButton
          href={siteConfig.links.signup}
          size="wide"
          buttonVariant="primary"
          direction="ltr"
          buttonClassname="gap-2"
          aria-label="Get started"
        >
          Get started
        </NavButton>
      </div>
    </section>
  );
}
