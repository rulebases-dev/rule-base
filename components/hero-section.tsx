"use client";

import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const AVATAR_INITIALS = ["JD", "AK", "MR", "SL", "NP"];
const AVATAR_COLORS = [
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
];

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Background grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 -top-14 h-full" />
      {/* Glow orb */}
      <div className="hero-glow animate-glow-pulse" />

      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 pb-12 text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <Sparkles className="size-3 text-violet-500 dark:text-violet-400" />
          Open-source prompt directory
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Supercharge your{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            AI Code Editor
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          style={{ animationDelay: "0.1s" }}
        >
          Discover, copy, and share curated system prompts for Cursor, Windsurf,
          Copilot, and more. Ship better code, faster.
        </p>

        {/* Search bar */}
        <div
          className="animate-fade-in-up relative mt-2 w-full max-w-xl"
          style={{ animationDelay: "0.2s" }}
        >
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            type="text"
            placeholder="Search rules... (e.g. Next.js, Python, FastAPI)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 rounded-xl border-border bg-foreground/[0.03] pl-11 pr-4 text-[15px] shadow-xl shadow-black/5 backdrop-blur-md transition-all placeholder:text-muted-foreground/50 focus-visible:border-violet-500/30 focus-visible:bg-foreground/[0.05] focus-visible:ring-2 focus-visible:ring-violet-500/15 dark:shadow-black/20"
          />
        </div>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up mt-1 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30"
            asChild
          >
            <a href="#rules">
              Browse Rules
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-border text-foreground backdrop-blur-sm hover:bg-foreground/[0.05]"
            asChild
          >
            <a href="#pricing">Get Started Free</a>
          </Button>
        </div>

        {/* Social proof */}
        <div
          className="animate-fade-in-up mt-4 flex items-center gap-3"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex -space-x-2">
            {AVATAR_INITIALS.map((initials, i) => (
              <div
                key={initials}
                className={`flex size-7 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_COLORS[i]} ring-2 ring-background text-[10px] font-bold text-white`}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Joined by{" "}
            <span className="font-medium text-foreground">5,000+</span>{" "}
            developers
          </p>
        </div>
      </div>
    </section>
  );
}
