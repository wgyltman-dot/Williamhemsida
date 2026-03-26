// pages/_app.js

import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-mont" });

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "William Gyltman",
  url: "https://williamreviews.com",
  description: "Personal portfolio of William Gyltman — Co-founder & CMO at Rankad.ai.",
  author: {
    "@type": "Person",
    name: "William Gyltman",
    url: "https://williamreviews.com",
    jobTitle: "Co-founder & CMO at Rankad.ai",
    sameAs: [
      "https://www.linkedin.com/in/williamgyltman/",
      "https://github.com/wgyltman-dot"
    ],
  },
};

const siteNavSchema = {
  "@context": "https://schema.org",
  "@type": "SiteLinksSearchBox",
  url: "https://williamreviews.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://williamreviews.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavSchema) }}
        />
      </Head>
      <SpeedInsights />
      <main
        className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen h-full`}
      >
        <Navbar />
        <AnimatePresence initial={false} mode="wait">
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </main>
    </>
  );
}
