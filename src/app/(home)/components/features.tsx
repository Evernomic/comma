"use client";
import { Icons } from "@/components/shared/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

export default function Features() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  return (
    <section id="features" className="section-container">
      <div className="section-content">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            skipSnaps: true,
          }}
        >
          <CarouselContent className="cursor-w-resize! ">
            {marketingConfig.features.map((f) => {
              const Icon = Icons[f.icon];
              return (
                <CarouselItem className=" select-none " key={f.title}>
                  <div className="text-gray-4  min-w-[560px] max-[560px]:min-w-[400px]  last:[&_img]:scale-110    w-full flex relative bg-primary flex-col border overflow-hidden   p-5 justify-between  gap-5  text-sm rounded-md ">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Icon size={20} className="text-secondary" />
                        <div className="text-secondary font-semibold text-lg">
                          {f.title}
                        </div>
                      </div>
                      <p className="max-w-96 max-md:text-sm text-base font-medium ">
                        <Balancer>{f.description}</Balancer>
                      </p>
                    </div>
                    <div className="flex-1">
                      <CustomImage src={`${f.image}.png`} alt={f.title} />
                      <CustomImage src={`${f.image}-light.png`} alt={f.title} />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="flex gap-2 items-center justify-center pt-10">
          {marketingConfig.features.slice(0, -1).map((f, i) => {
            return (
              <span
                className={cn(
                  "block size-3.5 cursor-pointer rounded-full bg-gray-2",
                  {
                    "bg-secondary": current === i,
                  },
                )}
                key={f.title}
                onClick={() => onDotClick(i)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const CustomImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full hidden  rounded-md scale-95 max-md:scale-100",
        src.includes("light") ? "dark:hidden block" : "dark:block",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full"
        quality={90}
        priority
      />
    </div>
  );
};
