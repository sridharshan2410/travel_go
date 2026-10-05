import React from "react";

function TravelerCard({ traveler, travelers }) {
  return (
    <div className="traveler-card">
      <h3>👤 Traveler Information</h3>

      <div className="traveler-details">
        <p>
          <strong>Name:</strong>{" "}
          {traveler?.name || "Not provided"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {traveler?.email || "Not provided"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {traveler?.phone || "Not provided"}
        </p>

        <p>
          <strong>Number of Travelers:</strong>{" "}
          {travelers || 0}
        </p>
      </div>
    </div>
  );
}

export default TravelerCard;