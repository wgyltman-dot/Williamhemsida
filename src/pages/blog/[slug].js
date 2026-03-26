import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getStaticPaths() {
  return { paths: getAllSlugs(), fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} – William Gyltman</title>
        <meta name="description" content={post.excerpt || ""} />
        <link rel="canonical" href={`https://williamreviews.com/blog/${post.slug}`} />
      </Head>

      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden">
        <Layout className="pt-16 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="text-sm text-dark/50 dark:text-light/50 mb-8">
            <Link href="/" className="hover:underline">Hem</Link>
            {" / "}
            <Link href="/blog" className="hover:underline">Blogg</Link>
            {" / "}
            <span className="text-dark dark:text-light">{post.title}</span>
          </nav>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl font-bold text-dark dark:text-light leading-tight mb-4 lg:text-4xl sm:text-3xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-dark/50 dark:text-light/50 mb-10">
            <span>William Gyltman</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          {/* Body */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-dark dark:prose-headings:text-light
              prose-p:text-dark/85 dark:prose-p:text-light/85
              prose-a:text-primary dark:prose-a:text-primaryDark prose-a:underline
              prose-strong:text-dark dark:prose-strong:text-light
              prose-li:text-dark/85 dark:prose-li:text-light/85
              prose-blockquote:border-primary dark:prose-blockquote:border-primaryDark"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Back nav */}
          <div className="mt-16 pt-8 border-t border-solid border-dark/10 dark:border-light/10 flex flex-wrap gap-4">
            <Link href="/blog" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">
              ← Alla inlägg
            </Link>
            <Link href="/" className="inline-block rounded-lg border-2 border-solid border-dark px-4 py-2 font-semibold text-dark hover:bg-dark hover:text-light dark:border-light dark:text-light dark:hover:bg-light dark:hover:text-dark">
              Hem
            </Link>
          </div>

        </Layout>
      </main>
    </>
  );
}
