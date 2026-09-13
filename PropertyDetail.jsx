import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";
import CompatibilityMeter from "../components/CompatibilityMeter.jsx";

export default function PropertyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    api.get(`/properties/${id}`).then((res) => setData(res.data));
  }, [id, user, navigate]);

  async function sendRequest(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/bookings", { property_id: id, message });
      setStatus("sent");
    } catch (err) {
      setStatus(err.response?.data?.error || "Couldn't send that request.");
    }
  }

  if (!data) return <div className="max-w-4xl mx-auto px-6 py-16 text-ink-faint">Loading…</div>;

  const { property, owner, currentTenantCount, compatibility } = data;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="h-48 bg-ink/5 border border-ink/15 rounded-card mb-6 flex items-center justify-center">
        <span className="font-display text-ink-faint">{property.room_type === "shared" ? "Shared room" : "Private room"}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">{property.name}</h1>
          <p className="text-ink-faint mt-1">{property.locality ? `${property.locality}, ` : ""}{property.city}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-ink">₹{property.rent.toLocaleString("en-IN")}<span className="text-sm text-ink-faint font-body">/mo</span></p>
          <p className="text-sm text-ink-faint">Deposit ₹{property.deposit.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-sm text-ink-light">Listed by {owner.name}</span>
        <VerifiedBadge verified={owner.verified} />
      </div>

      <p className="text-ink-light mt-6 max-w-2xl">{property.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
        <div><p className="text-ink-faint">Room type</p><p className="text-ink capitalize">{property.room_type}</p></div>
        <div><p className="text-ink-faint">Capacity</p><p className="text-ink">{property.capacity} people</p></div>
        <div><p className="text-ink-faint">Current tenants</p><p className="text-ink">{currentTenantCount}</p></div>
        <div><p className="text-ink-faint">Available from</p><p className="text-ink">{property.available_from || "Immediately"}</p></div>
      </div>

      {property.amenities.length > 0 && (
        <div className="mt-6">
          <p className="text-ink-faint text-sm mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a) => (
              <span key={a} className="text-xs border border-ink/20 rounded-full px-3 py-1 text-ink-light">{a}</span>
            ))}
          </div>
        </div>
      )}

      {user?.role === "tenant" && (
        <div className="mt-8 border border-ink/15 rounded-card p-5 bg-paper-card">
          <CompatibilityMeter score={compatibility} />
        </div>
      )}

      {user?.role === "tenant" && (
        <form onSubmit={sendRequest} className="mt-8 border-t border-ink/15 pt-6">
          <h2 className="font-display text-xl text-ink mb-3">Send a booking request</h2>
          <textarea
            className="w-full border border-ink/25 rounded-card px-3 py-2 mb-3"
            rows={3}
            placeholder="Introduce yourself to the owner (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            disabled={status === "sending" || status === "sent"}
            className="bg-ink text-paper px-6 py-2.5 rounded-card hover:bg-ink-light transition-colors disabled:opacity-60"
          >
            {status === "sent" ? "Request sent" : status === "sending" ? "Sending…" : "Send request"}
          </button>
          {status && status !== "sending" && status !== "sent" && (
            <p className="text-rust text-sm mt-2">{status}</p>
          )}
          {status === "sent" && (
            <p className="text-verified text-sm mt-2">The owner will review your request — track it under "My requests".</p>
          )}
        </form>
      )}
    </div>
  );
}
