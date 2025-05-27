import NavButton from "@/components/layout/nav-button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Balancer from "react-wrap-balancer";

export default function CTA() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center text-center justify-center gap-5">
        <div className="text-3xl font-semibold whitespace-pre-line">
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
