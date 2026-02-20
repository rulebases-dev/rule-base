import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Copy,
  Crown,
  FileText,
  Lock,
  Settings,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { getUserPlan, getUserSubscription } from "@/lib/lemonsqueezy/subscription";
import { ManageBillingButton } from "./manage-billing-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const plan = await getUserPlan(session.user.id);
  const subscription = await getUserSubscription(session.user.id);
  const isPro = plan === "pro";

  const stats = [
    { label: "Rules Created", value: "0", icon: FileText },
    { label: "Total Copies", value: "0", icon: Copy },
    { label: "Avg. Rating", value: "—", icon: BarChart3 },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-64" />

      <div className="relative mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        {/* Profile header */}
        <div className="glass-card mb-8 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  className="size-14 rounded-full ring-2 ring-border"
                />
              ) : (
                <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white">
                  {session.user.name?.charAt(0) ?? "?"}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight">
                    {session.user.name ?? session.user.email}
                  </h1>
                  {isPro ? (
                    <Badge className="gap-1 border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300">
                      <Crown className="size-3" />
                      Pro
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="text-muted-foreground"
                    >
                      Free
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isPro && subscription ? (
                <ManageBillingButton
                  subscriptionId={subscription.lemonSqueezyId}
                />
              ) : (
                <Button
                  size="sm"
                  className="gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500"
                  asChild
                >
                  <Link href="/pricing">
                    <Zap className="size-3.5" />
                    Upgrade to Pro
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {isPro && subscription && (
            <div className="mt-4 rounded-lg border border-border bg-foreground/[0.02] px-4 py-2.5 text-[13px] text-muted-foreground">
              {subscription.cancelAtPeriodEnd ? (
                <>
                  Pro access until{" "}
                  <span className="font-medium text-foreground">
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                  . Your subscription will not renew.
                </>
              ) : (
                <>
                  Next billing date:{" "}
                  <span className="font-medium text-foreground">
                    {subscription.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card flex items-center gap-4 rounded-xl p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-foreground/[0.04]">
                <stat.icon className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pro features grid */}
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          {isPro ? "Your Pro Features" : "Unlock with Pro"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Private Collections",
              description: "Save and organize rules in private collections",
              icon: Lock,
            },
            {
              title: "Analytics Dashboard",
              description: "Track views, copies, and ratings on your rules",
              icon: BarChart3,
            },
            {
              title: "AI Suggestions",
              description: "Get AI-powered rule recommendations for your stack",
              icon: Zap,
            },
            {
              title: "Manage Billing",
              description: "View invoices and manage your subscription",
              icon: Settings,
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`glass-card relative flex items-start gap-4 rounded-xl p-5 ${!isPro ? "opacity-60" : ""}`}
            >
              {!isPro && (
                <Lock className="absolute right-4 top-4 size-3.5 text-muted-foreground/40" />
              )}
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${isPro ? "bg-violet-500/10" : "bg-foreground/[0.04]"}`}
              >
                <feature.icon
                  className={`size-5 ${isPro ? "text-violet-500 dark:text-violet-400" : "text-muted-foreground/60"}`}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="text-[13px] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
