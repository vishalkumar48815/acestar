/** Shown while an admin page loads its data (each page streams in behind this boundary). */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="h-9 w-56 animate-pulse rounded-xl bg-brand-soft" />
      <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded-lg bg-brand-soft" />
      <div className="mt-8 grid gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-2xl bg-brand-soft"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
