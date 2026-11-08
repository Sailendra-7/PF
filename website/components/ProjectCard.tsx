import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/content";
import Cover from "./Cover";

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const year = project.date.slice(0, 4);
  return (
    <article className="group relative h-full">
      <div className="bezel h-full transition duration-500 ease-out group-hover:-translate-y-1">
        <div className="bezel-core flex h-full flex-col">
          <Cover src={project.cover} category={project.category} className={large ? "aspect-[16/9]" : "aspect-[16/10]"} />
          <div className="flex flex-1 flex-col p-6 md:p-7">
            <p className="label flex items-center justify-between gap-4">
              <span>{project.category}</span>
              {year ? <span>{year}</span> : null}
            </p>
            <h3 className={`mt-3 font-semibold tracking-tight ${large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
              <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
                {project.title}
              </Link>
            </h3>
            {project.summary ? <p className="mt-3 line-clamp-3 text-muted">{project.summary}</p> : null}
            {project.tools.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tools.slice(0, 4).map((t) => (
                  <li key={t} className="rounded-md border border-line/15 px-2.5 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-auto flex items-center justify-between pt-7 text-sm font-medium">
              <span>View project</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.07] transition duration-500 ease-out group-hover:bg-accent group-hover:text-on-accent">
                <ArrowUpRight size={16} weight="light" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
