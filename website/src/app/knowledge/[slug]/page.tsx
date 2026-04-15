import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, Tag, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortableText } from "@/components/portable-text";
import { sanityFetch, isSanityConfigured } from "@/lib/sanity";
import { fallbackArticles } from "@/lib/article-content";
import type { ArticleDoc } from "@/lib/article-content";

export type { ArticleDoc };

type CategoryKey = "implant" | "orthodontics" | "oral-care" | "periodontal" | "pediatric";

const categoryLabels: Record<CategoryKey, string> = {
  implant: "种植牙",
  orthodontics: "正畸",
  "oral-care": "口腔护理",
  periodontal: "牙周",
  pediatric: "儿童口腔",
};

const articleQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug { current },
  category,
  excerpt,
  quickAnswer,
  readTime,
  publishedAt,
  content,
  relatedArticles[]-> {
    _id,
    title,
    slug { current },
    category,
    excerpt,
    readTime,
    publishedAt
  }
}`;

export async function generateStaticParams() {
  return Object.keys(fallbackArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let article: ArticleDoc | null = null;

  if (isSanityConfigured()) {
    try {
      article = await sanityFetch<ArticleDoc | null>({
        query: articleQuery,
        params: { slug },
        tags: ["article"],
      });
    } catch {
      article = fallbackArticles[slug] || null;
    }
  } else {
    article = fallbackArticles[slug] || null;
  }

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/knowledge/${article.slug.current}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: ArticleDoc | null = null;

  if (isSanityConfigured()) {
    try {
      article = await sanityFetch<ArticleDoc | null>({
        query: articleQuery,
        params: { slug },
        tags: ["article"],
      });
    } catch {
      article = fallbackArticles[slug] || null;
    }
  } else {
    article = fallbackArticles[slug] || null;
  }

  if (!article) {
    notFound();
  }

  const categoryLabel =
    categoryLabels[article.category as CategoryKey] || article.category;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "上海普惠口腔",
    },
    publisher: {
      "@type": "Organization",
      name: "上海普惠口腔",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://puhuikouq.com/knowledge/${article.slug.current}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* Breadcrumb / Back */}
      <div className="border-b border-border/40">
        <div className="container py-4">
          <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground hover:text-foreground">
            <Link href="/knowledge">
              <ChevronLeft className="h-4 w-4" />
              返回知识库
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-gradient-to-br from-medical-blue-dark via-medical-blue to-medical-blue-light py-12 text-white md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium tracking-wider text-white/80 uppercase">
              Knowledge
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5">
                <Tag className="h-3.5 w-3.5" />
                {categoryLabel}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.publishedAt).toLocaleDateString("zh-CN")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} 分钟阅读
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <div className="container pt-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border/40 bg-warm-cream p-6">
            <p className="text-xs font-medium tracking-wider text-primary uppercase">
              快速了解
            </p>
            <p className="mt-2 text-lg font-medium text-foreground">
              {article.quickAnswer}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none">
            <PortableText value={article.content} />
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="border-t border-border/40 bg-muted/20 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-medium tracking-wider text-primary uppercase">
                Related
              </p>
              <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
                相关文章推荐
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.relatedArticles.map((related) => (
                  <Card
                    key={related._id}
                    className="group flex flex-col overflow-hidden border-border/50 transition-all hover:border-primary/20 hover:shadow-lg"
                  >
                    <CardContent className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                          {categoryLabels[related.category as CategoryKey] || related.category}
                        </span>
                        <span>{new Date(related.publishedAt).toLocaleDateString("zh-CN")}</span>
                      </div>
                      <h3 className="mb-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                        <Link href={`/knowledge/${related.slug.current}`}>
                          {related.title}
                        </Link>
                      </h3>
                      <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
                        {related.excerpt}
                      </p>
                      <div className="mt-auto">
                        <Link
                          href={`/knowledge/${related.slug.current}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                        >
                          阅读全文
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
