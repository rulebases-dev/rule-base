import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — RuleBase",
  description: "Privacy Policy for RuleBase. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: February 2026
        </p>

        <div className="mt-12 space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="mb-2 text-lg font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground">
              RuleBase (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use,
              and safeguard your information when you use our website at rulebases.dev.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">2. Information We Collect</h2>
            <p className="text-muted-foreground">
              We may collect information you provide directly, such as when you create an
              account, submit a rule, or contact us. This may include your name, email
              address, profile image (from OAuth providers like GitHub and Google), and
              any content you submit.
            </p>
            <p className="mt-3 text-muted-foreground">
              We also collect usage data (e.g., pages visited, copy actions, ratings) to
              improve our service. This data is aggregated and anonymized where possible.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use your information to operate the service, display your rules and
              attribution, respond to inquiries, and improve RuleBase. We do not sell
              your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">4. Cookies &amp; Authentication</h2>
            <p className="text-muted-foreground">
              We use session cookies and OAuth (GitHub, Google) for authentication. You
              can disable cookies in your browser, but some features may not work
              correctly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">5. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use Vercel for hosting, Neon for the database, and Auth.js for
              authentication. These providers have their own privacy policies. We also
              use GitHub and Google OAuth; their policies apply to data shared via OAuth.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">6. Data Retention &amp; Deletion</h2>
            <p className="text-muted-foreground">
              We retain your data as long as your account exists. You may request
              deletion of your account and associated data by contacting us at
              hello@rulebases.dev.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">7. Contact</h2>
            <p className="text-muted-foreground">
              For privacy-related questions, contact us at{" "}
              <a
                href="mailto:hello@rulebases.dev"
                className="font-medium text-violet-500 hover:underline"
              >
                hello@rulebases.dev
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
