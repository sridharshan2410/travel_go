import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CheckoutPage() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("travelBookings") || "[]"
    );

    if (savedBookings.length > 0) {
      const latestBooking =
        savedBookings[savedBookings.length - 1];

      setBooking(latestBooking);
    }
  }, []);

  if (!booking) {
    return (
      <div className="section confirmation">

        <h1>❌ No Booking Found</h1>

        <p>
          We could not find a recent booking.
        </p>

        <Link
          to="/packages"
          className="button"
        >
          ✈️ Browse Packages
        </Link>

      </div>
    );
  }

  const packageData =
    booking.package && booking.package.length > 0
      ? booking.package[0]
      : null;

  return (
    <div className="section confirmation">

      <div className="confirmation-card">

        <div className="success-icon">
          🎉
        </div>

        <h1>
          Booking Confirmed!
        </h1>

        <p className="confirmation-message">
          Your travel booking has been successfully confirmed.
        </p>

        {/* Booking ID */}

        <div className="booking-id-box">

          <span>Booking ID</span>

          <strong>
            {booking.bookingId}
          </strong>

        </div>

        {/* Package */}

        {packageData && (
          <div className="confirmation-package">

            <h2>🌍 Travel Package</h2>

            <div className="confirmation-package-content">

              {packageData.image && (
                <img
                  src={packageData.image}
                  alt={packageData.name}
                />
              )}

              <div>

                <h2>
                  {packageData.name}
                </h2>

                <p>
                  📍{" "}
                  {packageData.destination ||
                    packageData.name}
                </p>

                <p>
                  🗓️ {packageData.duration} Days
                </p>

                <p>
                  ⭐ {packageData.rating}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Traveler */}

        <div className="confirmation-details">

          <h2>👤 Traveler Information</h2>

          <p>
            <strong>Name:</strong>{" "}
            {booking.traveler?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {booking.traveler?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {booking.traveler?.phone}
          </p>

        </div>

        {/* Travel details */}

        <div className="confirmation-details">

          <h2>📅 Travel Details</h2>

          <p>
            <strong>Start Date:</strong>{" "}
            {booking.startDate}
          </p>

          <p>
            <strong>End Date:</strong>{" "}
            {booking.endDate}
          </p>

          <p>
            <strong>Travelers:</strong>{" "}
            {booking.travelers || 1}
          </p>

        </div>

        {/* Payment */}

        <div className="confirmation-payment">

          <div>

            <span>💳 Payment Method</span>

            <strong>
              {booking.paymentMethod}
            </strong>

          </div>

          <div>

            <span>💰 Total Paid</span>

            <strong>
              ₹
              {Number(
                booking.amount || 0
              ).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

        <div className="confirmed-status">
          ✅ Payment Successful • Booking Confirmed
        </div>

        {/* Buttons */}

        <div className="confirmation-actions">

          <Link
            to="/bookings"
            className="button"
          >
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