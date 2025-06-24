import NavButton from "@/components/layout/nav-button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Balancer from "react-wrap-balancer";
import type { ExplorePageUser } from "../explore/client";
import PopularUsers from "./popular-users";

async function getPopularUsers(): Promise<Array<ExplorePageUser> | null> {
  const res = await fetch(`${siteConfig.url}/api/explore?page=1&sort=popular`);
  const data = (await res.json()) as { data: Array<ExplorePageUser> };
  return !data.data.length ? null : data.data;
}

export default async function Hero() {
  const users = await getPopularUsers();

  return (
    <section className="section-container   h-[90vh] flex flex-col gap-20 pt-20">
      <div className="flex flex-col items-center gap-1 ">
        <div className="w-[900px] max-[1000px]:w-full  max-md:w-full max-md:text-4xl max-md:leading-12 text-6xl leading-15 font-medium text-center whitespace-pre-line">
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
      <PopularUsers users={users} />
    </section>
  );
}
