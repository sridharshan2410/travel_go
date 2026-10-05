import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function CartPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    total
  } = useBookingContext();


  const handleBooking = () => {
    if (!cartItems || cartItems.length === 0) {
      return;
    }

    navigate("/booking/dates");
  };


  return (
    <div className="cart-page">

      {/* PAGE HEADER */}

      <div className="cart-header">

        <div>

          <span className="cart-label">
            TRAVELGO
          </span>

          <h1>
            🛒 Your Travel Cart
          </h1>

          <p>
            Review your selected travel packages
            before continuing your booking.
          </p>

        </div>


        {cartItems.length > 0 && (
          <div className="cart-count">

            {cartItems.length} Package
            {cartItems.length > 1 ? "s" : ""}

          </div>
        )}

      </div>


      {/* EMPTY CART */}

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🧳
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            You haven't selected any travel
            packages yet.
          </p>

          <button
            className="browse-packages-button"
            onClick={() => navigate("/packages")}
          >
            Explore Packages
          </button>

        </div>

      ) : (

        <div className="cart-layout">


          {/* CART ITEMS */}

          <div className="cart-items">

            <div className="cart-section-title">

              <h2>
                Selected Packages
              </h2>

              <button
                className="clear-cart-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>

            </div>


            {cartItems.map((item) => (

              <div
                className="travel-cart-card"
                key={item.id}
              >

                {/* IMAGE */}

                <div className="cart-image">

                  <img
                    src={
                      item.image ||
                      "/images/goa.jpg"
                    }
                    alt={item.name}
                  />

                  <span className="cart-badge">
                    Selected
                  </span>

                </div>


                {/* DETAILS */}

                <div className="cart-details">

                  <div className="cart-title-row">

                    <div>

                      <h2>
                        {item.name}
                      </h2>

                      <p className="cart-destination">
                        📍{" "}
                        {item.destination ||
                          item.name}
                      </p>

                    </div>

                  </div>


                  {/* PACKAGE INFORMATION */}

                  <div className="cart-info">

                    <div className="cart-info-item">

                      <span>🗓️</span>

                      <div>

                        <small>
                          Duration
                        </small>

                        <strong>
                          {item.duration} Days
                        </strong>

                      </div>

                    </div>


                    <div className="cart-info-item">

                      <span>⭐</span>

                      <div>

                        <small>
                          Rating
                        </small>

                        <strong>
                          {item.rating || "4.5"}
                        </strong>

                      </div>

                    </div>


                    {/* QUANTITY */}

                    <div className="cart-info-item">

                      <span>👥</span>

                      <div>

                        <small>
                          Quantity
                        </small>

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                          >
                            −
                          </button>

                          <strong>
                            {item.quantity}
                          </strong>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* PRICE */}

                  <div className="cart-bottom">

                    <div className="cart-price">

                      <small>
                        Package Price
                      </small>

                      <strong>
                        ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>


                    <div className="cart-item-total">

                      <small>
                        Item Total
                      </small>

                      <strong>
                        ₹
                        {(
                          Number(item.price || 0) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>


                    <button
                      className="remove-cart-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      🗑 Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* SUMMARY */}

          <div className="cart-summary">

            <div className="summary-top">

              <span>
                BOOKING SUMMARY
              </span>

              <h2>
                Your Trip
              </h2>

            </div>


            <div className="summary-line">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {Number(
                  subtotal
                ).toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="summary-line">

              <span>
                Tax (18%)
              </span>

              <strong>
                ₹
                {Number(
                  tax
                ).toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {Number(
                  total
                ).toLocaleString("en-IN")}
              </strong>

            </div>


            <button
              className="proceed-button"
              onClick={handleBooking}
            >
              Proceed to Booking
              <span>→</span>
            </button>


            <button
              className="continue-shopping"
              onClick={() => navigate("/packages")}
            >
              ← Continue Exploring
            </button>


            <div className="secure-note">
              🔒 Secure booking • Easy cancellation
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default CartPage;