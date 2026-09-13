import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="border-b border-ink/15">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-ink">
          CoHaus
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/browse" className="text-ink hover:text-brass-dark transition-colors">
            Browse homes
          </Link>
          {user?.role === "tenant" && (
            <Link to="/my-bookings" className="text-ink hover:text-brass-dark transition-colors">
              My requests
            </Link>
          )}
          {user?.role === "owner" && (
            <Link to="/owner" className="text-ink hover:text-brass-dark transition-colors">
              Owner dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className="text-ink hover:text-brass-dark transition-colors">
              Admin
            </Link>
          )}
          {user && (
            <Link to="/profile" className="text-ink hover:text-brass-dark transition-colors">
              Profile
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="text-ink hover:text-brass-dark transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-ink text-paper px-4 py-2 rounded-card hover:bg-ink-light transition-colors"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-ink hover:text-rust transition-colors">
              Log out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
