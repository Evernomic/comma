import { Icons } from "@/components/shared/icons";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export const CustomImage = async ({
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
export default function Features() {
  return (
    <section id="features" className="section-container">
      <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1 section-content">
        {marketingConfig.features.map((f) => {
          const Icon = Icons[f.icon];
          return (
            <div
              className="text-gray-4 last:[&_img]:scale-110  w-full flex relative aspect-100/90 max-md:aspect-90/100 bg-primary flex-col border overflow-hidden   p-5 justify-between  gap-3  text-sm rounded-md  cursor-default"
              key={f.title}
            >
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
          );
        })}
      </div>
    </section>
  );
}
