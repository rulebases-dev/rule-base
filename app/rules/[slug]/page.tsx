import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getRuleBySlug, getRelatedRules } from "@/lib/rules";
import { isBookmarked } from "@/lib/dashboard";
import { RuleDetailContent } from "./rule-detail-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rule = await getRuleBySlug(slug);
  if (!rule) return { title: "Rule not found" };
  return {
    title: `${rule.title} — RuleBase`,
    description: rule.description,
    openGraph: {
      title: rule.title,
      description: rule.description,
      type: "article",
    },
  };
}

export default async function RuleDetailPage({ params }: Props) {
  const { slug } = await params;
  const [rule, session] = await Promise.all([
    getRuleBySlug(slug),
    auth(),
  ]);
  if (!rule) notFound();

  const [relatedRules, bookmarked] = await Promise.all([
    getRelatedRules(rule.categoryId, rule.id),
    session?.user?.id ? isBookmarked(session.user.id, rule.id) : Promise.resolve(false),
  ]);

  return (
    <div className="relative min-h-screen">
      <div className="hero-grid pointer-events-none absolute inset-0 h-64" />
      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <RuleDetailContent
          rule={rule}
          relatedRules={relatedRules}
          isSignedIn={!!session?.user}
          isBookmarked={bookmarked}
        />
      </div>
    </div>
  );
}
