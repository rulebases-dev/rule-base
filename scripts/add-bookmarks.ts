import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS "bookmarks" (
      "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
      "rule_id" text NOT NULL REFERENCES "rules"("id") ON DELETE CASCADE,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "bookmarks_user_id_rule_id_pk" PRIMARY KEY("user_id","rule_id")
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "bookmarks_user_idx" ON "bookmarks" ("user_id")`;
  await sql`CREATE INDEX IF NOT EXISTS "bookmarks_rule_idx" ON "bookmarks" ("rule_id")`;
  console.log("✓ Bookmarks table added");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
