"use server";

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { rules, bookmarks } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

export async function deleteRule(ruleId: string, slug: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const existing = await db.query.rules.findFirst({
    where: eq(rules.id, ruleId),
    columns: { authorId: true },
  });

  if (!existing) {
    return { error: "Rule not found" };
  }
  if (existing.authorId !== session.user.id) {
    return { error: "Forbidden" };
  }

  await db.delete(rules).where(eq(rules.id, ruleId));
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath(`/rules/${slug}`);
  return { success: true };
}

export async function toggleBookmark(ruleId: string, slug?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to bookmark" };
  }

  const existing = await db
    .select()
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, session.user.id), eq(bookmarks.ruleId, ruleId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, session.user.id), eq(bookmarks.ruleId, ruleId)));
  } else {
    await db.insert(bookmarks).values({
      userId: session.user.id,
      ruleId,
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/bookmarks");
  if (slug) revalidatePath(`/rules/${slug}`);
  return { success: true };
}
