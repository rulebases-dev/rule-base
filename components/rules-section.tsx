"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CategoryPills } from "./category-pills";
import { PromptGrid } from "./prompt-grid";
import type { CategoryForUI, RuleForUI } from "@/lib/rules";

interface RulesSectionProps {
  categories: CategoryForUI[];
  selectedSlug: string;
  searchQuery: string;
  rules: RuleForUI[];
}

export function RulesSection({
  categories,
  selectedSlug,
  searchQuery,
  rules,
}: RulesSectionProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildHref = useCallback(
    (slug: string, query: string) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (slug !== "all") params.set("category", slug);
      const qs = params.toString();
      return qs ? `/?${qs}` : "/";
    },
    []
  );

  const handleNavigate = useCallback(
    (slug: string) => {
      startTransition(() => {
        router.push(buildHref(slug, q), { scroll: false });
      });
    },
    [router, buildHref, q]
  );

  useEffect(() => {
    setQ(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setQ(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      startTransition(() => {
        router.push(buildHref(selectedSlug, value), { scroll: false });
      });
      debounceRef.current = null;
    }, 300);
  };

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className="relative pt-14">
      <div className="mb-6">
        <div className="glass-card relative w-full overflow-hidden rounded-xl border-border/60 shadow-sm ring-1 ring-border/40 transition-all focus-within:border-violet-500/40 focus-within:ring-violet-500/20 focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
          <Input
            type="text"
            placeholder="Search rules... (Next.js, Python, FastAPI)"
            value={q}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-11 border-0 bg-transparent pl-10 pr-4 text-sm shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <CategoryPills
        categories={categories}
        selectedSlug={selectedSlug}
        searchQuery={q}
        onNavigate={handleNavigate}
      />
      <PromptGrid rules={rules} />
    </div>
  );
}
