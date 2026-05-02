"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorOrb() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || !dotRef.current || !ringRef.current) {
      return;
    }

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.16, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.16, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const move = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      dotX(x);
      dotY(y);
      ringX(x);
      ringY(y);
    };

    const enterTarget = () => {
      gsap.to(ringRef.current, { scale: 1.85, opacity: 0.95, duration: 0.2 });
    };

    const leaveTarget = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 0.65, duration: 0.2 });
    };

    const targets = Array.from(document.querySelectorAll("a, button, input, textarea, [data-hover-target]"));

    window.addEventListener("mousemove", move);
    targets.forEach((target) => {
      target.addEventListener("mouseenter", enterTarget);
      target.addEventListener("mouseleave", leaveTarget);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", enterTarget);
        target.removeEventListener("mouseleave", leaveTarget);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
