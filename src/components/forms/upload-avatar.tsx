"use client";

import { uploadFile } from "@/lib/upload";
import { getInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Icons } from "../shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "../ui/use-toast";

interface Props {
  defaultValue?: string;
  name?: string;
}

export default function UploadAvatar({ defaultValue, name }: Props) {
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  async function onChange() {
    setSaving(true);
    if (!inputRef.current?.files) {
      return;
    }
    const file = inputRef.current.files[0];
    const fileRes = await uploadFile(file, "avatars");
    inputRef.current.value = "";
    if (fileRes.error) {
      setSaving(false);
      return toast({
        title: "Something went wrong.",
        description: fileRes.error,
        variant: "destructive",
      });
    }

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: fileRes.url ?? null,
      }),
    });
    setSaving(false);

    if (!res.ok) {
      return toast({
        title: "Something went wrong.",
      });
    }
    router.refresh();

    return toast({
      title: "Your avatar has been uploaded",
    });
  }

  return (
    <div className="overflow-hidden rounded-md border ">
      <div className="flex flex-row justify-between  gap-1 p-4 max-md:flex-col   max-md:items-center max-md:gap-3  ">
        <div className="flex flex-col self-start gap-1">
          <div className="font-medium">Avatar</div>
          <p className="text-sm text-gray-4">
            Click on the avatar to upload a custom one from your files.
          </p>
        </div>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={onChange}
        />
        <Avatar
          className="relative min-md:self-end flex group size-28 cursor-pointer items-center justify-center rounded-full border border-gray-3 "
          onClick={() => inputRef.current?.click()}
        >
          <AvatarImage src={defaultValue} alt={`${name} Profile Picture`} />
          <AvatarFallback>{name && getInitials(name)}</AvatarFallback>
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-2 backdrop-blur-xl   p-2 rounded-full">
            <Icons.upload size={20} />
          </div>
        </Avatar>
      </div>
      <footer className="flex h-auto flex-row items-center justify-between border-t  bg-gray-3 px-4 py-2">
        <div className="py-1 text-sm text-gray-4">
          This image that will be shown in the browser tab.
        </div>
        {saving && (
          <Icons.spinner className="animate-spin text-gray-1" size={18} />
        )}
      </footer>
    </div>
  );
}
