"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CategoryForUI } from "@/lib/rules";

interface NewRuleFormProps {
  categories: CategoryForUI[];
}

export function NewRuleForm({ categories }: NewRuleFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

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

    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      categoryId: formData.get("categoryId") as string,
      tags,
      isPublic: true,
    };

    setIsLoading(true);
    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.details?.fieldErrors) {
          const errors: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.details.fieldErrors)) {
            errors[k] = Array.isArray(v) ? (v[0] as string) : String(v);
          }
          setFieldErrors(errors);
        }
        setError(data.error ?? "Something went wrong");
        return;
      }

      const slug = data.data?.slug;
      router.push(slug ? `/rules/${slug}` : "/");
    } catch {
      setError("Failed to submit");
    } finally {
      setIsLoading(false);
    }
  }

  const categoryOptions = categories.map((c) => ({
    value: c.slug,
    label: c.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-medium"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. TypeScript Strict DX Rules"
          required
          minLength={3}
          maxLength={255}
          className={fieldErrors.title ? "border-destructive" : ""}
        />
        {fieldErrors.title && (
          <p className="mt-1 text-xs text-destructive">{fieldErrors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium"
        >
          Description
        </label>
        <Input
          id="description"
          name="description"
          placeholder="Brief description of what this rule does"
          required
          minLength={10}
          maxLength={500}
          className={fieldErrors.description ? "border-destructive" : ""}
        />
        {fieldErrors.description && (
          <p className="mt-1 text-xs text-destructive">
            {fieldErrors.description}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="mb-1.5 block text-sm font-medium"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {fieldErrors.categoryId && (
          <p className="mt-1 text-xs text-destructive">{fieldErrors.categoryId}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-1.5 block text-sm font-medium"
        >
          Rule Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Paste your system prompt content here..."
          required
          minLength={20}
          maxLength={10000}
          rows={12}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {fieldErrors.content && (
          <p className="mt-1 text-xs text-destructive">{fieldErrors.content}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-1.5 block text-sm font-medium"
        >
          Tags (comma-separated)
        </label>
        <Input
          id="tags"
          name="tags"
          placeholder="typescript, cursor, strict"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gap-2"
        style={{
          background: "linear-gradient(to right, rgb(124, 58, 237), rgb(79, 70, 229))",
          color: "#fff",
        }}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : null}
        {isLoading ? "Submitting..." : "Submit Rule"}
      </Button>
    </form>
  );
}
