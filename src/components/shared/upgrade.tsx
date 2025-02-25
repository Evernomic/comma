import { cn } from "@/lib/utils";
import NavButton from "../layout/nav-button";

export default function Upgrade({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 w-full h-full backdrop-blur-sm flex rounded-md border border-gray-3 flex-col justify-center gap-2 z-10 items-center",
        className,
      )}
    >
      <p className="max-w-[400px] text-center text-secondary ">
        {!title
          ? "You can't use this feature in the free plan. Upgrade to a Pro plan to proceed."
          : title}
      </p>
      <NavButton
        icon="arrowRight"
        href="/settings/billing"
        buttonClassname="w-max px-2 text-secondary"
      >
        Upgrade
      </NavButton>
    </div>
  );
}
