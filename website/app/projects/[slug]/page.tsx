import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getProfile, getProject, getProjects } from "@/lib/content";
import { asset } from "@/lib/assets";
import Nav from "@/components/Nav";
import Cover from "@/components/Cover";
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

  const profile = getProfile();
  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];

  const meta = [
    { k: "Category", v: project.category },
    project.location && { k: "Location", v: project.location },
    project.date && {
      k: "Date",
      v: new Date(project.date).toLocaleDateString("en", { year: "numeric", month: "long", timeZone: "UTC" }),
    },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <Nav name={profile.name} />
      <main className="wrap pb-24 pt-32 md:pb-32 md:pt-40">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition duration-500 ease-out hover:text-ink"
        >
          <ArrowLeft size={16} weight="light" className="transition duration-500 ease-out group-hover:-translate-x-1" />
          All projects
        </Link>

        <h1 className="mt-8 max-w-[22ch] text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {project.title}
        </h1>
        {project.summary ? (
          <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted">{project.summary}</p>
        ) : null}

        <dl className="mt-10 grid divide-y divide-line/10 rounded-2xl ring-1 ring-line/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {meta.map(({ k, v }) => (
            <div key={k} className="px-5 py-4">
              <dt className="label">{k}</dt>
              <dd className="mt-1.5 font-medium leading-snug">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="bezel mt-8">
          <div className="bezel-core">
            <Cover src={project.cover} category={project.category} className={project.cover ? "aspect-[16/9]" : "aspect-[21/5]"} />
          </div>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {project.html.trim() ? <div className="prose-body" dangerouslySetInnerHTML={{ __html: project.html }} /> : null}

            {project.highlights.length > 0 ? (
              <section className={project.html.trim() ? "mt-14" : ""}>
                <h2 className="text-2xl font-semibold tracking-tight">Key findings</h2>
                <ul className="mt-6 space-y-4">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-4 text-lg leading-relaxed text-ink/85">
                      <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {project.tools.length > 0 ? (
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="label">Tools and methods</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <li key={t} className="rounded-md border border-line/15 px-3 py-1.5 font-mono text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>

        {project.gallery.length > 0 ? (
          <div className="mt-20 grid gap-5 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <div key={src} className="bezel">
                <div className="bezel-core">
                  <img src={asset(src)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {all.length > 1 ? (
          <Link
            href={`/projects/${next.slug}/`}
            className="group mt-24 flex items-center justify-between gap-6 rounded-2xl p-6 ring-1 ring-line/15 transition duration-500 ease-out hover:bg-ink/[0.04] md:p-8"
          >
            <span>
              <span className="label block">Next project</span>
              <span className="mt-2 block text-2xl font-semibold tracking-tight md:text-3xl">{next.title}</span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/[0.07] transition duration-500 ease-out group-hover:bg-accent group-hover:text-on-accent">
              <ArrowUpRight size={18} weight="light" />
            </span>
          </Link>
        ) : null}
      </main>
      <Footer name={profile.name} role={profile.role} email={profile.email} />
    </>
  );
}
