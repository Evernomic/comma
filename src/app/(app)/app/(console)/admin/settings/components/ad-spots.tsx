"use client";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AdSpot } from "@/lib/validations/admin";
import { Reorder, useDragControls } from "framer-motion";
import ky from "ky";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddEditAdSpotModal from "./add-edit-ad-spot";

export default function AdSpots({
  initialAdSpots,
  startTransition,
}: {
  initialAdSpots: AdSpot[] | null;
  startTransition?: React.TransitionStartFunction;
}) {
  const [adSpots, setAdSpots] = useState<AdSpot[]>(initialAdSpots ?? []);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  async function onDragEnd() {
    if (!isDragging) {
      startTransition?.(async () => {
        const res = await ky.patch("/api/admin", {
          json: { adspots: adSpots },
        });
        if (!res.ok) {
          const error = await res.text();
          toast({
            title: "Something went wrong.",
            description: error,
            variant: "destructive",
          });
        } else {
          router.refresh();
          toast({
            title: "Saved",
          });
        }
      });
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isDragging) {
      onDragEnd();
    }
  }, [adSpots, isDragging]);

  return (
    <div>
      <Reorder.Group axis="y" onReorder={setAdSpots} values={adSpots}>
        <div className="space-y-2">
          <AddEditAdSpotModal
            initialAdSpots={initialAdSpots ?? []}
            setAdSpots={setAdSpots}
          />
          {adSpots.map((adSpot) => (
            <AdSpotItem
              adSpot={adSpot}
              adSpots={adSpots}
              setAdSpots={setAdSpots}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              onDragEnd={onDragEnd}
              key={adSpot.id}
            />
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
}

function AdSpotItem({
  adSpot,
  adSpots,
  setAdSpots,
  onDragEnd,
  isDragging,
  setIsDragging,
}: {
  adSpot: AdSpot;
  adSpots: AdSpot[];
  setAdSpots: Dispatch<SetStateAction<AdSpot[]>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={adSpot}
      dragListener={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        onDragEnd();
        setIsDragging(false);
      }}
      dragControls={controls}
    >
      <div className="rounded-md flex gap-2   items-start text-sm text-gray-4 p-2 h-auto  w-full bg-gray-3">
        <Button
          className={cn(
            "reorder-handle size-4.4 cursor-grab",
            isDragging && "cursor-grabbing",
          )}
          variant="ghost"
          size="icon"
          onPointerDown={(e) => {
            controls.start(e);
            setIsDragging(true);
          }}
        >
          <Icons.gripVertical size={15} />
        </Button>
        <div className="flex gap-3 flex-1 items-center">
          {adSpot.image && (
            <Image
              src={adSpot.image}
              width={0}
              height={0}
              sizes="100vw"
              className={cn("size-5 border rounded-md")}
              alt="Cover image"
              priority
            />
          )}
          <div className="flex flex-col">
            <div className="font-medium grow flex gap-1 items-center truncate text-secondary">
              {adSpot.title}{" "}
              <p className="text-xs text-gray-4">
                {adSpot.place === "callouts" ? "Callouts page" : "Explore page"}
              </p>
            </div>
            <p className="text-xs">{adSpot.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="size-4.4 text-danger! enabled:hover:text-danger!"
            variant="ghost"
            size="icon"
            onClick={() =>
              setAdSpots((prev) => prev.filter((l) => l.id !== adSpot.id))
            }
          >
            <Icons.trash size={15} />
          </Button>
          <AddEditAdSpotModal
            initialAdSpots={adSpots}
            setAdSpots={setAdSpots}
            adSpot={adSpot}
            edit
          />
        </div>
      </div>
    </Reorder.Item>
  );
}
