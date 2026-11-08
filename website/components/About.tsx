"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";
import { asset } from "@/lib/assets";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Captain&apos;s Log</p>
        <h2 className="section-title">An engineer on a mission.</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        className="parchment mt-10 grid gap-8 rounded-lg border-y-[10px] border-wood p-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:p-10"
      >
        {profile.aboutPhoto ? (
          <figure className="relative mx-auto w-full max-w-xs -rotate-2 self-start bg-white p-3 pb-10 shadow-card md:max-w-none">
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-straw/70"
            />
            <img
              src={asset(profile.aboutPhoto)}
              alt={`${profile.name} smiling`}
              loading="lazy"
              width={900}
              height={1200}
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <figcaption className="absolute inset-x-0 bottom-2 text-center font-display text-lg text-ink">
              {profile.name}
            </figcaption>
          </figure>
        ) : null}

        <div className="space-y-5">
          <dl className="flex flex-wrap gap-x-8 gap-y-2 border-b-2 border-dashed border-ink/30 pb-4 text-sm">
            <div>
              <dt className="text-[0.7rem] font-extrabold uppercase tracking-widest text-flag">Rank</dt>
              <dd className="font-bold">{profile.semester} Civil Engineering</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-extrabold uppercase tracking-widest text-flag">Crew</dt>
              <dd className="font-bold">{profile.college}</dd>
            </div>
          </dl>
          {profile.bio.map((para, i) => (
            <p key={i} className="leading-relaxed text-ink/90">
              {para}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
