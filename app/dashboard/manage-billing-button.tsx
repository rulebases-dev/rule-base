"use client";

import { useState } from "react";
import { Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ManageBillingButton({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/lemonsqueezy/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full gap-1.5 border-border sm:w-auto"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Settings className="size-3.5" />
      )}
      Manage Billing
    </Button>
  );
}
