import { siteConfig } from "@/config/site";
import { hideOnboardingCheclistForever } from "@/lib/actions/onboarding";
import { db } from "@/lib/db";
import { getUserSubscription } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Button from "../ui/button";
import { Gauge } from "../ui/gauge";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import BlurEffect from "./blur-effect";
import { Icons } from "./icons";

export default async function OnboardingChecklist({ user }: { user?: User }) {
  if (!user) {
    return null;
  }

  const [counts, subscription] = await Promise.all([
    db.user.findUnique({
      where: { id: user.id },
      select: {
        _count: {
          select: {
            pages: true,
            articles: true,
            projects: true,
            bookmarks: true,
            workExperiences: true,
          },
        },
      },
    }),
    getUserSubscription(user.id),
  ]);

  if (!counts) {
    return null;
  }

  const {
    _count: { pages, articles, projects, bookmarks, workExperiences },
  } = counts;

  const postsCount = articles + projects + bookmarks;

  const cookie = (await cookies()).get("hide-onboarding")?.value;

  if (cookie === "forever") {
    return null;
  }

  const tasks = [
    {
      title: "Fill in your profile",
      isCompleted: !!user.title && !!user.name,
      href: "/settings",
    },
    {
      title: "Add SEO details",
      isCompleted: !!user.seoTitle && !!user.seoDescription,
      href: "/settings/seo",
    },
    ...(subscription.isPro
      ? [
          {
            title: "Set up your custom domain",
            isCompleted: !!user.domain,
            href: "/settings",
          },
          {
            title: "Set up newsletter",
            isCompleted: !!user.newsletter,
            href: "/settings/subscribers",
          },
        ]
      : []),
    {
      title: "Create a new page",
      isCompleted: pages > 0,
      href: "/pages",
    },
    {
      title: "Create a post (article, project, work experience or bookmark)",
      isCompleted: postsCount > 0,
      href: "/articles",
    },
  ].filter(Boolean) as {
    title: string;
    isCompleted: boolean;
    href: string;
  }[];

  const completedTasksRate = Math.ceil(
    (tasks.filter((t) => t.isCompleted).length / tasks.length) * 100,
  );

  if (completedTasksRate === 100) {
    return null;
  }

  return (
    <div className="fixed left-0 bottom-0 w-full pb-10 mx-auto flex justify-center max-sm:hidden">
      <BlurEffect />
      <Popover>
        <PopoverTrigger className="bg-gray-3 z-50 cursor-pointer border  text-center px-3 py-2 flex items-center gap-2  rounded-full transition-colors hover:bg-gray-2 data-[state=open]:bg-gray-2">
          <Gauge value={completedTasksRate} />
          <div className="text-sm">Getting started</div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          className="ml-0 p-0 overflow-hidden w-96 max-sm:hidden bg-primary"
          align="center"
          side="top"
        >
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <form action={hideOnboardingCheclistForever}>
              <Button type="submit" size="sm" variant="ghost">
                Dismiss forever
              </Button>
            </form>
            <PopoverClose asChild>
              <Button size="icon" variant="ghost">
                <Icons.chevronDown size={18} />
              </Button>
            </PopoverClose>
          </div>
          <div className="p-3 py-4 bg-gray-3 border-b border-b-gray-2">
            <div className="text-base">Getting started</div>
            <p className="text-sm text-gray-4 mt-1">
              Get familiar with {siteConfig.name} by completing the following
              tasks.
            </p>
          </div>
          <div className="p-3">
            <ul className="text-sm border  rounded-md overflow-hidden divide-y-[1px] divide-gray-2">
              {tasks.map((task) => (
                <Link href={task.href!} key={task.title!.trim().toLowerCase()}>
                  <li
                    className={cn(
                      "flex p-3 text-gray-1 items-center cursor-pointer transition-colors hover:bg-gray-2 group  gap-3 ",
                    )}
                  >
                    {!task.isCompleted ? (
                      <Icons.circleDashed size={20} />
                    ) : (
                      <Icons.circleCheck className="text-grass" size={20} />
                    )}
                    <p className="flex-1 text-secondary">
                      <Balancer>{task.title}</Balancer>
                    </p>
                    <Icons.arrowRight
                      size={20}
                      className="transition-all group-hover:multi-['translate-x-1;text-secondary']"
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
