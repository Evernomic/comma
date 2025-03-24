import ThemeToggle from "@/components/layout/theme-toggle";
import type { User } from "@/types";
import BottomNavActions from "./bottom-nav-actions";
import NewsletterFormModal from "./newsletter-form-modal";
import Watermark from "./watermark";

export default function BottomNav({ user }: { user: User }) {
  return (
    <footer className="fixed left-0 bottom-0 flex items-center gap-2 justify-center  w-full z-40 h-44">
      <BlurEffect />
      <div className="relative bg-gray-3 flex gap-1 border border-gray-2 p-1 w-auto max-w-max  rounded-full z-[90] pointer-events-auto">
        <NewsletterFormModal user={user} />
        <ThemeToggle iconSize={20} compact className="size-5! rounded-full" />
        <BottomNavActions />
      </div>
      <Watermark user={user} />
    </footer>
  );
}

interface BlurLayerConfig {
  blur: number;
  start: number;
  middle: number[];
  end: number | null;
  zIndex: number;
}

const blurLayers: BlurLayerConfig[] = [
  { blur: 0.5, start: 0, middle: [12.5, 25], end: 37.5, zIndex: 1 },
  { blur: 0.55, start: 12.5, middle: [25, 37.5], end: 50, zIndex: 2 },
  { blur: 0.65, start: 25, middle: [37.5, 50], end: 62.5, zIndex: 3 },
  { blur: 0.75, start: 37.5, middle: [50, 62.5], end: 75, zIndex: 4 },
  { blur: 1.2, start: 50, middle: [62.5, 75], end: 87.5, zIndex: 5 },
  { blur: 1.6, start: 62.5, middle: [75, 87.5], end: 100, zIndex: 6 },
  { blur: 2.6, start: 75, middle: [87.5, 100], end: null, zIndex: 7 },
  { blur: 3.6, start: 87.5, middle: [100], end: null, zIndex: 8 },
];

function BlurEffect() {
  const getMaskGradient = (layer: BlurLayerConfig): string => {
    if (layer.end === null) {
      return `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${layer.start}%, rgba(0, 0, 0, 1) ${layer.middle[0]}%)`;
    }
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${layer.start}%, rgba(0, 0, 0, 1) ${layer.middle[0]}%, rgba(0, 0, 0, 1) ${layer.middle[1]}%, rgba(0, 0, 0, 0) ${layer.end}%)`;
  };

  return (
    <div className="absolute bottom-0 size-full">
      {blurLayers.map((layer) => (
        <div
          key={layer.zIndex}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: layer.zIndex,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: getMaskGradient(layer),
            WebkitMaskImage: getMaskGradient(layer),
            borderRadius: "0px",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
