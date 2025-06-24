"use client";
import { type CarouselApi } from "@/components/ui/carousel";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

export default function Previews() {
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

  return (
    <section id="themes" className="section-container">
      <div className="w-full section-content gap-20">
        {marketingConfig.previews.map((p, i) => {
          const isSingle = i % 2 !== 0;
          return (
            <div
              className={cn(
                "text-gray-4 min-h-[100vh]  w-full  flex relative bg-primary items-center  max-md:flex-col  justify-between    text-sm",
                {
                  "flex-row-reverse justify-center": isSingle,
                },
              )}
              key={p.title}
            >
              <div
                className={cn("flex flex-col flex-1  gap-2", {
                  "text-end max-md:text-start": isSingle,
                })}
              >
                <div className="text-secondary font-medium text-2xl">
                  {p.title}
                </div>
                <p className="max-w-120 text-lg font-medium ">
                  <Balancer>{p.description}</Balancer>
                </p>
              </div>
              <div
                className={cn(
                  " flex-1 relative overflow-hidden    flex  items-center  ",
                  {
                    "justify-end ": !isSingle,
                  },
                )}
              >
                <CustomVideo src={`${p.src}.mp4`} />
                <CustomVideo src={`${p.src}-light.mp4`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const CustomVideo = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " hidden  rounded-3xl border-5   w-max overflow-hidden",
        src.includes("light") ? "dark:hidden block" : "dark:block",
        className,
      )}
    >
      <video
        src={src}
        className="w-[330px]"
        autoPlay
        loop
        muted
        controls={false}
      />
    </div>
  );
};
