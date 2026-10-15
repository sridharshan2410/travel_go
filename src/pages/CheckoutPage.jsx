import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function CheckoutPage() {
  const [booking, setBooking] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Use the exact booking passed from the payment page
    if (location.state?.booking) {
      setBooking(location.state.booking);
      return;
    }

    // Fallback to the most recently saved booking
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("travelBookings") || "[]"
      );

      if (Array.isArray(savedBookings) && savedBookings.length > 0) {
        setBooking(savedBookings[savedBookings.length - 1]);
      } else {
        setBooking(null);
      }
    } catch (error) {
      console.error("Unable to read saved booking:", error);
      setBooking(null);
    }
  }, [location.state]);

  // Prevent accessing booking properties while booking is null
  if (!booking) {
    return (
      <div className="section confirmation">
        <div className="confirmation-card">
          <h1>❌ No Booking Found</h1>
          <p>
            Booking details are not available. Please check My Bookings
            or make a new booking.
          </p>

          <div className="confirmation-actions">
            <Link to="/bookings" className="button">
              📋 View My Bookings
            </Link>

            <Link to="/packages" className="button secondary-button">
              ✈️ Browse Packages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Support both a single package object and an array of packages
  const packageData = Array.isArray(booking.package)
    ? booking.package
    : booking.package
      ? [booking.package]
      : [];

  return (
    <div className="section confirmation">
      <div className="confirmation-card">
        <div className="success-icon">🎉</div>

        <h1>Booking Confirmed!</h1>

        <p className="confirmation-message">
          Your travel booking has been successfully confirmed.
        </p>

        <div className="booking-id-box">
          <span>Booking ID</span>
          <strong>{booking.bookingId || booking.id || "—"}</strong>
        </div>

        {/* Selected Travel Packages */}
        <div className="confirmation-package">
          <h2>🌍 Travel Package</h2>

          {packageData.length > 0 ? (
            packageData.map((pkg, index) => (
              <div
                className="confirmation-package-content"
                key={pkg.id || pkg.packageId || index}
              >
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={
                      pkg.name ||
                      pkg.destination ||
                      "Travel package"
                    }
                  />
                )}

                <div>
                  <h2>
                    {pkg.name ||
                      pkg.packageName ||
                      pkg.destination ||
                      "Travel Package"}
                  </h2>

                  <p>
                    📍{" "}
                    {pkg.destination ||
                      pkg.name ||
                      pkg.packageName ||
                      "Destination not available"}
                  </p>

                  <p>
                    🗓️ {pkg.duration ?? pkg.days ?? "—"} Days
                  </p>

                  {pkg.rating != null && (
                    <p>⭐ {pkg.rating}</p>
                  )}

                  {pkg.price != null && (
                    <p>
                      💰 Package Price: ₹
                      {Number(pkg.price).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Travel package details are unavailable.</p>
          )}
        </div>

        {/* Traveler Information */}
        <div className="confirmation-details">
          <h2>👤 Traveler Information</h2>

          <p>
            <strong>Name:</strong>{" "}
            {booking.traveler?.name || "—"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {booking.traveler?.email || "—"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {booking.traveler?.phone || "—"}
          </p>
        </div>

        {/* Travel Details */}
        <div className="confirmation-details">
          <h2>📅 Travel Details</h2>

          <p>
            <strong>Start Date:</strong>{" "}
            {booking.startDate || "—"}
          </p>

          <p>
            <strong>End Date:</strong>{" "}
            {booking.endDate || "—"}
          </p>

          <p>
            <strong>Travelers:</strong>{" "}
            {booking.travelers || 1}
          </p>
        </div>

        {/* Payment Information */}
        <div className="confirmation-payment">
          <div>
            <span>💳 Payment Method</span>
            <strong>{booking.paymentMethod || "—"}</strong>
          </div>

          <div>
            <span>💰 Total Paid</span>
            <strong>
              ₹
              {Number(
                booking.amount ?? booking.total ?? 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="confirmed-status">
          ✅ Payment Successful • Booking Confirmed
        </div>

        {/* Navigation Buttons */}
        <div className="confirmation-actions">
          <Link to="/bookings" className="button">
            📋 View My Bookings
          </Link>

          <Link
            to="/packages"
            className="button secondary-button"
          >
            ✈️ Explore More Packages
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;