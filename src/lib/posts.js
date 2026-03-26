import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const { data } = matter(raw);
    return { slug, ...data };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs() {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ params: { slug: f.replace(/\.md$/, "") } }));
}

export async function getPostBySlug(slug) {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return { slug, ...data, contentHtml: processed.toString() };
}
