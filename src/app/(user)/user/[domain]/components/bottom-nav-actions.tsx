"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import useNavigation from "@/hooks/use-navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function BottomNavActions() {
  const pathname = usePathname();
  const setOpen = useNavigation(useShallow((state) => state.setOpen));
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && pathname !== "/") {
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

  return null;
}
