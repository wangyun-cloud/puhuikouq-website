import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch, isSanityConfigured } from "@/lib/sanity";
import { fallbackArticleList } from "@/lib/article-content";
import { KnowledgeList } from "./knowledge-list";

interface ArticleDoc {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  readTime: number;
  publishedAt: string;
}

const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug { current },
  category,
  excerpt,
  readTime,
  publishedAt
}`;

const fallbackArticles: ArticleDoc[] = fallbackArticleList;

export const metadata: Metadata = {
  title: "口腔健康知识库",
  description:
    "浏览上海普惠口腔的健康知识文章，了解种植牙、牙齿矫正、口腔护理、牙周治疗、儿童口腔等相关内容。",
  alternates: {
    canonical: "/knowledge",
  },
};

export default async function KnowledgePage() {
  let articles: ArticleDoc[] = [];

  if (isSanityConfigured()) {
    try {
      articles = await sanityFetch<ArticleDoc[]>({
        query: articlesQuery,
        tags: ["article"],
      });
    } catch {
      articles = fallbackArticles;
    }
  } else {
    articles = fallbackArticles;
  }

  const displayArticles = articles.length > 0 ? articles : fallbackArticles;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "口腔健康知识库",
    itemListElement: displayArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://puhuikouq.com/knowledge/${article.slug.current}`,
      name: article.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#f9f7f2] py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              上海普惠口腔
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl lg:text-5xl">
              口腔健康知识库
            </h1>
            <p className="text-lg text-[#57534e] md:text-xl">
              科学的口腔健康科普，帮助您更好地了解牙齿保健与诊疗知识
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <KnowledgeList articles={displayArticles} />
      </Suspense>
    </>
  );
}
