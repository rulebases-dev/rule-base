import { Check, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Hobby",
    price: "Free",
    period: "",
    description: "Perfect for individual developers exploring AI prompts.",
    features: [
      "Browse all public rules",
      "5 copies per day",
      "Community support",
      "Basic search & filters",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    period: "/mo",
    description: "For power users who want unlimited access and exclusives.",
    features: [
      "Unlimited copies",
      "Private rules collection",
      "Early access to new prompts",
      "Advanced search & AI suggestions",
      "Export to any editor format",
      "Priority support",
    ],
    cta: "Start Pro Plan",
    popular: true,
  },
  {
    name: "Team",
    price: "$19",
    period: "/mo",
    description: "Shared workspace and analytics for your engineering team.",
    features: [
      "Everything in Pro",
      "Shared team workspace",
      "Team analytics dashboard",
      "Custom rule templates",
      "SSO & role management",
      "Dedicated support channel",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-violet-500 dark:text-violet-400">
          Pricing
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-muted-foreground">
          Start for free. Upgrade when you need unlimited access, private
          collections, and team features.
        </p>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "glass-card relative flex flex-col rounded-2xl p-7 transition-all duration-300",
              tier.popular &&
                "border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.08)] md:-my-3 md:p-8"
            )}
          >
            {/* Popular glow line */}
            {tier.popular && (
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            )}

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl",
                    tier.popular
                      ? "bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20"
                      : "bg-foreground/[0.06] ring-1 ring-border"
                  )}
                >
                  {tier.popular ? (
                    <Zap className="size-4 text-white" />
                  ) : (
                    <Sparkles
                      className={cn(
                        "size-4",
                        tier.name === "Team"
                          ? "text-sky-400"
                          : "text-muted-foreground"
                      )}
                    />
                  )}
                </div>
                <span className="text-[15px] font-semibold">{tier.name}</span>
              </div>
              {tier.popular && (
                <Badge className="border-violet-500/30 bg-violet-500/10 text-violet-600 hover:bg-violet-500/10 dark:text-violet-300">
                  Popular
                </Badge>
              )}
            </div>

            {/* Price */}
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

            {/* CTA */}
            <Button
              className={cn(
                "mb-7 w-full",
                tier.popular
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500"
                  : "border-border bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
              )}
              variant={tier.popular ? "default" : "outline"}
            >
              {tier.cta}
            </Button>

            {/* Features */}
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                >
                  <Check
                    className={cn(
                      "mt-0.5 size-3.5 shrink-0",
                      tier.popular ? "text-violet-500 dark:text-violet-400" : "text-muted-foreground/50"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
