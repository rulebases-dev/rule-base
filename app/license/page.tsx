import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "License — RuleBase",
  description: "License information for RuleBase and its content.",
};

export default function LicensePage() {
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
          License
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          RuleBase is open source. Here&apos;s how you can use it.
        </p>

        <div className="mt-12 space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="mb-2 text-lg font-semibold">Software License</h2>
            <p className="text-muted-foreground">
              The RuleBase website and platform code is open source, available on{" "}
              <a
                href="https://github.com/rulebases-dev/rule-base"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-violet-500 hover:underline"
              >
                GitHub
              </a>
              . It is released under the MIT License (or similar open-source license as
              specified in the repository). You may use, modify, and distribute the code
              in accordance with that license.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">User-Submitted Rules</h2>
            <p className="text-muted-foreground">
              Rules submitted by users remain owned by the authors. When you submit a
              rule, you grant RuleBase a non-exclusive license to display, store, and
              distribute it as part of the service. Other users may copy rules for
              personal use. If a rule includes its own license terms, those terms apply.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">Using Rules</h2>
            <p className="text-muted-foreground">
              Rules on RuleBase are intended for use with AI coding assistants (e.g.
              Cursor, Windsurf, Copilot). You may copy and use them in your projects.
              Always attribute authors when possible and respect any additional license
              terms specified in the rule content.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold">Trademarks</h2>
            <p className="text-muted-foreground">
              RuleBase and the RuleBase logo are trademarks of the project. Use of
              trademarks must not imply endorsement without permission.
            </p>
          </section>

          <section>
            <p className="text-muted-foreground">
              For specific license text, see the{" "}
              <a
                href="https://github.com/rulebases-dev/rule-base"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-violet-500 hover:underline"
              >
                LICENSE
              </a>{" "}
              file in the repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
