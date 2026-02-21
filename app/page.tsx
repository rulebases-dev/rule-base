"use client";

import { useMemo, useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedRules } from "@/components/featured-rules";
import { CategoryPills } from "@/components/category-pills";
import { PromptGrid } from "@/components/prompt-grid";

import { CtaSection } from "@/components/cta-section";
import { type Category, rules } from "@/lib/data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      const matchesCategory =
        selectedCategory === "All" || rule.category === selectedCategory;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        rule.title.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6">
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <HowItWorks />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px divider-line" />
        </div>

        {/* Trending - luôn hiển thị, không phụ thuộc filter */}
        <div className="mx-auto max-w-6xl px-6">
          <FeaturedRules rules={rules} />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px divider-line" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14">
          <CategoryPills
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <PromptGrid rules={filteredRules} />
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
