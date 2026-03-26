import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts } from "@/lib/posts";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const PostCard = ({ slug, title, date, excerpt, tags }) => (
  <motion.article
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
    viewport={{ once: true }}
    className="w-full p-6 my-2 rounded-xl border border-solid border-dark border-r-4 border-b-4
      bg-light text-dark dark:bg-dark dark:border-light dark:text-light flex flex-col gap-3"
  >
    <div className="flex flex-wrap gap-2">
      {(tags || []).map((tag) => (
        <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark">
          {tag}
        </span>
      ))}
    </div>
    <Link href={`/blog/${slug}`} className="text-2xl font-bold hover:underline md:text-xl xs:text-lg">
      {title}
    </Link>
    {excerpt && <p className="text-dark/70 dark:text-light/70 text-sm leading-relaxed">{excerpt}</p>}
    <div className="flex items-center justify-between mt-2">
      <time dateTime={date} className="text-xs text-dark/50 dark:text-light/50">
        {formatDate(date)}
      </time>
      <Link href={`/blog/${slug}`} className="text-sm font-semibold text-primary dark:text-primaryDark hover:underline">
        Läs mer →
      </Link>
    </div>
  </motion.article>
);

export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blogg – William Gyltman</title>
        <meta name="description" content="Tankar om AI-sökning, tillväxt och entrepreneurskap av William Gyltman, co-founder & CMO på Rankad.ai." />
        <link rel="canonical" href="https://williamreviews.com/blog" />
      </Head>

      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText
            text="Blogg"
            className="!text-8xl !leading-tight mb-4 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
          />
          <p className="text-center text-dark/75 dark:text-light/75 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
            Tankar om AI-sökning, tillväxt och att bygga startups.
          </p>

          {posts.length === 0 ? (
            <div className="w-full text-center py-24 text-dark/50 dark:text-light/50">
              <p className="text-xl font-medium">Inga inlägg ännu — kom tillbaka snart.</p>
              <p className="text-sm mt-2">Lägg till <span className="font-mono">.md</span>-filer i <span className="font-mono">/posts</span>-mappen.</p>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              {posts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          )}

          <nav className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Hem</Link>
            <Link href="/about" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Om mig</Link>
          </nav>
        </Layout>
      </main>
    </>
  );
}
