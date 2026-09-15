import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Field, { inputClass } from "../components/Field.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "owner" ? "/owner" : user.role === "admin" ? "/admin" : "/browse");
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't log you in. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-1">Log in</h1>
      <p className="text-ink-faint text-sm mb-8">Welcome back to CoHaus.</p>

      {error && <div className="bg-rust-light text-rust border border-rust/30 rounded-card px-4 py-3 mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <input type="email" required className={inputClass} value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Password">
          <input type="password" required className={inputClass} value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <button disabled={busy} className="w-full bg-ink text-paper py-2.5 rounded-card hover:bg-ink-light transition-colors disabled:opacity-60">
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="text-sm text-ink-faint mt-6">
        New here? <Link to="/register" className="text-brass-dark hover:underline">Create an account</Link>
      </p>

      <div className="mt-10 border-t border-ink/10 pt-4 text-xs text-ink-faint">
        <p className="mb-1">Demo accounts (seeded):</p>
        <p>Tenant — tenant1@coliving.test / Tenant@123</p>
        <p>Owner — owner1@coliving.test / Owner@123</p>
        <p>Admin — admin@coliving.test / Admin@123</p>
      </div>
    </div>
  );
}