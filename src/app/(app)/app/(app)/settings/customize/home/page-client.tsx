"use client";
import Editor from "@/components/editor";
import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { useState } from "react";

export default function EditHomePageClient({
  content,
}: {
  content?: string | null;
}) {
  const [saving, setSaving] = useState<boolean>(false);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0  p-1  gap-3 bg-gray-3 backdrop-blur-3xl flex mb-2 z-50  items-center rounded-md">
        <NavButton
          href="/settings/customize"
          icon="arrowLeft"
        
          size="icon"
        />
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
        <NavButton
          href="/settings/customize/home/help"
          icon="circleHelp"
          size="sm"
          direction="ltr"
        >
          Help
        </NavButton>
        </div>

      </header>
      <Editor
        endpoint="user"
        method="PATCH"
        content={content}
        name="customHomePageContent"
        setSaving={setSaving}
        onlyContent
      />
    </div>
  );
}
