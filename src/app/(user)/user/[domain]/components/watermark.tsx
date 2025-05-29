import NavButton from "@/components/layout/nav-button";
import { siteConfig } from "@/config/site";
import { getUserViaEdge } from "@/lib/edge";
import type { User } from "@prisma/client";

export default async function Watermark({ user }: { user: Pick<User, "id"> }) {
  const res = await getUserViaEdge(undefined, undefined, user.id);
  if (!res.showBranding) {
    return null;
  }
  return (
    <NavButton
      href={siteConfig.links.home}
      target="_blank"
      aria-label="Powered by Comma"
      buttonVariant="ghost"
      className=" z-[90] bg-gray-3 border  p-1 rounded-full "
      buttonClassname="size-5! rounded-full"
      iconSize={20}
      icon="logo"
    />
  );
}
