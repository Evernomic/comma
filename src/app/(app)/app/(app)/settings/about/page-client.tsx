"use client";
import Editor from "@/components/editor";
import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { useState } from "react";

export default function EditAboutClient({
  content,
}: {
  content?: string | null;
}) {
  const [saving, setSaving] = useState<boolean>(false);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-3  p-1 pr-2   gap-3 bg-gray-3 border  flex mb-2 z-50  items-center rounded-md">
        <NavButton href="/settings" icon="arrowLeft" size="icon" />
        <div className="flex-1 flex justify-end gap-3">
          <span className="flex w-max  items-center gap-1 text-xs text-gray-4">
            {saving ? (
              <>
                <Icons.spinner className="animate-spin" size={15} /> Saving
              </>
            ) : (
              <>
                <Icons.check size={15} /> Saved
              </>
            )}
          </span>
        </div>
      </header>
      <Editor
        endpoint="user"
        method="PATCH"
        content={content}
        name="about"
        setSaving={setSaving}
        onlyContent
      />
    </div>
  );
}
