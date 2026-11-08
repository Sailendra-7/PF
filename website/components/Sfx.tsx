/** Manga-style sound-effect lettering. Purely decorative. */
export default function Sfx({
  children,
  className = "",
  rotate = -8,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className={`sfx ${className}`}
      style={{ ["--r" as string]: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}
