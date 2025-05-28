"use client";

import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function NewLog() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  async function onClick() {
    startTransition(async () => {
      const log = await createLog();
      if (log) {
        router.push(`/admin/changelog/${log.id}`);
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
      aria-label="Write new log"
    >
      New log
    </Button>
  );
}

export async function createLog() {
  const res = await fetch("/api/admin/changelog", {
    method: "POST",
    body: JSON.stringify({
      title: "Untitled log",
      content: "My new log",
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
