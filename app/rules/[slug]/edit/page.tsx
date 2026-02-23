import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getRuleBySlug } from "@/lib/rules";
import { getCategories } from "@/lib/rules";
import { EditRuleForm } from "./edit-rule-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditRulePage({ params }: Props) {
  const { slug } = await params;
  const [session, rule] = await Promise.all([auth(), getRuleBySlug(slug)]);

  if (!session?.user?.id) {
    redirect(`/sign-in?callbackUrl=/rules/${slug}/edit`);
  }

  if (!rule) notFound();
  if (rule.authorId !== session.user.id) {
    redirect(`/rules/${slug}`);
  }

  const categories = await getCategories();

  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-64" />
      <div className="relative mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href={`/rules/${slug}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to rule
        </Link>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            Edit Rule
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Update your rule content.
          </p>
          <EditRuleForm
            rule={{
              id: rule.id,
              slug: rule.slug,
              title: rule.title,
              description: rule.description,
              content: rule.content,
              categoryId: rule.categoryId,
              tags: rule.tags,
            }}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
