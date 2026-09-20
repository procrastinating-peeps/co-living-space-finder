import { useEffect, useState } from "react";
import api from "./api";
import VerifiedBadge from "./VerifiedBadge.jsx";

export default function AdminDashboard() {
  const [tab, setTab] = useState("listings");
  const [stats, setStats] = useState(null);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);

  function loadAll() {
    api.get("/admin/stats").then(({ data }) => setStats(data));
    api.get("/admin/properties", { params: { status: "pending" } }).then(({ data }) => setPendingProperties(data.properties));
    api.get("/admin/users").then(({ data }) => setUsers(data.users));
    api.get("/admin/complaints").then(({ data }) => setComplaints(data.complaints));
  }

  useEffect(loadAll, []);

  async function decideProperty(id, decision) {
    await api.put(`/admin/properties/${id}/decision`, { decision });
    loadAll();
  }

  async function toggleVerify(id, verified) {
    await api.put(`/admin/users/${id}/verify`, { verified });
    loadAll();
  }

  async function setComplaintStatus(id, status) {
    await api.put(`/admin/complaints/${id}/status`, { status });
    loadAll();
  }

  const tabs = [
    { id: "listings", label: "Pending listings" },
    { id: "users", label: "Users" },
    { id: "complaints", label: "Complaints" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl text-ink mb-6">Admin</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            ["Tenants", stats.totalUsers],
            ["Owners", stats.totalOwners],
            ["Live listings", stats.totalProperties],
            ["Booking conversion", `${stats.bookingConversionRate}%`],
            ["Open complaints", stats.openComplaints],
          ].map(([label, value]) => (
            <div key={label} className="border border-ink/15 rounded-card bg-paper-card p-4">
              <p className="text-xs text-ink-faint">{label}</p>
              <p className="font-display text-2xl text-ink">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-6 border-b border-ink/15 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 text-sm ${tab === t.id ? "text-ink border-b-2 border-brass -mb-px" : "text-ink-faint"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "listings" && (
        <div className="border border-ink/15 rounded-card bg-paper-card divide-y divide-ink/10">
          {pendingProperties.length === 0 && <p className="px-5 py-4 text-ink-faint text-sm">Nothing awaiting review.</p>}
          {pendingProperties.map((p) => (
            <div key={p.id} className="ledger-row flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-ink font-medium">{p.name}</p>
                <p className="text-sm text-ink-faint">
                  {p.city} · ₹{p.rent.toLocaleString("en-IN")}/mo · listed by {p.owner_name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decideProperty(p.id, "approved")} className="text-xs border border-verified text-verified rounded-full px-3 py-1 hover:bg-verified-light">
                  Approve
                </button>
                <button onClick={() => decideProperty(p.id, "rejected")} className="text-xs border border-rust text-rust rounded-full px-3 py-1 hover:bg-rust-light">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "users" && (
        <div className="border border-ink/15 rounded-card bg-paper-card divide-y divide-ink/10">
          {users.map((u) => (
            <div key={u.id} className="ledger-row flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-ink font-medium">{u.name}</p>
                  <p className="text-sm text-ink-faint">{u.email} · {u.role}</p>
                </div>
                <VerifiedBadge verified={u.verified} />
              </div>
              <button
                onClick={() => toggleVerify(u.id, !u.verified)}
                className="text-xs border border-ink/25 text-ink-light rounded-full px-3 py-1 hover:border-brass hover:text-brass-dark"
              >
                {u.verified ? "Revoke verification" : "Verify"}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "complaints" && (
        <div className="border border-ink/15 rounded-card bg-paper-card divide-y divide-ink/10">
          {complaints.length === 0 && <p className="px-5 py-4 text-ink-faint text-sm">No complaints on file.</p>}
          {complaints.map((c) => (
            <div key={c.id} className="ledger-row flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-ink font-medium">{c.subject}</p>
                <p className="text-sm text-ink-faint">{c.user_name}{c.property_name ? ` · ${c.property_name}` : ""}</p>
              </div>
              <select
                value={c.status}
                onChange={(e) => setComplaintStatus(c.id, e.target.value)}
                className="text-xs border border-ink/25 rounded-full px-3 py-1 bg-transparent"
              >
                <option value="open">Open</option>
                <option value="in_review">In review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
