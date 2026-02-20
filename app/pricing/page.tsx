"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Crown,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description:
      "Everything you need to discover and use community prompts. Free forever.",
    features: [
      "Browse all public rules",
      "5 copies per day",
      "Community support",
      "Basic search & filters",
      "Submit your own rules",
    ],
    cta: "Get Started",
    popular: false,
    action: "free" as const,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/mo",
    description:
      "Unlimited access, private collections, and advanced features for power users.",
    features: [
      "Unlimited copies",
      "Private rules collection",
      "Early access to new prompts",
      "Advanced search & AI suggestions",
      "Export to any editor format",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    action: "pro" as const,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/lemonsqueezy/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        window.location.href = "/sign-in";
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-full" />
      <div className="hero-glow animate-glow-pulse" />

      <div className="relative mx-auto max-w-4xl px-6 py-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Crown className="size-3 text-amber-500 dark:text-amber-400" />
            Open Core Model
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Free for everyone.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Pro for power users.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
            RuleBase is open-source and free to use. Upgrade to Pro for
            unlimited access, private collections, and advanced features.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "glass-card relative flex flex-col rounded-2xl p-8 transition-all duration-300",
                tier.popular &&
                  "border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.08)]",
              )}
            >
              {tier.popular && (
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
              )}

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl",
                      tier.popular
                        ? "bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20"
                        : "bg-foreground/[0.06] ring-1 ring-border",
                    )}
                  >
                    {tier.popular ? (
                      <Zap className="size-4 text-white" />
                    ) : (
                      <Sparkles className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-[15px] font-semibold">{tier.name}</span>
                </div>
                {tier.popular && (
                  <Badge className="border-violet-500/30 bg-violet-500/10 text-violet-600 hover:bg-violet-500/10 dark:text-violet-300">
                    Recommended
                  </Badge>
                )}
              </div>

              <div className="mb-2">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="mb-7 text-[13px] leading-relaxed text-muted-foreground">
                {tier.description}
              </p>

              {tier.action === "pro" ? (
                <Button
                  className="mb-7 w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500"
                  onClick={handleUpgrade}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Zap className="size-4" />
                  )}
                  {tier.cta}
                </Button>
              ) : (
                <Button
                  className="mb-7 w-full border-border bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
                  variant="outline"
                  asChild
                >
                  <Link href="/#rules">{tier.cta}</Link>
                </Button>
              )}

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-3.5 shrink-0",
                        tier.popular
                          ? "text-violet-500 dark:text-violet-400"
                          : "text-muted-foreground/50",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          RuleBase is{" "}
          <a
            href="https://github.com/dnd21052002/rule-base"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
          >
            open-source
          </a>
          . Self-host for free, or let us handle hosting with Pro.
        </p>
      </div>
    </div>
  );
}
