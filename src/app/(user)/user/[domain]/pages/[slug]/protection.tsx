"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import type { Page, User } from "@prisma/client";
import { ReactNode, useActionState } from "react";
import { unlockPage } from "./action";

export default function Protection({
  page,
  user,
  children,
}: {
  page: Pick<Page, "id"> & {
    isProtected: boolean;
  };
  user: Pick<User, "username">;
  children: ReactNode;
}) {
  const [state, formAction, isPending] = useActionState(unlockPage, {
    unlocked: false,
  });
  if (!state.unlocked && page.isProtected) {
    return (
      <div className="w-[300px] mx-auto flex flex-col gap-2 max-md:mt-10">
        <p className="text-sm text-gray-4">
          <b className="text-secondary">{user.username}</b> has made this page
          protected, please enter the password to continue.
        </p>
        <form action={formAction} className="flex flex-col gap-2">
          <input type="hidden" name="pageId" value={page.id} />
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            disabled={isPending}
            className={state?.error ? "focus:border-danger border-danger" : ""}
          />
          {state?.error && <b className="text-xs text-danger">{state.error}</b>}
          <Button type="submit" disabled={isPending}>
            {isPending && <Icons.spinner size={18} className="animate-spin" />}{" "}
            Unlock
          </Button>
        </form>
      </div>
    );
  }
  return children;
}
