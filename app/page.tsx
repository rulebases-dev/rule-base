import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedRules } from "@/components/featured-rules";
import { RulesSection } from "@/components/rules-section";
import { CtaSection } from "@/components/cta-section";
import { getRules, getCategories } from "@/lib/rules";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "all" } = await searchParams;

  const [allRules, categories] = await Promise.all([
    getRules({ q: q || undefined, categorySlug: category || undefined }),
    getCategories(),
  ]);

  const featuredRules = await getRules({
    featured: true,
    limit: 3,
    sort: "popular",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6">
          <HeroSection />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <HowItWorks />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px divider-line" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <FeaturedRules rules={featuredRules} />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px divider-line" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <RulesSection
            categories={categories}
            selectedSlug={category}
            searchQuery={q}
            rules={allRules}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px divider-line" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <CtaSection />
        </div>
      </main>
    </div>
  );
}
