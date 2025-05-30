"use client";
import UploadImage from "@/components/forms/upload-image";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type AdSpot, adSpotSchema } from "@/lib/validations/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { flushSync } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const schema = adSpotSchema.omit({ id: true });

type FormData = z.infer<typeof schema>;

export default function AddEditAdSpotModal({
  initialAdSpots,
  adSpot,
  setAdSpots,
  edit,
}: {
  initialAdSpots: AdSpot[];
  adSpot?: AdSpot;
  setAdSpots: Dispatch<SetStateAction<AdSpot[]>>;
  edit?: boolean;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [imageURL, setImageURL] = useState<string | null>(null);

  const { title } = useMemo(() => {
    if (edit && adSpot) {
      return {
        title: "Edit ad spot",
      };
    } else {
      return {
        title: "Add ad spot",
      };
    }
  }, [edit, adSpot]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: adSpot!,
  });

  useEffect(() => {
    if (!showModal) {
      reset();
      setImageURL(null);
    } else {
      setImageURL(adSpot?.image ?? null);
    }
  }, [showModal]);

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const updated = [
        ...(initialAdSpots
          ? adSpot && edit
            ? initialAdSpots.map((a) =>
                a.id === adSpot.id ? { ...data, id: a.id } : a,
              )
            : [...initialAdSpots, { ...data, id: nanoid() }]
          : [{ ...data, id: nanoid() }]),
      ];

      setAdSpots(updated);
      setShowModal(false);
    });
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        {edit ? (
          <Button variant="ghost" size="icon" className="size-4.4">
            <Icons.edit size={15} />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            aria-label={title}
            title={title}
          />
        )}
      </DialogTrigger>
      <DialogContent className="min-h-max!">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="add-edit-ad-spot"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Title"
            error={!!errors.title}
            disabled={isPending}
            {...register("title")}
          />
          <Input
            placeholder="Description"
            error={!!errors.description}
            disabled={isPending}
            {...register("description")}
          />
          <Input
            type="url"
            placeholder="URL"
            error={!!errors.url}
            disabled={isPending}
            {...register("url")}
          />
          <Controller
            control={control}
            name="place"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={onChange}
                defaultValue={adSpot?.place}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explore">Explore page</SelectItem>
                  <SelectItem value="callouts">Callouts page</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <UploadImage
            inline
            helpText={`Click to ${imageURL ? "change icon" : "upload icon"} (Max 4MB)`}
            onUploadCompleted={(url) => {
              flushSync(() => {
                setValue("image", url);
                setImageURL(url);
              });
            }}
          />
          {imageURL && (
            <div className="flex gap-2 ">
              <Image
                src={imageURL}
                width={0}
                height={0}
                sizes="100vw"
                className={cn("size-7 h-auto  rounded-md")}
                alt="Cover image"
                unoptimized
              />
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={isPending}
                autoFocus={false}
                onClick={() => {
                  setImageURL(null);
                  setValue("image", null);
                }}
              >
                Delete icon
              </Button>
            </div>
          )}
        </form>
        <DialogFooter>
          <Button
            form="add-edit-ad-spot"
            type="submit"
            isPending={isPending}
            size="sm"
          >
            {edit ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
