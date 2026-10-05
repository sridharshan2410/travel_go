import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function BookingDates() {
  const navigate = useNavigate();

  const {
    cart,
    startDate,
    endDate,
    updateTravelDates
  } = useBookingContext();

  const [errors, setErrors] = useState({});

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  const validateDates = () => {
    const newErrors = {};

    if (!cart || cart.length === 0) {
      newErrors.package =
        "Please select a travel package first.";
    }

    if (!startDate) {
      newErrors.startDate =
        "Travel start date is required.";
    } else if (startDate < today) {
      newErrors.startDate =
        "Start date cannot be in the past.";
    }

    if (!endDate) {
      newErrors.endDate =
        "Travel end date is required.";
    } else if (endDate < today) {
      newErrors.endDate =
        "End date cannot be in the past.";
    }

    if (
      startDate &&
      endDate &&
      endDate <= startDate
    ) {
      newErrors.endDate =
        "End date must be after the start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    navigate("/booking/travelers");
  };

  return (
    <div className="section">
      <h1>📅 Select Travel Dates</h1>

      {errors.package && (
        <p className="error">{errors.package}</p>
      )}

      {cart && cart.length > 0 && (
        <div className="selected-package">
          <h3>Selected Package</h3>

          {cart.map((item) => (
            <p key={item.id}>
              🌍 {item.name}
            </p>
          ))}
        </div>
      )}

      <form
        className="traveler-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Travel Start Date</label>

          <input
            type="date"
            value={startDate || ""}
            min={today}
            onChange={(e) =>
              updateTravelDates(
                e.target.value,
                endDate
              )
            }
          />

          {errors.startDate && (
            <p className="error">
              {errors.startDate}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Travel End Date</label>

          <input
            type="date"
            value={endDate || ""}
            min={startDate || today}
            onChange={(e) =>
              updateTravelDates(
                startDate,
                e.target.value
              )
            }
          />

          {errors.endDate && (
            <p className="error">
              {errors.endDate}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="login-button"
        >
          Continue to Traveler Details →
        </button>
      </form>
    </div>
  );
}

export default BookingDates;