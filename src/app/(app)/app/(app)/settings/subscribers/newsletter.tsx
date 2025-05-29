"use client";

import { Icons } from "@/components/shared/icons";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useActionState, useEffect } from "react";
import { newsletterToggle } from "./actions";

export default function Newsletter({ checked }: { checked: boolean }) {
  const [state, formAction, isPending] = useActionState(newsletterToggle, null);
  useEffect(() => {
    if (state?.error) {
      toast({
        title: state?.error,
      });
    }
    if (state?.status) {
      toast({
        title:
          state?.status === "on"
            ? "Newsletter is active"
            : "Newsletter is inactive",
      });
    }
  }, [state?.error, state?.status]);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <label htmlFor="newsletter-toggle" className="text-xs font-medium">
        Newsletter
      </label>

      <div className="flex items-center gap-1">
        <Switch
          type="submit"
          name="newsletter"
          id="newsletter-toggle"
          aria-label="Newsletter Toggle"
          defaultChecked={checked}
        />
        {isPending && (
          <Icons.spinner size={15} className="animate-spin text-gray-1" />
        )}
      </div>
    </form>
  );
}
