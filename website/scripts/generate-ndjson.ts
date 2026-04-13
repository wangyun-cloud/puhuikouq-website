import { fallbackArticles } from "../src/lib/article-content";
import * as fs from "fs";
import * as path from "path";

const lines: string[] = [];

for (const article of Object.values(fallbackArticles)) {
  const doc = {
    _id: article._id,
    _type: "article",
    title: article.title,
    slug: article.slug,
    category: article.category,
    excerpt: article.excerpt,
    quickAnswer: article.quickAnswer,
    readTime: article.readTime,
    publishedAt: article.publishedAt,
    content: article.content,
    relatedArticles:
      article.relatedArticles?.map((a) => ({
        _type: "reference",
        _ref: a._id,
      })) || [],
  };
  lines.push(JSON.stringify(doc));
}

const outputPath = path.resolve(
  __dirname,
  "../../studio/sample-data/articles-10.ndjson"
);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf-8");

console.log(`Generated ${lines.length} articles to ${outputPath}`);
