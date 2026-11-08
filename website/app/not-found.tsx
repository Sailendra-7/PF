import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center px-5">
      <div className="wrap">
        <p className="label">Error 404</p>
        <h1 className="mt-4 max-w-[16ch] text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          This page does not exist.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-muted">The link may be old, or the project may have been removed.</p>
        <Link href="/" className="btn btn-primary mt-10">
          Back to home
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/15" aria-hidden>
            &rarr;
          </span>
        </Link>
      </div>
    </main>
  );
}
