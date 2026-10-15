
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getBookings,
  updateBooking,
  deleteBooking
} from "../services/api";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // GET bookings
  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBookings();

      setBookings(data);
    } catch (err) {
      console.error("Bookings API Error:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // PATCH booking
  const handleUpdateBooking = async (booking) => {
    try {
      setUpdatingId(booking.id);

      const updatedBooking = await updateBooking(
        booking.id,
        {
          status: "Confirmed"
        }
      );

      setBookings((currentBookings) =>
        currentBookings.map((item) =>
          item.id === booking.id
            ? updatedBooking
            : item
        )
      );

      alert("Booking updated successfully!");

    } catch (err) {
      console.error("Update Booking Error:", err);

      alert(
        "Failed to update booking. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // DELETE booking
  const handleDeleteBooking = async (booking) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel booking " +
      booking.bookingId +
      "?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(booking.id);

      await deleteBooking(booking.id);

      setBookings((currentBookings) =>
        currentBookings.filter(
          (item) => item.id !== booking.id
        )
      );

      alert("Booking cancelled successfully!");

    } catch (err) {
      console.error("Delete Booking Error:", err);

      alert(
        "Failed to cancel booking. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="section bookings-page">
        <h1>📋 My Bookings</h1>

        <div className="no-bookings">
          <div className="no-bookings-icon">
            ⏳
          </div>

          <h2>Loading bookings...</h2>

          <p>
            Please wait while we load your booking
            history.
          </p>
        </div>
      </div>
    );
  }

  // API Error
  if (error) {
    return (
      <div className="section bookings-page">
        <h1>📋 My Bookings</h1>

        <div className="no-bookings">
          <div className="no-bookings-icon">
            ⚠️
          </div>

          <h2>Unable to load bookings</h2>

          <p>{error}</p>

          <button
            className="book-package-button"
            onClick={loadBookings}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // No bookings
  if (bookings.length === 0) {
    return (
      <div className="section bookings-page">
        <h1>📋 My Bookings</h1>

        <div className="no-bookings">
          <div className="no-bookings-icon">
            🧳
          </div>

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
            key={booking.id || booking.bookingId}
          >

            {/* Header */}

            <div className="booking-card-header">

              <div>
                <h2>🎉 Booking Confirmed</h2>

                <p className="booking-id">
                  Booking ID: {booking.bookingId}
                </p>
              </div>

              <span className="booking-status">
                {booking.status === "Cancelled"
                  ? "❌ Cancelled"
                  : "✅ Confirmed"}
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

                      <h2>{item.name}</h2>

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

                <span>
                  💳 Payment Method
                </span>

                <strong>
                  {booking.paymentMethod}
                </strong>

              </div>

              <div>

                <span>
                  💰 Total Amount
                </span>

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


            {/* Action Buttons */}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                flexWrap: "wrap"
              }}
            >

              {/* UPDATE */}

              <button
                className="book-package-button"
                onClick={() =>
                  handleUpdateBooking(booking)
                }
                disabled={
                  updatingId === booking.id ||
                  deletingId === booking.id
                }
              >

                {updatingId === booking.id
                  ? "⏳ Updating..."
                  : "🔄 Update Booking"}

              </button>


              {/* DELETE */}

              <button
                className="book-package-button"
                onClick={() =>
                  handleDeleteBooking(booking)
                }
                disabled={
                  deletingId === booking.id ||
                  updatingId === booking.id
                }
                style={{
                  backgroundColor: "#dc2626"
                }}
              >

                {deletingId === booking.id
                  ? "⏳ Cancelling..."
                  : "❌ Cancel Booking"}

              </button>

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
