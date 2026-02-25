import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { rules, categories, copies, bookmarks } from "@/lib/db/schema";

export interface DashboardStats {
  rulesCreated: number;
  totalCopies: number;
  avgRating: number;
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [ruleStats] = await db
    .select({
      rulesCreated: sql<number>`count(${rules.id})::int`,
      avgRating: sql<number>`coalesce(avg(${rules.avgRating}), 0)::float`,
    })
    .from(rules)
    .where(eq(rules.authorId, userId));

  const [copyStats] = await db
    .select({
      totalCopies: sql<number>`count(${copies.id})::int`,
    })
    .from(copies)
    .where(eq(copies.userId, userId));

  return {
    rulesCreated: ruleStats?.rulesCreated ?? 0,
    totalCopies: copyStats?.totalCopies ?? 0,
    avgRating: ruleStats?.avgRating ?? 0,
  };
}

export interface UserRuleForUI {
  id: string;
  slug: string;
  title: string;
  description: string;
  copyCount: number;
  avgRating: number;
  ratingCount: number;
  categoryName: string;
  createdAt: Date;
}

export async function getUserRules(userId: string): Promise<UserRuleForUI[]> {
  const rows = await db
    .select({
      id: rules.id,
      slug: rules.slug,
      title: rules.title,
      description: rules.description,
      copyCount: rules.copyCount,
      avgRating: rules.avgRating,
      ratingCount: rules.ratingCount,
      categoryName: categories.name,
      createdAt: rules.createdAt,
    })
    .from(rules)
    .innerJoin(categories, eq(rules.categoryId, categories.id))
    .where(eq(rules.authorId, userId))
    .orderBy(desc(rules.createdAt));

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    copyCount: r.copyCount ?? 0,
    avgRating: r.avgRating ?? 0,
    ratingCount: r.ratingCount ?? 0,
    categoryName: r.categoryName,
    createdAt: r.createdAt,
  }));
}

export interface CopyHistoryItem {
  id: string;
  ruleId: string;
  ruleTitle: string;
  ruleSlug: string;
  createdAt: Date;
}

export async function getCopyHistory(userId: string, limit = 20): Promise<CopyHistoryItem[]> {
  const rows = await db
    .select({
      id: copies.id,
      ruleId: rules.id,
      ruleTitle: rules.title,
      ruleSlug: rules.slug,
      createdAt: copies.createdAt,
    })
    .from(copies)
    .innerJoin(rules, eq(copies.ruleId, rules.id))
    .where(eq(copies.userId, userId))
    .orderBy(desc(copies.createdAt))
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    ruleId: r.ruleId,
    ruleTitle: r.ruleTitle,
    ruleSlug: r.ruleSlug,
    createdAt: r.createdAt,
  }));
}

export interface BookmarkedRuleForUI {
  id: string;
  slug: string;
  title: string;
  description: string;
  copyCount: number;
  rating: number;
  categoryName: string;
  bookmarkedAt: Date;
}

export async function getBookmarkedRules(userId: string): Promise<BookmarkedRuleForUI[]> {
  const rows = await db
    .select({
      id: rules.id,
      slug: rules.slug,
      title: rules.title,
      description: rules.description,
      copyCount: rules.copyCount,
      avgRating: rules.avgRating,
      categoryName: categories.name,
      bookmarkedAt: bookmarks.createdAt,
    })
    .from(bookmarks)
    .innerJoin(rules, eq(bookmarks.ruleId, rules.id))
    .innerJoin(categories, eq(rules.categoryId, categories.id))
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    copyCount: r.copyCount ?? 0,
    rating: r.avgRating ?? 0,
    categoryName: r.categoryName,
    bookmarkedAt: r.bookmarkedAt,
  }));
}

export async function isBookmarked(userId: string, ruleId: string): Promise<boolean> {
  const [row] = await db
    .select({ ruleId: bookmarks.ruleId })
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.ruleId, ruleId)))
    .limit(1);
  return !!row;
}
