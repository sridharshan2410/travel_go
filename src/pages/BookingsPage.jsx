import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("travelBookings") || "[]"
    );

    setBookings(savedBookings);
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="section bookings-page">

        <h1>📋 My Bookings</h1>

        <div className="no-bookings">
          <div className="no-bookings-icon">🧳</div>

          <h2>No bookings available</h2>

          <p>
            You haven't made any travel bookings yet.
          </p>

          <Link
            to="/packages"
            className="book-package-button"
          >
            ✈️ Explore Packages
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="section bookings-page">

      <h1>📋 My Bookings</h1>

      <p className="booking-subtitle">
        Here are your confirmed travel bookings.
      </p>

      <div className="bookings-list">

        {bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking.bookingId}
          >

            {/* Header */}

            <div className="booking-card-header">

              <div>
                <h2>
                  🎉 Booking Confirmed
                </h2>

                <p className="booking-id">
                  Booking ID: {booking.bookingId}
                </p>
              </div>

              <span className="booking-status">
                ✅ Confirmed
              </span>

            </div>

            {/* Package */}

            <div className="booking-package">

              <h3>🌍 Package</h3>

              {booking.package &&
                booking.package.map((item) => (

                  <div
                    className="booking-package-item"
                    key={item.id}
                  >

                    <div className="booking-package-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>

                    <div>

                      <h2>
                        {item.name}
                      </h2>

                      <p>
                        📍{" "}
                        {item.destination ||
                          item.name}
                      </p>

                      <p>
                        🗓️ {item.duration} Days
                      </p>

                      <p>
                        ⭐ {item.rating}
                      </p>

                    </div>

                  </div>

                ))}

            </div>

            {/* Booking Information */}

            <div className="booking-details">

              <div className="booking-detail-box">

                <span>👤 Traveler</span>

                <strong>
                  {booking.traveler?.name ||
                    "Not provided"}
                </strong>

              </div>

              <div className="booking-detail-box">

                <span>📧 Email</span>

                <strong>
                  {booking.traveler?.email ||
                    "Not provided"}
                </strong>

              </div>

              <div className="booking-detail-box">

                <span>📞 Phone</span>

                <strong>
                  {booking.traveler?.phone ||
                    "Not provided"}
                </strong>

              </div>

              <div className="booking-detail-box">

                <span>👥 Travelers</span>

                <strong>
                  {booking.travelers || 1}
                </strong>

              </div>

            </div>

            {/* Travel Dates */}

            <div className="booking-dates">

              <div>

                <span>📅 Start Date</span>

                <strong>
                  {booking.startDate}
                </strong>

              </div>

              <div className="date-arrow">
                →
              </div>

              <div>

                <span>📅 End Date</span>

                <strong>
                  {booking.endDate}
                </strong>

              </div>

            </div>

            {/* Payment */}

            <div className="booking-payment">

              <div>

                <span>💳 Payment Method</span>

                <strong>
                  {booking.paymentMethod}
                </strong>

              </div>

              <div>

                <span>💰 Total Amount</span>

                <strong className="booking-amount">
                  ₹
                  {Number(
                    booking.amount || 0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

            {/* Booking Date */}

            <div className="booking-created">

              Booking created on{" "}
              {booking.bookingDate}

            </div>

          </div>

        ))}

      </div>

      <Link
        to="/packages"
        className="book-package-button"
      >
        ✈️ Book Another Package
      </Link>

    </div>
  );
}

export default BookingsPage;