import React, {
  useRef,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useBookingContext
} from "../context/BookingContext";


function HomePage() {

  const searchRef = useRef(null);

  const navigate = useNavigate();

  const {
    search,
    setSearch
  } = useBookingContext();


  useEffect(() => {

    searchRef.current?.focus();

  }, []);


  const searchPackages = () => {

    navigate("/packages");

  };


  return (

    <section
      id="home"
      className="hero"
    >

      <h1>
        Explore Your Dream Destination
      </h1>

      <p>
        Find the best travel packages
        for your next adventure.
      </p>


      <div className="hero-search">

        <input
          ref={searchRef}
          type="text"
          placeholder="Enter destination..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <button
          onClick={searchPackages}
        >
          Search
        </button>

      </div>


      <button
        onClick={() =>
          navigate("/packages")
        }
      >
        Explore Packages
      </button>

    </section>
  );
}

export default HomePage;