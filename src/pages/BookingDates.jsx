import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function BookingDates() {
  const navigate = useNavigate();

  const {
    cartItems,
    startDate,
    endDate,
    updateTravelDates,
  } = useBookingContext();

  const [errors, setErrors] = useState({});

  const today = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  })();

  const handleStartDateChange = (value) => {
    const updatedEndDate =
      endDate && endDate > value ? endDate : "";

    updateTravelDates(value, updatedEndDate);
    setErrors({});
  };

  const handleEndDateChange = (value) => {
    updateTravelDates(startDate, value);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!cartItems || cartItems.length === 0) {
      newErrors.package = "Please select a travel package first.";
    }

    if (!startDate) {
      newErrors.startDate = "Please select your travel start date.";
    } else if (startDate < today) {
      newErrors.startDate = "Start date cannot be in the past.";
    }

    if (!endDate) {
      newErrors.endDate = "Please select your travel end date.";
    } else if (endDate <= today) {
      newErrors.endDate = "End date must be in the future.";
    }

    if (startDate && endDate && endDate <= startDate) {
      newErrors.endDate = "End date must be after the start date.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    navigate("/booking/travelers");
  };

  return (
    <main className="section">
      <h1 tabIndex="-1">📅 Select Travel Dates</h1>

      <div role="alert" aria-live="assertive">
        {errors.package && (
          <p className="error">{errors.package}</p>
        )}
      </div>

      {cartItems && cartItems.length > 0 && (
        <section
          className="selected-package"
          aria-labelledby="selected-package-heading"
        >
          <h2 id="selected-package-heading">Selected Package</h2>

          {cartItems.map((item) => (
            <p key={item.id}>🌍 {item.name}</p>
          ))}
        </section>
      )}

      <form
        className="traveler-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="startDate">Travel Start Date</label>

          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate || ""}
            min={today}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.startDate)}
            aria-describedby={
              errors.startDate ? "startDate-error" : "startDate-help"
            }
            onChange={(e) => handleStartDateChange(e.target.value)}
          />

          <p id="startDate-help" className="form-help">
            Choose today or a future date.
          </p>

          {errors.startDate && (
            <p id="startDate-error" className="error" role="alert">
              {errors.startDate}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">Travel End Date</label>

          <input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate || ""}
            min={startDate || today}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.endDate)}
            aria-describedby={
              errors.endDate ? "endDate-error" : "endDate-help"
            }
            onChange={(e) => handleEndDateChange(e.target.value)}
          />

          <p id="endDate-help" className="form-help">
            Choose a date after your start date.
          </p>

          {errors.endDate && (
            <p id="endDate-error" className="error" role="alert">
              {errors.endDate}
            </p>
          )}
        </div>

        <button type="submit" className="login-button">
          Continue to Traveler Details →
        </button>
      </form>
    </main>
  );
}

export default BookingDates;
