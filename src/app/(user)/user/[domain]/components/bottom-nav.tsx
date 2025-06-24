import ThemeToggle from "@/components/layout/theme-toggle";
import BlurEffect from "@/components/shared/blur-effect";
import type { User } from "@/types";
import { Suspense } from "react";
import NewsletterModalWrapper from "./newsletter-form-wrapper";
import Watermark from "./watermark";

export default function BottomNav({
  user,
  hideBlur = false,
}: {
  user: User;
  hideBlur?: boolean;
}) {
  return (
    <footer className="fixed left-0 bottom-0 flex items-center gap-2 justify-center  w-full z-40 h-44">
      {!hideBlur && <BlurEffect />}
      <div className="relative bg-gray-3 flex gap-1 border  p-1 w-auto max-w-max  rounded-full z-[90] pointer-events-auto">
        <Suspense>
          <NewsletterModalWrapper user={user} />
        </Suspense>
        <ThemeToggle iconSize={20} compact className="size-5! rounded-full" />
      </div>
      <Watermark user={user} />
    </footer>
  );
}
