import React from "react";

import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import PackageList from "../components/PackageList";
import { useBookingContext } from "../context/BookingContext";

function PackagesPage() {
  const {
  searchTerm,
  setSearchTerm,
  destination,
  setDestination,
  budget,
  setBudget,
  duration,
  setDuration,
  rating,
  setRating
} = useBookingContext();

  return (
    <div className="section">

      <h1>
        🚌 Travel Packages
      </h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="packages-layout">

        <FilterPanel
          destination={destination}
          setDestination={setDestination}
          budget={budget}
          setBudget={setBudget}
          duration={duration}
          setDuration={setDuration}
          rating={rating}
          setRating={setRating}
        />

        <PackageList />

      </div>

    </div>
  );
}

export default PackagesPage;