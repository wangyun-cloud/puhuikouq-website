import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, Tag, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortableText } from "@/components/portable-text";
import { sanityFetch, isSanityConfigured } from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/react";

interface ArticleDoc {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  quickAnswer: string;
  readTime: number;
  publishedAt: string;
  content: PortableTextBlock[];
  relatedArticles?: {
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    excerpt: string;
    readTime: number;
    publishedAt: string;
  }[];
}

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

const allSlugsQuery = `*[_type == "article"] { slug { current } }`;

const fallbackArticles: Record<string, ArticleDoc> = {
  "implant-aftercare": {
    _id: "article-1",
    title: "种植牙术后注意事项",
    slug: { current: "implant-aftercare" },
    category: "implant",
    excerpt: "了解种植牙手术后的护理要点，帮助创口顺利恢复，延长种植牙使用年限。",
    quickAnswer:
      "种植牙术后需保持口腔清洁、避免过硬过热食物、按时复诊，通常恢复期为数周至数月。",
    readTime: 5,
    publishedAt: "2024-04-01T08:00:00.000Z",
    content: [
      {
        _type: "block",
        style: "normal",
        _key: "intro",
        children: [
          {
            _type: "span",
            _key: "intro-span",
            text: "种植牙手术完成后，术后的护理对创口的愈合和种植牙的长期稳定有着重要影响。患者应在术后注意以下几个方面：",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-1",
        children: [
          {
            _type: "span",
            _key: "h2-1-span",
            text: "术后24小时内应注意什么？",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p1",
        children: [
          {
            _type: "span",
            _key: "p1-span",
            text: "手术后24小时内，创口尚未完全止血，建议不要频繁漱口或吸吮伤口，以免破坏血凝块。饮食方面应以温凉、流质或软食为主，避免辛辣刺激和过热的食物。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-2",
        children: [
          {
            _type: "span",
            _key: "h2-2-span",
            text: "日常口腔清洁如何维护？",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p2",
        children: [
          {
            _type: "span",
            _key: "p2-span",
            text: "术后第二天起可轻轻刷牙，注意避开手术区域。可使用医生推荐的漱口水辅助清洁，但不要用力漱口。保持口腔卫生有助于降低感染风险。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-3",
        children: [
          {
            _type: "span",
            _key: "h2-3-span",
            text: "饮食和生活习惯建议",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-1",
        children: [
          {
            _type: "span",
            _key: "li1",
            text: "术后一周内避免吸烟、饮酒，以免影响愈合",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-2",
        children: [
          {
            _type: "span",
            _key: "li2",
            text: "避免用手术侧咀嚼硬物",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-3",
        children: [
          {
            _type: "span",
            _key: "li3",
            text: "保证充足睡眠，避免剧烈运动",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-4",
        children: [
          {
            _type: "span",
            _key: "li4",
            text: "按时复诊，配合医生检查愈合情况",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "closing",
        children: [
          {
            _type: "span",
            _key: "closing-span",
            text: "如果在恢复期间出现异常出血、剧烈疼痛或肿胀加重等情况，应及时联系医生进行处理。",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  "invisible-orthodontics-candidates": {
    _id: "article-2",
    title: "隐形矫正适合哪些人群",
    slug: { current: "invisible-orthodontics-candidates" },
    category: "orthodontics",
    excerpt: "隐形矫正作为一种牙齿矫正方式，适合部分对美观要求较高的青少年和成年人。",
    quickAnswer:
      "隐形矫正适合牙齿排列问题较轻至中度、自律性强、对美观有要求的青少年及成年人。",
    readTime: 6,
    publishedAt: "2024-03-20T08:00:00.000Z",
    content: [
      {
        _type: "block",
        style: "normal",
        _key: "intro",
        children: [
          {
            _type: "span",
            _key: "intro-span",
            text: "隐形矫正因其透明、可自行摘戴的特点，受到越来越多患者的关注。不过，并不是所有人都适合这种矫正方式。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-1",
        children: [
          {
            _type: "span",
            _key: "h2-1-span",
            text: "适合隐形矫正的人群特征",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p1",
        children: [
          {
            _type: "span",
            _key: "p1-span",
            text: "一般来说，牙齿排列不齐程度为轻至中度的患者，更适合选择隐形矫正。此外，患者需要具备较强的自律性，能够按照医嘱每天佩戴足够的时间。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-2",
        children: [
          {
            _type: "span",
            _key: "h2-2-span",
            text: "哪些情况可能不太适合？",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p2",
        children: [
          {
            _type: "span",
            _key: "p2-span",
            text: "严重的骨性错颌畸形、复杂的牙齿移动需求，或者无法保证佩戴时间的患者，可能需要考虑其他矫正方案。具体是否适合，应由正畸医生通过面诊和影像学检查后判断。",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  "pediatric-oral-care-faq": {
    _id: "article-3",
    title: "儿童口腔护理的常见问题",
    slug: { current: "pediatric-oral-care-faq" },
    category: "pediatric",
    excerpt: "从乳牙萌出到恒牙替换，家长应关注孩子的口腔卫生习惯培养和定期检查。",
    quickAnswer:
      "儿童应从第一颗乳牙萌出后开始口腔清洁，每3-6个月进行一次口腔检查，养成良好刷牙习惯。",
    readTime: 4,
    publishedAt: "2024-03-15T08:00:00.000Z",
    content: [
      {
        _type: "block",
        style: "normal",
        _key: "intro",
        children: [
          {
            _type: "span",
            _key: "intro-span",
            text: "儿童口腔健康是全身健康的重要组成部分。家长在不同阶段需要采取不同的护理措施，帮助孩子建立良好的口腔卫生习惯。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-1",
        children: [
          {
            _type: "span",
            _key: "h2-1-span",
            text: "什么时候应该开始给孩子刷牙？",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p1",
        children: [
          {
            _type: "span",
            _key: "p1-span",
            text: "从孩子长出第一颗乳牙开始，家长就应使用干净的纱布或婴幼儿专用牙刷为孩子清洁口腔。随着牙齿增多，可以逐步教会孩子正确的刷牙方法。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-2",
        children: [
          {
            _type: "span",
            _key: "h2-2-span",
            text: "儿童多久需要看一次牙医？",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p2",
        children: [
          {
            _type: "span",
            _key: "p2-span",
            text: "建议每3至6个月带孩子进行一次口腔检查，以便及时发现龋齿、牙齿排列异常等问题，并进行早期干预。",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  "periodontal-early-signs": {
    _id: "article-4",
    title: "牙周病的早期信号",
    slug: { current: "periodontal-early-signs" },
    category: "periodontal",
    excerpt: "牙龈出血、口臭、牙龈退缩等可能是牙周组织出现问题的信号，建议尽早检查。",
    quickAnswer:
      "牙周病早期常见信号包括刷牙出血、牙龈红肿、持续性口臭和牙龈退缩，应尽早就医检查。",
    readTime: 5,
    publishedAt: "2024-03-10T08:00:00.000Z",
    content: [
      {
        _type: "block",
        style: "normal",
        _key: "intro",
        children: [
          {
            _type: "span",
            _key: "intro-span",
            text: "牙周病是常见的口腔慢性疾病，早期症状容易被忽视。了解这些信号有助于及早发现问题，避免病情进一步发展。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-1",
        children: [
          {
            _type: "span",
            _key: "h2-1-span",
            text: "常见的早期信号",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-1",
        children: [
          {
            _type: "span",
            _key: "li1",
            text: "刷牙或使用牙线时牙龈出血",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-2",
        children: [
          {
            _type: "span",
            _key: "li2",
            text: "牙龈红肿、触感变软",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-3",
        children: [
          {
            _type: "span",
            _key: "li3",
            text: "持续性口臭，难以通过刷牙消除",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "bullet",
        _key: "list-4",
        children: [
          {
            _type: "span",
            _key: "li4",
            text: "牙龈退缩，牙齿看起来变长",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "closing",
        children: [
          {
            _type: "span",
            _key: "closing-span",
            text: "如果出现上述情况，建议尽快预约口腔检查，由专业医生评估牙周健康状况并制定治疗计划。",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  "daily-oral-care-tips": {
    _id: "article-5",
    title: "日常口腔护理的正确方法",
    slug: { current: "daily-oral-care-tips" },
    category: "oral-care",
    excerpt: "掌握正确的刷牙方法、牙线使用技巧和漱口习惯，有助于维护口腔健康。",
    quickAnswer:
      "正确的口腔护理包括每天刷牙两次、每次至少两分钟，配合使用牙线清洁牙缝，定期口腔检查。",
    readTime: 4,
    publishedAt: "2024-03-05T08:00:00.000Z",
    content: [
      {
        _type: "block",
        style: "normal",
        _key: "intro",
        children: [
          {
            _type: "span",
            _key: "intro-span",
            text: "良好的日常口腔护理习惯是预防龋齿和牙周病的基础。以下是一些科学、实用的口腔护理建议。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-1",
        children: [
          {
            _type: "span",
            _key: "h2-1-span",
            text: "正确刷牙的方法",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p1",
        children: [
          {
            _type: "span",
            _key: "p1-span",
            text: "建议每天早晚各刷牙一次，每次刷牙时间不少于两分钟。使用软毛牙刷，采用巴氏刷牙法，将牙刷与牙面呈45度角，轻轻震颤清洁牙龈边缘和牙面。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-2",
        children: [
          {
            _type: "span",
            _key: "h2-2-span",
            text: "牙线和漱口水的使用",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p2",
        children: [
          {
            _type: "span",
            _key: "p2-span",
            text: "牙刷难以清洁牙缝区域，建议每天使用牙线一次。漱口水可作为辅助清洁手段，但不能替代刷牙和牙线。",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h2",
        _key: "h2-3",
        children: [
          {
            _type: "span",
            _key: "h2-3-span",
            text: "定期口腔检查的重要性",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        _key: "p3",
        children: [
          {
            _type: "span",
            _key: "p3-span",
            text: "即使没有明显的口腔不适，也建议每半年至一年进行一次口腔检查。早期发现龋齿、牙结石等问题，治疗更简单，费用也更低。",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
};

export async function generateStaticParams() {
  if (!isSanityConfigured()) {
    return Object.keys(fallbackArticles).map((slug) => ({ slug }));
  }

  try {
    const slugs = await sanityFetch<{ slug: { current: string } }[]>({
      query: allSlugsQuery,
      tags: ["article"],
    });
    return slugs.map((s) => ({ slug: s.slug.current }));
  } catch {
    return Object.keys(fallbackArticles).map((slug) => ({ slug }));
  }
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
      <div className="border-b bg-muted/30">
        <div className="container py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/knowledge" className="inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回知识库
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-12 text-white md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5">
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
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <div className="container pt-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border-l-4 border-primary bg-muted/40 p-5">
            <p className="text-sm font-medium text-muted-foreground">
              快速了解
            </p>
            <p className="mt-1 text-lg font-medium text-foreground">
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
        <section className="border-t bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-xl font-bold text-foreground">
                相关文章推荐
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.relatedArticles.map((related) => (
                  <Card key={related._id} className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-primary">
                          {categoryLabels[related.category as CategoryKey] || related.category}
                        </span>
                        <span>·</span>
                        <span>{new Date(related.publishedAt).toLocaleDateString("zh-CN")}</span>
                      </div>
                      <CardTitle className="text-base">
                        <Link
                          href={`/knowledge/${related.slug.current}`}
                          className="transition-colors hover:text-primary"
                        >
                          {related.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {related.excerpt}
                      </p>
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
