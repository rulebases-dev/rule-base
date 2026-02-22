"use client";

import Link from "next/link";
import { ArrowLeft, Github, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const sponsorLinks = [
  {
    name: "GitHub Sponsors",
    href: "https://github.com/sponsors/rulebases-dev",
    description: "Support development with recurring or one-time sponsorships",
  },
  {
    name: "Ko-fi",
    href: "https://ko-fi.com/rulebases",
    description: "Buy me a coffee or send a one-time tip",
  },
];

export default function SupportPage() {
  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-full" />
      <div className="hero-glow animate-glow-pulse" />

      <div className="relative mx-auto max-w-2xl px-6 py-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-subtle px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Heart className="size-3 text-rose-500 dark:text-rose-400" />
            100% Free & Open Source
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Support RuleBase
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
            RuleBase is free for everyone. No subscriptions, no paywalls. If
            you find it useful, consider supporting the project so we can keep
            building and improving.
          </p>
        </div>

        <div className="space-y-4">
          {sponsorLinks.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card block rounded-2xl p-6 transition-all hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{sponsor.name}</h3>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {sponsor.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Support
                </Button>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          RuleBase is{" "}
          <a
            href="https://github.com/rulebases-dev/rule-base"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
          >
            <Github className="size-3.5" />
            open-source on GitHub
          </a>
          . Star the repo, report issues, or contribute.
        </p>
      </div>
    </div>
  );
}
