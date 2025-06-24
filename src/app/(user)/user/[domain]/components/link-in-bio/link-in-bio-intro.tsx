import MDX from "@/components/markdown/mdx";
import { Icons } from "@/components/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLinks } from "@/config/user-page";
import { getInitials } from "@/lib/utils";
import type {
  LinkInBioLink as _LinkInBioLink,
  LinkInBioLinkType,
  User,
} from "@/types";
import Link from "next/link";
import Announcement from "../announcement";
import LinkCarousel from "./link-carousel";

export default function LinkInBioIntro({ user }: { user: User }) {
  const socialLinks = getLinks(user);
  const links = user.linkInBioLinks as _LinkInBioLink[];
  return (
    <div className="flex flex-col justify-start gap-20 w-full">
      <Avatar className="rounded-md size-15 mb-10">
        {user.image && (
          <AvatarImage src={user.image} alt={`Avatar of ${user.username}`} />
        )}
        <AvatarFallback>
          {getInitials(user.name ?? user.username)}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-4 max-w-[600px] max-md:w-full">
        <Announcement text={user.announcementText} />
        <h1 className="text-3xl font-medium">
          {user.linkInBioTitle ?? user.name ?? user.username}
        </h1>
        <MDX
          className="text-gray-4 text-base"
          source={user.about ?? user.title ?? user.category}
        />
        <div className="flex gap-3 items-center flex-wrap mt-15">
          {socialLinks?.map((link) => {
            return (
              <Link
                href={link.url}
                className="text-gray-4  relative text-sm transition-colors  hover:text-secondary"
                key={link.id}
                target="_blank"
              >
                <span className="flex gap-1">
                  {link.title}
                  <Icons.arrowUpRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <LinkCarousel
        links={links}
        type={(user.linkInBioLinksViewType as LinkInBioLinkType) ?? "wide"}
      />
    </div>
  );
}
