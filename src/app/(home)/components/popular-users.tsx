"use client";
import { Icons } from "@/components/shared/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn, getUserPageURL } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import type { ExplorePageUser } from "../explore/client";

export default function PopularUsers({
  users,
}: {
  users: Array<ExplorePageUser> | null;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const onDotClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  if (!users?.length) {
    return null;
  }

  const sliced = users.slice(0, 10);
  return (
    <section id="features" className="section-container">
      <div className="section-content gap-20">
        <div className="text-4xl text-center font-medium">
          Join our community
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            skipSnaps: true,
          }}
        >
          <CarouselContent className="cursor-w-resize!">
            {sliced.map((u) => {
              return (
                <CarouselItem className="cursor-pointer" key={u.username}>
                  <Link
                    href={getUserPageURL(u)}
                    target="_blank"
                    className="text-gray-4 w-[300px] aspect-square bg-gray-3 group hover:bg-gray-2 transition-colors   flex relative  flex-col  border overflow-hidden   p-5 justify-center items-center  gap-5  text-sm rounded-md "
                  >
                    <div className="flex flex-col text-center">
                      <div className="flex flex-col items-center gap-3">
                        {u.image ? (
                          <Image
                            src={u.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-full size-6"
                            alt={`${u.username}'s avatar`}
                          />
                        ) : (
                          <span className="size-[36px]  bg-gray-2 rounded-full text-gray-4 flex items-center justify-center">
                            <Icons.user size={18} />
                          </span>
                        )}
                        <div className="text-secondary font-medium text-lg">
                          <Balancer>{u.name ?? u.username}</Balancer>
                        </div>
                      </div>
                      <p className="max-w-96 max-md:text-sm text-base font-medium ">
                        <Balancer>
                          {u.title ?? u.category ?? u.location ?? u.username}
                        </Balancer>
                      </p>
                    </div>
                    <span className="absolute  text-gray-1 transition-colors group-hover:text-secondary right-4 top-4">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="flex gap-2 items-center justify-center pt-12">
          {sliced.map((u, i) => {
            return (
              <span
                className={cn(
                  "block size-1.5 cursor-pointer rounded-full bg-gray-2",
                  {
                    "bg-secondary": current === i,
                  },
                )}
                key={u.username}
                onClick={() => onDotClick(i)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
