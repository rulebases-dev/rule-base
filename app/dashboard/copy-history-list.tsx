"use client";

import Link from "next/link";
import type { CopyHistoryItem } from "@/lib/dashboard";

interface CopyHistoryListProps {
  items: CopyHistoryItem[];
}

function formatDate(d: Date) {
  const date = new Date(d);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function CopyHistoryList({ items }: CopyHistoryListProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/rules/${item.ruleSlug}`}
          className="glass-card block rounded-xl p-4 transition-colors hover:border-violet-500/30"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium truncate">{item.ruleTitle}</span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {formatDate(item.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
