import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BarChart3, Copy, FileText, Lock, Zap } from "lucide-react";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const stats = [
    { label: "Rules Created", value: "0", icon: FileText },
    { label: "Total Copies", value: "0", icon: Copy },
    { label: "Avg. Rating", value: "—", icon: BarChart3 },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-64" />

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        {/* Profile header */}
        <div className="glass-card mb-6 rounded-2xl p-4 sm:mb-8 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  className="size-12 shrink-0 rounded-full ring-2 ring-border sm:size-14"
                />
              ) : (
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white sm:size-14"
                  style={{ background: "linear-gradient(to bottom right, rgb(139, 92, 246), rgb(79, 70, 229))" }}
                >
                  {session.user.name?.charAt(0) ?? "?"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">
                  {session.user.name ?? session.user.email}
                </h1>
                <p className="truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card flex items-center gap-4 rounded-xl p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-subtle-md">
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

        {/* Features (coming soon) */}
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Coming soon
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
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card relative flex items-start gap-4 rounded-xl p-5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-subtle-md">
                <feature.icon className="size-5 text-muted-foreground/60" />
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
