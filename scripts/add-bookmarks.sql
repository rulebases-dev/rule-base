-- Add bookmarks table if not exists
CREATE TABLE IF NOT EXISTS "bookmarks" (
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "rule_id" text NOT NULL REFERENCES "rules"("id") ON DELETE CASCADE,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "bookmarks_user_id_rule_id_pk" PRIMARY KEY("user_id","rule_id")
);
CREATE INDEX IF NOT EXISTS "bookmarks_user_idx" ON "bookmarks" ("user_id");
CREATE INDEX IF NOT EXISTS "bookmarks_rule_idx" ON "bookmarks" ("rule_id");
