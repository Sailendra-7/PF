import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="parchment parchment-torn max-w-md px-10 py-12 text-center">
        <p className="font-display text-8xl leading-none text-flag">404</p>
        <h1 className="mt-2 text-4xl">Lost at sea</h1>
        <p className="mt-3 text-ink/80">This island is not on any map I have charted.</p>
        <Link href="/" className="btn btn-red mt-8">
          Back to the ship
        </Link>
      </div>
    </main>
  );
}
