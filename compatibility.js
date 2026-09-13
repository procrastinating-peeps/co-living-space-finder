// Computes a 0-100 compatibility score between two lifestyle profiles.
// Weighted by how much each attribute tends to matter for shared-living harmony.

const WEIGHTS = {
  sleep_schedule: 20,
  cleanliness: 20,
  social_level: 15,
  smoking: 15,
  pets: 10,
  food_pref: 10,
  work_schedule: 10,
};

const TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);

function scaledMatch(a, b, max) {
  // Returns 1.0 for identical values, decaying linearly with distance.
  if (a == null || b == null) return 0.5; // unknown -> neutral
  const distance = Math.abs(a - b);
  return Math.max(0, 1 - distance / max);
}

function compatibilityScore(profileA, profileB) {
  if (!profileA || !profileB) return null;
  let earned = 0;

  earned +=
    WEIGHTS.sleep_schedule *
    (profileA.sleep_schedule && profileA.sleep_schedule === profileB.sleep_schedule
      ? 1
      : profileA.sleep_schedule === "flexible" || profileB.sleep_schedule === "flexible"
      ? 0.6
      : 0.2);

  earned += WEIGHTS.cleanliness * scaledMatch(profileA.cleanliness, profileB.cleanliness, 4);
  earned += WEIGHTS.social_level * scaledMatch(profileA.social_level, profileB.social_level, 4);

  earned += WEIGHTS.smoking * (Boolean(profileA.smoking) === Boolean(profileB.smoking) ? 1 : 0.1);
  earned += WEIGHTS.pets * (Boolean(profileA.pets) === Boolean(profileB.pets) ? 1 : 0.4);

  earned +=
    WEIGHTS.food_pref *
    (profileA.food_pref && profileA.food_pref === profileB.food_pref
      ? 1
      : profileA.food_pref === "no_preference" || profileB.food_pref === "no_preference"
      ? 0.7
      : 0.3);

  earned +=
    WEIGHTS.work_schedule *
    (profileA.work_schedule && profileA.work_schedule === profileB.work_schedule ? 1 : 0.5);

  return Math.round((earned / TOTAL_WEIGHT) * 100);
}

// Average compatibility of a candidate against every current tenant profile in a property.
function averageCompatibility(candidateProfile, tenantProfiles) {
  const scored = tenantProfiles
    .map((p) => compatibilityScore(candidateProfile, p))
    .filter((s) => s !== null);
  if (scored.length === 0) return null;
  return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
}

module.exports = { compatibilityScore, averageCompatibility };
