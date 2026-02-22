export default function SupportLoading() {
  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-full" />
      <div className="relative mx-auto max-w-2xl px-6 py-24">
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mb-14 text-center">
          <div className="mx-auto mb-4 h-7 w-44 animate-pulse rounded-full bg-muted" />
          <div className="mx-auto mb-4 h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="glass-card h-24 animate-pulse rounded-2xl bg-muted/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
