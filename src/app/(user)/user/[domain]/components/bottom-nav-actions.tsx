"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import useNavigation from "@/hooks/use-navigation";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export default function BottomNavActions() {
  const pathname = usePathname();
  const setOpen = useNavigation(useShallow((state) => state.setOpen));
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="hidden max-md:flex">
      <Button
        size="icon"
        className="size-5! rounded-full"
        onClick={() => setOpen(true)}
        variant="ghost"
        aria-label="Open navigation"
      >
        <Icons.menu size={20} />
      </Button>
    </div>
  );
}
