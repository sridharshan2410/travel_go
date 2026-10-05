import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});


  const validateForm = () => {

    const newErrors = {};


    if (!username.trim()) {

      newErrors.username =
        "Email or username is required.";

    } else if (
      username.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        username
      )
    ) {

      newErrors.username =
        "Enter a valid email address.";
    }


    if (!password) {

      newErrors.password =
        "Password is required.";

    } else if (
      password.length < 6
    ) {

      newErrors.password =
        "Password must contain at least 6 characters.";
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


    const success =
      login(username.trim(), password);


    if (!success) {

      setErrors({
        login:
          "Invalid email/username or password. Please signup first."
      });

      return;
    }


    const requestedPage =
      location.state?.from || "/";

    navigate(
      requestedPage,
      { replace: true }
    );
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🌍
        </div>

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to continue your journey
          with TravelGo.
        </p>


        {errors.login && (
          <div className="login-error">
            {errors.login}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Email / Username
            </label>

            <input
              type="text"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            {errors.username && (
              <p className="error">
                {errors.username}
              </p>
            )}

          </div>


          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {errors.password && (
              <p className="error">
                {errors.password}
              </p>
            )}

          </div>


          <button
            type="submit"
            className="login-button"
          >
            Login to TravelGo
          </button>

        </form>


        <div className="signup-link">

          <span>
            New to TravelGo?
          </span>

          <Link to="/signup">
            Create an Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;