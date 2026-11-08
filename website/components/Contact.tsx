"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import type { Profile } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-md border-2 border-ink/30 bg-parchment/60 px-4 py-3 text-sm text-ink placeholder:text-ink/50 outline-none transition focus:border-flag";

function DenDenMushi() {
  return (
    <svg viewBox="0 0 120 100" className="bob mx-auto h-24 w-28" aria-hidden>
      <ellipse cx="60" cy="86" rx="46" ry="8" fill="#000" opacity="0.25" />
      <path d="M14 80 Q10 50 38 48 Q62 46 64 70 L96 70 Q108 70 108 80 Z" fill="#f1e3c0" stroke="#2a1a0c" strokeWidth="3" />
      <circle cx="48" cy="60" r="17" fill="#e8b23a" stroke="#2a1a0c" strokeWidth="3" />
      <path d="M48 60 m-9 0 a9 9 0 1 1 18 0 a5 5 0 1 1 -9 3" fill="none" stroke="#2a1a0c" strokeWidth="2.5" />
      <line x1="22" y1="52" x2="16" y2="28" stroke="#2a1a0c" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="49" x2="34" y2="24" stroke="#2a1a0c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="26" r="4" fill="#c8102e" stroke="#2a1a0c" strokeWidth="2" />
      <circle cx="34" cy="22" r="4" fill="#c8102e" stroke="#2a1a0c" strokeWidth="2" />
      <circle cx="29" cy="64" r="3" fill="#2a1a0c" />
      <path d="M26 74 q6 4 12 0" fill="none" stroke="#2a1a0c" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No form service configured: open the visitor's mail app with the message prefilled.
    if (!profile.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const links = [
    profile.email && { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    profile.phone && { href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`, label: profile.phone, Icon: Phone },
    profile.linkedin && { href: profile.linkedin, label: `${profile.name} on LinkedIn`, Icon: Linkedin, external: true },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Mail; external?: boolean }[];

  return (
    <section id="contact" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">Den Den Mushi</p>
        <h2 className="section-title">Let us build something meaningful.</h2>
      </motion.div>

      <div className="parchment mt-10 grid gap-10 rounded-lg border-y-[10px] border-wood p-6 md:grid-cols-2 md:p-10">
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="name" required autoComplete="name" placeholder="Your name" aria-label="Your name" className={field} />
          <input name="email" required type="email" autoComplete="email" placeholder="Your email" aria-label="Your email" className={field} />
          <textarea name="message" required rows={5} placeholder="Your message" aria-label="Your message" className={field} />
          <button type="submit" disabled={status === "sending"} className="btn btn-red disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
          <p role="status" className="min-h-5 text-sm font-bold">
            {status === "sent" && <span className="text-green-800">Message received. I will reply soon.</span>}
            {status === "error" && (
              <span className="text-flag">Could not send. Please email me directly instead.</span>
            )}
          </p>
        </form>

        <div className="space-y-5">
          <DenDenMushi />
          <p className="leading-relaxed text-ink/90">{profile.contactIntro}</p>
          <ul className="space-y-3">
            {links.map(({ href, label, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-center gap-3 font-bold text-ink underline-offset-4 hover:text-flag hover:underline"
                >
                  <Icon size={18} aria-hidden /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
