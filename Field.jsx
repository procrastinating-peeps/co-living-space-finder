export default function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm text-ink-light mb-1">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full border border-ink/25 rounded-card px-3 py-2 bg-white/60 text-ink focus:border-brass focus:ring-0 outline-none";
