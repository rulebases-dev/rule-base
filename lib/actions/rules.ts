"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { copies, ratings, rules } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { rateRuleSchema } from "@/lib/validators/rules";

export async function rateRule(ruleId: string, score: number, slug?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to rate" };
  }

  const parsed = rateRuleSchema.safeParse({ score });
  if (!parsed.success) {
    return { error: "Score must be between 1 and 5" };
  }

  await db
    .insert(ratings)
    .values({
      userId: session.user.id,
      ruleId,
      score: parsed.data.score,
    })
    .onConflictDoUpdate({
      target: [ratings.userId, ratings.ruleId],
      set: { score: parsed.data.score },
    });

  const [result] = await db
    .select({
      avg: sql<number>`avg(${ratings.score})::real`,
      count: sql<number>`count(*)`,
    })
    .from(ratings)
    .where(eq(ratings.ruleId, ruleId));

  await db
    .update(rules)
    .set({
      avgRating: Number(result.avg) || 0,
      ratingCount: Number(result.count) || 0,
    })
    .where(eq(rules.id, ruleId));

  revalidatePath("/");
  if (slug) revalidatePath(`/rules/${slug}`);
  return { success: true };
}

export async function updateRule(
  ruleId: string,
  data: {
    title?: string;
    description?: string;
    content?: string;
    categoryId?: string;
    tags?: string[];
    isPublic?: boolean;
  },
  slug?: string
) {
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

  await db
    .update(rules)
    .set({
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.isPublic !== undefined && { isPublic: data.isPublic }),
    })
    .where(eq(rules.id, ruleId));

  revalidatePath("/");
  revalidatePath("/dashboard");
  if (slug) revalidatePath(`/rules/${slug}`);
  return { success: true };
}

export async function trackCopy(ruleId: string, slug?: string) {
  const session = await auth();
  await db.insert(copies).values({
    ruleId,
    userId: session?.user?.id ?? null,
  });
  await db
    .update(rules)
    .set({ copyCount: sql`${rules.copyCount} + 1` })
    .where(eq(rules.id, ruleId));
  if (slug) revalidatePath(`/rules/${slug}`);
  revalidatePath("/");
}
