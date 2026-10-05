import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { cartItems } = useBookingContext();

  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">

      <h2>🗺️🚘🛣️ TravelGo</h2>

      <nav>

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/packages">
          Packages
        </NavLink>

        <NavLink to="/cart">
          Cart ({cartItems.length})
        </NavLink>

        <NavLink to="/booking/dates">
          Booking
        </NavLink>

        <NavLink to="/bookings">
          My Bookings
        </NavLink>

        {!isAuthenticated ? (
          <NavLink to="/login">
            Login
          </NavLink>
        ) : (
          <>
            <span className="welcome-user">
              👤 Welcome
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </nav>

    </header>
  );
}

export default Header;