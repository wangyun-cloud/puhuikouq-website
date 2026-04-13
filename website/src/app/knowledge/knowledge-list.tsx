"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            variant={activeCategory ? "outline" : "default"}
            size="sm"
          >
            <Link href="/knowledge">全部</Link>
          </Button>
          {categoryList.map((cat) => (
            <Button
              key={cat.key}
              asChild
              variant={activeCategory === cat.key ? "default" : "outline"}
              size="sm"
            >
              <Link href={`/knowledge?category=${cat.key}`}>{cat.label}</Link>
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Card
                key={article._id}
                className="flex flex-col overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-primary">
                      <Tag className="h-3 w-3" />
                      {categoryLabels[article.category as CategoryKey] ||
                        article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publishedAt).toLocaleDateString("zh-CN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime} 分钟阅读
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    <Link
                      href={`/knowledge/${article.slug.current}`}
                      className="transition-colors hover:text-primary"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">该分类下暂无文章</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/knowledge">查看全部文章</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
