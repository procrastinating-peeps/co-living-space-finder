export default function VerifiedBadge({ verified, size = "sm" }) {
  const dims = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";
  if (!verified) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border border-ink-faint/40 text-ink-faint ${dims}`}>
        Unverified
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-brass bg-brass/10 text-brass-dark font-medium ${dims}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="currentColor" />
        <path d="M2.7 5.1L4.2 6.6L7.3 3.3" stroke="#F7F8F3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}
