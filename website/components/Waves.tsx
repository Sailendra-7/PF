/** Two layers of drifting SVG waves. Purely decorative. */
export default function Waves({ className = "" }: { className?: string }) {
  const path =
    "M0 60 C 120 20, 240 100, 360 60 S 600 20, 720 60 S 960 100, 1080 60 S 1320 20, 1440 60 L1440 120 L0 120 Z";
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 overflow-hidden ${className}`} aria-hidden>
      <svg
        className="wave-drift-slow absolute bottom-0 left-0 h-28 w-[200%] opacity-60"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path d={path} fill="#123e66" transform="translate(0 -6)" />
        <path d={path} fill="#123e66" transform="translate(1440 -6)" />
      </svg>
      <svg
        className="wave-drift absolute bottom-0 left-0 h-24 w-[200%]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path d={path} fill="#0c2b4a" />
        <path d={path} fill="#0c2b4a" transform="translate(1440 0)" />
      </svg>
    </div>
  );
}
