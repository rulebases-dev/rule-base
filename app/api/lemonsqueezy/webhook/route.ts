import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";

function verifySignature(rawBody: string, signature: string, secret: string) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  const isValid = verifySignature(
    rawBody,
    signature,
    process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!,
  );

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const eventName: string = event.meta.event_name;
  const attrs = event.data.attributes;
  const customData = event.meta.custom_data as
    | { userId?: string }
    | undefined;

  switch (eventName) {
    case "subscription_created": {
      const userId = customData?.userId;
      if (!userId) break;

      await db.insert(subscriptions).values({
        userId,
        lemonSqueezyId: String(event.data.id),
        orderId: String(attrs.order_id),
        productId: String(attrs.product_id),
        variantId: String(attrs.variant_id),
        status: "active",
        currentPeriodEnd: new Date(attrs.renews_at),
        cancelAtPeriodEnd: attrs.cancelled ?? false,
      });

      await db
        .update(users)
        .set({
          plan: "pro",
          lemonSqueezyCustomerId: String(attrs.customer_id),
        })
        .where(eq(users.id, userId));
      break;
    }

    case "subscription_updated": {
      const lsId = String(event.data.id);
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.lemonSqueezyId, lsId),
      });
      if (!existing) break;

      const statusMap: Record<string, string> = {
        active: "active",
        past_due: "past_due",
        unpaid: "unpaid",
        cancelled: "canceled",
        expired: "canceled",
        on_trial: "trialing",
        paused: "canceled",
      };

      const mappedStatus =
        (statusMap[attrs.status] as typeof existing.status) ?? "active";
      const plan =
        mappedStatus === "active" || mappedStatus === "trialing"
          ? "pro"
          : "free";

      await db
        .update(subscriptions)
        .set({
          status: mappedStatus,
          currentPeriodEnd: new Date(attrs.renews_at ?? attrs.ends_at),
          cancelAtPeriodEnd: attrs.cancelled ?? false,
          variantId: String(attrs.variant_id),
        })
        .where(eq(subscriptions.lemonSqueezyId, lsId));

      await db
        .update(users)
        .set({ plan })
        .where(eq(users.id, existing.userId));
      break;
    }

    case "subscription_cancelled":
    case "subscription_expired": {
      const lsId = String(event.data.id);
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.lemonSqueezyId, lsId),
      });
      if (!existing) break;

      await db
        .update(subscriptions)
        .set({ status: "canceled", cancelAtPeriodEnd: true })
        .where(eq(subscriptions.lemonSqueezyId, lsId));

      await db
        .update(users)
        .set({ plan: "free" })
        .where(eq(users.id, existing.userId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
