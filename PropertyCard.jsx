import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="block bg-paper-card border border-ink/15 rounded-card hover:border-brass transition-colors"
    >
      <div className="h-32 bg-ink/5 border-b border-ink/15 flex items-center justify-center">
        <span className="font-display text-ink-faint text-sm">{property.room_type === "shared" ? "Shared room" : "Private room"}</span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-ink leading-snug">{property.name}</h3>
        <p className="text-sm text-ink-faint mt-0.5">{property.locality ? `${property.locality}, ` : ""}{property.city}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-ink font-medium">₹{property.rent.toLocaleString("en-IN")}<span className="text-ink-faint font-normal">/mo</span></span>
          <span className="text-xs text-ink-faint capitalize">{property.gender_preference === "any" ? "Any gender" : `${property.gender_preference} only`}</span>
        </div>
      </div>
    </Link>
  );
}
