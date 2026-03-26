import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import profile from "../../public/images/profile/william.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";

function AnimatedNumberFramerMotion({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue, value]
  );

  return <span ref={ref}>{value}</span>;
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://williamreviews.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://williamreviews.com/about" },
  ],
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: "2026-03-01",
  mainEntity: {
    "@type": "Person",
    name: "William Gyltman",
    url: "https://williamreviews.com",
    image: "https://williamreviews.com/images/profile/liam2.jpg",
    jobTitle: "Co-founder & CMO at Rankad.ai",
    description: "Swedish entrepreneur born 2002, from Tibro. Co-founder & CMO of Rankad.ai — an autonomous AI visibility platform selected into The Residency, San Francisco (1 of 25 from 3,500+ applicants).",
    address: { "@type": "PostalAddress", addressLocality: "Tibro", addressCountry: "SE" },
    email: "william@rankad.ai",
    birthDate: "2002-10-26",
    knowsAbout: ["AI Search Optimization", "AEO", "AIO", "GEO", "SEO", "Growth Strategy", "Product-Market Fit", "Entrepreneurship"],
    sameAs: [
      "https://www.linkedin.com/in/williamgyltman/",
      "https://rankad.ai",
      "https://github.com/wgyltman-dot",
      "https://www.instagram.com/gyltmanw/",
    ],
    founder: [
      { "@type": "Organization", name: "Rankad.ai", url: "https://rankad.ai" },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is William Gyltman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "William Gyltman is a 23-year-old Swedish entrepreneur from Tibro, Sweden. He is the co-founder and CMO of Rankad.ai, an autonomous AI visibility platform that helps businesses get recommended inside ChatGPT, Gemini, and Perplexity. In 2026 Rankad was selected into The Residency in San Francisco — 1 of 25 startups from 3,500+ global applicants.",
      },
    },
    {
      "@type": "Question",
      name: "What is William Gyltman's role at Rankad.ai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "William Gyltman is co-founder at Rankad.ai, responsible for growth and commercial strategy. He focuses on breaking down the company's vision into what the market is actually willing to pay for — driving product-market fit from the customer side.",
      },
    },
    {
      "@type": "Question",
      name: "What is The Residency and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Residency is one of Silicon Valley's most competitive early-stage startup programs, based in San Francisco. Rankad.ai was selected as 1 of 25 companies from over 3,500 global applicants — a 0.7% acceptance rate. The Rankad team is among the youngest founding teams ever admitted.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact William Gyltman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email william@rankad.ai or connect on LinkedIn at linkedin.com/in/williamgyltman.",
      },
    },
  ],
};

export async function getStaticProps() {
  return { props: {} };
}

export default function About() {
  return (
    <>
      <Head>
        <title>About William Gyltman – Co-founder & CMO of Rankad.ai</title>
        <meta name="description" content="William Gyltman is a 23-year-old Swedish entrepreneur from Tibro. Co-founder & CMO of Rankad.ai — selected into The Residency San Francisco, 1 of 25 from 3,500+ applicants." />
        <meta property="og:title" content="About William Gyltman – Co-founder & CMO of Rankad.ai" />
        <meta property="og:description" content="Swedish entrepreneur from Tibro. Co-founder & CMO of Rankad.ai. Selected into The Residency, San Francisco — 1 of 25 from 3,500+ global applicants." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://williamreviews.com/about" />
        <meta property="og:image" content="https://williamreviews.com/images/profile/liam2.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://williamreviews.com/about" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
      <TransitionEffect />
      <main className={`flex w-full flex-col items-center justify-center dark:text-light`}>
        <Layout className="pt-16">
          <AnimatedText
            text="Dare to Dream Enormously Big!"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                BIOGRAPHY
              </h2>
              <p className="font-medium">
                Hi, I&apos;m <strong>William Gyltman</strong> — a 23-year-old entrepreneur from{" "}
                <strong>Tibro, Sweden</strong>. I co-founded{" "}
                <a href="https://rankad.ai" target="_blank" rel="noopener nofollow" className="underline underline-offset-2">Rankad.ai</a>
                {" "}— an autonomous AI visibility platform that helps businesses get recommended inside ChatGPT, Gemini, and Perplexity on autopilot.
              </p>
              <p className="my-4 font-medium">
                As co-founder responsible for growth, my focus is on bridging vision and market reality — figuring out what customers actually need and are willing to pay for, and turning that into traction.
              </p>
              <p className="font-medium">
                In 2026, Rankad was selected into{" "}
                <strong>The Residency</strong> in San Francisco — one of Silicon Valley&apos;s most competitive startup programs. We were 1 of 25 companies chosen from over 3,500 global applicants (0.7% acceptance rate), and among the youngest founding teams ever admitted.
              </p>
              <p className="my-4 font-medium">
                We started at Yuncture&apos;s incubator in Gothenburg, closed our first major deals, grew our waitlist — and made it to Silicon Valley. As I&apos;ve been quoted: <em>&quot;Man ska våga drömma oerhört stort.&quot;</em> — dare to dream enormously big.
              </p>
            </div>

            <div className="relative col-span-3 h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:border-light dark:bg-dark xl:col-span-4 md:col-span-8 md:order-1">
              <div className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl bg-dark dark:bg-light" />
              <Image
                className="h-auto w-full rounded-2xl"
                src={profile}
                alt="William Gyltman"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  25
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  The Residency SF
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  3,500+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  global applicants
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  0.7%
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  acceptance rate
                </h2>
              </div>
            </div>
          </div>

          <Skills />
          <Experience />
          <Education />

          <section className="mt-32 w-full" aria-label="Frequently asked questions about William Gyltman">
            <h2 className="font-bold text-4xl w-full text-center mb-16">Frequently Asked Questions</h2>
            <dl className="space-y-8 max-w-3xl mx-auto">
              <div>
                <dt className="font-semibold text-xl text-dark dark:text-light">Who is William Gyltman?</dt>
                <dd className="mt-2 text-dark/75 dark:text-light/75">William Gyltman is a 23-year-old Swedish entrepreneur from Tibro, Sweden. He is the co-founder and CMO of Rankad.ai, an autonomous AI visibility platform that helps businesses get recommended inside ChatGPT, Gemini, and Perplexity. Rankad was selected into The Residency in San Francisco — 1 of 25 from 3,500+ applicants.</dd>
              </div>
              <div>
                <dt className="font-semibold text-xl text-dark dark:text-light">What is William Gyltman&apos;s role at Rankad.ai?</dt>
                <dd className="mt-2 text-dark/75 dark:text-light/75">William is co-founder responsible for growth and commercial strategy. He focuses on breaking down the company vision into what the market is actually willing to pay for — driving product-market fit from the customer side.</dd>
              </div>
              <div>
                <dt className="font-semibold text-xl text-dark dark:text-light">What is The Residency and why does it matter?</dt>
                <dd className="mt-2 text-dark/75 dark:text-light/75">The Residency is one of Silicon Valley&apos;s most competitive early-stage startup programs, based in San Francisco. Rankad was selected as 1 of 25 companies from 3,500+ global applicants (0.7% acceptance rate). The Rankad team is among the youngest founding teams ever admitted.</dd>
              </div>
              <div>
                <dt className="font-semibold text-xl text-dark dark:text-light">How can I contact William Gyltman?</dt>
                <dd className="mt-2 text-dark/75 dark:text-light/75">Connect on <a href="https://www.linkedin.com/in/williamgyltman/" target="_blank" rel="noopener nofollow" className="underline underline-offset-2">LinkedIn</a>.</dd>
              </div>
            </dl>
          </section>

        </Layout>
      </main>
    </>
  );
}
