"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, EnvelopeSimple, LinkedinLogo, Phone } from "@phosphor-icons/react";
import type { Profile } from "@/lib/content";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No form service configured: open the visitor's mail app with the message prefilled.
    if (!profile.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} (${data.get("email")})`);
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
    profile.email && { href: `mailto:${profile.email}`, label: "Email", value: profile.email, Icon: EnvelopeSimple },
    profile.phone && { href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`, label: "Phone", value: profile.phone, Icon: Phone },
    profile.linkedin && { href: profile.linkedin, label: "LinkedIn", value: profile.name, Icon: LinkedinLogo, external: true },
  ].filter(Boolean) as { href: string; label: string; value: string; Icon: typeof Phone; external?: boolean }[];

  return (
    <section id="contact" className="wrap section-y">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="h-section">Get in touch</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">{profile.contactIntro}</p>
          <ul className="mt-10 space-y-3">
            {links.map(({ href, label, value, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl p-3 pr-4 ring-1 ring-line/10 transition duration-500 ease-out hover:bg-ink/[0.04]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/[0.06] text-accent">
                    <Icon size={20} weight="light" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    weight="light"
                    className="text-muted transition duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="bezel">
            <form onSubmit={onSubmit} className="bezel-core space-y-5 p-6 md:p-9">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="c-name" className="text-sm font-medium">
                    Name
                  </label>
                  <input id="c-name" name="name" required autoComplete="name" className="field" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="c-email" className="text-sm font-medium">
                    Email
                  </label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="c-message" className="text-sm font-medium">
                  Message
                </label>
                <textarea id="c-message" name="message" required rows={6} className="field resize-y" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={status === "sending"} className="btn btn-primary group disabled:opacity-60">
                  {status === "sending" ? "Sending" : "Send message"}
                  <span className="btn-icon">
                    <ArrowUpRight size={16} weight="light" />
                  </span>
                </button>
                <p role="status" aria-live="polite" className="text-sm">
                  {status === "sent" ? <span className="text-ink">Message sent. I will reply soon.</span> : null}
                  {status === "error" ? (
                    <span className="text-accent">Could not send. Please email me directly instead.</span>
                  ) : null}
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
