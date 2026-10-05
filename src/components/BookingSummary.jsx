import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import TravelerCard from "../components/TravelerCard";

function BookingSummary() {
  const navigate = useNavigate();

  const {
    cartItems,
    traveler,

    // Booking details
    travelers,
    startDate,
    endDate,
    tripDuration,

    // Redux cart values
    subtotal,
    tax,
    total
  } = useBookingContext();

  const handleContinue = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Please select a travel package.");
      navigate("/packages");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select your travel dates.");
      navigate("/booking/dates");
      return;
    }

    if (!traveler || !traveler.name) {
      alert("Please enter traveler information.");
      navigate("/booking/travelers");
      return;
    }

    navigate("/booking/payment");
  };

  return (
    <div className="section">

      <h1>📋 Booking Summary</h1>


      {/* Package Information */}

      <div className="summary-card">

        <h2>🌍 Selected Package</h2>

        {cartItems && cartItems.length > 0 ? (

          cartItems.map((item) => (

            <div
              className="summary-package"
              key={item.id}
            >

              <h3>
                {item.name}
              </h3>

              <p>
                <strong>
                  Destination:
                </strong>{" "}
                {item.destination}
              </p>

              <p>
                <strong>
                  Duration:
                </strong>{" "}
                {item.duration} Days
              </p>

              <p>
                <strong>
                  Quantity:
                </strong>{" "}
                {item.quantity}
              </p>

              <p>
                <strong>
                  Price:
                </strong>{" "}
                ₹
                {Number(
                  item.price
                ).toLocaleString("en-IN")}
              </p>

            </div>

          ))

        ) : (

          <p className="error">
            No package selected.
          </p>

        )}

      </div>


      {/* Travel Dates */}

      <div className="summary-card">

        <h2>📅 Travel Details</h2>

        <p>
          <strong>
            Start Date:
          </strong>{" "}
          {startDate || "Not selected"}
        </p>

        <p>
          <strong>
            End Date:
          </strong>{" "}
          {endDate || "Not selected"}
        </p>

        <p>
          <strong>
            Trip Duration:
          </strong>{" "}
          {tripDuration || 0} day(s)
        </p>

        <p>
          <strong>
            Number of Travelers:
          </strong>{" "}
          {travelers || 0}
        </p>

      </div>


      {/* Traveler Information */}

      <TravelerCard
        traveler={traveler}
        travelers={travelers}
      />


      {/* Price Summary */}

      <div className="summary-card">

        <h2>💰 Price Summary</h2>

        <div className="price-row">

          <span>
            Package Cost
          </span>

          <span>
            ₹
            {Number(
              subtotal
            ).toLocaleString("en-IN")}
          </span>

        </div>


        <div className="price-row">

          <span>
            Taxes (18%)
          </span>

          <span>
            ₹
            {Number(
              tax
            ).toLocaleString("en-IN")}
          </span>

        </div>


        <hr />


        <div className="price-row total-row">

          <strong>
            Total Amount
          </strong>

          <strong>
            ₹
            {Number(
              total
            ).toLocaleString("en-IN")}
          </strong>

        </div>

      </div>


      {/* Continue Button */}

      <div className="summary-actions">

        <button
          className="back-button"
          onClick={() =>
            navigate("/booking/travelers")
          }
        >
          ← Back
        </button>


        <button
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