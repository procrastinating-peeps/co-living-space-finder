import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

const statusStyles = {
  pending: "text-brass-dark bg-brass/10 border-brass/40",
  approved: "text-verified bg-verified-light border-verified/40",
  rejected: "text-rust bg-rust-light border-rust/40",
  cancelled: "text-ink-faint bg-ink/5 border-ink/20",
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api.get("/bookings/mine").then(({ data }) => {
      setBookings(data.bookings);
      setLoading(false);
    });
  }

  useEffect(load, []);

  async function cancel(id) {
    await api.delete(`/bookings/${id}`);
    load();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl text-ink mb-8">My requests</h1>

      {loading ? (
        <p className="text-ink-faint">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="text-ink-faint">
          You haven't sent any booking requests yet. <Link to="/browse" className="text-brass-dark hover:underline">Browse homes</Link>
        </p>
      ) : (
        <div className="border border-ink/15 rounded-card bg-paper-card divide-y divide-ink/10">
          {bookings.map((b) => (
            <div key={b.id} className="ledger-row flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-ink font-medium">{b.property_name}</p>
                <p className="text-sm text-ink-faint">{b.city} · ₹{b.rent.toLocaleString("en-IN")}/mo</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs border rounded-full px-3 py-1 capitalize ${statusStyles[b.status]}`}>{b.status}</span>
                {b.status === "pending" && (
                  <button onClick={() => cancel(b.id)} className="text-xs text-ink-faint hover:text-rust">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
