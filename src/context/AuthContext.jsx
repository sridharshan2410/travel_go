
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

const API_URL = "http://127.0.0.1:3001";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () =>
      localStorage.getItem("isLoggedIn") === "true" &&
      hasValidToken()
  );

  const [loggedUser, setLoggedUser] = useState(
    () => localStorage.getItem("loggedUser") || ""
  );

  // Handle invalid or expired sessions
  useEffect(() => {
    const handleUnauthorized = () => {
      removeToken();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedUser");

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

  // SIGNUP: Save a new user through JSON Server
  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("Unable to check registered users.");
      }

      const users = await response.json();
      const email = userData.email.trim().toLowerCase();

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
        throw new Error("Unable to create your account.");
      }

      const savedUser = await createResponse.json();

      // Keep compatibility with the existing demo login flow
      const existingUsers = JSON.parse(
        localStorage.getItem("travelUsers") || "[]"
      );

      existingUsers.push({
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        password: userData.password,
      });

      localStorage.setItem(
        "travelUsers",
        JSON.stringify(existingUsers)
      );

      return {
        success: true,
        message: "Account created successfully.",
      };
    } catch (error) {
      console.error("Signup error:", error);

      return {
        success: false,
        message:
          "Unable to connect to the API. Make sure JSON Server is running.",
      };
    }
  };

  // LOGIN: Verify credentials using the JSON Server API
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        throw new Error("Unable to retrieve users from the API.");
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

      if (!user) {
        return false;
      }

      // Create the demo token after successful credential verification
      createDemoToken(user.email);

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

  // LOGOUT: Remove the token and login details
  const logout = () => {
    removeToken();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");

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