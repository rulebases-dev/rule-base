import { and, desc, eq, ilike, ne, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { rules, categories, users } from "@/lib/db/schema";

export interface RuleForUI {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  avatar: string;
  category: string;
  copyCount: number;
  rating: number;
  featured: boolean;
  content: string;
}

export interface CategoryForUI {
  id: string;
  slug: string;
  name: string;
}

export async function getCategories(): Promise<CategoryForUI[]> {
  const rows = await db
    .select({ id: categories.id, slug: categories.slug, name: categories.name })
    .from(categories)
    .orderBy(categories.name);
  return rows;
}

export async function getRules(params: {
  q?: string;
  categorySlug?: string;
  featured?: boolean;
  sort?: "newest" | "popular" | "top-rated";
  limit?: number;
}): Promise<RuleForUI[]> {
  const { q, categorySlug, featured, sort = "newest", limit = 50 } = params;

  const conditions = [eq(rules.isPublic, true)];

  if (q && q.trim()) {
    conditions.push(
      or(
        ilike(rules.title, `%${q.trim()}%`),
        ilike(rules.description, `%${q.trim()}%`)
      )!
    );
  }

  if (categorySlug && categorySlug !== "all" && categorySlug !== "") {
    conditions.push(eq(categories.slug, categorySlug));
  }

  if (featured) {
    conditions.push(eq(rules.isFeatured, true));
  }

  const orderBy =
    sort === "popular"
      ? desc(rules.copyCount)
      : sort === "top-rated"
        ? desc(rules.avgRating)
        : desc(rules.createdAt);

  const rows = await db
    .select({
      id: rules.id,
      slug: rules.slug,
      title: rules.title,
      description: rules.description,
      content: rules.content,
      tags: rules.tags,
      copyCount: rules.copyCount,
      avgRating: rules.avgRating,
      isFeatured: rules.isFeatured,
      authorName: users.name,
      categoryName: categories.name,
    })
    .from(rules)
    .innerJoin(users, eq(rules.authorId, users.id))
    .innerJoin(categories, eq(rules.categoryId, categories.id))
    .where(and(...conditions))
    .orderBy(orderBy)
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    tags: r.tags ?? [],
    author: r.authorName ?? "Anonymous",
    avatar: (r.authorName ?? "?")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    category: r.categoryName,
    copyCount: r.copyCount ?? 0,
    rating: r.avgRating ?? 0,
    featured: r.isFeatured ?? false,
    content: r.content ?? "",
  }));
}

export interface RuleDetailForUI {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  copyCount: number;
  avgRating: number;
  ratingCount: number;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  createdAt: Date;
}

export async function getRuleBySlug(slug: string): Promise<RuleDetailForUI | null> {
  const [row] = await db
    .select({
      id: rules.id,
      slug: rules.slug,
      title: rules.title,
      description: rules.description,
      content: rules.content,
      tags: rules.tags,
      copyCount: rules.copyCount,
      avgRating: rules.avgRating,
      ratingCount: rules.ratingCount,
      categoryId: rules.categoryId,
      createdAt: rules.createdAt,
      authorId: users.id,
      authorName: users.name,
      authorImage: users.image,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(rules)
    .innerJoin(users, eq(rules.authorId, users.id))
    .innerJoin(categories, eq(rules.categoryId, categories.id))
    .where(eq(rules.slug, slug))
    .limit(1);

  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content ?? "",
    tags: row.tags ?? [],
    copyCount: row.copyCount ?? 0,
    avgRating: row.avgRating ?? 0,
    ratingCount: row.ratingCount ?? 0,
    authorId: row.authorId,
    authorName: row.authorName ?? "Anonymous",
    authorImage: row.authorImage,
    categoryId: row.categoryId,
    categoryName: row.categoryName,
    categorySlug: row.categorySlug,
    createdAt: row.createdAt,
  };
}

export async function getRelatedRules(
  categoryId: string,
  excludeId: string,
  limit = 4
): Promise<RuleForUI[]> {
  const rows = await db
    .select({
      id: rules.id,
      slug: rules.slug,
      title: rules.title,
      description: rules.description,
      content: rules.content,
      tags: rules.tags,
      copyCount: rules.copyCount,
      avgRating: rules.avgRating,
      isFeatured: rules.isFeatured,
      authorName: users.name,
      categoryName: categories.name,
    })
    .from(rules)
    .innerJoin(users, eq(rules.authorId, users.id))
    .innerJoin(categories, eq(rules.categoryId, categories.id))
    .where(and(eq(rules.categoryId, categoryId), ne(rules.id, excludeId), eq(rules.isPublic, true)))
    .orderBy(desc(rules.copyCount))
    .limit(limit);

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    tags: r.tags ?? [],
    author: r.authorName ?? "Anonymous",
    avatar: (r.authorName ?? "?")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    category: r.categoryName,
    copyCount: r.copyCount ?? 0,
    rating: r.avgRating ?? 0,
    featured: r.isFeatured ?? false,
    content: r.content ?? "",
  }));
}
