import Link from "next/link";
import { ArrowLeft, Code } from "lucide-react";

export const metadata = {
  title: "API Documentation — RuleBase",
  description: "REST API documentation for RuleBase. List, search, create, and manage rules.",
};

export default function ApiDocsPage() {
  const baseUrl = "https://rulebases.dev";

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
          API Documentation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          REST API for RuleBase. Base URL: <code className="rounded bg-subtle px-1 py-0.5 text-xs">{baseUrl}</code>
        </p>

        <div className="mt-12 space-y-10">
          <section className="glass-card rounded-2xl border border-border p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Code className="size-4 text-violet-500" />
              GET /api/rules
            </h2>
            <p className="mb-4 text-[15px] text-muted-foreground">
              List and search rules. Public endpoint, no auth required.
            </p>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Query params:</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-[13px] text-muted-foreground">
              <li><code>q</code> — Search query (title, description)</li>
              <li><code>category</code> — Category UUID</li>
              <li><code>featured</code> — true/false</li>
              <li><code>sort</code> — newest | popular | top-rated</li>
              <li><code>page</code> — Page number (default: 1)</li>
              <li><code>limit</code> — Items per page (default: 12, max: 50)</li>
            </ul>
            <pre className="overflow-x-auto rounded-lg bg-subtle/80 p-4 text-[12px]">
{`curl "${baseUrl}/api/rules?q=react&sort=popular&limit=5"`}
            </pre>
          </section>

          <section className="glass-card rounded-2xl border border-border p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Code className="size-4 text-violet-500" />
              GET /api/rules/:id
            </h2>
            <p className="mb-4 text-[15px] text-muted-foreground">
              Get a single rule by ID. Public endpoint.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-subtle/80 p-4 text-[12px]">
{`curl "${baseUrl}/api/rules/{rule-id}"`}
            </pre>
          </section>

          <section className="glass-card rounded-2xl border border-border p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Code className="size-4 text-violet-500" />
              POST /api/rules
            </h2>
            <p className="mb-4 text-[15px] text-muted-foreground">
              Create a new rule. Requires authentication (session cookie).
            </p>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Body (JSON):</p>
            <ul className="mb-4 list-inside list-disc space-y-1 text-[13px] text-muted-foreground">
              <li><code>title</code> — string (3–255 chars)</li>
              <li><code>description</code> — string (10–500 chars)</li>
              <li><code>content</code> — string (20–10,000 chars)</li>
              <li><code>categoryId</code> — UUID</li>
              <li><code>tags</code> — string[] (max 8, each max 30 chars)</li>
              <li><code>isPublic</code> — boolean (default: true)</li>
            </ul>
            <pre className="overflow-x-auto rounded-lg bg-subtle/80 p-4 text-[12px]">
{`curl -X POST "${baseUrl}/api/rules" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"...","description":"...","content":"...","categoryId":"..."}' \\
  --cookie "your-session-cookie"`}
            </pre>
          </section>

          <section className="glass-card rounded-2xl border border-border p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Code className="size-4 text-violet-500" />
              POST /api/rules/:id/copy
            </h2>
            <p className="mb-4 text-[15px] text-muted-foreground">
              Track a copy event. Optional auth; works anonymously too.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-subtle/80 p-4 text-[12px]">
{`curl -X POST "${baseUrl}/api/rules/{rule-id}/copy"`}
            </pre>
          </section>

          <p className="text-center text-sm text-muted-foreground">
            PATCH and DELETE for rules require owner authentication. For full schema, see the{" "}
            <a
              href="https://github.com/rulebases-dev/rule-base"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-violet-500 hover:underline"
            >
              source code
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
