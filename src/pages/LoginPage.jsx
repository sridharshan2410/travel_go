
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate login form
  const validateForm = () => {
    const newErrors = {};
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      newErrors.username = "Email or username is required.";
    } else if (
      trimmedUsername.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedUsername)
    ) {
      newErrors.username = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const success = await login(username.trim(), password);

      if (!success) {
        setErrors({
          login: "Invalid email/username or password. Please check your details or sign up first.",
        });
        return;
      }

      const requestedPage = location.state?.from || "/";
      navigate(requestedPage, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        login: "Unable to log in. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🌍</div>

        <h1>Welcome Back</h1>

        <p>
          Login to continue your journey with TravelGo.
        </p>

        {errors.login && (
          <div className="login-error" role="alert">
            {errors.login}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Email / Username</label>

            <input
              id="username"
              type="text"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({});
              }}
              autoComplete="username"
            />

            {errors.username && (
              <p className="error">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({});
              }}
              autoComplete="current-password"
            />

            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login to TravelGo"}
          </button>
        </form>

        <div className="signup-link">
          <span>New to TravelGo? </span>
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
