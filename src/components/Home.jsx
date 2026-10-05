import React from "react";
import { Link } from "react-router-dom";

function HomePage() {

  return (

    <div className="home-page">

      <div className="hero">

        <h1>
          Explore the World 🌍
        </h1>

        <p>
          Discover amazing destinations
          and book your dream vacation.
        </p>

        <Link
          to="/packages"
          className="button"
        >
          Explore Packages
        </Link>

      </div>

      <div className="section">

        <h2>
          Why Choose TravelGo?
        </h2>

        <div className="features">

          <div>
            <h3>🌍 Best Destinations</h3>
            <p>
              Explore beautiful destinations.
            </p>
          </div>

          <div>
            <h3>💰 Affordable Prices</h3>
            <p>
              Packages at affordable prices.
            </p>
          </div>

          <div>
            <h3>🔒 Secure Booking</h3>
            <p>
              Safe and simple booking.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default HomePage;