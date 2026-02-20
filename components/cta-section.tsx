import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="submit" className="scroll-mt-20 py-20">
      <div className="cta-gradient relative overflow-hidden rounded-2xl border border-border p-10 text-center sm:p-14">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-500/20">
            <Sparkles className="size-5 text-violet-500 dark:text-violet-400" />
          </div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Have a killer system prompt?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-[15px] text-muted-foreground">
            Share it with thousands of developers. Help the community write
            better code with smarter AI assistants.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30"
            >
              Submit a Rule
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-border backdrop-blur-sm hover:bg-foreground/[0.05]"
            >
              Read the Guidelines
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
