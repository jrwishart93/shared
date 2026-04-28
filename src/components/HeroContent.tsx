"use client";

import Link from "next/link";
import { Camera, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headlineVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-w-0 w-full max-w-2xl"
    >
      <motion.div
        variants={fadeUp}
        className="liquid-glass mb-4 inline-flex max-w-full items-start gap-2 rounded-full px-3 py-1.5 text-[0.8rem] font-medium leading-5 text-app-muted sm:mb-5 sm:px-4 sm:py-2 sm:text-sm sm:leading-6 sm:items-center"
      >
        <Lock className="mt-0.5 h-4 w-4 flex-none sm:mt-0" />
        <span className="min-w-0">Private albums for family and close friends</span>
      </motion.div>

      <motion.h1
        variants={headlineVariant}
        className="max-w-full break-words text-[2.25rem] font-semibold leading-[1.02] text-app-text sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Family photos, stories and moments{" "}
        <span className="text-gradient-hero">in one private place.</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-full text-[0.96rem] leading-7 text-app-muted md:mt-6 md:text-xl md:leading-8"
      >
        A quiet home for the photos we want to keep close: holidays, birthdays,
        trips away, family visits and the ordinary days that become favourites
        later.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-3 max-w-full text-sm leading-6 text-app-muted md:mt-4 md:text-lg md:leading-7"
      >
        Full albums are kept private for family and close friends. Once signed
        in, you can browse albums, open shared photo collections and revisit the
        stories behind them.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap"
      >
        <Link
          href="/login"
          className="liquid-button btn-interactive inline-flex max-w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-center text-[0.96rem] font-semibold sm:px-6 sm:text-base"
        >
          <Camera className="h-5 w-5" />
          Sign in
        </Link>
        <Link
          href="/signup"
          className="btn-secondary inline-flex max-w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-center text-[0.96rem] font-semibold sm:px-6 sm:text-base"
        >
          <Sparkles className="h-5 w-5" />
          Request family access
        </Link>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-5 text-sm leading-6 text-app-subtle">
        Preview moments are shown here. The full albums stay behind the family
        sign-in.
      </motion.p>
    </motion.div>
  );
}
