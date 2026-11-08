"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stop = { slug: string; title: string; category: string };
type Pt = { x: number; y: number };

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** Lay waypoints out as a snake (desktop) or a zigzag column (mobile). Handles any count. */
function layout(count: number, vertical: boolean): { pts: Pt[]; w: number; h: number } {
  if (vertical) {
    const w = 360;
    const gap = 150;
    const pts = Array.from({ length: count }, (_, i) => ({
      x: i % 2 === 0 ? 100 : 260,
      y: 80 + i * gap,
    }));
    return { pts, w, h: 80 + (count - 1) * gap + 90 };
  }
  const perRow = 4;
  const w = 1000;
  const rowH = 200;
  const rows = Math.ceil(count / perRow);
  const pts = Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const inRow = Math.min(perRow, count - row * perRow);
    // full rows use fixed spacing; a lone single row spreads evenly across the map
    const step = rows > 1 ? 700 / (perRow - 1) : inRow > 1 ? 700 / (inRow - 1) : 0;
    // alternate direction each row so the route snakes
    const c = row % 2 === 0 ? col : (rows > 1 ? perRow : inRow) - 1 - col;
    const x = inRow === 1 && rows === 1 ? 500 : 150 + c * step;
    const y = 90 + row * rowH + (col % 2 === 0 ? 0 : 38);
    return { x, y };
  });
  return { pts, w, h: 90 + (rows - 1) * rowH + 150 };
}

