"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { formatCopyCount } from "@/lib/data";
import type { RuleForUI } from "@/lib/rules";

interface PromptCardProps {
  rule: RuleForUI;
  featured?: boolean;
}

export function PromptCard({ rule, featured = false }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rule.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }

  return (
    <div
      className={`glass-card group relative flex flex-col rounded-2xl p-5 transition-all duration-300 ${
        featured ? "md:p-6" : ""
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      )}

      {/* Header row */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-avatar-card text-[11px] font-bold text-muted-foreground ring-1 ring-border"
          >
            {rule.avatar}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold leading-snug tracking-tight">
              {rule.title}
            </h3>
            <span className="text-xs text-muted-foreground/70">
              by {rule.author}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {rule.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {rule.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-md border border-border bg-subtle-md px-2 py-0.5 text-[11px] font-normal text-muted-foreground/80 hover:bg-subtle-stronger"
          >
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Footer: rating + stats + copy */}
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-3">
          <StarRating rating={rule.rating} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
            <Download className="size-3" />
            <span>{formatCopyCount(rule.copyCount)}</span>
          </div>
        </div>

        <Button
          size="sm"
          variant={copied ? "default" : "ghost"}
          onClick={handleCopy}
          className={
            copied
              ? "h-8 gap-1.5 bg-emerald-600 px-3 text-xs text-white hover:bg-emerald-600"
              : "h-8 gap-1.5 px-3 text-xs text-muted-foreground hover:bg-subtle-strong hover:text-foreground"
          }
        >
          {copied ? (
            <>
              <Check className="size-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
