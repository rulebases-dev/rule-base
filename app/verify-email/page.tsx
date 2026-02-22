"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyEmailToken } from "@/lib/actions/auth";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    verifyEmailToken(token, email).then((result) => {
      if (result?.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(result?.error ?? "Verification failed");
      }
    });
  }, [token, email]);

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

      <div className="glass-card relative w-full max-w-sm shrink-0 rounded-2xl p-4 text-center sm:p-6 md:p-8">
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent sm:left-6 sm:right-6 md:left-8 md:right-8" />

        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 size-12 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
            <h1 className="text-lg font-semibold">Verifying your email...</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please wait a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div
              className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(to bottom right, rgb(34, 197, 94), rgb(22, 163, 74))" }}
            >
              <CheckCircle className="size-8 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Email verified!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account is ready. You can now sign in.
            </p>
            <Button
              className="mt-6 w-full text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
              style={{ background: "linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))" }}
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-500/20">
              <XCircle className="size-8 text-red-500" />
            </div>
            <h1 className="text-lg font-semibold">Verification failed</h1>
            <p className="mt-2 break-words text-sm text-muted-foreground">
              {message}
            </p>
            <p className="mt-4 text-[13px] text-muted-foreground">
              The link may have expired. Try signing in and request a new verification email.
            </p>
            <Button variant="outline" className="mt-6 w-full border-border" asChild>
              <Link href="/sign-in">Go to Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
