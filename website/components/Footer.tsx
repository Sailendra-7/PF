import JollyRoger from "./JollyRoger";

export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-parchment/10 px-5 py-10 text-center text-sm text-sea-200/80">
      <div className="rope mx-auto mb-6 max-w-xs" aria-hidden />
      <JollyRoger className="flag-wave mx-auto mb-3 w-20 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]" />
      <p className="font-display text-xl text-straw">Thousand Sunny: under construction ⚓</p>
      <p className="mt-2">
        &copy; {new Date().getFullYear()} {name}. Built with ambition and a little bit of rope.
      </p>
      <p className="mt-1 text-xs opacity-70">
        A fan-inspired design. Not affiliated with or endorsed by the creators of One Piece.
      </p>
    </footer>
  );
}
