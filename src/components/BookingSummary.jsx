
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import TravelerCard from "./TravelerCard";

function formatDate(dateString) {
  if (!dateString) return "Not selected";

  // Avoid timezone shifts when displaying YYYY-MM-DD.
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function BookingSummary() {
  const navigate = useNavigate();

  const {
    cartItems,
    traveler,
    travelers,
    startDate,
    endDate,
    subtotal,
    tax,
    total
  } = useBookingContext();

  const hasPackage = Array.isArray(cartItems) && cartItems.length > 0;

  const handleContinue = () => {
    if (!hasPackage) {
      alert("Please select a travel package.");
      navigate("/packages");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select your travel dates.");
      navigate("/booking/dates");
      return;
    }

    if (!traveler?.name?.trim() ||
        !traveler?.email?.trim() ||
        !traveler?.phone?.trim()) {
      alert("Please complete traveler information.");
      navigate("/booking/travelers");
      return;
    }

    navigate("/booking/payment");
  };

  const calculatedDuration =
    startDate && endDate
      ? Math.round(
          (new Date(`${endDate}T12:00:00`) -
            new Date(`${startDate}T12:00:00`)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="section">
      <h1>📋 Booking Summary</h1>

      {/* Selected Package */}
      <div className="summary-card">
        <h2>🌍 Selected Package</h2>

        {hasPackage ? (
          cartItems.map((item) => (
            <div className="summary-package" key={item.id}>
              <h3>{item.name}</h3>

              <p>
                <strong>Destination:</strong>{" "}
                {item.destination || "Not specified"}
              </p>

              <p>
                <strong>Package Duration:</strong>{" "}
                {item.duration ?? "Not specified"}{" "}
                {item.duration ? "Days" : ""}
              </p>

              <p>
                <strong>Quantity:</strong> {item.quantity ?? 1}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₹{Number(item.price || 0).toLocaleString("en-IN")}
              </p>
            </div>
          ))
        ) : (
          <div>
            <p className="error">No package selected.</p>
            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/packages")}
            >
              Select a Package
            </button>
          </div>
        )}
      </div>

      {/* Travel Dates */}
      <div className="summary-card">
        <h2>📅 Travel Details</h2>

        <p>
          <strong>Start Date:</strong> {formatDate(startDate)}
        </p>

        <p>
          <strong>End Date:</strong> {formatDate(endDate)}
        </p>

        <p>
          <strong>Trip Duration:</strong> {calculatedDuration} day(s)
        </p>

        <p>
          <strong>Number of Travelers:</strong> {travelers || 1}
        </p>
      </div>

      {/* Traveler Information */}
      <div className="summary-card">
        <h2>👤 Traveler Information</h2>
        <TravelerCard
          traveler={traveler}
          travelers={travelers || 1}
        />
      </div>

      {/* Price Summary */}
      <div className="summary-card">
        <h2>💰 Price Summary</h2>

        <div className="price-row">
          <span>Package Cost</span>
          <span>
            ₹{Number(subtotal || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="price-row">
          <span>Taxes (18%)</span>
          <span>
            ₹{Number(tax || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <hr />

        <div className="price-row total-row">
          <strong>Total Amount</strong>
          <strong>
            ₹{Number(total || 0).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      {/* Actions */}
      <div className="summary-actions">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/booking/travelers")}
        >
          ← Back
        </button>

        <button
          type="button"
          className="login-button"
          onClick={handleContinue}
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;