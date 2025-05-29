"use client";

import type { StorageFolders } from "@/lib/constants";
import { uploadFile } from "@/lib/upload";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";

interface Props {
  title?: string;
  description?: string;
  helpText: string;
  endpoint?: string;
  method?: "PATCH";
  defaultValue?: string | null;
  name?: string;
  folder?: (typeof StorageFolders)[number];
  previewImageSize?: number;
  inline?: boolean;
  onUploadCompleted?: (url: string | null) => void;
}

export default function UploadImage({
  inline,
  title,
  description,
  helpText,
  endpoint,
  method = "PATCH",
  defaultValue = null,
  folder = "editor-uploads",
  name,
  previewImageSize,
  onUploadCompleted,
}: Props) {
  const [saving, setSaving] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  async function onChange() {
    setSaving(true);
    if (!inputRef.current?.files) {
      return;
    }
    const file = inputRef.current.files[0];
    const fileRes = await uploadFile(file, folder);
    if (fileRes.error) {
      setSaving(false);
      return toast({
        title: "Something went wrong.",
        description: fileRes.error,
        variant: "destructive",
      });
    }
    inputRef.current.value = "";

    if (inline) {
      setSaving(false);
      toast({
        title: "Your image has been uploaded",
      });
      return onUploadCompleted?.(fileRes.url ?? null);
    }

    if (!inline && endpoint) {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [name as string]: fileRes.url ?? null,
        }),
      });
      setSaving(false);

      if (!res?.ok) {
        return toast({
          title: "Something went wrong.",
        });
      }
      router.refresh();

      return toast({
        title: "Your image has been uploaded",
      });
    }
  }

  if (inline) {
    return (
      <div
        className="border  gap-2 h-5 rounded-md cursor-pointer hover:border-gray-1 text-gray-1 text-sm flex items-center px-2"
        onClick={() => inputRef.current?.click()}
      >
        {saving ? (
          <>
            <Icons.spinner className="animate-spin" size={15} />
            Uploading
          </>
        ) : (
          <>
            <Icons.upload size={15} />
            {helpText}
          </>
        )}

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border ">
      <div className="flex flex-col justify-between  gap-3 p-4 ">
        <div className="flex flex-col gap-1">
          <div className="font-medium">{title}</div>
          <p className="text-sm text-gray-4">{description}</p>
        </div>

        <div className="flex flex-row gap-2">
          <Button
            onClick={() => inputRef.current?.click()}
            disabled={saving || isDeleteLoading}
            size="sm"
          >
            {saving ? (
              <>
                <Icons.spinner className="animate-spin" size={15} />
                Uploading
              </>
            ) : (
              <>
                <Icons.upload size={15} />
                Upload
              </>
            )}
          </Button>
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={onChange}
          />
          {defaultValue && (
            <Button
              size="sm"
              variant="destructive"
              disabled={!defaultValue || saving || isDeleteLoading}
              onClick={async () => {
                setIsDeleteLoading(true);
                const res = await fetch(`/api/${endpoint}`, {
                  method: method,
                  body: JSON.stringify({
                    [name as string]: null,
                  }),
                });
                setIsDeleteLoading(false);

                if (!res?.ok) {
                  return toast({
                    title: "Something went wrong.",
                  });
                }
                router.refresh();

                return toast({
                  title: "Your image has been removed",
                });
              }}
            >
              {isDeleteLoading ? (
                <>
                  <Icons.spinner className="animate-spin" size={15} />
                  Removing
                </>
              ) : (
                <>
                  <Icons.trash size={15} />
                  Remove image
                </>
              )}
            </Button>
          )}
        </div>
        {defaultValue && (
          <Image
            src={defaultValue}
            width={previewImageSize ?? 0}
            height={previewImageSize ?? 0}
            sizes="100vw"
            className={cn(
              "rounded-md border  p-2",
              !previewImageSize && "w-full p-0",
            )}
            alt={title as string}
            priority
          />
        )}
      </div>
      <footer className="flex h-auto flex-row items-center justify-between border-t  bg-gray-3 px-4 py-2">
        <div className="py-1 text-sm text-gray-4">{helpText}</div>
      </footer>
    </div>
  );
}
