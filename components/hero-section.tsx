"use client";

import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const AVATAR_INITIALS = ["JD", "AK", "MR", "SL", "NP"];
const AVATAR_GRADIENTS: React.CSSProperties[] = [
  { background: 'linear-gradient(to bottom right, rgb(139, 92, 246), rgb(217, 70, 239))' },
  { background: 'linear-gradient(to bottom right, rgb(14, 165, 233), rgb(6, 182, 212))' },
  { background: 'linear-gradient(to bottom right, rgb(245, 158, 11), rgb(249, 115, 22))' },
  { background: 'linear-gradient(to bottom right, rgb(16, 185, 129), rgb(20, 184, 166))' },
  { background: 'linear-gradient(to bottom right, rgb(244, 63, 94), rgb(236, 72, 153))' },
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
        <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-subtle px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <Sparkles className="size-3" style={{ color: 'rgb(139, 92, 246)', stroke: 'rgb(139, 92, 246)' }} />
          Open-source prompt directory
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Supercharge your{" "}
          <span
            className="gradient-text"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, rgb(167, 139, 250), rgb(192, 132, 252), rgb(217, 70, 239))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              WebkitBoxDecorationBreak: 'clone',
            }}
          >
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
            className="h-12 rounded-xl border-border bg-subtle pl-11 pr-4 text-[15px] shadow-xl shadow-black/5 backdrop-blur-md transition-all placeholder:text-muted-foreground/50 focus-visible:border-violet-500/30 focus-visible:bg-subtle-strong focus-visible:ring-2 focus-visible:ring-violet-500/15 dark:shadow-black/20"
          />
        </div>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up mt-1 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            className="hero-cta-gradient gap-2 text-white shadow-xl shadow-violet-500/20 transition-all hover:opacity-90 hover:shadow-violet-500/30"
            asChild
          >
            <a
              href="#rules"
              style={{ background: 'linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))', color: '#fff' }}
            >
              Browse Rules
              <ArrowRight className="size-4" style={{ color: '#fff', stroke: '#fff' }} />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-border text-foreground backdrop-blur-sm hover:bg-subtle-strong"
            asChild
          >
            <a href="#submit">Submit a Rule</a>
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
                className="flex size-7 items-center justify-center rounded-full ring-2 ring-background text-[10px] font-bold text-white"
                style={AVATAR_GRADIENTS[i]}
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
