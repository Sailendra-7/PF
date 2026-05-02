'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Application Error</h1>
        <p>Something went wrong. Please try again.</p>
        <button onClick={() => reset()} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
}
