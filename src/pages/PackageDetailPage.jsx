import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById } from "../services/api";
import { useBookingContext } from "../context/BookingContext";
import Loading from "../components/Loading";

function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useBookingContext();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPackage = async () => {
      try {
        setLoading(true);

        const data = await getPackageById(id);

        setPackageData(data);
        setError("");
      } catch (err) {
        setError("Package not found.");
      } finally {
        setLoading(false);
      }
    };

    loadPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="section">
        <Loading />
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="section">
        <h2>Package Not Found</h2>

        <button onClick={() => navigate("/packages")}>
          Back to Packages
        </button>
      </div>
    );
  }

  const handleBooking = () => {
    addToCart(packageData);
    navigate("/booking/dates");
  };

  return (
    <div className="section detail-page">

      <h1>{packageData.name}</h1>

      <h3>
        📍 {packageData.destination}
      </h3>

      <p>
        ⏱️ Duration: {packageData.duration} days
      </p>

      <p>
        ⭐ Rating: {packageData.rating}
      </p>

      <p>
        👥 Available: {packageData.availability}
      </p>

      <h2>
        ₹{Number(packageData.price).toLocaleString("en-IN")}
      </h2>

      <button onClick={handleBooking}>
        Book This Package
      </button>

    </div>
  );
}

export default PackageDetailPage;