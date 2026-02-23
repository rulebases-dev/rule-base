"use client";

import Link from "next/link";
import { formatCopyCount } from "@/lib/data";
import { StarRating } from "@/components/star-rating";
import { BookmarkButton } from "@/components/bookmark-button";
import type { BookmarkedRuleForUI } from "@/lib/dashboard";

interface BookmarksListProps {
  rules: BookmarkedRuleForUI[];
}

export function BookmarksList({ rules }: BookmarksListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="glass-card group relative flex flex-col rounded-xl p-5"
        >
          <div className="absolute top-4 right-4">
            <BookmarkButton ruleId={rule.id} slug={rule.slug} initialBookmarked />
          </div>
          <Link href={`/rules/${rule.slug}`} className="min-w-0 flex-1">
            <h3 className="pr-8 font-medium hover:text-violet-500 hover:underline">
              {rule.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {rule.description}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={rule.rating} />
              <span className="text-xs text-muted-foreground">
                {formatCopyCount(rule.copyCount)}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
