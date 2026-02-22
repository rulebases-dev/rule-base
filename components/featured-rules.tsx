import { TrendingUp } from "lucide-react";
import { PromptCard } from "@/components/prompt-card";
import type { RuleForUI } from "@/lib/rules";

interface FeaturedRulesProps {
  rules: RuleForUI[];
}

export function FeaturedRules({ rules }: FeaturedRulesProps) {
  const featured = rules.filter((r) => r.featured).slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section id="trending" className="scroll-mt-20 py-16">
      <div className="mb-8 flex items-center gap-2.5">
        <div
          className="flex size-8 items-center justify-center rounded-lg ring-1 ring-amber-500/20"
          style={{ background: 'linear-gradient(to bottom right, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2))' }}
        >
          <TrendingUp className="size-4" style={{ color: 'rgb(245, 158, 11)', stroke: 'rgb(245, 158, 11)' }} />
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
