import type { SkillGroup } from "@/lib/content";
import Reveal from "./Reveal";

export default function Toolbox({ groups }: { groups: SkillGroup[] }) {
  if (!groups.length) return null;
  return (
    <section id="skills" className="wrap section-y">
      <Reveal>
        <h2 className="h-section">Software and field tools</h2>
      </Reveal>
      <div className="mt-14 divide-y divide-line/15 border-y border-line/15">
        {groups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.06}>
            <div className="grid gap-5 py-9 md:grid-cols-12 md:gap-8">
              <h3 className="text-xl font-semibold tracking-tight md:col-span-4">{g.name}</h3>
              <ul className="flex flex-wrap gap-2.5 md:col-span-8">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-surface px-5 py-2.5 text-sm font-medium ring-1 ring-line/15"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
