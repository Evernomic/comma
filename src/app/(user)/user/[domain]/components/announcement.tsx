import MDX from "@/components/markdown/mdx";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export default function Announcement({
  text,
  className,
}: {
  text: string | null;
  className?: string;
}) {
  if (!text) {
    return null;
  }
  return (
    <div
      role="alert"
      className={cn(
        "rounded-md mb-16 border border-gray-2 bg-gray-3 flex gap-4   items-center break-words py-2 pl-4 pr-6",
        className,
      )}
    >
      <Info className="min-w-[18px]" />
      <MDX source={text} className="text-gray-4! text-sm pr-2" />
    </div>
  );
}
