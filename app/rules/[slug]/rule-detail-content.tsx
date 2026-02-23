"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompt-card";
import { BookmarkButton } from "@/components/bookmark-button";
import { formatCopyCount } from "@/lib/data";
import { trackCopy, rateRule } from "@/lib/actions/rules";
import type { RuleDetailForUI, RuleForUI } from "@/lib/rules";

interface RuleDetailContentProps {
  rule: RuleDetailForUI;
  relatedRules: RuleForUI[];
  isSignedIn?: boolean;
  isBookmarked?: boolean;
}

export function RuleDetailContent({
  rule,
  relatedRules,
  isSignedIn = false,
  isBookmarked = false,
}: RuleDetailContentProps) {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(rule.avgRating);
  const [ratingCount, setRatingCount] = useState(rule.ratingCount);
  const [ratingLoading, setRatingLoading] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rule.content);
      await trackCopy(rule.id, rule.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }

  async function handleRate(score: number) {
    setRatingLoading(true);
    const result = await rateRule(rule.id, score, rule.slug);
    setRatingLoading(false);
    if (!result.error) {
      setRating(score);
      setRatingCount((c) => c + 1);
    }
  }

  const authorAvatar = (rule.authorName ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-avatar-card text-sm font-bold text-muted-foreground ring-1 ring-border"
            >
              {authorAvatar}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {rule.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                by {rule.authorName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isSignedIn && (
              <BookmarkButton
                ruleId={rule.id}
                slug={rule.slug}
                initialBookmarked={isBookmarked}
              />
            )}
            <Button
              size="sm"
              variant={copied ? "default" : "outline"}
              onClick={handleCopy}
              className={
                copied
                  ? "gap-1.5 bg-emerald-600 text-white hover:bg-emerald-600"
                  : "gap-1.5"
              }
            >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
            </Button>
          </div>
        </div>

        <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">
          {rule.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {rule.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-md border border-border bg-subtle-md px-2 py-0.5 text-[11px] font-normal"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-4 border-y border-border py-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) =>
              isSignedIn ? (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleRate(i)}
                  disabled={ratingLoading}
                  className="rounded p-0.5 transition-colors hover:bg-subtle-strong disabled:opacity-50"
                >
                  <Star
                    className={`size-5 ${
                      i <= Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ) : (
                <Star
                  key={i}
                  className={`size-5 ${
                    i <= Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              )
            )}
            {isSignedIn ? null : (
              <Link
                href={`/sign-in?callbackUrl=/rules/${rule.slug}`}
                className="ml-2 text-xs text-violet-500 hover:underline"
              >
                Sign in to rate
              </Link>
            )}
            <span className="ml-1 text-sm text-muted-foreground">
              {rating.toFixed(1)} ({ratingCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Download className="size-4" />
            <span>{formatCopyCount(rule.copyCount)} copies</span>
          </div>
        </div>

        <pre className="overflow-x-auto rounded-xl border border-border bg-subtle/50 p-4 text-[13px] leading-relaxed">
          <code>{rule.content}</code>
        </pre>
      </div>

      {relatedRules.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Related Rules</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedRules.map((r) => (
              <PromptCard key={r.id} rule={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
