import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import { getAllReviewSlugs, getReviewBySlug, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function StarRating({ rating }) {
  return (
    <span className="text-yellow-500 font-bold text-2xl">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      <span className="ml-2 text-dark/50 dark:text-light/50 font-normal text-base">{rating}/5</span>
    </span>
  );
}

const verdictColor = {
  "Highly Recommended": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "Recommended": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "Worth Trying": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Mixed": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "Not Recommended": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img src={urlFor(value).width(800).url()} alt={value.alt || ""} className="rounded-xl w-full" loading="lazy" />
          {value.caption && <figcaption className="text-center text-sm text-dark/50 dark:text-light/50 mt-2">{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-6 bg-dark/5 dark:bg-light/5 rounded-xl p-4 overflow-x-auto text-sm font-mono">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-dark dark:text-light">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-dark dark:text-light">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-2 text-dark dark:text-light">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary dark:border-primaryDark pl-6 my-6 italic text-dark/70 dark:text-light/70">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-4 leading-relaxed text-dark/85 dark:text-light/85">{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value.href} target={value.blank ? "_blank" : undefined} rel={value.blank ? "noopener nofollow" : undefined} className="underline underline-offset-2 text-primary dark:text-primaryDark">
        {children}
      </a>
    ),
    code: ({ children }) => <code className="bg-dark/10 dark:bg-light/10 rounded px-1.5 py-0.5 font-mono text-sm">{children}</code>,
  },
};

export async function getStaticPaths() {
  let paths = [];
  try {
    paths = await getAllReviewSlugs();
  } catch {}
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  let review = null;
  try {
    review = await getReviewBySlug(params.slug);
  } catch {}
  if (!review) return { notFound: true };
  return { props: { review }, revalidate: 60 };
}

export default function ReviewPage({ review }) {
  const seoTitle = review.seoTitle || `${review.title} Review`;
  const seoDesc = review.seoDescription || review.excerpt || "";
  const coverUrl = review.coverImage?.asset ? urlFor(review.coverImage).width(1200).url() : "";
  const canonicalSlug = review.slug?.current || review.slug;

  return (
    <>
      <Head>
        <title>{seoTitle} – William Gyltman</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://williamreviews.com/reviews/${canonicalSlug}`} />
        {coverUrl && <meta property="og:image" content={coverUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://williamreviews.com/reviews/${canonicalSlug}`} />
      </Head>

      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden">
        <Layout className="pt-16 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="text-sm text-dark/50 dark:text-light/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link>
            {" / "}
            <Link href="/reviews" className="hover:underline">Reviews</Link>
            {" / "}
            <span className="text-dark dark:text-light">{review.title}</span>
          </nav>

          {/* Category & verdict */}
          <div className="flex flex-wrap gap-2 mb-4">
            {review.category && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark">
                {review.category}
              </span>
            )}
            {review.verdict && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${verdictColor[review.verdict] || ""}`}>
                {review.verdict}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-dark dark:text-light leading-tight mb-4 lg:text-4xl sm:text-3xl">
            {review.title}
          </h1>

          {/* Rating & meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {review.rating && <StarRating rating={review.rating} />}
            <div className="flex items-center gap-3 text-sm text-dark/50 dark:text-light/50">
              <span>William Gyltman</span>
              <span>·</span>
              <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
            </div>
          </div>

          {/* Product link */}
          {review.productUrl && (
            <a
              href={review.productUrl}
              target="_blank"
              rel="noopener nofollow"
              className="inline-block mb-8 rounded-lg border-2 border-solid bg-dark px-5 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light text-sm"
            >
              Visit {review.title} →
            </a>
          )}

          {/* Cover image */}
          {coverUrl && (
            <div className="w-full mb-10 rounded-xl overflow-hidden">
              <img src={coverUrl} alt={review.coverImage?.alt || review.title} className="w-full h-auto object-cover" />
            </div>
          )}

          {/* Pros & Cons */}
          {(review.pros?.length > 0 || review.cons?.length > 0) && (
            <div className="grid grid-cols-2 gap-6 mb-10 sm:grid-cols-1">
              {review.pros?.length > 0 && (
                <div className="rounded-xl border border-solid border-dark/10 dark:border-light/10 p-5">
                  <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">Pros</h3>
                  <ul className="space-y-2">
                    {review.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dark/80 dark:text-light/80">
                        <span className="text-green-500 mt-0.5">✓</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons?.length > 0 && (
                <div className="rounded-xl border border-solid border-dark/10 dark:border-light/10 p-5">
                  <h3 className="font-bold text-lg mb-3 text-red-600 dark:text-red-400">Cons</h3>
                  <ul className="space-y-2">
                    {review.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dark/80 dark:text-light/80">
                        <span className="text-red-500 mt-0.5">✗</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Body */}
          {review.body && (
            <div className="prose-custom text-dark dark:text-light">
              <PortableText value={review.body} components={ptComponents} />
            </div>
          )}

          {/* Back nav */}
          <div className="mt-16 pt-8 border-t border-solid border-dark/10 dark:border-light/10 flex flex-wrap gap-4">
            <Link href="/reviews" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">
              ← All Reviews
            </Link>
            <Link href="/" className="inline-block rounded-lg border-2 border-solid border-dark px-4 py-2 font-semibold text-dark hover:bg-dark hover:text-light dark:border-light dark:text-light dark:hover:bg-light dark:hover:text-dark">
              Home
            </Link>
          </div>

        </Layout>
      </main>
    </>
  );
}
