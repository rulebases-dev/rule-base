import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bookmark,
  Copy,
  FileText,
  History,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { auth } from "@/lib/auth";
import {
  getDashboardStats,
  getUserRules,
  getCopyHistory,
  getBookmarkedRules,
} from "@/lib/dashboard";
import { formatCopyCount } from "@/lib/data";
import { MyRulesList } from "./my-rules-list";
import { CopyHistoryList } from "./copy-history-list";
import { BookmarksList } from "./bookmarks-list";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const [stats, userRules, copyHistory, bookmarks] = await Promise.all([
    getDashboardStats(session.user.id),
    getUserRules(session.user.id),
    getCopyHistory(session.user.id),
    getBookmarkedRules(session.user.id),
  ]);

  const statItems = [
    { label: "Rules Created", value: String(stats.rulesCreated), icon: FileText },
    { label: "Total Copies", value: formatCopyCount(stats.totalCopies), icon: Copy },
    { label: "Avg. Rating", value: stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "—", icon: BarChart3 },
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
                  style={{
                    background:
                      "linear-gradient(to bottom right, rgb(139, 92, 246), rgb(79, 70, 229))",
                  }}
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
            <Link
              href="/rules/new"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-subtle px-4 py-2 text-sm font-medium transition-colors hover:bg-subtle-stronger"
            >
              <Plus className="size-4" />
              Submit Rule
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="glass-card flex items-center gap-4 rounded-xl p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-subtle-md">
                <stat.icon className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* My Rules */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <FileText className="size-5" />
            My Rules
          </h2>
          {userRules.length > 0 ? (
            <MyRulesList rules={userRules} />
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-sm text-muted-foreground">
                You haven&apos;t submitted any rules yet.
              </p>
              <Link
                href="/rules/new"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-500 hover:underline"
              >
                <Plus className="size-4" />
                Submit your first rule
              </Link>
            </div>
          )}
        </section>

        {/* Copy History */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <History className="size-5" />
            Copy History
          </h2>
          {copyHistory.length > 0 ? (
            <CopyHistoryList items={copyHistory} />
          ) : (
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No copies yet. Browse rules and copy one to get started.
              </p>
              <Link
                href="/#rules"
                className="mt-2 inline-block text-sm font-medium text-violet-500 hover:underline"
              >
                Browse rules
              </Link>
            </div>
          )}
        </section>

        {/* Bookmarks */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Bookmark className="size-5" />
            Bookmarks
          </h2>
          {bookmarks.length > 0 ? (
            <BookmarksList rules={bookmarks} />
          ) : (
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No bookmarks yet. Click the bookmark icon on a rule to save it.
              </p>
              <Link
                href="/#rules"
                className="mt-2 inline-block text-sm font-medium text-violet-500 hover:underline"
              >
                Browse rules
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
