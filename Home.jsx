import { Link } from "react-router-dom";

const steps = [
  { n: "1", title: "Build a verified profile", body: "Tell us your budget, city, and lifestyle — sleep schedule, cleanliness, food preference." },
  { n: "2", title: "Browse real listings", body: "Filter by budget, location, room type and gender preference. No broker calls." },
  { n: "3", title: "Check your match", body: "See a compatibility score against the people already living there before you ask." },
  { n: "4", title: "Send a request", body: "The owner reviews and approves — you get a clear yes or no, not silence." },
];

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <p className="text-brass-dark text-sm mb-3">Shared housing, without the guesswork</p>
        <h1 className="font-display text-5xl leading-[1.1] text-ink max-w-2xl">
          Find your next home, and the people you'll share it with.
        </h1>
        <p className="text-ink-light mt-5 max-w-md">
          CoHaus replaces broker calls and WhatsApp groups with verified listings and a roommate
          compatibility score, so you know what you're moving into.
        </p>
        <div className="flex gap-4 mt-8">
          <Link to="/browse" className="bg-ink text-paper px-6 py-3 rounded-card hover:bg-ink-light transition-colors">
            Browse homes
          </Link>
          <Link to="/register" className="border border-ink px-6 py-3 rounded-card hover:border-brass hover:text-brass-dark transition-colors">
            List a property
          </Link>
        </div>
      </section>

      <section className="border-t border-ink/15">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-display text-2xl text-ink mb-8">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="border-l-2 border-brass pl-4">
                <span className="font-display text-3xl text-brass-dark">{s.n}</span>
                <h3 className="font-medium text-ink mt-2">{s.title}</h3>
                <p className="text-sm text-ink-faint mt-1">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
