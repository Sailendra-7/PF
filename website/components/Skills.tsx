"use client";

import { motion } from "framer-motion";
import { Hammer, Compass, PenTool, Wrench } from "lucide-react";
import type { SkillGroup } from "@/lib/content";

const ICONS = [Hammer, Compass, PenTool, Wrench];

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
        <h2 className="section-title">Core strengths for modern civil systems.</h2>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {groups.map((g, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.article
              key={g.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="sea-panel relative rounded-lg border-t-4 border-t-straw p-6"
            >
              <Icon className="absolute right-5 top-5 text-straw/70" size={28} strokeWidth={1.6} aria-hidden />
              {g.crewRole ? <p className="eyebrow">{g.crewRole}</p> : null}
              <h3 className="mt-1 pr-10 text-2xl text-parchment">{g.name}</h3>
              <div className="rope my-4" aria-hidden />
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded border-2 border-parchment/80 bg-parchment px-3 py-1 text-sm font-bold text-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
