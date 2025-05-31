import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import type { AdSpot } from "@/lib/validations/admin";
import Image from "next/image";
import Link from "next/link";

export default function AdSpotItem({ adspot }: { adspot: AdSpot }) {
  return (
    <Link
      href={adspot.url}
      className="group"
      aria-label={adspot.title}
      target="_blank"
    >
      <div className="flex gap-4 items-center -mx-4 transition-colors  hover:bg-gray-3 rounded-md p-4 cursor-pointer">
        {adspot.image ? (
          <Image
            src={adspot.image}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-full size-5"
            alt={`${adspot.title} icon`}
          />
        ) : (
          <span className="size-[36px]  bg-gray-2 rounded-full text-gray-4 flex items-center justify-center">
            <Icons.book size={18} />
          </span>
        )}
        <div className="grow">
          <div className="flex items-center gap-2">

          <h3>{adspot.title}</h3>
          <Badge className="bg-gray-2 font-normal text-secondary ">Promoted</Badge>
          </div>
          <p className="text-gray-4 text-sm">{adspot.description}</p>
        </div>
        <div>
          <Icons.arrowUpRight
            size={20}
            className="text-gray-4 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
      </div>
    </Link>
  );
}
