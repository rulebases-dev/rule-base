"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateRule } from "@/lib/actions/rules";
import type { CategoryForUI } from "@/lib/rules";

interface RuleData {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  categoryId: string;
  tags: string[];
}

interface EditRuleFormProps {
  rule: RuleData;
  categories: CategoryForUI[];
}

export function EditRuleForm({ rule, categories }: EditRuleFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim().replace(/^#/, ""))
          .filter(Boolean)
          .slice(0, 8)
      : [];

    setIsLoading(true);
    try {
      const result = await updateRule(
        rule.id,
        {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          content: formData.get("content") as string,
          categoryId: formData.get("categoryId") as string,
          tags,
        },
        rule.slug
      );

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push(`/rules/${rule.slug}`);
    } catch {
      setError("Failed to update");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={rule.title}
          required
          minLength={3}
          maxLength={255}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
          Description
        </label>
        <Input
          id="description"
          name="description"
          defaultValue={rule.description}
          required
          minLength={10}
          maxLength={500}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="categoryId" className="mb-1.5 block text-sm font-medium">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={rule.categoryId}
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium">
          Rule Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={rule.content}
          required
          minLength={20}
          maxLength={10000}
          rows={12}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="tags" className="mb-1.5 block text-sm font-medium">
          Tags (comma-separated)
        </label>
        <Input
          id="tags"
          name="tags"
          defaultValue={rule.tags.join(", ")}
          placeholder="typescript, cursor, strict"
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gap-2"
        style={{
          background:
            "linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))",
          color: "#fff",
        }}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : null}
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
