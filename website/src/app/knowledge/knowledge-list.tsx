"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CategoryKey = "implant" | "orthodontics" | "oral-care" | "periodontal" | "pediatric";

interface ArticleDoc {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  readTime: number;
  publishedAt: string;
}

const categoryLabels: Record<CategoryKey, string> = {
  implant: "种植牙",
  orthodontics: "正畸",
  "oral-care": "口腔护理",
  periodontal: "牙周",
  pediatric: "儿童口腔",
};

const categoryList: { key: CategoryKey; label: string }[] = [
  { key: "implant", label: "种植牙" },
  { key: "orthodontics", label: "正畸" },
  { key: "oral-care", label: "口腔护理" },
  { key: "periodontal", label: "牙周" },
  { key: "pediatric", label: "儿童口腔" },
];

interface KnowledgeListProps {
  articles: ArticleDoc[];
}

export function KnowledgeList({ articles }: KnowledgeListProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") as CategoryKey | null;

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Category Filter - Segmented Control */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-lg border border-[#e7e5e4] bg-[#f2efe8] p-1">
            <Link
              href="/knowledge"
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-all",
                !activeCategory
                  ? "bg-white text-[#1c1917] shadow-sm"
                  : "text-[#78716c] hover:text-[#1c1917]"
              )}
            >
              全部
            </Link>
            {categoryList.map((cat) => (
              <Link
                key={cat.key}
                href={`/knowledge?category=${cat.key}`}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.key
                    ? "bg-white text-[#1c1917] shadow-sm"
                    : "text-[#78716c] hover:text-[#1c1917]"
                )}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <Card
                key={article._id}
                className="group flex flex-col rounded-lg border border-[#e7e5e4] bg-white transition-all hover:border-[#0d7377]/20 hover:shadow-md"
              >
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center gap-3 text-xs text-[#78716c]">
                    <span className="inline-flex items-center rounded-full bg-[#0d7377]/10 px-2.5 py-1 font-medium text-[#0d7377]">
                      {categoryLabels[article.category as CategoryKey] ||
                        article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(article.publishedAt).toLocaleDateString("zh-CN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime} 分钟
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold leading-snug text-[#1c1917] transition-colors group-hover:text-[#0d7377]">
                    <Link href={`/knowledge/${article.slug.current}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mb-5 line-clamp-3 flex-1 text-sm text-[#57534e]">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={`/knowledge/${article.slug.current}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#0d7377] transition-opacity hover:opacity-80"
                    >
                      阅读全文
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[#78716c]">该分类下暂无文章</p>
            <Link
              href="/knowledge"
              className="mt-4 inline-flex items-center rounded-md border border-[#e7e5e4] bg-white px-4 py-2 text-sm font-medium text-[#1c1917] transition-colors hover:bg-[#f9f7f2]"
            >
              查看全部文章
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
