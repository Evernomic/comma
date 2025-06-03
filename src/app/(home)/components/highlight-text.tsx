"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HighlightText() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".split");
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".highlight-text",
      start: "top -55%",
      end: "+=150%",       // Daha geniş scroll alanı: animasyon yavaş ilerler
      scrub: 2,             // Scroll’a daha yavaş yanıt verir
    },
  })
  .to(split.chars, {
    color: "var(--foreground)",
    duration: 4,           // Her harfin rengi 4 saniyede değişir
    stagger: 0.4,          // Harfler arası geçiş süresi artar
    ease: "power1.inOut",  // Çok yumuşak geçiş
  });
    },
    { scope: ref },
  );

  return (
    <div className="h-[250vh] -mb-[60vh]">
      <div
        className="split highlight-text h-[100vh] text-balance max-md:text-3xl max-base:text-4xl  text-center sticky top-100 text-gray-2 text-5xl leading-snug font-medium"
        ref={ref}
      >
        Publish articles, projects and bookmarks. Grow your audience with
        built-in email capture and newsletters. Track it all with detailed
        analytics.
      </div>
    </div>
  );
}
