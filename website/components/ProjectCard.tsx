import Link from "next/link";
import { Building2, Droplets, Layers, Map, Mountain, Route, Ruler, Star } from "lucide-react";
import type { Project } from "@/lib/content";
import { asset } from "@/lib/assets";

const ICONS: Record<string, typeof Ruler> = {
  Structural: Building2,
  Transportation: Route,
  Materials: Layers,
  Geotech: Mountain,
  Water: Droplets,
  Survey: Map,
  Other: Ruler,
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = ICONS[project.category] ?? Ruler;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border-[3px] border-ink bg-sea-900 shadow-[6px_6px_0_#2a1a0c] transition-transform hover:-translate-y-1.5">
      {project.featured ? (
        <span className="absolute left-0 top-4 z-10 flex items-center gap-1 rounded-r bg-flag px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-widest text-parchment shadow">
          <Star size={12} aria-hidden /> Featured
        </span>
      ) : null}

      <div className="relative aspect-[16/9] overflow-hidden bg-sea-800">
        {project.cover ? (
          <img
            src={asset(project.cover)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#1b5e86,#0c2b4a_70%)]">
            <Icon size={56} className="text-straw/80" strokeWidth={1.4} aria-hidden />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow !text-[0.68rem]">
          {project.category}
          {project.location ? <span className="text-sea-200/70"> · {project.location}</span> : null}
        </p>
        <h3 className="mt-2 text-2xl leading-tight text-parchment">
          <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="muted-copy mt-3 flex-1 text-sm">{project.summary}</p>
        {project.tools.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tools.slice(0, 4).map((t) => (
              <li key={t} className="rounded border border-parchment/25 px-2 py-0.5 text-xs text-parchment/85">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-5 text-sm font-extrabold text-straw">Read the log entry →</p>
      </div>
    </article>
  );
}
