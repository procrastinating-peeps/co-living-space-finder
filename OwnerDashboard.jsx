import { useEffect, useState } from "react";
import api from "../api";
import Field, { inputClass } from "../components/Field.jsx";

const statusStyles = {
  pending: "text-brass-dark bg-brass/10 border-brass/40",
  approved: "text-verified bg-verified-light border-verified/40",
  rejected: "text-rust bg-rust-light border-rust/40",
};

const emptyForm = {
  name: "", description: "", city: "", locality: "", address: "",
  room_type: "shared", rent: "", deposit: "", capacity: 1,
  gender_preference: "any", amenities: "", available_from: "",
};

export default function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function loadAll() {
    api.get("/properties/mine/list").then(({ data }) => setProperties(data.properties));
    api.get("/bookings/owner/requests").then(({ data }) => setRequests(data.requests));
  }

  useEffect(loadAll, []);

  async function submitProperty(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/properties", {
        ...form,
        rent: Number(form.rent),
        deposit: Number(form.deposit || 0),
        capacity: Number(form.capacity),
        amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      });
      setForm(emptyForm);
      setShowForm(false);
      loadAll();
    } finally {
      setSaving(false);
    }
  }

  async function decide(id, decision) {
    await api.put(`/bookings/${id}/decision`, { decision });
    loadAll();
  }

  const statusLabel = { pending: "Awaiting admin review", approved: "Live", rejected: "Not approved" };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Owner dashboard</h1>
        <button onClick={() => setShowForm((s) => !s)} className="bg-ink text-paper px-5 py-2.5 rounded-card hover:bg-ink-light transition-colors">
          {showForm ? "Cancel" : "Add a listing"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitProperty} className="border border-ink/15 rounded-card p-5 bg-paper-card mb-10">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Property name">
              <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="City">
              <input required className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </Field>
            <Field label="Locality">
              <input className={inputClass} value={form.locality} onChange={(e) => setForm({ ...form, locality: e.target.value })} />
            </Field>
            <Field label="Address">
              <input className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>
            <Field label="Room type">
              <select className={inputClass} value={form.room_type} onChange={(e) => setForm({ ...form, room_type: e.target.value })}>
                <option value="shared">Shared</option>
                <option value="private">Private</option>
              </select>
            </Field>
            <Field label="Gender preference">
              <select className={inputClass} value={form.gender_preference} onChange={(e) => setForm({ ...form, gender_preference: e.target.value })}>
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>
            <Field label="Rent (₹/mo)">
              <input required type="number" className={inputClass} value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} />
            </Field>
            <Field label="Deposit (₹)">
              <input type="number" className={inputClass} value={form.deposit} onChange={(e) => setForm({ ...form, deposit: e.target.value })} />
            </Field>
            <Field label="Capacity (people)">
              <input type="number" min="1" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
            </Field>
            <Field label="Available from">
              <input type="date" className={inputClass} value={form.available_from} onChange={(e) => setForm({ ...form, available_from: e.target.value })} />
            </Field>
          </div>
          <Field label="Description">
            <textarea rows={3} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Amenities (comma separated)">
            <input className={inputClass} placeholder="WiFi, AC, Washing Machine" value={form.amenities}
              onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
          </Field>
          <button disabled={saving} className="bg-ink text-paper px-6 py-2.5 rounded-card hover:bg-ink-light transition-colors disabled:opacity-60">
            {saving ? "Submitting…" : "Submit for review"}
          </button>
          <p className="text-xs text-ink-faint mt-2">New listings are reviewed by our admin team before going live.</p>
        </form>
      )}

      <h2 className="font-display text-xl text-ink mb-3">Your listings</h2>
      <div className="border border-ink/15 rounded-card bg-paper-card divide-y divide-ink/10 mb-10">
        {properties.length === 0 && <p className="px-5 py-4 text-ink-faint text-sm">You haven't listed a property yet.</p>}
        {properties.map((p) => (
          <div key={p.id} className="ledger-row flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-ink font-medium">{p.name}</p>
              <p className="text-sm text-ink-faint">{p.city} · ₹{p.rent.toLocaleString("en-IN")}/mo · {p.capacity} beds</p>
            </div>
            <span className={`text-xs border rounded-full px-3 py-1 ${statusStyles[p.status]}`}>{statusLabel[p.status]}</span>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl text-ink mb-3">Booking requests</h2>
      <div className="border border-ink/15 rounded-card bg-paper-card divide-y divide-ink/10">
        {requests.length === 0 && <p className="px-5 py-4 text-ink-faint text-sm">No requests yet.</p>}
        {requests.map((r) => (
          <div key={r.id} className="ledger-row flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-ink font-medium">{r.tenant_name} <span className="text-ink-faint font-normal">→ {r.property_name}</span></p>
              {r.message && <p className="text-sm text-ink-faint mt-0.5">"{r.message}"</p>}
            </div>
            <div className="flex items-center gap-2">
              {r.status === "pending" ? (
                <>
                  <button onClick={() => decide(r.id, "approved")} className="text-xs border border-verified text-verified rounded-full px-3 py-1 hover:bg-verified-light">
                    Approve
                  </button>
                  <button onClick={() => decide(r.id, "rejected")} className="text-xs border border-rust text-rust rounded-full px-3 py-1 hover:bg-rust-light">
                    Reject
                  </button>
                </>
              ) : (
                <span className={`text-xs border rounded-full px-3 py-1 capitalize ${statusStyles[r.status]}`}>{r.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
