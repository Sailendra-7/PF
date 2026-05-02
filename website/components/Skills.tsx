"use client";

import { motion } from "framer-motion";
import { Hammer, Map, PenTool, Ruler, Route, ShieldCheck, Waves } from "lucide-react";
import { skills } from "@/lib/portfolio-data";

const icons = [Hammer, Map, PenTool, Ruler, Route, ShieldCheck, Waves];

export default function Skills() {
  return (
    <section id="skills" className="section-shell overflow-hidden" data-gsap-reveal data-snap-section>
      <div className="section-grid-overlay" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-accent">Skills</p>
        <h2 className="section-title">Core strengths for modern civil systems.</h2>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = icons[index % icons.length];

          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="premium-panel flex items-center gap-3 rounded-xl px-4 py-4"
              data-gsap-card
            >
              <Icon className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/90">{skill}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
