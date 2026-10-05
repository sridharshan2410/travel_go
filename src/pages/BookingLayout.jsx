import React from "react";

import {
  NavLink,
  Outlet
} from "react-router-dom";

function BookingLayout() {

  return (

    <div className="section">

      <h1>
        🧳 Travel Booking
      </h1>

      <div className="booking-steps">

        <NavLink to="/booking/dates">
          1. Dates
        </NavLink>

        <NavLink to="/booking/travelers">
          2. Travelers
        </NavLink>

        <NavLink to="/booking/summary">
          3. Summary
        </NavLink>

        <NavLink to="/booking/payment">
          4. Payment
        </NavLink>

      </div>

      <Outlet />

    </div>
  );
}

export default BookingLayout;