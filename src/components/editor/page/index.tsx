"use client";

import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { getPostPageURL } from "@/lib/utils";
import type { Icon } from "@/types";
import type { Article, Page, Project, User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Editor from "..";
import NavButton from "../../layout/nav-button";
import { Icons } from "../../shared/icons";
import PublishButton from "./publish-button";

export type Post = Article | Project | Page;

export interface EditorPageProps {
  post: Post;
  type: "articles" | "projects" | "pages";
  user: Pick<User, "username" | "newsletter" | "domain">;
}

type PostAction = {
  title: string;
  href?: string;
  icon: Icon;
  command?: () => unknown;
};

export default function EditorPage({ post, type, user }: EditorPageProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const postPath = `/${type}/${post.id}`;
  const [_, copy] = useCopyToClipboard();
  const postURL = getPostPageURL(type, post.slug, user);
  const actions: PostAction[] = [
    {
      title: "Analytics",
      href: type === "pages" ? "/analytics" : `${postPath}/analytics`,
      icon: "areaChart",
    },
    {
      title: "Copy link",
      icon: "link",
      command: () =>
        post.published
          ? copy(postURL)
              .then(() => toast({ title: "Copied" }))
              .catch((err) =>
                toast({ title: "Something went wrong", description: err }),
              )
          : toast({
              title: `You must publish this ${type.slice(0, -1)} to copy URL`,
            }),
    },
  ];

  return (
    <div className="flex flex-col gap-4 pb-20">
      <header className="flex flex-row justify-between gap-2">
        <div className="flex flex-1 flex-row gap-2">
          <NavButton
            href={`/${type}`}
            icon="arrowLeft"
            size="icon"
            aria-label={`Back to ${type}`}
          />
          <NavButton
            href={`${postPath}/settings`}
            icon="settings"
            size="icon"
            aria-label={`Go to ${type} settings`}
          />
          {type === "pages" && (
            <NavButton
              href="/settings/customize/home/help"
              icon="circleHelp"
              size="icon"
              aria-label={`Go to help page`}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="data-[state=open]:bg-gray-3 data-[state=open]:text-secondary"
              >
                <Icons.more size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="text-gray-4">
              {actions.map(({ title, href, icon, command }) => {
                const Icon = Icons[icon];
                return (
                  <DropdownMenuItem
                    className="hover:text-secondary"
                    key={icon}
                    asChild
                  >
                    {href && !command ? (
                      <Link href={href}>
                        <Icon size={16} />
                        {title}
                      </Link>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="justify-start"
                        onClick={command}
                      >
                        <Icon size={16} />
                        {title}
                      </Button>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {post.published && (
          <NavButton
            href={postURL}
            target="_blank"
            variant="text"
            aria-label={`Open ${type.slice(0, -1)}`}
            icon="arrowUpRight"
          />
        )}
        <span className="flex h-4.5 w-max flex-row items-center gap-1 self-end rounded-md text-xs text-gray-4">
          {saving ? (
            <>
              <Icons.spinner className="animate-spin" size={15} /> Saving
            </>
          ) : (
            <>Saved</>
          )}
        </span>
        <PublishButton
          post={post}
          type={type}
          user={user}
          setSaving={setSaving}
        />
      </header>
      <Editor
        endpoint={`${type}/${post.id}`}
        title={post.title}
        content={post.content}
        method="PATCH"
        setSaving={setSaving}
      />
    </div>
  );
}
