export default function VerifyEmailLoading() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="glass-card w-full max-w-md animate-pulse rounded-2xl p-8 text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-muted" />
        <div className="mx-auto mb-4 h-8 w-48 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
      </div>
    </div>
  );
}
