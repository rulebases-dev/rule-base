import { TrendingUp } from "lucide-react";
import { PromptCard } from "@/components/prompt-card";
import type { Rule } from "@/lib/data";

interface FeaturedRulesProps {
  rules: Rule[];
}

export function FeaturedRules({ rules }: FeaturedRulesProps) {
  const featured = rules.filter((r) => r.featured).slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section id="trending" className="scroll-mt-20 py-16">
      <div className="mb-8 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 ring-1 ring-amber-500/20">
          <TrendingUp className="size-4 text-amber-500 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Trending Rules</h2>
          <p className="text-sm text-muted-foreground">Most copied this week</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((rule) => (
          <PromptCard key={rule.id} rule={rule} featured />
        ))}
      </div>
    </section>
  );
}
