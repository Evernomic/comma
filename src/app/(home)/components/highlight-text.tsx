"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useTheme } from "next-themes";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HighlightText() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useGSAP(
    () => {
      const split = new SplitText(".split");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".highlight-text",
            start: "top -70%",
            end: "+=20%",
            scrub: 0.3,
          },
        })
        .set(
          split.chars,
          {
            color: "var(--foreground)",
            stagger: 0.3,
            transitionDuration: 0.4,
            ease: "bounce.inOut",
          },
          0.2,
        );
    },
    { scope: ref },
  );

  return (
    <div className="h-[170vh]">
      <div
        className="split highlight-text h-[100vh] text-balance max-md:text-3xl max-base:text-4xl  text-center sticky top-100 text-gray-1 text-5xl leading-snug font-medium"
        ref={ref}
      >
        Publish articles, projects and bookmarks. Grow your audience with
        built-in email capture and newsletters. Track it all with detailed
        analytics.
      </div>
    </div>
  );
}
