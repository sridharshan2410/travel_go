import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function BookingTravelers() {

  const navigate = useNavigate();

  const {
    cart,
    traveler,
    setTraveler,
    travelers,
    updateTravelers
  } = useBookingContext();


  const [errors, setErrors] = useState({});


  const validateForm = () => {

    const newErrors = {};


    // Package validation

    if (!cart || cart.length === 0) {

      newErrors.package =
        "Please select at least one travel package";

    }


    // Name validation

    if (!traveler.name.trim()) {

      newErrors.name =
        "Traveler name is required";

    }
    else if (!/^[A-Za-z ]+$/.test(traveler.name)) {

      newErrors.name =
        "Name should contain only letters";

    }
    else if (traveler.name.trim().length < 3) {

      newErrors.name =
        "Name must contain at least 3 characters";

    }


    // Email validation

    if (!traveler.email.trim()) {

      newErrors.email =
        "Email is required";

    }
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        traveler.email
      )
    ) {

      newErrors.email =
       "Enter a valid email address";

    }


    // Phone validation

    if (!traveler.phone.trim()) {

      newErrors.phone =
        "Phone number is required";

    }
    else if (!/^[0-9]{10}$/.test(traveler.phone)) {

      newErrors.phone =
        "Phone number must contain exactly 10 digits";

    }


    // Travelers validation

    if (!travelers) {

      newErrors.travelers =
        "Number of travelers is required";

    }
    else if (
      travelers < 1 ||
      travelers > 20
    ) {

      newErrors.travelers =
        "Travelers must be between 1 and 20";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  const handleSubmit = (e) => {

    e.preventDefault();


    if (!validateForm()) {

      return;

    }


    navigate("/booking/summary");

  };


  return (

    <div className="section">

      <h1>👤 Traveler Information</h1>


      {errors.package && (

        <p className="error">
          {errors.package}
        </p>

      )}


      <form
        className="traveler-form"
        onSubmit={handleSubmit}
      >


        {/* NAME */}

        <div className="form-group">

          <label>
            Traveler Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={traveler.name}
            onChange={(e) =>
              setTraveler({
                ...traveler,
                name: e.target.value
              })
            }
          />

          {errors.name && (

            <p className="error">
              {errors.name}
            </p>

          )}

        </div>


        {/* EMAIL */}

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={traveler.email}
            onChange={(e) =>
              setTraveler({
                ...traveler,
                email: e.target.value
              })
            }
          />

          {errors.email && (

            <p className="error">
              {errors.email}
            </p>

          )}

        </div>


        {/* PHONE */}

        <div className="form-group">

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter 10 digit phone number"
            value={traveler.phone}
            onChange={(e) =>
              setTraveler({
                ...traveler,
                phone: e.target.value
              })
            }
          />

          {errors.phone && (

            <p className="error">
              {errors.phone}
            </p>

          )}

        </div>


        {/* NUMBER OF TRAVELERS */}

        <div className="form-group">

          <label>
            Number of Travelers
          </label>

          <input
            type="number"
            min="1"
            max="20"
            value={travelers}
            onChange={(e) =>
              updateTravelers(e.target.value)
            }
          />

          {errors.travelers && (

            <p className="error">
              {errors.travelers}
            </p>

          )}

        </div>


        {/* SUBMIT */}

        <button
          type="submit"
          className="login-button"
        >
          Continue to Summary →
        </button>


      </form>

    </div>

  );

}


export default BookingTravelers;