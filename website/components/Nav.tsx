"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Toolbox" },
];

export default function Nav({ name }: { name: string }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id), "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "hero" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkCls = (id: string) =>
    `rounded-full px-4 py-2 text-sm transition duration-500 ease-out ${
      active === id ? "bg-ink/[0.08] text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full border border-line/10 bg-bg/75 py-2 pl-6 pr-2 backdrop-blur-xl"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.id} href={`/#${l.id}`} aria-current={active === l.id ? "true" : undefined} className={linkCls(l.id)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-on-accent transition duration-500 ease-out hover:opacity-90 active:scale-[0.98]"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="relative h-10 w-10 rounded-full md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-ink transition duration-500 ease-out ${
              open ? "rotate-45" : "-translate-y-[3px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-ink transition duration-500 ease-out ${
              open ? "-rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-3xl border border-line/10 bg-bg/90 backdrop-blur-xl transition duration-500 ease-out md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <ul className="p-3">
          {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
            <li
              key={l.id}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`transition duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              <Link href={`/#${l.id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-4 text-lg font-medium">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
