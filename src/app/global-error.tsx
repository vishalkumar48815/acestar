"use client";

/** Last-resort boundary when the root layout itself fails. Must render its own <html>. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-MY">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f4f8fd",
          color: "#0e1a2b",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>Something went wrong</h1>
          <p style={{ margin: "0 0 24px", color: "#3d4b60" }}>
            Please reload the page. If the problem continues, call us on 03-2201 7688.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              font: "600 16px system-ui",
              padding: "14px 22px",
              borderRadius: 14,
              border: 0,
              background: "#0e1a2b",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
