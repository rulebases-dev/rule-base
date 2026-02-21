import { PromptCard } from "@/components/prompt-card";
import type { Rule } from "@/lib/data";

interface PromptGridProps {
  rules: Rule[];
}

export function PromptGrid({ rules }: PromptGridProps) {
  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <div className="mb-2 flex size-14 items-center justify-center rounded-2xl bg-subtle-md ring-1 ring-border">
          <span className="text-2xl">?</span>
        </div>
        <p className="text-lg font-medium">No rules found</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for
        </p>
      </div>
    );
  }

  return (
    <section id="rules" className="scroll-mt-20 pb-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">All Rules</h2>
        <span className="text-sm text-muted-foreground">
          {rules.length} {rules.length === 1 ? "rule" : "rules"}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <PromptCard key={rule.id} rule={rule} />
        ))}
      </div>
    </section>
  );
}
