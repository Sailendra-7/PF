"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-shell overflow-hidden" data-gsap-reveal data-snap-section>
      <div className="section-grid-overlay" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-accent">About</p>
        <h2 className="section-title">From classroom models to real-world impact.</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="premium-panel mt-8 grid gap-8 rounded-3xl p-7 shadow-glow md:grid-cols-2"
      >
        <div className="mouse-parallax overflow-hidden rounded-2xl border border-white/10" data-depth="0.05">
          <Image
            src="Profile.jpg"
            alt="Abstract civil engineering analytics visual"
            width={720}
            height={520}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            AN ENGINEER ON A MISSION.
          </h3>
          <p className="muted-copy">
            I am a civil engineering student with a passion for designing sustainable
            infrastructure and creating solutions that improve everyday life. I aim to
            build resilient structures that serve communities and support long-term
            development.
          </p>
          <p className="muted-copy">
            Currently in my 7th semester at Oxford College of Engineering and
            Management, I have developed a strong foundation in structural analysis,
            geotechnical engineering, and construction management. I have worked on
            projects such as water tank design, foundation systems, and reinforced
            concrete structures.
          </p>
          <p className="muted-copy">
            I am particularly interested in sustainable construction, smart
            infrastructure, and efficient resource management. My goal is to contribute
            to impactful engineering projects that enhance safety, durability, and
            quality of life.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
