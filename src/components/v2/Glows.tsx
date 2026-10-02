/**
 * Soft colour behind a band, so the glass on top has something to frost.
 * Each glow drifts slowly; reduced motion holds them still.
 * Painted as radial gradients (not filter blurs) so the drift stays cheap on phones.
 */
export function Glows({
  spots,
  className = "",
}: {
  spots: { at: string; size: string; color: string; delay?: number }[];
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {spots.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full motion-safe:animate-[glow-drift_22s_ease-in-out_infinite]"
          style={{
            ...Object.fromEntries(s.at.split(" ").map((p) => p.split(":"))),
            width: s.size,
            height: s.size,
            background: `radial-gradient(closest-side, ${s.color}, transparent 70%)`,
            transform: "scale(1.6)",
            animationDelay: `${s.delay ?? i * -6}s`,
          }}
        />
      ))}
    </div>
  );
}

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="m2 5.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
