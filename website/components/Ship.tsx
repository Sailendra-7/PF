import JollyRoger from "./JollyRoger";

/** Original caravel with a sun-lion figurehead and the engineer-pirate emblem on its sail. */
export default function Ship({ className = "" }: { className?: string }) {
  const ink = "#2a1a0c";
  return (
    <svg viewBox="0 0 320 270" className={className} aria-hidden>
      {/* masts */}
      <rect x="146" y="14" width="9" height="150" rx="3" fill="#6b4423" stroke={ink} strokeWidth="3" />
      <rect x="236" y="62" width="8" height="104" rx="3" fill="#6b4423" stroke={ink} strokeWidth="3" />
      {/* main sail */}
      <path d="M88 36 Q150 54 212 36 L214 132 Q150 150 86 132 Z" fill="#fbf1d6" stroke={ink} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="82" y="30" width="136" height="8" rx="4" fill="#6b4423" stroke={ink} strokeWidth="2.5" />
      <JollyRoger x="108" y="42" width="84" height="84" />
      {/* fore sail */}
      <path d="M202 74 Q240 84 280 74 L280 132 Q240 142 202 132 Z" fill="#fbf1d6" stroke={ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M204 100 Q240 110 278 100" fill="none" stroke="#c8102e" strokeWidth="5" />
      {/* flag */}
      <g className="flag-wave">
        <path d="M155 8 L200 18 L155 30 Z" fill="#c8102e" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="168" cy="19" r="4" fill="#f4cb62" />
      </g>
      {/* hull */}
      <path d="M18 158 L286 158 Q274 214 220 234 L92 234 Q38 214 18 158 Z" fill="#a8531b" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 172 H282" stroke="#f4cb62" strokeWidth="7" />
      <path d="M40 200 H266" stroke="#7a3a10" strokeWidth="3" opacity="0.7" />
      {[70, 120, 170, 220].map((x) => (
        <circle key={x} cx={x} cy={188} r="7" fill="#2a1a0c" stroke="#f4cb62" strokeWidth="2.5" />
      ))}
      {/* sun-lion figurehead */}
      <g transform="translate(298 150)">
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d="M0 -22 L6 -10 L-6 -10 Z"
            fill="#f08a1c"
            stroke={ink}
            strokeWidth="2"
            transform={`rotate(${i * 36})`}
          />
        ))}
        <circle r="13" fill="#f4cb62" stroke={ink} strokeWidth="3" />
        <circle cx="-4" cy="-2" r="1.8" fill={ink} />
        <circle cx="4" cy="-2" r="1.8" fill={ink} />
        <path d="M-5 4 Q0 9 5 4" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
