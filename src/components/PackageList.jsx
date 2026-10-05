import React from "react";
import { useBookingContext } from "../context/BookingContext";
import PackageCard from "./PackageCard";
import Loading from "./Loading";

function PackageList() {
  const {
    filteredPackages,
    loading,
    error
  } = useBookingContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h3 className="error">{error}</h3>;
  }

  return (
    <div className="package-container">

      {filteredPackages.length === 0 ? (
        <h3>No packages found.</h3>
      ) : (
        filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            packageData={pkg}
          />
        ))
      )}

    </div>
  );
}

export default PackageList;