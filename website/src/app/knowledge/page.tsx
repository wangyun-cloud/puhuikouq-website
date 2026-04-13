import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch, isSanityConfigured } from "@/lib/sanity";
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

const fallbackArticles: ArticleDoc[] = [
  {
    _id: "article-1",
    title: "种植牙术后注意事项",
    slug: { current: "implant-aftercare" },
    category: "implant",
    excerpt: "了解种植牙手术后的护理要点，帮助创口顺利恢复，延长种植牙使用年限。",
    readTime: 5,
    publishedAt: "2024-04-01T08:00:00.000Z",
  },
  {
    _id: "article-2",
    title: "隐形矫正适合哪些人群",
    slug: { current: "invisible-orthodontics-candidates" },
    category: "orthodontics",
    excerpt: "隐形矫正作为一种牙齿矫正方式，适合部分对美观要求较高的青少年和成年人。",
    readTime: 6,
    publishedAt: "2024-03-20T08:00:00.000Z",
  },
  {
    _id: "article-3",
    title: "儿童口腔护理的常见问题",
    slug: { current: "pediatric-oral-care-faq" },
    category: "pediatric",
    excerpt: "从乳牙萌出到恒牙替换，家长应关注孩子的口腔卫生习惯培养和定期检查。",
    readTime: 4,
    publishedAt: "2024-03-15T08:00:00.000Z",
  },
  {
    _id: "article-4",
    title: "牙周病的早期信号",
    slug: { current: "periodontal-early-signs" },
    category: "periodontal",
    excerpt: "牙龈出血、口臭、牙龈退缩等可能是牙周组织出现问题的信号，建议尽早检查。",
    readTime: 5,
    publishedAt: "2024-03-10T08:00:00.000Z",
  },
  {
    _id: "article-5",
    title: "日常口腔护理的正确方法",
    slug: { current: "daily-oral-care-tips" },
    category: "oral-care",
    excerpt: "掌握正确的刷牙方法、牙线使用技巧和漱口习惯，有助于维护口腔健康。",
    readTime: 4,
    publishedAt: "2024-03-05T08:00:00.000Z",
  },
];

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
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-16 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              口腔健康知识库
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
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
