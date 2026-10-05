import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function BookingPayment() {
  const navigate = useNavigate();

  const {
    cart,
    traveler,
    startDate,
    endDate,
    travelers,
    finalAmount
  } = useBookingContext();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  const validatePayment = () => {
    const newErrors = {};

    if (!cart || cart.length === 0) {
      newErrors.package = "Please select a travel package.";
    }

    if (!traveler.name.trim()) {
      newErrors.traveler = "Traveler information is required.";
    }

    if (!startDate || !endDate) {
      newErrors.date = "Travel dates are required.";
    }

    if (!paymentMethod) {
      newErrors.payment = "Please select a payment method.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!validatePayment()) {
      return;
    }

    // Get existing bookings
    const existingBookings = JSON.parse(
      localStorage.getItem("travelBookings") || "[]"
    );

    // Create new booking
    const newBooking = {
      bookingId: "TG" + Date.now(),

      package: cart,

      traveler: {
        name: traveler.name,
        email: traveler.email,
        phone: traveler.phone
      },

      startDate: startDate,
      endDate: endDate,

      travelers: travelers || 1,

      amount: finalAmount || 0,

      paymentMethod: paymentMethod,

      status: "Confirmed",

      bookingDate: new Date().toLocaleDateString("en-IN")
    };

    // Save booking
    existingBookings.push(newBooking);

    localStorage.setItem(
      "travelBookings",
      JSON.stringify(existingBookings)
    );

    // Go to checkout / confirmation page
    navigate("/checkout");
  };

  return (
    <div className="section">

      <h1>💳 Payment</h1>

      <div className="traveler-form">

        <h2>📋 Booking Details</h2>

        {cart && cart.length > 0 && (
          <div className="selected-package">

            <h3>🌍 Selected Package</h3>

            {cart.map((item) => (
              <div key={item.id}>
                <p>
                  <strong>{item.name}</strong>
                </p>

                <p>
                  📍 {item.destination || item.name}
                </p>

                <p>
                  🗓️ {item.duration} Days
                </p>

                <p>
                  💰 ₹
                  {Number(item.price).toLocaleString("en-IN")}
                </p>
              </div>
            ))}

          </div>
        )}

        <div className="booking-info">

          <p>
            <strong>👤 Traveler:</strong>{" "}
            {traveler.name || "Not provided"}
          </p>

          <p>
            <strong>📅 Travel Dates:</strong>{" "}
            {startDate || "-"} to {endDate || "-"}
          </p>

          <p>
            <strong>👥 Travelers:</strong>{" "}
            {travelers || 1}
          </p>

        </div>

        <h2>
          💰 Total Amount: ₹
          {Number(finalAmount || 0).toLocaleString("en-IN")}
        </h2>

        {/* Validation Errors */}

        {errors.package && (
          <p className="error">
            {errors.package}
          </p>
        )}

        {errors.traveler && (
          <p className="error">
            {errors.traveler}
          </p>
        )}

        {errors.date && (
          <p className="error">
            {errors.date}
          </p>
        )}

        <form onSubmit={handlePayment}>

          <div className="form-group">

            <label>
              💳 Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >

              <option value="">
                Select Payment Method
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Credit / Debit Card
              </option>

              <option value="Net Banking">
                Net Banking
              </option>

              <option value="Cash">
                Pay at Travel Office
              </option>

            </select>

            {errors.payment && (
              <p className="error">
                {errors.payment}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="login-button"
          >
            ✅ Confirm Payment
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookingPayment;