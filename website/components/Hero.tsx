"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
      data-snap-section
    >
      <div className="orbital-bg" aria-hidden />
      <div className="grid-pattern absolute inset-0 opacity-20" aria-hidden />
      <div className="section-grid-overlay" aria-hidden />
      <div
        className="parallax-node mouse-parallax absolute left-[6%] top-[19%] h-40 w-40 rounded-full bg-accent/10 blur-3xl"
        data-depth="0.06"
        aria-hidden
      />
      <div
        className="parallax-node mouse-parallax absolute bottom-[14%] right-[12%] h-52 w-52 rounded-full bg-white/10 blur-3xl"
        data-depth="0.09"
        aria-hidden
      />
      <div
        className="parallax-node mouse-parallax absolute right-[28%] top-[26%] h-24 w-24 rounded-full border border-white/30"
        data-depth="0.12"
        aria-hidden
      />

      <div className="section-shell hero-content relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-xs uppercase tracking-[0.25em] text-accent md:text-sm"
        >
          Civil Engineering Student
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl"
        >
          Designing resilient infrastructure for human-centered cities.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25 }}
          className="mt-8 max-w-2xl text-base text-muted md:text-xl"
        >
          I am Sailendra Kamal, a 8th semester civil engineering student focused on
          sustainable design, data-informed planning, and practical field execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            data-hover-target
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            data-hover-target
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
