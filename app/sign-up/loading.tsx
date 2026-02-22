export default function SignUpLoading() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="glass-card w-full max-w-md animate-pulse rounded-2xl p-8">
        <div className="mx-auto mb-6 h-10 w-56 rounded bg-muted" />
        <div className="space-y-4">
          <div className="h-11 w-full rounded-lg bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
        </div>
        <div className="mt-6 h-11 w-full rounded-lg bg-muted" />
      </div>
    </div>
  );
}
