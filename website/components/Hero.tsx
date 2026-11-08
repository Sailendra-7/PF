"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import type { Profile } from "@/lib/content";
import { asset } from "@/lib/assets";

const ease = [0.32, 0.72, 0, 1] as const;

export default function Hero({ profile }: { profile: Profile }) {
  const reduce = useReducedMotion();
  const words = profile.tagline.trim().split(" ");
  const last = words.pop();

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[110px]"
      />
      <div className="wrap relative grid min-h-[calc(100dvh-6rem)] items-center gap-12 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p {...enter(0)} className="label">
            {profile.role}
          </motion.p>
          <motion.h1
            {...enter(0.08)}
            className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
          >
            {words.join(" ")} <span className="text-accent">{last}</span>
          </motion.h1>
          <motion.p {...enter(0.16)} className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              View projects
              <span className="btn-icon">
                <ArrowDown size={16} weight="light" />
              </span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact
            </a>
          </motion.div>
        </div>

        {profile.portrait ? (
          <motion.div {...enter(0.2)} className="lg:col-span-5">
            <div className="bezel mx-auto max-w-md lg:ml-auto">
              <div className="bezel-core">
                <img
                  src={asset(profile.portrait)}
                  alt={`Portrait of ${profile.name}`}
                  width={900}
                  height={1200}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
