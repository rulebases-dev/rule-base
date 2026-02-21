"use client";

import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
}

export function TurnstileWidget({
  onSuccess,
  onExpire,
  theme = "auto",
}: TurnstileWidgetProps) {
  if (!SITE_KEY) {
    return (
      <div className="flex h-[65px] items-center justify-center rounded-lg border border-dashed border-border/60 bg-subtle/50 text-xs text-muted-foreground">
        Add NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable
      </div>
    );
  }

  return (
    <div className="flex justify-center [&_iframe]:!max-w-full">
      <Turnstile
        siteKey={SITE_KEY}
        onSuccess={onSuccess}
        onExpire={onExpire}
        options={{
          size: "normal",
          action: "auth",
          theme,
        }}
      />
    </div>
  );
}
