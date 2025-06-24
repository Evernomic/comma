"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { marketingConfig } from "@/config/marketing";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

export default function Features() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(1);

  const matches = useMediaQuery("(min-width: 960px)");

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
            align: "center",
            active: !!matches,
            slidesToScroll: 2,
            dragFree: true,
          }}
        >
          <CarouselContent className="max-md:flex-col gap-0   max-md:gap-10">
            {marketingConfig.features.map((f) => {
              return (
                <CarouselItem className=" select-none " key={f.title}>
                  <div className="text-gray-4  aspect-80/100  min-w-110 max-md:multi-['aspect-auto;min-w-full'] flex relative bg-primary flex-col border overflow-hidden    justify-between    text-sm rounded-md ">
                    <div className="flex flex-col  bg-gray-3 gap-2  p-5">
                      <div className="flex items-center gap-2">
                        <div className="text-secondary font-medium text-xl">
                          {f.title}
                        </div>
                      </div>
                      <p className="max-w-96 text-base font-medium ">
                        <Balancer>{f.description}</Balancer>
                      </p>
                    </div>
                    <div className=" flex-1 relative border-t px-1 pt-3 ">
                      <CustomImage src={`${f.image}.png`} alt={f.title} />
                      <CustomImage src={`${f.image}-light.png`} alt={f.title} />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex gap-2 items-center justify-center pt-12 max-md:hidden">
          {Array.from({ length: count })
            .fill(true)
            .map((_, i) => {
              return (
                <span
                  className={cn(
                    "block size-1.5 cursor-pointer rounded-full bg-gray-2",
                    {
                      "bg-secondary": current === i,
                    },
                  )}
                  key={`carousel${i}`}
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
        "w-full hidden rounded-md ",
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
