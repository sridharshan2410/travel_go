import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import { addBooking } from "../services/api";

function BookingPayment() {
  const navigate = useNavigate();

  const {
    cartItems,
    traveler,
    startDate,
    endDate,
    travelers,
    total,
  } = useBookingContext();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePayment = () => {
    const newErrors = {};

    if (!cartItems || cartItems.length === 0) {
      newErrors.package = "Please select a travel package.";
    }

    if (!traveler || !traveler.name?.trim()) {
      newErrors.traveler = "Traveler information is required.";
    }

    if (!startDate || !endDate) {
      newErrors.date = "Travel dates are required.";
    } else if (endDate <= startDate) {
      newErrors.date = "Travel end date must be after the start date.";
    }

    if (!paymentMethod) {
      newErrors.payment = "Please select a payment method.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (loading || !validatePayment()) return;

    try {
      setLoading(true);
      setErrors({});

      const newBooking = {
        bookingId: "TG" + Date.now(),
        package: cartItems.map((item) => ({ ...item })),
        traveler: {
          name: traveler.name,
          email: traveler.email,
          phone: traveler.phone,
        },
        startDate,
        endDate,
        travelers: travelers || 1,
        amount: total || 0,
        paymentMethod,
        status: "Confirmed",
        bookingDate: new Date().toLocaleDateString("en-IN"),
      };

      const savedBooking = await addBooking(newBooking);

      const savedBookings = JSON.parse(
        localStorage.getItem("travelBookings") || "[]"
      );

      savedBookings.push(savedBooking);

      localStorage.setItem(
        "travelBookings",
        JSON.stringify(savedBookings)
      );

      navigate("/checkout", {
        state: { booking: savedBooking },
      });
    } catch (error) {
      console.error("Booking API Error:", error);

      setErrors({
        api: error.message || "Failed to create booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section">
      <h1>💳 Payment and Booking Confirmation</h1>

      <section
        className="traveler-form"
        aria-labelledby="booking-details-heading"
      >
        <h2 id="booking-details-heading">📋 Booking Details</h2>

        {cartItems?.length > 0 && (
          <section
            className="selected-package"
            aria-labelledby="selected-package-heading"
          >
            <h3 id="selected-package-heading">🌍 Selected Package</h3>

            {cartItems.map((item, index) => (
              <div key={item.id || item.packageId || index}>
                <p><strong>{item.name}</strong></p>
                <p>📍 {item.destination || item.name}</p>
                <p>🗓️ {item.duration} Days</p>
                <p>
                  💰 ₹{Number(item.price || 0).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </section>
        )}

        <div className="booking-info">
          <p>
            <strong>👤 Traveler:</strong>{" "}
            {traveler?.name || "Not provided"}
          </p>
          <p>
            <strong>📅 Travel Dates:</strong>{" "}
            {startDate || "-"} to {endDate || "-"}
          </p>
          <p>
            <strong>👥 Travelers:</strong> {travelers || 1}
          </p>
        </div>

        <h2>
          💰 Total Amount: ₹
          {Number(total || 0).toLocaleString("en-IN")}
        </h2>

        <div role="alert" aria-live="assertive">
          {errors.package && <p className="error">{errors.package}</p>}
          {errors.traveler && <p className="error">{errors.traveler}</p>}
          {errors.date && <p className="error">{errors.date}</p>}
          {errors.api && <p className="error">{errors.api}</p>}
        </div>

        <form onSubmit={handlePayment} aria-busy={loading}>
          <div className="form-group">
            <label htmlFor="paymentMethod">💳 Payment Method</label>

            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setErrors((previous) => ({
                  ...previous,
                  payment: "",
                }));
              }}
              required
              aria-required="true"
              aria-invalid={Boolean(errors.payment)}
              aria-describedby={
                errors.payment ? "paymentMethod-error" : "paymentMethod-help"
              }
              disabled={loading}
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cash">Pay at Travel Office</option>
            </select>

            <p id="paymentMethod-help" className="form-help">
              Choose how you intend to pay or arrange payment.
            </p>

            {errors.payment && (
              <p id="paymentMethod-error" className="error" role="alert">
                {errors.payment}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? "Processing booking..." : "Confirm Booking"}
          </button>

          <p role="status" aria-live="polite">
            {loading ? "Please wait while your booking is saved." : ""}
          </p>
        </form>
      </section>
    </main>
  );
}

export default BookingPayment;
