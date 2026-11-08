import type { Profile } from "@/lib/content";
import { asset } from "@/lib/assets";
import Reveal from "./Reveal";

export default function About({ profile }: { profile: Profile }) {
  const [lead, ...rest] = profile.bio;
  const rows = [
    profile.semester && { k: "Studying", v: `Civil engineering, ${profile.semester.toLowerCase()}` },
    profile.college && { k: "College", v: profile.college },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <section id="about" className="wrap section-y">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="h-section">About</h2>
          {lead ? <p className="mt-8 max-w-[34ch] text-2xl font-medium leading-snug tracking-tight md:text-3xl">{lead}</p> : null}
          <div className="mt-8 space-y-5">
            {rest.map((para, i) => (
              <p key={i} className="max-w-[62ch] text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
          {profile.focus.length ? (
            <div className="mt-10">
              <p className="label">Focus areas</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.focus.map((f) => (
                  <li key={f} className="rounded-full px-4 py-2 text-sm ring-1 ring-inset ring-line/20">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {profile.aboutPhoto ? (
              <div className="bezel">
                <div className="bezel-core">
                  <img
                    src={asset(profile.aboutPhoto)}
                    alt={`${profile.name}`}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </div>
            ) : null}
            {rows.length ? (
              <dl className="mt-6 divide-y divide-line/10 rounded-2xl ring-1 ring-line/10">
                {rows.map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-4">
                    <dt className="label pt-0.5">{k}</dt>
                    <dd className="text-sm font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
