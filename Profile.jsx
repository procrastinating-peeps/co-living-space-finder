import { useEffect, useState } from "react";

import api from "./api";
import { useAuth } from "./AuthContext.jsx";
import Field from "./Field.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";

const defaultProfile = {
  gender: "", occupation: "", city: "", budget_min: "", budget_max: "",
  sleep_schedule: "flexible", cleanliness: 3, social_level: 3,
  smoking: false, pets: false, food_pref: "no_preference", work_schedule: "office", bio: "",
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(defaultProfile);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/auth/me").then(({ data }) => {
      if (data.profile) {
        setProfile({
          ...defaultProfile,
          ...data.profile,
          smoking: Boolean(data.profile.smoking),
          pets: Boolean(data.profile.pets),
        });
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      await api.put("/auth/me/profile", profile);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="font-display text-3xl text-ink">{user.name}</h1>
        <VerifiedBadge verified={user.verified} size="md" />
      </div>
      <p className="text-ink-faint mb-8">{user.email} · {user.role}</p>

      {!user.verified && (
        <div className="bg-brass/10 border border-brass/40 text-brass-dark rounded-card px-4 py-3 mb-6 text-sm">
          Your profile is awaiting verification by our team. Complete the fields below to speed it up.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Gender">
            <select className={inputClass} value={profile.gender || ""} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <Field label="Occupation">
            <input className={inputClass} value={profile.occupation || ""} onChange={(e) => setProfile({ ...profile, occupation: e.target.value })} />
          </Field>
          <Field label="City">
            <input className={inputClass} value={profile.city || ""} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
          </Field>
          <Field label="Work schedule">
            <select className={inputClass} value={profile.work_schedule} onChange={(e) => setProfile({ ...profile, work_schedule: e.target.value })}>
              <option value="wfh">Work from home</option>
              <option value="office">Office</option>
              <option value="hybrid">Hybrid</option>
              <option value="student">Student</option>
            </select>
          </Field>
          <Field label="Budget min (₹/mo)">
            <input type="number" className={inputClass} value={profile.budget_min || ""} onChange={(e) => setProfile({ ...profile, budget_min: e.target.value })} />
          </Field>
          <Field label="Budget max (₹/mo)">
            <input type="number" className={inputClass} value={profile.budget_max || ""} onChange={(e) => setProfile({ ...profile, budget_max: e.target.value })} />
          </Field>
          <Field label="Sleep schedule">
            <select className={inputClass} value={profile.sleep_schedule} onChange={(e) => setProfile({ ...profile, sleep_schedule: e.target.value })}>
              <option value="early_bird">Early bird</option>
              <option value="night_owl">Night owl</option>
              <option value="flexible">Flexible</option>
            </select>
          </Field>
          <Field label="Food preference">
            <select className={inputClass} value={profile.food_pref} onChange={(e) => setProfile({ ...profile, food_pref: e.target.value })}>
              <option value="veg">Vegetarian</option>
              <option value="non_veg">Non-vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="no_preference">No preference</option>
            </select>
          </Field>
          <Field label={`Cleanliness (${profile.cleanliness}/5)`}>
            <input type="range" min="1" max="5" className="w-full accent-brass" value={profile.cleanliness}
              onChange={(e) => setProfile({ ...profile, cleanliness: Number(e.target.value) })} />
          </Field>
          <Field label={`Social level (${profile.social_level}/5)`}>
            <input type="range" min="1" max="5" className="w-full accent-brass" value={profile.social_level}
              onChange={(e) => setProfile({ ...profile, social_level: Number(e.target.value) })} />
          </Field>
        </div>

        <div className="flex gap-6 my-4">
          <label className="flex items-center gap-2 text-sm text-ink-light">
            <input type="checkbox" checked={profile.smoking} onChange={(e) => setProfile({ ...profile, smoking: e.target.checked })} />
            Smoker
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-light">
            <input type="checkbox" checked={profile.pets} onChange={(e) => setProfile({ ...profile, pets: e.target.checked })} />
            Has pets
          </label>
        </div>

        <Field label="A little about you">
          <textarea rows={3} className={inputClass} value={profile.bio || ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        </Field>

        <button className="bg-ink text-paper px-6 py-2.5 rounded-card hover:bg-ink-light transition-colors">
          {status === "saving" ? "Saving…" : "Save profile"}
        </button>
        {status === "saved" && <span className="text-verified text-sm ml-3">Saved.</span>}
        {status === "error" && <span className="text-rust text-sm ml-3">Couldn't save — try again.</span>}
      </form>
    </div>
  );
}
