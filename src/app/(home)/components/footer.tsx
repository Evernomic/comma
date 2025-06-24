import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-between  max-md:flex-col w-[900px] max-[960px]:w-full mx-auto max-md:gap-15 items-start border-t  max-md:pr-10 py-20 pb-30">
      <Link href={siteConfig.links.home}>
        <Icons.logo size={30} />
      </Link>
      <div className="grid grid-cols-3 gap-20 max-md:grid-cols-2 max-md:gap-10">
        {marketingConfig.footerSections.map((section) => (
          <div className="flex flex-col gap-3" key={section.name}>
            <div className="text-secondary font-medium  text-sm">
              {section.name}
            </div>
            <ul className="flex flex-col gap-1">
              {section.links.map((link) => (
                <NavButton
                  href={link.href}
                  variant="text"
                  target={
                    link.href.startsWith("https://") ? "_blank" : "_parent"
                  }
                  aria-label={link.name}
                  className="text-sm"
                  key={link.name}
                >
                  {link.name}
                </NavButton>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
