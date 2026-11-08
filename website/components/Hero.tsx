"use client";

import { motion } from "framer-motion";
import { ArrowRight, Anchor } from "lucide-react";
import type { Profile } from "@/lib/content";
import { asset } from "@/lib/assets";
import JollyRoger from "./JollyRoger";
import Ship from "./Ship";
import Sfx from "./Sfx";

const WAVE =
  "M0 60 C 120 20, 240 100, 360 60 S 600 20, 720 60 S 960 100, 1080 60 S 1320 20, 1440 60 L1440 140 L0 140 Z";

function Cloud({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" className={`cloud ${className}`} style={style} aria-hidden>
      <g fill="#ffffff">
        <ellipse cx="58" cy="50" rx="48" ry="25" />
        <ellipse cx="108" cy="36" rx="44" ry="30" />
        <ellipse cx="150" cy="52" rx="42" ry="24" />
        <rect x="40" y="50" width="130" height="26" rx="13" />
      </g>
    </svg>
  );
}

function Gull({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" className={`gull absolute ${className}`} aria-hidden>
      <path d="M2 12 Q10 0 20 10 Q30 0 38 12" fill="none" stroke="#12324f" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function SeaLayer({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className={`absolute bottom-0 left-0 w-[200%] ${className}`}
      aria-hidden
    >
      <path d={WAVE} fill={fill} />
      <path d={WAVE} fill={fill} transform="translate(1440 0)" />
    </svg>
  );
}

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="sky relative min-h-screen overflow-hidden pt-28">
      {/* sky */}
      <Cloud className="top-[10%] w-56 md:w-80" style={{ animationDuration: "120s", animationDelay: "-30s" }} />
      <Cloud className="top-[28%] w-40 opacity-80 md:w-60" style={{ animationDuration: "170s", animationDelay: "-110s" }} />
      <Cloud className="top-[6%] w-32 md:w-44" style={{ animationDuration: "95s", animationDelay: "-70s" }} />
      <Gull className="left-[44%] top-[19%] w-10" />
      <Gull className="left-[50%] top-[24%] w-7 [animation-delay:-1s]" />
      <Gull className="left-[38%] top-[26%] w-6 [animation-delay:-1.6s]" />

      <div className="section-shell grid items-center gap-12 pb-56 pt-8 md:grid-cols-[1.1fr_0.9fr] md:pb-64">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block -rotate-1 rounded bg-flag px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-parchment shadow-[3px_3px_0_#2a1a0c]"
          >
            {profile.role}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="pop-text mt-5 font-display text-[2.6rem] leading-[1.08] sm:text-6xl md:text-[3.7rem] lg:text-[4.4rem]"
          >
            {profile.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-6 max-w-xl rounded-lg border-2 border-ink bg-sea-900/90 p-4 text-base leading-relaxed text-[#e6f4fb] shadow-[5px_5px_0_#2a1a0c] md:text-lg"
          >
            I am {profile.name}, an {profile.semester.toLowerCase()} civil engineering student at{" "}
            {profile.college}, sailing toward sustainable design, data-informed planning, and
            practical field execution.
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
            <a href="#contact" className="btn border-2 border-ink bg-parchment text-ink shadow-[0_5px_0_#2a1a0c]">
              Send a Message <ArrowRight size={18} aria-hidden />
            </a>
          </motion.div>
        </div>

        {/* Wanted poster */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 7 }}
          animate={{ opacity: 1, y: 0, rotate: 2.5 }}
          transition={{ delay: 0.2, duration: 0.9, type: "spring", bounce: 0.3 }}
          className="relative z-10 mx-auto w-full max-w-sm"
        >
          <Sfx className="-left-4 -top-10 text-5xl md:-left-10 md:text-6xl" rotate={-12}>
            ドン!!
          </Sfx>
          <JollyRoger className="absolute -right-1 -top-8 z-20 w-20 rotate-12 md:-right-5 md:w-24 drop-shadow-[0_6px_0_rgba(0,0,0,0.35)]" />
          <div className="drop-shadow-[0_26px_24px_rgba(8,32,60,0.55)]">
            <div className="parchment parchment-torn px-6 pb-6 pt-7 text-center">
              <p className="font-poster text-6xl leading-none tracking-wide text-ink">WANTED</p>
              {profile.portrait ? (
                <div className="mx-auto mt-3 border-[6px] border-ink bg-ink">
                  <img
                    src={asset(profile.portrait)}
                    alt={`Portrait of ${profile.name}`}
                    className="aspect-[4/5] w-full object-cover object-top sepia-[0.3] contrast-105"
                    width={900}
                    height={1200}
                    fetchPriority="high"
                  />
                </div>
              ) : null}
              <p className="mt-3 font-poster text-xl tracking-[0.2em] text-ink">DEAD OR ALIVE</p>
              <p className="font-poster text-3xl uppercase leading-tight text-ink">{profile.name}</p>
              {profile.epithet ? (
                <p className="mt-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-flag">
                  &ldquo;{profile.epithet}&rdquo;
                </p>
              ) : null}
              {profile.bounty ? (
                <p className="mt-3 flex items-baseline justify-center gap-2 border-t-[3px] border-ink pt-3">
                  <span className="font-poster text-2xl text-ink">฿</span>
                  <span className="font-poster text-[2rem] tracking-wide text-ink">{profile.bounty}</span>
                  <span className="font-poster text-2xl text-ink">-</span>
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>

      {/* sea + ship */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden" aria-hidden>
        <SeaLayer fill="#2b9fd8" className="wave-drift-slow h-44" />
        <div className="ship-sail absolute bottom-16 left-[2%] w-[190px] sm:w-[260px] md:left-[4%] md:w-[330px]">
          <Ship className="w-full drop-shadow-[0_10px_0_rgba(8,32,60,0.25)]" />
        </div>
        <SeaLayer fill="#146fae" className="wave-drift h-32" />
        <SeaLayer fill="#0d5a96" className="wave-drift-slow h-16" />
      </div>
    </section>
  );
}
