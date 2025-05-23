import { cn } from "@/lib/utils";
import type { LinkInBioLink, LinkInBioLinkType } from "@/types";
import Image from "next/image";
import NavButton from "../layout/nav-button";

export default function LinkInBioLink({
  title,
  contentTitle,
  description,
  image,
  url,
  type = "wide",
}: LinkInBioLink & { type?: LinkInBioLinkType }) {
  const isCompact = type === "compact";
  return (
    <div
      className={cn(
        "aspect-100/125  relative min-w-80 h-auto border border-gray-3  overflow-hidden p-4.4 rounded-md flex flex-col justify-between",
        {
          "aspect-125/80 p-4 min-w-[300px] justify-baseline gap-5": isCompact,
        },
      )}
    >
      <div className="flex justify-between items-center z-50">
        <div className="text-xs rounded-full bg-gray-2  py-1 px-2 w-max">
          {title}
        </div>
        <NavButton
          href={url}
          target="_blank"
          buttonVariant="ghost"
          buttonClassname="rounded-full text-primary dark:text-secondary"
        >
          See more
        </NavButton>
      </div>

      <div
        className={cn("flex justify-between items-center gap-5", {
          "pr-5": isCompact,
        })}
      >
        {image && (
          <Image
            src={image}
            width={0}
            height={0}
            sizes="100vw"
            className={cn(
              "size-full absolute left-0 top-0 object-cover  z-20",
              {
                "w-40 aspect-video h-auto rounded-md relative": isCompact,
              },
            )}
            alt="Cover image"
            priority
          />
        )}
        <div className="flex flex-col gap-1 flex-1 z-50 text-primary dark:text-secondary">
          <div className="text-sm  font-medium  ">{contentTitle}</div>
          <p
            className={cn("text-xs  ", {
              "text-gray-4": isCompact,
            })}
          >
            {description}
          </p>
        </div>
      </div>

      <div
        className={cn(
          " size-full absolute bg-secondary/20 dark:bg-primary/40 left-0 top-0 z-30 ",
          {
            "bg-gray-3! z-0!": isCompact || !image,
          },
        )}
      />
    </div>
  );
}
