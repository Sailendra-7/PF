"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { projects } from "@/lib/portfolio-data";

type ProjectItem = (typeof projects)[number];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeProject || !modalRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".modal-shell",
        { y: 26, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-modal-item]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.08,
        }
      );
    }, modalRef);

    return () => context.revert();
  }, [activeProject]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      id="projects"
      className="section-shell overflow-hidden"
      data-gsap-reveal
      data-snap-section
    >
      <div className="section-grid-overlay" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-accent">Experience</p>
        <h2 className="section-title">Selected projects and applied research.</h2>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="premium-panel group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
            data-gsap-card
            data-hover-target
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85"
                >
                  {item}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveProject(project)}
              className="mt-6 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:border-accent/70 hover:text-accent"
              data-hover-target
            >
              View Project Story
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="modal-backdrop fixed inset-0 z-[70] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <div
              ref={modalRef}
              className="modal-shell premium-panel w-full max-w-3xl rounded-3xl p-7 md:p-10"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4" data-modal-item>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-accent">Project Detail</p>
                  <h3 className="mt-2 text-2xl font-bold md:text-3xl">{activeProject.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-white/25 px-4 py-2 text-xs text-white/90 transition hover:border-accent hover:text-accent"
                  data-hover-target
                >
                  Close
                </button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted" data-modal-item>
                {activeProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2" data-modal-item>
                {activeProject.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 space-y-3" data-modal-item>
                <p className="text-sm font-semibold text-white">Timeline Highlights</p>
                <ul className="space-y-2 text-sm text-muted">
                  {activeProject.highlights?.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
