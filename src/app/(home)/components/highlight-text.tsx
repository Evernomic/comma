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
  const { theme } = useTheme();
  useGSAP(
    () => {
      const split = new SplitText(".split");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".highlight-text",
            start: "top -90%",
            end: "+=130%",
            scrub: 2,
          },
        })
        .to(split.chars, {
          color: () =>
            getComputedStyle(document.documentElement).getPropertyValue(
              "--foreground",
            ),
          duration: 4,
          stagger: 0.4,
          ease: "power1.inOut",
        });
    },
    { scope: ref, dependencies: [theme] },
  );

  return (
    <div className="w-full h-[250vh] -mb-[60vh]">
      <div
        className="split highlight-text h-[100vh] max-md:text-3xl max-base:text-4xl  text-center sticky top-100 text-gray-2 text-5xl leading-snug font-medium"
        ref={ref}
        key={theme}
      >
        Publish articles, projects and bookmarks. Grow your audience with
        built-in email capture and newsletters. Track it all with detailed
        analytics.
      </div>
    </div>
  );
}
