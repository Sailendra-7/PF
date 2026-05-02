"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/lib/portfolio-data";

export default function Navbar() {
  const [active, setActive] = useState("#hero");
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-4 flex w-[92%] max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl md:px-6">
        <a
          href="#hero"
          className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#1c3340]"
          aria-label="Go to top"
        >
          {!logoError ? (
            // Uses the local file at /public/logo-sk.jpg when available.
            <img
              src="/logo-sk.jpg?v=1"
              alt="Sailendra Kamal"
              className="h-full w-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-display text-sm font-bold tracking-[0.2em] text-white">SK</span>
          )}
        </a>

        <ul className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = active === item.href;

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors md:text-sm ${
                    isActive
                      ? "bg-white text-black"
                      : "text-muted hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
