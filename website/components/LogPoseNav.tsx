"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Captain's Log" },
  { id: "projects", label: "The Voyage" },
  { id: "skills", label: "Arsenal" },
  { id: "contact", label: "Den Den Mushi" },
];

function Compass({ angle }: { angle: number }) {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#0c2b4a" stroke="#e8b23a" strokeWidth="2.5" />
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "20px 20px", transition: "transform .7s cubic-bezier(.2,1.4,.4,1)" }}>
        <path d="M20 5l4 15h-8z" fill="#c8102e" />
        <path d="M20 35l-4-15h8z" fill="#f1e3c0" />
      </g>
      <circle cx="20" cy="20" r="2" fill="#e8b23a" />
    </svg>
  );
}

export default function LogPoseNav({ name }: { name: string }) {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const idx = Math.max(0, items.findIndex((i) => i.id === active));
  // The needle sweeps across the arc as the voyage progresses.
  const angle = -70 + (idx / (items.length - 1)) * 140;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="wood mx-auto mt-3 flex w-[94%] max-w-5xl items-center justify-between rounded-xl px-3 py-2 md:px-5"
      >
        <a href="#hero" className="flex items-center gap-2" aria-label={`${name} — back to top`}>
          <Compass angle={angle} />
          <span className="hidden font-display text-xl text-straw sm:block">{name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "true" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors ${
                  active === i.id ? "bg-parchment text-ink" : "text-parchment/85 hover:bg-white/10"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-parchment md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <ul className="wood mx-auto mt-2 w-[94%] max-w-5xl rounded-xl p-2 md:hidden">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-4 py-3 text-sm font-bold ${
                  active === i.id ? "bg-parchment text-ink" : "text-parchment"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
