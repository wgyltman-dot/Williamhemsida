import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://williamreviews.com" },
    { "@type": "ListItem", position: 2, name: "Media", item: "https://williamreviews.com/media" },
  ],
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Press & Media – William Gyltman",
  url: "https://williamreviews.com/media",
  description: "Press coverage and media mentions of William Gyltman, co-founder & CMO of Rankad.ai. Featured in Skaraborgs Allehanda, Breakit, Yuncture, National Law Review, and more.",
  dateModified: "2026-03-17",
  author: { "@type": "Person", name: "William Gyltman", url: "https://williamreviews.com" },
};

const pressArticles = [
  {
    publication: "Skaraborgs Allehanda (SLA)",
    title: "Tibrosonen i Silicon Valley: \"Våga drömma oerhört stort\"",
    date: "March 12, 2026",
    summary: "Profile feature on William Gyltman — the Tibro native who co-founded Rankad.ai and made it to Silicon Valley's The Residency. Quoted: 'Man ska våga drömma oerhört stort' — dare to dream enormously big.",
    link: "https://www.sla.se/2026/03/12/tibrosonen-i-silicon-valley-vaga-dromma-oerhort-stort-6f864/",
    tag: "Feature",
  },
  {
    publication: "Yuncture",
    title: "20- och 23-åringarna bakom Rankad antagna till Silicon Valleys The Residency",
    date: "March 4, 2026",
    summary: "Yuncture covers how William Gyltman and the Rankad team built their startup from Yuncture's Gothenburg incubator to acceptance into The Residency accelerator in San Francisco — 1 of 25 from 3,500+ global applicants.",
    link: "https://www.yuncture.com/news/20-och-23-aringarna-bakom-rankad-antagna-till-silicon-valleys-the-residency",
    tag: "Accelerator",
  },
  {
    publication: "Breakit",
    title: "AI, mode och Lovable för hårdvara – här är de senaste bolagen i Breakits värld",
    date: "March 17, 2026",
    summary: "Rankad.ai featured in Breakit's Startupkollen as one of Sweden's startups to watch — listed among the latest companies building in AI, fashion, and hardware.",
    link: "https://www.breakit.se/artikel/45777/ai-mode-och-lovable-for-hardvara-har-ar-de-senaste-bolagen-i-breakits-varld",
    tag: "Startup Feature",
  },
  {
    publication: "Hallandsposten",
    title: "Liam Karlsson från Veinge jagar drömmen i Silicon Valley",
    date: "March 11, 2026",
    summary: "Hallandsposten covers Rankad.ai's journey to Silicon Valley and The Residency in San Francisco — building an autonomous AI search technology platform.",
    link: "https://www.hallandsposten.se/hallands-affarer/liam-karlsson-fran-veinge-jagar-drommen-i-silicon-valley.f089823e-ee42-4222-90a2-0dc97333bde3",
    tag: "Feature",
  },
  {
    publication: "National Law Review",
    title: "The 20 and 23-Year-Olds Behind Rankad Accepted into Silicon Valley's The Residency",
    date: "2026",
    summary: "International press coverage of Rankad.ai's acceptance into The Residency, syndicated across US media including the National Law Review, Palm Beach Post, and IndyStar.",
    link: "https://natlawreview.com/press-releases/20-and-23-year-olds-behind-rankad-accepted-silicon-valleys-residency",
    tag: "Press Release",
  },
  {
    publication: "Swedish Tech News PRO",
    title: "Rankad.ai in Swedish startup funding roundup",
    date: "February 17, 2026",
    summary: "Rankad.ai mentioned alongside 10 other notable Swedish tech startups in Swedish Tech News PRO's funding news roundup.",
    link: "https://www.swedishtechnews.com/swedish-tech-news-pro-feb-17-2026/",
    tag: "News",
  },
];

const PressCard = ({ publication, title, date, summary, link, tag }) => (
  <motion.li
    initial={{ y: 200 }}
    whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    viewport={{ once: true }}
    className="relative w-full p-4 py-6 my-2 rounded-xl flex sm:flex-col items-start justify-between
    bg-light text-dark first:mt-0 border border-solid border-dark
    border-r-4 border-b-4 dark:bg-dark dark:border-light gap-4"
  >
    <div className="flex flex-col flex-1 gap-1">
      <span className="text-secondary font-semibold dark:text-secondary text-sm">{publication}</span>
      <a
        href={link}
        target="_blank"
        rel="noopener nofollow"
        className="text-xl font-semibold hover:underline dark:text-light md:text-lg xs:text-base"
      >
        {title}
      </a>
      <p className="text-dark/75 dark:text-light/75 text-sm mt-1">{summary}</p>
    </div>
    <div className="flex flex-col items-end justify-between gap-2 sm:flex-row sm:items-center sm:w-full sm:mt-2 shrink-0">
      <span className="text-xs font-medium px-2 py-1 rounded-full border border-solid border-dark/30 dark:border-light/30 text-dark/60 dark:text-light/60 whitespace-nowrap">{tag}</span>
      <span className="text-secondary font-semibold dark:text-secondary text-sm whitespace-nowrap">{date}</span>
    </div>
  </motion.li>
);

export async function getStaticProps() {
  return { props: {} };
}

export default function Media() {
  return (
    <>
      <Head>
        <title>Press & Media – William Gyltman</title>
        <meta name="description" content="Press coverage of William Gyltman, co-founder & CMO of Rankad.ai. Featured in SLA, Breakit, Yuncture, National Law Review and more. From Tibro, Sweden to Silicon Valley." />
        <meta property="og:title" content="Press & Media – William Gyltman" />
        <meta property="og:description" content="Press coverage of William Gyltman — co-founder & CMO of Rankad.ai. From Tibro, Sweden to The Residency in San Francisco." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://williamreviews.com/media" />
        <meta property="og:image" content="https://williamreviews.com/images/profile/liam2.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://williamreviews.com/media" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      </Head>

      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText
            text="Press & Media"
            className="!text-8xl !leading-tight mb-4 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
          />
          <p className="text-center text-dark/75 dark:text-light/75 text-lg mb-16 max-w-2xl mx-auto sm:text-base sm:mb-8">
            Coverage of William Gyltman and Rankad.ai in Swedish and international press.
          </p>

          <ul className="flex flex-col items-center relative w-full">
            {pressArticles.map((article) => (
              <PressCard key={article.link} {...article} />
            ))}
          </ul>


          <nav className="mt-12 flex flex-wrap gap-4 justify-center" aria-label="Explore more">
            <Link href="/" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Home</Link>
            <Link href="/about" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">About</Link>
            <Link href="/projects" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Projects</Link>
            <Link href="/articles" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-transparent hover:text-dark dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">Achievements</Link>
          </nav>

        </Layout>
      </main>
    </>
  );
}
