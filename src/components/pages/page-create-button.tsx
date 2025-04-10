"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";

export default function NewPage() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  async function onClick() {
    startTransition(async () => {
      const page = await createPage();
      if (page) {
        router.push(`/pages/${page.id}`);
        router.refresh();
      }
    });
  }

  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="secondary"
      isPending={isLoading}
      aria-label="Create new page"
    >
      New page
    </Button>
  );
}

export async function createPage() {
  const res = await fetch("/api/pages", {
    method: "POST",
    body: JSON.stringify({
      title: "Untitled page",
      content: "My new page",
    }),
  });

  if (!res?.ok) {
    const body = await res.text();

    toast({
      title: "Something went wrong.",
      description: body,
    });
    return null;
  }
  return await res.json();
}
