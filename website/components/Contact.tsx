"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="section-shell overflow-hidden" data-gsap-reveal data-snap-section>
      <div className="section-grid-overlay" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-accent">Contact</p>
        <h2 className="section-title">Let us build something meaningful.</h2>
      </motion.div>

      <div className="premium-panel mt-10 grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:p-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Name"
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            rows={5}
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
            data-hover-target
          >
            Send Message
          </button>
          {submitted ? (
            <p className="text-sm text-accent">Thanks. I will reply soon.</p>
          ) : null}
        </form>

        <div className="space-y-5">
          <p className="muted-copy">
            Interested in internships, collaborations, or research opportunities in
            sustainable civil infrastructure.
          </p>
          <div className="space-y-3 text-sm">
            <a className="block text-white/90 transition hover:text-accent" href="mailto:kamalsailendra7@gmail.com">
              kamalsailendra7@gmail.com
            </a>
            <a className="block text-white/90 transition hover:text-accent" href="tel:+9779866140854">
              +977-9866140854
            </a>
            <a
              className="block text-white/90 transition hover:text-accent"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              Sailendra Kamal | LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
