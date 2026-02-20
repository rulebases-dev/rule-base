import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";

export async function getUserPlan(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { plan: true },
  });
  return user?.plan ?? "free";
}

export async function getUserSubscription(userId: string) {
  return db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
}

export function isPro(plan: string) {
  return plan === "pro";
}
