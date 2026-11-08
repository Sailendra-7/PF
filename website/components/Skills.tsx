"use client";

import { motion } from "framer-motion";
import { Hammer, Compass, PenTool, Wrench } from "lucide-react";
import type { SkillGroup } from "@/lib/content";
import JollyRoger from "./JollyRoger";

const ICONS = [Hammer, Compass, PenTool, Wrench];
const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

const berries = (n: number) => (n * 100_000_000).toLocaleString("en-US");

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Crew Arsenal</p>
        <h2 className="section-title">Meet the crew: strengths for modern civil systems!</h2>
      </motion.div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {groups.map((g, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.article
              key={g.name}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`tape relative ${TILTS[i % TILTS.length]} transition-transform hover:rotate-0 hover:scale-[1.03]`}
            >
              <div className="drop-shadow-[0_18px_16px_rgba(0,0,0,0.45)]">
                <div className="parchment parchment-torn px-5 pb-6 pt-7 text-center">
                  <p className="font-poster text-3xl leading-none tracking-wide text-ink">
                    {g.crewRole ? g.crewRole.toUpperCase() : "CREW"}
                  </p>
                  <div className="mx-auto mt-3 flex h-28 items-center justify-center border-[5px] border-ink bg-[radial-gradient(circle_at_50%_30%,#4fb9ee,#146fae)]">
                    <Icon size={54} className="text-parchment drop-shadow-[0_3px_0_#2a1a0c]" strokeWidth={1.8} aria-hidden />
                  </div>
                  <h3 className="mt-3 text-xl leading-tight text-ink">{g.name}</h3>
                  <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="rounded border-2 border-ink bg-straw/80 px-2.5 py-0.5 text-xs font-extrabold text-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex items-baseline justify-center gap-1.5 border-t-[3px] border-ink pt-2 font-poster text-xl text-ink">
                    ฿ {berries(g.items.length)} -
                  </p>
                </div>
              </div>
              <JollyRoger className="absolute -right-4 -top-5 w-14 rotate-12 drop-shadow-[0_4px_0_rgba(0,0,0,0.35)]" />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
