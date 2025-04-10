"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button size="sm" onClick={router.back}>
      <Icons.arrowLeft size={18} /> Back to editor
    </Button>
  );
}
