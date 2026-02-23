"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteRule } from "@/lib/actions/dashboard";
import { formatCopyCount } from "@/lib/data";
import type { UserRuleForUI } from "@/lib/dashboard";

interface MyRulesListProps {
  rules: UserRuleForUI[];
}

export function MyRulesList({ rules }: MyRulesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, slug: string) {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    setDeletingId(id);
    await deleteRule(id, slug);
    setDeletingId(null);
  }

  return (
    <div className="space-y-3">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="glass-card flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <Link
              href={`/rules/${rule.slug}`}
              className="font-medium hover:text-violet-500 hover:underline"
            >
              {rule.title}
            </Link>
            <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
              {rule.description}
            </p>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{rule.categoryName}</span>
              <span>{formatCopyCount(rule.copyCount)} copies</span>
              <span>★ {rule.avgRating.toFixed(1)} ({rule.ratingCount})</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link href={`/rules/${rule.slug}/edit`}>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Pencil className="size-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={deletingId === rule.id}
              onClick={() => handleDelete(rule.id, rule.slug)}
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
