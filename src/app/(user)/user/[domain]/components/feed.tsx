import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";


const feeds = [
  {
    type: "rss",
    title: "RSS",
    href: "/feed",
  },
  {
    type: "atom",
    title: "Atom",
    href: "/feed?type=atom",
  },
] as const;

export default function Feed() {
    return (
      <div className="flex gap-2 w-full mt-2 pb-2 justify-center">
        {feeds.map((feed) => (
          <NavButton
            href={feed.href}
            buttonVariant="secondary"
            buttonClassname="gap-2"
            size="sm"
            target="_blank"
            key={feed.type}
          >
             {feed.title}
          </NavButton>
        ))}
      </div>
    );

}
