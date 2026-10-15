
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  createDemoToken,
  removeToken,
  hasValidToken,
} from "../services/auth";

const AuthContext = createContext();

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://travel-go-rmtr.onrender.com"
).replace(/\/+$/, "");

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () =>
      localStorage.getItem("isLoggedIn") === "true" &&
      hasValidToken()
  );

  const [loggedUser, setLoggedUser] = useState(
    () => localStorage.getItem("loggedUser") || ""
  );

  useEffect(() => {
    const handleUnauthorized = () => {
      removeToken();
      setIsAuthenticated(false);
      setLoggedUser("");
    };

    window.addEventListener(
      "travelgo:unauthorized",
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        "travelgo:unauthorized",
        handleUnauthorized
      );
    };
  }, []);

  // SIGNUP
  const signup = async (userData) => {
    try {
      const email = userData.email.trim().toLowerCase();

      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("Unable to retrieve users.");
      }

      const users = await response.json();

      const emailExists = users.some(
        (user) => user.email?.toLowerCase() === email
      );

      if (emailExists) {
        return {
          success: false,
          message: "Email already registered.",
        };
      }

      const createResponse = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name.trim(),
          email,
          phone: userData.phone.trim(),
          password: userData.password,
        }),
      });

      if (!createResponse.ok) {
        throw new Error("Unable to create account.");
      }

      return {
        success: true,
        message: "Account created successfully.",
      };
    } catch (error) {
      console.error("Signup error:", error);

      return {
        success: false,
        message:
          "Unable to connect to the API. Please check the backend URL and server status.",
      };
    }
  };

  // LOGIN
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("Unable to retrieve users.");
      }

      const users = await response.json();
      const enteredUsername = username.trim().toLowerCase();

      const user = users.find(
        (item) =>
          (
            item.email?.toLowerCase() === enteredUsername ||
            item.name?.toLowerCase() === enteredUsername
          ) &&
          item.password === password
      );

      if (!user) return false;

      createDemoToken(user.email || user.name);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedUser", user.name);

      setIsAuthenticated(true);
      setLoggedUser(user.name);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setLoggedUser("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loggedUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
