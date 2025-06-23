"use client";

import LinkInBioLink from "@/components/link-in-bio/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type {
  LinkInBioLink as _LinkInBioLink,
  LinkInBioLinkType,
} from "@/types";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

export default function LinkCarousel({
  links,
  type = "wide",
}: {
  links?: _LinkInBioLink[];
  type?: LinkInBioLinkType;
}) {
  if (!links?.length) {
    return null;
  }
  return (
    <Carousel  plugins={[WheelGesturesPlugin({
     forceWheelAxis: "y",
    })]}>
      <CarouselContent>
        {links.map((link) => {
          return (
            <CarouselItem key={link.id}>
              <LinkInBioLink {...link} type={type} key={link.id} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
