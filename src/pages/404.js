import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export async function getStaticProps() {
  return { props: {} };
}

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found – William Gyltman</title>
        <meta name="description" content="This page does not exist. Return to William Gyltman's portfolio to explore his web development projects, cybersecurity certificates, and experience." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://williamreviews.com" />
      </Head>
      <TransitionEffect />
      <main className="h-[75vh] w-full dark:bg-dark">
        <Layout className="relative !bg-transparent !pt-16 flex flex-col items-center justify-center">
          <h1 className="text-dark dark:text-light text-8xl font-bold">404</h1>
          <h2 className="text-dark dark:text-light text-7xl font-bold mt-4">Page Not Found.</h2>
          <p className="mt-6 text-dark/75 dark:text-light/75 text-lg text-center max-w-md">
            The page you are looking for does not exist. Explore the links below to get back on track.
          </p>
          <nav className="mt-8 flex flex-wrap gap-4 justify-center" aria-label="Return navigation">
            <Link href="/" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light">
              Home
            </Link>
            <Link href="/about" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light">
              About
            </Link>
            <Link href="/projects" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light">
              Projects
            </Link>
            <Link href="/articles" className="inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light">
              Certificates
            </Link>
          </nav>
        </Layout>
      </main>
    </>
  );
};

export default NotFound;
