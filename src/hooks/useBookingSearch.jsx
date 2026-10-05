import { useEffect, useMemo, useState } from "react";
import { getPackages } from "../services/api";

function useBookingSearch() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const loadPackages = async () => {
    try {
      setLoading(true);

      const data = await getPackages();

      // 5 seconds loading delay
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      setPackages(data);
      setError("");
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load travel packages.");
    } finally {
      setLoading(false);
    }
  };

  loadPackages();
}, []);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const searchMatch =
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());

      const destinationMatch =
        !destination || pkg.destination === destination;

      const budgetMatch =
        !budget || pkg.price <= Number(budget);

      const durationMatch =
        !duration || pkg.duration <= Number(duration);

      const ratingMatch =
        !rating || pkg.rating >= Number(rating);

      return (
        searchMatch &&
        destinationMatch &&
        budgetMatch &&
        durationMatch &&
        ratingMatch
      );
    });
  }, [
    packages,
    searchTerm,
    destination,
    budget,
    duration,
    rating
  ]);

  return {
    packages,
    filteredPackages,
    searchTerm,
    setSearchTerm,
    destination,
    setDestination,
    budget,
    setBudget,
    duration,
    setDuration,
    rating,
    setRating,
    loading,
    error
  };
}

export default useBookingSearch;