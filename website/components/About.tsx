"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";
import { asset } from "@/lib/assets";
import Sfx from "./Sfx";
import JollyRoger from "./JollyRoger";

export default function About({ profile }: { profile: Profile }) {
  const stats = [
    { k: "Rank", v: `${profile.semester} Civil Engineering` },
    { k: "Crew", v: profile.college },
    profile.dream && { k: "Dream", v: profile.dream },
    profile.devilFruit && { k: "Devil Fruit", v: profile.devilFruit },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <section id="about" className="section-shell">
      <Sfx className="right-4 top-10 hidden text-6xl md:block" rotate={9}>
        ゴゴゴ
      </Sfx>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Captain&apos;s Log</p>
        <h2 className="section-title">An engineer on a mission!</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        className="parchment mt-12 grid gap-8 rounded-lg border-[3px] border-ink p-6 shadow-[8px_8px_0_#2a1a0c] md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:p-10"
      >
        {profile.aboutPhoto ? (
          <figure className="tape relative mx-auto w-full max-w-xs -rotate-2 self-start bg-white p-3 pb-10 shadow-card md:max-w-none">
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
            <JollyRoger className="absolute -bottom-7 -right-6 w-20 rotate-[14deg] drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]" />
          </figure>
        ) : null}

        <div>
          <dl className="grid gap-3 rounded-md border-[3px] border-ink bg-parchment-dark/50 p-4 sm:grid-cols-2">
            {stats.map(({ k, v }) => (
              <div key={k}>
                <dt className="inline-block -rotate-1 bg-flag px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-widest text-parchment">
                  {k}
                </dt>
                <dd className="mt-1 text-sm font-bold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 space-y-5">
            {profile.bio.map((para, i) => (
              <p key={i} className="leading-relaxed text-ink/90">
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
