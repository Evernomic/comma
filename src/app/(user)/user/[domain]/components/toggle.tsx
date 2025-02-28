"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import useNavigation from "@/hooks/use-navigation";
import { useShallow } from "zustand/react/shallow";
export default function CommandMenuToggle() {
  const setOpen = useNavigation(useShallow((state) => state.setOpen));
  return (
    <Button
      size="icon"
      onClick={() => setOpen(true)}
      aria-label="Navigation"
      variant="secondary"
    >
      <Icons.menu size={15} />
    </Button>
  );
}
