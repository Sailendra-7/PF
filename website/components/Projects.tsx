"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/content";
import VoyageMap from "./VoyageMap";
import ProjectCard from "./ProjectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const stops = projects.map(({ slug, title, category }) => ({ slug, title, category }));

  return (
    <section id="projects" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">The Voyage</p>
        <h2 className="section-title">Selected projects and applied research.</h2>
        <p className="muted-copy mt-3 max-w-xl">
          Every island is a project I have charted. Tap one to read its log entry.
        </p>
      </motion.div>

      <div className="mt-10">
        <div className="hidden md:block">
          <VoyageMap stops={stops} />
        </div>
        <div className="mx-auto max-w-sm md:hidden">
          <VoyageMap stops={stops} vertical />
        </div>
      </div>

      {projects.length > 0 ? (
        <>
          <div className="mt-14 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
            {categories.length > 2 &&
              categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                  className={`rounded-md border-2 px-4 py-1.5 text-sm font-bold transition-colors ${
                    filter === c
                      ? "border-straw bg-straw text-ink"
                      : "border-parchment/30 text-parchment/85 hover:border-straw"
                  }`}
                >
                  {c}
                </button>
              ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
