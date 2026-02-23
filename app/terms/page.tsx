import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — RuleBase",
  description: "Terms of Service for RuleBase. Rules and guidelines for using our service.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: February 2026
        </p>

        <div className="mt-12 space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="mb-2 text-lg font-semibold">1. Acceptance</h2>
            <p className="text-muted-foreground">
              By using RuleBase, you agree to these Terms of Service. If you do not
              agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">2. Description of Service</h2>
            <p className="text-muted-foreground">
              RuleBase is an open-source directory of AI editor system prompts. Users can
              browse, copy, submit, and rate rules. The service is provided as-is and is
              free to use.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">3. User Conduct</h2>
            <p className="text-muted-foreground">
              You agree not to submit content that is illegal, harmful, infringing, or
              otherwise objectionable. You retain ownership of content you submit, but
              you grant us a license to display, store, and distribute it as part of the
              service. Do not impersonate others or violate intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">4. Disclaimer</h2>
            <p className="text-muted-foreground">
              RuleBase is provided &quot;as is&quot; without warranties of any kind. We do not
              guarantee availability, accuracy, or suitability of any content. Use of
              rules from this directory is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, RuleBase and its operators shall
              not be liable for any indirect, incidental, or consequential damages
              arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">6. Changes</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of the service
              after changes constitutes acceptance. We will notify users of material
              changes when practical.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">7. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, contact{" "}
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
