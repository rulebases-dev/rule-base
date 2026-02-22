"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CategoryForUI } from "@/lib/rules";

interface CategoryPillsProps {
  categories: CategoryForUI[];
  selectedSlug: string;
  searchQuery?: string;
  onNavigate?: (slug: string) => void;
}

export function CategoryPills({
  categories,
  selectedSlug,
  searchQuery = "",
  onNavigate,
}: CategoryPillsProps) {
  const buildHref = (slug: string) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (slug !== "all") params.set("category", slug);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  const handleClick = (e: React.MouseEvent, slug: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(slug);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 pb-10">
      <Link
        href={buildHref("all")}
        scroll={false}
        onClick={(e) => handleClick(e, "all")}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
          (!selectedSlug || selectedSlug === "all")
            ? "border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
            : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={buildHref(cat.slug)}
          scroll={false}
          onClick={(e) => handleClick(e, cat.slug)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            selectedSlug === cat.slug
              ? "border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
              : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