/** Catmull-Rom → cubic Bézier path through all points. */
function smoothPath(p: Pt[]): string {
  if (p.length < 2) return "";
  let d = `M${p[0].x},${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
  }
  return d;
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function Island({ pt, stop, index, vertical }: { pt: Pt; stop: Stop; index: number; vertical: boolean }) {
  const lines = (() => {
    const max = vertical ? 20 : 18;
    const words = stop.title.split(" ");
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > max && cur) {
        out.push(cur);
        cur = w;
      } else cur = (cur + " " + w).trim();
    }
    if (cur) out.push(cur);
    const shown = out.slice(0, 2);
    if (out.length > 2) shown[1] = clip(shown[1] + "…", max);
    return shown;
  })();

  return (
    <Link href={`/projects/${stop.slug}/`} aria-label={`Open project: ${stop.title}`}>
      <g className="cursor-pointer transition-transform hover:-translate-y-1" style={{ transformBox: "fill-box" }}>
        <title>{stop.title}</title>
        <ellipse cx={pt.x} cy={pt.y + 22} rx="56" ry="15" fill="#4fa3c7" opacity="0.35" />
        <ellipse cx={pt.x} cy={pt.y + 14} rx="48" ry="16" fill="#e6cf94" stroke="#8a6a36" strokeWidth="2" />
        <path d={`M${pt.x - 30},${pt.y + 10} Q${pt.x},${pt.y - 34} ${pt.x + 30},${pt.y + 10} Z`} fill="#4f8a4a" stroke="#2f5a2c" strokeWidth="2" />
        <line x1={pt.x + 6} y1={pt.y - 8} x2={pt.x + 6} y2={pt.y - 40} stroke="#2a1a0c" strokeWidth="2.5" />
        <path d={`M${pt.x + 6},${pt.y - 40} l22,7 l-22,8 z`} fill="#c8102e" />
        <circle cx={pt.x - 34} cy={pt.y - 22} r="13" fill="#071d33" stroke="#e8b23a" strokeWidth="2" />
        <text x={pt.x - 34} y={pt.y - 17.5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#e8b23a" fontFamily="var(--font-manrope)">
          {ROMAN[index] ?? index + 1}
        </text>
        {lines.map((l, i) => (
          <text
            key={i}
            x={pt.x}
            y={pt.y + 50 + i * 17}
            textAnchor="middle"
            fontSize="14.5"
            fontWeight="800"
            fill="#2a1a0c"
            stroke="#ecdcae"
            strokeWidth="4"
            paintOrder="stroke"
            fontFamily="var(--font-manrope)"
          >
            {l}
          </text>
        ))}
        <text x={pt.x} y={pt.y + 50 + lines.length * 17} textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="1.5" fill="#c8102e" fontFamily="var(--font-manrope)">
          {stop.category.toUpperCase()}
        </text>
      </g>
    </Link>
  );
}

export default function VoyageMap({ stops, vertical = false }: { stops: Stop[]; vertical?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // +1 waypoint: the unexplored "X" that keeps the map open-ended.
  const { pts, w, h } = layout(stops.length + 1, vertical);
  const d = smoothPath(pts);

  useEffect(() => {
    const path = pathRef.current;
    const ship = shipRef.current;
    const wrap = wrapRef.current;
    if (!path || !ship || !wrap || !d) return;
    const len = path.getTotalLength();
    const place = (t: number) => {
      const a = path.getPointAtLength(len * t);
      const b = path.getPointAtLength(Math.min(len, len * t + 2));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      ship.setAttribute("transform", `translate(${a.x},${a.y}) rotate(${Math.abs(angle) > 90 ? 0 : angle * 0.4})`);
    };
    place(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0.04);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 75%",
      end: "bottom 35%",
      scrub: 0.6,
      onUpdate: (self) => place(self.progress),
    });
    return () => st.kill();
  }, [d]);

  if (stops.length === 0) {
    return (
      <p className="parchment rounded-lg p-8 text-center font-display text-2xl">
        The sea is calm… no voyages charted yet.
      </p>
    );
  }

  const last = pts[pts.length - 1];

  return (
    <div ref={wrapRef} className="parchment rounded-lg border-y-[10px] border-wood p-2 md:p-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="group" aria-label="Map of projects">
        {/* sea texture */}
        {[...Array(vertical ? 8 : 10)].map((_, i) => (
          <path
            key={i}
            d="M0 6 q8 -8 16 0 t16 0 t16 0"
            fill="none"
            stroke="#8a6a36"
            strokeWidth="2"
            opacity="0.28"
            transform={`translate(${(i * 137) % (w - 60)} ${(i * 89) % (h - 20) + 10})`}
          />
        ))}
        {/* compass rose */}
        <g transform={`translate(${vertical ? w - 50 : w - 70} ${vertical ? 46 : 60})`} opacity="0.75">
          <circle r="26" fill="none" stroke="#5b3a1e" strokeWidth="2" />
          <path d="M0,-34 L7,0 L0,34 L-7,0 Z" fill="#5b3a1e" />
          <path d="M-34,0 L0,-7 L34,0 L0,7 Z" fill="#8a6a36" />
          <text y="-38" textAnchor="middle" fontSize="12" fontWeight="800" fill="#5b3a1e">N</text>
        </g>

        {/* the route */}
        <path ref={pathRef} d={d} fill="none" stroke="#c8102e" strokeWidth="4" strokeDasharray="4 12" strokeLinecap="round" />

        {stops.map((s, i) => (
          <Island key={s.slug} pt={pts[i]} stop={s} index={i} vertical={vertical} />
        ))}

        {/* destination X */}
        <g>
          <path d={`M${last.x - 14},${last.y - 14} L${last.x + 14},${last.y + 14} M${last.x + 14},${last.y - 14} L${last.x - 14},${last.y + 14}`} stroke="#c8102e" strokeWidth="8" strokeLinecap="round" />
          <text x={last.x} y={last.y + 48} textAnchor="middle" fontSize="15" fontWeight="800" fill="#2a1a0c" fontFamily="var(--font-manrope)">
            Next stop: ???
          </text>
        </g>

        {/* ship */}
        <g ref={shipRef}>
          <g transform="translate(-22 -34)">
            <path d="M0 26 L44 26 L38 38 L6 38 Z" fill="#5b3a1e" stroke="#2a1a0c" strokeWidth="2" />
            <line x1="22" y1="26" x2="22" y2="2" stroke="#2a1a0c" strokeWidth="2.5" />
            <path d="M24 4 Q42 14 24 24 Z" fill="#f4ead2" stroke="#2a1a0c" strokeWidth="1.5" />
            <circle cx="33" cy="14" r="3.5" fill="#c8102e" />
          </g>
        </g>
      </svg>
    </div>
  );
}
