import Link from "next/link";
import React from "react";
import Layout from "./Layout";
import { GithubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "./Icons";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer
      className="w-full border-t-2 border-solid border-dark
    font-medium text-lg dark:text-light dark:border-light sm:text-base
    "
    >
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6 gap-4">
        <span className="text-sm">{new Date().getFullYear()} &copy; William Gyltman. All Rights Reserved.</span>

        <nav className="flex items-center gap-4" aria-label="Social media links">
          <motion.a href="https://x.com/william_gyltman" target="_blank" rel="noopener nofollow" whileHover={{ y: -2 }} aria-label="X profile" className="w-5">
            <TwitterIcon />
          </motion.a>
          <motion.a href="https://github.com/wgyltman-dot" target="_blank" rel="noopener nofollow" whileHover={{ y: -2 }} aria-label="GitHub profile" className="w-5">
            <GithubIcon />
          </motion.a>
          <motion.a href="https://www.linkedin.com/in/williamgyltman/" target="_blank" rel="noopener nofollow" whileHover={{ y: -2 }} aria-label="LinkedIn profile" className="w-5">
            <LinkedInIcon />
          </motion.a>
        </nav>
      </Layout>
    </footer>
  );
};

export default Footer;
