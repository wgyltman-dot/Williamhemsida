import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import TransitionEffect from "@/components/TransitionEffect";
import { motion } from "framer-motion";

const pressLogos = [
  { name: "Hallandsposten", href: "https://www.hallandsposten.se/hallands-affarer/liam-karlsson-fran-veinge-jagar-drommen-i-silicon-valley.f089823e-ee42-4222-90a2-0dc97333bde3" },
  { name: "Breakit", href: "https://www.breakit.se/artikel/45777/ai-mode-och-lovable-for-hardvara-har-ar-de-senaste-bolagen-i-breakits-varld" },
  { name: "Skaraborgs Allehanda", href: "https://www.sla.se/2026/03/12/tibrosonen-i-silicon-valley-vaga-dromma-oerhort-stort-6f864/" },
  { name: "Yuncture", href: "https://www.yuncture.com/news/20-och-23-aringarna-bakom-rankad-antagna-till-silicon-valleys-the-residency" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is William Gyltman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "William Gyltman is a Swedish entrepreneur and co-founder & CMO of Rankad.ai, an autonomous AI search optimization platform. Selected into The Residency in San Francisco — one of 25 startups chosen from 3,500+ global applicants.",
      },
    },
    {
      "@type": "Question",
      name: "What is Rankad.ai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rankad.ai is an autonomous AI Search Optimization platform co-founded by William Gyltman. It helps brands become the recommended answer inside ChatGPT, Gemini, and Perplexity on autopilot. Rankad.ai was selected into The Residency in San Francisco out of 3,500+ applicants globally.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact William Gyltman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Rankad.ai and AI search enquiries, email william@rankad.ai. Connect on LinkedIn at linkedin.com/in/williamgyltman.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does William Gyltman work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "William Gyltman works with React, Next.js, Node.js, Tailwind CSS, and modern AI tools. He specialises in SEO, AEO (Answer Engine Optimization), and AI-driven search visibility.",
      },
    },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "William Gyltman",
  url: "https://williamreviews.com",
  image: "https://williamreviews.com/images/profile/liam2.jpg",
  jobTitle: "Co-founder & CMO at Rankad.ai",
  description: "Swedish entrepreneur. Co-founder & CMO of Rankad.ai (AI search optimization platform, selected into The Residency San Francisco).",
  email: "william@rankad.ai",
  sameAs: [
    "https://www.linkedin.com/in/williamgyltman/",
    "https://rankad.ai",
    "https://github.com/wgyltman-dot",
  ],
  knowsAbout: ["AI Search Optimization", "AEO", "SEO", "Web Development", "React", "Next.js", "Node.js"],
  founder: [
    { "@type": "Organization", name: "Rankad.ai", url: "https://rankad.ai" },
  ],
};

export async function getStaticProps() {
  return { props: {} };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>William Gyltman – Co-founder & CMO of Rankad.ai</title>
        <meta name="description" content="William Gyltman is a Swedish entrepreneur and co-founder & CMO of Rankad.ai (AI search optimization). Selected into The Residency, San Francisco." />
        <meta property="og:title" content="William Gyltman – Co-founder & CMO of Rankad.ai" />
        <meta property="og:description" content="Swedish entrepreneur. Co-founder & CMO of Rankad.ai. Selected into The Residency, San Francisco." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://williamreviews.com" />
        <meta property="og:image" content="https://williamreviews.com/images/profile/liam2.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="William Gyltman – Rankad.ai" />
        <meta name="twitter:description" content="Swedish entrepreneur. Co-founder & CMO of Rankad.ai." />
        <meta name="twitter:image" content="https://williamreviews.com/images/profile/liam2.jpg" />
        <link rel="canonical" href="https://williamreviews.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <TransitionEffect />
      <article className={`flex min-h-screen items-center text-dark dark:text-light sm:items-start`}>
        <Layout className="!pt-0 md:!pt-16 sm:!pt-16">
          <div className="flex w-full items-start justify-between md:flex-col">
            <div className="flex w-3/4 flex-col items-start self-center lg:w-full lg:text-left">

              <h1 className="py-2 overflow-hidden text-dark dark:text-light text-6xl font-bold w-full capitalize xl:text-6xl">
                William Gyltman
              </h1>

              <p className="my-4 text-base font-medium md:text-sm sm:!text-xs">
                Swedish entrepreneur and co-founder & CMO of{" "}
                <a href="https://rankad.ai" target="_blank" rel="noopener nofollow" className="underline underline-offset-2">Rankad.ai</a>
                {" "}— an autonomous AI search optimization platform helping brands win inside ChatGPT, Gemini, and Perplexity.
                Selected Founder in Residence at{" "}The Residency, San Francisco.
                Explore my{" "}
                <Link href="/projects" className="underline underline-offset-2">projects</Link>,{" "}
                <Link href="/about" className="underline underline-offset-2">background</Link>, and{" "}
                <Link href="/articles" className="underline underline-offset-2">certifications</Link>.
              </p>



            </div>
          </div>

          {/* Press / Social Proof bar */}
          <div className="mt-16 w-full border-t border-solid border-dark/10 dark:border-light/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-dark/40 dark:text-light/40 mb-4 text-center">
              As seen in
            </p>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {pressLogos.map((p) => (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener nofollow"
                  whileHover={{ y: -2 }}
                  className="text-sm font-semibold text-dark/50 dark:text-light/50 hover:text-primary dark:hover:text-primaryDark transition-colors duration-200"
                >
                  {p.name}
                </motion.a>
              ))}
            </div>
          </div>

        </Layout>

      </article>
    </>
  );
}
