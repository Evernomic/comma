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
import Balancer from "react-wrap-balancer";
import Announcement from "../announcement";
import Carousel from "./carousel";
export default function LinkInBioIntro({ user }: { user: User }) {
  const socialLinks = getLinks(user);
  const links = user.linkInBioLinks as _LinkInBioLink[];
  return (
    <div className="flex flex-col justify-start gap-25 w-full">
      <Avatar className="rounded-md size-12 mb-10">
        {user.image && (
          <AvatarImage src={user.image} alt={`Avatar of ${user.username}`} />
        )}
        <AvatarFallback>
          {getInitials(user.name ?? user.username)}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-4">
        <Announcement
          text={user.announcementText}
          className="max-w-[600px] max-md:w-full"
        />
        <h1 className="text-3xl font-medium">{user.name}</h1>
        <p className="text-gray-4 text-base">
          <Balancer>{user.about ?? user.title ?? user.category}</Balancer>
        </p>
        <div className="flex gap-3 items-center flex-wrap mt-18">
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

      <Carousel
        links={links}
        type={(user.linkInBioLinksViewType as LinkInBioLinkType) ?? "wide"}
      />
    </div>
  );
}
