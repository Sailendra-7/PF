"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import CursorOrb from "@/components/CursorOrb";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]");
      const parallaxItems = gsap.utils.toArray<HTMLElement>(".mouse-parallax");
      const snapSections = gsap.utils.toArray<HTMLElement>("[data-snap-section]");
      const enableDesktopSnap =
        window.matchMedia("(min-width: 1024px)").matches &&
        window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          }
        );
      });

      gsap.fromTo(
        "#projects [data-gsap-card], #skills [data-gsap-card]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 72%",
          },
        }
      );

      if (enableDesktopSnap && snapSections.length > 1) {
        ScrollTrigger.create({
          trigger: document.body,
          start: 0,
          end: "max",
          snap: {
            snapTo: (progress) => {
              const maxScroll = ScrollTrigger.maxScroll(window);
              if (maxScroll <= 0) {
                return progress;
              }

              const currentScroll = progress * maxScroll;
              const snapPoints = snapSections.map((section) => section.offsetTop);

              const closest = snapPoints.reduce((prev, curr) => {
                return Math.abs(curr - currentScroll) < Math.abs(prev - currentScroll)
                  ? curr
                  : prev;
              }, snapPoints[0]);

              return closest / maxScroll;
            },
            duration: { min: 0.2, max: 0.65 },
            delay: 0.08,
            ease: "power1.inOut",
          },
        });
      }

      gsap.to(".orbital-bg", {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("#hero .hero-content", {
        yPercent: -14,
        opacity: 0.74,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("#hero .parallax-node").forEach((node, index) => {
        gsap.to(node, {
          yPercent: -20 - index * 12,
          xPercent: index % 2 === 0 ? -6 : 6,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const moveParallax = (event: MouseEvent) => {
        const xRatio = event.clientX / window.innerWidth - 0.5;
        const yRatio = event.clientY / window.innerHeight - 0.5;

        parallaxItems.forEach((item) => {
          const depth = Number(item.dataset.depth || 0.02);
          gsap.to(item, {
            x: xRatio * depth * 100,
            y: yRatio * depth * 100,
            duration: 0.7,
            ease: "power2.out",
            overwrite: true,
          });
        });
      };

      window.addEventListener("mousemove", moveParallax);

      return () => {
        window.removeEventListener("mousemove", moveParallax);
      };
    });

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="snap-stage relative overflow-hidden pb-16">
      <CursorOrb />
      <div className="starfield" aria-hidden />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
