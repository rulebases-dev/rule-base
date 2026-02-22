"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const result = await requestPasswordReset(email);
    setIsLoading(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setDone(true);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 md:py-8">
      <div className="hero-grid pointer-events-none absolute inset-0 h-full min-h-screen" />
      <div className="hero-glow animate-glow-pulse" />

      <Link
        href="/sign-in"
        className="absolute left-4 top-4 z-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-6 sm:top-6"
      >
        <ArrowLeft className="size-4 shrink-0" />
        Back to sign in
      </Link>

      <div className="glass-card relative w-full max-w-sm shrink-0 rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent sm:left-6 sm:right-6 md:left-8 md:right-8" />

        <div className="mb-6 flex flex-col items-center gap-3 sm:mb-8">
          <Image
            src="/icon.png"
            alt="RuleBase"
            width={40}
            height={40}
            className="size-10 rounded-xl shadow-lg shadow-violet-500/25"
          />
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-tight">
              Forgot password
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>
        </div>

        {done ? (
          <div className="break-words rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-4 text-center">
            <p className="text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
              Check your email
            </p>
            <p className="mt-1 break-all text-xs text-muted-foreground">
              If an account exists for <strong>{email}</strong>, you&apos;ll receive a password reset link.
            </p>
            <Button variant="outline" size="sm" className="mt-3 border-border" asChild>
              <Link href="/sign-in">Back to Sign In</Link>
            </Button>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-[13px] text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-[13px] font-medium text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 rounded-lg border-border bg-subtle text-[13px] placeholder:text-muted-foreground/40 focus-visible:border-violet-500/30 focus-visible:ring-2 focus-visible:ring-violet-500/15"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full text-[13px] font-medium text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
                style={{ background: "linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
