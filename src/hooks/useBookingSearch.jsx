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

  // Fetch packages and cancel the request when necessary
  useEffect(() => {
    const controller = new AbortController();

    const loadPackages = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPackages(controller.signal);

        if (!Array.isArray(data)) {
          throw new Error("Invalid packages data");
        }

        setPackages(data);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        console.error("API Error:", err);
        setError("Failed to load travel packages.");;
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPackages();

    return () => {
      controller.abort();
    };
  }, []);

  // Filter locally without making new API requests
  const filteredPackages = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return packages.filter((pkg) => {
      const name = String(pkg.name ?? "").toLowerCase();
      const place = String(
        pkg.destination ?? pkg.name ?? ""
      ).toLowerCase();

      const price = Number(pkg.price);
      const days = Number(pkg.duration);
      const stars = Number(pkg.rating);

      const searchMatch =
        !search ||
        name.includes(search) ||
        place.includes(search);

      const destinationMatch =
        !destination || pkg.destination === destination;

      const budgetMatch =
        !budget ||
        (Number.isFinite(price) && price <= Number(budget));

      const durationMatch =
        !duration ||
        (Number.isFinite(days) && days <= Number(duration));

      const ratingMatch =
        !rating ||
        (Number.isFinite(stars) && stars >= Number(rating));

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