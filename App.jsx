import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Browse from "./Browse.jsx";
import PropertyDetail from "./PropertyDetail.jsx";
import Profile from "./Profile.jsx";
import MyBookings from "./MyBookings.jsx";
import OwnerDashboard from "./OwnerDashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute roles={["tenant"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner"
            element={
              <ProtectedRoute roles={["owner"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
