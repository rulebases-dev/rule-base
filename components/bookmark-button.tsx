"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/lib/actions/dashboard";

interface BookmarkButtonProps {
  ruleId: string;
  slug?: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({
  ruleId,
  slug,
  initialBookmarked = false,
}: BookmarkButtonProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  async function handleClick() {
    const result = await toggleBookmark(ruleId, slug);
    if (!result.error) {
      setBookmarked((b) => !b);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex size-8 items-center justify-center rounded-lg bg-subtle-md text-muted-foreground transition-colors hover:bg-subtle-stronger hover:text-foreground"
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        className={`size-4 ${bookmarked ? "fill-violet-500 text-violet-500" : ""}`}
      />
    </button>
  );
}
