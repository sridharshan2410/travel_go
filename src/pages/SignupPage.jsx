import React, { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function SignupPage() {

  const navigate = useNavigate();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] =
    useState({});

  const [success, setSuccess] =
    useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors({});
    setSuccess("");
  };


  const validateForm = () => {

    const newErrors = {};


    // Name
    if (!formData.name.trim()) {

      newErrors.name =
        "Full name is required.";

    } else if (
      !/^[A-Za-z ]+$/.test(
        formData.name
      )
    ) {

      newErrors.name =
        "Name should contain only letters.";

    } else if (
      formData.name.trim().length < 3
    ) {

      newErrors.name =
        "Name must contain at least 3 characters.";
    }


    // Email
    if (!formData.email.trim()) {

      newErrors.email =
        "Email is required.";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {

      newErrors.email =
        "Enter a valid email address.";
    }


    // Phone
    if (!formData.phone.trim()) {

      newErrors.phone =
        "Phone number is required.";

    } else if (
      !/^[0-9]{10}$/.test(
        formData.phone
      )
    ) {

      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }


    // Password
    if (!formData.password) {

      newErrors.password =
        "Password is required.";

    } else if (
      formData.password.length < 6
    ) {

      newErrors.password =
        "Password must contain at least 6 characters.";
    }


    // Confirm password
    if (!formData.confirmPassword) {

      newErrors.confirmPassword =
        "Please confirm your password.";

    } else if (
      formData.password !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match.";
    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    const result = signup({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password
    });


    if (!result.success) {

      setErrors({
        email: result.message
      });

      return;
    }


    setSuccess(
      "Account created successfully! Redirecting to login..."
    );


    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };


  return (

    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-header">

          <div className="signup-icon">
            ✈️
          </div>

          <h1>
            Create Your Account
          </h1>

          <p>
            Join TravelGo and start exploring
            amazing destinations.
          </p>

        </div>


        <form onSubmit={handleSubmit}>


          {/* Name */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <p className="error">
                {errors.name}
              </p>
            )}

          </div>


          {/* Email */}

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="error">
                {errors.email}
              </p>
            )}

          </div>


          {/* Phone */}

          <div className="form-group">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter 10 digit phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <p className="error">
                {errors.phone}
              </p>
            )}

          </div>


          {/* Password */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <p className="error">
                {errors.password}
              </p>
            )}

          </div>


          {/* Confirm Password */}

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {errors.confirmPassword && (
              <p className="error">
                {errors.confirmPassword}
              </p>
            )}

          </div>


          {success && (
            <p className="signup-success">
              ✓ {success}
            </p>
          )}


          <button
            type="submit"
            className="signup-button"
          >
            Create Account
          </button>

        </form>


        <div className="signup-footer">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login to TravelGo
          </Link>

        </div>

      </div>

    </div>
  );
}

export default SignupPage;