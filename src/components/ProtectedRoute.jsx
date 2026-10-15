import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hasValidToken } from "../services/auth";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const valid = hasValidToken();

    setTokenIsValid(valid);
    setChecking(false);
  }, []);

  if (checking) {
    return <p>Checking authentication...</p>;
  }

  const loggedIn =
    isAuthenticated &&
    tokenIsValid &&
    localStorage.getItem("isLoggedIn") === "true";

  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;