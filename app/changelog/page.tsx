import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata = {
  title: "Changelog — RuleBase",
  description: "What's new in RuleBase. Latest updates and releases.",
};

const changelogEntries = [
  {
    version: "0.2.0",
    date: "February 2026",
    highlights: [
      "User Submit Rules — Create and share your own rules at /rules/new",
      "Rule Detail Page — Full rule view with author, rating, copy count, related rules",
      "Privacy Policy, Terms of Service, and License pages",
    ],
  },
  {
    version: "0.1.0",
    date: "February 2026",
    highlights: [
      "MVP Landing page with Hero, Featured Rules, Rules Grid, CTA",
      "Dark/Light mode toggle with Cursor spotlight effect",
      "Auth.js — Sign in with GitHub, Google, or email",
      "Backend with Drizzle + Neon PostgreSQL",
      "REST API for rules, copy tracking, and ratings",
      "Support page and sponsorship links",
    ],
  },
];

export default function ChangelogPage() {
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

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Changelog
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          What&apos;s new in RuleBase
        </p>

        <div className="mt-12 space-y-10">
          {changelogEntries.map((entry) => (
            <section
              key={entry.version}
              className="glass-card rounded-2xl border border-border p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-md bg-violet-500/10 px-2.5 py-1 text-sm font-medium text-violet-500">
                  v{entry.version}
                </span>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </div>
              <ul className="space-y-2">
                {entry.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[15px] text-muted-foreground"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-violet-500/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
