import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { users, categories, rules } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { rules as seedRules } from "../lib/data";

const SEED_EMAIL = "rulebase@system.local";

async function seed() {
  const { db } = await import("../lib/db");
  console.log("🌱 Seeding...");

  // 1. Seed user (author for rules)
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, SEED_EMAIL))
    .limit(1);

  let seedUserId: string;
  if (existingUser) {
    seedUserId = existingUser.id;
    console.log("  ✓ Seed user already exists");
  } else {
    const hash = await bcrypt.hash("seed-password-not-for-login", 10);
    const [u] = await db
      .insert(users)
      .values({
        name: "RuleBase",
        email: SEED_EMAIL,
        emailVerified: new Date(),
        passwordHash: hash,
      })
      .returning();
    seedUserId = u!.id;
    console.log("  ✓ Created seed user");
  }

  // 2. Categories (slug matches lib/data categories except "All")
  const categorySlugs = [
    "nextjs",
    "python",
    "react-native",
    "typescript",
    "general",
    "backend",
  ];
  const categoryMap: Record<string, string> = {};

  for (const slug of categorySlugs) {
    const name =
      slug === "nextjs"
        ? "Next.js"
        : slug === "react-native"
          ? "React Native"
          : slug.charAt(0).toUpperCase() + slug.slice(1);

    const [existing] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    if (existing) {
      categoryMap[name] = existing.id;
    } else {
      const [c] = await db
        .insert(categories)
        .values({ name, slug })
        .returning();
      categoryMap[name] = c!.id;
    }
  }
  console.log("  ✓ Categories ready");

  // 3. Rules
  const catId = (cat: string) => categoryMap[cat] ?? categoryMap["General"];

  let inserted = 0;
  for (const r of seedRules) {
    const [existing] = await db
      .select()
      .from(rules)
      .where(eq(rules.slug, r.id))
      .limit(1);

    if (existing) continue;

    await db.insert(rules).values({
      title: r.title,
      slug: r.id,
      description: r.description,
      content: r.content,
      authorId: seedUserId,
      categoryId: catId(r.category),
      tags: r.tags,
      isFeatured: r.featured,
      copyCount: r.copyCount,
      avgRating: r.rating,
      ratingCount: Math.floor(r.copyCount / 1000),
    });
    inserted++;
  }
  console.log(`  ✓ Inserted ${inserted} rules`);

  console.log("✅ Seed complete");
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
