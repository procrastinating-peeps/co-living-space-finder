export default function CompatibilityMeter({ score }) {
  if (score === null || score === undefined) {
    return (
      <p className="text-sm text-ink-faint">
        No current roommates yet — you'd be the first to move in.
      </p>
    );
  }

  const label = score >= 80 ? "Strong match" : score >= 60 ? "Reasonable match" : "Limited overlap";

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm text-ink-light">Roommate compatibility</span>
        <span className="font-display text-2xl text-ink">{score}<span className="text-sm text-ink-faint">/100</span></span>
      </div>
      <div className="h-2 w-full bg-paper rounded-full border border-ink/10 overflow-hidden">
        <div className="h-full bg-brass" style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-ink-faint mt-1">{label}, based on lifestyle preferences of current tenants.</p>
    </div>
  );
}
