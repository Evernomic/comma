"use client";

import Button from "@/components/ui/button";
import { hideAnnouncement } from "@/lib/actions/users";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function Hide({ text }: { text: string }) {
  return (
    <form className="absolute right-4.4" action={() => hideAnnouncement(text)}>
      <Action />
    </form>
  );
}
function Action() {
  const { pending } = useFormStatus();
  return (
    <Button variant="secondary" size="icon" type="submit" isPending={pending}>
      <X size={18} />
    </Button>
  );
}
