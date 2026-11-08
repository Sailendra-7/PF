import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { getProfile, getProject, getProjects } from "@/lib/content";
import { asset } from "@/lib/assets";
import Footer from "@/components/Footer";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.title} | ${getProfile().name}`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  const next = all[(i + 1) % all.length];
  const name = getProfile().name;

  return (
    <>
      <main className="section-shell max-w-4xl pt-10 md:pt-14">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-straw hover:underline">
          <ArrowLeft size={16} aria-hidden /> Back to the map
        </Link>

        <p className="eyebrow mt-8">Log entry · {project.category}</p>
        <h1 className="section-title">{project.title}</h1>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-sea-200">
          {project.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} aria-hidden /> {project.location}
            </span>
          )}
          {project.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} aria-hidden />
              {new Date(project.date).toLocaleDateString("en", { year: "numeric", month: "long", timeZone: "UTC" })}
            </span>
          )}
        </p>

        {project.cover && (
          <img
            src={asset(project.cover)}
            alt=""
            className="mt-8 w-full rounded-lg border-4 border-wood object-cover shadow-card"
          />
        )}

        <article className="parchment mt-8 rounded-lg border-y-[10px] border-wood p-6 md:p-10">
          {project.summary && <p className="font-display text-2xl leading-snug">{project.summary}</p>}

          {project.html.trim() && (
            <div className="prose-log mt-6" dangerouslySetInnerHTML={{ __html: project.html }} />
          )}

          {project.highlights.length > 0 && (
            <>
              <h2 className="mt-8 text-3xl text-flag">Key findings</h2>
              <ul className="mt-3 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-flag" />
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.tools.length > 0 && (
            <>
              <h2 className="mt-8 text-3xl text-flag">Tools &amp; methods</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <li key={t} className="rounded border-2 border-ink/70 px-3 py-1 text-sm font-bold">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>

        {project.gallery.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <img
                key={src}
                src={asset(src)}
                alt=""
                loading="lazy"
                className="w-full rounded-lg border-4 border-wood object-cover shadow-card"
              />
            ))}
          </div>
        )}

        {all.length > 1 && (
          <Link
            href={`/projects/${next.slug}/`}
            className="sea-panel mt-12 flex items-center justify-between gap-4 rounded-lg p-5 transition-colors hover:border-straw/60"
          >
            <span>
              <span className="eyebrow block">Next island</span>
              <span className="font-display text-2xl text-parchment">{next.title}</span>
            </span>
            <span aria-hidden className="text-2xl text-straw">→</span>
          </Link>
        )}
      </main>
      <Footer name={name} />
    </>
  );
}
