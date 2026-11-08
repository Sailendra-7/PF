"use client";

import { motion } from "framer-motion";
import { ArrowRight, Anchor } from "lucide-react";
import type { Profile } from "@/lib/content";
import { asset } from "@/lib/assets";
import Waves from "./Waves";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-28">
      <div className="section-shell grid items-center gap-12 pb-40 pt-8 md:grid-cols-[1.1fr_0.9fr] md:pb-44">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            {profile.role}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-4 text-5xl leading-[1.02] text-parchment drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] md:text-7xl"
          >
            {profile.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="muted-copy mt-6 max-w-xl text-lg"
          >
            I am {profile.name}, an {profile.semester.toLowerCase()} civil engineering student at{" "}
            {profile.college}, focused on sustainable design, data-informed planning, and practical
            field execution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn btn-red">
              <Anchor size={18} aria-hidden /> Set Sail: View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              Send a Message <ArrowRight size={18} aria-hidden />
            </a>
          </motion.div>
        </div>

        {/* Wanted poster */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ delay: 0.2, duration: 0.9, type: "spring", bounce: 0.3 }}
          className="mx-auto w-full max-w-sm drop-shadow-[0_28px_28px_rgba(0,0,0,0.6)]"
        >
          <div className="parchment parchment-torn px-6 pb-7 pt-8 text-center">
            <p className="font-display text-6xl leading-none tracking-wide text-ink">WANTED</p>
            {profile.portrait ? (
              <div className="mx-auto mt-4 border-[6px] border-ink/80 bg-ink">
                <img
                  src={asset(profile.portrait)}
                  alt={`Portrait of ${profile.name}`}
                  className="aspect-[4/5] w-full object-cover object-top sepia-[0.35] contrast-105"
                  width={900}
                  height={1200}
                  fetchPriority="high"
                />
              </div>
            ) : null}
            <p className="mt-4 font-display text-3xl uppercase leading-none text-ink">
              {profile.name}
            </p>
            {profile.epithet ? (
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-flag">
                &ldquo;{profile.epithet}&rdquo;
              </p>
            ) : null}
            {profile.bounty ? (
              <p className="mt-4 flex items-baseline justify-center gap-2 border-t-2 border-ink/70 pt-3">
                <span className="font-display text-2xl text-ink">฿</span>
                <span className="font-display text-4xl tracking-wide text-ink">{profile.bounty}</span>
                <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-ink/70">
                  -
                </span>
              </p>
            ) : null}
            <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ink/70">
              For building things that stand
            </p>
          </div>
        </motion.div>
      </div>
      <Waves />
    </section>
  );
}
