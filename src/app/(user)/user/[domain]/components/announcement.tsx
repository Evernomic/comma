import MDX from "@/components/markdown/mdx";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { cookies } from "next/headers";
import Hide from "./hide";

export default async function Announcement({
  text,
  className,
  hideIcon = false,
  showHideButton = false,
}: {
  text: string | null;
  className?: string;
  hideIcon?: boolean;
  showHideButton?: boolean;
}) {
  if (!text) {
    return null;
  }
  const cookie = (await cookies()).get("hide-announcement")?.value;

  if (cookie === "true") {
    return null;
  }

  return (
    <div
      role="alert"
      className={cn(
        "rounded-md mb-16 border  bg-gray-3 flex gap-4   items-center break-words py-2 pl-4 pr-6",
        className,
      )}
    >
      {!hideIcon && <Info className="min-w-[18px]" />}
      <MDX
        source={text}
        className="text-gray-4! text-sm prose-headings:mb-2! pr-2"
      />

      {showHideButton && <Hide />}
    </div>
  );
}
