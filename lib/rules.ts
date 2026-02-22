import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { rules, categories, users } from "@/lib/db/schema";

export interface RuleForUI {
  id: string;
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
  slug: string;
  name: string;
}

export async function getCategories(): Promise<CategoryForUI[]> {
  const rows = await db
    .select({ slug: categories.slug, name: categories.name })
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
