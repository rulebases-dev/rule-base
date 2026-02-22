import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/rules";
import { NewRuleForm } from "./new-rule-form";

export default async function NewRulePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=/rules/new");
  }

  const categories = await getCategories();

  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-64" />
      <div className="relative mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            Submit a Rule
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Share your system prompt with the community.
          </p>
          <NewRuleForm categories={categories} />
        </div>
      </div>
    </div>
  );
}
