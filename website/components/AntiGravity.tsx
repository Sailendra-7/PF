"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  el?: HTMLDivElement | null;
};

export default function AntiGravity({ count = 12 }: { count?: number }) {
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
        vx: (Math.random() - 0.5) * 0.2,
        vy: Math.random() * -0.3 - 0.1,
        size: 8 + Math.random() * 28,
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
        const repel = 2500 / dist2;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * repel * 0.02;
        p.vy += Math.sin(angle) * repel * 0.02;
        p.vy += -0.005;
        p.vx *= 0.98;
        p.vy *= 0.98;
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
          p.el.style.opacity = `${Math.min(1, 0.6 + (24 - p.size) / 48)}`;
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
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            const p = particlesRef.current[i];
            if (p) p.el = el;
          }}
          className="absolute left-0 top-0 rounded-full bg-white/20 blur-sm"
          style={{
            width: 12,
            height: 12,
            transform: "translate3d(-9999px,-9999px,0)",
            transition: "opacity 200ms linear",
          }}
        />
      ))}
    </div>
  );
}
