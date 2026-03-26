import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllReviews } from "@/lib/sanity";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function StarRating({ rating }) {
  return (
    <span className="text-yellow-500 font-bold text-sm">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      <span className="ml-1 text-dark/50 dark:text-light/50 font-normal">{rating}/5</span>
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

const ReviewCard = ({ title, slug, rating, verdict, category, excerpt, publishedAt }) => (
  <motion.article
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
    viewport={{ once: true }}
    className="w-full p-6 my-2 rounded-xl border border-solid border-dark border-r-4 border-b-4
      bg-light text-dark dark:bg-dark dark:border-light dark:text-light flex flex-col gap-3"
  >
    <div className="flex flex-wrap items-center gap-2">
      {category && (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark">
          {category}
        </span>
      )}
      {verdict && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${verdictColor[verdict] || ""}`}>
          {verdict}
        </span>
      )}
    </div>
    <Link href={`/reviews/${slug?.current || slug}`} className="text-2xl font-bold hover:underline md:text-xl xs:text-lg">
      {title}
    </Link>
    {rating && <StarRating rating={rating} />}
    {excerpt && <p className="text-dark/70 dark:text-light/70 text-sm leading-relaxed">{excerpt}</p>}
    <div className="flex items-center justify-between mt-2">
      <time dateTime={publishedAt} className="text-xs text-dark/50 dark:text-light/50">
        {formatDate(publishedAt)}
      </time>
      <Link href={`/reviews/${slug?.current || slug}`} className="text-sm font-semibold text-primary dark:text-primaryDark hover:underline">
        Read review →
      </Link>
    </div>
  </motion.article>
);

export async function getStaticProps() {
  let reviews = [];
  try {
    reviews = await getAllReviews();
  } catch {
    // Sanity not configured yet
  }
  return { props: { reviews: reviews || [] }, revalidate: 60 };
}

export default function Reviews({ reviews }) {
  return (
    <>
      <Head>
        <title>Reviews – William Gyltman</title>
        <meta name="description" content="Honest reviews of software, AI tools, and business solutions by William Gyltman, co-founder & CMO of Rankad.ai." />
        <meta property="og:title" content="Reviews – William Gyltman" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://williamreviews.com/reviews" />
        <link rel="canonical" href="https://williamreviews.com/reviews" />
      </Head>

      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText
            text="Reviews"
            className="!text-8xl !leading-tight mb-4 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
          />
          <p className="text-center text-dark/75 dark:text-light/75 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
            Honest reviews of software, AI tools, and business solutions.
          </p>

          {reviews.length === 0 ? (
            <div className="w-full text-center py-24 text-dark/50 dark:text-light/50">
              <p className="text-xl font-medium">No reviews yet — check back soon.</p>
              <p className="text-sm mt-2">Reviews are managed via Sanity CMS at <span className="font-mono">/studio</span>.</p>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              {reviews.map((review) => (
                <ReviewCard key={review._id} {...review} />
              ))}
            </div>
          )}

          <nav className="mt-12 flex flex-wrap gap-4 justify-center" aria-label="Explore more">
            <Link href="/" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Home</Link>
            <Link href="/about" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">About</Link>
            <Link href="/blog" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Blog</Link>
          </nav>
        </Layout>
      </main>
    </>
  );
}
