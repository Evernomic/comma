"use client";

import LinkInBioLink from "@/components/link-in-bio/link";
import type {
  LinkInBioLink as _LinkInBioLink,
  LinkInBioLinkType,
} from "@/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Carousel({
  links,
  type = "wide",
}: {
  links: _LinkInBioLink[];
  type?: LinkInBioLinkType;
}) {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex gap-10 will-change-transform cursor-grab active:cursor-grabbing"
      >
        {links.map((link) => {
          return <LinkInBioLink {...link} type={type} key={link.id} />;
        })}
      </motion.div>
    </div>
  );
}
