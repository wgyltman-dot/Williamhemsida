import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: process.env.NODE_ENV === "production" })
  : null;

const builder = client ? imageUrlBuilder(client) : null;
export function urlFor(source) {
  if (!builder) return { url: () => "" };
  return builder.image(source);
}

// ─── GROQ Queries ───────────────────────────────────────────────────────────

export async function getAllPosts() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
      coverImage { asset, alt }
    }`
  );
}

export async function getPostBySlug(slug) {
  if (!client) return null;
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
      coverImage { asset, alt },
      body,
      seoTitle,
      seoDescription
    }`,
    { slug }
  );
}

export async function getAllPostSlugs() {
  if (!client) return [];
  const posts = await client.fetch(`*[_type == "blogPost"] { slug }`);
  return posts.map((p) => ({ params: { slug: p.slug.current } }));
}

export async function getLatestPosts(limit = 3) {
  if (!client) return [];
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
      coverImage { asset, alt }
    }`,
    { limit }
  );
}

export async function getAllProjects() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "project"] | order(order asc, featured desc) {
      _id,
      title,
      slug,
      type,
      summary,
      image { asset, alt },
      link,
      github,
      technologies,
      featured
    }`
  );
}

export async function getAllPressArticles() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "pressArticle"] | order(date desc) {
      _id,
      publication,
      title,
      date,
      summary,
      link,
      tag,
      logo { asset, alt }
    }`
  );
}

export async function getAllCertificates() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "certificate"] | order(order asc, date desc) {
      _id,
      title,
      issuer,
      date,
      description,
      link,
      image { asset, alt },
      type
    }`
  );
}

export async function getAllReviews() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "review"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      rating,
      verdict,
      category,
      productUrl,
      excerpt,
      publishedAt,
      coverImage { asset, alt }
    }`
  );
}

export async function getReviewBySlug(slug) {
  if (!client) return null;
  return client.fetch(
    `*[_type == "review" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      rating,
      verdict,
      category,
      productUrl,
      excerpt,
      publishedAt,
      coverImage { asset, alt },
      pros,
      cons,
      body,
      seoTitle,
      seoDescription
    }`,
    { slug }
  );
}

export async function getAllReviewSlugs() {
  if (!client) return [];
  const reviews = await client.fetch(`*[_type == "review"] { slug }`);
  return reviews.map((r) => ({ params: { slug: r.slug.current } }));
}

export async function getAllExperiences() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "experience"] | order(order asc) {
      _id,
      role,
      company,
      companyUrl,
      startDate,
      endDate,
      current,
      description,
      technologies
    }`
  );
}
