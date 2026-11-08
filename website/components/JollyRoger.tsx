/**
 * Original "engineer pirate" emblem: a skull in a straw hat, with a hammer and a
 * surveyor's ranging pole crossed behind it instead of bones.
 */
export default function JollyRoger({
  className = "",
  title,
  ...rest
}: { className?: string; title?: string } & React.SVGProps<SVGSVGElement>) {
  const ink = "#2a1a0c";
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {/* hammer */}
      <g transform="rotate(42 60 64)">
        <rect x="56" y="14" width="8" height="98" rx="3" fill="#8a5a2b" stroke={ink} strokeWidth="2.5" />
        <rect x="38" y="10" width="44" height="18" rx="4" fill="#aab4bd" stroke={ink} strokeWidth="2.5" />
        <rect x="38" y="10" width="12" height="18" rx="4" fill="#7d8791" stroke={ink} strokeWidth="2.5" />
      </g>
      {/* surveyor's ranging pole */}
      <g transform="rotate(-42 60 64)">
        <rect x="56" y="10" width="8" height="102" rx="3" fill="#f4ead2" stroke={ink} strokeWidth="2.5" />
        {[18, 34, 50, 66, 82, 98].map((y) => (
          <rect key={y} x="56.5" y={y} width="7" height="8" fill="#c8102e" />
        ))}
        <path d="M60 2 L66 12 H54 Z" fill="#c8102e" stroke={ink} strokeWidth="2" />
      </g>
      {/* skull */}
      <path
        d="M60 38 C37 38 30 55 34 70 C36 78 42 81 44 85 L44 96 L76 96 L76 85 C78 81 84 78 86 70 C90 55 83 38 60 38Z"
        fill="#f4ead2"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="49" cy="67" rx="7.5" ry="8.5" fill={ink} />
      <ellipse cx="71" cy="67" rx="7.5" ry="8.5" fill={ink} />
      <circle cx="46.5" cy="64" r="2" fill="#f4ead2" />
      <circle cx="68.5" cy="64" r="2" fill="#f4ead2" />
      <path d="M60 74 L55.5 83 H64.5 Z" fill={ink} />
      <path d="M44 88 Q60 97 76 88" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      {[50, 55, 60, 65, 70].map((x) => (
        <line key={x} x1={x} y1="89" x2={x} y2="96" stroke={ink} strokeWidth="2.2" />
      ))}
      {/* straw hat */}
      <ellipse cx="60" cy="41" rx="47" ry="12.5" fill="#e8b23a" stroke={ink} strokeWidth="3" />
      <path d="M33 39 C31 10 89 10 87 39 Z" fill="#f4cb62" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M33.5 32 Q60 42 86.5 32 L87 39 Q60 49 33 39 Z" fill="#c8102e" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M44 22 Q60 15 76 22" fill="none" stroke="#d29b1f" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
