import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import Field, { inputClass } from "../components/Field.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "tenant", phone: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await register(form);
      navigate(user.role === "owner" ? "/owner" : "/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-1">Create an account</h1>
      <p className="text-ink-faint text-sm mb-8">Join as a tenant looking for a home, or an owner listing one.</p>

      {error && <div className="bg-rust-light text-rust border border-rust/30 rounded-card px-4 py-3 mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Field label="I am a...">
          <div className="flex gap-3">
            {["tenant", "owner"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setForm({ ...form, role: r })}
                className={`flex-1 py-2 rounded-card border capitalize transition-colors ${
                  form.role === r ? "border-brass bg-brass/10 text-brass-dark" : "border-ink/25 text-ink-light"
                }`}
              >
                {r === "tenant" ? "Tenant, looking for a home" : "Property owner"}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Full name">
          <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Email">
          <input type="email" required className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Phone">
          <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <Field label="Password">
          <input type="password" required minLength={6} className={inputClass} value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <button disabled={busy} className="w-full bg-ink text-paper py-2.5 rounded-card hover:bg-ink-light transition-colors disabled:opacity-60">
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-sm text-ink-faint mt-6">
        Already have an account? <Link to="/login" className="text-brass-dark hover:underline">Log in</Link>
      </p>
    </div>
  );
}
