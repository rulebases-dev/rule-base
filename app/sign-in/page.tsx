"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { ArrowLeft, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { resendVerificationEmail } from "@/lib/actions/auth";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function getSafeCallbackUrl(raw: string | null): string {
  if (!raw) return "/";
  if (!raw.startsWith("/")) return "/";
  return raw;
}

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));
  const urlCode = searchParams.get("code");
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("signin_email");
      sessionStorage.removeItem("signin_email");
      return saved ?? "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const turnstileKey = useRef(0);

  useEffect(() => {
    if (urlError === "CredentialsSignin") {
      setError(
        urlCode === "EMAIL_NOT_VERIFIED"
          ? "Please verify your email first. Check your inbox for the verification link."
          : "Invalid email or password"
      );
    }
  }, [urlError, urlCode]);

  async function handleOAuth(provider: "github" | "google") {
    setOauthLoading(provider);
    setError(null);
    await signIn(provider, { callbackUrl });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (siteKey && !turnstileToken) {
      setError("Please complete the verification");
      return;
    }

    if (siteKey && turnstileToken) {
      const valid = await verifyTurnstileToken(turnstileToken);
      if (!valid) {
        setError("Verification failed. Please try again.");
        setTurnstileToken(null);
        turnstileKey.current += 1;
        return;
      }
    }

    setIsLoading(true);
    sessionStorage.setItem("signin_email", email);

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.ok && result?.url) {
      window.location.href = result.url;
      return;
    }
    if (result?.error === "CredentialsSignin") {
      setError(
        result.code === "EMAIL_NOT_VERIFIED"
          ? "Please verify your email first. Check your inbox for the verification link."
          : "Invalid email or password"
      );
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 md:py-8">
      {/* Background effects */}
      <div className="hero-grid pointer-events-none absolute inset-0 h-full min-h-screen" />
      <div className="hero-glow animate-glow-pulse" />

      {/* Back link */}
      <Link
        href="/"
        className="absolute left-4 top-4 z-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-6 sm:top-6"
      >
        <ArrowLeft className="size-4 shrink-0" />
        Back to home
      </Link>

      {/* Auth card */}
      <div className="glass-card relative w-full max-w-sm shrink-0 rounded-2xl p-4 sm:p-6 md:p-8">
        {/* Gradient top line */}
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent sm:left-6 sm:right-6 md:left-8 md:right-8" />

        {/* Logo */}
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
              Sign in to RuleBase
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back. Access your saved rules.
            </p>
          </div>
        </div>

        {/* Error / success message */}
        {error && (
          <div className={`mb-4 break-words rounded-lg px-3 py-2 text-center text-[13px] ${
            error.includes("Verification email sent")
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
          }`}>
            {error}
            {error.includes("verify your email") && email && (
              <button
                type="button"
                onClick={async () => {
                  setResendLoading(true);
                  const res = await resendVerificationEmail(email);
                  setResendLoading(false);
                  if (res?.success) {
                    setError("Verification email sent! Check your inbox.");
                  } else {
                    setError(res?.error ?? error);
                  }
                }}
                disabled={resendLoading}
                className="mt-2 block w-full text-xs font-medium text-violet-500 underline hover:text-violet-600"
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </button>
            )}
          </div>
        )}

        {/* OAuth buttons */}
        <div className="space-y-2.5">
          <Button
            variant="outline"
            className="h-10 w-full gap-2.5 border-border bg-subtle text-[13px] font-medium hover:bg-subtle-strong"
            onClick={() => handleOAuth("github")}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === "github" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Github className="size-4" />
            )}
            Sign in with GitHub
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full gap-2.5 border-border bg-subtle text-[13px] font-medium hover:bg-subtle-strong"
            onClick={() => handleOAuth("google")}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === "google" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <GoogleIcon className="size-4" />
            )}
            Sign in with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-2 sm:my-6 sm:gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="shrink-0 text-xs text-muted-foreground/60">
            or continue with email
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Email form */}
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-muted-foreground"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-violet-500 transition-colors hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 rounded-lg border-border bg-subtle text-[13px] placeholder:text-muted-foreground/40 focus-visible:border-violet-500/30 focus-visible:ring-2 focus-visible:ring-violet-500/15"
            />
          </div>

          <div key={turnstileKey.current}>
            <TurnstileWidget
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              theme="auto"
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
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
            className="font-medium text-violet-500 transition-colors hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
