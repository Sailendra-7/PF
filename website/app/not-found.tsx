import Link from "next/link";
import JollyRoger from "@/components/JollyRoger";

export default function NotFound() {
  return (
    <main className="sky flex min-h-screen items-center justify-center px-5">
      <div className="relative max-w-md drop-shadow-[0_24px_20px_rgba(8,32,60,0.5)]">
        <JollyRoger className="absolute -right-6 -top-10 z-10 w-24 rotate-12" />
        <div className="parchment parchment-torn px-10 py-12 text-center">
          <p className="font-poster text-8xl leading-none text-flag">404</p>
          <h1 className="mt-2 text-4xl text-ink">Lost at sea!</h1>
          <p className="mt-3 text-ink/80">This island is not on any map the Log Pose knows.</p>
          <Link href="/" className="btn btn-red mt-8">
            Back to the ship
          </Link>
        </div>
      </div>
    </main>
  );
}
