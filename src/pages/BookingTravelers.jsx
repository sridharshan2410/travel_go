import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";

function BookingTravelers() {
  const navigate = useNavigate();

  const {
    cartItems,
    traveler,
    setTraveler,
    travelers,
    updateTravelers,
  } = useBookingContext();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!cartItems || cartItems.length === 0) {
      newErrors.package = "Please select at least one travel package.";
    }

    const name = (traveler.name || "").trim();
    const email = (traveler.email || "").trim();
    const phone = (traveler.phone || "").trim();

    if (!name) {
      newErrors.name = "Traveler name is required.";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name = "Name should contain only letters and spaces.";
    } else if (name.length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    const travelerCount = Number(travelers);

    if (
      travelers === "" ||
      travelers === null ||
      travelers === undefined ||
      !Number.isInteger(travelerCount)
    ) {
      newErrors.travelers = "Enter a valid number of travelers.";
    } else if (travelerCount < 1 || travelerCount > 20) {
      newErrors.travelers = "Travelers must be between 1 and 20.";
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

  const updateTravelerField = (field, value) => {
    setTraveler({
      ...traveler,
      [field]: value,
    });

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  return (
    <main className="section">
      <h1>👤 Traveler Information</h1>

      <div role="alert" aria-live="assertive">
        {errors.package && <p className="error">{errors.package}</p>}
      </div>

      {cartItems && cartItems.length > 0 && (
        <section
          className="selected-package"
          aria-labelledby="selected-package-heading"
        >
          <h2 id="selected-package-heading">Selected Travel Package</h2>

          {cartItems.map((item) => (
            <p key={item.id}>🌍 {item.name}</p>
          ))}
        </section>
      )}

      <form
        className="traveler-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="travelerName">Traveler Name</label>

          <input
            id="travelerName"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={traveler.name || ""}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "travelerName-error" : undefined}
            onChange={(e) => updateTravelerField("name", e.target.value)}
          />

          {errors.name && (
            <p id="travelerName-error" className="error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="travelerEmail">Email</label>

          <input
            id="travelerEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={traveler.email || ""}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "travelerEmail-error" : undefined}
            onChange={(e) => updateTravelerField("email", e.target.value)}
          />

          {errors.email && (
            <p id="travelerEmail-error" className="error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="travelerPhone">Phone Number</label>

          <input
            id="travelerPhone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            placeholder="Enter 10 digit phone number"
            value={traveler.phone || ""}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "travelerPhone-error" : "travelerPhone-help"}
            onChange={(e) =>
              updateTravelerField(
                "phone",
                e.target.value.replace(/\D/g, "").slice(0, 10)
              )
            }
          />

          <p id="travelerPhone-help" className="form-help">
            Enter a 10-digit phone number.
          </p>

          {errors.phone && (
            <p id="travelerPhone-error" className="error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="travelers">Number of Travelers</label>

          <input
            id="travelers"
            name="travelers"
            type="number"
            min="1"
            max="20"
            step="1"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.travelers)}
            aria-describedby={errors.travelers ? "travelers-error" : "travelers-help"}
            value={travelers ?? 1}
            onChange={(e) =>
              updateTravelers(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          <p id="travelers-help" className="form-help">
            Choose between 1 and 20 travelers.
          </p>

          {errors.travelers && (
            <p id="travelers-error" className="error" role="alert">
              {errors.travelers}
            </p>
          )}
        </div>

        <button type="submit" className="login-button">
          Continue to Summary →
        </button>
      </form>
    </main>
  );
}

export default BookingTravelers;