import React from "react";

function FilterPanel({
  destination,
  setDestination,
  budget,
  setBudget,
  duration,
  setDuration,
  rating,
  setRating
}) {

  const resetFilters = () => {
    setDestination("");
    setBudget("");
    setDuration("");
    setRating("");
  };

  return (
    <div className="professional-filter">

      <div className="filter-heading">

        <div>
          <span>FILTER OPTIONS</span>

          <h2>
            Find Your Perfect Trip
          </h2>
        </div>

        <button
          className="reset-filter"
          onClick={resetFilters}
        >
          ↻ Reset Filters
        </button>

      </div>


      <div className="filter-grid">

        {/* Destination */}

        <div className="filter-item">

          <label>
            📍 Destination
          </label>

          <select
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          >
            <option value="All">
              All Destinations
            </option>

            <option value="Goa">
              Goa
            </option>

            <option value="Ooty">
              Ooty
            </option>

            <option value="Kerala">
              Kerala
            </option>

            <option value="Manali">
              Manali
            </option>

            <option value="Jaipur">
              Jaipur
            </option>

            <option value="Munnar">
              Munnar
            </option>

          </select>

        </div>


        {/* Budget */}

        <div className="filter-item">

          <label>
            💰 Budget
          </label>

          <select
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
          >

            <option value="">
              Any Budget
            </option>

            <option value="10000">
              Under ₹10,000
            </option>

            <option value="15000">
              Under ₹15,000
            </option>

            <option value="20000">
              Under ₹20,000
            </option>

          </select>

        </div>


        {/* Duration */}

        <div className="filter-item">

          <label>
            🗓️ Duration
          </label>

          <select
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
          >

            <option value="">
              Any Duration
            </option>

            <option value="3">
              3 Days
            </option>

            <option value="4">
              4 Days
            </option>

            <option value="5">
              5 Days
            </option>

            <option value="6">
              6 Days
            </option>

          </select>

        </div>


        {/* Rating */}

        <div className="filter-item">

          <label>
            ⭐ Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
          >

            <option value="">
              Any Rating
            </option>

            <option value="4">
              4.0+ ⭐
            </option>

            <option value="4.5">
              4.5+ ⭐
            </option>

            <option value="4.8">
              4.8+ ⭐
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default FilterPanel;