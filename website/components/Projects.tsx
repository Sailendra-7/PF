"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

/* Desktop span rhythm per row of two: 4+2, 2+4, 3+3. A lone last card goes full width. */
const SPANS = [4, 2, 2, 4, 3, 3];
const LG: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="wrap section-y">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-section">Selected projects</h2>
          {categories.length > 1 ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-2 text-sm transition duration-500 ease-out ${
                    filter === c ? "bg-ink text-bg" : "text-muted ring-1 ring-inset ring-line/20 hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Reveal>

      {projects.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-line/25 p-10 text-center text-muted">
          Projects will appear here once they are added in the admin panel.
        </p>
      ) : (
        <div key={filter} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {shown.map((p, i) => {
            const base = SPANS[i % SPANS.length];
            const lonely = i === shown.length - 1 && i % 2 === 0;
            const span = lonely ? 6 : base;
            return (
              <Reveal
                key={p.slug}
                delay={(i % 2) * 0.08}
                className={`${lonely ? "md:col-span-2" : "md:col-span-1"} ${LG[span]}`}
              >
                <ProjectCard project={p} large={span >= 4} />
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
