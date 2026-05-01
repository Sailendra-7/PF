"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: string;
  el?: HTMLDivElement | null;
};

const particleTones = [
  "from-white/90 via-accent/80 to-cyan-300/40",
  "from-accent/90 via-white/70 to-fuchsia-300/35",
  "from-cyan-300/90 via-white/60 to-white/10",
  "from-white/80 via-sky-400/70 to-accent/30",
];

export default function AntiGravity({ count = 22 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * -0.7 - 0.15,
        size: 18 + Math.random() * 42,
        hue: particleTones[i % particleTones.length],
        el: null,
      });
    }
    particlesRef.current = particles;

    let mouseX = -9999;
    let mouseY = -9999;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    container.addEventListener("mousemove", onMove);

    let raf = 0;

    function step() {
      for (const p of particlesRef.current) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist2 = dx * dx + dy * dy + 0.0001;
        const repel = 9000 / dist2;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * repel * 0.015;
        p.vy += Math.sin(angle) * repel * 0.015;
        p.vy += -0.012;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = rect.width + 50;
        if (p.x > rect.width + 50) p.x = -50;
        if (p.y < -80) p.y = rect.height + 80;
        if (p.y > rect.height + 80) p.y = -80;
        if (p.el) {
          p.el.style.transform = `translate3d(${Math.round(p.x)}px, ${Math.round(
            p.y
          )}px, 0) scale(${Math.max(0.5, p.size / 24)})`;
          p.el.style.opacity = `${Math.min(1, 0.7 + p.size / 90)}`;
        }
      }
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
    };
  }, [count]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-[14%] z-[2] -translate-x-1/2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur-md md:text-xs">
        Anti-gravity mode
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            const p = particlesRef.current[i];
            if (p) p.el = el;
          }}
          className={`absolute left-0 top-0 rounded-full bg-gradient-to-br ${particlesRef.current[i]?.hue ?? "from-white/80 via-accent/50 to-transparent"} mix-blend-screen blur-md`}
          style={{
            width: 18,
            height: 18,
            transform: "translate3d(-9999px,-9999px,0)",
            transition: "opacity 200ms linear",
          }}
        />
      ))}
    </div>
  );
}
