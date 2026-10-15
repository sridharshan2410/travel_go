import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function PackageCard({ packageData }) {
  const navigate = useNavigate();
  const { addToCart } = useBookingContext();

  const handleViewPackage = () => {
    navigate(`/package/${packageData.id}`);
  };

  const handleAddToCart = () => {
    addToCart(packageData);
  };

  return (
    <div className="package-card">
      {/* Optimized Package Image */}
      <div className="package-image">
        <img
          src={packageData.image}
          alt={`${packageData.name} travel package`}
          loading="lazy"
          decoding="async"
          width="400"
          height="250"
        />
      </div>

      {/* Package Content */}
      <div className="package-content">
        <h2>{packageData.name}</h2>

        <p className="package-location">
          📍 {packageData.destination || packageData.name}
        </p>

        <div className="package-meta">
          <span>🗓️ {packageData.duration} Days</span>
          <span>⭐ {packageData.rating}</span>
        </div>

        <div className="package-price">
          ₹{Number(packageData.price).toLocaleString("en-IN")}
        </div>

        {/* Booking Actions */}
        <div className="package-actions">
          <button
            type="button"
            className="view-package-button"
            onClick={handleViewPackage}
          >
            View Package <span>→</span>
          </button>

          <button
            type="button"
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;