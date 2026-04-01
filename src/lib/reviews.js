import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const reviewsDir = path.join(process.cwd(), "reviews");

export function getAllReviews() {
  const files = fs.readdirSync(reviewsDir).filter((f) => f.endsWith(".md"));

  const reviews = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(reviewsDir, filename), "utf8");
    const { data } = matter(raw);
    return { slug, ...data };
  });

  return reviews.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllReviewSlugs() {
  return fs
    .readdirSync(reviewsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ params: { slug: f.replace(/\.md$/, "") } }));
}

export async function getReviewBySlug(slug) {
  const raw = fs.readFileSync(path.join(reviewsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return { slug, ...data, contentHtml: processed.toString() };
}
